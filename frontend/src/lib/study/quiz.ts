import type { Database } from "@/lib/supabase/database.types"

export type QuestionRow = Omit<Database["public"]["Tables"]["questions"]["Row"], "options"> & {
  options: string[]
}

/** PRNG determinista (mulberry32). Sin seed usa Math.random. */
function rng(seed?: number): () => number {
  if (seed === undefined) return Math.random
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(arr: readonly T[], rand: () => number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickQuestions<T = QuestionRow>(pool: T[], n: number, seed?: number): T[] {
  if (n <= 0) return []
  return shuffle(pool, rng(seed)).slice(0, n)
}

/** Reparto lo más equitativo posible entre temas con preguntas; el sobrante de un tema corto pasa a los demás. */
export function pickSimulacro<T = QuestionRow>(poolByTopic: Record<string, T[]>, n = 50, seed?: number): T[] {
  const rand = rng(seed)
  const queues = Object.keys(poolByTopic)
    .sort()
    .filter((k) => poolByTopic[k].length > 0)
    .map((k) => shuffle(poolByTopic[k], rand))
  const picked: T[] = []
  // Ronda a ronda: una pregunta por tema en cada vuelta.
  while (picked.length < n && queues.some((qu) => qu.length > 0)) {
    const order = shuffle(queues, rand)
    for (const qu of order) {
      if (picked.length >= n) break
      const next = qu.shift()
      if (next) picked.push(next)
    }
  }
  return shuffle(picked, rand)
}

export function scoreAttempt(answers: { correct: boolean | null }[]) {
  const total = answers.length
  const correct = answers.filter((a) => a.correct === true).length
  const wrong = answers.filter((a) => a.correct === false).length
  const blank = total - correct - wrong
  return { total, correct, wrong, blank, pct: total === 0 ? 0 : Math.round((correct / total) * 100) }
}
