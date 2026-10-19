begin;
create extension if not exists pgtap with schema extensions;
select set_config('search_path', 'public, ' || quote_ident(n.nspname), true) from pg_extension e join pg_namespace n on n.oid = e.extnamespace where e.extname = 'pgtap';
select plan(13);

select has_table('public', 'english_logs', 'existe english_logs');
select has_table('public', 'language_endorsements', 'existe language_endorsements');
select has_table('public', 'flashcards', 'existe flashcards');

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'torre-test-a@example.invalid', '{}'::jsonb, now(), now()),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'torre-test-b@example.invalid', '{}'::jsonb, now(), now());

-- Datos sembrados como superusuario: uno de cada tabla para A y para B.
insert into public.english_logs (user_id, goal, skill, score, max_score) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'c1', 'reading', 15, 20),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'c1', 'writing', 10, 20);
insert into public.language_endorsements (user_id, language, level, assessed_on) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'en', 4, '2026-01-10'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'es', 6, '2026-01-10');
insert into public.flashcards (user_id, deck, front, back) values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'vocabulario', 'runway', 'pista'),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'fraseologia', 'say again', 'repita');

set local role authenticated;
select set_config('request.jwt.claims', '{"sub": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", "role": "authenticated"}', true);

select results_eq($$ select count(*)::int from public.english_logs $$, array[1], 'A solo ve sus registros de inglés');
select results_eq($$ select count(*)::int from public.language_endorsements $$, array[1], 'A solo ve sus anotaciones');
select results_eq($$ select count(*)::int from public.flashcards $$, array[1], 'A solo ve sus tarjetas');
select throws_ok(
  $$ insert into public.flashcards (user_id, deck, front, back) values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'vocabulario', 'x', 'y') $$,
  '42501', null, 'A no inserta tarjetas a nombre de B'
);
select throws_ok(
  $$ insert into public.english_logs (user_id, goal, skill) values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'c1', 'reading') $$,
  '42501', null, 'A no inserta registros a nombre de B'
);
select throws_ok(
  $$ insert into public.language_endorsements (user_id, language, level, assessed_on) values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'en', 4, '2026-01-01') $$,
  '42501', null, 'A no inserta anotaciones a nombre de B'
);
select lives_ok(
  $$ insert into public.language_endorsements (language, level, assessed_on) values ('en', 5, '2026-02-01') $$,
  'A inserta una anotación propia (user_id por defecto)'
);
select throws_ok(
  $$ insert into public.language_endorsements (language, level, assessed_on) values ('en', 3, '2026-02-01') $$,
  '23514', null, 'el nivel debe estar entre 4 y 6'
);
with u as (update public.flashcards set reps = 9 where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' returning 1)
select is((select count(*)::int from u), 0, 'A no modifica tarjetas de B');

select set_config('request.jwt.claims', '', true);
set local role anon;
select is(
  (select count(*)::int from public.flashcards) + (select count(*)::int from public.english_logs) + (select count(*)::int from public.language_endorsements),
  0, 'anon no ve nada de inglés'
);

select * from finish();
rollback;
