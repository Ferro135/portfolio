import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-omega-steel-enwtatsyqo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1, changeFrequency: "monthly" },
    { url: `${siteUrl}/projetos/zentra`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/projetos/spazio-gestao`, priority: 0.8, changeFrequency: "monthly" },
  ];
}
