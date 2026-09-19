# ALUNERI 2.4.1 — Structural Redesign

Esta versão corrige a V2.4.0, que tinha alterações predominantemente em CSS e podia parecer praticamente igual dependendo da cascata anterior.

## Mudanças estruturais reais
- Home recebe classes e blocos novos exclusivos da V2.4.1.
- Novo navegador visual de seções logo após o Hero.
- Hero reorganizado com moldura editorial e painel de sinais do estúdio.
- Cases passam para layout editorial lado a lado no desktop.
- Processo vira timeline visual.
- Serviços/capacidades passam para diretório em grade com hierarquia maior.
- Seções recebem numeração visual grande e consistente.

## Admin
- `admin-v241` isola todo o novo visual da cascata antiga.
- Branding lateral vira um bloco Control Center + Workspace privado.
- Topbar foi reestruturada.
- Dashboard ganhou hero próprio e atalhos rápidos para CRM, Propostas e Agenda.
- KPIs agora têm ícones e layout estrutural novo.
- Painéis, tabelas e superfícies administrativas usam os seletores isolados da V2.4.1.

## Garantia de diferença visual
As mudanças não dependem apenas de sobrescrever seletores antigos: há JSX novo e classes exclusivas `v241-*` e `admin-v241`.
