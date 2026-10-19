// Colores con significado (convención ECAM). Clases estáticas para que Tailwind las detecte.
export type Tone = "white" | "dim" | "green" | "cyan" | "magenta" | "amber" | "red"

export const TEXT: Record<Tone, string> = {
  white: "text-foreground",
  dim: "text-muted-foreground",
  green: "text-green",
  cyan: "text-cyan",
  magenta: "text-magenta",
  amber: "text-amber",
  red: "text-red",
}

export const BG: Record<Tone, string> = {
  white: "bg-foreground",
  dim: "bg-muted-foreground",
  green: "bg-green",
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  amber: "bg-amber",
  red: "bg-red",
}

export const STROKE: Record<Tone, string> = {
  white: "stroke-foreground",
  dim: "stroke-muted-foreground",
  green: "stroke-green",
  cyan: "stroke-cyan",
  magenta: "stroke-magenta",
  amber: "stroke-amber",
  red: "stroke-red",
}

export const FILL: Record<Tone, string> = {
  white: "fill-foreground",
  dim: "fill-muted-foreground",
  green: "fill-green",
  cyan: "fill-cyan",
  magenta: "fill-magenta",
  amber: "fill-amber",
  red: "fill-red",
}
