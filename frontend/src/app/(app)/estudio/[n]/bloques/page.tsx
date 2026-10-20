import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { CHECKLIST_ROW, ROW_HOVER } from "@/components/ui-torre/checklist"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Card } from "@/components/ui-torre/section"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { loose } from "@/lib/bloques/db"
import { loadBlockStats } from "@/lib/bloques/progress"
import { createClient } from "@/lib/supabase/server"
import { topicMastery } from "@/lib/study/mastery"
import { cn } from "@/lib/utils"

const PART: Record<string, string> = { conocimientos: "Conocimientos" }

export default async function Page({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params
  const num = Number(n)
  if (!Number.isInteger(num) || num < 1 || num > 9) notFound()
  const db = loose(await createClient())
  const { data: topic } = await db.from("topics").select("id, number, title").eq("number", num).maybeSingle()
  if (!topic) notFound()
  const [{ data: blocks }, stats] = await Promise.all([
    db.from("study_blocks").select("id, title, temario_point, exam_part, sort, key_idea").eq("topic_id", topic.id).order("sort"),
    loadBlockStats(db),
  ])
  const list = (blocks ?? []) as { id: string; title: string; temario_point: string; exam_part: string; key_idea: string }[]
  const tm = topicMastery(list.map((b) => ({ mastery: stats.get(b.id)?.mastery ?? null })))
  const done = list.filter((b) => stats.get(b.id)?.status === "hecho").length

  return (
    <div className="space-y-10">
      <PageHeader title={`Tema ${topic.number}: ${topic.title}`} back={{ href: `/estudio/${num}`, label: `Tema ${num}` }}>
        <p className="text-muted-foreground">
          {done} de {list.length} bloques hechos{tm !== null ? ` · dominio ${tm} %` : ""}. Cada bloque dura unos 5 minutos.
        </p>
      </PageHeader>
      {list.length === 0 ? (
        <p className="text-lg text-muted-foreground">Este tema aún no tiene bloques.</p>
      ) : (
        <Card flush>
          <ol className="divide-y divide-line">
            {list.map((b, i) => {
              const s = stats.get(b.id)
              return (
                <li key={b.id}>
                  <Link href={`/estudio/${num}/b/${b.id}`} className={cn(CHECKLIST_ROW, ROW_HOVER, "items-center")}>
                    <span className="w-6 shrink-0 text-muted-foreground tabular-nums">{i + 1}</span>
                    <span className="min-w-0 flex-1 space-y-2">
                      <span className="block text-lg leading-snug font-bold">{b.title}</span>
                      <span className="flex flex-wrap gap-2">
                        <StatusChip>punto {b.temario_point}</StatusChip>
                        <StatusChip>{PART[b.exam_part] ?? b.exam_part}</StatusChip>
                        {s?.status === "hecho" ? <StatusChip tone="success">hecho</StatusChip> : s?.status === "en_curso" ? <StatusChip tone="primary">en curso</StatusChip> : <StatusChip>sin empezar</StatusChip>}
                        {s?.mastery != null ? <StatusChip tone={s.mastery >= 70 ? "success" : "warning"}>dominio {s.mastery} %</StatusChip> : null}
                      </span>
                    </span>
                    <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              )
            })}
          </ol>
        </Card>
      )}
    </div>
  )
}
