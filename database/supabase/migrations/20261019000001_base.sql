-- Esquema base de Torre: tipos, tablas globales (fuentes y convocatorias), perfiles, triggers y RLS.

-- ---------------------------------------------------------------- Tipos
create type public.source_level as enum ('A', 'B', 'C');
create type public.exam_call_status as enum ('esperada', 'publicada', 'cerrada');
create type public.exam_event_kind as enum (
  'publicacion', 'inscripcion_inicio', 'inscripcion_fin', 'fase1', 'fase2', 'fase3', 'resultado'
);
create type public.nationality_status as enum ('espanola', 'ue', 'residente', 'ninguna');
create type public.degree as enum ('bachiller', 'tecnico_superior', 'grado', 'extranjero', 'ninguna');
create type public.english_level as enum ('b1_o_menos', 'b2', 'c1', 'c2');
create type public.medical_status as enum ('sin_cita', 'cita', 'vigente', 'otra_clase');

-- ---------------------------------------------------------------- Tablas globales
create table public.sources (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  title text not null,
  publisher text not null,
  level public.source_level not null,
  consulted_on date not null,
  notes text
);

create table public.exam_calls (
  id uuid primary key default gen_random_uuid(),
  year int not null,
  title text not null,
  status public.exam_call_status not null,
  seats int,
  source_id uuid not null references public.sources (id),
  verified boolean not null default false
);

create table public.exam_call_events (
  id uuid primary key default gen_random_uuid(),
  exam_call_id uuid references public.exam_calls (id) on delete cascade,
  kind public.exam_event_kind not null,
  "date" date not null,
  is_estimate boolean not null default false,
  source_id uuid not null references public.sources (id),
  verified boolean not null default false
);

create index exam_calls_source_id_idx on public.exam_calls (source_id);
create index exam_call_events_exam_call_id_idx on public.exam_call_events (exam_call_id);
create index exam_call_events_source_id_idx on public.exam_call_events (source_id);

-- ---------------------------------------------------------------- Perfiles
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  -- Plan
  start_date date default current_date,
  target_date date,
  target_exam_call_id uuid references public.exam_calls (id),
  target_is_expected boolean,
  weekly_hours numeric(4, 1) check (weekly_hours > 0 and weekly_hours <= 80),
  timezone text not null default 'Europe/Madrid',
  -- Respuestas del cuestionario
  birth_date date,
  nationality_status public.nationality_status,
  degree public.degree,
  english_level public.english_level,
  medical_status public.medical_status,
  medical_valid_until date,
  onboarded_at timestamptz
);

create index profiles_target_exam_call_id_idx on public.profiles (target_exam_call_id);

-- ---------------------------------------------------------------- Funciones y triggers
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := pg_catalog.now();
  return new;
end;
$$;

create trigger set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Crea la fila de profiles para cada usuario de auth.users (incluidos los de Google, sin contraseña).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, nullif(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------- RLS
alter table public.sources enable row level security;
alter table public.exam_calls enable row level security;
alter table public.exam_call_events enable row level security;
alter table public.profiles enable row level security;

create policy "sources_select_authenticated" on public.sources
  for select to authenticated using (true);
create policy "exam_calls_select_authenticated" on public.exam_calls
  for select to authenticated using (true);
create policy "exam_call_events_select_authenticated" on public.exam_call_events
  for select to authenticated using (true);

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (id = (select auth.uid()));
create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));
-- Sin política de delete en profiles.

-- Defensa en profundidad: además de RLS, se retiran los permisos de escritura que Supabase concede por defecto.
revoke insert, update, delete, truncate on public.sources, public.exam_calls, public.exam_call_events
  from anon, authenticated;
revoke delete, truncate on public.profiles from anon, authenticated;
revoke insert, update on public.profiles from anon;
