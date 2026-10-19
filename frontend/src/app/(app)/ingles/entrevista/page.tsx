import { Annunciator } from "@/components/cockpit/annunciator"
import { PageTitle, Prose } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"

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
    <section className="space-y-6">
      <PageTitle code="ENG ENTREVISTA" title="Preparar la entrevista oral (Fase 3, nivel C1)" back={{ href: "/ingles", label: "Inglés" }}>
        <Annunciator tone="amber">CONSEJO PROPIO · NO OFICIAL</Annunciator>
      </PageTitle>

      <Panel title="Qué dice la convocatoria">
        <Prose className="text-sm text-muted-foreground">
          La Fase 3 incluye una entrevista oral para garantizar que se posee, al menos, el nivel C1: máximo 50 puntos, mínimo 25 (bases de la convocatoria 2025, base 8). El formato exacto de la entrevista no está detallado oficialmente: pendiente de verificar en la próxima convocatoria. Lo que sigue es una guía propia, no el temario ni el formato oficial.
        </Prose>
      </Panel>

      <Panel title="Estructura sugerida" aside="Consejo propio · no oficial">
        <ol className="space-y-3">
          {STRUCTURE.map(([t, d], i) => (
            <li key={t} className="flex gap-3">
              <span className="w-5 shrink-0 font-mono text-magenta tabular-nums">{i + 1}</span>
              <span className="max-w-[68ch] leading-relaxed">
                <span className="text-cyan">{t}.</span> {d}
              </span>
            </li>
          ))}
        </ol>
      </Panel>

      <Panel title="Frases útiles" aside="Consejo propio · no oficial" flush>
        <ul className="divide-y divide-line">
          {PHRASES.map(([k, v]) => (
            <li key={k} className="px-3 py-2.5 sm:px-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{k}</p>
              <p className="font-mono text-sm leading-relaxed">{v}</p>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Consejos de práctica" aside="Consejo propio · no oficial">
        <ul className="list-disc space-y-2 pl-5 marker:text-muted-foreground">
          {TIPS.map((t) => (
            <li key={t} className="max-w-[68ch] leading-relaxed">{t}</li>
          ))}
        </ul>
      </Panel>
    </section>
  )
}
