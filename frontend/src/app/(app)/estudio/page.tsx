import Link from "next/link"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { ChevronRight } from "lucide-react"
import { CHECKLIST_ROW, ROW_HOVER } from "@/components/ui-torre/checklist"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"
import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"

export default async function Page() {
  const supabase = await createClient()
  const [{ data: topics }, { data: qs }, { data: secs }, { data: attempts }] = await Promise.all([
    supabase.from("topics").select("id, number, title, sources(url, title)").order("number"),
    supabase.from("questions").select("topic_id"),
    supabase.from("topic_sections").select("topic_id"),
    supabase
      .from("quiz_attempts")
      .select("topic_id, correct, total, finished_at")
      .eq("mode", "tema")
      .not("finished_at", "is", null)
      .order("finished_at", { ascending: false }),
  ])
  const count = (rows: { topic_id: string }[] | null) => {
    const m = new Map<string, number>()
    for (const r of rows ?? []) m.set(r.topic_id, (m.get(r.topic_id) ?? 0) + 1)
    return m
  }
  const qCount = count(qs)
  const sCount = count(secs)
  const last = new Map<string, { correct: number; total: number }>()
  for (const a of attempts ?? []) if (a.topic_id && !last.has(a.topic_id)) last.set(a.topic_id, a)

  const list = topics ?? []
  return (
    <div className="space-y-12">
      <PageHeader title="Estudio" description="Lee cada tema con calma y comprueba lo aprendido con su test." />

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/estudio/simulacro" className="group rounded-lg border bg-card p-5 shadow-sm transition-colors hover:border-primary/50 sm:p-6">
          <span className="flex items-center justify-between gap-3">
            <span className="text-lg font-bold">Simulacro de examen</span>
            <ChevronRight aria-hidden="true" className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1.5 block text-muted-foreground">50 preguntas de todos los temas, con cronómetro opcional.</span>
        </Link>
        <Link href="/aptitudes" className="group rounded-lg border bg-card p-5 shadow-sm transition-colors hover:border-primary/50 sm:p-6">
          <span className="flex items-center justify-between gap-3">
            <span className="text-lg font-bold">Aptitudes</span>
            <ChevronRight aria-hidden="true" className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1.5 block text-muted-foreground">Atención, razonamiento espacial y abstracto, memoria, cálculo y multitarea.</span>
        </Link>
      </div>

      <Section title="Temario" aside={`${list.length} temas`} flush>
        <ol className="divide-y divide-line">
          {list.map((t) => {
            const nq = qCount.get(t.id) ?? 0
            const ns = sCount.get(t.id) ?? 0
            const l = last.get(t.id)
            const hasContent = nq > 0 || ns > 0
            const pdf = t.sources?.url
            const num = (
              <span aria-hidden="true" className="w-8 shrink-0 pt-px text-lg font-bold text-muted-foreground">
                {t.number}
              </span>
            )
            if (!hasContent) {
              return (
                <li key={t.id} className={CHECKLIST_ROW}>
                  {num}
                  <span className="min-w-0 flex-1 space-y-2">
                    <span className="block leading-snug text-muted-foreground">
                      <span className="sr-only">Tema {t.number}. </span>
                      {t.title}
                    </span>
                    <span className="flex flex-wrap items-center gap-3 text-sm">
                      <StatusChip tone="muted">en preparación</StatusChip>
                      {pdf ? (
                        <a href={pdf} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/40 hover:decoration-primary">
                          PDF oficial
                        </a>
                      ) : null}
                    </span>
                  </span>
                </li>
              )
            }
            return (
              <li key={t.id}>
                <Link href={`/estudio/${t.number}`} className={cn(CHECKLIST_ROW, ROW_HOVER)}>
                  {num}
                  <span className="min-w-0 flex-1 space-y-1">
                    <span className="block leading-snug font-bold text-foreground">
                      <span className="sr-only">Tema {t.number}. </span>
                      {t.title}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {ns} {ns === 1 ? "sección" : "secciones"} · {nq} {nq === 1 ? "pregunta" : "preguntas"}
                      {l ? ` · último test: ${l.correct} de ${l.total}` : ""}
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" className="size-5 shrink-0 self-center text-muted-foreground" />
                </Link>
              </li>
            )
          })}
        </ol>
      </Section>
    </div>
  )
}
