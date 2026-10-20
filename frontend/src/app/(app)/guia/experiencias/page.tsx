import { Bloque, GuiaPage, Hechos, Leyenda, Nota, Tabla } from "@/components/guia/guia-ui"
import { F, f20 } from "@/lib/guia"

const ES = "España"

export default function Page() {
  return (
    <GuiaPage
      label="Capítulo 15"
      title="Experiencias de aspirantes"
      intro="Lo que cuentan aspirantes, academias y prensa sobre el proceso. Salvo lo marcado como oficial, no son fuentes oficiales."
    >
      <Leyenda />
      <Nota>Aviso de sesgo: las academias y los preparadores privados venden cursos y su información tiene interés comercial. No se halló ningún hilo de Reddit, PPRuNe, Quora ni Forocoches, ni reseña legible de Glassdoor; solo 9 testimonios distintos, varios muy pobres. Los únicos relatos en primera persona están en una web comercial (ControlPrep), y solo se leyó el resumen del buscador.</Nota>
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
            ["Estabilidad emocional y gestión del estrés, en la prueba y en el oficio.", "3: ControlPrep, Última Hora, Avsaf"],
            ["Querer de verdad la profesión.", "3: ControlPrep, Última Hora, NATS"],
            ["Test de personalidad: no se prepara con trucos; sé coherente y honesto.", "2: ControlPrep, Enclavepsi"],
            ["Prepara ejemplos de presión, equipo y errores propios para la entrevista.", "2: Avsaf, Superaoposiciones"],
            ["Fase 3: colaborar, no competir ni dominar; participar sin acaparar.", "1: Superaoposiciones"],
            ["No competir contra otros, sino contra uno mismo.", "1: ControlPrep"],
            ["Simulacros de dinámica de grupo y de FEAST/PDEA; Eurocontrol desaconseja el software comercial y ofrece práctica oficial gratuita.", "Academias; Eurocontrol (oficial)"],
            ["FEAST: descansar bien y no obsesionarse con no terminar todo.", "1: EUROCONTROL (oficial)"],
            ["Empezar pronto; el inglés C1 oral y escrito se mantiene todo el proceso.", "Academias"],
          ]}
          source={F.superaoposiciones}
          verified={false}
        />
        <Nota>Ningún consejo supera 4 fuentes y casi todas son de ControlPrep o MasterD (sesgo comercial). Tómalos como orientación, no como hecho; solo lo de EUROCONTROL es oficial.</Nota>
      </Bloque>
      <Bloque title="Huecos">
        <Hechos
          items={[
            { nivel: "verificar", titulo: "Pendiente", texto: "Falta un relato de primera mano de la dinámica con criterios reales y de suspensos concretos. Hay que leer las tres páginas «Mi camino a ENAIRE» de ControlPrep desde el navegador y buscar en Reddit y Forocoches." },
          ]}
        />
      </Bloque>
    </GuiaPage>
  )
}
