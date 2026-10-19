import { cn } from "@/lib/utils"
import { BG, type Tone } from "./tones"

const TICKS = Array.from({ length: 11 }, (_, i) => i * 10)

/** Cinta de progreso fina con marcas cada 10 %, como las cintas de velocidad. */
export function Tape({
  value,
  label,
  tone = "green",
  className,
}: {
  value: number
  label: string
  tone?: Tone
  className?: string
}) {
  const v = Math.max(0, Math.min(100, Math.round(value)))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      className={cn("relative h-2.5 w-full", className)}
    >
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line" />
      {TICKS.map((t) => (
        <span
          key={t}
          aria-hidden="true"
          className={cn("absolute bottom-0 w-px bg-line", t % 50 === 0 ? "h-2.5" : "h-1.5")}
          style={{ left: t === 100 ? "calc(100% - 1px)" : `${t}%` }}
        />
      ))}
      <span aria-hidden="true" className={cn("absolute bottom-px left-0 h-1", BG[tone])} style={{ width: `${v}%` }} />
    </div>
  )
}
