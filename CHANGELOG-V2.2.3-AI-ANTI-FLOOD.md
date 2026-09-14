# ALUNERI 2.2.3 — AI Anti-Flood & Conversation Fix

## Corrigido
- Trava imediata com `useRef` impede duplo envio antes do React atualizar o estado.
- Cada requisição recebe sequência própria; respostas antigas/fora de ordem são ignoradas.
- Requisição anterior é abortada ao iniciar/resetar uma conversa.
- Mensagens idênticas enviadas em intervalo muito curto são bloqueadas.
- Respostas duplicadas também são bloqueadas no navegador.
- Botões de sugestões ficam desativados enquanto a IA responde.

## Anti-repetição no servidor
- O prompt agora inclui explicitamente a última resposta do assistente e proíbe repeti-la.
- Similaridade é comparada contra as últimas respostas do assistente.
- Se o modelo gerar resposta repetida, uma segunda geração de reparo é executada automaticamente.
- Se ainda repetir, o servidor avança a conversa com uma pergunta nova em vez de devolver o mesmo texto.

## Fallback / diagnóstico
- O modo local deixa de devolver a mesma resposta genérica a cada turno.
- Perguntas de descoberta giram para não repetir a pergunta anterior.
- Se a OpenAI estiver configurada e falhar, o site mostra erro temporário em vez de fingir sucesso com uma resposta genérica repetida.
- O chat informa discretamente quando está em `Modo essencial`.
- O modelo ativo aparece no rodapé do chat quando a OpenAI está respondendo.

## UX
- Botão `Nova` reinicia a conversa, aborta requisição pendente e limpa contexto do briefing.
- O namespace do rate-limit foi renovado para não herdar contagens geradas pelo bug de flood da versão anterior.
