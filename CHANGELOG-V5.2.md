# NEXORA V5.2 — checklist

## Conversão e apresentação

- [x] Resultados/impactos por projeto sem números inventados
- [x] Processo em 4 etapas: entendimento, interface, desenvolvimento, publicação/evolução
- [x] Hotspots interativos nas screenshots dos projetos
- [x] Comparativo antes/depois
- [x] CTA flutuante para WhatsApp
- [x] FAQ
- [x] Página `/contato` com briefing
- [x] CTA separado "Solicitar orçamento"
- [x] Página `/sobre`
- [x] Bloco "O que podemos construir"
- [x] Indicador de disponibilidade
- [x] Animações sutis por scroll

## Cases

- [x] Galeria ampliável existente preservada
- [x] Contexto, desafio, abordagem e produto
- [x] Impacto
- [x] Antes/depois
- [x] Mockup interativo
- [x] Desktop + enquadramento em moldura mobile com aviso transparente
- [x] SEO/Open Graph individual por projeto

## Confiança

- [x] Infraestrutura para depoimentos reais
- [x] Depoimentos fictícios continuam proibidos; seção fica oculta enquanto a lista estiver vazia

## Base técnica preservada

- [x] Analytics e Speed Insights
- [x] 404 customizada
- [x] Headers de segurança
- [x] Acessibilidade e `prefers-reduced-motion`
- [x] Sitemap com `/sobre` e `/contato`
- [x] CI GitHub + TypeScript + build
- [x] Node 22.x
- [x] Compilação restrita a `src/`

## Observação

O tema escuro foi mantido como identidade visual principal da NEXORA. A sugestão anterior de modo claro/escuro era condicional e não foi forçada na V5.2 porque o dark atual é parte forte da identidade e as capturas dos produtos também seguem essa direção visual.


## V5.2.1 — correção de navegação

- Corrigido o ScrollReveal em navegação client-side do Next.js.
- Seções de /contato, /sobre e cases não ficam mais invisíveis após trocar de rota sem recarregar a página.
- Elementos já próximos da viewport são revelados imediatamente após a navegação.
