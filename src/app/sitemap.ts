import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1, changeFrequency: "monthly" },
    { url: `${siteUrl}/projetos/zentra`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${siteUrl}/projetos/spazio-gestao`, priority: 0.8, changeFrequency: "monthly" },
  ];
}
