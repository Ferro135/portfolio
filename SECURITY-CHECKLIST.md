# Checklist de segurança da ALUNERI

## Código
- [x] CSP
- [x] HSTS
- [x] anti-clickjacking
- [x] nosniff
- [x] Referrer-Policy
- [x] Permissions-Policy
- [x] COOP / CORP
- [x] source maps de produção desativados
- [x] header `X-Powered-By` removido
- [x] URLs de demos limitadas a HTTPS
- [x] limites de tamanho no briefing
- [x] analytics condicionado a consentimento
- [x] páginas de cookies e privacidade

## Supply chain
- [x] CI read-only
- [x] Dependabot
- [x] CodeQL
- [x] `npm audit`
- [ ] executar uma vez o workflow manual para gerar `package-lock.json`

## GitHub
- [ ] Branch protection / ruleset na `main`
- [ ] Secret scanning
- [ ] Push protection
- [ ] Private vulnerability reporting
- [ ] 2FA

## Vercel
- [ ] confirmar System Mitigations ativas
- [ ] revisar Firewall
- [ ] proteger Preview deployments quando possível
- [ ] usar Attack Mode em incidente
- [ ] 2FA

## Contas relacionadas
- [ ] 2FA no Supabase
- [ ] 2FA no registrador do domínio
- [ ] 2FA no email administrativo
- [ ] senhas únicas e gerenciador de senhas
