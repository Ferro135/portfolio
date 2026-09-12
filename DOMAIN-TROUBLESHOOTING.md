# Endereço da NEXORA na Vercel

## Erro ao trocar o endereço gratuito

O domínio `*.vercel.app` é global e precisa estar disponível. Se um endereço como `nexora.vercel.app` já pertencer a outro projeto/conta, a Vercel não consegue atribuí-lo ao seu projeto.

Use um nome único, por exemplo:

- `nexora-portfolio.vercel.app`
- `nexora-web.vercel.app`
- `nexora-systems.vercel.app`
- `nexora-digital.vercel.app`

A disponibilidade precisa ser confirmada na própria Vercel.

## Erro de nome inválido

Ao renomear o projeto, informe apenas o slug, por exemplo:

```text
nexora-portfolio
```

Não informe:

```text
https://nexora-portfolio.vercel.app/
```

## Troquei o domínio e o SEO continuou no antigo

A V5 resolve isso automaticamente usando `VERCEL_PROJECT_PRODUCTION_URL`. Faça um novo deployment depois da mudança.

Se quiser fixar um domínio próprio, configure `NEXT_PUBLIC_SITE_URL` na Vercel.
