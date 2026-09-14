insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'aluneri-portfolio-media',
  'aluneri-portfolio-media',
  true,
  1048576,
  array['image/png','image/jpeg','image/webp','image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Uploads são feitos somente pelo backend com service_role.
-- O bucket é público apenas para leitura dos assets publicados.
