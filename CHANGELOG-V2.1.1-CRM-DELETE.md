# ALUNERI 2.1.1 — Exclusão de Leads / CRM

- Adiciona botão de excluir diretamente na lista `/admin/leads`.
- Adiciona Zona de Risco no detalhe de cada lead.
- Exclusão exige confirmação explícita.
- Server Action valida novamente a sessão administrativa antes de excluir.
- Remove permanentemente briefing, status e notas internas do lead.
- Propostas já criadas são preservadas; o banco usa `ON DELETE SET NULL`.
- Dashboard e listagem são revalidados após exclusão.
- Feedback de sucesso após remover um lead.
