import { makeRng } from "./rng"

export type AtencionItem = { grid: string[][]; target: string; answer: number }

const SYMBOLS = ["▲", "●", "■", "◆", "★", "✚"]
const LETTERS = ["B", "D", "P", "Q", "R", "E", "F", "H", "M", "N"]

export function countTarget(grid: string[][], target: string): number {
  return grid.reduce((n, row) => n + row.filter((c) => c === target).length, 0)
}

/** Cuenta cuántas veces aparece el objetivo. Nivel 1-3: símbolos; 4-5: letras parecidas. */
export function generateAtencion(level: number, seed: number): AtencionItem {
  const rng = makeRng(seed)
  const size = 3 + level + 1 // 5..9
  const pool = level >= 4 ? LETTERS.slice(0, 5 + level) : SYMBOLS.slice(0, 2 + level)
  const target = rng.pick(pool)
  const others = pool.filter((s) => s !== target)
  const cells = size * size
  const count = rng.int(Math.max(2, Math.floor(cells / 10)), Math.max(3, Math.floor(cells / 5)))
  const flat = rng.shuffle(Array.from({ length: cells }, (_, i) => (i < count ? target : rng.pick(others))))
  const grid = Array.from({ length: size }, (_, r) => flat.slice(r * size, (r + 1) * size))
  return { grid, target, answer: countTarget(grid, target) }
}
