import Link from "next/link"
import { Annunciator } from "@/components/cockpit/annunciator"
import { Memo, MemoItem } from "@/components/cockpit/memo"
import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
import type { Tone } from "@/components/cockpit/tones"
import { endorsementExpiry, endorsementObjective, latestEndorsement, type EndorsementLevel, type Language, type ObjectiveState } from "@/lib/english/endorsement"
import { percent } from "@/lib/english/chart"
import { formatDate } from "@/lib/format"
import { localDay } from "@/lib/plan/time"
import { createClient } from "@/lib/supabase/server"
import { EvolutionChart } from "./_components/evolution-chart"
import { DeleteButton, EndorsementForm, LogForm, WeeklyPlan } from "./_components/forms"
import { OWN_TIP } from "./_components/ui"

const STATE: Record<ObjectiveState, { tone: Tone; text: string }> = {
  "sin-anotacion": { tone: "amber", text: "SIN ANOTACIÓN" },
  "nivel-insuficiente": { tone: "red", text: "NIVEL INSUFICIENTE" },
  caducada: { tone: "red", text: "CADUCADA" },
  pronto: { tone: "amber", text: "CADUCA PRONTO" },
  vigente: { tone: "green", text: "VIGENTE" },
  ilimitada: { tone: "green", text: "SIN CADUCIDAD" },
}

const GOAL_LABEL = { c1: "C1 ENAIRE", oaci_en: "OACI EN", oaci_es: "OACI ES" } as const
const SKILL_LABEL = { reading: "Reading", use: "Use", writing: "Writing", listening: "Listening", speaking: "Speaking" } as const
const LANG_LABEL: Record<Language, string> = { en: "Inglés", es: "Castellano" }

