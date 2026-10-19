// Colores con significado. Clases estáticas para que Tailwind las detecte.
export type Tone = "default" | "muted" | "primary" | "success" | "warning" | "danger" | "guide"

export const TEXT: Record<Tone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  guide: "text-guide",
}

export const BG: Record<Tone, string> = {
  default: "bg-foreground",
  muted: "bg-muted-foreground",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  guide: "bg-guide",
}

export const STROKE: Record<Tone, string> = {
  default: "stroke-foreground",
  muted: "stroke-muted-foreground",
  primary: "stroke-primary",
  success: "stroke-success",
  warning: "stroke-warning",
  danger: "stroke-danger",
  guide: "stroke-guide",
}
