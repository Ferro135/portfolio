# NEXORA — Portfolio V2

Portfólio web da **NEXORA — Digital Products & Systems**, criado com Next.js, TypeScript e Tailwind CSS.

## O que já vem pronto

- Home responsiva com identidade NEXORA
- Logo vetorial e favicon
- Cases em destaque: Zentra e Spazio Gestão
- Páginas individuais dos dois projetos
- Seções de serviços, tecnologias e contato
- Open Graph para compartilhamento em Discord/WhatsApp/LinkedIn
- Metadata/SEO, robots e sitemap
- GitHub configurado para `Ferro135`

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Build

```bash
npm run build
```

## Onde editar

Os dados principais ficam em:

```text
src/data/portfolio.ts
```

Os campos `email`, `linkedin` e `whatsapp` estão vazios de propósito. Quando você preencher um canal, ele pode ser usado no site sem precisar espalhar os dados por vários componentes.

## Vercel

O projeto está pronto para deploy automático via GitHub + Vercel. Se futuramente usar um domínio próprio, adicione na Vercel a variável opcional:

```text
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

Isso atualiza URLs absolutas usadas pelo SEO e sitemap.

## V4
- Screenshots reais com hover/zoom suave e brilho sutil nos cards.
- WhatsApp principal: +55 16 99157-6717.
- Botão direto "Falar no WhatsApp" no hero.
- WhatsApp destacado como contato principal e GitHub como secundário.
