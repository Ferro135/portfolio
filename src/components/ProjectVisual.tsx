import Image from "next/image";
import { DashboardPreview } from "@/components/DashboardPreview";
import type { Project } from "@/data/portfolio";

type ProjectVisualProps = {
  project: Project;
  mode?: "card" | "case";
};

export function ProjectVisual({ project, mode = "card" }: ProjectVisualProps) {
  const hasImage = Boolean(project.imageSrc);

  if (!hasImage) {
    return <DashboardPreview variant={project.id} />;
  }

  return (
    <div className={`project-shot project-shot-${mode}`}>
      <Image
        src={project.imageSrc!}
        alt={project.imageAlt || `Screenshot do projeto ${project.title}`}
        fill
        sizes={mode === "card" ? "(max-width: 860px) 100vw, 50vw" : "100vw"}
        className={`project-shot-image ${mode === "case" ? "contain" : "cover"}`}
        priority={mode === "case"}
      />
      <div className="project-shot-overlay" />
      <div className="project-shot-badge">Screenshot real do projeto</div>
    </div>
  );
}
