import { diffDays, toIsoDay } from "./date"

export type Language = "en" | "es"
export type EndorsementLevel = 4 | 5 | 6

/**
 * Caducidad de la anotación lingüística según ATCO.B.035 (Reglamento (UE) 2015/340):
 * nivel 4, 3 años; nivel 5, 6 años; nivel 6, 9 años en inglés e ilimitada en otros idiomas.
 * Devuelve "YYYY-MM-DD" o null si no caduca.
 */
export function endorsementExpiry(level: EndorsementLevel, language: Language, assessedOn: string | Date): string | null {
  const years = level === 4 ? 3 : level === 5 ? 6 : level === 6 ? (language === "en" ? 9 : null) : undefined
  if (years === undefined) throw new Error("Nivel no válido")
  const day = toIsoDay(assessedOn)
  if (years === null) return null
  const [y, m, d] = day.split("-").map(Number)
  const target = new Date(Date.UTC(y + years, m - 1, d))
  // 29 de febrero en un año no bisiesto: se queda en el 28.
  if (target.getUTCMonth() !== m - 1) target.setUTCDate(0)
  return target.toISOString().slice(0, 10)
}

export type ExpiryStatus = "ilimitada" | "vigente" | "pronto" | "caducada"

/** Aviso propio (no oficial): "pronto" = quedan 180 días o menos. */
export const SOON_DAYS = 180

export function expiryStatus(expiry: string | null, today: string): ExpiryStatus {
  if (expiry === null) return "ilimitada"
  const left = diffDays(today, expiry)
  if (left < 0) return "caducada"
  return left <= SOON_DAYS ? "pronto" : "vigente"
}

export type Endorsement = { language: string; level: number; assessed_on: string }

/** Última anotación (por fecha de evaluación) de un idioma, o null. */
export function latestEndorsement<T extends Endorsement>(list: T[], language: Language): T | null {
  const own = list.filter((e) => e.language === language).sort((a, b) => b.assessed_on.localeCompare(a.assessed_on))
  return own[0] ?? null
}

/** Nivel mínimo pedido en la contratación de ENAIRE (base 3.2.2): inglés 4, castellano 6. */
export const REQUIRED_LEVEL: Record<Language, number> = { en: 4, es: 6 }

export type ObjectiveState = "sin-anotacion" | "nivel-insuficiente" | "caducada" | "pronto" | "vigente" | "ilimitada"

export function endorsementObjective(list: Endorsement[], language: Language, today: string): ObjectiveState {
  const last = latestEndorsement(list, language)
  if (!last) return "sin-anotacion"
  if (last.level < REQUIRED_LEVEL[language]) return "nivel-insuficiente"
  return expiryStatus(endorsementExpiry(last.level as EndorsementLevel, language, last.assessed_on), today)
}
