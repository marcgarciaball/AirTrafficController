import Link from "next/link"
import { Lock } from "lucide-react"
import { FlightStrip, type StripKind } from "@/components/atc/flight-strip"
import { SectionLabel } from "@/components/atc/section-label"
import type { PhaseView } from "@/lib/roadmap/types"

const STATUS_LABEL: Record<PhaseView["status"], string> = {
  bloqueada: "Bloqueada",
  disponible: "Disponible",
  en_curso: "En curso",
  hecha: "Hecha",
}

function kindFor(p: PhaseView): StripKind {
  if (p.status === "hecha") return "ok"
  if (p.track === "temario") return "dep"
  if (p.track === "aptitudes") return "ovf"
  if (p.track === "ingles") return "arr"
  return "neutral"
}

export function PhaseStrip({ phase, current }: { phase: PhaseView; current: boolean }) {
  const locked = phase.status === "bloqueada"
  const weeks =
    phase.est_weeks_min != null && phase.est_weeks_max != null
      ? `estimación: ${phase.est_weeks_min}–${phase.est_weeks_max} semanas`
      : null
  return (
    <Link
      href={`/ruta/${phase.number}`}
      aria-current={current ? "step" : undefined}
      className="block rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <FlightStrip
        kind={kindFor(phase)}
        className={`${locked ? "opacity-60" : ""} ${current ? "border-primary ring-1 ring-primary" : ""}`}
        meta={
          <span className="flex flex-col items-center gap-1">
            {locked ? <Lock aria-hidden="true" className="size-3.5" /> : null}
            {STATUS_LABEL[phase.status]}
          </span>
        }
        code={`${phase.pct}%`}
        title={
          <span className="block space-y-1">
            <SectionLabel as="span" className={current ? "text-primary" : ""}>
              Fase {phase.number}
              {current ? " · actual" : ""}
            </SectionLabel>
            <span className="block">{phase.title}</span>
          </span>
        }
      >
        {weeks ? <span className="font-mono text-xs">{weeks}</span> : null}
      </FlightStrip>
    </Link>
  )
}
