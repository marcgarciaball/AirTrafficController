import Link from "next/link"
import { Annunciator } from "@/components/cockpit/annunciator"
import { Memo, MemoItem } from "@/components/cockpit/memo"
import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
import { createClient } from "@/lib/supabase/server"

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
    <section className="space-y-6">
      <PageTitle code="ESTD · Temario" title="Estudio" />
      <Panel title="Simulacro" flush>
        <Memo>
          <MemoItem state="disponible" href="/estudio/simulacro" detail="Preguntas de todos los temas, con cronómetro opcional." meta={<span className="font-mono">50 PREG</span>}>
            Simulacro de examen
          </MemoItem>
        </Memo>
      </Panel>
      <Panel title="Aptitudes" flush>
        <Memo>
          <MemoItem state="disponible" href="/aptitudes" detail="Atención, razonamiento espacial y abstracto, memoria, cálculo y multitarea.">
            APTITUDES
          </MemoItem>
        </Memo>
      </Panel>
      <Panel title="Temas" aside={`${list.length}`} flush>
        <ul className="divide-y divide-line">
          {list.map((t) => {
            const nq = qCount.get(t.id) ?? 0
            const ns = sCount.get(t.id) ?? 0
            const l = last.get(t.id)
            const hasContent = nq > 0 || ns > 0
            const pdf = t.sources?.url
            const row = "flex items-start gap-3 px-3 py-2.5 sm:px-4"
            const num = <span className="w-7 shrink-0 font-mono text-sm tabular-nums">T{t.number}</span>
            if (!hasContent) {
              return (
                <li key={t.id} className={`${row} text-muted-foreground`}>
                  {num}
                  <span className="min-w-0 flex-1 space-y-1">
                    <span className="block leading-snug">{t.title}</span>
                    <span className="flex flex-wrap items-center gap-2 text-sm">
                      <Annunciator tone="dim">En preparación</Annunciator>
                      {pdf ? (
                        <a href={pdf} target="_blank" rel="noopener noreferrer" className="text-cyan underline decoration-line underline-offset-2 hover:decoration-cyan">
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
                <Link href={`/estudio/${t.number}`} className={`${row} hover:bg-surface`}>
                  <span className="text-cyan">{num}</span>
                  <span className="min-w-0 flex-1 space-y-0.5">
                    <span className="block leading-snug text-cyan">{t.title}</span>
                    <span className="block font-mono text-xs text-muted-foreground tabular-nums">
                      {ns} SECC · {nq} PREG
                    </span>
                  </span>
                  <span className="shrink-0 self-center text-right">
                    <span className="block text-xs uppercase tracking-wide text-muted-foreground">Último</span>
                    <span className="block font-mono text-sm text-foreground tabular-nums">{l ? `${l.correct}/${l.total}` : "—"}</span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 self-center font-mono text-cyan">›</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Panel>
    </section>
  )
}
