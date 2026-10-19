-- Aptitudes (ola 4): resultados de los ejercicios de entrenamiento. Solo filas propias.

create table public.aptitude_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  kind text not null check (kind in ('atencion', 'espacial', 'abstracto', 'memoria', 'calculo', 'multitarea')),
  level int not null check (level between 1 and 5),
  score int not null check (score >= 0),
  total int not null check (total > 0),
  duration_s int not null check (duration_s >= 0),
  taken_at timestamptz not null default now(),
  check (score <= total)
);

create index aptitude_results_user_kind_idx on public.aptitude_results (user_id, kind, taken_at desc);

alter table public.aptitude_results enable row level security;

create policy "aptitude_results_select_own" on public.aptitude_results
  for select to authenticated using (user_id = (select auth.uid()));
create policy "aptitude_results_insert_own" on public.aptitude_results
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "aptitude_results_update_own" on public.aptitude_results
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "aptitude_results_delete_own" on public.aptitude_results
  for delete to authenticated using (user_id = (select auth.uid()));

revoke insert, update, delete, truncate on public.aptitude_results from anon;
revoke truncate on public.aptitude_results from authenticated;
