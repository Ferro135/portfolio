create extension if not exists pgcrypto;

create table if not exists public.leads (
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

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
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

create table if not exists public.cms_projects (
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

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  project text,
  quote text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
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

create table if not exists public.error_events (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  stack text,
  path text,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists public.rate_events (
  id bigserial primary key,
  action text not null,
  key_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists leads_status_created_idx on public.leads(status, created_at desc);
create index if not exists leads_ip_hash_created_idx on public.leads(ip_hash, created_at desc);
create index if not exists rate_events_key_idx on public.rate_events(action, key_hash, created_at desc);
create index if not exists appointments_status_date_idx on public.appointments(status, preferred_date);

alter table public.leads enable row level security;
alter table public.proposals enable row level security;
alter table public.cms_projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.appointments enable row level security;
alter table public.error_events enable row level security;
alter table public.rate_events enable row level security;

-- Nenhuma policy pública é criada. Todas as operações passam pelo backend usando service_role.

-- Compatibilidade com bancos criados antes da V5.6
alter table public.cms_projects add column if not exists title_en text;
alter table public.cms_projects add column if not exists eyebrow_en text;
alter table public.cms_projects add column if not exists category_en text;
alter table public.cms_projects add column if not exists description_en text;
alter table public.cms_projects add column if not exists long_description_en text;
