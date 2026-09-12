import type { Metadata } from "next";
import { ProjectCase } from "@/components/ProjectCase";
import { getProjectBySlug } from "@/data/portfolio";

const project = getProjectBySlug("spazio-gestao")!;

export const metadata: Metadata = {
  title: "Spazio Gestão — Case",
  description: project.description,
  openGraph: {
    title: "Spazio Gestão — Case NEXORA",
    description: project.description,
  },
};

export default function SpazioPage() {
  return <ProjectCase project={project} />;
}
