import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MarkdownBody } from "@/components/study/markdown-body"
import { PageHeader } from "@/components/ui-torre/page-header"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { buttonVariants } from "@/components/ui/button"
import { loose } from "@/lib/bloques/db"
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
  const [{ data: sections }, { count }, { data: around }, { count: blockCount }] = await Promise.all([
    supabase.from("topic_sections").select("id, title, body_md, source_pages, reviewed").eq("topic_id", topic.id).order("sort"),
    supabase.from("questions").select("id", { count: "exact", head: true }).eq("topic_id", topic.id),
    supabase.from("topics").select("number, title").in("number", [num - 1, num + 1]),
    loose(supabase).from("study_blocks").select("id", { count: "exact", head: true }).eq("topic_id", topic.id),
  ])
  const nq = count ?? 0
  const list = sections ?? []
  const prev = around?.find((t) => t.number === num - 1)
  const next = around?.find((t) => t.number === num + 1)

  return (
    <div data-wide className="lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
      <article className="min-w-0 space-y-12">
        <PageHeader title={topic.title} back={{ href: "/estudio", label: "Estudia" }}>
          <p className="text-muted-foreground">
            Tema {topic.number}
            {list.length > 0 ? ` · ${list.length} ${list.length === 1 ? "sección" : "secciones"}` : ""}
          </p>
        </PageHeader>

        {(blockCount ?? 0) > 0 ? (
          <div className="max-w-prose space-y-3 rounded-lg border border-primary/40 bg-card p-5 shadow-sm sm:p-6">
            <p className="text-lg font-bold">Estudiar por bloques</p>
            <p className="text-muted-foreground">{blockCount} bloques de unos 5 minutos, con preguntas y tarjetas para repasar después.</p>
            <Link href={`/estudio/${topic.number}/bloques`} className={cn(buttonVariants({ size: "lg" }), "mt-2")}>
              Ver los bloques
            </Link>
          </div>
        ) : null}

        {list.length === 0 ? (
          <p className="text-lg text-muted-foreground">
            Contenido en preparación.{" "}
            {topic.sources?.url ? (
              <a href={topic.sources.url} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/40 hover:decoration-primary">
                Abrir el PDF oficial
              </a>
            ) : null}
          </p>
        ) : (
          list.map((s, i) => (
            <section key={s.id} id={`seccion-${i + 1}`} aria-labelledby={`t-${s.id}`} className="scroll-mt-8 space-y-5">
              <h2 id={`t-${s.id}`} className="max-w-prose text-xl font-bold">
                {s.title}
              </h2>
              <MarkdownBody md={s.body_md} />
              <p className="flex max-w-prose flex-wrap items-center gap-x-3 gap-y-2 border-t pt-4 text-sm text-muted-foreground">
                <span>Páginas del temario: {s.source_pages}</span>
                {s.reviewed ? <StatusChip tone="success">contenido propio · revisado</StatusChip> : <StatusChip tone="warning">contenido propio · sin revisar</StatusChip>}
              </p>
            </section>
          ))
        )}

        {nq > 0 ? (
          <div className="max-w-prose space-y-3 rounded-lg border bg-card p-5 shadow-sm sm:p-6">
            <p className="text-lg font-bold">¿Lo tienes claro?</p>
            <p className="text-muted-foreground">Haz el test del tema: {Math.min(TEMA_TEST_SIZE, nq)} preguntas con corrección al final.</p>
            <Link href={`/estudio/${topic.number}/test`} className={cn(buttonVariants({ size: "lg" }), "mt-2")}>
              Empezar el test
            </Link>
          </div>
        ) : null}

        <nav aria-label="Temas" className="grid max-w-prose gap-3 border-t pt-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`/estudio/${prev.number}`} className="group rounded-lg border p-4 transition-colors hover:border-primary/50 hover:bg-card">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <ChevronLeft aria-hidden="true" className="size-4" /> Anterior · tema {prev.number}
              </span>
              <span className="mt-1 block leading-snug font-bold text-primary">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/estudio/${next.number}`} className="group rounded-lg border p-4 text-right transition-colors hover:border-primary/50 hover:bg-card">
              <span className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                Siguiente · tema {next.number} <ChevronRight aria-hidden="true" className="size-4" />
              </span>
              <span className="mt-1 block leading-snug font-bold text-primary">{next.title}</span>
            </Link>
          ) : null}
        </nav>
      </article>

      {list.length > 1 ? (
        <aside className="hidden lg:block">
          <nav aria-label="En este tema" className="sticky top-14 space-y-3">
            <p className="text-sm font-bold">En este tema</p>
            <ol className="space-y-1 border-l">
              {list.map((s, i) => (
                <li key={s.id}>
                  <a href={`#seccion-${i + 1}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      ) : null}
    </div>
  )
}
