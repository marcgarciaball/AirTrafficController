import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { TEXT, type Tone } from "./tones"

/** Anunciador: recuadro de 1 px en el color del estado, texto en mayúsculas de 11 px. */
export function Annunciator({ tone = "white", children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-fit shrink-0 items-center border border-current px-1.5 font-mono text-xs leading-none whitespace-nowrap uppercase tracking-wide",
        TEXT[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
