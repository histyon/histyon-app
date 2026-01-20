-- 1. PROFILI DOTTORI (Estende auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  first_name text not null,
  last_name text not null,
  fiscal_code text unique not null,
  hospital_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PAZIENTI
create table public.patients (
  id uuid default gen_random_uuid() primary key,
  doctor_id uuid references public.profiles(id) on delete cascade not null,
  first_name text not null,
  last_name text not null,
  fiscal_code text not null,
  date_of_birth date not null,
  gender text check (gender in ('M', 'F', 'OTHER')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(doctor_id, fiscal_code) -- Evita duplicati per lo stesso dottore
);

-- 3. ABILITAZIONE SICUREZZA (RLS)
alter table public.profiles enable row level security;
alter table public.patients enable row level security;

-- 4. POLICIES (Chi può vedere cosa)
create policy "Dottori vedono solo se stessi" on public.profiles
  for select using (auth.uid() = id);

create policy "Dottori vedono solo i propri pazienti" on public.patients
  for select using (auth.uid() = doctor_id);

create policy "Dottori creano i propri pazienti" on public.patients
  for insert with check (auth.uid() = doctor_id);

create policy "Dottori modificano i propri pazienti" on public.patients
  for update using (auth.uid() = doctor_id);