# ALUNERI V5.7.2 — Supabase TypeScript Hotfix

- Corrige a tipagem dos headers usados pelo `fetch()` no backend Supabase.
- `authHeaders()` agora retorna explicitamente `Record<string, string>`.
- Mantém suporte a `sb_secret_*` e `service_role` legado.
- Corrige os erros TS2769 encontrados no build da Vercel.
