"use client"

import { useState } from "react"
import { Card } from "@/components/ui-torre/section"
import { DESTINOS, TRAMOS, estimar, type Tramo } from "@/lib/salarios"

const eur = (n: number) => n.toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })
const SELECT = "mt-2 block min-h-12 w-full rounded-lg border bg-card px-3 text-foreground"

export function CalculadoraSalario() {
  const [destino, setDestino] = useState(DESTINOS[0].id)
  const [tramo, setTramo] = useState<Tramo>("1-3")
  const e = estimar(destino, tramo)
  const d = DESTINOS.find((x) => x.id === destino)
  return (
    <Card className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block font-bold">
          Destino
          <select className={SELECT} value={destino} onChange={(ev) => setDestino(ev.target.value)}>
            {DESTINOS.map((x) => (
              <option key={x.id} value={x.id}>
                {x.nombre}
              </option>
            ))}
          </select>
        </label>
        <label className="block font-bold">
          Año de carrera
          <select className={SELECT} value={tramo} onChange={(ev) => setTramo(ev.target.value as Tramo)}>
            {TRAMOS.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      {e && d ? (
        <div className="space-y-3" aria-live="polite">
          <p className="text-sm text-muted-foreground">Bruto anual estimado</p>
          <p className="text-4xl font-bold text-foreground">{eur(e.total)}</p>
          <dl className="divide-y divide-line text-sm">
            <div className="flex justify-between gap-4 py-2">
              <dt>Sueldo base a turnos</dt>
              <dd>{eur(e.base)}</dd>
            </div>
            <div className="flex justify-between gap-4 py-2">
              <dt>
                CPT al {Math.round(e.pct * 100)} % (grupo {d.grupo}, CPT completo {eur(e.cptCompleto)})
              </dt>
              <dd>{eur(e.cptPct)}</dd>
            </div>
            <div className="flex justify-between gap-4 py-2">
              <dt>Plus de residencia</dt>
              <dd>{eur(e.residencia)}</dd>
            </div>
          </dl>
          <p className="text-sm text-warning">El grupo de este destino es nivel B (academia) y está pendiente de verificar.</p>
        </div>
      ) : null}
    </Card>
  )
}
