import { makeRng } from "./rng"

export type MemoriaItem = {
  mode: "digitos" | "posiciones"
  /** Dígitos 0-9, o índices de casilla (0..cells-1) en una rejilla `cols` x `cols`. */
  sequence: number[]
  cols: number
  /** Segundos que se muestra la secuencia. */
  showSeconds: number
}

/** Secuencia de 3+nivel elementos, sin repetir el mismo dos veces seguidas. */
export function generateMemoria(level: number, seed: number): MemoriaItem {
  const rng = makeRng(seed)
  const mode = rng.next() < 0.5 ? "digitos" : "posiciones"
  const cols = level <= 3 ? 3 : 4
  const range = mode === "digitos" ? 10 : cols * cols
  const length = 3 + level
  const sequence: number[] = []
  while (sequence.length < length) {
    const v = rng.int(0, range - 1)
    if (v !== sequence[sequence.length - 1]) sequence.push(v)
  }
  return { mode, sequence, cols, showSeconds: Math.max(2, Math.round(length * 0.8)) }
}

export const parseDigits = (s: string): number[] => (s.match(/\d/g) ?? []).map(Number)

export const checkMemoria = (item: MemoriaItem, answer: number[]) =>
  answer.length === item.sequence.length && answer.every((v, i) => v === item.sequence[i])
