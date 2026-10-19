begin;
create extension if not exists pgtap with schema extensions;
select set_config('search_path', 'public, ' || quote_ident(n.nspname), true) from pg_extension e join pg_namespace n on n.oid = e.extnamespace where e.extname = 'pgtap';
select plan(12);

select has_table('public', 'sources', 'existe sources');
select has_table('public', 'exam_calls', 'existe exam_calls');
select has_table('public', 'exam_call_events', 'existe exam_call_events');
select has_table('public', 'profiles', 'existe profiles');

-- Usuario A (con contraseña) y usuario B (sin contraseña, como un usuario de Google).
insert into auth.users (id, instance_id, aud, role, email, encrypted_password, raw_user_meta_data, created_at, updated_at)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
  'torre-test-a@example.invalid', 'x', '{"full_name": "Usuario A"}'::jsonb, now(), now()
);
insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values (
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
  'torre-test-b@example.invalid', '{"full_name": "Usuario B"}'::jsonb, now(), now()
);

select results_eq(
  $$ select count(*)::int from public.profiles
     where id in ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb') $$,
  array[2],
  'el trigger crea un perfil por usuario, también sin contraseña'
);

-- Sesión como usuario A.
set local role authenticated;
select set_config(
  'request.jwt.claims',
  '{"sub": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", "role": "authenticated"}',
  true
);

select results_eq(
  $$ select count(*)::int from public.profiles $$,
  array[1],
  'A solo ve su propio perfil'
);

select results_eq(
  $$ with u as (
       update public.profiles set display_name = 'x'
       where id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' returning 1
     ) select count(*)::int from u $$,
  array[0],
  'A no puede actualizar el perfil de B'
);

reset role;
select is(
  (select display_name from public.profiles where id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),
  'Usuario B',
  'el perfil de B no ha cambiado'
);

set local role authenticated;
select set_config(
  'request.jwt.claims',
  '{"sub": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", "role": "authenticated"}',
  true
);

select throws_ok(
  $$ insert into public.sources (url, title, publisher, level, consulted_on)
     values ('https://example.invalid', 't', 'p', 'C', current_date) $$,
  '42501',
  null,
  'un usuario autenticado no puede escribir en sources'
);

select ok(
  (select count(*) from public.exam_calls) > 0,
  'un usuario autenticado lee exam_calls'
);

-- Sesión anónima.
reset role;
select set_config('request.jwt.claims', '', true);
set local role anon;

select is((select count(*)::int from public.profiles), 0, 'anon no ve perfiles');
select is((select count(*)::int from public.sources), 0, 'anon no ve sources');

select * from finish();
rollback;
