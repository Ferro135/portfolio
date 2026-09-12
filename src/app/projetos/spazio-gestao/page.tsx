import type { Metadata } from "next";
import { ProjectCase } from "@/components/ProjectCase";
import { StructuredData } from "@/components/StructuredData";
import { siteUrl } from "@/lib/site";
import { getProjectBySlug } from "@/data/portfolio";

const project = getProjectBySlug("spazio-gestao")!;
export const metadata: Metadata = {
  title: "Spazio Gestão — Projeto",
  description: project.description,
  alternates: { canonical: `/projetos/${project.slug}` },
  openGraph: {
    type: "website",
    url: `/projetos/${project.slug}`,
    title: "Spazio Gestão — Projeto NEXORA",
    description: project.description,
    images: [{ url: "/og/spazio.png", width: 1200, height: 630, alt: "Spazio Gestão — Projeto NEXORA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spazio Gestão — Projeto NEXORA",
    description: project.description,
    images: ["/og/spazio.png"],
  },
};


const projectSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: project.title,
  description: project.description,
  url: `${siteUrl}/projetos/${project.slug}`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  creator: {
    "@type": "Organization",
    name: "NEXORA",
    url: siteUrl,
  },
};

export default function SpazioPage() {
  return <><StructuredData data={projectSchema} /><ProjectCase project={project} /></>;
}
