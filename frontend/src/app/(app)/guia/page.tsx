import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { CHECKLIST_ROW, ROW_HOVER } from "@/components/ui-torre/checklist"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"
import { cn } from "@/lib/utils"

const FICHAS = [
  { href: "/guia/antes", title: "Antes de empezar", desc: "El trabajo, el camino hasta el primer sueldo, el curso, el préstamo y cuánto ahorrar." },
  { href: "/guia/salario", title: "Cuánto se cobra", desc: "Calculadora de sueldo bruto por destino y año de carrera." },
  { href: "/guia/plazas", title: "¿Hay plazas nuevas?", desc: "Dónde comprobar si hay convocatoria nueva." },
  { href: "/guia/examen", title: "El examen por dentro", desc: "Cuánto pesa cada prueba, mínimos, corte del 596 y cómo preparar cada una." },
  { href: "/guia/requisitos", title: "Requisitos", desc: "Para presentarte y para ser contratado." },
  { href: "/guia/proceso", title: "El proceso", desc: "Fases 1, 2 y 3, puntuaciones, nota de corte y desempates." },
  { href: "/guia/calendario", title: "Calendario", desc: "Hitos de 2025 y la convocatoria 2026 esperada." },
  { href: "/guia/despues", title: "Después de aprobar", desc: "Formación, licencias SATCO y ATCO, y el plazo de 17 meses." },
  { href: "/guia/medico", title: "Médico Clase 3", desc: "Qué es, pruebas, causas de no apto, validez, precio y cómo pedir cita." },
  { href: "/guia/idiomas", title: "Idiomas", desc: "C1 de ENAIRE, anotaciones OACI y centros CECL." },
  { href: "/guia/feast", title: "FEAST y PDEA", desc: "Las pruebas digitales y la práctica oficial." },
  { href: "/guia/fase3", title: "Entrevista y dinámica", desc: "Qué evalúan, conducta, método STAR, banco de preguntas y ejercicios." },
  { href: "/guia/personalidad", title: "Test de personalidad", desc: "Cómo funciona, coherencia y errores típicos." },
  { href: "/guia/cifras", title: "Datos del proceso", desc: "Tasa, aspirantes por plaza, 17 meses y coste de la formación." },
  { href: "/guia/fuentes", title: "Fuentes", desc: "Todas las fuentes oficiales y su fecha de consulta." },
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
                <span aria-hidden="true" className="w-7 shrink-0 pt-px text-lg font-bold text-muted-foreground">{FICHAS.indexOf(f)}</span>
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
