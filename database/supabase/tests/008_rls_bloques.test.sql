begin;
create extension if not exists pgtap with schema extensions;
select set_config('search_path', 'public, ' || quote_ident(n.nspname), true) from pg_extension e join pg_namespace n on n.oid = e.extnamespace where e.extname = 'pgtap';
select plan(20);

select has_table('public', 'study_blocks', 'existe study_blocks');
select has_table('public', 'block_questions', 'existe block_questions');
select has_table('public', 'concept_cards', 'existe concept_cards');
select has_table('public', 'user_cards', 'existe user_cards');
select has_table('public', 'card_reviews', 'existe card_reviews');
select has_table('public', 'block_answers', 'existe block_answers');
select has_table('public', 'user_block_progress', 'existe user_block_progress');
select has_table('public', 'glossary_terms', 'existe glossary_terms');

insert into auth.users (id, instance_id, aud, role, email, raw_user_meta_data, created_at, updated_at)
values
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'torre-test-a@example.invalid', '{}'::jsonb, now(), now()),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'torre-test-b@example.invalid', '{}'::jsonb, now(), now());

-- Datos sembrados como superusuario.
insert into public.sources (id, url, title, publisher, level, consulted_on)
values ('f0000000-0000-4000-8010-000000000001', 'https://example.invalid/t', 'fuente de prueba', 'test', 'A', current_date);
insert into public.study_blocks (id, topic_id, temario_point, sort, title, objectives, key_idea, body_md, trap_md, exam_tip_md, source_id, source_pages)
values ('f0000000-0000-4000-8011-000000000001', (select id from public.topics where number = 1), '1.1', 9001, 't',
  array['o'], 'k', 'b', 'tr', 'ex', 'f0000000-0000-4000-8010-000000000001', 'p. 1');
insert into public.block_questions (id, block_id, role, stem, options, correct_index, explanation, source_pages)
values
  ('f0000000-0000-4000-8012-000000000001', 'f0000000-0000-4000-8011-000000000001', 'comprobacion', 'p1', '["a","b","c","d"]'::jsonb, 0, 'e', 'p. 1'),
  ('f0000000-0000-4000-8012-000000000002', 'f0000000-0000-4000-8011-000000000001', 'comprobacion', 'p2', '["a","b","c","d"]'::jsonb, 1, 'e', 'p. 1');
insert into public.concept_cards (id, block_id, front, back, source_pages)
values
  ('f0000000-0000-4000-8013-000000000001', 'f0000000-0000-4000-8011-000000000001', 'f1', 'b1', 'p. 1'),
  ('f0000000-0000-4000-8013-000000000002', 'f0000000-0000-4000-8011-000000000001', 'f2', 'b2', 'p. 1');
insert into public.user_cards (id, user_id, front, back, deck)
values
  ('f0000000-0000-4000-8014-00000000000a', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'fa', 'ba', 'propias'),
  ('f0000000-0000-4000-8014-00000000000b', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'fb', 'bb', 'propias');
insert into public.card_reviews (user_id, user_card_id, rating)
values ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'f0000000-0000-4000-8014-00000000000b', 3);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub": "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", "role": "authenticated"}', true);

select throws_ok(
  $$ select correct_index from public.block_questions $$,
  '42501', null, 'authenticated no lee correct_index de block_questions'
);
select results_eq(
  $$ select count(*)::int from public.user_cards where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' $$,
  array[0], 'A no ve las user_cards de B'
);
select results_eq(
  $$ select count(*)::int from public.card_reviews where user_id = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb' $$,
  array[0], 'A no ve las card_reviews de B'
);

-- Responder una pregunta y completar el bloque dos veces (Review Focus 2).
select public.answer_block_question('f0000000-0000-4000-8012-000000000001', 0);
select public.answer_block_question('f0000000-0000-4000-8012-000000000002', null);
select is(
  (public.complete_block('f0000000-0000-4000-8011-000000000001')) ->> 'new_cards', '2',
  'la primera vez complete_block crea 2 tarjetas nuevas'
);
select is(
  (public.complete_block('f0000000-0000-4000-8011-000000000001')) ->> 'new_cards', '0',
  'la segunda vez new_cards es 0'
);
select results_eq(
  $$ select count(*)::int from public.user_block_progress where block_id = 'f0000000-0000-4000-8011-000000000001' $$,
  array[1], 'complete_block deja una sola fila de progreso'
);

-- A no puede tocar tarjetas de B (Review Focus 3): 0 filas afectadas.
select results_eq(
  $$ with u as (update public.user_cards set front = 'x' where id = 'f0000000-0000-4000-8014-00000000000b' returning 1)
     select count(*)::int from u $$,
  array[0], 'A no actualiza user_cards de B (0 filas)'
);
select throws_ok(
  $$ insert into public.card_reviews (user_card_id, rating) values ('f0000000-0000-4000-8014-00000000000b', 3) $$,
  '42501', null, 'A no valora una tarjeta de B'
);
select throws_ok(
  $$ insert into public.user_block_progress (user_id, block_id, status)
     values ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'f0000000-0000-4000-8011-000000000001', 'hecho') $$,
  '42501', null, 'authenticated no escribe directamente en user_block_progress'
);

-- B completa el bloque con sus propias respuestas: no hereda las de A.
select set_config('request.jwt.claims', '{"sub": "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", "role": "authenticated"}', true);
select is(
  (public.complete_block('f0000000-0000-4000-8011-000000000001')) ->> 'check_correct', '0',
  'B no hereda las respuestas de A al completar el bloque'
);

select set_config('request.jwt.claims', '', true);
set local role anon;
select throws_ok(
  $$ select count(*) from public.user_cards $$,
  '42501', null, 'anon no lee user_cards'
);
select throws_ok(
  $$ select count(*) from public.study_blocks $$,
  '42501', null, 'anon no lee study_blocks'
);

select * from finish();
rollback;
