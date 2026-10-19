-- Sesiones de estudio de Torre (incremento 3): cronómetro y entrada manual.

create table public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  task_id uuid references public.tasks (id),
  topic_id uuid references public.topics (id),
  started_at timestamptz not null,
  ended_at timestamptz,
  paused_seconds int not null default 0 check (paused_seconds >= 0),
  paused_at timestamptz,
  origin text not null check (origin in ('cronometro', 'manual')),
  notes text,
  created_at timestamptz default now(),
  check (ended_at is null or ended_at >= started_at)
);

create index study_sessions_user_started_idx on public.study_sessions (user_id, started_at desc);
create index study_sessions_task_id_idx on public.study_sessions (task_id);
create index study_sessions_topic_id_idx on public.study_sessions (topic_id);
-- Solo una sesión en marcha por usuario.
create unique index study_sessions_one_open_idx on public.study_sessions (user_id) where ended_at is null;

alter table public.study_sessions enable row level security;

create policy "study_sessions_select_own" on public.study_sessions
  for select to authenticated using (user_id = (select auth.uid()));
create policy "study_sessions_insert_own" on public.study_sessions
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "study_sessions_update_own" on public.study_sessions
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "study_sessions_delete_own" on public.study_sessions
  for delete to authenticated using (user_id = (select auth.uid()));

revoke insert, update, delete, truncate on public.study_sessions from anon;
revoke truncate on public.study_sessions from authenticated;
