import { StatusChip } from "./status-chip"

// Etiquetas de contenido: siempre en minúsculas y con el mismo texto en toda la app.
// El usuario no quiere distinguir contenido propio y contrastado: estas etiquetas no se pintan.
export function OwnTip(props: { className?: string }) {
  void props
  return null
}

export function OwnContent(props: { reviewed?: boolean; className?: string }) {
  void props
  return null
}

export function PendingCheck({ className }: { className?: string }) {
  return <StatusChip tone="warning" className={className}>pendiente de verificar</StatusChip>
}
