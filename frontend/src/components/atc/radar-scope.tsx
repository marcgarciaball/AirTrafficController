import { cn } from "@/lib/utils"

// Geometría en unidades del viewBox (-200..200). Decoración pura.
const OUTER = 192
const RINGS = [48, 96, 144, OUTER]
const RANGE_LABELS = ["10", "20", "30"]

const rad = (deg: number) => ((deg - 90) * Math.PI) / 180
const polar = (r: number, deg: number) => ({ x: +(r * Math.cos(rad(deg))).toFixed(2), y: +(r * Math.sin(rad(deg))).toFixed(2) })

const TICKS = Array.from({ length: 36 }, (_, i) => i * 10)

// Ecos ficticios de ambientación: indicativo y nivel de vuelo.
const ECHOES = [
  { callsign: "IBE3412", level: "350", r: 118, deg: 52, heading: 230, selected: true },
  { callsign: "VLG17RT", level: "240", r: 70, deg: 208, heading: 40, selected: false },
  { callsign: "AEA5XK", level: "120", r: 160, deg: 298, heading: 110, selected: false },
  { callsign: "RYR82TL", level: "380", r: 136, deg: 150, heading: 330, selected: false },
]

export function RadarScope({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative aspect-square select-none", className)}>
      {/* Barrido: cono con estela, gira sobre el centro. */}
      <div className="absolute inset-[2%] overflow-hidden rounded-full">
        <div className="absolute inset-0 animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_290deg,color-mix(in_oklch,var(--primary)_22%,transparent)_356deg,color-mix(in_oklch,var(--primary)_55%,transparent)_360deg)] opacity-60 motion-reduce:animate-none motion-reduce:opacity-25" />
      </div>

      <svg viewBox="-200 -200 400 400" className="absolute inset-0 size-full overflow-visible" fill="none">
        {/* Rejilla de mapa */}
        <g className="stroke-border" strokeWidth="0.75">
          {RINGS.map((r) => (
            <circle key={r} r={r} strokeWidth={r === OUTER ? 1.25 : 0.75} />
          ))}
          <line x1={-OUTER} y1="0" x2={OUTER} y2="0" />
          <line x1="0" y1={-OUTER} x2="0" y2={OUTER} />
        </g>

        {/* Aerovías y eje de pista: líneas finas de mapa */}
        <g className="stroke-muted-foreground/30" strokeWidth="0.75" strokeDasharray="2 4">
          <line x1="-170" y1="-96" x2="150" y2="104" />
          <line x1="-120" y1="150" x2="96" y2="-160" />
        </g>
        <g className="stroke-muted-foreground/55" strokeWidth="1">
          <line x1="-14" y1="9" x2="14" y2="-9" />
          <line x1="14" y1="-9" x2="58" y2="-37" strokeDasharray="1 3" />
        </g>

        {/* Marcas de rumbo cada 10°, mayores cada 30° */}
        <g className="stroke-muted-foreground/60">
          {TICKS.map((deg) => {
            const major = deg % 30 === 0
            const a = polar(OUTER, deg)
            const b = polar(OUTER - (major ? 9 : 4), deg)
            return <line key={deg} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={major ? 1 : 0.6} />
          })}
        </g>
        <g className="fill-muted-foreground font-mono" fontSize="8" letterSpacing="0.6" textAnchor="middle" dominantBaseline="central">
          {TICKS.filter((d) => d % 30 === 0).map((deg) => {
            const p = polar(OUTER - 19, deg)
            return (
              <text key={deg} x={p.x} y={p.y}>
                {String(deg).padStart(3, "0")}
              </text>
            )
          })}
        </g>
        <g className="fill-muted-foreground/70 font-mono" fontSize="7" letterSpacing="0.5">
          {RANGE_LABELS.map((l, i) => (
            <text key={l} x={4} y={-RINGS[i] - 3}>
              {l}
            </text>
          ))}
        </g>

        {/* Centro */}
        <g className="stroke-primary" strokeWidth="1">
          <line x1="-5" y1="0" x2="5" y2="0" />
          <line x1="0" y1="-5" x2="0" y2="5" />
        </g>

        {/* Ecos con estela de posiciones anteriores, vector y bloque de datos */}
        {ECHOES.map((e) => {
          const p = polar(e.r, e.deg)
          const tone = e.selected ? "primary" : "foreground"
          const trail = [1, 2, 3].map((k) => {
            const back = polar(7 * k, e.heading + 180)
            return { x: p.x + back.x, y: p.y + back.y, k }
          })
          const vec = polar(16, e.heading)
          const right = p.x < 120
          const lx = p.x + (right ? 14 : -14)
          return (
            <g key={e.callsign}>
              {trail.map((t) => (
                <circle key={t.k} cx={t.x} cy={t.y} r="1.1" className={tone === "primary" ? "fill-primary" : "fill-foreground"} opacity={0.5 - t.k * 0.12} />
              ))}
              <line x1={p.x} y1={p.y} x2={p.x + vec.x} y2={p.y + vec.y} strokeWidth="0.8" className={tone === "primary" ? "stroke-primary/70" : "stroke-foreground/40"} />
              <rect x={p.x - 2.5} y={p.y - 2.5} width="5" height="5" className={tone === "primary" ? "fill-primary" : "fill-foreground/80"} />
              {e.selected ? <rect x={p.x - 6} y={p.y - 6} width="12" height="12" strokeWidth="0.8" className="stroke-primary" /> : null}
              <line x1={p.x + (right ? 4 : -4)} y1={p.y - 3} x2={lx + (right ? -2 : 2)} y2={p.y - 9} strokeWidth="0.6" className={tone === "primary" ? "stroke-primary/70" : "stroke-foreground/35"} />
              <text
                x={lx}
                y={p.y - 16}
                fontSize="8"
                letterSpacing="0.4"
                textAnchor={right ? "start" : "end"}
                className={cn("font-mono", tone === "primary" ? "fill-primary" : "fill-foreground/75")}
              >
                <tspan x={lx}>{e.callsign}</tspan>
                <tspan x={lx} dy="9.5">{e.level}</tspan>
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
