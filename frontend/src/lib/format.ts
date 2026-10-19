/** "2027-02-06" -> "06/02/2027" (sin pasar por Date, para evitar desfases de zona horaria). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-")
  return `${d}/${m}/${y}`
}
