import Link from "next/link"
import { notFound } from "next/navigation"
import { Annunciator } from "@/components/cockpit/annunciator"
import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
import { MarkdownBody } from "@/components/study/markdown-body"
import { Brackets, buttonVariants } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"
import { TEMA_TEST_SIZE } from "@/lib/study/types"

export default async function Page({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params
  const num = Number(n)
  if (!Number.isInteger(num) || num < 1 || num > 9) notFound()
  const supabase = await createClient()
  const { data: topic } = await supabase.from("topics").select("id, number, title, sources(url)").eq("number", num).maybeSingle()
  if (!topic) notFound()
  const [{ data: sections }, { count }] = await Promise.all([
    supabase.from("topic_sections").select("id, title, body_md, source_pages, reviewed").eq("topic_id", topic.id).order("sort"),
    supabase.from("questions").select("id", { count: "exact", head: true }).eq("topic_id", topic.id),
  ])
  const nq = count ?? 0

  return (
    <article className="space-y-8">
      <PageTitle code={`Tema T${topic.number}`} title={topic.title} back={{ href: "/estudio", label: "Estudio" }} />
      {(sections ?? []).length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Contenido en preparación.{" "}
          {topic.sources?.url ? (
            <a href={topic.sources.url} target="_blank" rel="noopener noreferrer" className="text-cyan underline decoration-line underline-offset-2 hover:decoration-cyan">
              PDF oficial
            </a>
          ) : null}
        </p>
      ) : (
        (sections ?? []).map((s) => (
          <Panel key={s.id} title={s.title}>
            <div className="space-y-4">
              <MarkdownBody md={s.body_md} />
              <p className="flex flex-wrap items-center gap-2 border-t border-line pt-3 text-xs uppercase tracking-wide text-muted-foreground">
                <span className="font-mono">{s.source_pages}</span>
                <span>· Contenido propio</span>
                {s.reviewed ? <Annunciator tone="green">Revisado</Annunciator> : <Annunciator tone="amber">Sin revisar</Annunciator>}
              </p>
            </div>
          </Panel>
        ))
      )}
      {nq > 0 ? (
        <Link href={`/estudio/${topic.number}/test`} className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
          <Brackets>Test del tema · {Math.min(TEMA_TEST_SIZE, nq)} preg</Brackets>
        </Link>
      ) : null}
    </article>
  )
}
