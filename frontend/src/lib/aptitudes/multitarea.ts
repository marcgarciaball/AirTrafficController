import { generateCalculo, type CalculoItem } from "./calculo"
import { makeRng } from "./rng"

export type MultitareaItem = {
  seed: number
  level: number
  durationS: number
  /** Radio de acierto, en fracción del lado del recuadro. */
  radius: number
  calc: CalculoItem[]
}

export const trackingRadius = (level: number) => Math.max(0.07, 0.15 - level * 0.015)

/** Posición (0..1) del objetivo a los `tMs` ms: suma de dos senoides con fases y frecuencias de la semilla. */
export function trackingPosition(seed: number, level: number, tMs: number): { x: number; y: number } {
  const rng = makeRng(seed * 31 + level)
  const speed = 0.35 + level * 0.12
  const t = (tMs / 1000) * speed
  const p = Array.from({ length: 6 }, () => rng.next() * Math.PI * 2)
  const f = [rng.int(7, 11) / 10, rng.int(5, 9) / 10, rng.int(12, 17) / 10, rng.int(8, 13) / 10]
  const x = 0.5 + 0.3 * Math.sin(t * f[0] + p[0]) + 0.15 * Math.sin(t * f[2] + p[1])
  const y = 0.5 + 0.3 * Math.sin(t * f[1] + p[2]) + 0.15 * Math.sin(t * f[3] + p[3])
  return { x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y)) }
}

export const trackingHit = (target: { x: number; y: number }, pointer: { x: number; y: number }, radius: number) =>
  Math.hypot(target.x - pointer.x, target.y - pointer.y) <= radius

export const trackingFraction = (hits: number, samples: number) => (samples > 0 ? hits / samples : 0)

/** Tarea doble: cada cálculo acertado suma 1 y el seguimiento aporta hasta `calcTotal` puntos. */
export function multitaskScore(calcCorrect: number, calcTotal: number, fraction: number) {
  return { score: calcCorrect + Math.round(fraction * calcTotal), total: calcTotal * 2 }
}

export function generateMultitarea(level: number, seed: number): MultitareaItem {
  const n = 6 + level
  return {
    seed,
    level,
    durationS: n * 10,
    radius: trackingRadius(level),
    calc: Array.from({ length: n }, (_, i) => generateCalculo(Math.min(level, 3), seed + i * 7919)),
  }
}
