import { cn } from "@/lib/utils"
import { STROKE, type Tone } from "./tones"

// Arco de 270° abierto por abajo, como un indicador de instrumento pero sin agujas ni marcas.
const R = 42
const C = 2 * Math.PI * R
const ARC = C * 0.75

export function ArcProgress({
  value,
  label,
  tone = "primary",
  className,
}: {
  value: number
  label: string
  tone?: Tone
  className?: string
}) {
  const v = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div className={cn("relative size-28 shrink-0", className)}>
      <svg viewBox="0 0 100 100" role="img" aria-label={`${label}: ${v} %`} className="size-full -rotate-[225deg]">
        <circle cx="50" cy="50" r={R} fill="none" strokeWidth="7" strokeLinecap="round" strokeDasharray={`${ARC} ${C}`} className="stroke-line" />
        {v > 0 ? (
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${(ARC * v) / 100} ${C}`}
            className={cn("transition-[stroke-dasharray] duration-700", STROKE[tone])}
          />
        ) : null}
      </svg>
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center pb-1 text-3xl font-bold">
        {v}
        <span className="ml-0.5 text-base font-normal text-muted-foreground">%</span>
      </span>
    </div>
  )
}
