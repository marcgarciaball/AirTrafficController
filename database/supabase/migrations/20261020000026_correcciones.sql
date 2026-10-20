-- Correcciones de la auditoría de contenidos (2026-10-20). Ver docs/superpowers/auditoria-contenidos.md.

-- Las fechas de la Fase 1, la Fase 2 y la resolución final provisional salen de resoluciones del portal de empleo, no del anuncio del BOE.
update public.exam_call_events
set source_id = '00000000-0000-4000-8000-000000000001'
where id in (
  '00000000-0000-4000-8000-000002025004',
  '00000000-0000-4000-8000-000002025005',
  '00000000-0000-4000-8000-000002025006'
);

-- Gramática: "de el" -> "del".
update public.tasks
set explanation = replace(explanation, 'práctica de el razonamiento', 'práctica del razonamiento')
where explanation like '%práctica de el razonamiento%';
