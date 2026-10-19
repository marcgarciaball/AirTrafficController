import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Agrupador con el título incrustado en la línea superior: ── RUTA ─────.
 * `aside` va a la derecha, también sobre la línea (por ejemplo un contador).
 */
export function Panel({
  title,
  aside,
  children,
  flush = false,
  as: Heading = "h2",
  className,
}: {
  title: ReactNode
  aside?: ReactNode
  children: ReactNode
  flush?: boolean
  as?: "h1" | "h2" | "h3"
  className?: string
}) {
  return (
    <section className={cn("relative mt-2 border border-line", className)}>
      <div className="absolute inset-x-3 -top-2 flex items-start justify-between gap-3">
        <Heading className="min-w-0 bg-background px-1.5 text-xs leading-4 font-normal uppercase tracking-wide text-foreground">
          {title}
        </Heading>
        {aside ? (
          <span className="shrink-0 bg-background px-1.5 font-mono text-xs leading-4 uppercase tracking-wide text-muted-foreground tabular-nums">
            {aside}
          </span>
        ) : null}
      </div>
      <div className={flush ? "pt-3 pb-1" : "px-3 pt-5 pb-3 sm:px-4 sm:pb-4"}>{children}</div>
    </section>
  )
}
