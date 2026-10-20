import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { CHECKLIST_ROW, ROW_HOVER } from "@/components/ui-torre/checklist"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"
import { CURSO, LECCIONES } from "@/lib/curso"
import { cn } from "@/lib/utils"

const PASOS = [
  "Comprueba que puedes presentarte: requisitos, médico e inglés.",
  "Entiende las tres fases del examen y qué nota mínima pide cada prueba.",
  "Estudia el temario, el inglés y las aptitudes, y haz simulacros.",
  "Prepara las pruebas digitales, la personalidad y la entrevista.",
]

export default function GuiaIndex() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Empieza aquí"
        description={`Si no sabes nada de cómo se llega a ser controlador aéreo, este es tu punto de partida. ${LECCIONES.length} lecciones cortas, en orden, de la profesión al examen.`}
      />

      <Section title="El camino en 4 pasos">
        <ol className="space-y-3">
          {PASOS.map((p, i) => (
            <li key={p} className="flex gap-3">
              <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full bg-subtle font-bold">{i + 1}</span>
              <span className="pt-0.5">{p}</span>
            </li>
          ))}
        </ol>
        <Link href={LECCIONES[0].href} className="mt-5 inline-flex h-11 items-center rounded-md bg-primary px-5 font-bold text-primary-foreground">
          Empezar la primera lección
        </Link>
      </Section>

      {CURSO.map((m, mi) => (
        <Section key={m.title} title={`Módulo ${mi + 1} · ${m.title}`} description={m.goal} flush>
          <ol className="divide-y divide-line">
            {m.lessons.map((l) => {
              return (
                <li key={l.href}>
                  <Link href={l.href} className={cn(CHECKLIST_ROW, ROW_HOVER)}>
                    <span aria-hidden="true" className="w-7 shrink-0 pt-px text-lg font-bold text-muted-foreground">{LECCIONES.findIndex((x) => x.href === l.href) + 1}</span>
                    <span className="min-w-0 flex-1 space-y-1">
                      <span className="block leading-snug font-bold text-foreground">{l.title}</span>
                      <span className="block text-sm text-muted-foreground">{l.desc}</span>
                    </span>
                    <ChevronRight aria-hidden="true" className="size-5 shrink-0 self-center text-muted-foreground" />
                  </Link>
                </li>
              )
            })}
          </ol>
        </Section>
      ))}

      <p className="text-sm text-muted-foreground">
        Todas las fuentes oficiales, en un solo sitio: <Link href="/guia/fuentes" className="text-primary underline">Fuentes</Link>.
      </p>
    </div>
  )
}
