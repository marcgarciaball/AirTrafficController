import { Bloque, GuiaPage, Hechos, Leyenda, Nota } from "@/components/guia/guia-ui"
import { F, U, loadGuia, src } from "@/lib/guia"

export default async function Page() {
  const g = await loadGuia()
  return (
    <GuiaPage
      label="Capítulo 14"
      title="Datos del proceso"
      intro="Las cifras que se oyen, con su veredicto. Cada una indica si es oficial, de un testimonio o si está pendiente de verificar."
    >
      <Leyenda />
      <Bloque title="Tasa de inscripción">
        <Hechos items={[{ nivel: "oficial", titulo: "15,57 €", texto: "Es la tasa de la convocatoria. La cifra de «unos 15 €» que se oye es correcta en esencia.", fuente: F.boe }]} />
      </Bloque>
      <Bloque title="Aspirantes por plaza">
        <Hechos
          items={[
            { nivel: "verificar", titulo: "Unos 31 por plaza (2024)", texto: "La convocatoria de 2024 (150 plazas, ampliada a 158) tuvo casi 4.700 admitidos a las pruebas, unos 31 por plaza. La cifra viene de prensa que cita el listado de ENAIRE; el listado no se leyó.", fuente: F.prensa4700 },
            { nivel: "verificar", titulo: "2025", texto: "Una academia habla de más de 3.500 aspirantes. No se halló cifra oficial.", fuente: F.masterdConv },
            { nivel: "testimonio", titulo: "«3.000 para 150 plazas»", texto: "Un controlador en activo habló de unos 3.000 candidatos para 65 plazas en otra convocatoria; probablemente es el origen del «3.000». El orden de magnitud es correcto, pero se queda corto.", fuente: F.masterdConv },
          ]}
        />
      </Bloque>
      <Bloque title="Los 17 meses">
        <Hechos
          items={[
            { nivel: "oficial", titulo: "Plazo máximo, no duración del curso", texto: "Son 17 meses como máximo desde la adjudicación de destino para reunir todos los requisitos de contratación (licencia, médico, AVSEC, SPSICO, inglés y castellano). No es lo que dura el curso (base 3.2).", fuente: src(g, U.bases) },
            { nivel: "testimonio", titulo: "Duración del curso", texto: "Un testimonio habla de unos 9 meses de curso presencial. Un blog de sueldos dice 2-3 años, y contradice lo oficial: no lo uses.", fuente: F.masterdConv },
          ]}
        />
      </Bloque>
      <Bloque title="Coste de la formación">
        <Hechos
          items={[
            { nivel: "oficial", titulo: "A cargo del candidato", texto: "El curso lo paga el candidato, no ENAIRE. Se imparte en centros acreditados por AESA, como SENASA en Madrid y SkyWay.", fuente: F.fin2018 },
            { nivel: "oficial", titulo: "Financiación hasta 70.000 €", texto: "ENAIRE publicó condiciones de financiación bancaria, y la FAQ 19 habla de una garantía de hasta 70.000 € (con certificado médico Clase 3).", fuente: F.fin2018 },
            { nivel: "verificar", titulo: "Precio del curso", texto: "No hay precio oficial publicado ni se halló por centro. Pídelo a los centros (para SENASA, infocontrol@senasa.es). La cifra de «unos 60.000 €» no tiene respaldo oficial." },
            { nivel: "testimonio", titulo: "Unos 65.000 €", texto: "Un testimonio da unos 65.000 € y unos 9 meses de curso presencial.", fuente: F.masterdConv },
            { nivel: "verificar", titulo: "Si se suspende", texto: "En 2021 ENAIRE cubría el curso si el aprobado suspendía la formación de unidad. Falta comprobar si sigue vigente en la convocatoria actual." },
          ]}
        />
        <Nota>Un blog de sueldos da 80.000-120.000 € y 2-3 años. Contradice lo oficial y no se usa en la guía.</Nota>
      </Bloque>
      <Bloque title="Cifras de testimonios y academias">
        <Hechos
          items={[
            { nivel: "testimonio", titulo: "Tasas de aprobados", texto: "Las academias declaran cifras como 97-98 %, «25 plazas» o «20 aprobados». No son verificables.", fuente: F.masterdConv },
            { nivel: "testimonio", titulo: "152 personas superaron el proceso en 2025", texto: "Una web de preparación afirma que 152 personas superaron el proceso completo y 149 fueron seleccionadas provisionalmente. Falta contrastarlo con la resolución de ENAIRE.", fuente: F.controlprep2 },
          ]}
        />
      </Bloque>
    </GuiaPage>
  )
}
