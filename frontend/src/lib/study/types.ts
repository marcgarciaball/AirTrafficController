/** Pregunta tal como llega al cliente: sin respuesta correcta ni explicación. */
export type ClientQuestion = {
  id: string
  topic_id: string
  stem: string
  options: string[]
}

export type ReviewItem = {
  question_id: string
  topic_id: string
  stem: string
  options: string[]
  chosen_index: number | null
  correct_index: number
  correct: boolean | null
  explanation: string
  source_pages: string
}

export type AttemptResult = {
  total: number
  correct: number
  wrong: number
  blank: number
  pct: number
}

export type FinishResponse = { error: string } | { result: AttemptResult; review: ReviewItem[] }

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export const SIMULACRO_SIZE = 50
export const TEMA_TEST_SIZE = 10
