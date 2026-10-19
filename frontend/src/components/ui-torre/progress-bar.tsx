import { cn } from "@/lib/utils"
import { BG, type Tone } from "./tones"

/** Barra de progreso redondeada, fina y sin marcas. */
export function ProgressBar({
  value,
  label,
  tone = "success",
  size = "md",
  className,
}: {
  value: number
  label: string
  tone?: Tone
  size?: "sm" | "md"
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
      className={cn("w-full overflow-hidden rounded-full bg-line", size === "sm" ? "h-1.5" : "h-2", className)}
    >
      <div className={cn("h-full rounded-full transition-[width] duration-500", BG[tone])} style={{ width: `${v}%` }} />
    </div>
  )
}
