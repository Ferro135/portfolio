# ALUNERI V5.5 — Checklist de lançamento

A V5.5 implementa toda a estrutura de conversão, SEO, monitoramento e auditoria. Alguns itens precisam de valores reais para aparecerem de forma correta.

## 1. Domínio próprio

Na Vercel, configure o domínio de produção e depois adicione:

```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

Isso atualiza canonical, sitemap, JSON-LD e Open Graph.

## 2. Email profissional

Crie um endereço no seu domínio, por exemplo:

```text
contato@seu-dominio.com
```

Depois configure na Vercel:

```env
NEXT_PUBLIC_CONTACT_EMAIL=contato@seu-dominio.com
```

Enquanto estiver vazio, o site simplesmente não mostra um email fictício.

## 3. Monitoramento de uptime

GitHub -> Settings -> Secrets and variables -> Actions -> Variables

Crie:

```text
PRODUCTION_URL=https://seu-dominio.com
```

O workflow `Uptime` verifica a Home e `/api/health` uma vez por hora. Uma falha fica registrada no GitHub Actions e pode gerar notificações do GitHub.

## 4. Vídeos reais

Quando houver gravações reais sem credenciais ou dados privados:

```env
NEXT_PUBLIC_ZENTRA_REAL_VIDEO_URL=https://...
NEXT_PUBLIC_SPAZIO_REAL_VIDEO_URL=https://...
```

Se essas variáveis estiverem vazias, o case mantém o tour editorial por screenshots e deixa claro que não é uma gravação funcional.

## 5. Demos públicas

Configure somente versões seguras, sem dados de clientes:

```env
NEXT_PUBLIC_ZENTRA_DEMO_URL=https://...
NEXT_PUBLIC_SPAZIO_DEMO_URL=https://...
```

## 6. Métricas reais

Em `src/data/portfolio.ts`, cada projeto possui:

```ts
metrics: []
```

Adicione apenas números confirmados, por exemplo:

```ts
metrics: [
  {
    value: "3",
    label: "unidades geridas",
    description: "Unidades realmente operadas pelo sistema."
  }
]
```

## 7. Depoimentos

A lista `testimonials` continua vazia de propósito. Inclua somente depoimentos autorizados por pessoas reais.

## 8. Mais screenshots reais

Adicione novas imagens em:

```text
public/projects/zentra/
public/projects/spazio/
```

e registre os arquivos no array `gallery` de cada projeto.

Evite:
- emails;
- nomes de clientes;
- tokens;
- URLs administrativas;
- saldos ou dados financeiros sensíveis.
