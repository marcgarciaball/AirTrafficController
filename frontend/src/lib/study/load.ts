import { createClient } from "@/lib/supabase/server"
import type { ClientQuestion } from "./types"

/** Lee preguntas SIN correct_index ni explicación para enviarlas al cliente. */
export async function loadClientQuestions(topicId?: string): Promise<Record<string, ClientQuestion[]>> {
  const supabase = await createClient()
  let q = supabase.from("questions").select("id, topic_id, stem, options")
  if (topicId) q = q.eq("topic_id", topicId)
  const { data } = await q
  const out: Record<string, ClientQuestion[]> = {}
  for (const r of data ?? []) (out[r.topic_id] ??= []).push({ id: r.id, topic_id: r.topic_id, stem: r.stem, options: r.options as string[] })
  return out
}
