const SECONDS_PER_CARD = 8
const BLOCK_MINUTES = 5
const QUESTION_MINUTES = 0.5
const MAX_REVIEW_QUESTIONS = 10

export function buildSession(i: {
  todayMinutes: number
  dueCards: number
  newBlocks: { id: string; minutes: number }[]
  weakBlocks: { id: string }[]
  failedQuestions: number
}): { cards: number; blocks: string[]; weak: string[]; reviewQuestions: number; minutes: number } {
  const cards = Math.max(0, Math.min(i.dueCards, Math.floor((0.4 * i.todayMinutes * 60) / SECONDS_PER_CARD)))
  let minutes = (cards * SECONDS_PER_CARD) / 60
  const weak: string[] = []
  const blocks: string[] = []

  const budget = i.todayMinutes

  if (i.weakBlocks.length && minutes + BLOCK_MINUTES <= budget) {
    weak.push(i.weakBlocks[0].id)
    minutes += BLOCK_MINUTES
  }
  for (const b of i.newBlocks) {
    if (minutes + b.minutes > budget) break
    blocks.push(b.id)
    minutes += b.minutes
  }
  // Las preguntas de repaso ocupan el tiempo que sobra.
  const leftover = Math.max(0, budget - minutes)
  const reviewQuestions = Math.min(MAX_REVIEW_QUESTIONS, Math.max(0, i.failedQuestions), Math.floor(leftover / QUESTION_MINUTES))
  minutes += reviewQuestions * QUESTION_MINUTES
  return { cards, blocks, weak, reviewQuestions, minutes: Math.round(minutes * 10) / 10 }
}
