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
  boe: ["https://www.boe.es/diario_boe/txt.php?id=BOE-B-2025-42761", "BOE: anuncio de 2025 (BOE-B-2025-42761)"],
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
  faq: ["https://empleo.enaire.es/empleo/PFSrv?accion=descargarSAP&URL=PREGUNTAS%20FRECUENTES%20-%20FAQS", "FAQ de la convocatoria 2025"],
  temario: ["https://empleo.enaire.es/empleo/PFSrv?accion=descargarSAP&URL=ANEXO%20I_TEMARIO", "Anexo I: temario 2025"],
  plantillas: ["https://empleo.enaire.es/empleo/PFSrv?accion=descargarSAP&URL=ANEXO%20I_PLANTILLAS%20CORRECCI%D3N%20PRUEBAS%20FASE%201", "Plantilla oficial de respuestas 2026 (Fase 1, 7 y 8 de febrero)"],
  nota2026: ["https://www.enaire.es/2026_08_17/enaire_refuerza_todos_los_a%C3%B1os_plantilla_controladores", "ENAIRE: nota de 17-08-2026"],
  convenio: ["https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-18633", "BOE-A-2023-18633: III Convenio Colectivo ENAIRE-controladores"],
  fin2018: ["https://www.enaire.es/es_ES/2018_11_21/ndp_20181121_fecha_limite_convocatoria_control", "ENAIRE 2018: financiación del curso"],
  blog2020: ["https://www.enaire.es/es_ES/2020_02_25/blog_convocatoria_control_enaire", "ENAIRE 2020: blog de la convocatoria"],
  nota2025: ["https://enaire.es/2025_11_20/ndp_enaire_lanza_nueva_convocatoria_149plazas_controlador_aereo", "ENAIRE: convocatoria 2025 (149 plazas)"],
  testimonio: ["https://elespanol.com/reportajes/20230919/juan-antonio-martinez-trabaja-profesion-no-necesita-carrera-gana-euros/795420882_0.html", "El Español 2023 (testimonio)"],
  menorca: ["https://www.menorca.info/actualidad/sociedad/2024/03/03/2117469/cuanto-cobra-controlador-aereo-espana.html", "Menorca.info 2024"],
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

/** Documentos del portal de empleo de ENAIRE que no están en `sources`: enlace estático al portal con el título del documento. */
export const DOC = {
  anexo4: "Anexo IV: criterios de la evaluación conductual (Resolución de 31-03-2026)",
  admision: "Resolución del listado definitivo de admisión (15-01-2026)",
  resF1: "Resolución del listado definitivo de resultados de la Fase 1 (05-03-2026)",
  finalProv: "Resolución final provisional (26-06-2026)",
} as const

/** Cita con localización (base, página): la fuente de la tabla o el respaldo, con el lugar exacto en el título. */
export function cita(g: GuiaData, ref: readonly [string, string] | keyof typeof DOC, loc?: string): Src {
  const base: Src = typeof ref === "string" ? { url: U.portal[0], title: `${DOC[ref]} · en el portal de empleo de ENAIRE`, consulted_on: "2026-10-19" } : src(g, ref)
  return loc ? { ...base, title: `${base.title} · ${loc}` } : base
}

/** Fuente de la investigación del 2026-10-20 (auditoría de contenido y certificado médico). */
export const f20 = (url: string, title: string): Src => ({ url, title, consulted_on: "2026-10-20" })
export const F = {
  certDoc: f20("https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-air-traffic-controllers?page=29", "EASA: Easy Access Rules ATCO (ATCO.MED)"),
  vision: f20("https://trafikstyrelsen.dk/publikationsliste/luftfart-publikationer/atoc-class-3-visual-system", "Trafikstyrelsen: ATCO.MED.B.070 (visión)"),
  ukcaa: f20("https://www.caa.co.uk/commercial-industry/airspace/air-traffic-management-and-air-navigational-services/licences/medical-requirements/initial-medical-certification-for-air-traffic-controllers-atcos/", "UK CAA: examen inicial ATCO"),
  masterd: f20("https://www.masterd.es/blog/exclusiones-medicas-controlador-aereo", "MasterD: exclusiones médicas (academia)"),
  usal: f20("https://adventia.usal.es/wp-content/uploads/2022/04/Reconocimiento22.pdf", "Univ. de Salamanca: precios 2022"),
  aesaAme: f20("https://www.seguridadaerea.gob.es/es/ambitos/licencias-y-medicina-aeronautica/medicina-aeronautica/medicos-examinadores-aereos-autorizados", "AESA: médicos examinadores autorizados"),
  foroClase3: f20("http://www.controladoresaereos.org/foros/convocatorias-de-empleo-para-controlador-aereo/certificado-medico-de-clase-3/", "Foro controladoresaereos.org: certificado médico Clase 3"),
  foroCima: f20("http://www.controladoresaereos.org/foros/convocatoria-de-empleo-enaire-2017/cima-cert-medico-clase-iii/", "Foro controladoresaereos.org: CIMA Clase III"),
  prensa4700: f20("https://actualidadaeroespacial.com/casi-4-700-candidatos-aspiran-a-ocupar-las-150-plazas-de-controladores-convocadas-por-enaire/", "Actualidad Aeroespacial, 31-01-2025"),
  fin2018: f20("https://www.enaire.es/2018_11_02/ndp_financiacion_cta_2018", "ENAIRE 2018: financiación del curso"),
  boe: f20("https://www.boe.es/diario_boe/txt.php?id=BOE-B-2025-42761", "BOE-B-2025-42761"),
  superaoposiciones: f20("https://www.superaoposiciones.es/blog/preparacion-evaluacion-clinica-conductual-controlador-aereo", "Superaoposiciones: preparación clínica y conductual (academia)"),
  enclavepsi: f20("https://www.enclavepsi.com/preparacion-de-la-prueba-conductual-de-controlador-aereo/", "Enclavepsi: prueba conductual (preparador privado)"),
  controlprep: f20("https://controlprep.com/mi-camino-a-enaire-4.html", "ControlPrep: testimonio, test de personalidad (resumen del buscador)"),
  controlprep2: f20("https://controlprep.com/mi-camino-a-enaire-2.html", "ControlPrep: testimonio, seis intentos (resumen del buscador)"),
  infobae: f20("https://www.infobae.com/espana/2026/01/24/controlador-aereo-las-oposiciones-mejor-pagadas-y-como-llegar-a-ellas/", "Infobae, 24-01-2026"),
  masterdConv: f20("https://www.masterd.es/blog/convocatoria-controlador-aereo-enaire", "MasterD: convocatoria ENAIRE (academia)"),
}
