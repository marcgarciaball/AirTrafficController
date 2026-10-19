import { Annunciator } from "@/components/cockpit/annunciator"
import { Gauge } from "@/components/cockpit/gauge"
import { Memo, MemoItem } from "@/components/cockpit/memo"
import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
import { Tape } from "@/components/cockpit/tape"
import { KINDS, KIND_META, MAX_LEVEL, summarize } from "@/lib/aptitudes/kinds"
import { createClient } from "@/lib/supabase/server"
import { AptNotice } from "./_components/notice"

export default async function Page() {
  const supabase = await createClient()
  const { data } = await supabase.from("aptitude_results").select("kind, level, score, total, taken_at").order("taken_at", { ascending: false }).limit(500)
  const sum = summarize(data ?? [])
  const bests = KINDS.map((k) => sum[k].bestPct).filter((b): b is number => b !== null)
  const avg = bests.length ? bests.reduce((a, b) => a + b, 0) / bests.length : 0
  return (
    <section className="space-y-6">
      <PageTitle code="ESTD · Aptitudes" title="Aptitudes" back={{ href: "/estudio", label: "Estudio" }} />
      <AptNotice />
      <div className="flex items-end gap-6">
        <Gauge value={avg} label="Mejor marca media" tone={bests.length ? "green" : "cyan"} />
        <p className="max-w-[40ch] pb-6 text-sm text-muted-foreground">
          {bests.length}/{KINDS.length} pruebas con marca. El nivel sube con 80 % o más y baja con menos de 50 %.
        </p>
      </div>
      <Panel title="Pruebas" aside={`${KINDS.length}`} flush>
        <Memo>
          {KINDS.map((k) => {
            const s = sum[k]
            const m = KIND_META[k]
            return (
              <MemoItem
                key={k}
                state="disponible"
                href={`/aptitudes/${k}`}
                detail={
                  <span className="block space-y-1.5">
                    <span className="block">{m.description}</span>
                    <Tape value={(s.level / MAX_LEVEL) * 100} label={`Nivel de ${m.title}`} tone="cyan" />
                  </span>
                }
                meta={
                  <span className="flex flex-col items-end gap-1 font-mono text-xs">
                    <span>NIV {s.level}</span>
                    <span>{s.bestPct === null ? "—" : `${s.bestPct} %`}</span>
                  </span>
                }
              >
                <span className="flex flex-wrap items-center gap-2">
                  {m.title}
                  <Annunciator tone="dim">{m.origin}</Annunciator>
                </span>
              </MemoItem>
            )
          })}
        </Memo>
      </Panel>
    </section>
  )
}
