import Link from "next/link"
import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Tone } from "./tones"

/** Estados de una tarea de la lista. */
export type ChecklistState = "hecho" | "siguiente" | "disponible" | "bloqueado" | "verificar"

export const CHECKLIST_TONE: Record<ChecklistState, Tone> = {
  hecho: "success",
  siguiente: "guide",
  disponible: "default",
  bloqueado: "muted",
  verificar: "warning",
}

const SR: Record<ChecklistState, string> = {
  hecho: "Hecho: ",
  siguiente: "Te toca: ",
  disponible: "Disponible: ",
  bloqueado: "Bloqueado: ",
  verificar: "Pendiente de verificar: ",
}

/** Marca circular de 20 px: casilla vacía, marcada, siguiente (magenta de ruta), bloqueada o aviso. */
export function ChecklistMark({ state, className }: { state: ChecklistState; className?: string }) {
  return (
    <>
      <svg viewBox="0 0 20 20" aria-hidden="true" className={cn("mt-0.5 size-5 shrink-0", className)}>
        {state === "hecho" ? (
          <>
            <circle cx="10" cy="10" r="9" className="fill-success" />
            <path d="M6 10.4 8.6 13 14 7.5" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="stroke-card" />
          </>
        ) : state === "siguiente" ? (
          <>
            <circle cx="10" cy="10" r="8.25" fill="none" strokeWidth="1.5" className="stroke-guide" />
            <circle cx="10" cy="10" r="4" className="fill-guide" />
          </>
        ) : state === "bloqueado" ? (
          <circle cx="10" cy="10" r="8.25" fill="none" strokeWidth="1.5" strokeDasharray="2.6 2.6" className="stroke-muted-foreground" />
        ) : state === "verificar" ? (
          <>
            <circle cx="10" cy="10" r="8.25" fill="none" strokeWidth="1.5" className="stroke-warning" />
            <path d="M10 5.8v5" strokeWidth="1.8" strokeLinecap="round" className="stroke-warning" />
            <circle cx="10" cy="14" r="1.05" className="fill-warning" />
          </>
        ) : (
          <circle cx="10" cy="10" r="8.25" fill="none" strokeWidth="1.5" className="stroke-muted-foreground" />
        )}
      </svg>
      <span className="sr-only">{SR[state]}</span>
    </>
  )
}

/** Lista de tareas: filas separadas por divisores finos dentro de una tarjeta. */
export function Checklist({ children, className }: { children: ReactNode; className?: string }) {
  return <ul className={cn("divide-y divide-line", className)}>{children}</ul>
}

/** Geometría común de una fila (objetivo táctil de 44 px como mínimo). */
export const CHECKLIST_ROW = "flex min-h-14 items-start gap-4 px-5 py-4 sm:px-6"
export const ROW_HOVER = "transition-colors hover:bg-subtle focus-visible:bg-subtle focus-visible:-outline-offset-2"

export function ChecklistItem({
  state,
  children,
  detail,
  reason,
  meta,
  href,
  external = false,
  current = false,
}: {
  state: ChecklistState
  children: ReactNode
  detail?: ReactNode
  reason?: ReactNode
  meta?: ReactNode
  href?: string
  external?: boolean
  current?: boolean
}) {
  const body = (
    <>
      <ChecklistMark state={state} />
      <span className="min-w-0 flex-1 space-y-1">
        <span className={cn("block leading-snug", state === "bloqueado" ? "text-muted-foreground" : "text-foreground", state === "siguiente" && "font-bold")}>
          {children}
        </span>
        {state === "siguiente" ? <span className="block text-sm text-guide">Lo siguiente que te toca</span> : null}
        {detail ? <span className="block text-sm text-muted-foreground">{detail}</span> : null}
        {state === "bloqueado" && reason ? <span className="block text-sm text-warning">{reason}</span> : null}
      </span>
      {meta ? <span className="flex shrink-0 items-center gap-2 self-center text-sm text-muted-foreground">{meta}</span> : null}
      {href ? <ChevronRight aria-hidden="true" className="size-5 shrink-0 self-center text-muted-foreground" /> : null}
    </>
  )
  return (
    <li>
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cn(CHECKLIST_ROW, ROW_HOVER)}>
            {body}
          </a>
        ) : (
          <Link href={href} aria-current={current ? "step" : undefined} className={cn(CHECKLIST_ROW, ROW_HOVER)}>
            {body}
          </Link>
        )
      ) : (
        <div className={CHECKLIST_ROW}>{body}</div>
      )}
    </li>
  )
}

/** Fila de enlace simple (sin marca de estado), para índices y menús. */
export function LinkRow({ href, children, detail, meta, external = false }: { href: string; children: ReactNode; detail?: ReactNode; meta?: ReactNode; external?: boolean }) {
  const body = (
    <>
      <span className="min-w-0 flex-1 space-y-1">
        <span className="block leading-snug font-bold text-foreground">{children}</span>
        {detail ? <span className="block text-sm text-muted-foreground">{detail}</span> : null}
      </span>
      {meta ? <span className="flex shrink-0 items-center gap-2 self-center text-sm text-muted-foreground">{meta}</span> : null}
      <ChevronRight aria-hidden="true" className="size-5 shrink-0 self-center text-muted-foreground" />
    </>
  )
  return (
    <li>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cn(CHECKLIST_ROW, ROW_HOVER)}>{body}</a>
      ) : (
        <Link href={href} className={cn(CHECKLIST_ROW, ROW_HOVER)}>{body}</Link>
      )}
    </li>
  )
}
