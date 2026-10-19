import { notFound } from "next/navigation"
import { PageHeader } from "@/components/ui-torre/page-header"
import { isKind, KIND_META, summarize } from "@/lib/aptitudes/kinds"
import { createClient } from "@/lib/supabase/server"
import { AptNotice } from "../_components/notice"
import { Runner } from "../_components/runner"

export default async function Page({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params
  if (!isKind(kind)) notFound()
  const supabase = await createClient()
  const { data } = await supabase.from("aptitude_results").select("kind, level, score, total, taken_at").eq("kind", kind).order("taken_at", { ascending: false }).limit(200)
  const s = summarize(data ?? [])[kind]
  const m = KIND_META[kind]
  return (
    <section className="space-y-8">
      <PageHeader title={m.title} description={m.description} back={{ href: "/aptitudes", label: "Aptitudes" }} />
      <AptNotice />
      <Runner kind={kind} level={s.level} bestPct={s.bestPct} />
    </section>
  )
}
