import { LinkRow } from "@/components/ui-torre/checklist"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"
import { Button } from "@/components/ui/button"
import { signOut } from "./actions"

export default function MasPage() {
  return (
    <div className="space-y-12">
      <PageHeader title="Más" />
      <Section title="Aprende" flush>
        <ul className="divide-y divide-line">
          <LinkRow href="/ruta" detail="Las fases del plan y lo que llevas hecho en cada una.">
            Ruta
          </LinkRow>
          <LinkRow href="/glosario" detail="Términos en español y en inglés, con su bloque y su fuente.">
            Glosario
          </LinkRow>
          <LinkRow href="/guia" detail="Requisitos, proceso, calendario, médico, idiomas y fuentes.">
            Guía del proceso
          </LinkRow>
          <LinkRow href="/guia/examen" detail="Cuánto pesa cada prueba, qué mínimo pide y cómo prepararla.">
            El examen por dentro
          </LinkRow>
        </ul>
      </Section>
      <Section title="Tu estudio" flush>
        <ul className="divide-y divide-line">
          <LinkRow href="/mas/sesiones" detail="Historial, entrada manual y totales de tiempo.">
            Sesiones
          </LinkRow>
          <LinkRow href="/mas/estadisticas" detail="Horas por semana, racha, materias y notas de tests.">
            Estadísticas
          </LinkRow>
          <LinkRow href="/mas/calendario" detail="Sesiones, plan, hitos de convocatoria y recordatorios.">
            Calendario
          </LinkRow>
        </ul>
      </Section>
      <Section title="Cuenta" flush>
        <ul className="divide-y divide-line">
          <LinkRow href="/mas/perfil" detail="Fecha objetivo, horas semanales y respuestas del cuestionario.">
            Perfil
          </LinkRow>
          <LinkRow href="/mas/exportar" detail="Descarga tus datos en JSON y CSV.">
            Exportar datos
          </LinkRow>
        </ul>
      </Section>
      <form action={signOut}>
        <Button type="submit" variant="outline" size="lg">
          Cerrar sesión
        </Button>
      </form>
    </div>
  )
}
