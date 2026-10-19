import Link from "next/link"
import { Annunciator } from "@/components/cockpit/annunciator"
import { Tape } from "@/components/cockpit/tape"
import { TEXT, type Tone } from "@/components/cockpit/tones"
import { cn } from "@/lib/utils"
import type { PhaseView } from "@/lib/roadmap/types"

const PARALLEL = [2, 3, 4]

function toneOf(p: PhaseView, current: boolean): Tone {
  if (current) return "magenta"
  if (p.status === "bloqueada") return "dim"
  if (p.status === "hecha") return "green"
  return "white"
}

/** Tramo de la ruta: magenta entre waypoints activos y discontinuo en dim hacia los bloqueados. */
function Leg({ locked, className }: { locked: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("absolute left-[11px] border-l", locked ? "border-dashed border-muted-foreground" : "border-magenta", className)}
    />
  )
}

/** Símbolo de waypoint del ND: rombo con trazo de 1 px. */
function Waypoint({ phase, current, first, last }: { phase: PhaseView; current: boolean; first?: boolean; last?: boolean }) {
  const tone = toneOf(phase, current)
  const locked = phase.status === "bloqueada"
  const tapeTone: Tone = current ? "magenta" : phase.status === "hecha" ? "green" : locked ? "dim" : "green"
  return (
    <li className="relative">
      <Leg locked={locked} className={cn(first ? "top-[19px]" : "top-0", last ? "h-[19px]" : "bottom-0")} />
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-[15px] left-[7px] size-[9px] rotate-45 border bg-background",
          current ? "border-magenta bg-magenta" : locked ? "border-muted-foreground" : phase.status === "hecha" ? "border-green" : "border-foreground"
        )}
      />
      <Link
        href={`/ruta/${phase.number}`}
        aria-current={current ? "step" : undefined}
        className="block py-2 pr-3 pl-8 hover:bg-surface"
      >
        <span className="flex items-baseline gap-3">
          <span className={cn("w-6 shrink-0 font-mono text-sm", TEXT[tone])}>F{phase.number}</span>
          <span className={cn("min-w-0 flex-1 truncate uppercase tracking-wide text-sm", TEXT[tone])}>{phase.title}</span>
          {locked ? <Annunciator tone="dim">Bloq</Annunciator> : null}
          <span className={cn("w-12 shrink-0 text-right font-mono text-sm tabular-nums", TEXT[tone])}>
            {phase.pct}
            <span className="text-muted-foreground"> %</span>
          </span>
        </span>
        <span className="mt-1.5 flex items-center gap-3 pl-9">
          <Tape value={phase.pct} tone={tapeTone} label={`Progreso de la fase ${phase.number}`} className="flex-1" />
        </span>
        {phase.est_weeks_min != null && phase.est_weeks_max != null ? (
          <span className="mt-1 block pl-9 font-mono text-xs text-muted-foreground tabular-nums">
            EST {phase.est_weeks_min}–{phase.est_weeks_max} SEM
          </span>
        ) : null}
      </Link>
    </li>
  )
}

/** Plan de vuelo del ND: cada fase es un waypoint; las fases 2, 3 y 4 forman una rama paralela. */
export function FlightPlan({ phases, currentPhase }: { phases: PhaseView[]; currentPhase: number | null }) {
  const before = phases.filter((p) => p.number < PARALLEL[0])
  const branch = phases.filter((p) => PARALLEL.includes(p.number))
  const after = phases.filter((p) => p.number > PARALLEL[PARALLEL.length - 1])
  const firstId = phases[0]?.id
  const lastId = phases[phases.length - 1]?.id
  const wp = (p: PhaseView, extra?: { first?: boolean; last?: boolean }) => (
    <Waypoint key={p.id} phase={p} current={p.number === currentPhase} first={extra?.first ?? p.id === firstId} last={extra?.last ?? p.id === lastId} />
  )
  const branchLocked = branch.every((p) => p.status === "bloqueada")
  return (
    <ol aria-label="Plan de fases">
      {before.map((p) => wp(p))}
      {branch.length > 0 ? (
        <li className="relative">
          <Leg locked={branchLocked} className="top-0 bottom-0" />
          {/* Ramificación y unión: tramos horizontales hasta la rama paralela. */}
          <span aria-hidden="true" className={cn("absolute top-0 left-[11px] w-6 border-t", branchLocked ? "border-dashed border-muted-foreground" : "border-magenta")} />
          <span aria-hidden="true" className={cn("absolute bottom-0 left-[11px] w-6 border-t", branchLocked ? "border-dashed border-muted-foreground" : "border-magenta")} />
          <div className="relative ml-6 pb-1">
            <Leg locked={branchLocked} className="top-0 bottom-0" />
            <p className="pt-2 pl-8 text-xs uppercase tracking-wide text-muted-foreground">En paralelo · F{PARALLEL.join(" · F")}</p>
            <ol>{branch.map((p) => wp(p, { first: false, last: false }))}</ol>
          </div>
        </li>
      ) : null}
      {after.map((p) => wp(p))}
    </ol>
  )
}
