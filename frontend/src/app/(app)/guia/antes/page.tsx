import Link from "next/link"
import { Bloque, Consejo, Datos, GuiaPage, Nota } from "@/components/guia/guia-ui"
import { U, dato, loadGuia } from "@/lib/guia"

export default async function Page() {
  const g = await loadGuia()
  return (
    <GuiaPage
      label="Antes de empezar"
      title="Antes de empezar"
      intro="Qué es el trabajo, cómo se consigue y cuánto cuesta llegar. Lo marcado como pendiente de verificar no es un hecho: es un dato de prensa, testimonio o estimación que falta confirmar en una fuente oficial."
    >
      <Bloque title="El trabajo y el día a día">
        <Datos
          items={[
            dato(g, U.aesa, "Dónde se trabaja", "ENAIRE (pública) o proveedores privados, desde que el control aéreo se liberalizó en 2010. Hay centros de control de ruta (ACC), aproximación y torres. Cada habilitación (ADC torre, APP aproximación, ACP/ACS área) corresponde a un tipo de control."),
            dato(g, U.convenio, "Turnos", "Ciclos 6-4, 5-3 o 4-4 (días de trabajo y de descanso). En los grupos 1 a 5, máximo 5 días seguidos de trabajo y mínimo 3 de descanso (art. 33)."),
            dato(g, U.convenio, "Jornada", "A turnos: máximo 1.595 h/año (más hasta 20 h de formación), hasta 80 h extra/año y máximo 170 h/mes de actividad aeronáutica. Jornada ordinaria: 1.711 h/año, 37,5 h/semana (art. 29)."),
            dato(g, U.convenio, "Descansos", "Mínimo 12 h entre servicios (10 h sin actividad aeronáutica) y actividad continua máxima de 10 h (arts. 33 y 35)."),
            dato(g, U.convenio, "Vacaciones", "A turnos: 45 días naturales, por quincenas y una entre junio y septiembre si es posible. Jornada ordinaria: 22 días laborables. Un día más desde 20 años de antigüedad y otro cada 5 años (arts. 54-55)."),
          ]}
        />
      </Bloque>
      <Bloque title="Cómo se consigue: de la inscripción al primer sueldo">
        <Datos
          items={[
            dato(g, U.nota2025, "1. Convocatoria e inscripción", "ENAIRE convoca una vez al año, normalmente entre noviembre y diciembre. La de 2025 fue de 149 plazas (BOE 20-11-2025). La inscripción se hace en el portal de empleo. Las fechas exactas conviene verificarlas en el BOE.", false),
            dato(g, U.bases, "2. Las tres fases", "Pruebas de selección en varias fases durante varios meses (ver capítulo «El proceso»)."),
            dato(g, U.aemc, "3. Médico Clase 3", "Certificado médico en un centro AeMC acreditado (ver capítulo «Médico Clase 3»)."),
            dato(g, U.convenio, "4. Elección de destino", "Se eligen 3 destinos por orden de nota y se reciben las plazas sobrantes tras reingresos y concursos (art. 91.3). El orden por nota y el calendario (plazas comunicadas entre mediados de octubre y noviembre) proceden de testimonios y deben verificarse en las bases.", false),
            dato(g, U.escuelas, "5. Curso de formación inicial", "En una escuela certificada por AESA, pagado por ti. Un testimonio cita unos 9 meses (pendiente de verificar; ver apartado siguiente).", false),
            dato(g, U.reg, "6. Licencia de alumno y contrato", "Según un testimonio, con la licencia de alumno se firma el contrato y empieza el primer sueldo. Pendiente de verificar.", false),
            dato(g, U.convenio, "7. Formación de unidad y anotación", "Unos 6 meses en la unidad hasta la anotación de unidad (estimación). Después, licencia ATCO (ver capítulo «Después de aprobar»).", false),
            dato(g, U.faq, "Cronograma aproximado", "ENAIRE indica que la incorporación requiere entre 2 y 3 años incluida la formación (dato de un resumen de buscador, a verificar en su página). Un testimonio cuenta 1,5 años entre las pruebas y la firma del contrato.", false),
          ]}
        />
      </Bloque>
      <Bloque title="El curso de formación inicial">
        <Datos
          items={[
            dato(g, U.escuelas, "Centros", "Escuelas certificadas por AESA, no solo SENASA. Consulta la lista oficial, que cambia. Un testimonio cita 3 centros en Madrid y 1 en Jerez (FTEJerez), con SENASA como principal: pendiente de verificar.", false),
            dato(g, U.reg, "Duración", "Unos 9 meses presenciales según un testimonio. El plazo máximo para reunir los requisitos de contratación es de 17 meses desde la adjudicación de destino (convocatoria 2021; verificar para 2025-26).", false),
            dato(g, U.testimonio, "Coste", "Unos 65.000 € según un testimonio. Algún blog da 80.000 a 120.000 € pero no es fiable. Sin cifra oficial: pendiente de verificar.", false),
            dato(g, U.faq, "Durante el curso no se cobra", "La formación inicial la paga el candidato y no hay sueldo mientras dura."),
            dato(g, U.convenio, "Cuándo empiezas a cobrar", "Según un testimonio, al firmar el contrato. El convenio prevé para el alumno controlador el 60 % del CPT tras la primera anotación de unidad (art. 132.4.1). El momento exacto del alta y si la formación en unidad se paga están pendientes de verificar.", false),
          ]}
        />
      </Bloque>
      <Bloque title="El préstamo">
        <Datos
          items={[
            dato(g, U.fin2018, "Cobertura", "ENAIRE contrata un servicio de apoyo: la entidad adjudicataria emite un certificado de cobertura de hasta 70.000 € (previo certificado médico clase III) y el candidato pide el préstamo al banco que quiera, sin otras garantías. Confirmado para 2018 y 2020."),
            dato(g, U.blog2020, "Si suspendes o abandonas", "Si no se supera el curso sin mala fe, la entidad asume el préstamo. Si se renuncia o hay expulsión, hay que devolverlo. Confirmado para 2018-2020; en 2026 está pendiente de verificar.", false),
            dato(g, U.portal, "Condiciones 2026", "El plan recoge un documento de financiación de 14-07-2026 (BBVA, 3.000 a 75.000 €, garantía de 70.000 €), pero no se ha podido abrir para contrastarlo. Tampoco está confirmado si hay otros bancos ni las cuotas si suspendes por causa propia.", false),
          ]}
        />
        <Nota>No confirmado: coste real del curso, condiciones exactas del préstamo en 2026 y cuotas si no se supera el curso por causa propia. Lee el documento oficial antes de comprometerte.</Nota>
      </Bloque>
      <Bloque title="Cuánto ahorrar para vivir sin sueldo">
        <Datos
          items={[
            dato(g, U.faq, "Gastos de vida", "No hay fuente oficial sobre cuánto cuesta vivir durante el curso. Hay que prever manutención y vivienda (Madrid o Jerez) durante unos 9 a 17 meses sin ingresos, más las cuotas del préstamo si no se supera el curso por causa propia.", false),
          ]}
        />
        <Consejo>
          <p>Calcula tu propia cifra: (alquiler + comida + transporte + otros gastos al mes) x 17 meses, y suma un colchón para imprevistos. Si el préstamo cubre el curso, ese dinero es solo para vivir. Apunta tus gastos reales un par de meses para no estimar a ojo.</p>
        </Consejo>
      </Bloque>
      <Bloque title="La carrera">
        <Datos
          items={[
            dato(g, U.convenio, "Reserva activa", "Desde los 52 años si se pierde la aptitud psicofísica, o a petición a los 57. Se cobra el 75 % del sueldo medio de los últimos 12 meses (sin CPAF), hasta los 60 años (art. 166). El art. 163.2 habla de hasta los 65: incoherencia pendiente de verificar. Después, RAE hasta la jubilación.", false),
            dato(g, U.convenio, "Jubilación", "Según la normativa general (arts. 175-176). La edad concreta no está en el texto leído: pendiente de verificar.", false),
            dato(g, U.convenio, "Movilidad", "Traslados voluntarios por concurso de méritos (art. 88 y siguientes). Los nuevos ingresos no pueden concursar hasta 4 años de antigüedad (art. 91.4) y no se trabaja en otro destino hasta obtener la habilitación local (art. 101.4). Permuta con 2 años de continuidad y más de 5 años a la jubilación."),
            dato(g, U.convenio, "Excedencia y licencias", "Excedencia voluntaria con 1 año de antigüedad, de 4 meses a 10 años (art. 23). Licencia sin sueldo de 7 días a 5,5 meses con 1 año (art. 57)."),
          ]}
        />
        <p className="text-sm text-muted-foreground">
          Cifras de sueldo en <Link href="/guia/salario" className="text-primary underline">Cuánto se cobra</Link>.
        </p>
      </Bloque>
    </GuiaPage>
  )
}
