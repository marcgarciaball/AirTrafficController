import type { QuizPoint, WeekBar } from "@/lib/stats/aggregate"

const W = 320
const H = 120
const PAD = { l: 28, r: 4, t: 6, b: 16 }

/** Barras de horas por semana. La semana actual va en cyan y la meta semanal en una línea amber. */
export function WeeklyBars({ bars, goalHours }: { bars: WeekBar[]; goalHours: number }) {
  const max = Math.max(1, goalHours, ...bars.map((b) => b.hours))
  const top = Math.ceil(max)
  const iw = W - PAD.l - PAD.r
  const ih = H - PAD.t - PAD.b
  const bw = iw / bars.length
  const y = (h: number) => PAD.t + ih - (h / top) * ih
  const summary = bars.map((b) => `${b.week}: ${b.hours.toFixed(1)} h`).join("; ")
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Horas por semana. ${summary}`} className="w-full">
      <line x1={PAD.l} x2={W - PAD.r} y1={y(0)} y2={y(0)} className="stroke-line" />
      <line x1={PAD.l} x2={W - PAD.r} y1={y(top)} y2={y(top)} className="stroke-line" />
      <text x={PAD.l - 4} y={y(top)} fontSize="8" textAnchor="end" dominantBaseline="central" className="fill-muted-foreground font-mono">{top}</text>
      <text x={PAD.l - 4} y={y(0)} fontSize="8" textAnchor="end" dominantBaseline="central" className="fill-muted-foreground font-mono">0</text>
      {bars.map((b, i) => (
        <g key={b.week}>
          <rect
            x={PAD.l + i * bw + 2}
            y={y(b.hours)}
            width={bw - 4}
            height={Math.max(0, y(0) - y(b.hours))}
            className={i === bars.length - 1 ? "fill-cyan" : "fill-green"}
          />
          <text x={PAD.l + i * bw + bw / 2} y={H - 4} fontSize="7" textAnchor="middle" className="fill-muted-foreground font-mono">
            {b.week.slice(8)}/{b.week.slice(5, 7)}
          </text>
        </g>
      ))}
      {goalHours > 0 ? (
        <line x1={PAD.l} x2={W - PAD.r} y1={y(goalHours)} y2={y(goalHours)} strokeDasharray="3 2" className="stroke-amber" />
      ) : null}
    </svg>
  )
}

/** Evolución de la nota (% de aciertos) de los tests, 0 a 100. */
export function QuizLine({ points }: { points: QuizPoint[] }) {
  const iw = W - PAD.l - PAD.r
  const ih = H - PAD.t - PAD.b
  const x = (i: number) => PAD.l + (points.length === 1 ? iw / 2 : (i / (points.length - 1)) * iw)
  const y = (p: number) => PAD.t + ih - (p / 100) * ih
  const summary = points.map((p) => `${p.at.slice(0, 10)}: ${p.pct} %`).join("; ")
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Notas de los tests. ${summary}`} className="w-full">
      {[0, 50, 100].map((g) => (
        <g key={g}>
          <line x1={PAD.l} x2={W - PAD.r} y1={y(g)} y2={y(g)} className="stroke-line" />
          <text x={PAD.l - 4} y={y(g)} fontSize="8" textAnchor="end" dominantBaseline="central" className="fill-muted-foreground font-mono">{g}</text>
        </g>
      ))}
      <polyline fill="none" strokeWidth="1.5" className="stroke-green" points={points.map((p, i) => `${x(i)},${y(p.pct)}`).join(" ")} />
      {points.map((p, i) => (
        <rect key={i} x={x(i) - 2} y={y(p.pct) - 2} width="4" height="4" className={p.mode === "simulacro" ? "fill-cyan" : "fill-green"} />
      ))}
    </svg>
  )
}
