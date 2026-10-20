"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { loose } from "@/lib/bloques/db"
import { newCardState } from "@/lib/cards/fsrs"
import { createClient } from "@/lib/supabase/server"

const uuid = z.uuid()

export type AnswerResult = { correct: boolean; correct_index: number; explanation: string | null }

export async function answerQuestion(questionId: string, chosen: number | null): Promise<AnswerResult | { error: string }> {
  const p = z.object({ q: uuid, c: z.number().int().min(0).max(3).nullable() }).safeParse({ q: questionId, c: chosen })
  if (!p.success) return { error: "Datos no válidos." }
  const db = loose(await createClient())
  const { data, error } = await db.rpc("answer_block_question", { p_question_id: p.data.q, p_chosen: p.data.c })
  if (error || !data) return { error: "No se pudo corregir la pregunta." }
  return data as AnswerResult
}

export async function completeBlock(blockId: string): Promise<{ check_correct: number; check_total: number; new_cards: number } | { error: string }> {
  const p = uuid.safeParse(blockId)
  if (!p.success) return { error: "Datos no válidos." }
  const db = loose(await createClient())
  const { data, error } = await db.rpc("complete_block", { p_block_id: p.data })
  if (error || !data) return { error: "No se pudo terminar el bloque." }
  revalidatePath("/estudio", "layout")
  revalidatePath("/hoy")
  revalidatePath("/flashback")
  return data as { check_correct: number; check_total: number; new_cards: number }
}

/** Crea una tarjeta propia (baraja "propias"). Compartida con el Flashback. */
export async function createOwnCard(front: string, back: string): Promise<{ error?: string }> {
  const p = z.object({ front: z.string().trim().min(1).max(500), back: z.string().trim().min(1).max(2000) }).safeParse({ front, back })
  if (!p.success) return { error: "Escribe el anverso y el reverso." }
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { error: "Sesión caducada." }
  const s = newCardState(new Date())
  const { error } = await loose(supabase).from("user_cards").insert({ user_id: auth.user.id, front: p.data.front, back: p.data.back, deck: "propias", ...s })
  if (error) return { error: "No se pudo guardar la tarjeta." }
  revalidatePath("/flashback")
  return {}
}
