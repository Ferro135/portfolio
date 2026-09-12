function withProtocol(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function normalizeUrl(value: string) {
  return withProtocol(value).replace(/\/$/, "");
}

/**
 * URL canônica do site.
 * Prioridade: domínio definido manualmente > domínio de produção da Vercel >
 * URL do deployment atual > localhost.
 */
export const siteUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000",
);
