-- Datos iniciales de Torre. Idempotente: se puede repetir sin duplicar filas.

-- Fuentes oficiales (nivel A), consultadas el 2026-10-19.
insert into public.sources (id, url, title, publisher, level, consulted_on) values
  ('00000000-0000-4000-8000-000000000001', 'https://empleo.enaire.es/empleo/PFSrv?accion=inicio', 'Portal de empleo de ENAIRE', 'ENAIRE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000002', 'https://empleo.enaire.es/empleo/PFSrv?accion=descargarSAP&URL=BASES%20CONVOCATORIA%202025', 'Bases de la convocatoria 2025', 'ENAIRE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000003', 'https://empleo.enaire.es/empleo/PFSrv?accion=descargarSAP&URL=ANEXO%20I_TEMARIO', 'Anexo I: temario 2025', 'ENAIRE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000004', 'https://empleo.enaire.es/empleo/PFSrv?accion=descargarSAP&URL=PREGUNTAS%20FRECUENTES%20-%20FAQS', 'FAQ de la convocatoria 2025', 'ENAIRE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000005', 'https://www.boe.es/diario_boe/txt.php?id=BOE-B-2025-42761', 'BOE: anuncio de 2025 (BOE-B-2025-42761)', 'BOE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000006', 'https://www.enaire.es/2025_11_20/ndp_enaire_lanza_nueva_convocatoria_149plazas_controlador_aereo', 'ENAIRE: nota de 20-11-2025', 'ENAIRE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000007', 'https://www.enaire.es/2026_08_17/enaire_refuerza_todos_los_a%C3%B1os_plantilla_controladores', 'ENAIRE: nota de 17-08-2026', 'ENAIRE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000008', 'https://www.seguridadaerea.gob.es/es/ambitos/navegacion-aerea/controladores', 'AESA: controladores', 'AESA', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000009', 'https://www.seguridadaerea.gob.es/es/ambitos/licencias-y-medicina-aeronautica/medicina-aeronautica/centros-medicos-aeronauticos-acreditados', 'AESA: AeMC acreditados', 'AESA', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000010', 'https://www.seguridadaerea.gob.es/es/ambitos/licencias-y-medicina-aeronautica/medicina-aeronautica/medicos-examinadores-aereos-autorizados', 'AESA: médicos examinadores', 'AESA', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000011', 'https://www.seguridadaerea.gob.es/es/ambitos/licencias-y-medicina-aeronautica/medicina-aeronautica/periodos-de-validez-de-certificados-medicos', 'AESA: validez de certificados médicos', 'AESA', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000012', 'https://www.seguridadaerea.gob.es/sites/default/files/tabla_cecl_esp.pdf', 'AESA: centros evaluadores de idioma', 'AESA', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000013', 'https://www.seguridadaerea.gob.es/sites/default/files/listado_proveedores_formacion_certificadas.pdf', 'AESA: escuelas de formación', 'AESA', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000014', 'http://publications.europa.eu/resource/celex/02015R0340-20260513', 'Reglamento (UE) 2015/340, consolidado', 'Oficina de Publicaciones de la UE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000015', 'https://www.boe.es/buscar/act.php?id=BOE-A-2009-16482', 'RD 1516/2009, consolidado', 'BOE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000016', 'https://www.boe.es/eli/es/l/2010/04/14/9', 'Ley 9/2010', 'BOE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000017', 'https://feast-info.eurocontrol.int/', 'Eurocontrol FEAST', 'Eurocontrol', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000018', 'https://feast-training.eurocontrol.int/', 'Eurocontrol FEAST: práctica', 'Eurocontrol', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000019', 'https://www.easa.europa.eu/en/document-library/easy-access-rules/easy-access-rules-air-traffic-controllers-licensing-and', 'EASA Easy Access Rules ATCO (revisión de marzo de 2024; no incluye 2025/2143)', 'EASA', 'A', '2026-10-19')
on conflict (id) do nothing;

-- Convocatorias
insert into public.exam_calls (id, year, title, status, seats, source_id, verified) values
  ('00000000-0000-4000-8000-000000001025', 2025, 'Convocatoria ENAIRE 2025: controladores de tránsito aéreo', 'cerrada', 149, '00000000-0000-4000-8000-000000000005', true),
  -- Convocatoria 2026: esperada, sin plazas ni publicación oficial todavía.
  ('00000000-0000-4000-8000-000000001026', 2026, 'Convocatoria ENAIRE 2026 (esperada)', 'esperada', null, '00000000-0000-4000-8000-000000000007', false)
on conflict (id) do nothing;

-- Eventos de la convocatoria 2025 (verificados)
insert into public.exam_call_events (id, exam_call_id, kind, "date", is_estimate, source_id, verified) values
  ('00000000-0000-4000-8000-000002025001', '00000000-0000-4000-8000-000000001025', 'publicacion', '2025-11-20', false, '00000000-0000-4000-8000-000000000005', true),
  ('00000000-0000-4000-8000-000002025002', '00000000-0000-4000-8000-000000001025', 'inscripcion_inicio', '2025-11-21', false, '00000000-0000-4000-8000-000000000005', true),
  ('00000000-0000-4000-8000-000002025003', '00000000-0000-4000-8000-000000001025', 'inscripcion_fin', '2025-12-12', false, '00000000-0000-4000-8000-000000000005', true),
  ('00000000-0000-4000-8000-000002025004', '00000000-0000-4000-8000-000000001025', 'fase1', '2026-02-07', false, '00000000-0000-4000-8000-000000000005', true),
  ('00000000-0000-4000-8000-000002025005', '00000000-0000-4000-8000-000000001025', 'fase2', '2026-03-13', false, '00000000-0000-4000-8000-000000000005', true),
  ('00000000-0000-4000-8000-000002025006', '00000000-0000-4000-8000-000000001025', 'resultado', '2026-06-26', false, '00000000-0000-4000-8000-000000000005', true)
on conflict (id) do nothing;

-- Evento de la convocatoria 2026: estimación por analogía con el calendario 2025; no es dato oficial.
insert into public.exam_call_events (id, exam_call_id, kind, "date", is_estimate, source_id, verified) values
  ('00000000-0000-4000-8000-000002026001', '00000000-0000-4000-8000-000000001026', 'fase1', '2027-02-06', true, '00000000-0000-4000-8000-000000000007', false)
on conflict (id) do nothing;
