-- Estudio por bloques y Flashback: plantillas de solo lectura, tablas de usuario con RLS y corrección en funciones.

create table public.study_blocks (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics on delete cascade,
  temario_point text not null,
  exam_part text not null default 'conocimientos',
  sort int not null,
  title text not null,
  objectives text[] not null,
  key_idea text not null,
  body_md text not null,
  example_md text,
  trap_md text not null,
  exam_tip_md text not null,
  mnemonic_md text,
  source_id uuid not null references public.sources,
  source_pages text not null,
  reviewed boolean not null default false,
  review_notes text,
  unique (topic_id, sort)
);
create index study_blocks_topic_idx on public.study_blocks (topic_id, sort);

create table public.block_questions (
  id uuid primary key default gen_random_uuid(),
  block_id uuid not null references public.study_blocks on delete cascade,
  role text not null check (role in ('previa', 'comprobacion', 'repaso')),
  stem text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array' and jsonb_array_length(options) = 4),
  correct_index int not null check (correct_index between 0 and 3),
  explanation text not null,
  source_pages text not null,
  origin text not null default 'practica',
  reviewed boolean not null default false
);
create index block_questions_block_idx on public.block_questions (block_id, role);

create table public.concept_cards (
  id uuid primary key default gen_random_uuid(),
  block_id uuid not null references public.study_blocks on delete cascade,
  front text not null,
  back text not null,
  term_en text,
  source_pages text not null,
  reviewed boolean not null default false
);
create index concept_cards_block_idx on public.concept_cards (block_id);

create table public.glossary_terms (
  id uuid primary key default gen_random_uuid(),
  term text not null,
  term_en text,
  definition text not null,
  topic_id uuid not null references public.topics on delete cascade,
  block_id uuid references public.study_blocks on delete set null,
  source_id uuid not null references public.sources,
  source_pages text not null,
  reviewed boolean not null default false
);
create index glossary_terms_topic_idx on public.glossary_terms (topic_id);

create table public.user_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  concept_card_id uuid references public.concept_cards on delete set null,
  front text not null check (length(front) between 1 and 1000),
  back text not null check (length(back) between 1 and 2000),
  deck text not null check (deck in ('temario', 'ingles', 'propias')),
  due timestamptz not null default now(),
  stability float8 not null default 0,
  difficulty float8 not null default 0,
  elapsed_days int not null default 0,
  scheduled_days int not null default 0,
  reps int not null default 0,
  lapses int not null default 0,
  learning_steps int not null default 0,
  state int not null default 0,
  last_review timestamptz,
  suspended boolean not null default false,
  unique (user_id, concept_card_id)
);
create index user_cards_user_due_idx on public.user_cards (user_id, due);

create table public.card_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  user_card_id uuid not null references public.user_cards on delete cascade,
  rating int not null check (rating between 1 and 4),
  reviewed_at timestamptz not null default now(),
  elapsed_days int,
  scheduled_days int
);
create index card_reviews_user_idx on public.card_reviews (user_id, reviewed_at desc);
create index card_reviews_card_idx on public.card_reviews (user_card_id);

create table public.block_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  question_id uuid not null references public.block_questions on delete cascade,
  chosen_index int check (chosen_index between 0 and 3),
  correct boolean not null,
  answered_at timestamptz not null default now()
);
create index block_answers_user_question_idx on public.block_answers (user_id, question_id, answered_at desc);

create table public.user_block_progress (
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  block_id uuid not null references public.study_blocks on delete cascade,
  status text not null check (status in ('en_curso', 'hecho')),
  check_correct int,
  check_total int,
  completed_at timestamptz,
  primary key (user_id, block_id)
);

alter table public.study_blocks enable row level security;
alter table public.block_questions enable row level security;
alter table public.concept_cards enable row level security;
alter table public.glossary_terms enable row level security;
alter table public.user_cards enable row level security;
alter table public.card_reviews enable row level security;
alter table public.block_answers enable row level security;
alter table public.user_block_progress enable row level security;

-- Plantillas: solo lectura para authenticated.
create policy "study_blocks_select_authenticated" on public.study_blocks for select to authenticated using (true);
create policy "block_questions_select_authenticated" on public.block_questions for select to authenticated using (true);
create policy "concept_cards_select_authenticated" on public.concept_cards for select to authenticated using (true);
create policy "glossary_terms_select_authenticated" on public.glossary_terms for select to authenticated using (true);

-- Tablas de usuario: solo filas propias.
create policy "user_cards_select_own" on public.user_cards for select to authenticated using (user_id = (select auth.uid()));
create policy "user_cards_insert_own" on public.user_cards for insert to authenticated with check (user_id = (select auth.uid()));
create policy "user_cards_update_own" on public.user_cards for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "user_cards_delete_own" on public.user_cards for delete to authenticated using (user_id = (select auth.uid()));

