# Política de Segurança — NEXORA

## Como reportar uma vulnerabilidade

Evite publicar detalhes de exploração em uma issue pública.

Preferencialmente use **GitHub Security Advisories / Private Vulnerability Reporting** no repositório:

`Security -> Report a vulnerability`

Se essa opção ainda não estiver habilitada, ative em:

`GitHub -> Settings -> Security -> Private vulnerability reporting`

Inclua:
- rota ou recurso afetado;
- impacto observado;
- passos mínimos para reproduzir;
- navegador/ambiente;
- sugestão de correção, se houver.

## Escopo atual

Este repositório é um portfólio público em Next.js. Não possui autenticação própria nem API de processamento do briefing. O formulário de contato monta a mensagem no navegador e abre o WhatsApp.

## Segredos

Nunca envie para o repositório:
- tokens da Vercel;
- chaves privadas;
- Supabase `service_role`;
- senhas;
- cookies de sessão;
- qualquer segredo em variável `NEXT_PUBLIC_*`.

Tudo que começa com `NEXT_PUBLIC_` deve ser tratado como público.
