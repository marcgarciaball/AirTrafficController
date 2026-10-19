import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ProgressBar } from "@/components/ui-torre/progress-bar"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { ROW_HOVER } from "@/components/ui-torre/checklist"
import { cn } from "@/lib/utils"
import type { PhaseView } from "@/lib/roadmap/types"

const PARALLEL = [2, 3, 4]

/** Tramo vertical que une los waypoints: continuo si hay paso, discontinuo hacia lo bloqueado. */
function Leg({ locked, className }: { locked: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("absolute left-[33px] w-0 border-l-2 sm:left-[37px]", locked ? "border-dashed border-line" : "border-guide/35", className)}
    />
  )
}

/** Waypoint: rombo relleno en la fase actual, círculo con check si está hecha, anillo si no. */
function Mark({ phase, current }: { phase: PhaseView; current: boolean }) {
  const locked = phase.status === "bloqueada"
  return (
    <span aria-hidden="true" className="absolute top-[22px] left-[24px] flex size-5 items-center justify-center bg-card sm:left-[28px]">
      {current ? (
        <span className="size-3.5 rotate-45 rounded-[3px] bg-guide ring-4 ring-guide/15" />
      ) : phase.status === "hecha" ? (
        <svg viewBox="0 0 20 20" className="size-5">
          <circle cx="10" cy="10" r="9" className="fill-success" />
          <path d="M6 10.4 8.6 13 14 7.5" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="stroke-card" />
        </svg>
      ) : (
        <span className={cn("size-4 rounded-full border-2 bg-card", locked ? "border-dashed border-muted-foreground/60" : "border-muted-foreground")} />
      )}
    </span>
  )
}

function Waypoint({ phase, current, first, last }: { phase: PhaseView; current: boolean; first?: boolean; last?: boolean }) {
  const locked = phase.status === "bloqueada"
  return (
    <li className="relative">
      {!first ? <Leg locked={locked} className="top-0 h-[22px]" /> : null}
      {!last ? <Leg locked={locked} className="top-[42px] bottom-0" /> : null}
      <Mark phase={phase} current={current} />
      <Link
        href={`/ruta/${phase.number}`}
        aria-current={current ? "step" : undefined}
        className={cn("flex items-start gap-4 py-5 pr-5 pl-[68px] sm:pr-6 sm:pl-[76px]", ROW_HOVER)}
      >
        <span className="min-w-0 flex-1 space-y-2">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className={cn("text-sm", current ? "text-guide" : "text-muted-foreground")}>Fase {phase.number}</span>
            {current ? <StatusChip tone="guide">fase actual</StatusChip> : null}
            {locked ? <StatusChip tone="muted">bloqueada</StatusChip> : null}
            {phase.status === "hecha" ? <StatusChip tone="success">hecha</StatusChip> : null}
          </span>
          <span className={cn("block text-lg leading-snug font-bold", locked ? "text-muted-foreground" : "text-foreground")}>{phase.title}</span>
          <span className="flex items-center gap-3">
            <ProgressBar
              value={phase.pct}
              size="sm"
              tone={current ? "guide" : locked ? "muted" : "success"}
              label={`Progreso de la fase ${phase.number}`}
              className="max-w-64 flex-1"
            />
            <span className="w-11 shrink-0 text-sm text-muted-foreground">{phase.pct} %</span>
          </span>
          {phase.est_weeks_min != null && phase.est_weeks_max != null ? (
            <span className="block text-sm text-muted-foreground">
              Entre {phase.est_weeks_min} y {phase.est_weeks_max} semanas (estimación)
            </span>
          ) : null}
        </span>
        <ChevronRight aria-hidden="true" className="mt-0.5 size-5 shrink-0 self-center text-muted-foreground" />
      </Link>
    </li>
  )
}

/** Ruta de fases como waypoints unidos por una línea vertical; las fases 2, 3 y 4 van en paralelo. */
export function FlightPlan({ phases, currentPhase }: { phases: PhaseView[]; currentPhase: number | null }) {
  const before = phases.filter((p) => p.number < PARALLEL[0])
  const branch = phases.filter((p) => PARALLEL.includes(p.number))
  const after = phases.filter((p) => p.number > PARALLEL[PARALLEL.length - 1])
  const firstId = phases[0]?.id
  const lastId = phases[phases.length - 1]?.id
  const wp = (p: PhaseView) => (
    <Waypoint key={p.id} phase={p} current={p.number === currentPhase} first={p.id === firstId} last={p.id === lastId} />
  )
  return (
    <ol aria-label="Fases de la ruta" className="divide-y divide-line">
      {before.map(wp)}
      {branch.length > 0 ? (
        <li className="relative">
          <p className="relative bg-subtle py-3 pr-5 pl-[68px] text-sm text-muted-foreground sm:pl-[76px]">
            <span aria-hidden="true" className="absolute top-1/2 left-[29px] size-2.5 -translate-y-1/2 rounded-full border-2 border-muted-foreground bg-subtle sm:left-[33px]" />
            Estas {branch.length} fases se hacen en paralelo
          </p>
          <ol className="divide-y divide-line border-t border-line">{branch.map((p) => <Waypoint key={p.id} phase={p} current={p.number === currentPhase} />)}</ol>
        </li>
      ) : null}
      {after.map(wp)}
    </ol>
  )
}
