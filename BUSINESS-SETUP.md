# Ativação da NEXORA V5.6 Business

A V5.6 foi feita para continuar publicando o portfólio mesmo sem backend. Para ativar o CRM e as automações:

## 1. Supabase

Crie um projeto Supabase e execute `supabase/schema.sql` e depois `supabase/storage.sql` no SQL Editor. O bucket público é usado somente para imagens publicadas pelo CMS; uploads passam pelo backend com service role.

Na Vercel, adicione somente como variáveis server-side:

```env
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
RATE_LIMIT_SALT=...
```

**Nunca** prefixe `SUPABASE_SERVICE_ROLE_KEY` com `NEXT_PUBLIC_`.

## 2. Admin

Localmente, gere as credenciais:

```bash
npm run admin:hash -- "uma-senha-longa-e-unica"
```

Copie os três valores impressos para a Vercel:

```env
ADMIN_PASSWORD_HASH=scrypt$...
ADMIN_SESSION_SECRET=...
RATE_LIMIT_SALT=...
```

Acesse `/admin/login`.

## 3. Email automático (opcional)

A implementação suporta a API do Resend sem expor a chave no navegador:

```env
RESEND_API_KEY=...
EMAIL_FROM=NEXORA <contato@seu-dominio.com>
LEAD_NOTIFY_EMAIL=seu-email-interno@dominio.com
```

## 4. Domínio / email

```env
NEXT_PUBLIC_SITE_URL=https://seudominio.com
NEXT_PUBLIC_CONTACT_EMAIL=contato@seudominio.com
```

## 5. Uptime

No GitHub, crie a variável de Actions:

```text
PRODUCTION_URL=https://seudominio.com
```

## 6. Branch protection e segurança

Siga `GITHUB-SECURITY-SETUP.md` e `SECURITY-CHECKLIST.md`.
