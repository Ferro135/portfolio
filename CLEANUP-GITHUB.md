# Limpeza do repositório GitHub

O erro de build da V5 foi causado por versões antigas do portfólio ainda presentes no mesmo repositório.

## Pode apagar do repositório

- `NEXORA-Portfolio-V2/`
- `NEXORA-Portfolio-V3/`
- `NEXORA-Portfolio-V4/`
- `NEXORA-Portfolio-V4.1/`
- `portfolio-web/`
- qualquer ZIP antigo enviado ao repositório

## Deve permanecer na raiz

- `.github/`
- `public/`
- `src/`
- `.gitignore`
- `.npmrc`
- `next-env.d.ts`
- `next.config.ts`
- `package.json`
- `postcss.config.mjs`
- `tsconfig.json`
- `README.md`

A V5.1 limita o TypeScript aos arquivos atuais dentro de `src/`, então versões antigas não serão mais compiladas acidentalmente.
