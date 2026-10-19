import type { SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"

export type Src = { url: string; title: string; consulted_on: string }
export type Fact = { key: string; label: string; value: string | null; verified: boolean; source_id: string }
export type GuiaData = {
  db: SupabaseClient
  facts: Record<string, Fact>
  sources: Record<string, Src & { publisher: string; level: string }>
  byUrl: Record<string, Src>
}

/** Fuentes oficiales citadas en contenido que no está en `facts` (título de respaldo si la URL no está en `sources`). */
export const U = {
  portal: ["https://empleo.enaire.es/empleo/PFSrv?accion=inicio", "Portal de empleo de ENAIRE"],
  bases: ["https://empleo.enaire.es/empleo/PFSrv?accion=descargarSAP&URL=BASES%20CONVOCATORIA%202025", "Bases de la convocatoria 2025"],
  aesa: ["https://www.seguridadaerea.gob.es/es/ambitos/navegacion-aerea/controladores", "AESA: controladores"],
  aemc: ["https://www.seguridadaerea.gob.es/es/ambitos/licencias-y-medicina-aeronautica/medicina-aeronautica/centros-medicos-aeronauticos-acreditados", "AESA: AeMC acreditados"],
  validez: ["https://www.seguridadaerea.gob.es/es/ambitos/licencias-y-medicina-aeronautica/medicina-aeronautica/periodos-de-validez-de-certificados-medicos", "AESA: validez de certificados médicos"],
  sigma: ["https://sede.seguridadaerea.gob.es/SIGMA2-WEB/inicio", "AESA sede: SIGMA (pre-solicitud médica)"],
  cecl: ["https://www.seguridadaerea.gob.es/sites/default/files/tabla_cecl_esp.pdf", "AESA: centros evaluadores de idioma"],
  escuelas: ["https://www.seguridadaerea.gob.es/sites/default/files/listado_proveedores_formacion_certificadas.pdf", "AESA: escuelas de formación"],
  reg: ["http://publications.europa.eu/resource/celex/02015R0340-20260513", "Reglamento (UE) 2015/340, consolidado"],
  rd1516: ["https://www.boe.es/buscar/act.php?id=BOE-A-2009-16482", "RD 1516/2009, consolidado"],
  feast: ["https://feast-info.eurocontrol.int/", "Eurocontrol FEAST"],
  feastPractica: ["https://feast-training.eurocontrol.int/", "Eurocontrol FEAST: práctica"],
  nota2026: ["https://www.enaire.es/2026_08_17/enaire_refuerza_todos_los_a%C3%B1os_plantilla_controladores", "ENAIRE: nota de 17-08-2026"],
} as const satisfies Record<string, readonly [string, string]>

export async function loadGuia(): Promise<GuiaData> {
  // Cliente sin tipar: así tolera tablas o columnas nuevas.
  const db = (await createClient()) as unknown as SupabaseClient
  const [facts, sources] = await Promise.all([
    db.from("facts").select("key, label, value, verified, source_id").order("sort"),
    db.from("sources").select("id, url, title, publisher, level, consulted_on"),
  ])
  const f: GuiaData["facts"] = {}
  for (const r of (facts.data ?? []) as Fact[]) f[r.key] = r
  const s: GuiaData["sources"] = {}
  const byUrl: GuiaData["byUrl"] = {}
  for (const r of sources.data ?? []) {
    s[r.id] = r
    byUrl[r.url] = r
  }
  return { db, facts: f, sources: s, byUrl }
}

/** Fuente por URL: la de la tabla `sources` si existe; si no, el respaldo con la fecha de consulta de la investigación. */
export function src(g: GuiaData, ref: readonly [string, string]): Src {
  return g.byUrl[ref[0]] ?? { url: ref[0], title: ref[1], consulted_on: "2026-10-19" }
}

export type Item = { label: string; value: string | null; verified: boolean; source: Src }

/** Dato de la tabla `facts` (null si no existe, para no mostrar nada inventado). */
export function fact(g: GuiaData, key: string): Item | null {
  const f = g.facts[key]
  const source = f ? g.sources[f.source_id] : undefined
  if (!f || !source) return null
  return { label: f.label, value: f.value, verified: f.verified, source }
}

export function facts(g: GuiaData, keys: string[]): Item[] {
  return keys.map((k) => fact(g, k)).filter((x): x is Item => x !== null)
}

export function dato(g: GuiaData, ref: readonly [string, string], label: string, value: string | null, verified = true): Item {
  return { label, value, verified, source: src(g, ref) }
}
