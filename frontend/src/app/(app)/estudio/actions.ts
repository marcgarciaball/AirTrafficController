"use server"

import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { scoreAttempt } from "@/lib/study/quiz"
import { UUID_RE, type FinishResponse, type ReviewItem } from "@/lib/study/types"

const uuid = z.string().regex(UUID_RE)

const startSchema = z.object({
  mode: z.enum(["tema", "simulacro"]),
  topicId: uuid.nullable(),
  questionIds: z.array(uuid).min(1).max(200),
})

const finishSchema = z.object({
  id: uuid,
  answers: z
    .array(z.object({ question_id: uuid, chosen_index: z.number().int().min(0).max(3).nullable() }))
    .max(200),
})

export async function startAttempt(
  mode: "tema" | "simulacro",
  topicId: string | null,
  questionIds: string[],
): Promise<{ id: string } | { error: string }> {
  const parsed = startSchema.safeParse({ mode, topicId, questionIds })
  if (!parsed.success) return { error: "Datos no válidos." }
  const { questionIds: ids } = parsed.data
  if (new Set(ids).size !== ids.length) return { error: "Preguntas repetidas." }
  if (parsed.data.mode === "tema" && !parsed.data.topicId) return { error: "Falta el tema." }

  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return { error: "Sesión no válida." }

  const { data: found, error: qErr } = await supabase.from("questions").select("id, topic_id").in("id", ids)
  if (qErr || !found || found.length !== ids.length) return { error: "Alguna pregunta no existe." }
  if (parsed.data.mode === "tema" && found.some((q) => q.topic_id !== parsed.data.topicId)) {
    return { error: "Las preguntas no son del tema." }
  }

  // Se guardan las preguntas del intento como respuestas pendientes; finishAttempt solo acepta estas.
  const pending = ids.map((question_id) => ({ question_id, chosen_index: null, correct: false }))
  const { data, error } = await supabase
    .from("quiz_attempts")
    .insert({
      mode: parsed.data.mode,
      topic_id: parsed.data.mode === "tema" ? parsed.data.topicId : null,
      total: ids.length,
      answers: pending,
    })
    .select("id")
    .single()
  if (error || !data) return { error: "No se pudo iniciar el intento." }
  return { id: data.id }
}

export async function finishAttempt(
  id: string,
  answers: { question_id: string; chosen_index: number | null }[],
): Promise<FinishResponse> {
  const parsed = finishSchema.safeParse({ id, answers })
  if (!parsed.success) return { error: "Datos no válidos." }

  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return { error: "Sesión no válida." }

  const { data: attempt } = await supabase
    .from("quiz_attempts")
    .select("id, finished_at, answers")
    .eq("id", parsed.data.id)
    .eq("user_id", userData.user.id)
    .maybeSingle()
  if (!attempt) return { error: "Intento no encontrado." }
  if (attempt.finished_at) return { error: "El intento ya está terminado." }

  const ids = (Array.isArray(attempt.answers) ? attempt.answers : [])
    .map((a) => (a && typeof a === "object" && !Array.isArray(a) ? (a as { question_id?: unknown }).question_id : null))
    .filter((x): x is string => typeof x === "string")
  const chosen = new Map<string, number | null>()
  for (const a of parsed.data.answers) {
    if (!ids.includes(a.question_id)) return { error: "Respuesta a una pregunta ajena al intento." }
    chosen.set(a.question_id, a.chosen_index)
  }

  // La corrección se calcula aquí con correct_index de la base de datos.
  const { data: questions, error: qErr } = await supabase
    .from("questions")
    .select("id, topic_id, stem, options, correct_index, explanation, source_pages")
    .in("id", ids)
  if (qErr || !questions || questions.length !== ids.length) return { error: "No se pudieron leer las preguntas." }
  const byId = new Map(questions.map((q) => [q.id, q]))

  const review: ReviewItem[] = ids.map((qid) => {
    const q = byId.get(qid)!
    const c = chosen.get(qid) ?? null
    return {
      question_id: qid,
      topic_id: q.topic_id,
      stem: q.stem,
      options: q.options as string[],
      chosen_index: c,
      correct_index: q.correct_index,
      correct: c === null ? null : c === q.correct_index,
      explanation: q.explanation,
      source_pages: q.source_pages,
    }
  })
  const result = scoreAttempt(review)

  const { data: updated, error } = await supabase
    .from("quiz_attempts")
    .update({
      finished_at: new Date().toISOString(),
      correct: result.correct,
      wrong: result.wrong,
      blank: result.blank,
      answers: review.map((r) => ({ question_id: r.question_id, chosen_index: r.chosen_index, correct: r.correct === true })),
    })
    .eq("id", parsed.data.id)
    .eq("user_id", userData.user.id)
    .is("finished_at", null)
    .select("id")
  if (error || !updated || updated.length === 0) return { error: "No se pudo guardar el resultado." }

  return { result, review }
}
