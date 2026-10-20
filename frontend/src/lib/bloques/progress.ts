import { blockMastery } from "@/lib/study/mastery"
import type { LooseClient } from "./db"

export type BlockStat = { status: "en_curso" | "hecho" | null; mastery: number | null }

/** Estado y dominio de cada bloque del usuario (RLS limita a sus filas). */
export async function loadBlockStats(db: LooseClient): Promise<Map<string, BlockStat>> {
  const [{ data: progress }, { data: reviews }] = await Promise.all([
    db.from("user_block_progress").select("block_id, status, check_correct, check_total"),
    db.from("card_reviews").select("rating, user_cards!inner(concept_cards!inner(block_id))").limit(5000),
  ])
  const byBlock = new Map<string, { rating: number }[]>()
  for (const r of (reviews ?? []) as unknown as { rating: number; user_cards: { concept_cards: { block_id: string } } }[]) {
    const id = r.user_cards?.concept_cards?.block_id
    if (!id) continue
    const list = byBlock.get(id) ?? []
    list.push({ rating: r.rating })
    byBlock.set(id, list)
  }
  const out = new Map<string, BlockStat>()
  for (const p of (progress ?? []) as { block_id: string; status: "en_curso" | "hecho"; check_correct: number | null; check_total: number | null }[]) {
    const total = p.check_total ?? 0
    const mastery = p.status === "hecho" && total > 0 ? blockMastery(p.check_correct ?? 0, total, byBlock.get(p.block_id) ?? []) : null
    out.set(p.block_id, { status: p.status, mastery })
  }
  return out
}
