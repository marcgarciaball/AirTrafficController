"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { loose } from "@/lib/bloques/db"
import { review, type CardState } from "@/lib/cards/fsrs"
import { createClient } from "@/lib/supabase/server"

export async function rateCard(id: string, rating: number): Promise<{ error?: string }> {
  const p = z.object({ id: z.uuid(), rating: z.number().int().min(1).max(4) }).safeParse({ id, rating })
  if (!p.success) return { error: "Datos no válidos." }
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { error: "Sesión caducada." }
  const db = loose(supabase)
  const { data: row } = await db
    .from("user_cards")
    .select("due, stability, difficulty, elapsed_days, scheduled_days, reps, lapses, state, last_review, learning_steps")
    .eq("id", p.data.id)
    .eq("user_id", auth.user.id)
    .maybeSingle()
  if (!row) return { error: "Tarjeta no encontrada." }
  const { card, log } = review(row as CardState, p.data.rating as 1 | 2 | 3 | 4, new Date())
  const { data: updated, error } = await db.from("user_cards").update(card).eq("id", p.data.id).eq("user_id", auth.user.id).select("id")
  if (error || !updated?.length) return { error: "No se pudo guardar la valoración." }
  const { error: e2 } = await db.from("card_reviews").insert({ user_id: auth.user.id, user_card_id: p.data.id, ...log })
  if (e2) return { error: "No se pudo registrar el repaso." }
  revalidatePath("/flashback")
  revalidatePath("/hoy")
  return {}
}
