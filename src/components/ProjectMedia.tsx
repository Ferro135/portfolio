import { ArrowUpRight, Monitor } from "@/components/Icons";
import type { Project } from "@/data/portfolio";

export function ProjectMedia({ project }: { project: Project }) {
  const media = project.realVideo || project.tourVideo;
  const isRealRecording = Boolean(project.realVideo);

  if (!media && !project.demoUrl) return null;

  return (
    <section className="case-section project-media-section" id="tour" data-reveal>
      <div className="shell">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{isRealRecording ? "Produto em movimento" : "Tour visual"}</span>
            <h2>{isRealRecording ? "Veja o sistema funcionando." : "Uma visão rápida do produto."}</h2>
          </div>
          <p>
            {isRealRecording
              ? "Gravação real da interface para mostrar navegação, hierarquia e comportamento do produto."
              : "Enquanto uma gravação real não estiver configurada, esta prévia usa somente capturas reais do projeto e deixa isso explícito."}
          </p>
        </div>

        <div className="project-media-grid">
          {media && (
            <div className="project-video-card">
              <div className="project-video-topbar">
                <span>
                  <Monitor size={15} />
                  {isRealRecording ? "Gravação real do produto" : "Apresentação por capturas reais"}
                </span>
                <small>{isRealRecording ? "Vídeo do sistema" : "Tour editorial"}</small>
              </div>

              <video
                controls
                muted
                playsInline
                preload="metadata"
                poster={project.gallery[0]?.src}
                aria-label={
                  isRealRecording
                    ? `Gravação real do projeto ${project.title}`
                    : `Tour visual do projeto ${project.title}`
                }
              >
                <source src={media} type="video/mp4" />
                Seu navegador não suporta vídeo HTML5.
              </video>

              <p className="project-media-note">
                {isRealRecording
                  ? "Vídeo de demonstração configurado para este case. Nenhuma credencial ou área privada deve aparecer na gravação publicada."
                  : "Esta apresentação foi criada a partir das screenshots reais do case; não é uma gravação funcional do sistema."}
              </p>
            </div>
          )}

          <aside className="project-demo-card">
            <span className="eyebrow">Acesso</span>
            <h3>{project.demoUrl ? "Demo pública disponível" : "Ambiente administrativo protegido"}</h3>
            <p>
              {project.demoUrl
                ? "Existe uma versão pública configurada para este case. Abra em uma nova aba para explorar o produto."
                : "Como o sistema possui áreas administrativas e dados operacionais, o case apresenta material tratado sem expor um ambiente privado."}
            </p>

            {project.demoUrl ? (
              <a
                className="button button-primary"
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Abrir sistema <ArrowUpRight size={16} />
              </a>
            ) : (
              <span className="private-demo-badge">Demo pública não configurada</span>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
