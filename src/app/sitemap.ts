import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { listPublicCmsProjects } from "@/lib/server/business";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cms = await listPublicCmsProjects();
  const paths = [
    ["",1,"monthly"],["/sobre",0.7,"monthly"],["/servicos",0.9,"monthly"],["/projetos",0.9,"monthly"],["/resultados",0.7,"monthly"],["/agendar",0.7,"monthly"],["/contato",0.8,"monthly"],["/cookies",0.3,"yearly"],["/privacidade",0.3,"yearly"],["/termos",0.3,"yearly"],["/projetos/zentra",0.8,"monthly"],["/projetos/spazio-gestao",0.8,"monthly"],
    ["/en",0.8,"monthly"],["/en/privacy",0.2,"yearly"],["/en/cookies",0.2,"yearly"],["/en/terms",0.2,"yearly"],["/en/about",0.5,"monthly"],["/en/services",0.7,"monthly"],["/en/projects",0.7,"monthly"],["/en/results",0.5,"monthly"],["/en/contact",0.6,"monthly"],["/en/schedule",0.5,"monthly"],["/en/projects/zentra",0.6,"monthly"],["/en/projects/spazio-management",0.6,"monthly"]
  ] as const;
  return [
    ...paths.map(([path,priority,changeFrequency])=>({url:`${siteUrl}${path}`,priority,changeFrequency})),
    ...cms.map(project=>({url:`${siteUrl}/projetos/${project.slug}`,priority:0.6,changeFrequency:"monthly" as const})),
  ];
}
