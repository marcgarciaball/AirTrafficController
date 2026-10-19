-- Hoja de ruta de Torre (incremento 2): plantillas globales, progreso por usuario y RLS.
-- Las plantillas globales se insertan aquí con UUID fijos y `on conflict (id) do nothing`.
-- Las duraciones son estimaciones. Lo que en los docs está como [VERIFICAR] va con verified = false.

-- ---------------------------------------------------------------- Tablas
create table public.facts (
  id uuid primary key,
  key text unique not null,
  label text not null,
  value text,
  verified boolean not null default false,
  source_id uuid not null references public.sources (id),
  sort int not null default 0
);

create table public.phases (
  id uuid primary key,
  number int unique not null check (number between 0 and 8),
  title text not null,
  summary text not null,
  est_weeks_min int,
  est_weeks_max int,
  track text not null check (track in ('gate', 'base', 'temario', 'aptitudes', 'ingles', 'secuencial', 'post')),
  unlock_after int[] not null default '{}'
);

create table public.subjects (
  id uuid primary key,
  code text unique not null,
  title text not null,
  track text not null
);

create table public.topics (
  id uuid primary key,
  subject_id uuid not null references public.subjects (id),
  number int not null,
  title text not null,
  source_id uuid not null references public.sources (id),
  verified boolean not null default false
);

create table public.tasks (
  id uuid primary key,
  phase_id uuid not null references public.phases (id),
  parent_id uuid references public.tasks (id),
  title text not null,
  explanation text not null,
  est_minutes int,
  kind text not null check (kind in ('estudio', 'practica', 'tramite', 'hito')),
  topic_id uuid references public.topics (id),
  source_id uuid references public.sources (id),
  verified boolean not null default false,
  recommended boolean not null default false,
  onboarding_key text check (onboarding_key in ('nacionalidad', 'edad', 'titulacion', 'medico')),
  sort int not null default 0
);

create table public.task_dependencies (
  task_id uuid not null references public.tasks (id) on delete cascade,
  depends_on_id uuid not null references public.tasks (id) on delete cascade,
  primary key (task_id, depends_on_id)
);

create table public.task_links (
  task_id uuid not null references public.tasks (id) on delete cascade,
  source_id uuid not null references public.sources (id),
  role text not null check (role in ('oficial', 'recomendado')),
  primary key (task_id, source_id)
);

create table public.user_task_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  task_id uuid not null references public.tasks (id) on delete cascade,
  status text not null default 'pendiente' check (status in ('pendiente', 'en_curso', 'hecha')),
  started_at timestamptz,
  completed_at timestamptz,
  notes text,
  updated_at timestamptz not null default now(),
  primary key (user_id, task_id)
);

-- Índices en claves foráneas (las claves primarias ya cubren user_id y task_id en las tablas con PK compuesta).
create index facts_source_id_idx on public.facts (source_id);
create index topics_subject_id_idx on public.topics (subject_id);
create index topics_source_id_idx on public.topics (source_id);
create index tasks_phase_id_idx on public.tasks (phase_id);
create index tasks_parent_id_idx on public.tasks (parent_id);
create index tasks_topic_id_idx on public.tasks (topic_id);
create index tasks_source_id_idx on public.tasks (source_id);
create index task_dependencies_depends_on_id_idx on public.task_dependencies (depends_on_id);
create index task_links_source_id_idx on public.task_links (source_id);
create index user_task_progress_task_id_idx on public.user_task_progress (task_id);

-- ---------------------------------------------------------------- RLS
alter table public.facts enable row level security;
alter table public.phases enable row level security;
alter table public.subjects enable row level security;
alter table public.topics enable row level security;
alter table public.tasks enable row level security;
alter table public.task_dependencies enable row level security;
alter table public.task_links enable row level security;
alter table public.user_task_progress enable row level security;

create policy "facts_select_authenticated" on public.facts for select to authenticated using (true);
create policy "phases_select_authenticated" on public.phases for select to authenticated using (true);
create policy "subjects_select_authenticated" on public.subjects for select to authenticated using (true);
create policy "topics_select_authenticated" on public.topics for select to authenticated using (true);
create policy "tasks_select_authenticated" on public.tasks for select to authenticated using (true);
create policy "task_dependencies_select_authenticated" on public.task_dependencies for select to authenticated using (true);
create policy "task_links_select_authenticated" on public.task_links for select to authenticated using (true);

create policy "user_task_progress_select_own" on public.user_task_progress
  for select to authenticated using (user_id = (select auth.uid()));
create policy "user_task_progress_insert_own" on public.user_task_progress
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "user_task_progress_update_own" on public.user_task_progress
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "user_task_progress_delete_own" on public.user_task_progress
  for delete to authenticated using (user_id = (select auth.uid()));

-- Defensa en profundidad: se retiran los permisos de escritura que Supabase concede por defecto.
revoke insert, update, delete, truncate on
  public.facts, public.phases, public.subjects, public.topics, public.tasks,
  public.task_dependencies, public.task_links
  from anon, authenticated;
revoke insert, update, delete, truncate on public.user_task_progress from anon;
revoke truncate on public.user_task_progress from authenticated;

-- ---------------------------------------------------------------- Fuentes que necesita la plantilla
-- Mismos UUID y datos que seed.sql (que usa on conflict (id) do nothing); se repiten aquí para que
-- las claves foráneas se cumplan aunque la migración se ejecute antes que el seed.