export default async function Page() {
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  const { data: profile } = auth.user
    ? await supabase.from("profiles").select("timezone").eq("id", auth.user.id).maybeSingle()
    : { data: null }
  const today = localDay(new Date().toISOString(), profile?.timezone ?? "Europe/Madrid")
  const [{ data: logsData }, { data: endData }, { count: dueCount }] = await Promise.all([
    supabase.from("english_logs").select("id, goal, skill, part, taken_on, score, max_score, notes").order("taken_on", { ascending: false }).limit(200),
    supabase.from("language_endorsements").select("id, language, level, assessed_on, center").order("assessed_on", { ascending: false }),
    supabase.from("flashcards").select("id", { count: "exact", head: true }).lte("due_on", today),
  ])
  const logs = logsData ?? []
  const ends = endData ?? []

  const c1Logs = logs.filter((l) => l.goal === "c1")
  const c1Last = c1Logs[0]
  const c1Pct = c1Last && c1Last.score !== null && c1Last.max_score !== null ? percent(c1Last.score, c1Last.max_score) : null

  const objective = (lang: Language) => {
    const last = latestEndorsement(ends, lang)
    const state = endorsementObjective(ends, lang, today)
    const exp = last ? endorsementExpiry(last.level as EndorsementLevel, lang, last.assessed_on) : null
    return { last, state, exp }
  }
  const en = objective("en")
  const es = objective("es")

  return (
    <section className="space-y-6">
      <PageTitle code="ENG" title="Inglés" />
      <p className="max-w-[68ch] text-sm text-muted-foreground">
        Tres objetivos distintos: ninguno sustituye a otro. Fuente: <Link href="/guia/idiomas" className="text-cyan hover:underline">Guía, idiomas</Link>.
      </p>

      <Panel title="Objetivos" flush>
        <Memo>
          <MemoItem
            state={c1Last ? "disponible" : "verificar"}
            detail="No hace falta título: ENAIRE lo evalúa en Fase 1 (test escrito de 20 preguntas, mínimo 10) y Fase 3 (entrevista oral, mínimo 25 de 50)."
            meta={c1Pct === null ? <Annunciator tone="dim">SIN NOTAS</Annunciator> : <span>{Math.round(c1Pct)} % última</span>}
          >
            C1 de ENAIRE (Fase 1 escrito y Fase 3 oral)
          </MemoItem>
          <MemoItem
            state={en.state === "vigente" || en.state === "ilimitada" ? "hecho" : en.state === "pronto" || en.state === "sin-anotacion" ? "verificar" : "bloqueado"}
            reason={en.state === "caducada" ? "Anotación caducada." : en.state === "nivel-insuficiente" ? "Se pide nivel 4 o superior." : undefined}
            detail={
              en.last
                ? `Nivel ${en.last.level}, evaluado el ${formatDate(en.last.assessed_on)}. ${en.exp ? `Caduca el ${formatDate(en.exp)}.` : ""}`
                : "Anotación de inglés OACI 4 o superior (ATCO.B.030), en un centro evaluador autorizado por AESA."
            }
            meta={<Annunciator tone={STATE[en.state].tone}>{STATE[en.state].text}</Annunciator>}
          >
            Anotación de inglés OACI 4+
          </MemoItem>
          <MemoItem
            state={es.state === "vigente" || es.state === "ilimitada" ? "hecho" : es.state === "pronto" || es.state === "sin-anotacion" ? "verificar" : "bloqueado"}
            reason={es.state === "nivel-insuficiente" ? "Se pide nivel 6 (Experto)." : es.state === "caducada" ? "Anotación caducada." : undefined}
            detail={
              es.last
                ? `Nivel ${es.last.level}, evaluado el ${formatDate(es.last.assessed_on)}. ${es.exp ? `Caduca el ${formatDate(es.exp)}.` : "Sin caducidad."}`
                : "Anotación de castellano OACI nivel 6 (Experto), exigida en la contratación de ENAIRE."
            }
            meta={<Annunciator tone={STATE[es.state].tone}>{STATE[es.state].text}</Annunciator>}
          >
            Anotación de castellano OACI 6
          </MemoItem>
        </Memo>
        <p className="px-3 pt-2 pb-2 text-sm text-muted-foreground sm:px-4">
          Centros evaluadores:{" "}
          <a href="https://www.seguridadaerea.gob.es/sites/default/files/tabla_cecl_esp.pdf" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">
            lista de AESA
          </a>
          . Pendiente de verificar con AESA qué centros valen para controladores.
        </p>
      </Panel>

      <Panel title="Plan semanal" aside={OWN_TIP}>
        <WeeklyPlan />
        <p className="mt-3 max-w-[68ch] text-sm text-muted-foreground">
          Enlaces a la preparación oficial de Cambridge C1 Advanced; el certificado no se exige, solo sirve de práctica para el nivel C1. Práctica oficial gratuita:{" "}
          <a href="https://feast-training.eurocontrol.int/" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">FEAST</a>.
        </p>
      </Panel>

      <Panel title="Tarjetas y entrevista" flush>
        <Memo>
          <MemoItem state={dueCount ? "siguiente" : "disponible"} href="/ingles/tarjetas" meta={<span>{dueCount ?? 0} hoy</span>}>
            Tarjetas de vocabulario y fraseología
          </MemoItem>
          <MemoItem state="disponible" href="/ingles/entrevista" detail={OWN_TIP}>
            Guía de la entrevista oral (Fase 3)
          </MemoItem>
        </Memo>
      </Panel>

      <Panel title="Evolución de pruebas">
        <div className="space-y-4">
          {(["c1", "oaci_en", "oaci_es"] as const).map((g) => {
            const sel = logs.filter((l) => l.goal === g)
            return sel.length ? <EvolutionChart key={g} label={GOAL_LABEL[g]} logs={sel} /> : null
          })}
          {logs.length === 0 ? <p className="text-sm text-muted-foreground">Registra una prueba externa para ver tu evolución.</p> : null}
        </div>
      </Panel>

      <Panel title="Registro de pruebas">
        <LogForm today={today} />
        {logs.length ? (
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {logs.slice(0, 30).map((l) => (
              <li key={l.id} className="flex items-center gap-3 py-2 text-sm">
                <span className="w-24 shrink-0 font-mono tabular-nums">{formatDate(l.taken_on)}</span>
                <span className="min-w-0 flex-1">
                  {GOAL_LABEL[l.goal as keyof typeof GOAL_LABEL]} · {SKILL_LABEL[l.skill as keyof typeof SKILL_LABEL]}
                  {l.part ? ` · ${l.part}` : ""}
                </span>
                <span className="shrink-0 text-right font-mono tabular-nums">
                  {l.score !== null ? `${l.score}${l.max_score !== null ? ` / ${l.max_score}` : ""}` : "—"}
                </span>
                <DeleteButton id={l.id} kind="log" />
              </li>
            ))}
          </ul>
        ) : null}
      </Panel>

      <Panel title="Anotaciones y caducidad">
        <EndorsementForm today={today} />
        <p className="mt-3 text-sm text-muted-foreground">
          Validez (ATCO.B.035): nivel 4, 3 años; nivel 5, 6 años; nivel 6, 9 años en inglés y sin caducidad en castellano.
        </p>
        {ends.length ? (
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {ends.map((e) => {
              const exp = endorsementExpiry(e.level as EndorsementLevel, e.language as Language, e.assessed_on)
              return (
                <li key={e.id} className="flex items-center gap-3 py-2 text-sm">
                  <span className="min-w-0 flex-1">
                    {LANG_LABEL[e.language as Language]} · nivel {e.level} · {formatDate(e.assessed_on)}
                    {e.center ? ` · ${e.center}` : ""}
                  </span>
                  <span className="shrink-0 font-mono tabular-nums">{exp ? `caduca ${formatDate(exp)}` : "sin caducidad"}</span>
                  <DeleteButton id={e.id} kind="endorsement" />
                </li>
              )
            })}
          </ul>
        ) : null}
      </Panel>
    </section>
  )
}
