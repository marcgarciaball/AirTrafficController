begin;
create extension if not exists pgtap with schema extensions;
select set_config('search_path', 'public, ' || quote_ident(n.nspname), true) from pg_extension e join pg_namespace n on n.oid = e.extnamespace where e.extname = 'pgtap';
select plan(31);

select has_table('public', 'facts', 'existe facts');
select has_table('public', 'phases', 'existe phases');
select has_table('public', 'subjects', 'existe subjects');
select has_table('public', 'topics', 'existe topics');
select has_table('public', 'tasks', 'existe tasks');
select has_table('public', 'task_dependencies', 'existe task_dependencies');
select has_table('public', 'task_links', 'existe task_links');
select has_table('public', 'user_task_progress', 'existe user_task_progress');

-- Plantilla global.
select results_eq(
  $$ select count(*)::int from public.phases where number between 0 and 8 $$,
  array[9],
  'existen las 9 fases (0 a 8)'
);
select results_eq(
  $$ select count(*)::int from public.topics $$,
  array[9],
  'existen los 9 temas del Anexo I'
);
select results_eq(
  $$ select count(*)::int from public.tasks where parent_id is null and topic_id is not null
     and phase_id = (select id from public.phases where number = 2) $$,
  array[9],
  'la fase 2 tiene una tarea padre por tema'
);
select results_eq(
  $$ select count(*)::int from public.task_dependencies $$,
  array[18],
  'hay 18 dependencias (resumen tras lectura y test tras resumen, por tema)'
);

-- Usuarios A y B.
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
  'torre-test-a@example.invalid', '{"full_name": "Usuario A"}'::jsonb, now(), now()
);
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values (
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
  'torre-test-b@example.invalid', '{"full_name": "Usuario B"}'::jsonb, now(), now()
);

-- Progreso sembrado como superusuario: A en 'nacionalidad', B en 'edad'.
insert into public.user_task_progress (user_id, task_id, status)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', (select id from public.tasks where onboarding_key = 'nacionalidad'), 'hecha'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', (select id from public.tasks where onboarding_key = 'edad'), 'pendiente');

-- Sesión como usuario A.
set local role authenticated;
select set_config(
  'request.jwt.claims',
  '{"sub": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", "role": "authenticated"}',
  true
);

select results_eq(
  $$ select count(*)::int from public.phases $$,
  array[9],
  'un usuario autenticado lee phases'
);
select ok((select count(*) from public.facts) > 0, 'un usuario autenticado lee facts');
select ok((select count(*) from public.tasks) > 0, 'un usuario autenticado lee tasks');
select ok((select count(*) from public.topics) > 0, 'un usuario autenticado lee topics');

select throws_ok(
  $$ insert into public.phases (id, number, title, summary, track)
     values (gen_random_uuid(), 99, 't', 's', 'base') $$,
  '42501',
  null,
  'un usuario autenticado no puede insertar en phases'
);
select throws_ok(
  $$ insert into public.tasks (id, phase_id, title, explanation, kind)
     values (gen_random_uuid(), (select id from public.phases where number = 0), 't', 'e', 'hito') $$,
  '42501',
  null,
  'un usuario autenticado no puede insertar en tasks'
);
select throws_ok(
  $$ insert into public.facts (id, key, label, source_id)
     values (gen_random_uuid(), 'x', 'x', (select id from public.sources limit 1)) $$,
  '42501',
  null,
  'un usuario autenticado no puede insertar en facts'
);

select results_eq(
  $$ select count(*)::int from public.user_task_progress $$,
  array[1],
  'A solo ve su propio progreso'
);
select results_eq(
  $$ select count(*)::int from public.user_task_progress
     where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' $$,
  array[0],
  'A no ve el progreso de B'
);
select results_eq(
  $$ with u as (
       update public.user_task_progress set status = 'hecha'
       where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' returning 1
     ) select count(*)::int from u $$,
  array[0],
  'A no puede modificar el progreso de B'
);
select results_eq(
  $$ with d as (
       delete from public.user_task_progress
       where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' returning 1
     ) select count(*)::int from d $$,
  array[0],
  'A no puede borrar el progreso de B'
);
select throws_ok(
  $$ insert into public.user_task_progress (user_id, task_id, status)
     values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', (select id from public.tasks where onboarding_key = 'medico'), 'hecha') $$,
  '42501',
  null,
  'A no puede insertar progreso a nombre de B'
);
select lives_ok(
  $$ insert into public.user_task_progress (user_id, task_id, status)
     values ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', (select id from public.tasks where onboarding_key = 'titulacion'), 'en_curso') $$,
  'A puede insertar su propio progreso'
);
select results_eq(
  $$ with u as (
       update public.user_task_progress set status = 'hecha'
       where user_id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
         and task_id = (select id from public.tasks where onboarding_key = 'titulacion') returning 1
     ) select count(*)::int from u $$,
  array[1],
  'A puede actualizar su propio progreso'
);

reset role;
select is(
  (select status from public.user_task_progress
   where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'
     and task_id = (select id from public.tasks where onboarding_key = 'edad')),
  'pendiente',
  'el progreso de B no ha cambiado'
);

-- Sesión anónima.
select set_config('request.jwt.claims', '', true);
set local role anon;

select is((select count(*)::int from public.phases), 0, 'anon no ve phases');
select is((select count(*)::int from public.facts), 0, 'anon no ve facts');
select is((select count(*)::int from public.tasks), 0, 'anon no ve tasks');
select is((select count(*)::int from public.user_task_progress), 0, 'anon no ve user_task_progress');

select * from finish();
rollback;
