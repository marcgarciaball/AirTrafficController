"use server"

import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { UUID_RE, type AttemptResult, type FinishResponse, type ReviewItem } from "@/lib/study/types"

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

  // La corrección la hace la función de base de datos: correct_index no es legible por el cliente.
  const { data, error } = await supabase.rpc("finish_quiz_attempt", {
    p_attempt_id: parsed.data.id,
    p_answers: parsed.data.answers,
  })
  if (error || !data || typeof data !== "object" || Array.isArray(data)) {
    return { error: "No se pudo guardar el resultado." }
  }
  const out = data as unknown as {
    result: AttemptResult
    review: { question_id: string; chosen_index: number | null; correct_index: number; correct: boolean | null; explanation: string }[]
  }

  const { data: questions, error: qErr } = await supabase
    .from("questions")
    .select("id, topic_id, stem, options, source_pages")
    .in("id", out.review.map((r) => r.question_id))
  if (qErr || !questions) return { error: "No se pudieron leer las preguntas." }
  const byId = new Map(questions.map((q) => [q.id, q]))

  const review: ReviewItem[] = []
  for (const r of out.review) {
    const q = byId.get(r.question_id)
    if (!q) return { error: "No se pudieron leer las preguntas." }
    review.push({
      question_id: r.question_id,
      topic_id: q.topic_id,
      stem: q.stem,
      options: q.options as string[],
      chosen_index: r.chosen_index,
      correct_index: r.correct_index,
      correct: r.correct,
      explanation: r.explanation,
      source_pages: q.source_pages,
    })
  }
  return { result: out.result, review }
}
