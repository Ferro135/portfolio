import type { Project } from "@/data/portfolio";

export function ProjectMetrics({ project }: { project: Project }) {
  if (!project.metrics.length) return null;

  return (
    <section className="case-section project-metrics-section" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <div><span className="eyebrow">Resultados medidos</span><h2>Números validados do projeto.</h2></div>
          <p>Esta seção só aparece quando existem métricas reais e verificáveis. Nenhum número é estimado para preencher o portfólio.</p>
        </div>
        <div className="project-metrics-grid">
          {project.metrics.map((metric) => (
            <article key={`${metric.value}-${metric.label}`}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              {metric.description && <p>{metric.description}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
