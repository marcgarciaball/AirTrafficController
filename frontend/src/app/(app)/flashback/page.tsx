import Link from "next/link"
import { CardReview, type ReviewCard } from "@/components/cards/card-review"
import { OwnCardForm } from "@/components/cards/own-card-form"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Card, Section } from "@/components/ui-torre/section"
import { loose } from "@/lib/bloques/db"
import { loadToday } from "@/lib/bloques/today"
import { dailyQueue } from "@/lib/cards/queue"
import { localDay, streak } from "@/lib/plan/time"
import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"

type Row = {
  id: string
  deck: string
  front: string
  back: string
  due: string
  suspended: boolean
  reps: number
  concept_cards: { term_en: string | null; study_blocks: { topic_id: string } | null } | null
}

const DECKS = [
  { v: "", l: "Todas" },
  { v: "temario", l: "Temario" },
  { v: "ingles", l: "Inglés" },
  { v: "propias", l: "Propias" },
]

export default async function Page({ searchParams }: { searchParams: Promise<{ baraja?: string; tema?: string; modo?: string; lado?: string }> }) {
  const sp = await searchParams
  const baraja = DECKS.some((d) => d.v === sp.baraja) ? (sp.baraja ?? "") : ""
  const tema = /^[1-9]$/.test(sp.tema ?? "") ? sp.tema! : ""
  const quick = sp.modo === "rapido"
  const reverse = sp.lado === "en"

  const supabase = await createClient()
  const db = loose(supabase)
  const { data: auth } = await supabase.auth.getUser()
  const { tz, now, todayMinutes } = await loadToday(db, auth.user?.id)
  const since = new Date(now.getTime() - 60 * 86400000).toISOString()
  const [{ data: cardRows }, { data: topics }, { data: revs }] = await Promise.all([
    db.from("user_cards").select("id, deck, front, back, due, suspended, reps, concept_cards(term_en, study_blocks(topic_id))").eq("suspended", false).order("due").limit(2000),
    db.from("topics").select("id, number").order("number"),
    db.from("card_reviews").select("rating, reviewed_at").gte("reviewed_at", since).limit(5000),
  ])
  const topicId = (topics ?? []).find((t: { number: number }) => String(t.number) === tema)?.id
  const all = ((cardRows ?? []) as unknown as Row[]).filter((c) => (!baraja || c.deck === baraja) && (!tema || c.concept_cards?.study_blocks?.topic_id === topicId))
  const dueAll = dailyQueue(all, now, tz, 1e6)
  const maxMinutes = 0.4 * todayMinutes
  const queue = quick ? all.filter((c) => !reverse || c.concept_cards?.term_en).slice(0, 50) : dailyQueue(all, now, tz, maxMinutes).filter((c) => !reverse || c.concept_cards?.term_en)
  const cards: ReviewCard[] = queue.map((c) => ({ id: c.id, deck: c.deck, front: c.front, back: c.back, termEn: c.concept_cards?.term_en ?? null }))

  const reviews = (revs ?? []) as { rating: number; reviewed_at: string }[]
  const byDay: Record<string, number> = {}
  for (const r of reviews) byDay[localDay(r.reviewed_at, tz)] = (byDay[localDay(r.reviewed_at, tz)] ?? 0) + 1
  const last30 = reviews.filter((r) => Date.parse(r.reviewed_at) >= now.getTime() - 30 * 86400000)
  const retention = last30.length ? Math.round((100 * last30.filter((r) => r.rating !== 1).length) / last30.length) : null
  const learned = all.filter((c) => c.reps > 0).length
  const days = streak(byDay, localDay(now.toISOString(), tz))

  const href = (over: Record<string, string>) => {
    const p = new URLSearchParams()
    const m = { baraja, tema, modo: quick ? "rapido" : "", lado: reverse ? "en" : "", ...over }
    for (const [k, v] of Object.entries(m)) if (v) p.set(k, v)
    const s = p.toString()
    return s ? `/flashback?${s}` : "/flashback"
  }
  const chip = (active: boolean) =>
    cn("inline-flex min-h-11 items-center rounded-md border px-4 text-[15px]", active ? "border-primary bg-subtle font-bold text-primary" : "text-muted-foreground hover:bg-subtle hover:text-foreground")
  const figures: [string, string][] = [
    [String(dueAll.length), "pendientes hoy"],
    [String(learned), "aprendidas"],
    [`${days} ${days === 1 ? "día" : "días"}`, "racha de repaso"],
    [retention === null ? "–" : `${retention} %`, "retención (30 días)"],
  ]

  return (
    <div className="space-y-12">
      <PageHeader title="Flashback" description="Los conceptos de cada bloque vuelven justo cuando estás a punto de olvidarlos." />
      <Card>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4">
          {figures.map(([v, l]) => (
            <div key={l} className="space-y-1">
              <dd className="order-first text-3xl font-bold tabular-nums">{v}</dd>
              <dt className="text-sm text-muted-foreground">{l}</dt>
            </div>
          ))}
        </dl>
      </Card>

      <nav aria-label="Filtros" className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {DECKS.map((d) => <Link key={d.v} href={href({ baraja: d.v })} aria-current={baraja === d.v ? "true" : undefined} className={chip(baraja === d.v)}>{d.l}</Link>)}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={href({ tema: "" })} aria-current={tema === "" ? "true" : undefined} className={chip(tema === "")}>Todos los temas</Link>
          {(topics ?? []).map((t: { number: number }) => <Link key={t.number} href={href({ tema: String(t.number) })} aria-current={tema === String(t.number) ? "true" : undefined} className={chip(tema === String(t.number))}>Tema {t.number}</Link>)}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={href({ modo: quick ? "" : "rapido" })} className={chip(quick)}>Repaso rápido</Link>
          <Link href={href({ lado: reverse ? "" : "en" })} className={chip(reverse)}>Español ⇄ inglés</Link>
        </div>
      </nav>

      <Section title={quick ? "Repaso rápido" : "Repaso de hoy"} aside={quick ? undefined : `${cards.length} de ${dueAll.length} en la cola`}>
        <CardReview key={`${baraja}-${tema}-${quick}-${reverse}`} cards={cards} quick={quick} reverse={reverse} />
      </Section>

      <Section title="Nueva tarjeta propia">
        <OwnCardForm />
      </Section>
    </div>
  )
}
