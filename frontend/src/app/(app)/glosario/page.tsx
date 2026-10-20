import Link from "next/link"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Card } from "@/components/ui-torre/section"
import { PendingCheck } from "@/components/ui-torre/content-labels"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loose } from "@/lib/bloques/db"
import { createClient } from "@/lib/supabase/server"

type Term = {
  id: string
  term: string
  term_en: string | null
  definition: string
  source_pages: string
  reviewed: boolean
  block_id: string | null
  topics: { number: number } | null
  sources: { title: string | null; url: string | null } | null
}

const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams
  const db = loose(await createClient())
  const { data } = await db
    .from("glossary_terms")
    .select("id, term, term_en, definition, source_pages, reviewed, block_id, topics(number), sources(title, url)")
    .order("term")
    .limit(1000)
  const nq = norm(q.trim().slice(0, 80))
  const list = ((data ?? []) as unknown as Term[]).filter((t) => !nq || norm(t.term).includes(nq) || norm(t.term_en ?? "").includes(nq))

  return (
    <div className="space-y-10">
      <PageHeader title="Glosario" description="Busca un término en español o en inglés. Cada entrada enlaza con su bloque y su fuente." back={{ href: "/mas", label: "Más" }} />
      <form role="search" className="flex max-w-prose flex-wrap gap-3">
        <label htmlFor="q" className="sr-only">Buscar un término</label>
        <Input id="q" name="q" type="search" defaultValue={q} placeholder="Por ejemplo: separación o separation" className="min-w-0 flex-1" />
        <button type="submit" className={buttonVariants({ size: "lg" })}>Buscar</button>
      </form>
      <p className="text-muted-foreground" role="status">{list.length} {list.length === 1 ? "término" : "términos"}</p>
      <div className="space-y-4">
        {list.map((t) => (
          <Card key={t.id} className="space-y-3">
            <h2 className="text-lg font-bold">
              {t.term}
              {t.term_en ? <span lang="en" className="ml-2 font-normal text-muted-foreground">· {t.term_en}</span> : null}
            </h2>
            <p className="max-w-prose text-base leading-relaxed">{t.definition}</p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span>
                {t.sources?.url ? (
                  <a href={t.sources.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">{t.sources.title ?? "Fuente"}</a>
                ) : (
                  (t.sources?.title ?? "Fuente")
                )}
                , páginas {t.source_pages}
              </span>
              {t.block_id && t.topics ? (
                <Link href={`/estudio/${t.topics.number}/b/${t.block_id}`} className="inline-flex min-h-11 items-center text-primary underline">Ver el bloque</Link>
              ) : null}
              {t.reviewed ? null : <PendingCheck />}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
