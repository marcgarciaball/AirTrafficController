import { Memo, MemoMark, MEMO_ROW } from "@/components/cockpit/memo"
import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"

const FILES = [
  ["/mas/exportar/json", "JSON completo", "Todos tus datos en un solo archivo."],
  ["/mas/exportar/csv/sesiones", "CSV de sesiones", "Una fila por sesión de estudio."],
  ["/mas/exportar/csv/intentos", "CSV de intentos de test", "Una fila por intento de test o simulacro."],
] as const

export default function Page() {
  return (
    <section className="space-y-6">
      <PageTitle code="MÁS · EXPORTAR" title="Exportar datos" back={{ href: "/mas", label: "Más" }} />
      <p className="max-w-[68ch] text-base leading-relaxed text-foreground">
        Descarga una copia de tus datos. Solo incluye lo que es tuyo: perfil, progreso, sesiones, intentos de test y recordatorios (y, si existen, aptitudes e inglés).
      </p>
      <Panel title="Descargas" flush>
        <Memo>
          {FILES.map(([href, label, detail]) => (
            <li key={href}>
              {/* Enlace normal (no Link): es una descarga, no una navegación de la app. */}
              <a href={href} download className={`${MEMO_ROW} hover:bg-surface`}>
                <MemoMark state="disponible" />
                <span className="min-w-0 flex-1 space-y-0.5">
                  <span className="block leading-snug text-cyan">{label}</span>
                  <span className="block text-sm text-muted-foreground">{detail}</span>
                </span>
              </a>
            </li>
          ))}
        </Memo>
      </Panel>
    </section>
  )
}
