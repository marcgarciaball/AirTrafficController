-- Inglés (Ola 4): registro de pruebas, anotaciones lingüísticas y tarjetas de repaso. Todo propio del usuario.

create table public.english_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  goal text not null check (goal in ('c1', 'oaci_en', 'oaci_es')),
  skill text not null check (skill in ('reading', 'use', 'writing', 'listening', 'speaking')),
  part text,
  taken_on date not null default current_date,
  score numeric check (score is null or score >= 0),
  max_score numeric check (max_score is null or max_score > 0),
  notes text,
  created_at timestamptz default now()
);
create index english_logs_user_taken_idx on public.english_logs (user_id, taken_on desc);

create table public.language_endorsements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  language text not null check (language in ('en', 'es')),
  level int not null check (level between 4 and 6),
  assessed_on date not null,
  center text,
  created_at timestamptz default now()
);
create index language_endorsements_user_idx on public.language_endorsements (user_id, language, assessed_on desc);

create table public.flashcards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  deck text not null check (deck in ('vocabulario', 'fraseologia')),
  front text not null check (length(front) between 1 and 500),
  back text not null check (length(back) between 1 and 1000),
  ease numeric not null default 2.5 check (ease >= 1.3),
  interval_days int not null default 0 check (interval_days >= 0),
  reps int not null default 0 check (reps >= 0),
  due_on date not null default current_date,
  created_at timestamptz default now()
);
create index flashcards_user_due_idx on public.flashcards (user_id, due_on);

alter table public.english_logs enable row level security;
alter table public.language_endorsements enable row level security;
alter table public.flashcards enable row level security;

create policy "english_logs_select_own" on public.english_logs for select to authenticated using (user_id = (select auth.uid()));
create policy "english_logs_insert_own" on public.english_logs for insert to authenticated with check (user_id = (select auth.uid()));
create policy "english_logs_update_own" on public.english_logs for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "english_logs_delete_own" on public.english_logs for delete to authenticated using (user_id = (select auth.uid()));

create policy "language_endorsements_select_own" on public.language_endorsements for select to authenticated using (user_id = (select auth.uid()));
create policy "language_endorsements_insert_own" on public.language_endorsements for insert to authenticated with check (user_id = (select auth.uid()));
create policy "language_endorsements_update_own" on public.language_endorsements for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "language_endorsements_delete_own" on public.language_endorsements for delete to authenticated using (user_id = (select auth.uid()));

create policy "flashcards_select_own" on public.flashcards for select to authenticated using (user_id = (select auth.uid()));
create policy "flashcards_insert_own" on public.flashcards for insert to authenticated with check (user_id = (select auth.uid()));
create policy "flashcards_update_own" on public.flashcards for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "flashcards_delete_own" on public.flashcards for delete to authenticated using (user_id = (select auth.uid()));

revoke insert, update, delete, truncate on public.english_logs, public.language_endorsements, public.flashcards from anon;
revoke truncate on public.english_logs, public.language_endorsements, public.flashcards from authenticated;
