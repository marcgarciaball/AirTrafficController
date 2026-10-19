"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
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
    <div className="space-y-5">
      <p
        suppressHydrationWarning
        role="timer"
        aria-label="Tiempo de sesión"
        className={`font-mono text-[28px] leading-none tabular-nums sm:text-5xl ${paused ? "text-amber" : "text-green"}`}
      >
        {formatClock(effectiveSeconds(session, now))}
      </p>
      <p className="text-sm text-muted-foreground">
        {paused ? "EN PAUSA" : "EN MARCHA"} · {taskTitle ?? "Sin tarea vinculada"}
      </p>

      {finishing ? (
        <div className="space-y-4">
          <label className="block space-y-1">
            <span className="block text-xs uppercase tracking-wide text-cyan">Notas</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={2000}
              rows={3}
              className="w-full border border-line bg-transparent p-2 text-base text-foreground focus-visible:border-cyan focus-visible:outline-none"
            />
          </label>
          {session.task_id ? (
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={markDone} onChange={(e) => setMarkDone(e.target.checked)} className="size-4 accent-cyan" />
              Marcar tarea como hecha
            </label>
          ) : null}
          <div className="flex gap-2">
            <Button type="button" disabled={pending} onClick={() => run(() => finishSession(session.id, notes, markDone), () => router.push("/hoy"))}>
              [ Confirmar ]
            </Button>
            <Button type="button" variant="outline" disabled={pending} onClick={() => setFinishing(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {paused ? (
            <Button type="button" size="lg" disabled={pending} onClick={() => run(() => resumeSession(session.id))}>
              [ Reanudar ]
            </Button>
          ) : (
            <Button type="button" size="lg" variant="outline" disabled={pending} onClick={() => run(() => pauseSession(session.id))}>
              [ Pausa ]
            </Button>
          )}
          <Button type="button" size="lg" variant="destructive" disabled={pending} onClick={() => setFinishing(true)}>
            [ Finalizar ]
          </Button>
        </div>
      )}
      {error ? <p role="alert" className="text-sm text-red">{error}</p> : null}
    </div>
  )
}
