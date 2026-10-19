import type { QuizPoint, WeekBar } from "@/lib/stats/aggregate"

const W = 320
const H = 120
const PAD = { l: 28, r: 4, t: 6, b: 16 }

/** Barras de horas por semana. La semana actual va en primary y las anteriores en primary atenuado; la meta es una línea discontinua warning. */
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
      <text x={PAD.l - 4} y={y(top)} fontSize="8" textAnchor="end" dominantBaseline="central" className="fill-muted-foreground">{top}</text>
      <text x={PAD.l - 4} y={y(0)} fontSize="8" textAnchor="end" dominantBaseline="central" className="fill-muted-foreground">0</text>
      {bars.map((b, i) => (
        <g key={b.week}>
          <rect
            x={PAD.l + i * bw + 3}
            y={y(b.hours)}
            width={bw - 6}
            height={Math.max(0, y(0) - y(b.hours))}
            rx={2}
            className={i === bars.length - 1 ? "fill-primary" : "fill-primary/40"}
          />
          <text x={PAD.l + i * bw + bw / 2} y={H - 4} fontSize="7" textAnchor="middle" className="fill-muted-foreground">
            {b.week.slice(8)}/{b.week.slice(5, 7)}
          </text>
        </g>
      ))}
      {goalHours > 0 ? (
        <line x1={PAD.l} x2={W - PAD.r} y1={y(goalHours)} y2={y(goalHours)} strokeDasharray="3 2" className="stroke-warning" />
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
          <text x={PAD.l - 4} y={y(g)} fontSize="8" textAnchor="end" dominantBaseline="central" className="fill-muted-foreground">{g}</text>
        </g>
      ))}
      <polyline fill="none" strokeWidth="1.75" strokeLinejoin="round" className="stroke-success" points={points.map((p, i) => `${x(i)},${y(p.pct)}`).join(" ")} />
      {points.map((p, i) => (
        <circle key={i} cx={x(i)} cy={y(p.pct)} r="3" strokeWidth="1.5" className={p.mode === "simulacro" ? "fill-primary stroke-primary" : "fill-card stroke-success"} />
      ))}
    </svg>
  )
}