create policy "card_reviews_select_own" on public.card_reviews for select to authenticated using (user_id = (select auth.uid()));
create policy "card_reviews_insert_own" on public.card_reviews for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (select 1 from public.user_cards c where c.id = user_card_id and c.user_id = (select auth.uid()))
  );

-- block_answers y user_block_progress solo se escriben desde las funciones.
create policy "block_answers_select_own" on public.block_answers for select to authenticated using (user_id = (select auth.uid()));
create policy "user_block_progress_select_own" on public.user_block_progress for select to authenticated using (user_id = (select auth.uid()));

-- Privilegios: nada para anon; plantillas sin escritura; correct_index y explanation no son legibles.
revoke all on public.study_blocks, public.block_questions, public.concept_cards, public.glossary_terms,
  public.user_cards, public.card_reviews, public.block_answers, public.user_block_progress
  from anon, authenticated;

grant select on public.study_blocks, public.concept_cards, public.glossary_terms to authenticated;
grant select (id, block_id, role, stem, options, source_pages, origin, reviewed) on public.block_questions to authenticated;

grant select, insert, update, delete on public.user_cards to authenticated;
grant select, insert on public.card_reviews to authenticated;
grant select on public.block_answers, public.user_block_progress to authenticated;

create or replace function public.answer_block_question(p_question_id uuid, p_chosen int)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_q public.block_questions%rowtype;
  v_correct boolean;
begin
  if v_uid is null then
    raise exception 'Sesión no válida' using errcode = '42501';
  end if;
  if p_chosen is not null and (p_chosen < 0 or p_chosen > 3) then
    raise exception 'Opción no válida' using errcode = '22023';
  end if;

  select * into v_q from public.block_questions where id = p_question_id;
  if not found then
    raise exception 'Pregunta no encontrada' using errcode = '22023';
  end if;

  v_correct := (p_chosen is not null and p_chosen = v_q.correct_index);

  insert into public.block_answers (user_id, question_id, chosen_index, correct)
  values (v_uid, v_q.id, p_chosen, v_correct);

  return jsonb_build_object(
    'correct', v_correct,
    'correct_index', v_q.correct_index,
    'explanation', v_q.explanation
  );
end;
$$;

create or replace function public.complete_block(p_block_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_since timestamptz;
  v_uid uuid := auth.uid();
  v_total int;
  v_correct int;
  v_new int;
begin
  if v_uid is null then
    raise exception 'Sesión no válida' using errcode = '42501';
  end if;
  if not exists (select 1 from public.study_blocks where id = p_block_id) then
    raise exception 'Bloque no encontrado' using errcode = '22023';
  end if;

  select count(*)::int into v_total
    from public.block_questions q
   where q.block_id = p_block_id and q.role = 'comprobacion';

  -- Primera respuesta de cada pregunta de comprobación desde la última vez que se completó el bloque
  -- (la corrección se muestra al momento: contar la última permitiría inflar el dominio).
  select coalesce(max(p.completed_at), '-infinity'::timestamptz) into v_since
    from public.user_block_progress p
   where p.user_id = v_uid and p.block_id = p_block_id;

  select count(*)::int into v_correct
    from public.block_questions q
    join lateral (
      select a.correct
        from public.block_answers a
       where a.user_id = v_uid and a.question_id = q.id and a.answered_at > v_since
       order by a.answered_at asc, a.id asc
       limit 1
    ) first_a on true
   where q.block_id = p_block_id and q.role = 'comprobacion' and first_a.correct;

  insert into public.user_block_progress (user_id, block_id, status, check_correct, check_total, completed_at)
  values (v_uid, p_block_id, 'hecho', v_correct, v_total, now())
  on conflict (user_id, block_id) do update
    set status = 'hecho',
        check_correct = excluded.check_correct,
        check_total = excluded.check_total,
        completed_at = excluded.completed_at;

  with ins as (
    insert into public.user_cards (user_id, concept_card_id, front, back, deck)
    select v_uid, c.id, c.front, c.back, 'temario'
      from public.concept_cards c
     where c.block_id = p_block_id
    on conflict (user_id, concept_card_id) do nothing
    returning 1
  )
  select count(*)::int into v_new from ins;

  return jsonb_build_object('check_correct', v_correct, 'check_total', v_total, 'new_cards', v_new);
end;
$$;

revoke execute on function public.answer_block_question(uuid, int) from public, anon;
grant execute on function public.answer_block_question(uuid, int) to authenticated;
revoke execute on function public.complete_block(uuid) from public, anon;
grant execute on function public.complete_block(uuid) to authenticated;

-- Las tarjetas de inglés pasan a user_cards. La tabla flashcards se conserva, pero la interfaz deja de usarla.
insert into public.user_cards (user_id, front, back, deck, due)
select user_id, front, back, 'ingles', due_on::timestamptz
  from public.flashcards;
