import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Bloque de página: título de 22 px fuera de la tarjeta y contenido dentro.
 * `flush` quita el relleno para listas con filas propias; `plain` quita la tarjeta.
 */
export function Section({
  title,
  aside,
  description,
  children,
  flush = false,
  plain = false,
  as: Heading = "h2",
  className,
  id,
}: {
  title: ReactNode
  aside?: ReactNode
  description?: ReactNode
  children: ReactNode
  flush?: boolean
  plain?: boolean
  as?: "h1" | "h2" | "h3"
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={cn("scroll-mt-6 space-y-3", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <Heading className="text-xl font-bold text-foreground">{title}</Heading>
        {aside ? <span className="shrink-0 text-sm text-muted-foreground">{aside}</span> : null}
      </div>
      {description ? <p className="max-w-prose text-muted-foreground">{description}</p> : null}
      {plain ? children : <Card flush={flush}>{children}</Card>}
    </section>
  )
}

export function Card({ children, flush = false, className }: { children: ReactNode; flush?: boolean; className?: string }) {
  return <div className={cn("rounded-lg border bg-card shadow-sm shadow-black/[0.03]", flush ? "overflow-hidden" : "p-5 sm:p-6", className)}>{children}</div>
}
