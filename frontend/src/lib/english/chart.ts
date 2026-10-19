export type LogPoint = { taken_on: string; score: number | null; max_score: number | null }
export type ChartPoint = { date: string; pct: number; x: number; y: number }

/** Porcentaje 0..100 de una nota, o null si no hay máximo válido. */
export function percent(score: number, max: number): number | null {
  if (!(max > 0)) return null
  return Math.max(0, Math.min(100, (score / max) * 100))
}

/** Puntos del gráfico de evolución: por fecha, 100 % arriba (y = 0) y 0 % abajo (y = height). */
export function chartPoints(logs: LogPoint[], width: number, height: number): ChartPoint[] {
  const valid = logs
    .flatMap((l) => {
      if (l.score === null || l.max_score === null) return []
      const pct = percent(l.score, l.max_score)
      return pct === null ? [] : [{ date: l.taken_on, pct }]
    })
    .sort((a, b) => a.date.localeCompare(b.date))
  const n = valid.length
  return valid.map((p, i) => ({
    ...p,
    x: n === 1 ? width / 2 : (i / (n - 1)) * width,
    y: height - (p.pct / 100) * height,
  }))
}
