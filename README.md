# NEXORA — Portfolio V5.2

Portfólio da **NEXORA — Produtos Digitais & Sistemas**, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## O que a V5.2 adiciona

- seção **Da ideia ao produto** com o processo em 4 etapas;
- bloco **O que podemos construir** com 6 tipos de entrega;
- **Impacto** em cada projeto sem inventar métricas;
- comparativo **Antes & depois** nos cases;
- **mockup interativo** com hotspots clicáveis sobre as interfaces reais;
- galeria ampliável + apresentação desktop e recorte em moldura mobile;
- página **/sobre** dedicada à NEXORA;
- página **/contato** com formulário/briefing interativo;
- briefing gera mensagem pronta para WhatsApp e também pode ser copiado;
- CTA separado de **Solicitar orçamento**;
- **WhatsApp flutuante** após o visitante rolar a página;
- FAQ na Home e na página de contato;
- indicador de disponibilidade mais presente;
- animações sutis ao entrar no viewport, respeitando `prefers-reduced-motion`;
- infraestrutura para **depoimentos reais**, sem publicar depoimentos fictícios;
- sitemap atualizado com `/sobre` e `/contato`;
- SEO e Open Graph individuais dos cases preservados;
- Analytics, Speed Insights, headers de segurança, 404 e acessibilidade preservados da V5.1.

## Depoimentos

O arquivo `src/data/portfolio.ts` contém `testimonials`, que permanece vazio de propósito.
A seção só aparece quando um depoimento real e autorizado for adicionado. A NEXORA não usa prova social fictícia.

## Briefing / contato

O formulário em `/contato` não envia informações para um servidor e não armazena dados.
Ele monta o briefing no navegador e oferece:

- envio pelo WhatsApp;
- cópia do texto do briefing.

O número configurado está centralizado em `src/data/portfolio.ts`.

## Screenshots e mobile

Os cases utilizam capturas reais tratadas. A moldura mobile da V5.2 usa um **recorte da captura real** para apresentação visual e é rotulada como tal; ela não se apresenta como uma captura nativa do aplicativo em celular.

Quando existirem screenshots mobile reais, basta adicioná-los à galeria de cada projeto em `src/data/portfolio.ts`.

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

Ali ficam:

- projetos;
- impacto;
- antes/depois;
- hotspots interativos;
- WhatsApp e GitHub;
- FAQ;
- processo;
- capacidades;
- depoimentos;
- tecnologias.

## Endereço / domínio na Vercel

A aplicação usa a seguinte ordem para descobrir a URL do site:

1. `NEXT_PUBLIC_SITE_URL`, quando configurada manualmente;
2. domínio de produção informado pela Vercel (`VERCEL_PROJECT_PRODUCTION_URL`);
3. URL do deployment atual (`VERCEL_URL`);
4. `localhost` no desenvolvimento.

Por isso, renomear o projeto ou trocar o domínio na Vercel não exige alterar o código.

## GitHub Actions e package-lock

O workflow `.github/workflows/ci.yml`:

- gera `package-lock.json` automaticamente caso ainda não exista;
- instala as dependências;
- executa TypeScript;
- executa o build de produção;
- tenta commitar o lockfile no primeiro push.

Se o GitHub bloquear o commit automático, em **Settings → Actions → General → Workflow permissions**, habilite **Read and write permissions** e rode o workflow novamente.

## Analytics

Vercel Web Analytics e Speed Insights já estão integrados. Ative os recursos no painel da Vercel para receber dados.

## Limpeza de versões antigas no GitHub

Mantenha somente o projeto atual na raiz. Apague pastas antigas como:

```text
NEXORA-Portfolio-V2
NEXORA-Portfolio-V3
NEXORA-Portfolio-V4
portfolio-web
```

O `tsconfig.json` também restringe a compilação a `src/`, evitando que versões antigas sejam compiladas por acidente.
