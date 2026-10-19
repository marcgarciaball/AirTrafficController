import { DOC, U, cita, type GuiaData, type Src } from "@/lib/guia"

/** Referencia a una fuente: clave de `U` (URL oficial) o de `DOC` (documento del portal), y su localización. */
export type Ref = { r: keyof typeof U | keyof typeof DOC; loc?: string }
export function res(g: GuiaData, c: Ref): Src {
  return c.r in DOC ? cita(g, c.r as keyof typeof DOC, c.loc) : cita(g, U[c.r as keyof typeof U], c.loc)
}

const b = (loc: string): Ref => ({ r: "bases", loc })
const P9 = b("base 8, pág. 9")
const P10 = b("base 8, pág. 10")
const P11 = b("base 8, pág. 11")
const P12 = b("base 8, pág. 12")
const P13 = b("base 8, pág. 13")
const P14 = b("base 9, pág. 14")
const ADM: Ref = { r: "admision", loc: "pág. 1" }
const RF1: Ref = { r: "resF1", loc: "pág. 1" }
const A4: Ref = { r: "anexo4", loc: "pág. 1" }
const FEAST: Ref = { r: "feast" }
const PRAC: Ref = { r: "feastPractica" }

/** Fila de formato. `value: null` = el dato no consta y se muestra el chip amber con `falta`. */
export type Fila = { label: string; value: string | null; c: Ref; falta?: string }
export type Texto = { text: string; c: Ref }
export type Enlace = { href: string; label: string; desc: string; ext?: boolean }

export type Prueba = {
  slug: string
  code: string
  title: string
  short: string
  que: Texto[]
  formato: Fila[]
  /** Por qué se hace, según la fuente. Si falta, se muestra "La convocatoria no lo explica". */
  porque: Texto[]
  porqueConsejo: string[]
  saberOficial: Texto[]
  saber: string[]
  app: Enlace[]
  appNota?: string
  errores: string[]
}

const MISMO_DIA_F1: Fila = { label: "Duración de esta prueba", value: null, c: P9 }
const DURACION_F1: Fila = {
  label: "Duración de la Fase 1",
  value: "Las cuatro pruebas van seguidas, con una duración estimada de al menos 4 h 30 min en total. En 2026 empezaron a las 10:00 (hora peninsular).",
  c: ADM,
}
const PRESENCIAL_F1: Fila = {
  label: "Presencial",
  value: "Sí. En 2026, el 7 y el 8 de febrero, en Madrid, Barcelona y Gran Canaria. Lleva DNI, pasaporte o carné de conducir en vigor y en físico, y bolígrafo negro o azul. No se permiten móviles.",
  c: ADM,
}
const PENALIZACION: Fila = { label: "Penalización por fallo", value: null, c: P9 }
const PLANTILLA_SIN_ENUNCIADOS: Fila = {
  label: "Qué trae la plantilla",
  value: "Solo la letra correcta de cada pregunta, para cada día. No incluye los enunciados.",
  c: { r: "plantillas" },
}
const SIMULACRO: Enlace = { href: "/estudio/simulacro", label: "Simulacro", desc: "Examen cronometrado con el formato de la Fase 1." }

