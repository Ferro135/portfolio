create extension if not exists pgcrypto;

create table if not exists public.aluneri_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text,
  phone text,
  project_type text not null,
  features text[] not null default '{}',
  budget text,
  timeline text,
  details text,
  status text not null default 'new' check (status in ('new','contacted','proposal_sent','approved','in_progress','completed','archived')),
  notes text,
  source text not null default 'website',
  ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.aluneri_proposals (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.aluneri_leads(id) on delete set null,
  token uuid not null default gen_random_uuid() unique,
  title text not null,
  client_name text not null,
  company text,
  scope text not null,
  deliverables text[] not null default '{}',
  price_cents integer,
  currency text not null default 'BRL',
  deadline text,
  valid_until date,
  terms text,
  status text not null default 'draft' check (status in ('draft','sent','accepted','rejected','expired')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.aluneri_cms_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  title_en text,
  eyebrow text,
  eyebrow_en text,
  category text,
  category_en text,
  description text not null,
  description_en text,
  long_description text,
  long_description_en text,
  tags text[] not null default '{}',
  image_url text,
  mobile_image_url text,
  demo_url text,
  metrics jsonb not null default '[]'::jsonb,
  published boolean not null default false,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.aluneri_testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  project text,
  quote text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.aluneri_appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  preferred_date date not null,
  preferred_period text not null,
  timezone text,
  notes text,
  status text not null default 'requested' check (status in ('requested','confirmed','cancelled','completed')),
  ip_hash text,
  created_at timestamptz not null default now()
);

create table if not exists public.aluneri_error_events (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  stack text,
  path text,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.aluneri_rate_events (
  id bigserial primary key,
  action text not null,
  key_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists aluneri_leads_status_created_idx on public.aluneri_leads(status, created_at desc);
create index if not exists aluneri_leads_ip_hash_created_idx on public.aluneri_leads(ip_hash, created_at desc);
create index if not exists aluneri_rate_events_key_idx on public.aluneri_rate_events(action, key_hash, created_at desc);
create index if not exists aluneri_appointments_status_date_idx on public.aluneri_appointments(status, preferred_date);

alter table public.aluneri_leads enable row level security;
alter table public.aluneri_proposals enable row level security;
alter table public.aluneri_cms_projects enable row level security;
alter table public.aluneri_testimonials enable row level security;
alter table public.aluneri_appointments enable row level security;
alter table public.aluneri_error_events enable row level security;
alter table public.aluneri_rate_events enable row level security;

-- Sem policies públicas: toda escrita/leitura administrativa passa pelo backend com service_role.
