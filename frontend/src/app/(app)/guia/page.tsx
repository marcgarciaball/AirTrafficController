import Link from "next/link"
import { PageTitle, Prose } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"

const FICHAS = [
  { href: "/guia/requisitos", n: "01", title: "Requisitos", desc: "Para presentarte y para ser contratado." },
  { href: "/guia/proceso", n: "02", title: "El proceso", desc: "Fases 1, 2 y 3, puntuaciones, nota de corte y desempates." },
  { href: "/guia/calendario", n: "03", title: "Calendario", desc: "Hitos de 2025 y la convocatoria 2026 esperada." },
  { href: "/guia/despues", n: "04", title: "Después de aprobar", desc: "Formación, licencias SATCO y ATCO, y el plazo de 17 meses." },
  { href: "/guia/medico", n: "05", title: "Médico Clase 3", desc: "Centros AeMC, validez y pre-solicitud." },
  { href: "/guia/idiomas", n: "06", title: "Idiomas", desc: "C1 de ENAIRE, anotaciones OACI y centros CECL." },
  { href: "/guia/feast", n: "07", title: "FEAST y PDEA", desc: "Las pruebas digitales y la práctica oficial." },
  { href: "/guia/fuentes", n: "08", title: "Fuentes", desc: "Todas las fuentes oficiales y su fecha de consulta." },
]

export default function GuiaIndex() {
  return (
    <section className="space-y-6">
      <PageTitle code="Guía · índice" title="Guía del proceso">
        <Prose className="pt-1">
          Todo lo que necesitas saber para empezar desde cero, paso a paso. Cada dato indica su fuente y si está pendiente de verificar.
        </Prose>
      </PageTitle>
      <Panel title="Índice" aside={`${FICHAS.length}`} flush>
        <ul className="divide-y divide-line">
          {FICHAS.map((f) => (
            <li key={f.href}>
              <Link href={f.href} className="flex items-start gap-3 px-3 py-2.5 hover:bg-surface sm:px-4">
                <span className="w-6 shrink-0 font-mono text-sm text-muted-foreground tabular-nums">{f.n}</span>
                <span className="min-w-0 flex-1">
                  <span className="block uppercase tracking-wide text-sm leading-5 text-cyan">{f.title}</span>
                  <span className="block text-sm text-muted-foreground">{f.desc}</span>
                </span>
                <span aria-hidden="true" className="shrink-0 self-center font-mono text-cyan">›</span>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </section>
  )
}
