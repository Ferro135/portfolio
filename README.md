# NEXORA — Portfolio V5.3

Portfólio da **NEXORA — Produtos Digitais & Sistemas**, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## Destaques da V5.3

- screenshots reais do **Zentra** e **Spazio Gestão** tratadas para portfólio;
- capas próprias dos cases usando as interfaces reais;
- galeria com visão geral + recortes reais de áreas importantes;
- **tour visual em vídeo** para cada projeto, criado somente a partir das capturas reais;
- infraestrutura para botão **Abrir demo**, exibido apenas se uma URL pública for configurada;
- suporte a **email profissional** por variável de ambiente;
- infraestrutura para **métricas reais**, que permanece oculta enquanto não houver números validados;
- auditoria automática de Home, Contato, Zentra e Spazio com **Lighthouse** no GitHub Actions;
- Open Graph dos cases usando a capa real do projeto;
- Vercel Analytics e Speed Insights preservados;
- todas as melhorias da V5.2.1 continuam presentes.

## Transparência dos cases

A NEXORA não inventa telas, números, depoimentos ou demos para preencher o portfólio.

Os vídeos `tour.mp4` são **tours visuais baseados em screenshots reais**. Eles não são apresentados como gravações de uma demo interativa.

As métricas de negócio ficam em `metrics: []` dentro de cada projeto. A seção só aparece depois que valores reais forem adicionados.

## Configuração opcional na Vercel

Use estas variáveis somente quando tiver os dados correspondentes:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_ZENTRA_DEMO_URL=
NEXT_PUBLIC_SPAZIO_DEMO_URL=
```

- `NEXT_PUBLIC_SITE_URL`: domínio canônico próprio, se quiser fixar um;
- `NEXT_PUBLIC_CONTACT_EMAIL`: email profissional que aparecerá no contato;
- `NEXT_PUBLIC_ZENTRA_DEMO_URL`: demo pública do Zentra;
- `NEXT_PUBLIC_SPAZIO_DEMO_URL`: demo pública do Spazio.

Se as URLs de demo ficarem vazias, o case explica que o ambiente é privado em vez de mostrar um botão quebrado.

## Depoimentos

`src/data/portfolio.ts` contém a lista `testimonials`, mantida vazia até existir autorização de um cliente real.

## Screenshots

Assets principais:

```text
public/projects/zentra/
  cover.webp
  overview.webp
  dashboard-detail.webp
  operations-detail.webp
  tour.mp4

public/projects/spazio/
  cover.webp
  overview.webp
  dashboard-detail.webp
  operations-detail.webp
  tour.mp4
```

Quando houver novas telas reais, adicione-as à galeria em `src/data/portfolio.ts`.

## Rodar localmente

```bash
npm install
npm run dev
```

## Validar antes de publicar

```bash
npm run check
```

## Lighthouse automático

O workflow `.github/workflows/lighthouse.yml`:

- instala o projeto;
- executa o build;
- sobe a aplicação localmente;
- testa `/`, `/contato`, `/projetos/zentra` e `/projetos/spazio-gestao`;
- salva os relatórios como artifact no GitHub Actions;
- alerta quando performance, acessibilidade, boas práticas ou SEO caem abaixo dos limites definidos.

Os limites ficam em `scripts/check-lighthouse.mjs`.

## Analytics

Vercel Web Analytics e Speed Insights continuam integrados no layout. Para receber dados, habilite os recursos no painel do projeto na Vercel.

## Domínio

A URL canônica segue esta prioridade:

1. `NEXT_PUBLIC_SITE_URL`;
2. `VERCEL_PROJECT_PRODUCTION_URL`;
3. `VERCEL_URL`;
4. localhost.

Assim o código acompanha o domínio de produção da Vercel sem ficar preso a URLs antigas.

## Estrutura principal

- `src/data/portfolio.ts` — projetos, contato, demos, métricas, FAQ, processo e depoimentos;
- `src/components/ProjectCase.tsx` — página completa dos cases;
- `src/components/ProjectMedia.tsx` — tour visual e acesso à demo;
- `src/components/ProjectMetrics.tsx` — métricas reais quando existirem;
- `src/components/ProjectGallery.tsx` — galeria/lightbox;
- `src/app/contato` — briefing e canais de contato;
- `.github/workflows/ci.yml` — TypeScript e build;
- `.github/workflows/lighthouse.yml` — auditoria de qualidade web.
