/** "Empieza aquí": la guía como curso ordenado, de no saber nada a saber qué estudiar. */
export type Leccion = { href: string; title: string; desc: string }
export type Modulo = { title: string; goal: string; lessons: Leccion[] }

export const CURSO: Modulo[] = [
  {
    title: "La profesión",
    goal: "Qué hace un controlador aéreo, cuánto cobra y qué supone llegar a serlo.",
    lessons: [
      { href: "/guia/antes", title: "Qué es el trabajo y el camino completo", desc: "El trabajo, el camino hasta el primer sueldo, el curso, el préstamo y cuánto ahorrar." },
      { href: "/guia/salario", title: "Cuánto se cobra", desc: "Sueldo bruto por destino y año de carrera." },
      { href: "/guia/cifras", title: "Las cifras del proceso", desc: "Tasa, aspirantes por plaza y coste de la formación." },
    ],
  },
  {
    title: "¿Puedes presentarte?",
    goal: "Los requisitos que tienes que cumplir antes de invertir tiempo.",
    lessons: [
      { href: "/guia/requisitos", title: "Requisitos", desc: "Para presentarte y para ser contratado." },
      { href: "/guia/medico", title: "Certificado médico Clase 3", desc: "Qué es, pruebas, causas de no apto, precio y cita." },
      { href: "/guia/idiomas", title: "Nivel de inglés", desc: "El C1 que pide ENAIRE y las anotaciones OACI." },
    ],
  },
  {
    title: "Cómo es la oposición",
    goal: "Las fases, las pruebas, las notas mínimas y las fechas.",
    lessons: [
      { href: "/guia/proceso", title: "Las tres fases", desc: "Fases 1, 2 y 3, puntuaciones, nota de corte y desempates." },
      { href: "/guia/examen", title: "Cada prueba por dentro", desc: "Cuánto pesa cada prueba, qué mínimo pide y cómo prepararla." },
      { href: "/guia/calendario", title: "Calendario", desc: "Fechas de la última convocatoria y de la próxima." },
      { href: "/guia/plazas", title: "¿Hay plazas nuevas?", desc: "Dónde comprobar si sale convocatoria." },
    ],
  },
  {
    title: "Las pruebas que no son temario",
    goal: "Cómo prepararte para las pruebas digitales, la personalidad y la entrevista.",
    lessons: [
      { href: "/guia/feast", title: "FEAST y PDEA", desc: "Las pruebas digitales de la Fase 2 y su práctica oficial." },
      { href: "/guia/personalidad", title: "Test de personalidad", desc: "Cómo funciona, coherencia y errores típicos." },
      { href: "/guia/fase3", title: "Entrevista y dinámica", desc: "Qué evalúan, método STAR y banco de preguntas." },
    ],
  },
  {
    title: "Después de aprobar",
    goal: "Formación, licencias y lo que cuentan quienes ya han pasado.",
    lessons: [
      { href: "/guia/despues", title: "Formación y licencia", desc: "Curso, licencias SATCO y ATCO, y el plazo de 17 meses." },
      { href: "/guia/experiencias", title: "Experiencias de aspirantes", desc: "Errores que causan suspensos y consejos repetidos." },
    ],
  },
]

export const LECCIONES = CURSO.flatMap((m, mi) => m.lessons.map((l) => ({ ...l, modulo: mi })))
