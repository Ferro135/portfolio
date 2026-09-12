select table_name
from information_schema.tables
where table_schema = 'public' and table_name like 'nexora_%'
order by table_name;

select id, name, public, file_size_limit
from storage.buckets
where id = 'nexora-portfolio-media';
