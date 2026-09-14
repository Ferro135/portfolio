# Ativação da ALUNERI V5.6 Business

A V5.6 foi feita para continuar publicando o portfólio mesmo sem backend. Para ativar o CRM e as automações:

## 1. Supabase

Crie um projeto Supabase e execute `supabase/schema.sql` no SQL Editor.

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
EMAIL_FROM=ALUNERI <contato@seu-dominio.com>
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


## Banco compartilhado isolado

Nesta configuração, a ALUNERI usa o projeto Supabase geral existente, mas todas as tabelas são prefixadas com `aluneri_` e o bucket é `aluneri-portfolio-media`, evitando colisão com outros sistemas no mesmo projeto.


## Configuração atual — Supabase compartilhado

A ALUNERI deve usar o projeto Supabase geral existente, sem tocar nas tabelas dos outros sistemas.

URL do projeto:

```env
SUPABASE_URL=https://pzwtoksbbfvgsnwunzri.supabase.co
```

As tabelas da ALUNERI usam prefixo `aluneri_` e o bucket usa `aluneri-portfolio-media`.

No Supabase SQL Editor, execute **uma vez**:

```text
supabase/aluneri_shared_project.sql
```

Depois configure na Vercel **uma** destas chaves server-side:

```env
SUPABASE_SERVICE_ROLE_KEY=...
```

ou

```env
SUPABASE_SECRET_KEY=...
```

Use apenas uma. Nunca use `NEXT_PUBLIC_` para uma chave secreta.

A URL já possui fallback server-side para este projeto compartilhado; `SUPABASE_URL` continua recomendada na Vercel para deixar a configuração explícita. A chave secreta continua obrigatória.

## Assistente de IA

Para ativar respostas geradas por IA no Assistente ALUNERI, adicione na Vercel:

```env
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5.6-sol
OPENAI_REASONING_EFFORT=medium
```

A chave é utilizada apenas em `/api/assistant` no servidor.

Sem `OPENAI_API_KEY`, o componente continua funcionando em modo básico com respostas locais para dúvidas comuns. Conversas não são persistidas pela ALUNERI; somente o briefing confirmado pelo visitante entra no CRM.
