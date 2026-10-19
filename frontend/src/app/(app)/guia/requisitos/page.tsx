import { Bloque, Datos, GuiaPage, Nota } from "@/components/guia/guia-ui"
import { U, dato, facts, loadGuia } from "@/lib/guia"

export default async function Page() {
  const g = await loadGuia()
  const presentarse = facts(g, ["req_nacionalidad", "req_edad", "req_titulacion", "req_psicofisica", "req_inhabilitacion", "req_idiomas", "req_licencia"])
  const contratacion = [
    ...facts(g, ["contr_plazo", "contr_licencia", "contr_idiomas", "contr_medico", "contr_otros", "contr_formacion"]),
    dato(
      g,
      U.portal,
      "Financiación de la formación inicial",
      "ENAIRE publicó el 14-07-2026 unas condiciones de financiación con préstamos bancarios (por ejemplo, BBVA de 3.000 € a 75.000 €). La FAQ 19 habla de una garantía de hasta 70.000 €."
    ),
  ]
  return (
    <GuiaPage
      label="Capítulo 1"
      title="Requisitos"
      intro="Hay dos grupos: los que necesitas para inscribirte y los que cumples después de aprobar, antes de firmar el contrato."
    >
      <Bloque title="Para presentarte">
        <Nota>Se cumplen a fecha de fin del plazo de inscripción (FAQ 13). No hace falta licencia, certificado médico ni títulos de idiomas.</Nota>
        <Datos items={presentarse} />
      </Bloque>
      <Bloque title="Para ser contratado">
        <Datos items={contratacion} />
      </Bloque>
    </GuiaPage>
  )
}
