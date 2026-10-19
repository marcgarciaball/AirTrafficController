import type { Fig, Term } from "@/lib/aptitudes/abstracto"
import type { Cell } from "@/lib/aptitudes/espacial"
import { cn } from "@/lib/utils"

/** Figura de cuadrícula (polyomino) en SVG. */
export function PolyShape({ cells, label, className }: { cells: Cell[]; label: string; className?: string }) {
  const w = Math.max(...cells.map((c) => c[0])) + 1
  const h = Math.max(...cells.map((c) => c[1])) + 1
  const u = 10
  return (
    <svg viewBox={`-1 -1 ${w * u + 2} ${h * u + 2}`} role="img" aria-label={label} className={cn("h-24 w-24 shrink-0", className)}>
      {cells.map(([x, y]) => (
        <rect key={`${x},${y}`} x={x * u} y={y * u} width={u} height={u} strokeWidth="0.6" className="fill-foreground stroke-card" />
      ))}
    </svg>
  )
}

const SHAPE_PATH: Record<Fig["shape"], string> = {
  triangulo: "M 20 6 L 32 30 L 8 30 Z",
  cuadrado: "M 9 9 H 31 V 31 H 9 Z",
  circulo: "M 20 8 A 12 12 0 1 1 19.99 8 Z",
  cruz: "M 17 6 H 23 V 17 H 34 V 23 H 23 V 34 H 17 V 23 H 6 V 17 H 17 Z",
}

export function FigureView({ term, label, className }: { term: Term; label: string; className?: string }) {
  if (typeof term === "number") {
    return (
      <span role="img" aria-label={label} className={cn("flex h-14 min-w-14 items-center justify-center px-2 font-mono text-xl text-foreground tabular-nums", className)}>
        {term}
      </span>
    )
  }
  return (
    <svg viewBox="0 0 40 46" role="img" aria-label={label} className={cn("h-14 w-14 shrink-0", className)}>
      <path d={SHAPE_PATH[term.shape]} transform={`rotate(${term.rot} 20 20)`} fill="none" strokeWidth="1.8" className="stroke-foreground" />
      {Array.from({ length: term.dots }, (_, i) => (
        <circle key={i} cx={20 + (i - (term.dots - 1) / 2) * 7} cy={41} r="2" className="fill-foreground" />
      ))}
    </svg>
  )
}

export function describeTerm(t: Term): string {
  if (typeof t === "number") return String(t)
  return `${t.shape}${t.rot ? ` ${t.rot}°` : ""}${t.dots ? ` con ${t.dots} punto${t.dots > 1 ? "s" : ""}` : ""}`
}
