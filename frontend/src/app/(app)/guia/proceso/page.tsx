import { Bloque, Datos, GuiaPage, Nota, Tabla } from "@/components/guia/guia-ui"
import { U, dato, facts, loadGuia, src } from "@/lib/guia"

export default async function Page() {
  const g = await loadGuia()
  const bases = src(g, U.bases)
  return (
    <GuiaPage
      label="Guía · 02"
      title="El proceso selectivo"
      intro="Tres fases eliminatorias. Las pruebas se hacen en Madrid; la Fase 1 también en Barcelona y Gran Canaria."
    >
      <Bloque title="Puntuaciones de un vistazo">
        <Tabla
          caption="Puntuaciones mínimas y máximas por prueba"
          head={["Prueba", "Mínimo", "Máximo"]}
          rows={[
            ["F1 A. Conocimientos (50 preguntas)", "25", "—"],
            ["F1 B. Inglés C1 (20 preguntas)", "10", "20"],
            ["F1 C. Aptitudes", "25", "50"],
            ["F1 D. Personalidad", "Apto", "—"],
            ["F2 FEAST + PDEA (suma)", "50", "100"],
            ["F3 A. Inglés oral C1", "25", "50"],
            ["F3 B. Evaluación conductual", "60", "120"],
            ["F3 C. Clínica de la personalidad", "Apto", "—"],
          ]}
          source={bases}
        />
        <p className="text-sm text-muted-foreground">
          El guion (—) significa que las bases no indican máximo. En la Fase 2 hay que superar además cada test por separado.
        </p>
      </Bloque>

      <Bloque title="Fase 1 · una sola jornada">
        <Datos
          items={[
            ...facts(g, ["f1_pruebas", "f1_duracion", "f1_penalizacion"]),
            dato(g, U.bases, "Duración de cada prueba por separado", null, false),
          ]}
        />
        <Nota>La penalización por fallo no es oficial: las bases no la mencionan. No cuentes con ninguna hasta que se confirme.</Nota>
      </Bloque>

      <Bloque title="Fase 2 · pruebas digitales">
        <Datos
          items={[
            ...facts(g, ["f2_pruebas", "f2_duracion"]),
            dato(
              g,
              U.portal,
              "Nota de corte para pasar a la Fase 3 (2025)",
              "La puntuación de la persona candidata número 596 del ranking de las Fases 1 y 2. Cambia en cada convocatoria."
            ),
          ]}
        />
      </Bloque>

      <Bloque title="Fase 3 · tres pruebas en la misma jornada">
        <Datos items={facts(g, ["f3_pruebas"])} />
      </Bloque>

      <Bloque title="Ranking final y desempates">
        <Datos
          items={[
            dato(g, U.bases, "Ranking final", "Suma de conocimientos, aptitudes, inglés escrito, pruebas digitales, inglés oral y evaluación conductual (base 9)."),
            dato(
              g,
              U.bases,
              "Desempates, por este orden",
              "1. Evaluación conductual. 2. Pruebas digitales. 3. Inglés oral. 4. Fase 1 (base 9)."
            ),
          ]}
        />
      </Bloque>
    </GuiaPage>
  )
}
