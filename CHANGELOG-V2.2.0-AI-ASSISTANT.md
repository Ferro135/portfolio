# ALUNERI 2.2.0 — AI Assistant

## Assistente público
- Novo botão “Pergunte à ALUNERI”.
- Chat focado em serviços, cases, processo e qualificação de projetos.
- Respostas em português ou inglês conforme a página.
- Atalhos para perguntas frequentes.
- Conversa mantida apenas no navegador pela ALUNERI até o visitante confirmar um briefing.

## Segurança
- OPENAI_API_KEY somente server-side.
- Rate limit separado para chat e geração de briefing.
- Limite de tamanho de mensagens e histórico.
- Regras contra solicitação de credenciais, prompts internos e dados administrativos.
- O assistente não pode confirmar preços, prazos, descontos ou disponibilidade.
- Fallback local quando a API de IA não estiver configurada ou estiver indisponível.

## CRM
- A conversa pode ser transformada em briefing.
- O visitante revisa o resumo, informa contato e aceita a política de privacidade.
- O briefing confirmado entra em `aluneri_leads` com origem `assistente-aluneri`.
- WhatsApp continua disponível para handoff humano.

## Privacidade
- Aviso específico antes da primeira conversa com IA.
- Política de Privacidade e Termos atualizados.
- Nenhuma conversa é adicionada ao CRM automaticamente.

## Admin
- `/admin/configuracao` mostra status da OpenAI API, modelo e integração com CRM.

## Configuração
- `OPENAI_API_KEY`
- `OPENAI_MODEL` opcional, padrão: `gpt-5.6-luna`
