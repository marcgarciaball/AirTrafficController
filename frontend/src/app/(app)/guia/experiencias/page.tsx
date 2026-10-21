import { Bloque, GuiaPage, Hechos, Leyenda, Nota, Tabla } from "@/components/guia/guia-ui"
import { F, f20 } from "@/lib/guia"

const ES = "España"

const VIDEO_ALBA = f20("https://www.youtube.com/watch?v=RfZ2w5CDOSQ", "YouTube: «De enfermera a controladora aérea» (entrevista, 2026)")

/** Entrevista a una aprobada de la convocatoria 2025, resumida por fases. */
const ALBA: [string, string][] = [
  ["Perfil y punto de partida", "31 años, enfermera de Bilbao con plaza fija, dos másteres y 9 años en hospitales. Sin formación aeronáutica: creía que hacía falta ser piloto o ingeniero y descubrió en los requisitos que no. Llegó al control aéreo por podcasts y redes de controladores. Empezó a preparar a finales de agosto de 2025, pocos meses antes de la convocatoria."],
  ["Cómo estudió", "Trabajando a turnos: estudiaba en las noches tranquilas del hospital, aunque fuera media hora, y llevaba siempre los apuntes encima. Lo planteó como unos meses de sacrificio con un objetivo claro. Su consejo: presentarse porque te guste el trabajo, no solo por las condiciones."],
  ["Fase 1: temario", "Aprobar el temario es fácil; sacar nota alta exige horas, y esos puntos cuentan. Ella fue a por la máxima nota posible."],
  ["Fase 1: psicotécnicos", "Nunca había hecho ninguno: el primer ejercicio de cubos le pareció imposible y al final los resolvía en unos 12 segundos con práctica estructurada. Con tiempo ilimitado todos sacarían un 10: el límite es el tiempo. Ve con una estrategia de qué ejercicios hacer primero para sumar el máximo de puntos."],
  ["Fase 1: inglés", "Aunque veía series y películas en inglés y creía dominarlo, la gramática la sorprendió y tuvo que repasarla mucho más de lo previsto. Hizo muchos exámenes de práctica. Hay pocas preguntas y los errores restan (cita 0,33 por fallo), así que cada fallo pesa mucho: arriesga poco. A veces dos opciones parecen válidas y hay que elegir la más correcta. Ella arriesgó más de lo planeado y le salió bien, pero salió con dudas."],
  ["Fase 1: resultados", "Las notas salieron en torno a una semana después."],
  ["Fase 2: pruebas digitales", "Unos 2 meses de preparación. Antes solo conocía los ejercicios en teoría; después practicó con simulador. Recuerda pruebas de ruta y torre, multicolor y radar, en una jornada de 9:00 a 15:00 aproximadamente. La primera (de ruta, con drones) le salió mal: barras en rojo que cambiaban sin entender por qué. Clave: no hundirse por un ejercicio, porque condiciona el resto de la mañana; los que salen bien compensan a los que salen mal. Le resultó la fase más entretenida, «como un juego». Resultados en unas 2 semanas, con más incertidumbre que la Fase 1 porque no se sabe cómo puntúan."],
  ["Fase 3: formato", "Por orden alfabético a lo largo de 40-45 días. Dinámica de grupo y tres entrevistas individuales a solas con el evaluador: clínica, conductual y profesional (Recursos Humanos y un controlador). Ambiente cordial, nada frío. Todo está muy estructurado, así que saber de antemano qué viene da tranquilidad."],
  ["Fase 3: venderse sin fingir", "Su mayor problema: era tímida, con perfil bajo, y nunca la habían entrevistado (en sanidad era un número en una bolsa). Le costaba decir virtudes y le salían defectos sin parar. El cambio clave fue creerse sus propias cualidades: si tú no te lo crees, el entrevistador tampoco. Pidió a familia y amigos 3 virtudes y 3 defectos suyos. No hay que cambiar de personalidad: un tímido no tiene que parecer extrovertido, sino mostrar sus cualidades tal como es. Los evaluadores son profesionales y detectan lo fingido."],
  ["Fase 3: dinámica de grupo", "Lo que más le ayudó fue ensayar dinámicas con feedback: hasta practicarlas no ves tus fallos (no dejar hablar a otros, por ejemplo). Encaja la crítica como algo que corregir, no como ataque. En la dinámica se evalúa el trabajo en equipo: querer destacar o eclipsar al resto es un error, y ENAIRE no busca egos. Vio actitudes egocéntricas en su grupo y esas personas suspendieron. Para venderte ya están las entrevistas individuales."],
  ["Fase 3: entrevistas", "La conductual es la que más respeto le daba: hay que demostrar cualidades con situaciones reales y cómo las resolviste, y contarlas bien. Todo se evalúa por competencias: en cada respuesta intentaba mostrar más de una. Su experiencia laboral le dio muchos ejemplos. Fue tranquila y segura porque contaba la verdad, y cree que eso se notó."],
  ["Perfiles que aprueban", "No hay un perfil único: aprueban tímidos y extrovertidos, jóvenes y mayores, con mucha o poca formación académica. Buscan a la persona, no un molde. Piden adaptabilidad al cambio: las pruebas cambian a menudo de una convocatoria a otra."],
]

