import type { Metadata } from "next";
import { ProjectCase } from "@/components/ProjectCase";
import { StructuredData } from "@/components/StructuredData";
import { siteUrl } from "@/lib/site";
import { getProjectBySlug } from "@/data/portfolio";

const project = getProjectBySlug("zentra")!;
export const metadata: Metadata = {
  title: "Zentra — Projeto",
  description: project.description,
  alternates: { canonical: `/projetos/${project.slug}` },
  openGraph: {
    type: "website",
    url: `/projetos/${project.slug}`,
    title: "Zentra — Projeto NEXORA",
    description: project.description,
    images: [{ url: "/og/zentra.png", width: 1200, height: 630, alt: "Zentra — Projeto NEXORA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentra — Projeto NEXORA",
    description: project.description,
    images: ["/og/zentra.png"],
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

export default function ZentraPage() {
  return <><StructuredData data={projectSchema} /><ProjectCase project={project} /></>;
}
