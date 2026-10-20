import { Bloque, GuiaPage, Hechos, Leyenda, Nota, Tabla } from "@/components/guia/guia-ui"
import { F, f20 } from "@/lib/guia"

const ES = "España"

export default function Page() {
  return (
    <GuiaPage
      label="Capítulo 15"
      title="Experiencias de aspirantes"
      intro="Lo que cuentan aspirantes, academias y prensa sobre las fases 1 y 3. Ninguna de estas fuentes es oficial."
    >
      <Leyenda />
      <Nota>Aviso de sesgo: las academias y los preparadores privados venden cursos y su información tiene interés comercial. No se halló ningún hilo de Reddit, Forocoches ni blog de aprobados con detalle. Los únicos relatos en primera persona están en una web comercial (ControlPrep), y solo se leyó el resumen del buscador.</Nota>
      <Bloque title="Testimonios">
        <Hechos
          items={[
            { nivel: "testimonio", tipo: "aspirante", pais: ES, titulo: "Personalidad (Fase 1)", texto: "Un controlador del Centro de Palma cuenta que el test de personalidad casi le tumba pese a años de experiencia operativa. Nunca había visto uno tan largo. Afirma que «no se prepara» y que es el que más gente subestima. Solo resumen del buscador.", fuente: F.controlprep },
            { nivel: "testimonio", tipo: "aspirante", pais: ES, titulo: "Fase 3: seis intentos", texto: "Tras seis convocatorias, relata que las entrevistas pasaron de individuales a grupales y más largas, en tres partes. No se leyeron las causas de cada suspenso. Solo resumen del buscador.", fuente: F.controlprep2 },
            { nivel: "testimonio", tipo: "aspirante", pais: ES, titulo: "«Suspendí la primera vez. Aprobé la segunda.»", texto: "Solo se vio el título; no se leyó el contenido.", fuente: f20("https://controlprep.com/mi-camino-a-enaire.html", "ControlPrep: testimonio (solo título)") },
            { nivel: "testimonio", tipo: "aspirante", pais: ES, titulo: "YouTube de un controlador en activo", texto: "Dinámica de unas 20 personas (apocalipsis zombi), entrevistas individuales y test de personalidad con preguntas repetidas para comprobar la coherencia. Algunos pasaron la fase digital sin practicar. El daltonismo puede excluir en el médico. El agente no vio el vídeo.", fuente: f20("https://www.youtube.com/", "YouTube (vídeo citado en la sección 8.1 del plan de estudio; sin URL concreta)") },
            { nivel: "testimonio", tipo: "academia", pais: ES, titulo: "Superaoposiciones", texto: "Clínica: apto o no apto, enfoque de descarte, preguntas inesperadas. Conductual individual: trayectoria, presión, superiores y compañeros, fallos propios. Dinámica: formato variable por convocatoria (totalmente oral desde 2019, según la academia).", fuente: F.superaoposiciones },
            { nivel: "testimonio", tipo: "academia", pais: ES, titulo: "Enclavepsi", texto: "Coherencia exigida entre test, entrevista y dinámica; se observa el comportamiento verbal y no verbal.", fuente: F.enclavepsi },
            { nivel: "testimonio", tipo: "prensa", pais: ES, titulo: "Infobae y Defensa.com", texto: "Por la mañana, entrevistas individuales (clínica y conductual) y dinámica de grupo; inglés oral por la tarde. Defensa.com cita un corte a Fase 3 en el candidato 588; el dato oficial del proyecto es el 596.", fuente: F.infobae },
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
          head={["Consejo", "Origen"]}
          rows={[
            ["1. Fase 3: colaborar, no competir ni dominar; participar sin acaparar.", "Academia"],
            ["2. Preparar ejemplos concretos de trayectoria (presión, equipo, fallos) y autoconocimiento.", "Academia"],
            ["3. Coherencia entre test de personalidad, entrevista y dinámica; no memorizar respuestas.", "Academia"],
            ["4. No subestimar el test de personalidad de la Fase 1 (largo, no se «prepara»).", "Aspirante"],
            ["5. Simulacros de dinámica de grupo y de FEAST/PDEA. Eurocontrol desaconseja el software comercial: usa la práctica oficial gratuita.", "Academia"],
            ["6. Empezar pronto; el inglés C1 oral y escrito se mantiene durante todo el proceso.", "Academia"],
          ]}
          source={F.superaoposiciones}
          verified={false}
        />
        <Nota>Ninguno de estos consejos está contrastado por una fuente oficial.</Nota>
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
