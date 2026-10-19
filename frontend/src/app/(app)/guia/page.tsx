import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { CHECKLIST_ROW, ROW_HOVER } from "@/components/ui-torre/checklist"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"
import { cn } from "@/lib/utils"

const FICHAS = [
  { href: "/guia/examen", n: "00", title: "El examen por dentro", desc: "Cuánto pesa cada prueba, mínimos, corte del 596 y cómo preparar cada una." },
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
    <div className="space-y-10">
      <PageHeader
        title="Guía del proceso"
        description="Todo lo que necesitas saber para empezar desde cero, paso a paso. Cada dato indica su fuente y si está pendiente de verificar."
        back={{ href: "/mas", label: "Más" }}
      />
      <Section title="Índice" aside={`${FICHAS.length} capítulos`} flush>
        <ol className="divide-y divide-line">
          {FICHAS.map((f) => (
            <li key={f.href}>
              <Link href={f.href} className={cn(CHECKLIST_ROW, ROW_HOVER)}>
                <span aria-hidden="true" className="w-7 shrink-0 pt-px text-lg font-bold text-muted-foreground">{Number(f.n)}</span>
                <span className="min-w-0 flex-1 space-y-1">
                  <span className="block leading-snug font-bold text-foreground">{f.title}</span>
                  <span className="block text-sm text-muted-foreground">{f.desc}</span>
                </span>
                <ChevronRight aria-hidden="true" className="size-5 shrink-0 self-center text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  )
}
