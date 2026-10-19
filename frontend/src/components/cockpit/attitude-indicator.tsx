import { cn } from "@/lib/utils"

// Horizonte artificial simplificado de un PFD. Decoración: 4 unidades por grado de cabeceo.
const DEG = 4
const LADDER = [2.5, 5, 7.5, 10, 15, 20]
const ROLL_TICKS = [-45, -30, -20, -10, 10, 20, 30, 45]
const R = 84

const polar = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180
  return { x: +(r * Math.sin(a)).toFixed(2), y: +(-r * Math.cos(a)).toFixed(2) }
}

function Rung({ deg }: { deg: number }) {
  const half = deg % 10 === 0 ? 22 : deg % 5 === 0 ? 11 : 5
  return (
    <>
      {[-1, 1].map((s) => {
        const y = -s * deg * DEG
        return (
          <g key={s}>
            <line x1={-half} y1={y} x2={half} y2={y} />
            {deg % 10 === 0 ? (
              <>
                <text x={-half - 4} y={y} textAnchor="end" dominantBaseline="central" stroke="none" className="fill-foreground">{deg}</text>
                <text x={half + 4} y={y} textAnchor="start" dominantBaseline="central" stroke="none" className="fill-foreground">{deg}</text>
              </>
            ) : null}
          </g>
        )
      })}
    </>
  )
}

export function AttitudeIndicator({ className }: { className?: string }) {
  const arcA = polar(-45, R)
  const arcB = polar(45, R)
  return (
    <svg viewBox="-110 -110 220 220" aria-hidden="true" className={cn("select-none", className)}>
      <defs>
        <clipPath id="adi-clip">
          <rect x="-100" y="-100" width="200" height="200" />
        </clipPath>
      </defs>
      <g clipPath="url(#adi-clip)">
        <rect x="-100" y="-100" width="200" height="100" className="fill-sky" />
        <rect x="-100" y="0" width="200" height="100" className="fill-ground" />
        <line x1="-100" y1="0" x2="100" y2="0" strokeWidth="1.5" className="stroke-foreground" />
        <g strokeWidth="1" fontSize="7" className="stroke-foreground font-mono">
          {LADDER.map((d) => <Rung key={d} deg={d} />)}
        </g>
      </g>
      <rect x="-100" y="-100" width="200" height="200" fill="none" strokeWidth="1" className="stroke-line" />

      {/* Escala de alabeo con índice fijo y puntero. */}
      <g fill="none" strokeWidth="1" className="stroke-foreground">
        <path d={`M ${arcA.x} ${arcA.y} A ${R} ${R} 0 0 1 ${arcB.x} ${arcB.y}`} />
        {ROLL_TICKS.map((t) => {
          const a = polar(t, R)
          const b = polar(t, R + (Math.abs(t) % 30 === 0 ? 8 : 5))
          return <line key={t} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
        })}
        <path d={`M 0 ${-R} l -4 -7 h 8 z`} />
        <path d={`M 0 ${-R + 2} l -5 8 h 10 z`} />
      </g>

      {/* Símbolo fijo del avión: alas y punto central. */}
      <g strokeWidth="1.5" className="fill-background stroke-foreground">
        <path d="M -72 -3 H -30 V 12 H -36 V 3 H -72 Z" />
        <path d="M 72 -3 H 30 V 12 H 36 V 3 H 72 Z" />
        <rect x="-3.5" y="-3.5" width="7" height="7" />
      </g>
    </svg>
  )
}
