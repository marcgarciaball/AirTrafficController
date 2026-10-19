import { Bloque, Datos, GuiaPage, Nota, Tabla } from "@/components/guia/guia-ui"
import { U, dato, loadGuia, src } from "@/lib/guia"

export default async function Page() {
  const g = await loadGuia()
  const P = U.feastPractica
  return (
    <GuiaPage
      label="Guía · 07"
      title="FEAST y PDEA"
      intro="La Fase 2 son dos pruebas por ordenador: FEAST (de Eurocontrol) y PDEA (propia de ENAIRE)."
    >
      <Bloque title="Las tres partes de FEAST">
        <Tabla
          caption="Partes de FEAST"
          head={["Parte", "Qué mide", "Duración"]}
          rows={[
            ["FEAST I", "Pruebas cognitivas (decisión, planificación, memoria, razonamiento, atención, multitarea, orientación espacial) y test de inglés", "2,5 a 4 h"],
            ["FEAST II", "Pruebas de muestra de trabajo: RADAR y posiblemente MULTI-PASS, pensadas para principiantes", "1,5 a 2 h"],
            ["FEAST III", "Cuestionario de personalidad", "35 a 45 min"],
          ]}
          source={src(g, U.feast)}
        />
        <Datos
          items={[
            dato(g, U.feast, "Cómo es", "Todo por ordenador y supervisado. Cada organización fija su nota de corte y no se solicita a Eurocontrol, sino al proveedor (ENAIRE)."),
            dato(g, U.bases, "Qué fases usa ENAIRE", "Las bases solo dicen \"FEAST\".", false),
          ]}
        />
      </Bloque>

      <Bloque title="PDEA">
        <Datos
          items={[
            dato(g, U.bases, "Prueba Digital en Entorno ATC", "Es una prueba propia de ENAIRE. Va junto a FEAST en la Fase 2."),
            dato(g, U.bases, "Contenido de la PDEA", null, false),
          ]}
        />
      </Bloque>

      <Bloque title="Plataforma oficial de práctica (gratuita)">
        <Datos
          items={[
            dato(g, P, "Enlace", "feast-training.eurocontrol.int. Eurocontrol avisa de que no es idéntica a la prueba real."),
            dato(g, P, "Cobertura", "Casi todo FEAST I, salvo una prueba que necesita hardware adicional. FEAST II no está."),
            dato(g, P, "Cuánto practicar", "Haz cada prueba, revisa el resultado y repítela una o dos veces. Máximo orientativo de 8 horas en total: entrenar más puede no aportar nada."),
            dato(g, P, "Si fallas mucho", "No se espera un resultado perfecto. Muchos errores suelen indicar que no entendiste la tarea: vuelve a leer las instrucciones."),
            dato(g, P, "Cuenta", "Verifícala en 7 días (si no, se borra). Caduca a los 6 meses y hay que crear otra."),
            dato(g, P, "Privacidad", "Los resultados no se comparten con nadie, tampoco con ENAIRE."),
            dato(g, P, "Requisitos técnicos", "Zoom del navegador al 100 %. Soporte: feast-training@eurocontrol.int (solo para el código de verificación)."),
          ]}
        />
        <Nota>
          Eurocontrol no autoriza el software comercial y desaconseja otros programas de preparación. Está prohibido copiar material de la plataforma, también capturas: Torre solo la enlaza.
        </Nota>
      </Bloque>
    </GuiaPage>
  )
}
