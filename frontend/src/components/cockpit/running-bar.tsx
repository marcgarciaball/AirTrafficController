"use client"

import Link from "next/link"
import { effectiveSeconds } from "@/lib/plan/time"
import { formatClock } from "@/lib/sessions/format"
import { useNow } from "@/lib/sessions/use-now"
import { Annunciator } from "./annunciator"

export type RunningSession = { started_at: string; ended_at: string | null; paused_seconds: number; paused_at: string | null }

/** Barra fija de "sesión en marcha": tiempo efectivo y enlace a /sesion. */
export function RunningBar({ session, title }: { session: RunningSession; title?: string | null }) {
  const now = useNow()
  const paused = session.paused_at !== null
  return (
    <Link
      href="/sesion"
      className="sticky top-0 z-40 flex min-h-10 items-center gap-3 border-b border-line bg-background px-4 hover:bg-surface md:-ml-20 md:pl-24"
    >
      <Annunciator tone={paused ? "amber" : "green"}>{paused ? "Pausa" : "Sesión"}</Annunciator>
      <span suppressHydrationWarning className="font-mono text-sm tabular-nums text-foreground">
        {formatClock(effectiveSeconds(session, now))}
      </span>
      {title ? <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">{title}</span> : <span className="flex-1" />}
      <span aria-hidden="true" className="font-mono text-sm uppercase tracking-wide text-cyan">Abrir ›</span>
      <span className="sr-only">Ir a la sesión en marcha</span>
    </Link>
  )
}
