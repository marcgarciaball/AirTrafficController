import { Bloque, Consejo, Datos, GuiaPage, Nota, Tabla } from "@/components/guia/guia-ui"
import { CalculadoraSalario } from "@/components/guia/calculadora-salario"
import { CPT } from "@/lib/salarios"
import { U, dato, loadGuia, src } from "@/lib/guia"

const eur = (n: number) => n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const DEPENDENCIAS: Record<number, string> = {
  1: "ACC Madrid, ACC Barcelona",
  2: "sin datos",
  3: "ACC Canarias, ACC Palma, ACC Sevilla",
  4: "Torre Madrid, ACC Levante (Valencia)",
  5: "Torres Palma, Gran Canaria, Tenerife Sur, Barcelona, Málaga",
  6: "Torres Tenerife Norte, Bilbao, Girona, entre otras",
  7: "sin datos",
  8: "Torres pequeñas (Vitoria, Reus, Almería, Granada, Melilla, San Sebastián, Pamplona...)",
}

export default async function Page() {
  const g = await loadGuia()
  return (
    <GuiaPage
      label="Dinero"
      title="Cuánto se cobra"
      intro="Calculadora orientativa del sueldo bruto anual de un controlador de ENAIRE según destino y año de carrera. Es una estimación a partir del convenio, no una nómina."
    >
      <Bloque title="Calculadora">
        <CalculadoraSalario />
        <Nota>
          Las cifras son «Valores 2022» del Anexo I del convenio. No incluyen productividad (posible suma de miles de euros, ver abajo), nivel profesional, trienios, plus de transporte ni el importe adicional de turnos. Los salarios reales serán algo mayores. Torre Menorca no aparece porque su grupo está por confirmar.
        </Nota>
      </Bloque>
      <Bloque title="Cómo se calcula">
        <Datos
          items={[
            dato(g, U.convenio, "Fórmula", "Total = sueldo base a turnos (22.795,64 €) + CPT del grupo x porcentaje + plus de residencia. Residencia solo en Canarias, Baleares y Melilla (art. 133)."),
            dato(g, U.convenio, "Porcentaje del CPT por año (art. 132.4)", "60 % en los 3 primeros años con contrato indefinido, 80 % los 3 siguientes y 100 % desde el año 7."),
            dato(
              g,
              U.convenio,
              "Incoherencia de la escala 60/80/100",
              "Una academia dice que una sentencia del Supremo de finales de 2024 eliminó esta escala, y un controlador citado en prensa habla de cobrar el 70 % al entrar. Ninguna de las dos cosas está confirmada: la calculadora usa el texto del convenio.",
              false
            ),
            dato(g, U.convenio, "Productividad (art. 142.1)", "El convenio fija 24.353 € por controlador en 2023, sin aclarar si es tope o referencia. Una academia estima 12.000 a 16.000 € en dependencias importantes, cobrados con 2 meses de retraso. No está incluida en la calculadora.", false),
          ]}
        />
      </Bloque>
      <Bloque title="Grupos de dependencia y CPT">
        <Tabla
          caption="CPT del controlador por grupo"
          head={["Grupo", "CPT (€/año)", "Dependencias (nivel B)"]}
          rows={Object.entries(CPT).map(([k, v]) => [k, eur(v), DEPENDENCIAS[Number(k)]])}
          source={src(g, U.convenio)}
          verified={false}
        />
        <Nota>
          Las cifras del CPT son oficiales (Anexo I, Valores 2022). Pero el convenio leído no dice qué dependencia va en qué grupo: esa columna viene de una academia (Supera, 2025) y está pendiente de verificar. El grupo 2 no tiene dependencias conocidas.
        </Nota>
      </Bloque>
      <Bloque title="Otros rangos que circulan (contexto)">
        <Datos
          items={[
            dato(g, U.testimonio, "El Español, 2023", "Un controlador dice 35.000 a 80.000 € brutos de media. Es un testimonio.", false),
            dato(g, U.menorca, "Menorca.info, 2024", "Media cercana a 100.000 € brutos. Dato de prensa.", false),
          ]}
        />
        <Consejo>
          <p>Usa la calculadora como orden de magnitud: con la fórmula anterior, al entrar (60 % del CPT) salen unos 44.000 a 74.000 € brutos según destino, y a pleno (100 %) unos 59.000 a 109.000 €. Antes de decisiones importantes, contrasta con las bases y el convenio vigentes.</p>
        </Consejo>
      </Bloque>
    </GuiaPage>
  )
}