export default function Page() {
  return (
    <GuiaPage
      label="Capítulo 15"
      title="Experiencias de aspirantes"
      intro="Lo que cuentan aspirantes, academias y prensa sobre el proceso. Salvo lo marcado como oficial, no son fuentes oficiales."
    >
      <Leyenda />
      <Nota>Aviso de sesgo: las academias y los preparadores privados venden cursos y su información tiene interés comercial. No se halló ningún hilo de Reddit, PPRuNe, Quora ni Forocoches, ni reseña legible de Glassdoor; solo 9 testimonios distintos, varios muy pobres. Los únicos relatos en primera persona están en una web comercial (ControlPrep), y solo se leyó el resumen del buscador.</Nota>
      <Bloque title="Relato completo: enfermera aprobada en la convocatoria 2025" open>
        <Hechos
          items={ALBA.map(([titulo, texto]) => ({ nivel: "testimonio" as const, tipo: "aspirante" as const, pais: ES, titulo, texto, fuente: VIDEO_ALBA }))}
        />
      </Bloque>
      <Bloque title="Testimonios">
        <Hechos
          items={[
            { nivel: "testimonio", tipo: "aspirante", pais: ES, titulo: "Personalidad (Fase 1)", texto: "Un controlador del Centro de Palma cuenta que el test de personalidad casi le tumba pese a años de experiencia operativa. Aprobó ENAIRE, DFS y Skyguide a la vez; fue el único extranjero de 128 plazas. El test, en un idioma que no era el suyo, le pareció «súper complicado» y nunca había visto uno tan largo. Afirma que «no se prepara» y que es el que más gente subestima. Su consejo principal es motivación y constancia. Solo resumen del buscador.", fuente: F.controlprep },
            { nivel: "testimonio", tipo: "aspirante", pais: ES, titulo: "Fase 3: seis intentos", texto: "Tras seis convocatorias, relata que las entrevistas pasaron de individuales a grupales y más largas, en tres partes (individual, clínica y conductual). Su primera oportunidad real fue en 2016. Destaca la estabilidad emocional y competir contra uno mismo; tras varios procesos «las fuerzas fallan». No se leyeron las causas de cada suspenso. Solo resumen del buscador.", fuente: F.controlprep2 },
            { nivel: "testimonio", tipo: "aspirante", pais: ES, titulo: "Controladora de ruta del Centro de Palma: suspendió el FEAST", texto: "Se presentó por influencia de su hermana. Suspendió el FEAST al primer intento. Dice que las primeras convocatorias incluían un examen teórico de aviación e inglés, luego suprimidos, y que el FEAST pasó a ser la criba principal. No se leyó el texto íntegro: se desconocen los errores concretos.", fuente: f20("https://controlprep.com/mi-camino-a-enaire.html", "ControlPrep: «Suspendí la primera vez. Aprobé la segunda.» (resumen del buscador)") },
            { nivel: "testimonio", tipo: "aspirante", pais: ES, titulo: "YouTube de un controlador en activo", texto: "Dinámica de unas 20 personas (apocalipsis zombi), entrevistas individuales y test de personalidad con preguntas repetidas para comprobar la coherencia. Algunos pasaron la fase digital sin practicar. El daltonismo puede excluir en el médico. El agente no vio el vídeo.", fuente: f20("https://www.youtube.com/", "YouTube (vídeo citado en la sección 8.1 del plan de estudio; sin URL concreta)") },
            { nivel: "testimonio", tipo: "academia", pais: ES, titulo: "Superaoposiciones", texto: "Clínica: apto o no apto, enfoque de descarte, preguntas inesperadas. Conductual individual: trayectoria, presión, superiores y compañeros, fallos propios. Dinámica: formato variable por convocatoria (totalmente oral desde 2019, según la academia).", fuente: F.superaoposiciones },
            { nivel: "testimonio", tipo: "academia", pais: ES, titulo: "Enclavepsi", texto: "Coherencia exigida entre test, entrevista y dinámica; se observa el comportamiento verbal y no verbal.", fuente: F.enclavepsi },
            { nivel: "testimonio", tipo: "prensa", pais: ES, titulo: "Infobae y Defensa.com", texto: "Por la mañana, entrevistas individuales (clínica y conductual) y dinámica de grupo; inglés oral por la tarde. Defensa.com cita un corte a Fase 3 en el candidato 588; el dato oficial del proyecto es el 596.", fuente: F.infobae },
            { nivel: "testimonio", tipo: "prensa", pais: ES, titulo: "Controladora de Palma (Última Hora, 2022)", texto: "Grado en Economía; curso de Torre en SENASA (10 meses), primer empleo en una empresa privada, oposición de ENAIRE aprobada en 2016 y especialización en Aproximación y Ruta (otros 10 meses). Cuenta el estrés, las tormentas y los retrasos del oficio. Consejo: «Si no te gusta la profesión, lo pasarás mal». No da consejos sobre la oposición.", fuente: f20("https://www.ultimahora.es/noticias/local/2022/09/11/1789883/enaire-baleares-entrevista-controladora-aerea-sara-gutierrez-marcet.html", "Última Hora, 11-09-2022") },
            { nivel: "testimonio", tipo: "academia", pais: ES, titulo: "Judith (Opiniones MasterD)", texto: "Psicotécnicos y conocimientos (Skytest y libros), inglés (clases y speaking particular) y entrevistas con psicólogos de la academia. No aprobó a la primera. Ahora está en formación en Skyway (habilitación de 3 a 6 meses). Consejo: disciplina y no rendirse.", fuente: f20("https://www.opinionesmasterd.es/aprobar-oposiciones-controlador-aereo", "Opiniones MasterD: Judith") },
            { nivel: "testimonio", tipo: "aspirante", pais: "Reino Unido (NATS)", titulo: "Alumno de NATS (Medium, escrito en 2006)", texto: "Solicitud, pruebas de aptitud y personalidad, entrevistas (una con un controlador operativo) y test informático. Casi un año de proceso; máximo 3 intentos con un año de espera; lo aceptaron al tercero. Curso básico de 12 semanas. Consejos: no empollar, apoyarse en el grupo, querer de verdad el puesto y aceptar el destino impuesto. Dato muy antiguo.", fuente: f20("https://medium.com/@leavingcontrolledairspace/so-you-want-to-be-an-air-traffic-controller-31f9c9430ea5", "Medium: «So you want to be an Air Traffic Controller»") },
            { nivel: "testimonio", tipo: "academia", pais: ES, titulo: "Alexia, Aida y Macarena (MasterD y Supera)", texto: "Relatos sin contenido útil: una arquitecta que aprobó «a la primera», una plaza con el puesto 35 y una motivación de vocación y mejores condiciones laborales.", fuente: f20("https://www.superaoposiciones.es/blog/aprobados-controlador-aereo-enaire", "Supera: aprobados (Macarena)") },
            { nivel: "oficial", titulo: "EUROCONTROL sobre el FEAST", texto: "Mantén una actitud tranquila y descansa bien. No siempre se terminan todos los ítems y eso no implica suspender. No hace falta formación aeronáutica.", fuente: f20("https://feast-info.eurocontrol.int/", "EUROCONTROL FEAST") },
            { nivel: "oficial", pais: "Suiza", titulo: "Skyguide (proceso, para comparar)", texto: "Comunicación online, ejercicio individual y entrevista, inglés oral y un campo de selección de 1,5 días con ejercicios individuales y grupales.", fuente: f20("https://www.skyguide.ch/jobs/air-traffic-controllers/guardian-of-the-sky", "Skyguide: proceso de selección") },
            { nivel: "testimonio", tipo: "academia", pais: ES, titulo: "Cifras de aprobados", texto: "MasterD, Eticop, Nelso, Supera y Oposcontrolador declaran cifras de aprobados (97-98 %, «25 plazas», «20 aprobados») que no se pueden verificar. InfoPosiciones señala que la tasa real es modesta.", fuente: f20("https://www.infoposiciones.net/mejor-academia-para-oposiciones-de-controlador-aereo/", "InfoPosiciones: ranking de academias") },
          ]}
        />
      </Bloque>
      {/* Origen: web de preparación comercial (superaoposiciones.es, consultada 2026-10-21); el usuario no quiere que se nombre. */}
      <Bloque title="Detalles del formato que no constan en las bases">
        <Nota>Lo cuentan aspirantes y preparadores, no ENAIRE. Las bases mandan: si una convocatoria dice otra cosa, vale la convocatoria.</Nota>
        <Hechos
          items={[
            { nivel: "verificar", titulo: "Penalización en la Fase 1", texto: "Cada fallo resta 0,33 en conocimientos, inglés escrito y aptitudes; en blanco no resta. Lo repiten una aprobada de 2025 y un preparador. Las bases no lo dicen: confírmalo en las instrucciones del examen." },
            { nivel: "verificar", titulo: "Test de aptitudes", texto: "75 preguntas en 3 bloques de 25, con 20 minutos por bloque (60 en total). Miden razonamiento espacial y abstracto y resolución de problemas." },
            { nivel: "verificar", titulo: "Test de personalidad", texto: "Unas 200 afirmaciones que se puntúan del 1 (totalmente en desacuerdo) al 5 (totalmente de acuerdo). Resultado apto o no apto." },
            { nivel: "verificar", titulo: "Inglés oral (Fase 3)", texto: "Tres partes. Listening: un audio de unos 5 minutos que se oye dos veces, con preguntas orales. Reading: leer en voz alta un texto de 10 a 12 líneas y responder preguntas. Speaking: conversación libre sobre cultura general y temas variados. Practica los tiempos verbales: preguntan en pasado, futuro y condicional." },
            { nivel: "verificar", titulo: "Entrevista clínica", texto: "Va sobre tu vida social, cómo resuelves problemas y gestionas el estrés, y tu opinión sobre temas delicados (alcohol, drogas, mentiras, suicidio). Apto o no apto." },
            { nivel: "verificar", titulo: "Dinámica de grupo", texto: "El tribunal plantea un problema, a menudo de temática aérea o espacial, que el grupo debe resolver siguiendo sus instrucciones. Observan decisiones, comunicación, organización, empatía y resolución de problemas." },
            { nivel: "verificar", titulo: "Entrevista conductual y técnica", texto: "La conductual repasa tu trayectoria académica y laboral y las competencias del modelo con ejemplos muy concretos: la precisión de los ejemplos marca la diferencia. La técnica la hacen un psicólogo y un controlador en activo, y pregunta por ENAIRE y la profesión: infórmate bien de ambas." },
            { nivel: "verificar", titulo: "Horario de la Fase 3", texto: "Las pruebas clínicas y conductuales, por la mañana (de 9:00 a 14:00 aproximadamente) en Madrid." },
          ]}
        />
      </Bloque>
      <Bloque title="Errores que causan suspensos">
        <Hechos
          items={[
            { nivel: "testimonio", tipo: "academia", pais: ES, titulo: "Fuente: academias y preparadores, no aprobados", texto: "Creer que la experiencia en entrevistas o dinámicas basta. Protagonismo: hablar mucho, acaparar turnos, imponer decisiones o competir; pero tampoco vale estar callado. Improvisar o memorizar respuestas genéricas. No elegir buenos ejemplos que demuestren el perfil ATC. Un test de personalidad incoherente con la entrevista y la dinámica. Subestimar el test de personalidad.", fuente: F.superaoposiciones },
          ]}
        />
      </Bloque>
      <Bloque title="Consejos repetidos">
        <Tabla
          caption="Consejos repetidos por aspirantes y academias"
          head={["Consejo", "Fuentes"]}
          rows={[
            ["Constancia: no rendirse tras un suspenso; es habitual necesitar varios intentos.", "4: ControlPrep (2), MasterD (Judith), NATS"],
            ["Estabilidad emocional y gestión del estrés, en la prueba y en el oficio.", "4: ControlPrep, Última Hora, Avsaf, aprobada 2025"],
            ["Querer de verdad la profesión.", "4: ControlPrep, Última Hora, NATS, aprobada 2025"],
            ["Test de personalidad: no se prepara con trucos; sé coherente y honesto.", "2: ControlPrep, Enclavepsi"],
            ["Prepara ejemplos de presión, equipo y errores propios para la entrevista.", "3: Avsaf, Superaoposiciones, aprobada 2025"],
            ["Fase 3: colaborar, no competir ni dominar; participar sin acaparar.", "2: Superaoposiciones, aprobada 2025"],
            ["No competir contra otros, sino contra uno mismo.", "1: ControlPrep"],
            ["Simulacros de dinámica de grupo y de FEAST/PDEA; Eurocontrol desaconseja el software comercial y ofrece práctica oficial gratuita.", "Academias; Eurocontrol (oficial)"],
            ["FEAST: descansar bien y no obsesionarse con no terminar todo.", "1: EUROCONTROL (oficial)"],
            ["Empezar pronto; el inglés C1 oral y escrito se mantiene todo el proceso.", "Academias"],
          ]}
          source={F.superaoposiciones}
          verified={false}
        />
        <Nota>Ningún consejo supera 4 fuentes y casi todas, salvo el relato de la aprobada de 2025, son de ControlPrep o MasterD (sesgo comercial). Tómalos como orientación, no como hecho; solo lo de EUROCONTROL es oficial.</Nota>
      </Bloque>
      <Bloque title="Huecos">
        <Hechos
          items={[
            { nivel: "verificar", titulo: "Pendiente", texto: "Ya hay un relato de primera mano de las tres fases (convocatoria 2025), pero faltan más para contrastarlo, con criterios reales de la dinámica y suspensos concretos. Hay que leer las tres páginas «Mi camino a ENAIRE» de ControlPrep desde el navegador y buscar en Reddit y Forocoches." },
          ]}
        />
      </Bloque>
    </GuiaPage>
  )
}
