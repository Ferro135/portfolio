-- ALUNERI 2.0 — migração segura do namespace legado NEXORA
-- Execute depois de publicar a versão ALUNERI. O código possui fallback, portanto a ordem não causa downtime.

begin;

do $$
begin
  if to_regclass('public.nexora_leads') is not null and to_regclass('public.aluneri_leads') is null then alter table public.nexora_leads rename to aluneri_leads; end if;
  if to_regclass('public.nexora_proposals') is not null and to_regclass('public.aluneri_proposals') is null then alter table public.nexora_proposals rename to aluneri_proposals; end if;
  if to_regclass('public.nexora_cms_projects') is not null and to_regclass('public.aluneri_cms_projects') is null then alter table public.nexora_cms_projects rename to aluneri_cms_projects; end if;
  if to_regclass('public.nexora_testimonials') is not null and to_regclass('public.aluneri_testimonials') is null then alter table public.nexora_testimonials rename to aluneri_testimonials; end if;
  if to_regclass('public.nexora_appointments') is not null and to_regclass('public.aluneri_appointments') is null then alter table public.nexora_appointments rename to aluneri_appointments; end if;
  if to_regclass('public.nexora_error_events') is not null and to_regclass('public.aluneri_error_events') is null then alter table public.nexora_error_events rename to aluneri_error_events; end if;
  if to_regclass('public.nexora_rate_events') is not null and to_regclass('public.aluneri_rate_events') is null then alter table public.nexora_rate_events rename to aluneri_rate_events; end if;
end $$;

insert into storage.buckets (id, name, public)
values ('aluneri-portfolio-media', 'aluneri-portfolio-media', true)
on conflict (id) do nothing;


-- Renomeia índices legados quando existirem.
do $$
begin
  if to_regclass('public.nexora_leads_status_created_idx') is not null and to_regclass('public.aluneri_leads_status_created_idx') is null then alter index public.nexora_leads_status_created_idx rename to aluneri_leads_status_created_idx; end if;
  if to_regclass('public.nexora_leads_ip_hash_created_idx') is not null and to_regclass('public.aluneri_leads_ip_hash_created_idx') is null then alter index public.nexora_leads_ip_hash_created_idx rename to aluneri_leads_ip_hash_created_idx; end if;
  if to_regclass('public.nexora_rate_events_key_idx') is not null and to_regclass('public.aluneri_rate_events_key_idx') is null then alter index public.nexora_rate_events_key_idx rename to aluneri_rate_events_key_idx; end if;
  if to_regclass('public.nexora_appointments_status_date_idx') is not null and to_regclass('public.aluneri_appointments_status_date_idx') is null then alter index public.nexora_appointments_status_date_idx rename to aluneri_appointments_status_date_idx; end if;
end $$;

commit;
