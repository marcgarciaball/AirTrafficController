import { Bloque, Consejo, GuiaPage, Hechos, Leyenda, Nota } from "@/components/guia/guia-ui"
import { F, cita, loadGuia } from "@/lib/guia"

const PREGUNTAS: { tema: string; qs: string[] }[] = [
  { tema: "Trayectoria académica y laboral", qs: ["Cuéntame un momento de tu carrera o trabajo del que te sientas orgulloso.", "¿Por qué elegiste tus estudios y qué has aprendido de ellos?"] },
  { tema: "Presión y estrés", qs: ["Describe una situación en la que tuviste que decidir bajo presión.", "¿Qué haces cuando varias tareas urgentes coinciden?"] },
  { tema: "Equipo, superiores y compañeros", qs: ["Cuéntame un conflicto con un compañero y cómo lo resolviste.", "¿Cómo has reaccionado cuando un superior te corrigió?"] },
  { tema: "Fallos propios", qs: ["Cuéntame un error tuyo, qué consecuencias tuvo y qué cambiaste después.", "¿Qué harías distinto si repitieras esa situación?"] },
  { tema: "Resiliencia y adaptación", qs: ["Describe un cambio inesperado que te obligó a adaptarte.", "Cuéntame un fracaso del que te recuperaste."] },
  { tema: "Autoconocimiento (entrevista clínica)", qs: ["¿Cómo te defines y cómo te describiría alguien cercano?", "¿Cómo gestionas tus relaciones sociales y tu tiempo libre?"] },
]

export default async function Page() {
  const g = await loadGuia()
  return (
    <GuiaPage
      label="Capítulo 12"
      title="Entrevista y dinámica de grupo"
      intro="Es la parte de la Fase 3 sobre la que hay menos información. Lo oficial es poco; lo demás viene de academias y aspirantes."
    >
      <Leyenda />
      <Bloque title="Qué evalúan">
        <Hechos
          items={[
            { nivel: "oficial", titulo: "Evaluación conductual", texto: "La Fase 3 incluye inglés oral, evaluación conductual (120 puntos) y evaluación clínica de personalidad. Los criterios están en el Anexo IV de la convocatoria.", fuente: cita(g, "anexo4", "pág. 1") },
            { nivel: "testimonio", titulo: "Entrevista clínica", texto: "Según una academia: se resuelve con apto o no apto, con enfoque de descarte, con psicólogos o psiquiatras y preguntas inesperadas. Temas citados: empatía, drogas, relaciones sociales, dinero, autodefinición y salud mental.", fuente: F.superaoposiciones },
            { nivel: "testimonio", titulo: "Entrevista conductual individual", texto: "Según una academia: trayectoria académica y laboral, trabajo bajo presión, relación con superiores y compañeros, y fallos propios.", fuente: F.superaoposiciones },
            { nivel: "testimonio", titulo: "Competencias", texto: "Trabajo en equipo, adaptabilidad, decisión, orientación a resultados, resiliencia y gestión del estrés.", fuente: F.superaoposiciones },
            { nivel: "testimonio", titulo: "Coherencia", texto: "Un preparador privado indica que se exige coherencia entre el test, la entrevista y la dinámica, y que se observa el comportamiento verbal y no verbal.", fuente: F.enclavepsi },
            { nivel: "testimonio", titulo: "Formato", texto: "Por la mañana, entrevistas individuales (clínica y conductual) y dinámica de grupo; el inglés oral, por la tarde. Una academia habla de dinámicas de grupo o pruebas tipo escape room según la convocatoria; otro relato, de una dinámica de unas 20 personas con un escenario de apocalipsis zombi. El formato varía por convocatoria.", fuente: F.infobae },
            { nivel: "verificar", titulo: "Criterios reales", texto: "No hay ninguna fuente oficial ni relato detallado sobre cómo se puntúa la dinámica ni sobre los suspensos concretos." },
          ]}
        />
      </Bloque>
      <Bloque title="Conducta en la dinámica">
        <Hechos
          items={[
            { nivel: "testimonio", titulo: "Colabora, no compitas", texto: "Participa sin acaparar. Evita hablar mucho, quitar turnos, imponer decisiones o competir con el grupo. Pero tampoco vale quedarse callado.", fuente: F.superaoposiciones },
            { nivel: "testimonio", titulo: "Error habitual", texto: "Creer que la experiencia previa en entrevistas o dinámicas basta.", fuente: F.superaoposiciones },
          ]}
        />
        <Nota>Todo esto viene de academias y preparadores con interés comercial, no de aprobados ni de ENAIRE. Trátalo como orientación, no como regla.</Nota>
      </Bloque>
      <Bloque title="Prepara ejemplos con el método STAR">
        <Consejo>
          <p>Para cada pregunta, prepara un ejemplo real y cuéntalo con STAR: Situación (el contexto), Tarea (qué te tocaba), Acción (qué hiciste tú, en primera persona) y Resultado (qué pasó y qué aprendiste). Una frase por letra basta para empezar.</p>
          <p>Elige ejemplos que muestren lo que se evalúa: trabajo en equipo, decisión bajo presión, adaptación y aprendizaje de un fallo. Entiende qué mide cada pregunta y no memorices respuestas genéricas: los preparadores citan la improvisación y la memorización como causa de suspenso.</p>
        </Consejo>
      </Bloque>
      <Bloque title="Banco de preguntas para preparar ejemplos">
        <Consejo>
          <p>Preguntas de ensayo que hemos redactado a partir de los temas que citan las academias. No son preguntas oficiales ni salen en la convocatoria.</p>
        </Consejo>
        <div className="space-y-4">
          {PREGUNTAS.map((p) => (
            <div key={p.tema} className="space-y-2 rounded-lg border bg-card px-5 py-5 shadow-sm sm:px-6">
              <h3 className="font-bold text-foreground">{p.tema}</h3>
              <ul className="list-disc space-y-1 pl-5 text-lg leading-relaxed text-foreground">
                {p.qs.map((q) => <li key={q}>{q}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Bloque>
      <Bloque title="Ejercicios de práctica">
        <Consejo>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Escribe un ejemplo STAR por cada tema del banco (6 ejemplos) y léelos en voz alta con un cronómetro.</li>
            <li>Grábate contestando dos preguntas seguidas y revisa tu comportamiento verbal y no verbal.</li>
            <li>Haz un simulacro de dinámica con amigos o compañeros: propón un escenario, decidid en grupo y revisa luego si acaparaste turnos o te callaste.</li>
            <li>Pide a alguien que te haga preguntas inesperadas sobre ti mismo y comprueba que tus respuestas siguen siendo coherentes con las del test de personalidad.</li>
          </ol>
        </Consejo>
      </Bloque>
    </GuiaPage>
  )
}
