import { Bloque, Datos, GuiaPage } from "@/components/guia/guia-ui"
import { U, dato, fact, loadGuia } from "@/lib/guia"

export default async function Page() {
  const g = await loadGuia()
  const contr = fact(g, "contr_medico")
  return (
    <GuiaPage
      label="Guía · 05"
      title="Médico Clase 3"
      intro="No lo necesitas para inscribirte, pero sí para la licencia y el contrato. Conviene hacerlo pronto."
    >
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
