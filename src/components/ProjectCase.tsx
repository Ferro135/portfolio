import Link from "next/link";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Header } from "@/components/Header";
import { ArrowLeft, ArrowRight, Check, Github, Spark } from "@/components/Icons";
import { NexoraLogo } from "@/components/NexoraLogo";
import { brand, contact, type Project } from "@/data/portfolio";

export function ProjectCase({ project }: { project: Project }) {
  return (
    <main>
      <Header />

      <section className="case-hero">
        <div className="case-orb case-orb-one" />
        <div className="case-orb case-orb-two" />
        <div className="shell">
          <Link className="case-back" href="/#projetos"><ArrowLeft /> Voltar aos projetos</Link>
          <div className="case-hero-grid">
            <div>
              <span className="eyebrow">Case {project.number} · {project.category}</span>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <div className="case-tags">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            <div className="case-intro-card">
              <span>Projeto</span>
              <strong>{project.title}</strong>
              <span>Foco</span>
              <strong>{project.eyebrow}</strong>
              <span>Stack principal</span>
              <strong>{project.technologies.slice(0, 3).join(" · ")}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="case-preview-section">
        <div className="shell">
          <div className="case-preview-shell">
            <div className="case-preview-topbar">
              <div><i /><i /><i /></div>
              <span>Preview da interface</span>
              <small>NEXORA / {project.slug}</small>
            </div>
            <DashboardPreview variant={project.id} />
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="shell case-story-grid">
          <div className="case-story-title">
            <span className="eyebrow">Contexto</span>
            <h2>Do problema<br />à solução.</h2>
          </div>
          <div className="case-story-content">
            <div className="story-block">
              <span>01</span>
              <div>
                <h3>O desafio</h3>
                <p>{project.challenge}</p>
              </div>
            </div>
            <div className="story-block">
              <span>02</span>
              <div>
                <h3>A abordagem</h3>
                <p>{project.solution}</p>
              </div>
            </div>
            <div className="story-block">
              <span>03</span>
              <div>
                <h3>O produto</h3>
                <p>{project.longDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section case-features-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Destaques</span>
              <h2>O que o sistema prioriza</h2>
            </div>
            <p>Funcionalidades apresentadas pelo papel que cumprem na experiência, e não apenas como uma lista técnica.</p>
          </div>
          <div className="case-features-grid">
            {project.features.map((feature, index) => (
              <article key={feature.title}>
                <span className="feature-index">0{index + 1}</span>
                <span className="feature-icon"><Check /></span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section case-principles-section">
        <div className="shell case-principles-grid">
          <div>
            <span className="eyebrow">Direção de produto</span>
            <h2>Princípios do case</h2>
            <p>Decisões de interface e estrutura guiadas pela rotina de quem realmente utiliza o sistema.</p>
          </div>
          <div className="principle-list">
            {project.principles.map((principle, index) => (
              <span key={principle}><b>0{index + 1}</b>{principle}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section case-stack-section">
        <div className="shell">
          <span className="eyebrow">Tecnologia</span>
          <h2>Stack do projeto</h2>
          <div className="case-stack-list">
            {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </div>
      </section>

      <section className="case-next-section">
        <div className="shell">
          <div className="case-next-card">
            <div>
              <span className="eyebrow">NEXORA</span>
              <h2>Um bom sistema começa com um problema bem entendido.</h2>
              <p>Veja o outro case ou acompanhe os próximos projetos pelo GitHub.</p>
            </div>
            <div className="case-next-actions">
              <Link className="button button-primary" href="/#projetos">Ver todos os projetos <ArrowRight /></Link>
              <a className="button button-secondary" href={contact.github} target="_blank" rel="noreferrer"><Github /> GitHub</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <Link className="footer-brand" href="/#inicio">
            <NexoraLogo className="footer-logo" />
            <span>{brand.tagline}</span>
          </Link>
          <span>© 2026 NEXORA. Produtos digitais feitos para funcionar.</span>
          <a className="footer-github" href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub Ferro135"><Github /></a>
        </div>
      </footer>
    </main>
  );
}
