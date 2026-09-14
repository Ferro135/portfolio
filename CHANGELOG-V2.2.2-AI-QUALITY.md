# ALUNERI 2.2.2 — AI Quality Upgrade

## Qualidade
- Modelo padrão alterado de GPT-5.6 Luna para GPT-5.6 Sol.
- Reasoning padrão `medium`, configurável por `OPENAI_REASONING_EFFORT`.
- Respostas menos engessadas e mais parecidas com uma conversa de descoberta de produto.
- IA pode usar conhecimento geral de software para recomendações, separando isso de fatos confirmados sobre a ALUNERI.
- Limite de resposta ampliado para explicações úteis.

## Grounding
- Base pública ampliada com desafio, solução, features, impacto e princípios dos cases.
- Conhecimento do CMS público também entra no contexto.
- A página atual do visitante entra como contexto para respostas mais relevantes.

## Conversa
- Sugestões de próximas perguntas agora são dinâmicas.
- Detecção automática de tipo de projeto.
- IA informa quando já existe contexto suficiente para gerar briefing.
- Mostra quais informações ainda ajudariam a melhorar a recomendação.
- Perguntas de acompanhamento limitadas a uma por resposta.

## API
- Structured Outputs com JSON Schema.
- `store: false`.
- `prompt_cache_key` estável.
- Fallback de modelo: Sol -> Terra -> Luna para erros de disponibilidade/acesso compatíveis.
- Briefing estruturado com campos faltantes explícitos.
