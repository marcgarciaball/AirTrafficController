import { Bloque, Datos, GuiaPage, Nota, Tabla } from "@/components/guia/guia-ui"
import { U, dato, fact, loadGuia, src } from "@/lib/guia"

export default async function Page() {
  const g = await loadGuia()
  const contr = fact(g, "contr_idiomas")
  return (
    <GuiaPage
      label="Capítulo 6"
      title="Idiomas"
      intro="Son tres objetivos distintos y ninguno sustituye a otro. No necesitas ningún título para presentarte."
    >
      <Bloque title="1. Nivel C1 que evalúa ENAIRE">
        <Datos
          items={[
            dato(
              g,
              U.bases,
              "Dónde se evalúa",
              "Fase 1: test escrito de 20 preguntas de nivel C1 (mínimo 10 de 20). Fase 3: entrevista oral de nivel C1 (mínimo 25 de 50)."
            ),
            dato(g, U.bases, "Titulación", "No hace falta ningún título: \"No es necesario acreditar con titulaciones el conocimiento de los idiomas\" (FAQ 15)."),
            dato(g, U.bases, "Formato exacto del test de ENAIRE", null, false),
          ]}
        />
        <Nota>El certificado C1 Advanced de Cambridge no se exige. Sus materiales sirven solo como práctica para llegar al nivel C1.</Nota>
      </Bloque>

      <Bloque title="2. Anotaciones OACI (licencia y contratación)">
        <Datos
          items={[
            ...(contr ? [contr] : []),
            dato(g, U.reg, "Inglés", "Nivel mínimo 4 OACI. El proveedor puede exigir nivel 5 con aprobación de la autoridad (ATCO.B.030)."),
            dato(g, U.rd1516, "Castellano", "Obligatorio en España: no pueden ejercer quienes no tengan anotación válida en castellano (RD 1516/2009, art. 3)."),
          ]}
        />
        <Tabla
          caption="Validez de la anotación de idioma"
          head={["Nivel OACI", "Validez"]}
          rows={[
            ["Nivel 4 (Operacional)", "3 años"],
            ["Nivel 5 (Avanzado)", "6 años"],
            ["Nivel 6 (Experto)", "9 años en inglés; ilimitada en otros idiomas"],
          ]}
          source={src(g, U.reg)}
        />
      </Bloque>

      <Bloque title="3. Centros evaluadores (CECL)">
        <Datos
          items={[
            dato(g, U.cecl, "Lista oficial de AESA", "Actualizada el 12-06-2026. Se evalúa en un centro autorizado por AESA."),
            dato(g, U.cecl, "¿Vale cada centro para controladores o solo para pilotos?", null, false),
          ]}
        />
      </Bloque>
    </GuiaPage>
  )
}
