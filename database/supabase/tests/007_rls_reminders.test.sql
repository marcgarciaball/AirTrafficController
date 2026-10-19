begin;
create extension if not exists pgtap with schema extensions;
select set_config('search_path', 'public, ' || quote_ident(n.nspname), true) from pg_extension e join pg_namespace n on n.oid = e.extnamespace where e.extname = 'pgtap';
select plan(7);

select has_table('public', 'reminders', 'existe reminders');

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'torre-test-a@example.invalid', '{}'::jsonb, now(), now()),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'torre-test-b@example.invalid', '{}'::jsonb, now(), now());

insert into public.reminders (user_id, title, due_at)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'a', now()),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'b', now());

set local role authenticated;
select set_config('request.jwt.claims', '{"sub": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", "role": "authenticated"}', true);

select results_eq($$ select count(*)::int from public.reminders $$, array[1], 'A solo ve sus recordatorios');
select results_eq(
  $$ select count(*)::int from public.reminders where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' $$,
  array[0], 'A no ve los recordatorios de B'
);
select lives_ok(
  $$ insert into public.reminders (title, due_at) values ('mio', now()) $$,
  'A inserta con user_id por defecto'
);
select throws_ok(
  $$ insert into public.reminders (user_id, title, due_at) values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'x', now()) $$,
  '42501', null, 'A no inserta a nombre de B'
);
select results_eq(
  $$ with u as (update public.reminders set done = true where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' returning 1) select count(*)::int from u $$,
  array[0], 'A no actualiza recordatorios de B'
);

select set_config('request.jwt.claims', '', true);
set local role anon;
select is((select count(*)::int from public.reminders), 0, 'anon no ve reminders');

select * from finish();
rollback;
