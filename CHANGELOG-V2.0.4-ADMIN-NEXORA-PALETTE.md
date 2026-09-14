# ALUNERI 2.0.4 — Admin Repair + NEXORA Palette

## Admin
- Login no admin não depende mais da disponibilidade do Supabase.
- Rate-limit persistente possui fallback seguro em memória.
- Leituras do CRM não derrubam o painel quando o banco/API está temporariamente indisponível.
- Página `/admin/configuracao` agora testa a conexão real com o Supabase.
- Erros de conexão passam a aparecer como diagnóstico em vez de quebrar a interface.

## Identidade
- Restaurada a paleta clássica da NEXORA:
  - `#050914` fundo
  - `#0B1425` painel
  - `#4D7CFF` azul
  - `#4DD9FF` ciano
  - `#9A62FF` roxo
  - `#42E6AD` verde
- Botões voltaram ao gradiente azul da NEXORA.
- Admin, cookies, páginas legais e cards acompanham a mesma linguagem.

## Logo
- Nova logo compacta para a barra superior.
- Monograma A geométrico usando o gradiente azul/ciano/roxo da NEXORA.
- Logo atualizada no header, admin, favicon e assets estáticos.
