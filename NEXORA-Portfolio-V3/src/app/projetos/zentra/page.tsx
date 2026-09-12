import type { Metadata } from "next";
import { ProjectCase } from "@/components/ProjectCase";
import { getProjectBySlug } from "@/data/portfolio";

const project = getProjectBySlug("zentra")!;

export const metadata: Metadata = {
  title: "Zentra — Case",
  description: project.description,
  openGraph: {
    title: "Zentra — Case NEXORA",
    description: project.description,
  },
};

export default function ZentraPage() {
  return <ProjectCase project={project} />;
}
