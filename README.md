# ALUNERI — Portfolio 2.1

Portfólio da **ALUNERI — Produtos Digitais & Sistemas**, desenvolvido com Next.js, TypeScript e Tailwind CSS.


## Destaques da V2.1

- logo oficial da ALUNERI integrada no Header, Footer e Admin;
- navegação com estado ativo e Header adaptativo ao scroll;
- menu mobile redesenhado;
- refinamento visual dos projetos, processo e contato;
- faixa de especialidades no Hero;
- agendamento integrado ao fluxo principal;
- Admin com status real do Supabase e relógio discreto;
- WhatsApp flutuante compatível com o consentimento de cookies;
- otimizações de renderização e acessibilidade.

## O que a V5.5 adiciona

### Conversão
- página `/servicos` completa;
- catálogo de Sites, SaaS, Dashboards, Sistemas Administrativos, Painéis Internos e Automações;
- briefing em **4 etapas**;
- seleção de recursos do projeto;
- revisão da mensagem antes do WhatsApp;
- preenchimento inicial do tipo de projeto quando o usuário vem de `/servicos`.

### Credibilidade
- suporte a gravações reais dos projetos por variável de ambiente;
- fallback transparente para tours baseados em screenshots reais;
- estrutura para métricas reais e depoimentos autorizados;
- cases Zentra e Spazio mantidos como estudos de caso editoriais.

### SEO e compartilhamento
- JSON-LD de `Organization` e `WebSite`;
- JSON-LD de `Service` na página de serviços;
- FAQ estruturado na Home;
- `SoftwareApplication` nos cases;
- Open Graph próprio para Zentra e Spazio;
- sitemap ampliado;
- palavras-chave comerciais refinadas.

### Monitoramento e qualidade
- `/api/health`;
- workflow de uptime por hora;
- Lighthouse em Home, Contato, Serviços, Sobre e cases;
- Playwright para testar 320, 375, 390, 430, 768, 1024 e 1440 px;
- relatório de responsividade salvo como artifact no GitHub Actions.

### Experiência
- barra discreta de progresso de leitura;
- movimento sutil no Hero;
- respeito a `prefers-reduced-motion`;
- manutenção de todos os refinamentos visuais da V5.3.5.

## Segurança

A V5.5 preserva todo o hardening da V5.4:

- Content Security Policy;
- HSTS;
- anti-clickjacking;
- `nosniff`;
- COOP / CORP;
- `Permissions-Policy`;
- `poweredByHeader: false`;
- source maps públicos de produção desativados;
- sistema de consentimento de cookies;
- Analytics e Speed Insights só após consentimento;
- Dependabot;
- CodeQL;
- `npm audit`;
- CI automático read-only;
- `SECURITY.md`;
- `/.well-known/security.txt`;
- runbook de DDoS/Firewall para Vercel.

Consulte:

```text
SECURITY.md
SECURITY-VERCEL.md
SECURITY-CHECKLIST.md
GITHUB-SECURITY-SETUP.md
```

