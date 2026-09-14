# ALUNERI — Sistema de Cookies e Privacidade

## Consentimento

O site usa `aluneri_cookie_consent` para registrar a preferência do visitante por até 180 dias.

Níveis atuais:

- `essential`: somente funções essenciais;
- `analytics`: libera Vercel Analytics e Speed Insights.

## Analytics

`ClientTelemetry` somente monta Vercel Analytics e Speed Insights quando o consentimento atual é `analytics`.

## Gerenciar preferências

O visitante pode reabrir as preferências por:

- botão flutuante `Cookies`;
- botão `Preferências de cookies` no rodapé;
- Política de Cookies.

## Páginas públicas

Português:

- `/privacidade`
- `/cookies`
- `/termos`

English:

- `/en/privacy`
- `/en/cookies`
- `/en/terms`

## Segurança

O cookie de preferência usa `SameSite=Lax`, `Path=/` e `Secure` em HTTPS. Credenciais administrativas, Supabase Secret Key e demais segredos permanecem apenas no backend.
