# Backup & recuperação — ALUNERI Business

## Exportação rápida pelo painel

Um administrador autenticado pode usar **Admin -> Exportar backup JSON**. O arquivo contém leads, propostas, projetos CMS, depoimentos, agendamentos e erros recentes.

Guarde os exports fora da Vercel e fora do mesmo repositório GitHub.

## Banco Supabase

Para recuperação completa, configure backups no plano/projeto Supabase e mantenha `supabase/schema.sql` versionado. Nunca commite a `SUPABASE_SERVICE_ROLE_KEY` ou a URL de conexão com senha.

Se você tiver acesso à connection string do PostgreSQL, uma rotina externa pode usar `pg_dump`. Armazene o arquivo criptografado e limite o acesso.

## Procedimento de recuperação

1. Criar/restaurar um projeto PostgreSQL/Supabase.
2. Aplicar `supabase/schema.sql`.
3. Restaurar os dados do backup oficial ou importar o export validado.
4. Atualizar `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` na Vercel.
5. Fazer redeploy.
6. Testar `/api/health`, criação de lead e login `/admin`.

## Teste de recuperação

Faça um teste periódico em um ambiente separado. Backup que nunca foi restaurado não deve ser considerado validado.
