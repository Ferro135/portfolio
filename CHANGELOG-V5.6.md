# NEXORA Portfolio V5.6 — Business & Production

## CRM e leads
- briefing salvo via `/api/leads` quando Supabase está configurado
- CRM privado em `/admin`
- pipeline: novo, contatado, proposta, aprovado, em andamento, concluído, arquivado
- notas internas por lead
- rate limit persistente por hash de IP + honeypot
- confirmação por email opcional via Resend

## Propostas
- gerador de proposta a partir de um lead
- link público por token em `/proposta/[token]`
- escopo, entregáveis, preço, prazo, validade e termos
- impressão / salvar em PDF pelo navegador

## CMS
- cadastro e edição de projetos adicionais
- publicação/despublicação sem editar código
- métricas reais via JSON
- gestão de depoimentos autorizados
- página `/projetos` com cases fixos + CMS
- páginas dinâmicas para projetos publicados

## Agendamento
- `/agendar` para solicitação de data e período
- persistência no CRM
- painel admin de agendamentos
- sem fingir disponibilidade em tempo real

## Internacionalização
- versão pública em inglês em `/en`
- Services, Projects, Contact, About, Results e cases em inglês
- seletor PT / EN no header

## Resultados e credibilidade
- `/resultados`
- impactos reais dos cases
- métricas quantitativas apenas quando confirmadas no CMS
- vídeos reais opcionais continuam suportados
- depoimentos carregados do CMS somente quando publicados

## Monitoramento
- captura de erros do navegador em `/api/client-error`
- painel admin de erros
- `/api/health`
- uptime via GitHub Actions

## Qualidade
- performance budget para JS, imagens e vídeos
- Playwright em múltiplas larguras
- axe WCAG para violações serious/critical
- Lighthouse preservado e expandido

## Legal e recuperação
- `/termos`
- privacidade atualizada para CRM e logs técnicos
- exportação JSON pelo admin
- `BACKUP-RECOVERY.md`
- `BUSINESS-SETUP.md`
- `supabase/schema.sql`

## Segurança admin
- senha derivada com scrypt
- cookie HttpOnly + Secure + SameSite Strict
- sessão HMAC assinada
- rate limit no login
- área admin fora do sitemap e bloqueada em robots

## Versão
- 1.6.0
