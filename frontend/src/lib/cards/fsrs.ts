import { createEmptyCard, fsrs, type Card, type CardInput, type Grade } from "ts-fsrs"

export type CardState = {
  due: string
  stability: number
  difficulty: number
  elapsed_days: number
  scheduled_days: number
  reps: number
  lapses: number
  state: number
  last_review: string | null
  /** Extension opcional: paso de aprendizaje de ts-fsrs. Si falta, se asume 0. */
  learning_steps?: number
}

const scheduler = fsrs({ request_retention: 0.9 })

function fromCard(c: Card): CardState {
  return {
    due: c.due.toISOString(),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsed_days: c.elapsed_days,
    scheduled_days: c.scheduled_days,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state,
    last_review: c.last_review ? c.last_review.toISOString() : null,
    learning_steps: c.learning_steps,
  }
}

function toCard(s: CardState): CardInput {
  return {
    due: s.due,
    stability: s.stability,
    difficulty: s.difficulty,
    elapsed_days: s.elapsed_days,
    scheduled_days: s.scheduled_days,
    learning_steps: s.learning_steps ?? 0,
    reps: s.reps,
    lapses: s.lapses,
    state: s.state,
    last_review: s.last_review,
  }
}

export function newCardState(now: Date): CardState {
  return fromCard(createEmptyCard(now))
}

export function review(
  card: CardState,
  rating: 1 | 2 | 3 | 4,
  now: Date,
): { card: CardState; log: { rating: number; elapsed_days: number; scheduled_days: number } } {
  const r = scheduler.next(toCard(card), now, rating as Grade)
  return {
    card: fromCard(r.card),
    log: { rating: r.log.rating, elapsed_days: r.log.elapsed_days, scheduled_days: r.log.scheduled_days },
  }
}
