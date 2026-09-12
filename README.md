# NEXORA — Portfolio V5

Portfólio da **NEXORA — Produtos Digitais & Sistemas**, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## Principais melhorias da V5

- Cases reais de Zentra e Spazio Gestão com screenshots tratadas para portfólio
- Galeria responsiva com lightbox e navegação por teclado
- WhatsApp principal com mensagem pré-preenchida
- SEO, sitemap, robots e Open Graph por projeto
- URL canônica automática na Vercel
- Vercel Analytics e Speed Insights
- Página 404 própria
- Headers de segurança
- Melhorias de acessibilidade
- CI do GitHub com TypeScript + build
- Dependências em versões explícitas
- Tailwind utilizado nos componentes novos e tokens NEXORA
- CSS legado e preview fictício removidos

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Validar antes de publicar

```bash
npm run typecheck
npm run build
```

Ou:

```bash
npm run check
```

## Dados principais

Edite:

```text
src/data/portfolio.ts
```

Ali ficam projetos, WhatsApp, GitHub, textos e tecnologias/entregas exibidas.

## Endereço / domínio na Vercel

A aplicação usa a seguinte ordem para descobrir a URL do site:

1. `NEXT_PUBLIC_SITE_URL`, quando configurada manualmente;
2. domínio de produção informado pela Vercel (`VERCEL_PROJECT_PRODUCTION_URL`);
3. URL do deployment atual (`VERCEL_URL`);
4. `localhost` no desenvolvimento.

Por isso, **renomear o projeto ou trocar o domínio na Vercel não exige alterar o código**.

### Para trocar apenas o endereço gratuito `.vercel.app`

No nome do projeto use somente um slug válido, por exemplo:

```text
nexora-portfolio
nexora-web
nexora-systems
```

Não use `https://`, barras, espaços ou um endereço completo no campo de nome do projeto. O endereço precisa ser único; se `nexora.vercel.app` já estiver em uso, escolha outro slug.

### Para domínio próprio

Adicione o domínio em **Vercel → Project → Settings → Domains** e siga a configuração DNS indicada pela Vercel.

Depois, opcionalmente, configure:

```text
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

em **Settings → Environment Variables** para forçar esse domínio como canônico.

## GitHub Actions e package-lock

O workflow `.github/workflows/ci.yml`:

- gera `package-lock.json` automaticamente caso ainda não exista;
- instala as dependências;
- executa TypeScript;
- executa o build de produção;
- tenta commitar o lockfile no primeiro push.

Se o GitHub bloquear o commit automático, em **Settings → Actions → General → Workflow permissions**, habilite **Read and write permissions** e rode o workflow novamente.

## Analytics

Os componentes do Vercel Web Analytics e Speed Insights já estão integrados. Ative os recursos no painel da Vercel para começar a receber dados.

## Screenshots

As capturas incluídas em `public/projects/` foram preparadas para o portfólio:

- elementos do navegador removidos;
- dados pessoais/identificáveis ocultados;
- imagens em WebP;
- recortes adicionais derivados das telas reais.

## Limpeza de versões antigas no GitHub

Se o repositório ainda tiver pastas como `NEXORA-Portfolio-V2`, `NEXORA-Portfolio-V3`, `NEXORA-Portfolio-V4` ou `portfolio-web`, apague-as. Elas não pertencem ao projeto atual. A V5.1 também restringe o TypeScript a `src/`, portanto essas pastas antigas não quebram mais o build, mas removê-las mantém o repositório limpo.
