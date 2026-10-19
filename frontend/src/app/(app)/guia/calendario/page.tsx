import { Bloque, Datos, GuiaPage, Nota, Tabla } from "@/components/guia/guia-ui"
import { Annunciator } from "@/components/cockpit/annunciator"
import { SourceLink } from "@/components/source-link"
import { VerificationBadge } from "@/components/verification-badge"
import { U, dato, fact, loadGuia, src, type Src } from "@/lib/guia"
import { formatDate } from "@/lib/format"

type Call = { id: string; year: number; title: string; seats: number | null; status: string; verified: boolean; source_id: string }
type Ev = { exam_call_id: string; date: string; kind: string; is_estimate: boolean; verified: boolean; source_id: string }

const KIND: Record<string, string> = {
  publicacion: "Publicación",
  inscripcion_inicio: "Inicio de inscripción",
  inscripcion_fin: "Fin de inscripción",
  fase1: "Fase 1",
  fase2: "Fase 2",
  fase3: "Fase 3",
  resultado: "Resultado",
}

/** Hito del calendario: fecha alineada a la derecha y, si procede, anunciador de estimación. */
function Hitos({ items, srcOf, expected = false }: { items: Ev[]; srcOf: (id: string) => Src | undefined; expected?: boolean }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((ev) => {
        const s = srcOf(ev.source_id)
        return (
          <li key={`${ev.kind}-${ev.date}`} className="space-y-1.5 py-2.5 first:pt-0">
            <p className="flex items-baseline justify-between gap-3">
              <span className="text-xs uppercase tracking-wide text-foreground">{KIND[ev.kind] ?? ev.kind}</span>
              <span className={`font-mono text-sm tabular-nums ${ev.is_estimate || expected ? "text-amber" : "text-foreground"}`}>{formatDate(ev.date)}</span>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {ev.is_estimate ? <Annunciator tone="amber">Estimación</Annunciator> : expected ? <Annunciator tone="amber">Esperado</Annunciator> : null}
              <VerificationBadge verified={ev.verified} />
            </div>
            {s ? <SourceLink source={s} /> : null}
          </li>
        )
      })}
    </ul>
  )
}

export default async function Page() {
  const g = await loadGuia()
  const [c, e] = await Promise.all([
    g.db.from("exam_calls").select("id, year, title, seats, status, verified, source_id").order("year"),
    g.db.from("exam_call_events").select("exam_call_id, date, kind, is_estimate, verified, source_id").order("date"),
  ])
  const calls = (c.data ?? []) as Call[]
  const events = (e.data ?? []) as Ev[]
  const call2025 = calls.find((x) => x.year === 2025)
  const call2026 = calls.find((x) => x.year === 2026)
  const ev2025 = events.filter((x) => x.exam_call_id === call2025?.id)
  const ev2026 = events.filter((x) => x.exam_call_id === call2026?.id)
  const srcOf = (id: string): Src | undefined => g.sources[id]

  return (
    <GuiaPage label="Guía · 03" title="Calendario" intro="El calendario de 2025 sirve para estimar el de la próxima convocatoria, pero no es un calendario oficial de 2026-2027.">
      <Bloque title="Convocatoria 2025 · hitos">
        {ev2025.length > 0 ? (
          <Hitos items={ev2025} srcOf={srcOf} />
        ) : (
          <Tabla
            caption="Calendario real del proceso de 2025"
            head={["Fecha", "Hito"]}
            rows={[
              ["22-12-2025", "Admitidos provisionales"],
              ["15-01-2026", "Admitidos definitivos"],
              ["7 y 8-02-2026", "Exámenes de la Fase 1"],
              ["27-02-2026 / 05-03-2026", "Resultados de la Fase 1 (provisionales / definitivos)"],
              ["13 a 19-03-2026", "Fase 2"],
              ["24-03-2026 / 31-03-2026", "Resultados de la Fase 2 (provisionales / definitivos)"],
              ["Junio de 2026", "Fase 3 y resultados"],
              ["26-06-2026", "Resolución final provisional"],
            ]}
            source={src(g, U.portal)}
          />
        )}
        <Datos items={[fact(g, "conv_2025_plazas"), fact(g, "conv_2025_inscripcion"), fact(g, "conv_2025_tasa")].flatMap((x) => (x ? [x] : []))} />
      </Bloque>

      <Bloque title="Convocatoria 2026 · esperada">
        <Nota>No está publicada a 19-10-2026. ENAIRE ha dicho que se aprobará antes de que acabe el año, con un número de plazas similar a las dos anteriores.</Nota>
        {ev2026.length > 0 ? (
          <Hitos items={ev2026} srcOf={srcOf} expected />
        ) : null}
        <Datos
          items={[
            ...[fact(g, "conv_2026_plazas"), fact(g, "conv_2026_fecha")].flatMap((x) => (x ? [x] : [])),
            dato(
              g,
              U.nota2026,
              "Patrón histórico (deducción, no dato oficial)",
              "Las convocatorias se publicaron entre mediados de noviembre y mediados de diciembre: 15-12-2022 (137 plazas), 11-12-2023 (91), 13-12-2024 (150, ampliada a 158) y 20-11-2025 (149)."
            ),
          ]}
        />
      </Bloque>
    </GuiaPage>
  )
}