## Variáveis opcionais na Vercel

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_ZENTRA_DEMO_URL=
NEXT_PUBLIC_SPAZIO_DEMO_URL=
NEXT_PUBLIC_ZENTRA_REAL_VIDEO_URL=
NEXT_PUBLIC_SPAZIO_REAL_VIDEO_URL=
```

Nunca coloque segredos em variáveis `NEXT_PUBLIC_*`.

## Vídeos reais

Quando existir uma gravação MP4 real e segura do sistema, configure:

```env
NEXT_PUBLIC_ZENTRA_REAL_VIDEO_URL=https://...
NEXT_PUBLIC_SPAZIO_REAL_VIDEO_URL=https://...
```

Se estiver vazio, o site continua usando o tour editorial atual e informa claramente que ele é baseado em screenshots.

## Métricas reais

Cada projeto tem:

```ts
metrics: []
```

Adicione somente números confirmados. A seção permanece invisível enquanto a lista estiver vazia.

## Depoimentos

A lista `testimonials` permanece vazia até haver autorização real de um cliente. Não há depoimentos fictícios.

## Uptime

No GitHub:

`Settings -> Secrets and variables -> Actions -> Variables`

Crie:

```text
PRODUCTION_URL=https://seu-dominio.com
```

O workflow `Uptime` verificará a Home e `/api/health` a cada hora.

## Responsividade automática

O workflow `.github/workflows/responsive.yml` testa:

```text
320
375
390
430
768
1024
1440
```

Páginas:

```text
/
/servicos
/contato
/sobre
/projetos/zentra
/projetos/spazio-gestao
```

## package-lock

Este ambiente não conseguiu acessar o registry npm para gerar um lockfile confiável.

Depois de subir a V5.5, execute uma vez:

`GitHub -> Actions -> Gerar package-lock manualmente -> Run workflow`

Depois disso o CI poderá usar `npm ci` com versões determinísticas.

## Rodar localmente

```bash
npm install
npm run dev
```

## Validar

```bash
npm run typecheck
npm run build
npm run security:audit
```

Para os testes responsivos:

```bash
npx playwright install chromium
npm run test:responsive
```

## Checklist de lançamento

Consulte `LAUNCH-V5.5.md` para configurar domínio, email profissional, vídeos reais, demos públicas, métricas e uptime.

---

# V5.6 — Business & Production

A V5.6 transforma o portfólio em uma pequena plataforma comercial mantendo o site público funcionando mesmo antes do backend ser configurado.

## Novas rotas

```text
/projetos
/resultados
/agendar
/termos
/en
/admin/login
/proposta/[token]
/api/leads
/api/appointments
/api/client-error
/api/health
```

## Ativar o backend

1. Crie um projeto no Supabase.
2. Execute `supabase/schema.sql` no SQL Editor.
3. Configure na Vercel:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
# ou a chave secreta moderna do projeto:
SUPABASE_SECRET_KEY=
RATE_LIMIT_SALT=
```

4. Gere o acesso administrativo:

```bash
npm run admin:hash -- "uma-senha-longa-e-unica"
```

5. Copie `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET` e `RATE_LIMIT_SALT` para a Vercel.

Mais detalhes em `BUSINESS-SETUP.md` e `BACKUP-RECOVERY.md`.

## Email automático opcional

```env
RESEND_API_KEY=
EMAIL_FROM=ALUNERI <contato@seudominio.com>
LEAD_NOTIFY_EMAIL=seu-email@dominio.com
```

## Observação importante

O `SUPABASE_SERVICE_ROLE_KEY`/`SUPABASE_SECRET_KEY`, a senha do admin, tokens e chaves privadas **nunca** devem usar o prefixo `NEXT_PUBLIC_`.

## V5.7 — Admin Control Center

O painel administrativo ganhou uma camada de produtividade e segurança:

- `Ctrl/⌘ + Alt + A` abre o admin a partir do site público;
- `Ctrl/⌘ + K` abre a paleta de comandos dentro do painel;
- sessão administrativa é bloqueada após 30 minutos sem atividade;
- dashboard operacional com prioridades, KPIs e atividade recente;
- filtros e busca em leads, propostas, agenda, CMS e erros;
- `/admin/configuracao` mostra o estado das integrações sem revelar segredos.

O atalho de teclado **não é um mecanismo de segurança**. A rota continua protegida pela autenticação administrativa e cookies HttpOnly assinados.


## Banco compartilhado isolado

Nesta configuração, a ALUNERI usa o projeto Supabase geral existente, mas todas as tabelas são prefixadas com `aluneri_` e o bucket é `aluneri-portfolio-media`, evitando colisão com outros sistemas no mesmo projeto.

## ALUNERI 2.0.2 — Logo, Aurora Prism & Privacy

A versão 2.0.2 consolida a identidade visual da ALUNERI com a paleta Aurora Prism e adiciona uma camada pública de privacidade mais completa:

- novo logotipo vetorial com monograma em fita luminosa;
- paleta azul-noite, ice blue, aqua e lavanda;
- banner de consentimento de cookies;
- analytics carregado somente após consentimento;
- central de preferências acessível a qualquer momento;
- Política de Cookies e Política de Privacidade em português e inglês;
- Termos de Uso revisados;
- rodapé global com atalhos para as páginas legais e preferências de cookies.

A identidade visual está documentada em `BRAND-ALUNERI.md`.
