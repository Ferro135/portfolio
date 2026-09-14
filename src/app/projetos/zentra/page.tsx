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
    title: "Zentra — Projeto ALUNERI",
    description: project.description,
    images: [{ url: "/og/zentra.png", width: 1200, height: 630, alt: "Zentra — Projeto ALUNERI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentra — Projeto ALUNERI",
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
    name: "ALUNERI",
    url: siteUrl,
  },
};

export default function ZentraPage() {
  return <><StructuredData data={projectSchema} /><ProjectCase project={project} /></>;
}
