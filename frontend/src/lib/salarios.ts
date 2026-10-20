/** Valores 2022 del Anexo I del III Convenio ENAIRE-controladores (BOE-A-2023-18633). Sin revisión 2023+ [VERIFICAR]. */
export const BASE_TURNOS = 22795.64

/** CPT del controlador por grupo de dependencia (€/año). */
export const CPT: Record<number, number> = {
  1: 86083.8,
  2: 82656.84,
  3: 79229.76,
  4: 73546.68,
  5: 67532.28,
  6: 57287.16,
  7: 39197.28,
  8: 35930.76,
}

export type Destino = { id: string; nombre: string; grupo: number; residencia: number }

/** Grupo según una academia (nivel B): [VERIFICAR]. Residencia: art. 133 y Anexo I (confirmado). */
export const DESTINOS: Destino[] = [
  { id: "acc-mad-bcn", nombre: "ACC Madrid / ACC Barcelona", grupo: 1, residencia: 0 },
  { id: "acc-canarias", nombre: "ACC Canarias", grupo: 3, residencia: 1905.96 },
  { id: "acc-palma", nombre: "ACC Palma", grupo: 3, residencia: 819.96 },
  { id: "acc-sevilla", nombre: "ACC Sevilla", grupo: 3, residencia: 0 },
  { id: "acc-levante", nombre: "ACC Levante (Valencia)", grupo: 4, residencia: 0 },
  { id: "twr-madrid", nombre: "Torre Madrid", grupo: 4, residencia: 0 },
  { id: "twr-bcn-agp", nombre: "Torre Barcelona / Málaga", grupo: 5, residencia: 0 },
  { id: "twr-palma", nombre: "Torre Palma", grupo: 5, residencia: 819.96 },
  { id: "twr-gc-tfs", nombre: "Torre Gran Canaria / Tenerife Sur", grupo: 5, residencia: 1905.96 },
  { id: "twr-tfn", nombre: "Torre Tenerife Norte", grupo: 6, residencia: 1905.96 },
  { id: "twr-bio-gro", nombre: "Torre Bilbao / Girona", grupo: 6, residencia: 0 },
  { id: "twr-pequena", nombre: "Torre pequeña peninsular (Vitoria, Reus, Pamplona...)", grupo: 8, residencia: 0 },
  { id: "twr-melilla", nombre: "Torre Melilla", grupo: 8, residencia: 8923.2 },
]

export type Tramo = "1-3" | "4-6" | "7+"
/** Art. 132.4: 60 % los 3 primeros años, 80 % los 3 siguientes, 100 % desde el año 7. */
export const TRAMOS: { id: Tramo; label: string; pct: number }[] = [
  { id: "1-3", label: "Años 1 a 3", pct: 0.6 },
  { id: "4-6", label: "Años 4 a 6", pct: 0.8 },
  { id: "7+", label: "Año 7 en adelante", pct: 1 },
]

export type Estimacion = { base: number; cptPct: number; cptCompleto: number; pct: number; residencia: number; total: number }

export function estimar(destinoId: string, tramo: Tramo): Estimacion | null {
  const d = DESTINOS.find((x) => x.id === destinoId)
  const t = TRAMOS.find((x) => x.id === tramo)
  if (!d || !t) return null
  const cptCompleto = CPT[d.grupo]
  const cptPct = Math.round(cptCompleto * t.pct * 100) / 100
  const total = Math.round((BASE_TURNOS + cptPct + d.residencia) * 100) / 100
  return { base: BASE_TURNOS, cptPct, cptCompleto, pct: t.pct, residencia: d.residencia, total }
}
