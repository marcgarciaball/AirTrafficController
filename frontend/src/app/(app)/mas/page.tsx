import { Memo, MemoItem } from "@/components/cockpit/memo"
import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
import { Button } from "@/components/ui/button"
import { signOut } from "./actions"

export default function MasPage() {
  return (
    <section className="space-y-6">
      <PageTitle code="MÁS" title="Más" />
      <Panel title="Aprende" flush>
        <Memo>
          <MemoItem state="disponible" href="/guia" detail="Requisitos, proceso, calendario y más.">
            Guía del proceso
          </MemoItem>
        </Memo>
      </Panel>
      <Panel title="Estudio" flush>
        <Memo>
          <MemoItem state="disponible" href="/mas/sesiones" detail="Historial, entrada manual y totales de tiempo.">
            Sesiones
          </MemoItem>
          <MemoItem state="disponible" href="/mas/estadisticas" detail="Horas por semana, racha, materias y notas de tests.">
            Estadísticas
          </MemoItem>
          <MemoItem state="disponible" href="/mas/calendario" detail="Sesiones, plan, hitos de convocatoria y recordatorios.">
            Calendario
          </MemoItem>
        </Memo>
      </Panel>
      <Panel title="Cuenta" flush>
        <Memo>
          <MemoItem state="disponible" href="/mas/perfil">
            Perfil y respuestas del cuestionario
          </MemoItem>
          <MemoItem state="disponible" href="/mas/exportar" detail="Descarga tus datos en JSON y CSV.">
            Exportar datos
          </MemoItem>
        </Memo>
      </Panel>
      <form action={signOut}>
        <Button type="submit" variant="outline">
          Cerrar sesión
        </Button>
      </form>
    </section>
  )
}