insert into public.sources (id, url, title, publisher, level, consulted_on) values
  ('00000000-0000-4000-8000-000000000001', 'https://empleo.enaire.es/empleo/PFSrv?accion=inicio', 'Portal de empleo de ENAIRE', 'ENAIRE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000002', 'https://empleo.enaire.es/empleo/PFSrv?accion=descargarSAP&URL=BASES%20CONVOCATORIA%202025', 'Bases de la convocatoria 2025', 'ENAIRE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000003', 'https://empleo.enaire.es/empleo/PFSrv?accion=descargarSAP&URL=ANEXO%20I_TEMARIO', 'Anexo I: temario 2025', 'ENAIRE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000005', 'https://www.boe.es/diario_boe/txt.php?id=BOE-B-2025-42761', 'BOE: anuncio de 2025 (BOE-B-2025-42761)', 'BOE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000007', 'https://www.enaire.es/2026_08_17/enaire_refuerza_todos_los_a%C3%B1os_plantilla_controladores', 'ENAIRE: nota de 17-08-2026', 'ENAIRE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000008', 'https://www.seguridadaerea.gob.es/es/ambitos/navegacion-aerea/controladores', 'AESA: controladores', 'AESA', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000009', 'https://www.seguridadaerea.gob.es/es/ambitos/licencias-y-medicina-aeronautica/medicina-aeronautica/centros-medicos-aeronauticos-acreditados', 'AESA: AeMC acreditados', 'AESA', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000014', 'http://publications.europa.eu/resource/celex/02015R0340-20260513', 'Reglamento (UE) 2015/340, consolidado', 'Oficina de Publicaciones de la UE', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000017', 'https://feast-info.eurocontrol.int/', 'Eurocontrol FEAST', 'Eurocontrol', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000018', 'https://feast-training.eurocontrol.int/', 'Eurocontrol FEAST: práctica', 'Eurocontrol', 'A', '2026-10-19'),
  ('00000000-0000-4000-8000-000000000020', 'https://www.cambridgeenglish.org/exams-and-tests/advanced/preparation', 'Cambridge C1 Advanced: preparación', 'Cambridge University Press & Assessment', 'B', '2026-10-19')
on conflict (id) do nothing;

-- ---------------------------------------------------------------- Plantilla: fases
insert into public.phases (id, number, title, summary, est_weeks_min, est_weeks_max, track, unlock_after) values
  ('00000000-0000-4000-8000-000000003000', 0, 'Viabilidad', 'Comprueba que cumples los requisitos de la base 3.1 (nacionalidad o residencia, edad y titulación) y revisa el coste de la formación inicial y su financiación. Se recomienda hacer pronto el reconocimiento médico de Clase 3.', 1, 3, 'gate', '{}'),
  ('00000000-0000-4000-8000-000000003001', 1, 'Base y diagnóstico', 'Lee las bases y el temario oficial, haz un test de nivel de cada tema y mide tu inglés actual.', 1, 2, 'base', '{0}'),
  ('00000000-0000-4000-8000-000000003002', 2, 'Temario teórico', 'Los 9 temas oficiales, uno a uno: lectura del PDF oficial, resumen propio y test propio al terminar cada tema.', 13, 22, 'temario', '{0}'),
  ('00000000-0000-4000-8000-000000003003', 3, 'Aptitudes y psicotécnicos', 'Práctica corta y diaria de atención y de razonamiento espacial y abstracto, que forman la prueba C de la Fase 1.', null, null, 'aptitudes', '{0}'),
  ('00000000-0000-4000-8000-000000003004', 4, 'Inglés', 'Nivel C1 para el test escrito de la Fase 1 y la entrevista oral de la Fase 3, con las cuatro destrezas y algo de inglés aeronáutico.', null, null, 'ingles', '{0}'),
  ('00000000-0000-4000-8000-000000003005', 5, 'Pruebas digitales', 'Práctica con la plataforma oficial gratuita de FEAST y preparación de la PDEA, de la que no hay material oficial.', 3, 6, 'secuencial', '{0}'),
  ('00000000-0000-4000-8000-000000003006', 6, 'Simulacros', 'Exámenes completos de la Fase 1 cronometrados y análisis de tus errores.', 6, 8, 'secuencial', '{2}'),
  ('00000000-0000-4000-8000-000000003007', 7, 'Fase 3', 'Preparación de la entrevista oral de inglés, la evaluación conductual y la evaluación clínica de la personalidad.', 3, 4, 'secuencial', '{6}'),
  ('00000000-0000-4000-8000-000000003008', 8, 'Tras la selección', 'Los pasos posteriores a aprobar: formación inicial, licencia de alumno, requisitos de contratación, formación de unidad y licencia de controlador.', null, null, 'post', '{7}')
on conflict (id) do nothing;

-- ---------------------------------------------------------------- Plantilla: datos (facts)
insert into public.facts (id, key, label, value, verified, source_id, sort) values
  ('00000000-0000-4000-8000-000000004001', 'conv_2025_plazas', 'Convocatoria 2025: plazas', '149', true, '00000000-0000-4000-8000-000000000005', 1),
  ('00000000-0000-4000-8000-000000004002', 'conv_2025_inscripcion', 'Convocatoria 2025: plazo de inscripción', 'Del 21-11-2025 (09:00) al 12-12-2025 (23:59)', true, '00000000-0000-4000-8000-000000000005', 2),
  ('00000000-0000-4000-8000-000000004003', 'conv_2025_tasa', 'Convocatoria 2025: tasa de examen', '15,57 €', true, '00000000-0000-4000-8000-000000000005', 3),
  ('00000000-0000-4000-8000-000000004004', 'conv_2026_plazas', 'Convocatoria 2026: plazas', null, false, '00000000-0000-4000-8000-000000000007', 4),
  ('00000000-0000-4000-8000-000000004005', 'conv_2026_fecha', 'Convocatoria 2026: fecha de publicación', 'ENAIRE anunció el 17-08-2026 que se aprobará antes de que acabe el año; fecha exacta sin publicar', false, '00000000-0000-4000-8000-000000000007', 5),
  ('00000000-0000-4000-8000-000000004006', 'req_nacionalidad', 'Requisito: nacionalidad', 'Españoles; nacionales de la UE o de Estados con libre circulación de trabajadores; sus cónyuges y descendientes; y personas extranjeras con residencia legal en España (base 3.1.a)', true, '00000000-0000-4000-8000-000000000002', 6),
  ('00000000-0000-4000-8000-000000004007', 'req_edad', 'Requisito: edad', '18 años cumplidos y menos de 65 (base 3.1.b)', true, '00000000-0000-4000-8000-000000000002', 7),
  ('00000000-0000-4000-8000-000000004008', 'req_titulacion', 'Requisito: titulación', 'Titulación que da acceso a la Universidad: Bachiller o equivalente, Técnico Superior de FP, de Artes Plásticas y Diseño o Deportivo Superior. Los títulos extranjeros necesitan homologación o equivalencia (base 3.1.c)', true, '00000000-0000-4000-8000-000000000002', 8),
  ('00000000-0000-4000-8000-000000004009', 'req_psicofisica', 'Requisito: capacidad psicofísica', 'Capacidad psicofísica y funcional conforme al Reglamento 2015/340. Para presentarse no se pide el certificado médico (base 3.1.d)', true, '00000000-0000-4000-8000-000000000002', 9),
  ('00000000-0000-4000-8000-000000004010', 'req_inhabilitacion', 'Requisito: inhabilitación', 'No haber sido separado del servicio ni estar inhabilitado (base 3.1.e)', true, '00000000-0000-4000-8000-000000000002', 10),
  ('00000000-0000-4000-8000-000000004011', 'req_idiomas', 'Requisito: idiomas para presentarse', 'No hay que acreditar títulos de idiomas; el nivel se evalúa dentro del proceso', true, '00000000-0000-4000-8000-000000000002', 11),
  ('00000000-0000-4000-8000-000000004012', 'req_licencia', 'Requisito: licencia para presentarse', 'No hace falta licencia para presentarse', true, '00000000-0000-4000-8000-000000000002', 12),
  ('00000000-0000-4000-8000-000000004013', 'contr_plazo', 'Contratación: plazo máximo', '17 meses desde la adjudicación de destino, con gastos a cargo del candidato (base 3.2)', true, '00000000-0000-4000-8000-000000000002', 13),
  ('00000000-0000-4000-8000-000000004014', 'contr_licencia', 'Contratación: licencia', 'Licencia comunitaria de alumno controlador o de controlador, con las habilitaciones ADC (con anotación SUR), APP, APS, ACP y ACS (base 3.2)', true, '00000000-0000-4000-8000-000000000002', 14),
  ('00000000-0000-4000-8000-000000004015', 'contr_idiomas', 'Contratación: idiomas', 'Anotación de inglés con nivel mínimo Operacional (4) y de castellano con nivel Experto (6), en vigor (base 3.2.2)', true, '00000000-0000-4000-8000-000000000002', 15),
  ('00000000-0000-4000-8000-000000004016', 'contr_medico', 'Contratación: certificado médico', 'Certificado médico aeronáutico de Clase 3 válido, con al menos 9 meses de validez al firmar el contrato (base 3.2.3)', true, '00000000-0000-4000-8000-000000000002', 16),
  ('00000000-0000-4000-8000-000000004017', 'contr_otros', 'Contratación: otros requisitos', 'Curso AVSEC; certificado SPSICO expedido en los 30 días anteriores; evaluación de idoneidad en seguridad de la aviación civil (base 3.2)', true, '00000000-0000-4000-8000-000000000002', 17),
  ('00000000-0000-4000-8000-000000004018', 'contr_formacion', 'Contratación: formación inicial', 'La paga el candidato (base 3.2)', true, '00000000-0000-4000-8000-000000000002', 18),
  ('00000000-0000-4000-8000-000000004019', 'f1_pruebas', 'Fase 1: pruebas', 'A. Conocimientos generales (test de 50 preguntas, mínimo 25 puntos). B. Inglés (test de 20 preguntas de nivel C1, mínimo 10 de 20). C. Aptitudes (atención y razonamiento espacial y abstracto, mínimo 25 de 50). D. Personalidad (apto o no apto). Eliminatoria, en una sola jornada', true, '00000000-0000-4000-8000-000000000002', 19),
  ('00000000-0000-4000-8000-000000004020', 'f1_duracion', 'Fase 1: duración total', 'Al menos 4 horas y 30 minutos para las cuatro pruebas seguidas', true, '00000000-0000-4000-8000-000000000001', 20),
  ('00000000-0000-4000-8000-000000004021', 'f1_penalizacion', 'Fase 1: penalización por respuesta errónea', null, false, '00000000-0000-4000-8000-000000000002', 21),
  ('00000000-0000-4000-8000-000000004022', 'f2_pruebas', 'Fase 2: pruebas digitales', 'FEAST y PDEA. Máximo 100 puntos; hay que superar cada test y sumar al menos 50 (base 8)', true, '00000000-0000-4000-8000-000000000002', 22),
  ('00000000-0000-4000-8000-000000004023', 'f2_duracion', 'Fase 2: duración', 'Entre 7 y 8 horas, con una hora de descanso entre las dos pruebas', true, '00000000-0000-4000-8000-000000000001', 23),
  ('00000000-0000-4000-8000-000000004024', 'f3_pruebas', 'Fase 3: pruebas', 'A. Evaluación oral de inglés (nivel C1, mínimo 25 de 50). B. Evaluación conductual y de adaptación (mínimo 60 de 120). C. Evaluación clínica de la personalidad (apto o no apto). Eliminatorias, en la misma jornada', true, '00000000-0000-4000-8000-000000000002', 24)
on conflict (id) do nothing;

-- ---------------------------------------------------------------- Plantilla: materias
insert into public.subjects (id, code, title, track) values
  ('00000000-0000-4000-8000-000000005001', 'temario', 'Temario oficial', 'temario'),
  ('00000000-0000-4000-8000-000000005002', 'aptitudes', 'Aptitudes y psicotécnicos', 'aptitudes'),
  ('00000000-0000-4000-8000-000000005003', 'ingles', 'Inglés C1', 'ingles'),
  ('00000000-0000-4000-8000-000000005004', 'pruebas_digitales', 'Pruebas digitales', 'secuencial')
on conflict (id) do nothing;

-- ---------------------------------------------------------------- Plantilla: temas del Anexo I
insert into public.topics (id, subject_id, number, title, source_id, verified) values
  ('00000000-0000-4000-8000-000000006001', '00000000-0000-4000-8000-000000005001', 1, 'INSTITUCIONES Y LEGISLACIÓN AERONÁUTICA', '00000000-0000-4000-8000-000000000003', true),
  ('00000000-0000-4000-8000-000000006002', '00000000-0000-4000-8000-000000005001', 2, 'CÓDIGOS OACI IATA Y CARACTERÍSTICAS DE AERONAVES', '00000000-0000-4000-8000-000000000003', true),
  ('00000000-0000-4000-8000-000000006003', '00000000-0000-4000-8000-000000005001', 3, 'CONCEPTOS BÁSICOS DE METEOROLOGÍA', '00000000-0000-4000-8000-000000000003', true),
  ('00000000-0000-4000-8000-000000006004', '00000000-0000-4000-8000-000000005001', 4, 'CARTOGRAFÍA', '00000000-0000-4000-8000-000000000003', true),
  ('00000000-0000-4000-8000-000000006005', '00000000-0000-4000-8000-000000005001', 5, 'NAVEGACIÓN AÉREA, EQUIPOS Y SISTEMAS', '00000000-0000-4000-8000-000000000003', true),
  ('00000000-0000-4000-8000-000000006006', '00000000-0000-4000-8000-000000005001', 6, 'PLAN DE VUELO Y GESTIÓN DE LA CAPACIDAD Y AFLUENCIA DE TRÁFICO', '00000000-0000-4000-8000-000000000003', true),
  ('00000000-0000-4000-8000-000000006007', '00000000-0000-4000-8000-000000005001', 7, 'ENTORNO PROFESIONAL', '00000000-0000-4000-8000-000000000003', true),
  ('00000000-0000-4000-8000-000000006008', '00000000-0000-4000-8000-000000005001', 8, 'FACTORES HUMANOS', '00000000-0000-4000-8000-000000000003', true),
  ('00000000-0000-4000-8000-000000006009', '00000000-0000-4000-8000-000000005001', 9, 'AERODINÁMICA Y MECÁNICA DE VUELO', '00000000-0000-4000-8000-000000000003', true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------- Plantilla: tareas (padres primero por la clave foránea propia)
insert into public.tasks (id, phase_id, parent_id, title, explanation, est_minutes, kind, topic_id, source_id, verified, recommended, onboarding_key, sort) values
  ('00000000-0000-4000-8000-000000700010', '00000000-0000-4000-8000-000000003000', null, 'Requisito: nacionalidad', 'Comprueba que eres español, nacional de la UE o de un Estado con libre circulación de trabajadores, familiar de estos o extranjero con residencia legal en España. Se cumple a fecha de fin de plazo.', null, 'tramite', null, '00000000-0000-4000-8000-000000000002', true, false, 'nacionalidad', 1),
  ('00000000-0000-4000-8000-000000700020', '00000000-0000-4000-8000-000000003000', null, 'Requisito: edad', 'Tener 18 años cumplidos y no haber cumplido 65 a fecha de fin de plazo de inscripción.', null, 'tramite', null, '00000000-0000-4000-8000-000000000002', true, false, 'edad', 2),
  ('00000000-0000-4000-8000-000000700030', '00000000-0000-4000-8000-000000003000', null, 'Requisito: titulación', 'Necesitas una titulación que dé acceso a la Universidad (Bachiller o equivalente, o Técnico Superior). Si es extranjera, hace falta homologación o equivalencia.', null, 'tramite', null, '00000000-0000-4000-8000-000000000002', true, false, 'titulacion', 3),
  ('00000000-0000-4000-8000-000000700040', '00000000-0000-4000-8000-000000003000', null, 'Médico Clase 3 inicial en un AeMC autorizado', 'Recomendación, no requisito para presentarse: el certificado médico de Clase 3 es obligatorio para la contratación, así que conviene hacerlo pronto en un centro AeMC acreditado por AESA.', null, 'tramite', null, '00000000-0000-4000-8000-000000000002', true, true, 'medico', 4),
  ('00000000-0000-4000-8000-000000700050', '00000000-0000-4000-8000-000000003000', null, 'Revisar coste y financiación de la formación inicial', 'La formación inicial la paga el candidato. Revisa su coste y las opciones de financiación que publica ENAIRE en el portal de empleo antes de seguir.', null, 'estudio', null, '00000000-0000-4000-8000-000000000002', true, true, null, 5),
  ('00000000-0000-4000-8000-000000710010', '00000000-0000-4000-8000-000000003001', null, 'Leer las bases de la convocatoria', 'Lee las bases de la última convocatoria para conocer requisitos, pruebas, puntuaciones y calendario. Recuerda que cambian entre convocatorias.', null, 'estudio', null, '00000000-0000-4000-8000-000000000002', true, false, null, 1),
  ('00000000-0000-4000-8000-000000710020', '00000000-0000-4000-8000-000000003001', null, 'Leer el Anexo I (temario)', 'Lee los títulos de los 9 temas oficiales y el contenido que ENAIRE publica en PDF en su portal de empleo.', null, 'estudio', null, '00000000-0000-4000-8000-000000000003', true, false, null, 2),
  ('00000000-0000-4000-8000-000000710030', '00000000-0000-4000-8000-000000003001', null, 'Diagnóstico del tema 1: INSTITUCIONES Y LEGISLACIÓN AERONÁUTICA', 'Haz un test propio rápido para saber desde qué nivel partes en este tema. No necesitas material de terceros.', 30, 'practica', '00000000-0000-4000-8000-000000006001', '00000000-0000-4000-8000-000000000003', true, false, null, 3),
  ('00000000-0000-4000-8000-000000710040', '00000000-0000-4000-8000-000000003001', null, 'Diagnóstico del tema 2: CÓDIGOS OACI IATA Y CARACTERÍSTICAS DE AERONAVES', 'Haz un test propio rápido para saber desde qué nivel partes en este tema. No necesitas material de terceros.', 30, 'practica', '00000000-0000-4000-8000-000000006002', '00000000-0000-4000-8000-000000000003', true, false, null, 4),
  ('00000000-0000-4000-8000-000000710050', '00000000-0000-4000-8000-000000003001', null, 'Diagnóstico del tema 3: CONCEPTOS BÁSICOS DE METEOROLOGÍA', 'Haz un test propio rápido para saber desde qué nivel partes en este tema. No necesitas material de terceros.', 30, 'practica', '00000000-0000-4000-8000-000000006003', '00000000-0000-4000-8000-000000000003', true, false, null, 5),
  ('00000000-0000-4000-8000-000000710060', '00000000-0000-4000-8000-000000003001', null, 'Diagnóstico del tema 4: CARTOGRAFÍA', 'Haz un test propio rápido para saber desde qué nivel partes en este tema. No necesitas material de terceros.', 30, 'practica', '00000000-0000-4000-8000-000000006004', '00000000-0000-4000-8000-000000000003', true, false, null, 6),
  ('00000000-0000-4000-8000-000000710070', '00000000-0000-4000-8000-000000003001', null, 'Diagnóstico del tema 5: NAVEGACIÓN AÉREA, EQUIPOS Y SISTEMAS', 'Haz un test propio rápido para saber desde qué nivel partes en este tema. No necesitas material de terceros.', 30, 'practica', '00000000-0000-4000-8000-000000006005', '00000000-0000-4000-8000-000000000003', true, false, null, 7),
  ('00000000-0000-4000-8000-000000710080', '00000000-0000-4000-8000-000000003001', null, 'Diagnóstico del tema 6: PLAN DE VUELO Y GESTIÓN DE LA CAPACIDAD Y AFLUENCIA DE TRÁFICO', 'Haz un test propio rápido para saber desde qué nivel partes en este tema. No necesitas material de terceros.', 30, 'practica', '00000000-0000-4000-8000-000000006006', '00000000-0000-4000-8000-000000000003', true, false, null, 8),
  ('00000000-0000-4000-8000-000000710090', '00000000-0000-4000-8000-000000003001', null, 'Diagnóstico del tema 7: ENTORNO PROFESIONAL', 'Haz un test propio rápido para saber desde qué nivel partes en este tema. No necesitas material de terceros.', 30, 'practica', '00000000-0000-4000-8000-000000006007', '00000000-0000-4000-8000-000000000003', true, false, null, 9),
  ('00000000-0000-4000-8000-000000710100', '00000000-0000-4000-8000-000000003001', null, 'Diagnóstico del tema 8: FACTORES HUMANOS', 'Haz un test propio rápido para saber desde qué nivel partes en este tema. No necesitas material de terceros.', 30, 'practica', '00000000-0000-4000-8000-000000006008', '00000000-0000-4000-8000-000000000003', true, false, null, 10),
  ('00000000-0000-4000-8000-000000710110', '00000000-0000-4000-8000-000000003001', null, 'Diagnóstico del tema 9: AERODINÁMICA Y MECÁNICA DE VUELO', 'Haz un test propio rápido para saber desde qué nivel partes en este tema. No necesitas material de terceros.', 30, 'practica', '00000000-0000-4000-8000-000000006009', '00000000-0000-4000-8000-000000000003', true, false, null, 11),
  ('00000000-0000-4000-8000-000000710120', '00000000-0000-4000-8000-000000003001', null, 'Medir tu nivel de inglés actual', 'El test de inglés de la Fase 1 es de nivel C1. Mide dónde estás hoy para decidir cuánto tiempo dedicar a la Fase 4.', null, 'practica', null, '00000000-0000-4000-8000-000000000002', true, false, null, 12),
  ('00000000-0000-4000-8000-000000720010', '00000000-0000-4000-8000-000000003002', null, 'Tema 1: INSTITUCIONES Y LEGISLACIÓN AERONÁUTICA', 'Estudia este tema oficial del Anexo I con lectura, resumen propio y test al terminar.', null, 'estudio', '00000000-0000-4000-8000-000000006001', '00000000-0000-4000-8000-000000000003', true, false, null, 1),
  ('00000000-0000-4000-8000-000000720020', '00000000-0000-4000-8000-000000003002', null, 'Tema 2: CÓDIGOS OACI IATA Y CARACTERÍSTICAS DE AERONAVES', 'Estudia este tema oficial del Anexo I con lectura, resumen propio y test al terminar.', null, 'estudio', '00000000-0000-4000-8000-000000006002', '00000000-0000-4000-8000-000000000003', true, false, null, 2),
  ('00000000-0000-4000-8000-000000720030', '00000000-0000-4000-8000-000000003002', null, 'Tema 3: CONCEPTOS BÁSICOS DE METEOROLOGÍA', 'Estudia este tema oficial del Anexo I con lectura, resumen propio y test al terminar.', null, 'estudio', '00000000-0000-4000-8000-000000006003', '00000000-0000-4000-8000-000000000003', true, false, null, 3),
  ('00000000-0000-4000-8000-000000720040', '00000000-0000-4000-8000-000000003002', null, 'Tema 4: CARTOGRAFÍA', 'Estudia este tema oficial del Anexo I con lectura, resumen propio y test al terminar.', null, 'estudio', '00000000-0000-4000-8000-000000006004', '00000000-0000-4000-8000-000000000003', true, false, null, 4),
  ('00000000-0000-4000-8000-000000720050', '00000000-0000-4000-8000-000000003002', null, 'Tema 5: NAVEGACIÓN AÉREA, EQUIPOS Y SISTEMAS', 'Estudia este tema oficial del Anexo I con lectura, resumen propio y test al terminar.', null, 'estudio', '00000000-0000-4000-8000-000000006005', '00000000-0000-4000-8000-000000000003', true, false, null, 5),
  ('00000000-0000-4000-8000-000000720060', '00000000-0000-4000-8000-000000003002', null, 'Tema 6: PLAN DE VUELO Y GESTIÓN DE LA CAPACIDAD Y AFLUENCIA DE TRÁFICO', 'Estudia este tema oficial del Anexo I con lectura, resumen propio y test al terminar.', null, 'estudio', '00000000-0000-4000-8000-000000006006', '00000000-0000-4000-8000-000000000003', true, false, null, 6),
  ('00000000-0000-4000-8000-000000720070', '00000000-0000-4000-8000-000000003002', null, 'Tema 7: ENTORNO PROFESIONAL', 'Estudia este tema oficial del Anexo I con lectura, resumen propio y test al terminar.', null, 'estudio', '00000000-0000-4000-8000-000000006007', '00000000-0000-4000-8000-000000000003', true, false, null, 7),
  ('00000000-0000-4000-8000-000000720080', '00000000-0000-4000-8000-000000003002', null, 'Tema 8: FACTORES HUMANOS', 'Estudia este tema oficial del Anexo I con lectura, resumen propio y test al terminar.', null, 'estudio', '00000000-0000-4000-8000-000000006008', '00000000-0000-4000-8000-000000000003', true, false, null, 8),
  ('00000000-0000-4000-8000-000000720090', '00000000-0000-4000-8000-000000003002', null, 'Tema 9: AERODINÁMICA Y MECÁNICA DE VUELO', 'Estudia este tema oficial del Anexo I con lectura, resumen propio y test al terminar.', null, 'estudio', '00000000-0000-4000-8000-000000006009', '00000000-0000-4000-8000-000000000003', true, false, null, 9),
  ('00000000-0000-4000-8000-000000730010', '00000000-0000-4000-8000-000000003003', null, 'Práctica de atención', 'Sesión corta y diaria de práctica de la atención, que forma parte de la prueba C (aptitudes) de la Fase 1. Usa ejercicios propios, sin contenido de terceros.', 20, 'practica', null, '00000000-0000-4000-8000-000000000002', true, false, null, 1),
  ('00000000-0000-4000-8000-000000730020', '00000000-0000-4000-8000-000000003003', null, 'Práctica de razonamiento espacial', 'Sesión corta y diaria de práctica de el razonamiento espacial, que forma parte de la prueba C (aptitudes) de la Fase 1. Usa ejercicios propios, sin contenido de terceros.', 20, 'practica', null, '00000000-0000-4000-8000-000000000002', true, false, null, 2),
  ('00000000-0000-4000-8000-000000730030', '00000000-0000-4000-8000-000000003003', null, 'Práctica de razonamiento abstracto', 'Sesión corta y diaria de práctica de el razonamiento abstracto, que forma parte de la prueba C (aptitudes) de la Fase 1. Usa ejercicios propios, sin contenido de terceros.', 20, 'practica', null, '00000000-0000-4000-8000-000000000002', true, false, null, 3),
  ('00000000-0000-4000-8000-000000740010', '00000000-0000-4000-8000-000000003004', null, 'Inglés: lectura y uso del inglés', 'Practica la lectura y el uso del inglés para alcanzar el nivel C1 que ENAIRE evalúa. El certificado de Cambridge no se exige; sus materiales sirven solo como práctica.', null, 'practica', null, '00000000-0000-4000-8000-000000000002', true, false, null, 1),
  ('00000000-0000-4000-8000-000000740020', '00000000-0000-4000-8000-000000003004', null, 'Inglés: escritura', 'Practica la escritura para alcanzar el nivel C1 que ENAIRE evalúa. El certificado de Cambridge no se exige; sus materiales sirven solo como práctica.', null, 'practica', null, '00000000-0000-4000-8000-000000000002', true, false, null, 2),
  ('00000000-0000-4000-8000-000000740030', '00000000-0000-4000-8000-000000003004', null, 'Inglés: comprensión oral', 'Practica la comprensión oral para alcanzar el nivel C1 que ENAIRE evalúa. El certificado de Cambridge no se exige; sus materiales sirven solo como práctica.', null, 'practica', null, '00000000-0000-4000-8000-000000000002', true, false, null, 3),
  ('00000000-0000-4000-8000-000000740040', '00000000-0000-4000-8000-000000003004', null, 'Inglés: expresión oral', 'Practica la expresión oral para alcanzar el nivel C1 que ENAIRE evalúa. El certificado de Cambridge no se exige; sus materiales sirven solo como práctica.', null, 'practica', null, '00000000-0000-4000-8000-000000000002', true, false, null, 4),
  ('00000000-0000-4000-8000-000000740050', '00000000-0000-4000-8000-000000003004', null, 'Fraseología aeronáutica', 'Vocabulario y fraseología aeronáutica en inglés, con tarjetas escritas por ti. Es un apoyo opcional para la entrevista y el trabajo posterior.', null, 'estudio', null, null, true, true, null, 5),
  ('00000000-0000-4000-8000-000000750010', '00000000-0000-4000-8000-000000003005', null, 'Plataforma oficial de práctica FEAST', 'Practica con la plataforma gratuita de Eurocontrol: haz cada prueba, revisa el resultado y repítela una o dos veces. Eurocontrol orienta a un máximo de unas 8 horas en total. No cubre FEAST II y la cuenta caduca a los 6 meses.', null, 'practica', null, '00000000-0000-4000-8000-000000000018', true, false, null, 1),
  ('00000000-0000-4000-8000-000000750020', '00000000-0000-4000-8000-000000003005', null, 'PDEA (Prueba Digital en Entorno ATC)', 'Prueba propia de ENAIRE de la Fase 2. No hay descripción oficial de su contenido ni material de práctica, así que no se puede planificar con datos oficiales.', null, 'practica', null, '00000000-0000-4000-8000-000000000002', false, false, null, 2),
  ('00000000-0000-4000-8000-000000760010', '00000000-0000-4000-8000-000000003006', null, 'Simulacros completos de la Fase 1', 'Hacer las cuatro pruebas de la Fase 1 seguidas y cronometradas. Las bases hablan de una duración de al menos 4 h 30 min en total.', 270, 'practica', null, '00000000-0000-4000-8000-000000000001', true, false, null, 1),
  ('00000000-0000-4000-8000-000000760020', '00000000-0000-4000-8000-000000003006', null, 'Análisis de errores', 'Tras cada simulacro, revisa tus fallos, identifica por qué los cometes y vuelve a los temas o aptitudes que lo necesiten.', null, 'estudio', null, null, true, false, null, 2),
  ('00000000-0000-4000-8000-000000770010', '00000000-0000-4000-8000-000000003007', null, 'Preparar la entrevista oral de inglés', 'Prueba A de la Fase 3: entrevista de nivel C1, presencial o telemática. Practica hablar con fluidez sobre temas generales y profesionales.', null, 'practica', null, '00000000-0000-4000-8000-000000000002', true, false, null, 1),
  ('00000000-0000-4000-8000-000000770020', '00000000-0000-4000-8000-000000003007', null, 'Preparar la evaluación conductual', 'Prueba B de la Fase 3: evaluación conductual y de adaptación al entorno profesional.', null, 'practica', null, '00000000-0000-4000-8000-000000000002', true, false, null, 2),
  ('00000000-0000-4000-8000-000000770030', '00000000-0000-4000-8000-000000003007', null, 'Preparar la evaluación clínica de la personalidad', 'Prueba C de la Fase 3, de resultado apto o no apto. Infórmate de en qué consiste y cuida el descanso previo.', null, 'practica', null, '00000000-0000-4000-8000-000000000002', true, false, null, 3),
  ('00000000-0000-4000-8000-000000780010', '00000000-0000-4000-8000-000000003008', null, 'Formación inicial en una escuela certificada', 'Formación básica y de habilitación en una escuela certificada, pagada por el candidato. Para aprobar hace falta al menos un 75 % en los exámenes.', null, 'hito', null, '00000000-0000-4000-8000-000000000014', true, false, null, 1),
  ('00000000-0000-4000-8000-000000780020', '00000000-0000-4000-8000-000000003008', null, 'Licencia de alumno (SATCO)', 'Solicitud de la licencia de alumno ante AESA.', null, 'hito', null, '00000000-0000-4000-8000-000000000008', true, false, null, 2),
  ('00000000-0000-4000-8000-000000780030', '00000000-0000-4000-8000-000000003008', null, 'Resto de requisitos de contratación', 'Reunir los requisitos de contratación (licencia, idiomas, médico de Clase 3, AVSEC y SPSICO) en un máximo de 17 meses.', null, 'hito', null, '00000000-0000-4000-8000-000000000002', true, false, null, 3),
  ('00000000-0000-4000-8000-000000780040', '00000000-0000-4000-8000-000000003008', null, 'Formación de unidad en ENAIRE', 'Transición, pre-OJT si la unidad es compleja y formación en el puesto con instructor.', null, 'hito', null, '00000000-0000-4000-8000-000000000008', true, false, null, 4),
  ('00000000-0000-4000-8000-000000780050', '00000000-0000-4000-8000-000000003008', null, 'Licencia de controlador (ATCO)', 'Licencia de controlador que expide AESA, en formato electrónico.', null, 'hito', null, '00000000-0000-4000-8000-000000000008', true, false, null, 5),
  ('00000000-0000-4000-8000-000000720011', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720010', 'Leer el PDF oficial del tema', 'Lee el PDF oficial que ENAIRE publica en su portal de empleo para este tema.', 240, 'estudio', '00000000-0000-4000-8000-000000006001', '00000000-0000-4000-8000-000000000001', true, false, null, 1),
  ('00000000-0000-4000-8000-000000720012', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720010', 'Resumen propio', 'Redacta con tus palabras un resumen del tema. No copies apuntes de terceros.', 120, 'estudio', '00000000-0000-4000-8000-000000006001', null, true, false, null, 2),
  ('00000000-0000-4000-8000-000000720013', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720010', 'Test propio al terminar', 'Escribe y resuelve preguntas propias sobre el tema para comprobar lo aprendido.', 60, 'practica', '00000000-0000-4000-8000-000000006001', null, true, false, null, 3),
  ('00000000-0000-4000-8000-000000720021', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720020', 'Leer el PDF oficial del tema', 'Lee el PDF oficial que ENAIRE publica en su portal de empleo para este tema.', 240, 'estudio', '00000000-0000-4000-8000-000000006002', '00000000-0000-4000-8000-000000000001', true, false, null, 1),
  ('00000000-0000-4000-8000-000000720022', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720020', 'Resumen propio', 'Redacta con tus palabras un resumen del tema. No copies apuntes de terceros.', 120, 'estudio', '00000000-0000-4000-8000-000000006002', null, true, false, null, 2),
  ('00000000-0000-4000-8000-000000720023', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720020', 'Test propio al terminar', 'Escribe y resuelve preguntas propias sobre el tema para comprobar lo aprendido.', 60, 'practica', '00000000-0000-4000-8000-000000006002', null, true, false, null, 3),
  ('00000000-0000-4000-8000-000000720031', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720030', 'Leer el PDF oficial del tema', 'Lee el PDF oficial que ENAIRE publica en su portal de empleo para este tema.', 240, 'estudio', '00000000-0000-4000-8000-000000006003', '00000000-0000-4000-8000-000000000001', true, false, null, 1),
  ('00000000-0000-4000-8000-000000720032', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720030', 'Resumen propio', 'Redacta con tus palabras un resumen del tema. No copies apuntes de terceros.', 120, 'estudio', '00000000-0000-4000-8000-000000006003', null, true, false, null, 2),
  ('00000000-0000-4000-8000-000000720033', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720030', 'Test propio al terminar', 'Escribe y resuelve preguntas propias sobre el tema para comprobar lo aprendido.', 60, 'practica', '00000000-0000-4000-8000-000000006003', null, true, false, null, 3),
  ('00000000-0000-4000-8000-000000720041', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720040', 'Leer el PDF oficial del tema', 'Lee el PDF oficial que ENAIRE publica en su portal de empleo para este tema.', 240, 'estudio', '00000000-0000-4000-8000-000000006004', '00000000-0000-4000-8000-000000000001', true, false, null, 1),
  ('00000000-0000-4000-8000-000000720042', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720040', 'Resumen propio', 'Redacta con tus palabras un resumen del tema. No copies apuntes de terceros.', 120, 'estudio', '00000000-0000-4000-8000-000000006004', null, true, false, null, 2),
  ('00000000-0000-4000-8000-000000720043', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720040', 'Test propio al terminar', 'Escribe y resuelve preguntas propias sobre el tema para comprobar lo aprendido.', 60, 'practica', '00000000-0000-4000-8000-000000006004', null, true, false, null, 3),
  ('00000000-0000-4000-8000-000000720051', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720050', 'Leer el PDF oficial del tema', 'Lee el PDF oficial que ENAIRE publica en su portal de empleo para este tema.', 240, 'estudio', '00000000-0000-4000-8000-000000006005', '00000000-0000-4000-8000-000000000001', true, false, null, 1),
  ('00000000-0000-4000-8000-000000720052', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720050', 'Resumen propio', 'Redacta con tus palabras un resumen del tema. No copies apuntes de terceros.', 120, 'estudio', '00000000-0000-4000-8000-000000006005', null, true, false, null, 2),
  ('00000000-0000-4000-8000-000000720053', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720050', 'Test propio al terminar', 'Escribe y resuelve preguntas propias sobre el tema para comprobar lo aprendido.', 60, 'practica', '00000000-0000-4000-8000-000000006005', null, true, false, null, 3),
  ('00000000-0000-4000-8000-000000720061', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720060', 'Leer el PDF oficial del tema', 'Lee el PDF oficial que ENAIRE publica en su portal de empleo para este tema.', 240, 'estudio', '00000000-0000-4000-8000-000000006006', '00000000-0000-4000-8000-000000000001', true, false, null, 1),
  ('00000000-0000-4000-8000-000000720062', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720060', 'Resumen propio', 'Redacta con tus palabras un resumen del tema. No copies apuntes de terceros.', 120, 'estudio', '00000000-0000-4000-8000-000000006006', null, true, false, null, 2),
  ('00000000-0000-4000-8000-000000720063', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720060', 'Test propio al terminar', 'Escribe y resuelve preguntas propias sobre el tema para comprobar lo aprendido.', 60, 'practica', '00000000-0000-4000-8000-000000006006', null, true, false, null, 3),
  ('00000000-0000-4000-8000-000000720071', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720070', 'Leer el PDF oficial del tema', 'Lee el PDF oficial que ENAIRE publica en su portal de empleo para este tema.', 240, 'estudio', '00000000-0000-4000-8000-000000006007', '00000000-0000-4000-8000-000000000001', true, false, null, 1),
  ('00000000-0000-4000-8000-000000720072', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720070', 'Resumen propio', 'Redacta con tus palabras un resumen del tema. No copies apuntes de terceros.', 120, 'estudio', '00000000-0000-4000-8000-000000006007', null, true, false, null, 2),
  ('00000000-0000-4000-8000-000000720073', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720070', 'Test propio al terminar', 'Escribe y resuelve preguntas propias sobre el tema para comprobar lo aprendido.', 60, 'practica', '00000000-0000-4000-8000-000000006007', null, true, false, null, 3),
  ('00000000-0000-4000-8000-000000720081', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720080', 'Leer el PDF oficial del tema', 'Lee el PDF oficial que ENAIRE publica en su portal de empleo para este tema.', 240, 'estudio', '00000000-0000-4000-8000-000000006008', '00000000-0000-4000-8000-000000000001', true, false, null, 1),
  ('00000000-0000-4000-8000-000000720082', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720080', 'Resumen propio', 'Redacta con tus palabras un resumen del tema. No copies apuntes de terceros.', 120, 'estudio', '00000000-0000-4000-8000-000000006008', null, true, false, null, 2),
  ('00000000-0000-4000-8000-000000720083', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720080', 'Test propio al terminar', 'Escribe y resuelve preguntas propias sobre el tema para comprobar lo aprendido.', 60, 'practica', '00000000-0000-4000-8000-000000006008', null, true, false, null, 3),
  ('00000000-0000-4000-8000-000000720091', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720090', 'Leer el PDF oficial del tema', 'Lee el PDF oficial que ENAIRE publica en su portal de empleo para este tema.', 240, 'estudio', '00000000-0000-4000-8000-000000006009', '00000000-0000-4000-8000-000000000001', true, false, null, 1),
  ('00000000-0000-4000-8000-000000720092', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720090', 'Resumen propio', 'Redacta con tus palabras un resumen del tema. No copies apuntes de terceros.', 120, 'estudio', '00000000-0000-4000-8000-000000006009', null, true, false, null, 2),
  ('00000000-0000-4000-8000-000000720093', '00000000-0000-4000-8000-000000003002', '00000000-0000-4000-8000-000000720090', 'Test propio al terminar', 'Escribe y resuelve preguntas propias sobre el tema para comprobar lo aprendido.', 60, 'practica', '00000000-0000-4000-8000-000000006009', null, true, false, null, 3)
on conflict (id) do nothing;

insert into public.task_dependencies (task_id, depends_on_id) values
  ('00000000-0000-4000-8000-000000720012', '00000000-0000-4000-8000-000000720011'),
  ('00000000-0000-4000-8000-000000720013', '00000000-0000-4000-8000-000000720012'),
  ('00000000-0000-4000-8000-000000720022', '00000000-0000-4000-8000-000000720021'),
  ('00000000-0000-4000-8000-000000720023', '00000000-0000-4000-8000-000000720022'),
  ('00000000-0000-4000-8000-000000720032', '00000000-0000-4000-8000-000000720031'),
  ('00000000-0000-4000-8000-000000720033', '00000000-0000-4000-8000-000000720032'),
  ('00000000-0000-4000-8000-000000720042', '00000000-0000-4000-8000-000000720041'),
  ('00000000-0000-4000-8000-000000720043', '00000000-0000-4000-8000-000000720042'),
  ('00000000-0000-4000-8000-000000720052', '00000000-0000-4000-8000-000000720051'),
  ('00000000-0000-4000-8000-000000720053', '00000000-0000-4000-8000-000000720052'),
  ('00000000-0000-4000-8000-000000720062', '00000000-0000-4000-8000-000000720061'),
  ('00000000-0000-4000-8000-000000720063', '00000000-0000-4000-8000-000000720062'),
  ('00000000-0000-4000-8000-000000720072', '00000000-0000-4000-8000-000000720071'),
  ('00000000-0000-4000-8000-000000720073', '00000000-0000-4000-8000-000000720072'),
  ('00000000-0000-4000-8000-000000720082', '00000000-0000-4000-8000-000000720081'),
  ('00000000-0000-4000-8000-000000720083', '00000000-0000-4000-8000-000000720082'),
  ('00000000-0000-4000-8000-000000720092', '00000000-0000-4000-8000-000000720091'),
  ('00000000-0000-4000-8000-000000720093', '00000000-0000-4000-8000-000000720092')
on conflict (task_id, depends_on_id) do nothing;

insert into public.task_links (task_id, source_id, role) values
  ('00000000-0000-4000-8000-000000700010', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000700020', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000700030', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000700040', '00000000-0000-4000-8000-000000000009', 'oficial'),
  ('00000000-0000-4000-8000-000000700050', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000710010', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000710010', '00000000-0000-4000-8000-000000000001', 'oficial'),
  ('00000000-0000-4000-8000-000000710020', '00000000-0000-4000-8000-000000000003', 'oficial'),
  ('00000000-0000-4000-8000-000000720011', '00000000-0000-4000-8000-000000000001', 'oficial'),
  ('00000000-0000-4000-8000-000000720021', '00000000-0000-4000-8000-000000000001', 'oficial'),
  ('00000000-0000-4000-8000-000000720031', '00000000-0000-4000-8000-000000000001', 'oficial'),
  ('00000000-0000-4000-8000-000000720041', '00000000-0000-4000-8000-000000000001', 'oficial'),
  ('00000000-0000-4000-8000-000000720051', '00000000-0000-4000-8000-000000000001', 'oficial'),
  ('00000000-0000-4000-8000-000000720061', '00000000-0000-4000-8000-000000000001', 'oficial'),
  ('00000000-0000-4000-8000-000000720071', '00000000-0000-4000-8000-000000000001', 'oficial'),
  ('00000000-0000-4000-8000-000000720081', '00000000-0000-4000-8000-000000000001', 'oficial'),
  ('00000000-0000-4000-8000-000000720091', '00000000-0000-4000-8000-000000000001', 'oficial'),
  ('00000000-0000-4000-8000-000000730010', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000730020', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000730030', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000740010', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000740010', '00000000-0000-4000-8000-000000000020', 'recomendado'),
  ('00000000-0000-4000-8000-000000740020', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000740020', '00000000-0000-4000-8000-000000000020', 'recomendado'),
  ('00000000-0000-4000-8000-000000740030', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000740030', '00000000-0000-4000-8000-000000000020', 'recomendado'),
  ('00000000-0000-4000-8000-000000740040', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000740040', '00000000-0000-4000-8000-000000000020', 'recomendado'),
  ('00000000-0000-4000-8000-000000750010', '00000000-0000-4000-8000-000000000018', 'oficial'),
  ('00000000-0000-4000-8000-000000750010', '00000000-0000-4000-8000-000000000017', 'oficial'),
  ('00000000-0000-4000-8000-000000760010', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000770010', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000770020', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000770030', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000780010', '00000000-0000-4000-8000-000000000014', 'oficial'),
  ('00000000-0000-4000-8000-000000780020', '00000000-0000-4000-8000-000000000008', 'oficial'),
  ('00000000-0000-4000-8000-000000780030', '00000000-0000-4000-8000-000000000002', 'oficial'),
  ('00000000-0000-4000-8000-000000780040', '00000000-0000-4000-8000-000000000008', 'oficial'),
  ('00000000-0000-4000-8000-000000780050', '00000000-0000-4000-8000-000000000008', 'oficial')
on conflict (task_id, source_id) do nothing;
