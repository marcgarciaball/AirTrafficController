-- Estudio de Torre (incremento 3): secciones de temario, preguntas e intentos de test.

create table public.topic_sections (
  id uuid primary key,
  topic_id uuid not null references public.topics (id),
  sort int not null,
  title text not null,
  body_md text not null,
  source_pages text not null,
  reviewed boolean not null default false
);

create table public.questions (
  id uuid primary key,
  topic_id uuid not null references public.topics (id),
  stem text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array' and jsonb_array_length(options) = 4),
  correct_index int not null check (correct_index between 0 and 3),
  explanation text not null,
  source_pages text not null,
  difficulty int not null default 2 check (difficulty between 1 and 3),
  reviewed boolean not null default false
);

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  mode text not null check (mode in ('tema', 'simulacro')),
  topic_id uuid references public.topics (id),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  total int not null,
  correct int not null default 0,
  wrong int not null default 0,
  blank int not null default 0,
  answers jsonb not null default '[]'
);

create index topic_sections_topic_id_sort_idx on public.topic_sections (topic_id, sort);
create index questions_topic_id_idx on public.questions (topic_id);
create index quiz_attempts_user_id_started_at_idx on public.quiz_attempts (user_id, started_at desc);
create index quiz_attempts_topic_id_idx on public.quiz_attempts (topic_id);

alter table public.topic_sections enable row level security;
alter table public.questions enable row level security;
alter table public.quiz_attempts enable row level security;

create policy "topic_sections_select_authenticated" on public.topic_sections for select to authenticated using (true);
create policy "questions_select_authenticated" on public.questions for select to authenticated using (true);

create policy "quiz_attempts_select_own" on public.quiz_attempts
  for select to authenticated using (user_id = (select auth.uid()));
create policy "quiz_attempts_insert_own" on public.quiz_attempts
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "quiz_attempts_update_own" on public.quiz_attempts
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "quiz_attempts_delete_own" on public.quiz_attempts
  for delete to authenticated using (user_id = (select auth.uid()));

-- Defensa en profundidad: se retiran los permisos de escritura que Supabase concede por defecto.
revoke insert, update, delete, truncate on public.topic_sections, public.questions from anon, authenticated;
revoke insert, update, delete, truncate on public.quiz_attempts from anon;
revoke truncate on public.quiz_attempts from authenticated;
