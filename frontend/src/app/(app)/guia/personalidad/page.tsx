import { Bloque, Consejo, GuiaPage, Hechos, Leyenda } from "@/components/guia/guia-ui"
import { F, U, cita, loadGuia } from "@/lib/guia"

export default async function Page() {
  const g = await loadGuia()
  return (
    <GuiaPage
      label="Capítulo 13"
      title="Test de personalidad"
      intro="Se hace en la Fase 1. Casi toda la información sobre cómo funciona viene de testimonios."
    >
      <Leyenda />
      <Bloque title="Cómo funciona">
        <Hechos
          items={[
            { nivel: "oficial", titulo: "Dónde está", texto: "La Fase 1 incluye conocimientos, inglés C1, aptitudes y personalidad (unas 4,5 horas en total).", fuente: cita(g, U.bases) },
            { nivel: "testimonio", titulo: "Largo y con preguntas repetidas", texto: "Un controlador en activo cuenta que el test tiene preguntas repetidas para comprobar la coherencia. Otro, del Centro de Palma, dice que nunca había visto uno tan largo y que casi le tumba pese a sus años de experiencia.", fuente: F.controlprep },
            { nivel: "testimonio", titulo: "No se prepara", texto: "Según ese mismo relato, el test no se prepara, no perdona la experiencia previa y es el que más gente subestima. Es una web comercial de preparación y solo se leyó el resumen del buscador.", fuente: F.controlprep },
          ]}
        />
      </Bloque>
      <Bloque title="Coherencia">
        <Hechos
          items={[
            { nivel: "testimonio", titulo: "Entre test, entrevista y dinámica", texto: "Un preparador privado indica que se exige coherencia entre el test, la entrevista y la dinámica de grupo.", fuente: F.enclavepsi },
          ]}
        />
        <Consejo>
          <p>Si contestas de forma coherente con quien eres, no tendrás que acordarte de lo que dijiste. Después, en la entrevista de la Fase 3, tus ejemplos deberían encajar con ese perfil.</p>
        </Consejo>
      </Bloque>
      <Bloque title="Errores típicos">
        <Hechos
          items={[
            { nivel: "testimonio", titulo: "Subestimarlo", texto: "Creer que la experiencia operativa o de entrevistas basta.", fuente: F.controlprep },
            { nivel: "testimonio", titulo: "Incoherencia", texto: "Un test incoherente con la entrevista y con la dinámica.", fuente: F.enclavepsi },
            { nivel: "testimonio", titulo: "Respuestas memorizadas", texto: "Improvisar o memorizar respuestas genéricas en lugar de entender qué mide cada pregunta.", fuente: F.superaoposiciones },
            { nivel: "verificar", titulo: "Criterios de puntuación", texto: "No se halló ninguna fuente oficial sobre cómo se puntúa el test ni qué perfiles descarta." },
          ]}
        />
      </Bloque>
    </GuiaPage>
  )
}
