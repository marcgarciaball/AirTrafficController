/** Desfase (ms) de la zona `tz` respecto a UTC en el instante `ms`. */
function offsetMs(ms: number, tz: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(ms))
  const g = (t: string) => Number(parts.find((x) => x.type === t)?.value)
  return Date.UTC(g("year"), g("month") - 1, g("day"), g("hour"), g("minute"), g("second")) - Math.floor(ms / 1000) * 1000
}

/** "YYYY-MM-DD" + "HH:MM" en la zona `tz` -> instante ISO UTC. */
export function localToIso(day: string, time: string, tz: string): string {
  const [y, mo, d] = day.split("-").map(Number)
  const [h, mi] = time.split(":").map(Number)
  const wall = Date.UTC(y, mo - 1, d, h, mi)
  let guess = wall - offsetMs(wall, tz)
  guess = wall - offsetMs(guess, tz)
  return new Date(guess).toISOString()
}

/** Instante ISO -> "HH:MM" en la zona `tz`. */
export function isoToLocalTime(iso: string, tz: string): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone: tz, hourCycle: "h23", hour: "2-digit", minute: "2-digit" }).format(new Date(iso))
}
