begin;
create extension if not exists pgtap with schema extensions;
select set_config('search_path', 'public, ' || quote_ident(n.nspname), true) from pg_extension e join pg_namespace n on n.oid = e.extnamespace where e.extname = 'pgtap';
select plan(15);

select has_table('public', 'topic_sections', 'existe topic_sections');
select has_table('public', 'questions', 'existe questions');
select has_table('public', 'quiz_attempts', 'existe quiz_attempts');

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'torre-test-a@example.invalid', '{}'::jsonb, now(), now()),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'torre-test-b@example.invalid', '{}'::jsonb, now(), now());

-- Datos sembrados como superusuario.
insert into public.topic_sections (id, topic_id, sort, title, body_md, source_pages)
values ('f0000000-0000-4000-8001-000000000001', (select id from public.topics where number = 1), 1, 't', 'b', 'pp. 1-2');
insert into public.questions (id, topic_id, stem, options, correct_index, explanation, source_pages)
values ('f0000000-0000-4000-8002-000000000001', (select id from public.topics where number = 1), 'p', '["a","b","c","d"]'::jsonb, 0, 'e', 'p. 1');
insert into public.quiz_attempts (id, user_id, mode, topic_id, total, answers)
values
  ('f0000000-0000-4000-8003-00000000000a', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'tema', (select id from public.topics where number = 1), 10, '[]'::jsonb),
  ('f0000000-0000-4000-8003-00000000000b', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'simulacro', null, 50, '[]'::jsonb);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", "role": "authenticated"}', true);

select ok((select count(*) from public.topic_sections) > 0, 'authenticated lee topic_sections');
select ok((select count(*) from public.questions) > 0, 'authenticated lee questions');
select throws_ok(
  $$ insert into public.topic_sections (id, topic_id, sort, title, body_md, source_pages)
     values (gen_random_uuid(), (select id from public.topics where number = 1), 2, 't', 'b', 'p') $$,
  '42501', null, 'authenticated no inserta en topic_sections'
);
select throws_ok(
  $$ insert into public.questions (id, topic_id, stem, options, correct_index, explanation, source_pages)
     values (gen_random_uuid(), (select id from public.topics where number = 1), 'p', '["a","b","c","d"]'::jsonb, 0, 'e', 'p') $$,
  '42501', null, 'authenticated no inserta en questions'
);
select results_eq($$ select count(*)::int from public.quiz_attempts $$, array[1], 'A solo ve sus intentos');
select results_eq(
  $$ select count(*)::int from public.quiz_attempts where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' $$,
  array[0], 'A no ve los intentos de B'
);
select throws_ok(
  $$ insert into public.quiz_attempts (user_id, mode, total) values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'tema', 10) $$,
  '42501', null, 'A no inserta intentos a nombre de B'
);
select throws_ok(
  $$ select correct_index from public.questions $$,
  '42501', null, 'authenticated no lee correct_index'
);
select throws_ok(
  $$ select public.finish_quiz_attempt('f0000000-0000-4000-8003-00000000000b', '[]'::jsonb) $$,
  '42501', null, 'finish_quiz_attempt rechaza intentos de otro usuario'
);

select set_config('request.jwt.claims', '', true);
set local role anon;
select is((select count(*)::int from public.topic_sections), 0, 'anon no lee el temario');
select throws_ok($$ select count(*) from public.questions $$, '42501', null, 'anon no tiene permiso sobre questions (migración 0023)');
select is((select count(*)::int from public.quiz_attempts), 0, 'anon no ve quiz_attempts');

select * from finish();
rollback;
