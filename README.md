# Portfólio Web

Portfólio pessoal focado em desenvolvimento de sites, dashboards e sistemas web.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- CSS responsivo e animações leves

## Como executar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Build de produção

```bash
npm run build
npm start
```

## Personalização

Edite `src/data/portfolio.ts` para trocar:

- Nome
- E-mail
- GitHub
- LinkedIn
- WhatsApp
- Textos dos projetos

Os projetos Zentra e Spazio Gestão estão configurados em `src/data/portfolio.ts` e os previews visuais são gerados pelo próprio front-end, sem depender de imagens externas.

## Publicação na Vercel

1. Envie o projeto para um repositório Git.
2. Importe o repositório na Vercel.
3. A Vercel detectará Next.js automaticamente.
4. Publique sem necessidade de configuração extra.
