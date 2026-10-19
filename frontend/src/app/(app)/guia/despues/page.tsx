import { Bloque, Datos, GuiaPage } from "@/components/guia/guia-ui"
import { U, dato, fact, loadGuia } from "@/lib/guia"

export default async function Page() {
  const g = await loadGuia()
  const plazo = fact(g, "contr_plazo")
  const pasos = [
    dato(
      g,
      U.reg,
      "1. Formación inicial",
      "Básica y de habilitación, en una escuela certificada por AESA y pagada por ti. ENAIRE no la imparte. Para aprobar hace falta al menos un 75 % en los exámenes (ATCO.D.010, D.025 y D.035)."
    ),
    dato(
      g,
      U.reg,
      "2. Licencia de alumno (SATCO)",
      "La expide AESA. Pide 18 años, formación inicial completada en los 12 meses anteriores, médico válido y competencia lingüística (ATCO.B.001 y B.030)."
    ),
    dato(g, U.reg, "3. Requisitos de contratación", "Reúne el resto de requisitos de contratación en un máximo de 17 meses desde la adjudicación de destino."),
    dato(
      g,
      U.aesa,
      "4. Formación en unidad",
      "En ENAIRE: transición, pre-OJT si la unidad es compleja y OJT con instructor (ATCO.D.005 y D.060)."
    ),
    dato(
      g,
      U.reg,
      "5. Licencia de controlador (ATCO)",
      "La expide AESA, en formato electrónico. Pide licencia de alumno, curso de anotación de unidad superado, médico válido y competencia lingüística (ATCO.B.005)."
    ),
  ]
  return (
    <GuiaPage label="Capítulo 4" title="Después de aprobar" intro="Aprobar el proceso de ENAIRE es el principio. Estos son los cinco pasos hasta ejercer.">
      <Bloque title="Los cinco pasos">
        <Datos items={pasos} />
      </Bloque>
      <Bloque title="Plazo de 17 meses">{plazo ? <Datos items={[plazo]} /> : null}</Bloque>
      <Bloque title="Habilitaciones y trámite">
        <Datos
          items={[
            dato(g, U.aesa, "Habilitaciones", "ADC (con anotación SUR), APP, APS (con anotaciones PAR y SRA), ACP y ACS (con anotaciones TCL y OCN)."),
            dato(g, U.aesa, "Trámite de la licencia SATCO/ATCO", "Formularios F01 (único) y F02 (anexo), en registro presencial o en la sede electrónica de AESA, con pago de tasa."),
            dato(g, U.escuelas, "Escuelas de formación inicial", "Lista de AESA (agosto de 2026). Consulta la lista oficial porque cambia."),
            dato(g, U.reg, "Cambio futuro", "Desde el 1-1-2029 la formación pasa a basarse en competencias (CBTA). Los cursos iniciados antes valen si terminan antes del 30-6-2029."),
          ]}
        />
      </Bloque>
    </GuiaPage>
  )
}
