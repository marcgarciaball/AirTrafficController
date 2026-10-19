import { Checklist, ChecklistMark, CHECKLIST_ROW } from "@/components/ui-torre/checklist"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"

const FILES = [
  ["/mas/exportar/json", "JSON completo", "Todos tus datos en un solo archivo."],
  ["/mas/exportar/csv/sesiones", "CSV de sesiones", "Una fila por sesión de estudio."],
  ["/mas/exportar/csv/intentos", "CSV de intentos de test", "Una fila por intento de test o simulacro."],
] as const

export default function Page() {
  return (
    <section className="space-y-12">
      <PageHeader
        title="Exportar datos"
        description="Descarga una copia de tus datos. Solo incluye lo que es tuyo: perfil, progreso, sesiones, intentos de test y recordatorios (y, si existen, aptitudes e inglés)."
        back={{ href: "/mas", label: "Más" }}
      />
      <Section title="Descargas" flush>
        <Checklist>
          {FILES.map(([href, label, detail]) => (
            <li key={href}>
              {/* Enlace normal (no Link): es una descarga, no una navegación de la app. */}
              <a href={href} download className={`${CHECKLIST_ROW} ${ROW_HOVER}`}>
                <Download aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="min-w-0 flex-1 space-y-1">
                  <span className="block leading-snug font-bold text-primary">{label}</span>
                  <span className="block text-sm text-muted-foreground">{detail}</span>
                </span>
              </a>
            </li>
          ))}
        </Checklist>
      </Section>
    </section>
  )
}
