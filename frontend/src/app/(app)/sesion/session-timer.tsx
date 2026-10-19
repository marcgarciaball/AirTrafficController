"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { CHECKBOX, FIELD_LABEL, TEXTAREA } from "@/components/ui-torre/field"
import { Button } from "@/components/ui/button"
import { effectiveSeconds } from "@/lib/plan/time"
import { formatClock } from "@/lib/sessions/format"
import { useNow } from "@/lib/sessions/use-now"
import { finishSession, pauseSession, resumeSession } from "./actions"

export type OpenSession = {
  id: string
  task_id: string | null
  started_at: string
  ended_at: string | null
  paused_seconds: number
  paused_at: string | null
}

export function SessionTimer({ session, taskTitle }: { session: OpenSession; taskTitle: string | null }) {
  const router = useRouter()
  const now = useNow()
  const [finishing, setFinishing] = useState(false)
  const [notes, setNotes] = useState("")
  const [markDone, setMarkDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const paused = session.paused_at !== null

  function run(fn: () => Promise<{ error?: string }>, after?: () => void) {
    setError(null)
    start(async () => {
      const r = await fn()
      if (r.error) setError(r.error)
      else {
        after?.()
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className={`flex items-center gap-2 text-sm ${paused ? "text-warning" : "text-success"}`}>
          <span aria-hidden="true" className={`size-2.5 rounded-full ${paused ? "bg-warning" : "bg-success motion-safe:animate-pulse"}`} />
          {paused ? "En pausa" : "En marcha"}
        </p>
        <p suppressHydrationWarning role="timer" aria-label="Tiempo de sesión" className="font-mono text-5xl leading-none text-foreground sm:text-6xl">
          {formatClock(effectiveSeconds(session, now))}
        </p>
        <p className="text-lg text-muted-foreground">{taskTitle ?? "Sin tarea vinculada"}</p>
      </div>

      {finishing ? (
        <div className="space-y-5 border-t pt-6">
          <label className="block space-y-2">
            <span className={FIELD_LABEL}>Notas de la sesión</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={2000}
              rows={3}
              className={TEXTAREA}
            />
          </label>
          {session.task_id ? (
            <label className="flex min-h-11 items-center gap-3">
              <input type="checkbox" checked={markDone} onChange={(e) => setMarkDone(e.target.checked)} className={CHECKBOX} />
              Marcar tarea como hecha
            </label>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <Button type="button" size="lg" disabled={pending} onClick={() => run(() => finishSession(session.id, notes, markDone), () => router.push("/hoy"))}>
              Guardar y terminar
            </Button>
            <Button type="button" size="lg" variant="ghost" disabled={pending} onClick={() => setFinishing(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {paused ? (
            <Button type="button" size="lg" disabled={pending} onClick={() => run(() => resumeSession(session.id))}>
              Reanudar
            </Button>
          ) : (
            <Button type="button" size="lg" variant="outline" disabled={pending} onClick={() => run(() => pauseSession(session.id))}>
              Pausar
            </Button>
          )}
          <Button type="button" size="lg" variant="destructive" disabled={pending} onClick={() => setFinishing(true)}>
            Terminar
          </Button>
        </div>
      )}
      {error ? <p role="alert" className="text-danger">{error}</p> : null}
    </div>
  )
}
