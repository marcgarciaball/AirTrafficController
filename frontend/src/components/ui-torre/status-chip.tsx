import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { TEXT, type Tone } from "./tones"

/**
 * Chip de estado: texto en minúsculas (solo la inicial en mayúscula), trazo fino del mismo color.
 * Sin fondo de color, para que el texto conserve el contraste AA sobre papel y sobre tarjeta.
 */
export function StatusChip({ tone = "muted", children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 w-fit shrink-0 items-center gap-1.5 rounded-md border border-current/35 px-2 text-xs leading-none whitespace-nowrap",
        TEXT[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
