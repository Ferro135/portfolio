import { ArrowUpRight, Monitor } from "@/components/Icons";
import type { Project } from "@/data/portfolio";

export function ProjectMedia({ project }: { project: Project }) {
  if (!project.tourVideo && !project.demoUrl) return null;

  return (
    <section className="case-section project-media-section" id="tour" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <div><span className="eyebrow">Tour visual</span><h2>Uma visão rápida do produto.</h2></div>
          <p>Prévia montada somente com capturas reais do projeto. Não simula interações que não foram gravadas.</p>
        </div>

        <div className="project-media-grid">
          {project.tourVideo && (
            <div className="project-video-card">
              <div className="project-video-topbar">
                <span><Monitor size={15} /> Capturas reais do produto</span>
                <small>7,5 segundos</small>
              </div>
              <video
                controls
                muted
                playsInline
                preload="metadata"
                poster={project.gallery[0]?.src}
                aria-label={`Tour visual do projeto ${project.title}`}
              >
                <source src={project.tourVideo} type="video/mp4" />
                Seu navegador não suporta vídeo HTML5.
              </video>
              <p className="project-media-note">Este vídeo é uma apresentação visual criada a partir das screenshots reais do case; não é uma demo funcional gravada.</p>
            </div>
          )}

          <aside className="project-demo-card">
            <span className="eyebrow">Acesso</span>
            <h3>{project.demoUrl ? "Demo pública disponível" : "Acesso público protegido"}</h3>
            <p>
              {project.demoUrl
                ? "Existe uma versão pública configurada para este case. Abra em uma nova aba para explorar o produto."
                : "Este sistema possui áreas administrativas e dados operacionais. Por isso, o case mostra capturas tratadas em vez de expor um ambiente privado."}
            </p>
            {project.demoUrl ? (
              <a className="button button-primary" href={project.demoUrl} target="_blank" rel="noreferrer">Abrir sistema <ArrowUpRight size={16} /></a>
            ) : (
              <span className="private-demo-badge">Demo pública não configurada</span>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
