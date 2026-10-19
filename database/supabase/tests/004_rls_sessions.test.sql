begin;
create extension if not exists pgtap with schema extensions;
select set_config('search_path', 'public, ' || quote_ident(n.nspname), true) from pg_extension e join pg_namespace n on n.oid = e.extnamespace where e.extname = 'pgtap';
select plan(7);

select has_table('public', 'study_sessions', 'existe study_sessions');

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'torre-test-a@example.invalid', '{}'::jsonb, now(), now()),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'torre-test-b@example.invalid', '{}'::jsonb, now(), now());

-- Datos sembrados como superusuario: A tiene una sesión cerrada, B una en marcha.
insert into public.study_sessions (user_id, started_at, ended_at, origin)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', now() - interval '2 hours', now() - interval '1 hour', 'manual'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', now() - interval '30 minutes', null, 'cronometro');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", "role": "authenticated"}', true);

select results_eq($$ select count(*)::int from public.study_sessions $$, array[1], 'A solo ve sus sesiones');
select results_eq(
  $$ select count(*)::int from public.study_sessions where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' $$,
  array[0], 'A no ve las sesiones de B'
);
select throws_ok(
  $$ insert into public.study_sessions (user_id, started_at, origin) values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', now(), 'cronometro') $$,
  '42501', null, 'A no inserta sesiones a nombre de B'
);
select lives_ok(
  $$ insert into public.study_sessions (started_at, origin) values (now(), 'cronometro') $$,
  'A abre una sesión'
);
select throws_ok(
  $$ insert into public.study_sessions (started_at, origin) values (now(), 'cronometro') $$,
  '23505', null, 'una segunda sesión abierta del mismo usuario falla'
);

select set_config('request.jwt.claims', '', true);
set local role anon;
select is((select count(*)::int from public.study_sessions), 0, 'anon no ve study_sessions');

select * from finish();
rollback;
