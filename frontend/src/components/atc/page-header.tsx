import { SectionLabel } from "./section-label"

/** Cabecera de pantalla: etiqueta de sector en mono y título. */
export function PageHeader({ label, title }: { label: string; title: string }) {
  return (
    <header className="space-y-1.5">
      <SectionLabel>{label}</SectionLabel>
      <h1 className="text-2xl leading-tight font-semibold tracking-tight">{title}</h1>
    </header>
  )
}
