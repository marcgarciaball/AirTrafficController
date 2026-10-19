import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type StripKind = "dep" | "arr" | "ovf" | "neutral" | "ok" | "warning" | "destructive"

const BAND: Record<StripKind, string> = {
  dep: "bg-strip-dep",
  arr: "bg-strip-arr",
  ovf: "bg-strip-ovf",
  neutral: "bg-muted-foreground/45",
  ok: "bg-accent",
  warning: "bg-warning",
  destructive: "bg-destructive",
}

const FRAME: Record<StripKind, string> = {
  dep: "",
  arr: "",
  ovf: "",
  neutral: "",
  ok: "",
  warning: "border-warning/45",
  destructive: "border-destructive/55",
}

/**
 * Ficha de progresión de vuelo: banda de color a la izquierda, cuerpo y
 * celdas opcionales a la derecha (meta y código) separadas por divisores.
 * `holding` dibuja el borde discontinuo de una ficha en espera.
 */
export function FlightStrip({
  kind = "neutral",
  title,
  meta,
  code,
  children,
  holding = false,
  className,
}: {
  kind?: StripKind
  title?: ReactNode
  meta?: ReactNode
  code?: ReactNode
  children?: ReactNode
  holding?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-stretch overflow-hidden rounded-sm border bg-card text-card-foreground",
        holding && "border-dashed bg-card/60",
        FRAME[kind],
        className
      )}
    >
      <span aria-hidden="true" className={cn("w-1.5 shrink-0", BAND[kind], holding && "opacity-60")} />
      <div className="min-w-0 flex-1 space-y-1.5 px-3.5 py-3">
        {title ? <div className="text-[15px] leading-snug font-medium">{title}</div> : null}
        {children ? <div className="text-sm leading-relaxed text-muted-foreground">{children}</div> : null}
      </div>
      {meta ? (
        <div className="flex w-[4.75rem] shrink-0 items-center justify-center border-l border-inherit px-2 text-center font-mono text-[10px] leading-tight uppercase tracking-[0.1em] text-muted-foreground tabular-nums sm:w-24">
          {meta}
        </div>
      ) : null}
      {code ? (
        <div className="flex min-w-[4.5rem] shrink-0 items-center justify-center border-l border-inherit px-3 font-mono text-xl font-medium tracking-tight tabular-nums">
          {code}
        </div>
      ) : null}
    </div>
  )
}
