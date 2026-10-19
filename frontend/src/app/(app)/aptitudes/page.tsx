import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { CHECKLIST_ROW, ROW_HOVER } from "@/components/ui-torre/checklist"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Card, Section } from "@/components/ui-torre/section"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { ProgressBar } from "@/components/ui-torre/progress-bar"
import { KINDS, KIND_META, MAX_LEVEL, summarize } from "@/lib/aptitudes/kinds"
import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"
import { AptNotice } from "./_components/notice"

export default async function Page() {
  const supabase = await createClient()
  const { data } = await supabase.from("aptitude_results").select("kind, level, score, total, taken_at").order("taken_at", { ascending: false }).limit(500)
  const sum = summarize(data ?? [])
  const bests = KINDS.map((k) => sum[k].bestPct).filter((b): b is number => b !== null)
  const avg = bests.length ? bests.reduce((a, b) => a + b, 0) / bests.length : 0
  return (
    <div className="space-y-10">
      <PageHeader title="Aptitudes" description="El nivel de cada prueba sube con un 80 % o más de acierto y baja con menos del 50 %." back={{ href: "/estudio", label: "Estudio" }} />
      <AptNotice />
      <Card className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
        <p className="text-3xl font-bold">
          {Math.round(avg)}
          <span className="ml-1 text-base font-normal text-muted-foreground">% de mejor marca media</span>
        </p>
        <p className="text-muted-foreground">
          {bests.length} de {KINDS.length} pruebas con marca
        </p>
      </Card>
      <Section title="Pruebas" aside={`${KINDS.length} pruebas`} flush>
        <ul className="divide-y divide-line">
          {KINDS.map((k) => {
            const s = sum[k]
            const m = KIND_META[k]
            return (
              <li key={k}>
                <Link href={`/aptitudes/${k}`} className={cn(CHECKLIST_ROW, ROW_HOVER, "gap-5")}>
                  <span className="min-w-0 flex-1 space-y-2">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-foreground">{m.title}</span>
                      <StatusChip tone="muted">{m.origin.toLowerCase()}</StatusChip>
                    </span>
                    <span className="block text-sm text-muted-foreground">{m.description}</span>
                    <span className="flex items-center gap-3">
                      <ProgressBar value={(s.level / MAX_LEVEL) * 100} label={`Nivel de ${m.title}`} tone="primary" size="sm" className="max-w-56 flex-1" />
                      <span className="shrink-0 text-sm text-muted-foreground">
                        nivel {s.level} de {MAX_LEVEL}
                      </span>
                    </span>
                  </span>
                  <span className="shrink-0 self-center text-right">
                    <span className="block text-lg font-bold">{s.bestPct === null ? "—" : `${s.bestPct} %`}</span>
                    <span className="block text-sm text-muted-foreground">mejor marca</span>
                  </span>
                  <ChevronRight aria-hidden="true" className="size-5 shrink-0 self-center text-muted-foreground" />
                </Link>
              </li>
            )
          })}
        </ul>
      </Section>
    </div>
  )
}
