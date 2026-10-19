import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/format"
import { TEXT, type Tone } from "./tones"
import { UtcClock } from "./utc-clock"

// Abreviaturas de fase para el anunciador FASE.
const PHASE_ABBR: Record<number, string> = {
  0: "VIABIL",
  1: "BASE",
  2: "TEMARIO",
  3: "APTITUD",
  4: "INGLÉS",
  5: "DIGITAL",
  6: "SIMULACRO",
  7: "FASE 3",
  8: "POST",
}

const DASH = <span className={TEXT.dim}>—</span>

function Cell({ label, tone, children, title }: { label: string; tone: Tone; children: ReactNode; title?: string }) {
  return (
    <div className="min-w-0 px-2 py-1.5 sm:px-3">
      <dt className="text-xs leading-4 uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd title={title} className={cn("truncate font-mono text-sm leading-5 uppercase", TEXT[tone])}>
        {children}
      </dd>
    </div>
  )
}

/** Barra superior de 5 columnas, como el Flight Mode Annunciator. */
export function FmaBar({
  todayMinutes,
  phase,
  next,
  target,
}: {
  todayMinutes: number | null
  phase: { number: number; title: string } | null
  next: string | null
  target: string | null
}) {
  const abbr = phase ? PHASE_ABBR[phase.number] ?? phase.title.split(" ")[0] : null
  return (
    <dl aria-label="Estado" className="grid grid-cols-[1fr_1.3fr_2fr_1fr_1.2fr] divide-x divide-line border-y border-line">
      <Cell label="Hoy" tone="white">{todayMinutes != null ? `${todayMinutes} MIN` : DASH}</Cell>
      <Cell label="Fase" tone="green" title={phase?.title}>
        {phase ? `F${phase.number} ${abbr}` : DASH}
      </Cell>
      <Cell label="Sig" tone="magenta" title={next ?? undefined}>{next ?? DASH}</Cell>
      <Cell label="UTC" tone="white"><UtcClock /></Cell>
      <Cell label="Obj" tone="cyan">{target ? formatDate(target) : DASH}</Cell>
    </dl>
  )
}
