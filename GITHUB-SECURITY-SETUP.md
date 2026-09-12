# Hardening manual no GitHub

Algumas proteções pertencem à conta/repositório e não podem ser ativadas apenas por arquivos do projeto.

## 1. Gere o package-lock uma única vez

Depois de subir a V5.4:

1. GitHub -> Actions
2. Abra `Gerar package-lock manualmente`
3. `Run workflow`
4. Aguarde o commit automático de `package-lock.json`

Esse workflow possui permissão de escrita **somente porque é manual**. Os workflows automáticos continuam `contents: read`.

Depois que o lockfile existir, CI e Vercel poderão usar versões determinísticas.

## 2. Branch protection / ruleset da main

GitHub -> Settings -> Rules -> Rulesets (ou Branch protection)

Proteja `main` e, se possível:

- Require a pull request before merging
- Require status checks to pass
- Require branches to be up to date
- Block force pushes
- Block deletions

Checks recomendados:
- `quality`
- `dependency-audit`
- CodeQL

Se você trabalha sozinho e prefere push direto, mantenha pelo menos:
- bloquear force-push;
- bloquear delete;
- exigir checks em PRs.

## 3. Segurança nativa do GitHub

Em `Settings -> Security` ative quando disponível:

- Dependabot alerts
- Dependabot security updates
- Secret scanning
- Push protection
- Private vulnerability reporting

## 4. 2FA

Ative 2FA na conta do GitHub e guarde os recovery codes fora do computador principal.
