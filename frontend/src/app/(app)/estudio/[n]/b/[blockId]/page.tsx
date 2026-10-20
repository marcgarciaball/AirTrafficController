import { notFound } from "next/navigation"
import { BlockRunner, type RunnerQuestion } from "@/components/study/block-runner"
import { PageHeader } from "@/components/ui-torre/page-header"
import { loose } from "@/lib/bloques/db"
import { visibleSteps } from "@/lib/study/steps"
import { createClient } from "@/lib/supabase/server"
import { UUID_RE } from "@/lib/study/types"

export default async function Page({ params }: { params: Promise<{ n: string; blockId: string }> }) {
  const { n, blockId } = await params
  const num = Number(n)
  if (!Number.isInteger(num) || num < 1 || num > 9 || !UUID_RE.test(blockId)) notFound()
  const db = loose(await createClient())
  const { data: block } = await db
    .from("study_blocks")
    .select("id, topic_id, sort, title, objectives, key_idea, body_md, example_md, trap_md, exam_tip_md, mnemonic_md, source_pages, reviewed, topics!inner(number)")
    .eq("id", blockId)
    .eq("topics.number", num)
    .maybeSingle()
  if (!block) notFound()
  // Nunca se piden correct_index ni explanation: la corrección va por la RPC.
  const [{ data: qs }, { data: siblings }] = await Promise.all([
    db.from("block_questions").select("id, role, stem, options").eq("block_id", blockId).in("role", ["previa", "comprobacion"]).order("id"),
    db.from("study_blocks").select("id, sort").eq("topic_id", block.topic_id).gt("sort", block.sort).order("sort").limit(1),
  ])
  const rows = (qs ?? []) as { id: string; role: string; stem: string; options: string[] }[]
  const pick = (role: string): RunnerQuestion[] => rows.filter((q) => q.role === role).map(({ id, stem, options }) => ({ id, stem, options }))
  const previa = pick("previa")
  const comprobacion = pick("comprobacion")
  const steps = visibleSteps(block).filter((s) => (s === "previa" ? previa.length > 0 : s === "comprobacion" ? comprobacion.length > 0 : true))

  return (
    <div className="space-y-8">
      <PageHeader title={block.title} back={{ href: `/estudio/${num}/bloques`, label: `Bloques del tema ${num}` }} />
      <BlockRunner
        block={block}
        steps={steps}
        previa={previa}
        comprobacion={comprobacion}
        topicNumber={num}
        nextBlockId={(siblings as { id: string }[] | null)?.[0]?.id ?? null}
      />
    </div>
  )
}
