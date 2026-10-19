"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addManualSession, updateSession } from "../../sesion/actions"

export type Initial = { id: string; day: string; start: string; end: string; taskId: string; notes: string }

const LABEL = "block space-y-1"
const CAP = "block text-xs uppercase tracking-wide text-cyan"

export function SessionForm({ tasks, today, initial }: { tasks: { id: string; title: string }[]; today: string; initial?: Initial }) {
  const router = useRouter()
  const [mode, setMode] = useState<"fin" | "duracion">("fin")
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()

  function submit(fd: FormData) {
    setError(null)
    const g = (k: string) => String(fd.get(k) ?? "")
    const dur = Number(g("duration"))
    const input = {
      day: g("day"),
      start: g("start"),
      end: mode === "fin" ? g("end") : null,
      durationMinutes: mode === "duracion" ? dur : null,
      taskId: g("taskId") || null,
      notes: g("notes") || null,
    }
    start(async () => {
      const r = initial ? await updateSession(initial.id, input) : await addManualSession(input)
      if (r.error) setError(r.error)
      else router.push("/mas/sesiones")
    })
  }

  return (
    <form action={submit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className={LABEL}>
          <span className={CAP}>Fecha</span>
          <Input name="day" type="date" required max={today} defaultValue={initial?.day ?? today} />
        </label>
        <label className={LABEL}>
          <span className={CAP}>Inicio</span>
          <Input name="start" type="time" required defaultValue={initial?.start ?? ""} />
        </label>
      </div>
      <fieldset className="space-y-2">
        <legend className={CAP}>Fin o duración</legend>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-1.5">
            <input type="radio" checked={mode === "fin"} onChange={() => setMode("fin")} className="accent-cyan" /> Hora de fin
          </label>
          <label className="flex items-center gap-1.5">
            <input type="radio" checked={mode === "duracion"} onChange={() => setMode("duracion")} className="accent-cyan" /> Duración (min)
          </label>
        </div>
        {mode === "fin" ? (
          <Input name="end" type="time" required aria-label="Hora de fin" defaultValue={initial?.end ?? ""} />
        ) : (
          <Input name="duration" type="number" min={1} max={1440} required aria-label="Duración en minutos" />
        )}
      </fieldset>
      <label className={LABEL}>
        <span className={CAP}>Tarea</span>
        <select
          name="taskId"
          defaultValue={initial?.taskId ?? ""}
          className="h-10 w-full border-0 border-b border-line bg-background px-0 text-base text-foreground [color-scheme:dark] focus-visible:border-cyan focus-visible:outline-none"
        >
          <option value="">Sin tarea</option>
          {tasks.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </label>
      <label className={LABEL}>
        <span className={CAP}>Notas</span>
        <textarea
          name="notes"
          rows={2}
          maxLength={2000}
          defaultValue={initial?.notes ?? ""}
          className="w-full border border-line bg-transparent p-2 text-base text-foreground focus-visible:border-cyan focus-visible:outline-none"
        />
      </label>
      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {initial ? "[ Guardar ]" : "[ Añadir sesión ]"}
        </Button>
        {initial ? (
          <Button type="button" variant="outline" onClick={() => router.push("/mas/sesiones")}>
            Cancelar
          </Button>
        ) : null}
      </div>
      {error ? <p role="alert" className="text-sm text-red">{error}</p> : null}
    </form>
  )
}
