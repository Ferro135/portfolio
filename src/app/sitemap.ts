import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1, changeFrequency: "monthly" },
    { url: `${siteUrl}/sobre`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/contato`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/cookies`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${siteUrl}/privacidade`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${siteUrl}/projetos/zentra`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/projetos/spazio-gestao`, priority: 0.8, changeFrequency: "monthly" },
  ];
}
