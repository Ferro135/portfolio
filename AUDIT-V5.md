# Auditoria NEXORA V5

## Itens implementados

### Build e dependências
- Dependências principais fixadas em versões explícitas.
- Next.js atualizado para o patch 16.3.4.
- Analytics 2.0.1 e Speed Insights 2.0.0 adicionados.
- `.npmrc` força versões exatas e lockfile.
- CI gera e commita `package-lock.json` no primeiro push quando necessário.
- `tsconfig.json` inclui `.next/dev/types/**/*.ts`, evitando a alteração automática observada na Vercel.

### CI
- GitHub Actions em push e pull request para `main`.
- TypeScript obrigatório antes do build.
- Build de produção obrigatório.
- Um erro como o antigo `Cannot find name 'Mail'` passa a ser detectado antes de uma publicação ser considerada válida.

### SEO
- Removida a URL aleatória fixa de deployment.
- URL canônica usa domínio configurado ou domínio de produção fornecido pela Vercel.
- Canonical na home e em cada projeto.
- Sitemap e robots usam a URL canônica.
- Open Graph específico para Zentra e Spazio Gestão.
- Textos e identidade padronizados em português.

### Screenshots
- Barra lateral do navegador removida.
- Informações pessoais/identificáveis ocultadas.
- Arquivos convertidos para WebP e otimizados.
- Três visualizações por projeto: visão geral + dois recortes de detalhe.
- As visualizações adicionais são recortes das screenshots reais; nenhuma tela inexistente foi fabricada.

### Cases
- Galeria responsiva.
- Lightbox em tela cheia.
- Navegação anterior/próxima.
- Teclas `Esc`, `←` e `→`.
- Narrativa: desafio → solução → resultado.
- A seção de stack foi substituída por **Arquitetura e entrega**, evitando afirmar tecnologias não confirmadas.

### Conteúdo
- Texto “identidade de desenvolvimento web” substituído por uma proposta de valor mais natural.
- `Selected work`, `Digital Products`, `Web & Systems` e outros trechos foram padronizados em português.
- WhatsApp é o contato principal; GitHub é secundário.
- WhatsApp abre com mensagem pronta.

### Acessibilidade
- Link “Pular para o conteúdo”.
- Foco visível global.
- Menu mobile fecha com `Esc`.
- `aria-controls`/`aria-expanded` no botão do menu.
- Galeria com `role=dialog`, labels e navegação por teclado.
- Seções compensam a altura do header sticky com `scroll-margin-top`.
- Cores secundárias ganharam contraste.

### Performance e monitoramento
- `next/image` em todas as screenshots do portfólio.
- WebP otimizado.
- Vercel Web Analytics integrado.
- Vercel Speed Insights integrado.

### Segurança
- `X-Content-Type-Options: nosniff`.
- `X-Frame-Options: DENY`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` restringe câmera, microfone, geolocalização, pagamento e USB.
- HSTS para produção HTTPS.

### Manutenção
- `DashboardPreview.tsx` removido; as screenshots reais agora são a única fonte visual dos projetos.
- CSS antigo de dashboard, previews e seção About removido.
- `globals.css` caiu de mais de 1.000 linhas para aproximadamente 800 linhas.
- Tailwind agora é usado diretamente nos novos componentes de galeria, screenshot e 404, com tokens NEXORA definidos via `@theme`.

### Experiência de erro
- Página 404 personalizada e alinhada à identidade NEXORA.


### Endereço e domínio
- A URL não fica mais presa ao deployment aleatório antigo.
- `siteUrl` prioriza `NEXT_PUBLIC_SITE_URL`, depois o domínio de produção fornecido pela Vercel.
- Renomear o projeto ou trocar o domínio não exige alteração de código.
- `.env.example` e `DOMAIN-TROUBLESHOOTING.md` adicionados com instruções para `.vercel.app` e domínio próprio.
