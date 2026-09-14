# ALUNERI Portfolio V5.7 — Admin Control Center

## Acesso rápido
- Atalho global `Ctrl/⌘ + Alt + A` abre `/admin` em qualquer página
- O atalho é apenas conveniência: autenticação por senha continua obrigatória
- `Ctrl/⌘ + K` dentro do painel abre uma paleta de navegação rápida

## Painel administrativo
- Sidebar redesenhada e organizada em Operação, Conteúdo e Sistema
- Destaque automático da rota atual
- Topbar privada com ambiente e atalhos
- Dashboard com KPIs, itens que exigem atenção, pipeline, conteúdo e atividade recente
- Leads com busca, filtros, indicadores e status traduzidos
- Propostas com filtros, valores enviados/aceitos e link público copiável
- Agendamentos com filtros e contato rápido
- Projetos e depoimentos com criação recolhível, busca e confirmação antes de excluir
- Erros com busca, período e stack trace recolhível
- Nova página `/admin/configuracao` para saúde das integrações sem expor segredos

## Segurança e UX
- Logout automático após 30 minutos sem atividade
- Endpoint seguro de logout do admin
- Login redesenhado com mensagens de segurança
- Ações destrutivas pedem confirmação
- Nenhum atalho substitui autenticação ou expõe credenciais

## Versão
- package: 1.7.0
