# NEXORA — Portfolio V5.5

Portfólio da **NEXORA — Produtos Digitais & Sistemas**, desenvolvido com Next.js, TypeScript e Tailwind CSS.

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
