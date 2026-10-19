import { chartPoints, type LogPoint } from "@/lib/english/chart"
import { formatDate } from "@/lib/format"

const W = 300
const H = 100

/** Gráfico de evolución simple (SVG propio): % de la nota máxima por fecha. */
export function EvolutionChart({ logs, label }: { logs: LogPoint[]; label: string }) {
  const pts = chartPoints(logs, W, H)
  if (pts.length === 0) return <p className="text-sm text-muted-foreground">Sin notas todavía.</p>
  const last = pts[pts.length - 1]
  return (
    <figure className="space-y-1">
      <svg
        viewBox={`-28 -8 ${W + 44} ${H + 28}`}
        role="img"
        aria-label={`${label}: ${pts.length} prueba(s), última ${Math.round(last.pct)} % el ${formatDate(last.date)}`}
        className="h-auto w-full max-w-xl"
      >
        {[0, 50, 100].map((g) => (
          <g key={g}>
            <line x1={0} x2={W} y1={H - g} y2={H - g} className="stroke-line" strokeWidth={1} />
            <text x={-4} y={H - g + 3} textAnchor="end" className="fill-muted-foreground font-mono tabular-nums" fontSize={8}>
              {g}
            </text>
          </g>
        ))}
        {pts.length > 1 ? (
          <polyline points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" className="stroke-cyan" strokeWidth={1} />
        ) : null}
        {pts.map((p) => (
          <rect key={`${p.date}-${p.x}`} x={p.x - 2} y={p.y - 2} width={4} height={4} className="fill-cyan" />
        ))}
        <text x={0} y={H + 14} className="fill-muted-foreground font-mono tabular-nums" fontSize={8}>
          {formatDate(pts[0].date)}
        </text>
        <text x={W} y={H + 14} textAnchor="end" className="fill-muted-foreground font-mono tabular-nums" fontSize={8}>
          {formatDate(last.date)}
        </text>
      </svg>
      <figcaption className="text-xs uppercase tracking-wide text-muted-foreground">{label} · % de la nota máxima</figcaption>
    </figure>
  )
}
