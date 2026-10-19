import { makeRng, type Rng } from "./rng"

export type Cell = [number, number]
export type EspacialItem = { base: Cell[]; options: Cell[][]; answerIndex: number }

const sortCells = (c: Cell[]): Cell[] => [...c].sort((a, b) => a[1] - b[1] || a[0] - b[0])

export function normalize(cells: Cell[]): Cell[] {
  const mx = Math.min(...cells.map((c) => c[0]))
  const my = Math.min(...cells.map((c) => c[1]))
  return sortCells(cells.map(([x, y]) => [x - mx, y - my] as Cell))
}
const keyOf = (cells: Cell[]) => normalize(cells).map((c) => c.join(",")).join(";")

export const rotate90 = (cells: Cell[]): Cell[] => normalize(cells.map(([x, y]) => [-y, x] as Cell))
export const reflect = (cells: Cell[]): Cell[] => normalize(cells.map(([x, y]) => [-x, y] as Cell))

function rotations(cells: Cell[]): Cell[][] {
  const out: Cell[][] = [normalize(cells)]
  for (let i = 0; i < 3; i++) out.push(rotate90(out[i]))
  return out
}
/** ¿b es a girada (sin reflejar)? */
export const isRotationOf = (a: Cell[], b: Cell[]) => rotations(a).some((r) => keyOf(r) === keyOf(b))
/** ¿b es a girada o reflejada? */
export const isCongruent = (a: Cell[], b: Cell[]) => isRotationOf(a, b) || isRotationOf(reflect(a), b)

const DIRS: Cell[] = [[1, 0], [-1, 0], [0, 1], [0, -1]]
const has = (cells: Cell[], x: number, y: number) => cells.some((c) => c[0] === x && c[1] === y)

function connected(cells: Cell[]): boolean {
  const seen = new Set([cells[0].join(",")])
  const stack = [cells[0]]
  while (stack.length) {
    const [x, y] = stack.pop()!
    for (const [dx, dy] of DIRS) {
      const k = `${x + dx},${y + dy}`
      if (!seen.has(k) && has(cells, x + dx, y + dy)) {
        seen.add(k)
        stack.push([x + dx, y + dy])
      }
    }
  }
  return seen.size === cells.length
}

function grow(n: number, rng: Rng): Cell[] {
  const cells: Cell[] = [[0, 0]]
  while (cells.length < n) {
    const [x, y] = rng.pick(cells)
    const [dx, dy] = rng.pick(DIRS)
    if (!has(cells, x + dx, y + dy)) cells.push([x + dx, y + dy])
  }
  return normalize(cells)
}

/** Distractor: mueve una celda a otra posición adyacente, manteniendo la conexión. */
function mutate(cells: Cell[], rng: Rng): Cell[] | null {
  const i = rng.int(0, cells.length - 1)
  const rest = cells.filter((_, j) => j !== i)
  if (!connected(rest)) return null
  const [x, y] = rng.pick(rest)
  const [dx, dy] = rng.pick(DIRS)
  if (has(rest, x + dx, y + dy)) return null
  return normalize([...rest, [x + dx, y + dy]])
}

/** Figura de n celdas y 4 opciones: una sola es la misma figura girada; otra es el reflejo (distractor). */
export function generateEspacial(level: number, seed: number): EspacialItem {
  const rng = makeRng(seed)
  const n = 4 + level // 5..9
  for (let attempt = 0; attempt < 500; attempt++) {
    const base = grow(n, rng)
    if (isRotationOf(base, reflect(base))) continue // simétrica: el reflejo sería igual de válido
    const rots = rotations(base).slice(1).filter((r) => keyOf(r) !== keyOf(base))
    if (!rots.length) continue
    const correct = rng.pick(rots)
    const options: Cell[][] = [correct, reflect(rng.pick(rots))]
    let tries = 0
    while (options.length < 4 && tries++ < 200) {
      const m = mutate(rng.pick([base, reflect(base)]), rng)
      if (!m || isCongruent(base, m)) continue
      if (options.some((o) => isCongruent(o, m))) continue
      options.push(m)
    }
    if (options.length < 4) continue
    const order = rng.shuffle(options.map((o, i) => i))
    return { base, options: order.map((i) => options[i]), answerIndex: order.indexOf(0) }
  }
  throw new Error("espacial: no se pudo generar la figura")
}
