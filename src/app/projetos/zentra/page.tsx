import type { Metadata } from "next";
import { ProjectCase } from "@/components/ProjectCase";
import { getProjectBySlug } from "@/data/portfolio";

const project = getProjectBySlug("zentra")!;
const preview = project.cover;

export const metadata: Metadata = {
  title: "Zentra — Projeto",
  description: project.description,
  alternates: { canonical: `/projetos/${project.slug}` },
  openGraph: {
    type: "website",
    url: `/projetos/${project.slug}`,
    title: "Zentra — Projeto NEXORA",
    description: project.description,
    images: [{ url: preview.src, width: preview.width, height: preview.height, alt: preview.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentra — Projeto NEXORA",
    description: project.description,
    images: [preview.src],
  },
};

export default function ZentraPage() {
  return <ProjectCase project={project} />;
}
