import { Bloque, Consejo, Datos, GuiaPage, Hechos, Leyenda, Nota } from "@/components/guia/guia-ui"
import { F, U, dato, fact, loadGuia, src } from "@/lib/guia"

export default async function Page() {
  const g = await loadGuia()
  const contr = fact(g, "contr_medico")
  return (
    <GuiaPage
      label="Capítulo 5"
      title="Médico Clase 3"
      intro="No lo necesitas para inscribirte, pero sí para la licencia y el contrato. Conviene hacerlo pronto."
    >
      <Leyenda />
      <Bloque title="Qué es">
        <Hechos
          items={[
            { nivel: "oficial", titulo: "Certificado exigido", texto: "Certificado médico aeronáutico válido, de Clase 3, para la licencia de controlador (ATCO.B.001 y ATCO.MED.A.030 del Reglamento UE 2015/340). Lo supervisa AESA.", fuente: F.certDoc },
            { nivel: "oficial", titulo: "Quién lo hace", texto: "El examen inicial, solo en un centro aeromédico (AeMC) certificado. La renovación o revalidación, en un AeMC o con un médico examinador (AME) autorizado. AESA publica la lista; los marcados con (*) pueden hacer la Clase 3 de renovación y revalidación.", fuente: F.aesaAme },
            { nivel: "verificar", titulo: "Norma española", texto: "En España se cita además la Orden FOM/2418/2007 (requisitos médicos Clase 3), anterior al reglamento UE. Falta comprobar si sigue vigente." },
            { nivel: "oficial", titulo: "No confundir", texto: "Existe una Clase 3 AFIS distinta; no es la del controlador." },
          ]}
        />
      </Bloque>
      <Bloque title="Lo esencial">
        <Datos
          items={[
            dato(g, U.reg, "Certificado necesario", "Clase 3, obligatorio para la licencia de alumno y la de controlador. No hace falta en el simulador (ATCO.MED.A.030)."),
            ...(contr ? [contr] : []),
            dato(
              g,
              U.aemc,
              "Centros para el reconocimiento inicial",
              "Solo los centros AeMC marcados con (*) en la lista de AESA, con sedes en Andalucía, Canarias, Cataluña, Madrid, Comunitat Valenciana y País Vasco. La lista cambia (última modificación 13-10-2026): consúltala en la fuente."
            ),
            dato(g, U.reg, "Renovaciones", "Las hace un AeMC o un médico examinador (AME). El inicial, solo un AeMC (ATCO.MED.A.040)."),
          ]}
        />
      </Bloque>
      <Bloque title="Validez">
        <Datos
          items={[
            dato(g, U.validez, "Menores de 40 años", "24 meses."),
            dato(g, U.validez, "Desde los 40 años", "12 meses. Los expedidos antes de los 40 caducan al cumplir 41 (ATCO.MED.A.045)."),
          ]}
        />
        <Hechos
          items={[
            { nivel: "verificar", titulo: "ECG", texto: "En el examen inicial y, desde los 30 años, en cada examen; antes de los 30, cada 48 meses. Fuente secundaria (UK CAA, que reproduce el texto UE).", fuente: F.ukcaa },
            { nivel: "verificar", titulo: "Audiometría", texto: "Cada 48 meses por debajo de los 40 años; cada 24 meses desde los 40.", fuente: F.ukcaa },
            { nivel: "verificar", titulo: "Examen oftalmológico completo", texto: "Cada 4 años (refracción dentro de ±3 D) hasta cada 2 años (más allá de -6 D).", fuente: F.ukcaa },
            { nivel: "verificar", titulo: "Revalidar o renovar", texto: "Revalidar es hacerlo antes de que caduque; renovar, después de caducado, y puede exigir un examen más completo.", fuente: F.ukcaa },
          ]}
        />
      </Bloque>
      <Bloque title="Pruebas del examen inicial">
        <Hechos
          items={[
            { nivel: "oficial", titulo: "Qué incluye", texto: "Exploración física completa, cuestionario de antecedentes (lleva informes de tu médico o especialistas), visión detallada con color, ECG en reposo, espirometría, audiograma, análisis de orina y analítica con lípidos, y evaluación psicológica y de salud mental. El AeMC puede ampliarlas con otras pruebas o especialistas. Dura hasta unas 4 horas. Fuente parcial: UK CAA; las secciones ATCO.MED.B.055 (psiquiatría) y B.060 (psicología) existen en el reglamento UE.", fuente: F.ukcaa },
          ]}
        />
      </Bloque>
      <Bloque title="Causas de no apto">
        <Hechos
          items={[
            { nivel: "oficial", titulo: "Visión (ATCO.MED.B.070)", texto: "Agudeza de lejos de al menos 0,7 en cada ojo y 1,0 con los dos, con o sin corrección. De cerca, N5 a 30-50 cm y N14 a 60-100 cm. Campos visuales y visión binocular normales. Con refracción entre +5,0 y -6,0 D se puede ser apto con corrección óptima y sin patología (seguimiento cada 4 años más allá de ±3 D). Más de -6 D, astigmatismo o anisometropía por encima de 3 D: posible aptitud con seguimiento cada 2 años. Visión con un solo ojo: no apto en el inicial.", fuente: F.vision },
            { nivel: "oficial", titulo: "Lentillas y cirugía ocular", texto: "Lentillas monofocales, sin tinte y sin ortoqueratología ni monovisión; con gafas de repuesto. Tras cirugía refractiva puede ser apto con refracción estable, sin complicaciones y con evaluación oftalmológica; otra cirugía ocular, no apto hasta la recuperación completa.", fuente: F.vision },
            { nivel: "verificar", titulo: "Visión de color (ATCO.MED.B.075)", texto: "Se exige visión del color normal (tricromacia). Las láminas pseudoisocromáticas solas no bastan: se usa anomaloscopia (y en Reino Unido, el test CAD). El daltonismo es la causa clásica de no apto. Falta confirmar el texto UE exacto y la política de AESA.", fuente: F.ukcaa },
            { nivel: "verificar", titulo: "Audición", texto: "No se admite una pérdida de más de 35 dB en 500, 1000 o 2000 Hz, ni de más de 50 dB en 3000 Hz, en cada oído por separado. Necesitar audífonos es no apto en el inicial. Fuente: una academia que cita la Orden FOM/2418/2007.", fuente: F.masterd },
            { nivel: "verificar", titulo: "Corazón y tensión", texto: "No aptos, entre otros: valvulopatía significativa o sintomática, cardiopatía isquémica sintomática, tensión superior a 160/95 con o sin tratamiento, bloqueo AV completo, desfibrilador implantado. Empezar un tratamiento para la tensión es no apto temporal hasta descartar efectos adversos. Resumen de fuente secundaria; no se pudo leer el texto UE.", fuente: F.masterd },
            { nivel: "verificar", titulo: "Diabetes", texto: "Con insulina, no apto. Con otra medicación, se remite a la autoridad y es posible la aptitud con buen control de la glucosa.", fuente: F.masterd },
            { nivel: "verificar", titulo: "Neurología", texto: "Epilepsia y pérdidas de consciencia recurrentes de causa desconocida: no apto. Otros casos (un único episodio, lesión cerebral) se evalúan de forma individual.", fuente: F.masterd },
            { nivel: "verificar", titulo: "Salud mental, alcohol y drogas", texto: "Alcohol u otras sustancias: no apto hasta la abstinencia y el tratamiento. Autolesión, esquizofrenia o trastorno delirante: no apto. Trastornos del ánimo, neuróticos o de personalidad: valoración psiquiátrica y posible aptitud tras remitir a AESA. La medicación psicotrópica no se detalla en las fuentes: consúltalo con AESA o un AME.", fuente: F.masterd },
            { nivel: "verificar", titulo: "Medicación y peso", texto: "Cualquier efecto secundario de un medicamento es excluyente; los anticoagulantes requieren evaluación. No hay un criterio numérico de IMC en las fuentes leídas: se evalúa de forma clínica." },
            { nivel: "oficial", titulo: "Con limitaciones", texto: "ATCO.MED.B.001 permite un certificado con limitaciones (por ejemplo, correcciones ópticas) si no compromete la seguridad.", fuente: F.certDoc },
          ]}
        />
        <Nota>Los umbrales de corazón, diabetes, neurología, salud mental y medicación no se pudieron leer en el texto oficial. No los tomes como definitivos: confírmalos con AESA o con un AeMC.</Nota>
      </Bloque>
      <Bloque title="Precio orientativo">
        <Hechos
          items={[
            { nivel: "verificar", titulo: "Sin tarifa oficial", texto: "No hay precio oficial publicado. Datos informales: desde 300 € en el CIMA de Torrejón (foro, antiguo) y entre 350 y 500 € según el centro (Univ. de Salamanca, 2022). Pregunta el precio al centro antes de reservar.", fuente: F.usal },
            { nivel: "verificar", titulo: "Referencia", texto: "Para pilotos de Clase 1 el inicial ronda 472-686 € y las renovaciones 283-472 €. La Clase 3 inicial suele ser algo menor, sin confirmar." },
          ]}
        />
      </Bloque>
      <Bloque title="Cómo pedir cita en un AeMC">
        <Hechos
          items={[
            { nivel: "oficial", titulo: "Elige un centro", texto: "El inicial solo se hace en un AeMC. Elige uno de la lista de AESA y contáctalo para pedir cita; la lista cambia, consúltala en la fuente.", fuente: src(g, U.aemc) },
            { nivel: "oficial", titulo: "Pre-solicitud", texto: "La pre-solicitud médica se hace en la sede de AESA (SIGMA). Las dudas médicas, a ams.aesa@seguridadaerea.es.", fuente: src(g, U.sigma) },
            { nivel: "verificar", titulo: "Consulta previa", texto: "Es posible consultar con un AeMC o AME de la lista antes del examen oficial; las dudas se pueden dirigir a AESA. No hay un procedimiento de cita publicado en las fuentes: pídelo al centro.", fuente: F.aesaAme },
          ]}
        />
      </Bloque>
      <Bloque title="Qué conviene hacer antes">
        <Consejo>
          <p>Saca el Clase 3 antes de invertir meses de estudio. Si no hay aptitud, el resto no sirve. Las bases no lo exigen para presentarte, pero sí para la licencia y el contrato.</p>
          <p>Antes del examen oficial, revisa la graduación (dioptrías y astigmatismo), la agudeza con corrección, la visión del color con anomaloscopio o CAD (el Ishihara solo orienta), una audiometría básica, la tensión, el ECG y una analítica. Reúne los informes de tu historial: diagnósticos, cirugías y medicación. Declara todo: ocultar antecedentes puede invalidar el certificado (consecuencias legales sin verificar).</p>
        </Consejo>
        <Hechos
          items={[
            { nivel: "testimonio", titulo: "Foro", texto: "Un aspirante recomienda pasar el Clase 3 inicial en un centro oficial (CIMA) antes de presentarse y quedarse tranquilo.", fuente: F.foroCima },
            { nivel: "testimonio", titulo: "Foro", texto: "Otro cuenta que ENAIRE hace un reconocimiento exhaustivo al ganar plaza y que ahí sale el apto o no apto.", fuente: F.foroClase3 },
            { nivel: "testimonio", titulo: "Foro", texto: "Un usuario dice que pasó el inicial con +5 dioptrías (importa la agudeza con corrección); otro, que no hay un límite fijo de dioptrías.", fuente: F.foroClase3 },
          ]}
        />
      </Bloque>
      <Bloque title="Pre-solicitud y consultas">
        <Datos
          items={[
            dato(g, U.sigma, "Pre-solicitud médica", "Se hace en la sede de AESA (SIGMA)."),
            dato(g, U.aesa, "Consultas médicas", "ams.aesa@seguridadaerea.es (departamento distinto del Servicio de Licencias ATC)."),
          ]}
        />
      </Bloque>
    </GuiaPage>
  )
}
