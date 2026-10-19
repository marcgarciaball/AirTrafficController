import { cn } from "@/lib/utils"
import { FILL, STROKE, TEXT, type Tone } from "./tones"

// Arco de 220° (como el indicador N1 de un motor), ángulos desde las 12 en sentido horario.
const CX = 60
const CY = 54
const R = 44
const SPAN = 220
const START = -SPAN / 2

const point = (deg: number, r = R) => {
  const a = (deg * Math.PI) / 180
  return { x: +(CX + r * Math.sin(a)).toFixed(2), y: +(CY - r * Math.cos(a)).toFixed(2) }
}
const angleOf = (v: number) => START + (SPAN * v) / 100

function arc(from: number, to: number) {
  const a = point(from)
  const b = point(to)
  const large = to - from > 180 ? 1 : 0
  return `M ${a.x} ${a.y} A ${R} ${R} 0 ${large} 1 ${b.x} ${b.y}`
}

const TICKS = Array.from({ length: 11 }, (_, i) => i * 10)

export function Gauge({
  value,
  label,
  tone = "green",
  className,
}: {
  value: number
  label: string
  tone?: Extract<Tone, "green" | "cyan" | "amber">
  className?: string
}) {
  const v = Math.max(0, Math.min(100, Math.round(value)))
  const needle = point(angleOf(v), R - 4)
  return (
    <figure className={cn("flex w-36 flex-col items-center gap-1", className)}>
      <svg viewBox="0 0 120 92" role="img" aria-label={`${label}: ${v} %`} className="w-full overflow-visible">
        <path d={arc(START, START + SPAN)} fill="none" strokeWidth="1.5" className="stroke-foreground" />
        {v > 0 ? <path d={arc(START, angleOf(v))} fill="none" strokeWidth="4" className={STROKE[tone]} /> : null}
        {TICKS.map((t) => {
          const major = t % 50 === 0
          const a = point(angleOf(t), R)
          const b = point(angleOf(t), R - (major ? 8 : 4))
          return <line key={t} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth="1" className="stroke-foreground" />
        })}
        {[0, 50, 100].map((t) => {
          const p = point(angleOf(t), R - 15)
          return (
            <text key={t} x={p.x} y={p.y} fontSize="8" textAnchor="middle" dominantBaseline="central" className="fill-muted-foreground font-mono">
              {t / 10}
            </text>
          )
        })}
        <line x1={CX} y1={CY} x2={needle.x} y2={needle.y} strokeWidth="2" strokeLinecap="square" className={STROKE[tone]} />
        <rect x={CX - 21} y={CY + 16} width="42" height="18" fill="none" strokeWidth="1" className="stroke-foreground" />
        <text x={CX + 17} y={CY + 25.5} fontSize="12" textAnchor="end" dominantBaseline="central" className={cn("font-mono", FILL[tone])}>
          {v}
        </text>
      </svg>
      <figcaption className="flex items-baseline gap-1.5 text-xs uppercase tracking-wide text-foreground">
        {label}
        <span className={cn("font-mono", TEXT.dim)}>%</span>
      </figcaption>
    </figure>
  )
}
