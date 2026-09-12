# Hardening na Vercel e resposta a DDoS

O código do site não deve tentar absorver um DDoS volumétrico. Essa proteção precisa acontecer **antes** de chegar à aplicação, na borda da Vercel.

## 1. Mantenha as mitigações automáticas ativas

A Vercel possui mitigações automáticas de DDoS e filtragem de tráfego.

Nunca deixe `system mitigations` pausado fora de uma investigação curta.

CLI, se o projeto estiver vinculado:

```bash
vercel firewall system-mitigations resume --yes
```

## 2. Attack Mode em incidente

Durante tráfego malicioso intenso, ative Attack Mode:

```bash
vercel firewall attack-mode enable --duration 24h --yes
```

Para desativar depois:

```bash
vercel firewall attack-mode disable --yes
```

No Dashboard também é possível usar a área **Firewall**.

## 3. Regras de Firewall

Para um portfólio estático, evite rate-limit agressivo na página inteira: uma visita normal carrega vários assets.

Se no futuro houver `/api/*`, crie rate-limit apenas nas rotas dinâmicas, de preferência por IP/JA4 e com `challenge` ou `rate_limit`.

Exemplo conceitual:
- caminho começa com `/api/`
- limite: 60 requisições / 60 segundos / IP
- ação: rate limit ou challenge

## 4. Preview Protection

Mantenha produção pública. Proteja deployments de Preview quando possível para evitar exposição desnecessária de versões em desenvolvimento.

## 5. Bot protection

Hoje não existe endpoint de envio no backend. Portanto BotID/CAPTCHA não agrega proteção real.

Se uma API de orçamento for criada depois:
- BotID ou Turnstile;
- rate limit;
- validação server-side;
- limite de payload;
- logs;
- honeypot;
- rejeição de conteúdo malformado.

## 6. Contas

Ative 2FA em:
- GitHub;
- Vercel;
- Supabase;
- registrador do domínio;
- email administrativo.

Não reutilize senhas entre esses serviços.
