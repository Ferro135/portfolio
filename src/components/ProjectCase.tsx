import Link from "next/link";
import { Header } from "@/components/Header";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ArrowLeft, ArrowRight, Check, Github, WhatsApp } from "@/components/Icons";
import { NexoraLogo } from "@/components/NexoraLogo";
import { brand, contact, type Project } from "@/data/portfolio";

export function ProjectCase({ project }: { project: Project }) {
  return (
    <main id="conteudo">
      <Header />

      <section className="case-hero">
        <div className="case-orb case-orb-one" />
        <div className="case-orb case-orb-two" />
        <div className="shell">
          <Link className="case-back" href="/#projetos"><ArrowLeft /> Voltar aos projetos</Link>
          <div className="case-hero-grid">
            <div>
              <span className="eyebrow">Projeto {project.number} · {project.category}</span>
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
              <span>Entrega técnica</span>
              <strong>{project.technicalHighlights.slice(0, 3).join(" · ")}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-28" aria-labelledby="galeria-title">
        <div className="shell">
          <div className="mb-7 grid gap-4 md:grid-cols-[1fr_.8fr] md:items-end">
            <div>
              <span className="eyebrow">Interface real</span>
              <h2 id="galeria-title" className="mt-3 text-3xl font-bold tracking-[-.04em] text-white md:text-5xl">Veja o produto em detalhe.</h2>
            </div>
            <p className="m-0 max-w-xl text-sm leading-7 text-slate-400 md:justify-self-end">
              Capturas preparadas para o portfólio, sem elementos do navegador e com dados pessoais ocultados. Clique para ampliar.
            </p>
          </div>
          <ProjectGallery items={project.gallery} title={project.title} />
        </div>
      </section>

      <section className="case-section">
        <div className="shell case-story-grid">
          <div className="case-story-title">
            <span className="eyebrow">Contexto</span>
            <h2>Do problema<br />ao resultado.</h2>
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
                <h3>A solução</h3>
                <p>{project.solution}</p>
              </div>
            </div>
            <div className="story-block">
              <span>03</span>
              <div>
                <h3>O resultado</h3>
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
          <span className="eyebrow">Arquitetura e entrega</span>
          <h2>O que sustenta o projeto</h2>
          <p className="case-stack-note">Somente tecnologias ou características confirmadas no projeto são apresentadas aqui.</p>
          <div className="case-stack-list">
            {project.technicalHighlights.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="case-next-section">
        <div className="shell">
          <div className="case-next-card">
            <div>
              <span className="eyebrow">NEXORA</span>
              <h2>Um bom sistema começa com um problema bem entendido.</h2>
              <p>Veja o outro case ou entre em contato para conversar sobre um novo projeto.</p>
            </div>
            <div className="case-next-actions">
              <Link className="button button-primary" href="/#projetos">Ver todos os projetos <ArrowRight /></Link>
              <a className="button button-whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer"><WhatsApp /> WhatsApp</a>
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
