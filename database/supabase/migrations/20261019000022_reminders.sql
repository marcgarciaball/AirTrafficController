-- Recordatorios del usuario (calendario), opcionalmente ligados a un hito de convocatoria.

create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  due_at timestamptz not null,
  exam_call_event_id uuid references public.exam_call_events (id) on delete set null,
  done boolean not null default false,
  created_at timestamptz default now()
);

create index reminders_user_due_idx on public.reminders (user_id, due_at);
create index reminders_exam_call_event_id_idx on public.reminders (exam_call_event_id);

alter table public.reminders enable row level security;

create policy "reminders_select_own" on public.reminders
  for select to authenticated using (user_id = (select auth.uid()));
create policy "reminders_insert_own" on public.reminders
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "reminders_update_own" on public.reminders
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "reminders_delete_own" on public.reminders
  for delete to authenticated using (user_id = (select auth.uid()));

revoke insert, update, delete, truncate on public.reminders from anon;
revoke truncate on public.reminders from authenticated;