export const PRUEBAS: Prueba[] = [
  {
    slug: "conocimientos",
    code: "Fase 1 · A",
    title: "Conocimientos generales",
    short: "Test de 50 preguntas sobre el temario oficial. Mínimo 25 puntos.",
    que: [
      { text: "Un test de 50 preguntas sobre el entorno del control de tráfico aéreo. Las preguntas salen del temario oficial, que es el Anexo I de las bases.", c: P9 },
      { text: "Es una prueba puntuable: tu nota suma en el ranking.", c: P9 },
    ],
    formato: [
      { label: "Preguntas según las bases", value: "50, tipo test.", c: P9 },
      { label: "Respuestas en la plantilla de 2026", value: "52 por cada día de examen (7 y 8 de febrero).", c: { r: "plantillas", loc: "pág. 1" } },
      { label: "Por qué la plantilla trae 52 y no 50", value: null, c: { r: "plantillas", loc: "pág. 1" }, falta: "No consta el motivo" },
      PLANTILLA_SIN_ENUNCIADOS,
      { label: "Puntuación máxima", value: null, c: P9 },
      { label: "Mínimo para aprobar", value: "25 puntos. Si no llegas, quedas fuera del proceso.", c: P9 },
      PENALIZACION,
      MISMO_DIA_F1,
      DURACION_F1,
      PRESENCIAL_F1,
    ],
    porque: [],
    porqueConsejo: [
      "El controlador trabaja con reglas, espacio aéreo, meteorología y procedimientos. Este test comprueba que llegas con esa base antes de la formación.",
      "También sirve para filtrar: hay muchos más aspirantes que plazas.",
    ],
    saberOficial: [
      { text: "Todo el temario del Anexo I. Es la única lista oficial de lo que puede salir.", c: { r: "temario" } },
      { text: "ENAIRE publica las plantillas de corrección de las pruebas A, B y C en un máximo de 48 horas tras la Fase 1.", c: P10 },
    ],
    saber: [
      "Estudia el temario entero. Con 50 preguntas, cada tema puede dar una o dos.",
      "Primero entiende, luego memoriza. Las preguntas tipo test castigan las ideas a medias.",
      "Haz preguntas de cada tema justo después de estudiarlo y repasa los fallos al día siguiente.",
    ],
    app: [
      { href: "/estudio", label: "Estudio", desc: "Temario por temas, preguntas y repaso de fallos." },
      SIMULACRO,
    ],
    errores: [
      "Apuntar a 25. El 25 es el mínimo, no la meta: esta nota cuenta para el corte del puesto 596 y para el ranking final.",
      "Saltarse temas \"difíciles\". En un test corto, un tema que no estudias son puntos que regalas.",
      "Dar por hecho que los fallos restan, o que no. No consta en las bases. Lee las instrucciones del examen el día de la prueba.",
      "Estudiar solo leyendo. Haz preguntas desde el primer día.",
    ],
  },
  {
    slug: "ingles-escrito",
    code: "Fase 1 · B",
    title: "Inglés escrito",
    short: "Test de 20 preguntas de nivel C1. Máximo 20, mínimo 10.",
    que: [{ text: "Un test escrito de 20 preguntas para medir tus conocimientos de inglés de nivel C1 del Marco Común Europeo de Referencia (MCER).", c: P10 }],
    formato: [
      { label: "Preguntas", value: "20, tipo test.", c: P10 },
      { label: "Respuestas en la plantilla de 2026", value: "20 por cada día de examen (7 y 8 de febrero).", c: { r: "plantillas", loc: "pág. 2" } },
      PLANTILLA_SIN_ENUNCIADOS,
      { label: "Puntuación", value: "Máximo 20 puntos.", c: P10 },
      { label: "Mínimo para aprobar", value: "10 puntos. Es eliminatoria.", c: P10 },
      { label: "Tipo de ejercicios", value: null, c: P10 },
      PENALIZACION,
      MISMO_DIA_F1,
      DURACION_F1,
      PRESENCIAL_F1,
    ],
    porque: [],
    porqueConsejo: [
      "El inglés es el idioma común de la aviación. Para trabajar en ENAIRE necesitarás además la anotación de inglés OACI en la licencia. Este test filtra pronto a quien no tiene el nivel.",
    ],
    saberOficial: [
      { text: "No hace falta ningún título de inglés para presentarte. ENAIRE mide el nivel en sus propias pruebas.", c: { r: "faq", loc: "pregunta 15, pág. 5" } },
      { text: "El inglés se evalúa dos veces: este test escrito y una entrevista oral en la Fase 3.", c: P12 },
    ],
    saber: [
      "Gramática y vocabulario de nivel C1: tiempos verbales, condicionales, phrasal verbs, colocaciones.",
      "Comprensión lectora de textos de nivel alto.",
      "Practica con exámenes de muestra oficiales de nivel C1. Fíjate en por qué fallas, no solo en la nota.",
    ],
    app: [
      { href: "/ingles", label: "Inglés", desc: "Plan semanal, registro de pruebas y enlaces a material oficial C1." },
      SIMULACRO,
    ],
    errores: [
      "Pensar que con un B2 alcanza. Se pide C1.",
      "Olvidar que es eliminatoria: pesa poco en el ranking, pero si no llegas a 10, el resto no cuenta.",
      "Dejar el inglés para después de la Fase 1. La entrevista oral de la Fase 3 también es C1, y hablar bien lleva meses.",
    ],
  },
  {
    slug: "aptitudes",
    code: "Fase 1 · C",
    title: "Test de aptitudes",
    short: "Atención y razonamiento espacial y abstracto. Máximo 50, mínimo 25.",
    que: [
      {
        text: "Valora tu capacidad para comprender y relacionar ideas complejas, trabajar con contenidos abstractos, sacar conclusiones lógicas, resolver problemas nuevos y aprender en situaciones nuevas. Mide, entre otros aspectos, atención, razonamiento espacial y razonamiento abstracto.",
        c: P10,
      },
    ],
    formato: [
      { label: "Preguntas según las bases", value: null, c: P10 },
      { label: "Respuestas en la plantilla de 2026", value: "76 por cada día de examen (7 y 8 de febrero).", c: { r: "plantillas", loc: "págs. 3 y 4" } },
      PLANTILLA_SIN_ENUNCIADOS,
      { label: "Puntuación", value: "Máximo 50 puntos.", c: P10 },
      { label: "Mínimo para aprobar", value: "25 puntos en el total de la prueba. Es eliminatoria.", c: P10 },
      { label: "Cómo se corrige", value: "Literal de las bases: \"tomando como resultado la puntuación máxima obtenida por la muestra presentada\".", c: P10 },
      PENALIZACION,
      MISMO_DIA_F1,
      DURACION_F1,
      PRESENCIAL_F1,
    ],
    porque: [
      { text: "Las bases dicen que está orientada a valorar la capacidad de comprender y relacionar ideas complejas, resolver problemas nuevos y aprender en situaciones nuevas.", c: P10 },
    ],
    porqueConsejo: [],
    saberOficial: [{ text: "Atención, razonamiento espacial y razonamiento abstracto, \"entre otros aspectos\".", c: P10 }],
    saber: [
      "No hay temario: se entrena. Lo que cuenta es acertar rápido.",
      "Practica cada tipo de ejercicio: series, figuras que giran, búsqueda de errores, atención sostenida.",
      "Mejor 20 minutos al día que tres horas el domingo.",
    ],
    app: [
      { href: "/aptitudes", label: "Aptitudes", desc: "Ejercicios cronometrados de atención y razonamiento." },
      SIMULACRO,
    ],
    errores: [
      "Practicar sin cronómetro. En el examen el tiempo es parte de la prueba.",
      "Atascarse en una pregunta. Si no sale, pasa a la siguiente.",
      "Pensar que es innata. La velocidad mejora mucho con práctica regular.",
      "Olvidar que suma: 50 puntos cuentan en el corte y en el ranking igual que conocimientos.",
    ],
  },
  {
    slug: "personalidad",
    code: "Fase 1 · D",
    title: "Test de personalidad",
    short: "Cuestionario. Apto o no apto.",
    que: [
      { text: "Un cuestionario de personalidad. Mide cuánto se ajusta tu perfil a las funciones del puesto. Valora competencias y rasgos de personalidad.", c: P10 },
    ],
    formato: [
      { label: "Preguntas", value: null, c: P10 },
      { label: "Resultado", value: "Apto o no apto (\"ajusta / no ajusta\"). Lo decide la Comisión de Valoración.", c: P10 },
      { label: "¿Suma en el ranking?", value: "No. Solo hay que ser apto.", c: P14 },
      MISMO_DIA_F1,
      DURACION_F1,
      PRESENCIAL_F1,
    ],
    porque: [{ text: "Para determinar el ajuste de la persona al perfil del puesto.", c: P10 }],
    porqueConsejo: [],
    saberOficial: [],
    saber: [
      "No hay respuestas que estudiar.",
      "Responde con sinceridad y sin pensar demasiado cada pregunta.",
      "Llega descansado: suele ser la última prueba de un día largo.",
    ],
    app: [{ href: "/guia/proceso", label: "El proceso", desc: "Dónde encaja esta prueba en la Fase 1." }],
    appNota: "Torre no tiene práctica para esta prueba: no hay material oficial.",
    errores: [
      "Intentar dar \"el perfil ideal\". Los cuestionarios suelen repetir ideas con otras palabras, y las respuestas forzadas se contradicen.",
      "Contestar con prisa al final del día sin leer bien la escala de respuesta.",
    ],
  },
  {
    slug: "feast-pdea",
    code: "Fase 2",
    title: "Pruebas digitales: FEAST y PDEA",
    short: "Dos pruebas por ordenador en un día. Máximo 100, mínimo 50 y superar cada test.",
    que: [
      { text: "Dos pruebas por ordenador, en español o inglés: FEAST (First European Air Traffic Controller Selection Test) y PDEA (Prueba Digital en Entorno ATC).", c: P11 },
      { text: "FEAST es la prueba de selección de Eurocontrol. Tiene tres partes: FEAST I (pruebas cognitivas y test de inglés), FEAST II (pruebas de muestra de trabajo, como RADAR) y FEAST III (cuestionario de personalidad).", c: FEAST },
      { text: "La PDEA es una prueba propia de ENAIRE.", c: P11 },
    ],
    formato: [
      { label: "Pruebas", value: "FEAST y PDEA, en la misma jornada. Hay que superar las dos.", c: P11 },
      { label: "Puntuación", value: "Máximo 100 puntos entre las dos.", c: P11 },
      { label: "Mínimo para aprobar", value: "Superar todos y cada uno de los test de ambas pruebas, y sumar al menos 50 puntos.", c: P11 },
      { label: "Mínimo de cada test", value: null, c: P11 },
      { label: "Reparto de los 100 puntos entre FEAST y PDEA", value: null, c: P11 },
      { label: "Qué partes de FEAST usa ENAIRE", value: null, c: P11 },
      { label: "Contenido de la PDEA", value: null, c: P11 },
      { label: "Duración", value: "Entre 7 y 8 horas en total, con una hora de descanso entre las dos pruebas. En 2026 empezaban a las 8:30.", c: RF1 },
      { label: "Presencial", value: "Sí, en ordenador. En 2026, en la Universidad Autónoma de Madrid (Cantoblanco), del 13 al 19 de marzo.", c: RF1 },
      { label: "Confidencialidad", value: "Al empezar aceptas por vía electrónica la confidencialidad de las pruebas.", c: P11 },
      { label: "Reclamaciones", value: "Solo por incidencias técnicas que hayas comunicado durante la prueba.", c: P11 },
      { label: "Si ya hiciste FEAST en una escuela", value: "No te exime: hay que hacer todas las fases.", c: { r: "faq", loc: "pregunta 17, pág. 6" } },
    ],
    porque: [
      { text: "Las bases dicen que las pruebas digitales quieren profundizar en tu capacidad para hacer tareas múltiples más complejas a la vez, como ocurre en el trabajo del controlador.", c: P11 },
      { text: "Eurocontrol describe FEAST II como pruebas pensadas para principiantes sin experiencia en control aéreo.", c: FEAST },
    ],
    porqueConsejo: [],
    saberOficial: [
      { text: "FEAST I mide decisión, planificación, memoria, razonamiento lógico, percepción visual, atención, multitarea y orientación espacial, más un test de inglés.", c: FEAST },
      { text: "La plataforma oficial de práctica es gratuita. Haz cada prueba, revisa el resultado y repítela una o dos veces. Eurocontrol orienta un máximo de 8 horas en total: más puede no aportar nada.", c: PRAC },
      { text: "No se espera un resultado perfecto. Muchos errores suelen indicar que no entendiste la tarea: vuelve a leer las instrucciones.", c: PRAC },
      { text: "Eurocontrol no autoriza el software comercial: puede hacerte practicar tareas que nunca saldrán.", c: PRAC },
    ],
    saber: [
      "Entrena la atención y la multitarea con la práctica de aptitudes durante semanas, no días.",
      "Usa la plataforma de FEAST en los últimos meses, sin pasar de las 8 horas que orienta Eurocontrol.",
      "De la PDEA no hay material oficial. Llega con las instrucciones bien leídas y sin prisa.",
      "Prepara el cuerpo para un día de 7 u 8 horas frente a una pantalla: sueño, comida y agua.",
    ],
    app: [
      { href: U.feastPractica[0], label: "Práctica oficial de FEAST", desc: "Plataforma gratuita de Eurocontrol.", ext: true },
      { href: "/aptitudes", label: "Aptitudes", desc: "Atención y razonamiento, la base de FEAST I." },
      { href: "/guia/feast", label: "Guía: FEAST y PDEA", desc: "Detalle de la plataforma de práctica." },
    ],
    errores: [
      "Pensar que basta con la media. Hay que superar cada test por separado: un test flojo te deja fuera aunque sumes 50.",
      "Leer las instrucciones deprisa. Eurocontrol insiste en que en la prueba real cambian diseño y reglas.",
      "Sobreentrenar con la plataforma o con programas comerciales.",
      "No avisar de un fallo técnico en el momento. Después ya no se puede reclamar.",
      "Olvidar que pesa mucho: son 100 puntos, la parte más grande del corte para la Fase 3.",
    ],
  },
  {
    slug: "ingles-oral",
    code: "Fase 3 · A",
    title: "Inglés oral",
    short: "Entrevista de nivel C1. Máximo 50, mínimo 25.",
    que: [
      { text: "Una entrevista para medir tu comprensión, expresión, fluidez y habilidades comunicativas en inglés, y garantizar que tienes al menos el nivel C1 del MCER.", c: P12 },
    ],
    formato: [
      { label: "Formato", value: "Entrevista, presencial o telemática, según decida ENAIRE.", c: P12 },
      { label: "Puntuación", value: "Máximo 50 puntos.", c: P13 },
      { label: "Mínimo para aprobar", value: "25 puntos. Es eliminatoria.", c: P13 },
      { label: "Cuándo", value: "En la misma jornada que las otras dos pruebas de la Fase 3.", c: P12 },
      { label: "Orden de resultados", value: "Primero se publican los de esta prueba. Los de la evaluación conductual y la clínica solo se publican para quienes la superan.", c: P13 },
      { label: "Duración de la entrevista", value: null, c: P12 },
    ],
    porque: [{ text: "Para garantizar que tienes al menos el nivel C1 de inglés hablado.", c: P12 }],
    porqueConsejo: [],
    saberOficial: [],
    saber: [
      "Hablar con soltura de ti: estudios, trabajo, por qué quieres ser controlador.",
      "Opinar y argumentar sobre temas generales y de actualidad.",
      "Entender preguntas a la primera y pedir aclaraciones con naturalidad.",
      "Habla en voz alta cada día, grábate y escucha tus errores.",
    ],
    app: [
      { href: "/ingles/entrevista", label: "Entrevista de inglés", desc: "Preguntas de práctica para hablar en voz alta." },
      { href: "/ingles", label: "Inglés", desc: "Plan semanal con expresión oral." },
    ],
    errores: [
      "Memorizar respuestas enteras. Se nota y te bloquea si la pregunta cambia.",
      "Practicar solo leyendo. La fluidez solo se gana hablando.",
      "Olvidar que es la primera criba de la Fase 3: si no llegas a 25, no te puntúan el resto.",
    ],
  },
  {
    slug: "conductual",
    code: "Fase 3 · B",
    title: "Evaluación conductual",
    short: "Siete competencias. Máximo 120, mínimo 60 y la mitad en cada una.",
    que: [
      {
        text: "Varias pruebas para valorar cuánto se adecúa tu perfil al de controlador de tránsito aéreo. Ese perfil son competencias conductuales y estratégicas que pide ENAIRE, basadas en su Plan Estratégico 2021-2025 (Plan de Vuelo 2025).",
        c: P13,
      },
    ],
    formato: [
      { label: "Formato", value: "\"Varias pruebas\".", c: P13 },
      { label: "Tipo de pruebas (entrevista, casos, dinámicas…)", value: null, c: P13 },
      { label: "Puntuación", value: "Máximo 120 puntos: la suma de lo que saques en cada competencia.", c: A4 },
      { label: "Mínimo para aprobar", value: "60 puntos en total y, además, al menos el 50 % del máximo en cada competencia.", c: A4 },
      { label: "Desempate", value: "Es el primer criterio de desempate del ranking final.", c: P14 },
      { label: "Duración", value: null, c: P13 },
    ],
    porque: [
      { text: "Para valorar tu adecuación al perfil de controlador, formado por las competencias conductuales y estratégicas que ENAIRE pide.", c: P13 },
    ],
    porqueConsejo: [],
    saberOficial: [],
    saber: [],
    app: [{ href: "/guia/examen", label: "El examen por dentro", desc: "Por qué esta prueba es la que más pesa." }],
    appNota: "Torre aún no tiene práctica para esta prueba. Prepara tus ejemplos por escrito con el método de abajo.",
    errores: [
      "Descuidar una competencia. Si no llegas a la mitad en una sola, suspendes aunque sumes más de 60.",
      "Hablar en \"nosotros\". Cuenta qué hiciste tú.",
      "Ejemplos sin final. Di siempre qué pasó y qué aprendiste.",
      "Inventar o exagerar. Las preguntas de seguimiento lo destapan.",
      "Prepararla la última semana. Es la prueba que más pesa del ranking.",
    ],
  },
  {
    slug: "clinica",
    code: "Fase 3 · C",
    title: "Evaluación clínica de la personalidad",
    short: "Pruebas psicológicas clínicas. Apto o no apto.",
    que: [
      {
        text: "Pruebas para valorar tu idoneidad psicológica, desde el punto de vista clínico, para trabajar como controlador. Buscan descartar psicopatologías, conductas desadaptativas y funciones cognitivas anómalas.",
        c: P13,
      },
    ],
    formato: [
      { label: "Resultado", value: "Apto o no apto. Es eliminatoria.", c: P13 },
      { label: "¿Suma en el ranking?", value: "No.", c: P14 },
      { label: "Cuándo", value: "En la misma jornada que las otras dos pruebas de la Fase 3.", c: P12 },
      { label: "Tipo de pruebas", value: null, c: P13 },
      { label: "Duración", value: null, c: P13 },
    ],
    porque: [{ text: "Para descartar psicopatologías, conductas desadaptativas y funciones cognitivas anómalas.", c: P13 }],
    porqueConsejo: [],
    saberOficial: [],
    saber: [
      "No se estudia. Llega descansado y responde con sinceridad.",
      "No es el certificado médico de Clase 3: ese es un requisito aparte para la licencia.",
    ],
    app: [{ href: "/guia/medico", label: "Médico Clase 3", desc: "El reconocimiento médico, que es otra cosa." }],
    appNota: "Torre no tiene práctica para esta prueba, ni debe tenerla.",
    errores: [
      "Intentar maquillar las respuestas. Es una evaluación clínica, no un examen.",
      "Llegar agotado: es el final de una jornada con tres pruebas.",
    ],
  },
]

/** Competencias del Anexo IV, con su máximo. El mínimo es el 50 % de cada una. */
export const COMPETENCIAS: [string, number][] = [
  ["Trabajo en equipo", 18],
  ["Orientación a resultados", 18],
  ["Toma de decisiones", 18],
  ["Flexibilidad y adaptación al cambio", 18],
  ["Compromiso organizacional", 18],
  ["Resiliencia", 15],
  ["Gestión del estrés y tolerancia a la presión", 15],
]

export const anexo4 = A4
export const bases = { P9, P11, P12, P14 }
