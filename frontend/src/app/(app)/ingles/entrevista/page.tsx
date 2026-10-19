import { PageHeader, Prose } from "@/components/ui-torre/page-header"
import { OwnTip } from "@/components/ui-torre/content-labels"
import { Section } from "@/components/ui-torre/section"

const STRUCTURE = [
  ["Presentación", "Preséntate con claridad: quién eres, tu formación y por qué quieres ser controlador. Prepara una versión de 1 minuto."],
  ["Preguntas personales y de motivación", "Responde con ejemplos concretos, no con frases hechas. Prepara dos o tres anécdotas reales que puedas adaptar."],
  ["Tema general", "Opina sobre un tema y defiéndelo: afirma, justifica con un motivo y un ejemplo, y concluye."],
  ["Situación o problema", "Describe qué harías ante un imprevisto, explicando tus pasos en orden y por qué."],
] as const

const PHRASES: [string, string][] = [
  ["Ganar tiempo", "That's an interesting question. Let me think about that for a moment."],
  ["Pedir repetición", "Sorry, could you repeat that, please? / Could you rephrase the question?"],
  ["Opinar", "In my view… / As far as I'm concerned… / I'd argue that…"],
  ["Justificar", "The main reason is that… / This is mainly because…"],
  ["Ejemplificar", "For instance… / A case in point is when I…"],
  ["Matizar", "That said… / On the other hand… / To a certain extent…"],
  ["Hipótesis", "If I were in that situation, I would… / Had I known, I would have…"],
  ["Corregirte", "Sorry, what I meant to say was…"],
  ["Concluir", "All in all… / To sum up…"],
]

const TIPS = [
  "Habla con calma: prima la claridad sobre la velocidad.",
  "Si no sabes una palabra, explícala con otras (paraphrasing) en lugar de quedarte callado.",
  "Alarga las respuestas con razón y ejemplo; evita contestar solo sí o no.",
  "Practica en voz alta y grábate para revisar pronunciación, pausas y muletillas.",
  "Ensaya con un compañero o profesor que te corrija, igual que haría un examinador.",
]

export default function Page() {
  return (
    <div className="space-y-12">
      <PageHeader title="Preparar la entrevista oral" description="Fase 3, nivel C1." back={{ href: "/ingles", label: "Inglés" }}>
        <OwnTip />
      </PageHeader>

      <Section title="Qué dice la convocatoria" plain>
        <Prose>
          La Fase 3 incluye una entrevista oral para garantizar que se posee, al menos, el nivel C1: máximo 50 puntos, mínimo 25 (bases de la convocatoria 2025, base 8). El formato exacto de la entrevista no está detallado oficialmente: pendiente de verificar en la próxima convocatoria. Lo que sigue es una guía propia, no el temario ni el formato oficial.
        </Prose>
      </Section>

      <Section title="Estructura sugerida" aside={<OwnTip />}>
        <ol className="space-y-5">
          {STRUCTURE.map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full bg-subtle text-sm font-bold text-muted-foreground">{i + 1}</span>
              <span className="max-w-prose text-lg leading-relaxed">
                <span className="font-bold">{t}.</span> {d}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Frases útiles" aside={<OwnTip />} flush>
        <ul className="divide-y divide-line">
          {PHRASES.map(([k, v]) => (
            <li key={k} className="space-y-1 px-5 py-4 sm:px-6">
              <p className="text-sm text-muted-foreground">{k}</p>
              <p lang="en" className="text-lg leading-relaxed italic">{v}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Consejos de práctica" aside={<OwnTip />}>
        <ul className="list-disc space-y-3 pl-6 marker:text-muted-foreground">
          {TIPS.map((t) => (
            <li key={t} className="max-w-prose pl-1 text-lg leading-relaxed">{t}</li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
