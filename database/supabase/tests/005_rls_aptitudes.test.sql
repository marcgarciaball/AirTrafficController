begin;
create extension if not exists pgtap with schema extensions;
select set_config('search_path', 'public, ' || quote_ident(n.nspname), true) from pg_extension e join pg_namespace n on n.oid = e.extnamespace where e.extname = 'pgtap';
select plan(8);

select has_table('public', 'aptitude_results', 'existe aptitude_results');

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'torre-test-a@example.invalid', '{}'::jsonb, now(), now()),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'torre-test-b@example.invalid', '{}'::jsonb, now(), now());

-- Datos sembrados como superusuario.
insert into public.aptitude_results (user_id, kind, level, score, total, duration_s)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'atencion', 1, 7, 8, 120),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'memoria', 2, 4, 6, 90);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", "role": "authenticated"}', true);

select results_eq($$ select count(*)::int from public.aptitude_results $$, array[1], 'A solo ve sus resultados');
select results_eq(
  $$ select count(*)::int from public.aptitude_results where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' $$,
  array[0], 'A no ve los resultados de B'
);
select lives_ok(
  $$ insert into public.aptitude_results (kind, level, score, total, duration_s) values ('espacial', 2, 5, 8, 100) $$,
  'A inserta un resultado propio (user_id por defecto)'
);
select throws_ok(
  $$ insert into public.aptitude_results (user_id, kind, level, score, total, duration_s)
     values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'atencion', 1, 1, 8, 10) $$,
  '42501', null, 'A no inserta resultados a nombre de B'
);
select throws_ok(
  $$ insert into public.aptitude_results (kind, level, score, total, duration_s) values ('otra', 1, 1, 8, 10) $$,
  '23514', null, 'kind fuera de la lista se rechaza'
);
select is_empty(
  $$ update public.aptitude_results set score = 0 where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' returning 1 $$,
  'A no modifica resultados de B'
);

select set_config('request.jwt.claims', '', true);
set local role anon;
select is((select count(*)::int from public.aptitude_results), 0, 'anon no ve aptitude_results');

select * from finish();
rollback;
