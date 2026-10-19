"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { effectiveSeconds } from "@/lib/plan/time"
import { formatClock } from "@/lib/sessions/format"
import { useNow } from "@/lib/sessions/use-now"
import { cn } from "@/lib/utils"

export type RunningSession = { started_at: string; ended_at: string | null; paused_seconds: number; paused_at: string | null }

/** Aviso fijo de "sesión en marcha": tiempo efectivo y enlace a /sesion. */
export function RunningBar({ session, title }: { session: RunningSession; title?: string | null }) {
  const now = useNow()
  const paused = session.paused_at !== null
  return (
    <Link
      href="/sesion"
      className="sticky top-0 z-40 flex min-h-12 items-center gap-3 border-b bg-card px-4 text-sm transition-colors hover:bg-subtle sm:px-6"
    >
      <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-full", paused ? "bg-warning" : "bg-success motion-safe:animate-pulse")} />
      <span className={cn("shrink-0", paused ? "text-warning" : "text-success")}>{paused ? "En pausa" : "Sesión en marcha"}</span>
      <span suppressHydrationWarning className="shrink-0 font-mono text-foreground">
        {formatClock(effectiveSeconds(session, now))}
      </span>
      {title ? <span className="min-w-0 flex-1 truncate text-muted-foreground">{title}</span> : <span className="flex-1" />}
      <span className="flex shrink-0 items-center gap-0.5 text-primary">
        Abrir
        <ChevronRight aria-hidden="true" className="size-4" />
      </span>
    </Link>
  )
}
