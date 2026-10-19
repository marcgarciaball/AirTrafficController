import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { TEXT, type Tone } from "./tones"

/** Estados de una línea de MEMO (ECAM). */
export type MemoState = "hecho" | "siguiente" | "disponible" | "bloqueado" | "verificar"

export const MEMO_TONE: Record<MemoState, Tone> = {
  hecho: "green",
  siguiente: "magenta",
  disponible: "cyan",
  bloqueado: "dim",
  verificar: "amber",
}

const SYMBOL: Record<MemoState, string> = {
  hecho: "✓",
  siguiente: "▶",
  disponible: "□",
  bloqueado: "–",
  verificar: "△",
}

const SR: Record<MemoState, string> = {
  hecho: "Hecho: ",
  siguiente: "Siguiente: ",
  disponible: "Disponible: ",
  bloqueado: "Bloqueado: ",
  verificar: "Pendiente de verificar: ",
}

export function MemoMark({ state }: { state: MemoState }) {
  return (
    <>
      <span aria-hidden="true" className={cn("w-4 shrink-0 text-center font-mono", TEXT[MEMO_TONE[state]])}>
        {SYMBOL[state]}
      </span>
      <span className="sr-only">{SR[state]}</span>
    </>
  )
}

/** Lista estilo ECAM MEMO: líneas, no tarjetas. */
export function Memo({ children, className }: { children: ReactNode; className?: string }) {
  return <ul className={cn("divide-y divide-line", className)}>{children}</ul>
}

/** Fila con la geometría común de una línea de MEMO. */
export const MEMO_ROW = "flex min-h-11 items-start gap-3 px-3 py-2.5 sm:px-4"

export function MemoItem({
  state,
  children,
  detail,
  reason,
  meta,
  href,
  external = false,
  current = false,
}: {
  state: MemoState
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
      <MemoMark state={state} />
      <span className="min-w-0 flex-1 space-y-0.5">
        <span className={cn("block leading-snug", TEXT[MEMO_TONE[state]])}>{children}</span>
        {detail ? <span className="block text-sm text-muted-foreground">{detail}</span> : null}
        {state === "bloqueado" && reason ? <span className="block text-sm text-amber">{reason}</span> : null}
      </span>
      {meta ? <span className="flex shrink-0 items-center gap-2 self-center text-sm text-muted-foreground tabular-nums">{meta}</span> : null}
      {href ? (
        <span aria-hidden="true" className="shrink-0 self-center font-mono text-cyan">
          ›
        </span>
      ) : null}
    </>
  )
  return (
    <li>
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cn(MEMO_ROW, "hover:bg-surface")}>
            {body}
          </a>
        ) : (
          <Link href={href} aria-current={current ? "step" : undefined} className={cn(MEMO_ROW, "hover:bg-surface")}>
            {body}
          </Link>
        )
      ) : (
        <div className={MEMO_ROW}>{body}</div>
      )}
    </li>
  )
}
