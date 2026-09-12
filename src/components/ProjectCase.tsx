import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectHotspots } from "@/components/ProjectHotspots";
import { DeviceShowcase } from "@/components/DeviceShowcase";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ProjectMetrics } from "@/components/ProjectMetrics";
import { ArrowLeft, ArrowRight, Check, Github, WhatsApp } from "@/components/Icons";
import { NexoraLogo } from "@/components/NexoraLogo";
import { brand, contact, type Project } from "@/data/portfolio";

export function ProjectCase({ project }: { project: Project }) {
  return (
    <main id="conteudo">
      <Header />

      <section className="case-hero case-hero-premium">
        <div className="case-orb case-orb-one" />
        <div className="case-orb case-orb-two" />
        <div className="shell">
          <div className="case-hero-topline">
            <Link className="case-back" href="/#projetos"><ArrowLeft /> Voltar aos projetos</Link>
            <span className="case-index">Case {project.number}</span>
          </div>

          <div className="case-editorial-grid">
            <div className="case-editorial-copy">
              <span className="eyebrow">{project.category}</span>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
              <div className="case-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="case-hero-actions">
                {project.tourVideo && <a className="button button-secondary" href="#tour">Ver tour visual</a>}
                {project.demoUrl && <a className="button button-primary" href={project.demoUrl} target="_blank" rel="noreferrer">Abrir demo</a>}
              </div>
            </div>

            <div className="case-cover-card">
              <div className="case-cover-topbar">
                <span><i /><i /><i /></span>
                <small>Preview do projeto</small>
              </div>
              <div className="case-cover-media">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 520px"
                  className="object-contain object-center p-3"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="case-meta-strip">
            <div><span>Tipo</span><strong>{project.category}</strong></div>
            <div><span>Foco</span><strong>{project.eyebrow}</strong></div>
            <div><span>Direção</span><strong>{project.principles.slice(0, 2).join(" · ")}</strong></div>
            <div><span>Status</span><strong>Case em destaque</strong></div>
          </div>
        </div>
      </section>

      <section className="case-overview-band" data-reveal>
        <div className="shell case-overview-grid">
          <div className="case-overview-lead">
            <span className="eyebrow">Visão geral</span>
            <h2>Um produto pensado para resolver a rotina.</h2>
          </div>
          <div className="case-overview-item">
            <span>01 · Desafio</span>
            <p>{project.challenge}</p>
          </div>
          <div className="case-overview-item">
            <span>02 · Solução</span>
            <p>{project.solution}</p>
          </div>
        </div>
      </section>

      <section className="case-section case-gallery-intro" data-reveal>
        <div className="shell">
          <div className="section-heading">
            <div><span className="eyebrow">Interface real</span><h2>O produto em uso.</h2></div>
            <p>As imagens foram reorganizadas para destacar melhor a interface desktop, os recortes mais importantes e a adaptação mobile, sem deixar a página pesada visualmente. Clique em qualquer imagem para ampliar.</p>
          </div>
          <ProjectGallery items={project.gallery} title={project.title} />
        </div>
      </section>

      <ProjectMedia project={project} />

      <section className="case-section interactive-section" data-reveal>
        <div className="shell">
          <div className="section-heading">
            <div><span className="eyebrow">Explorar interface</span><h2>Veja o que cada área resolve.</h2></div>
            <p>Os pontos abaixo destacam decisões e funções importantes diretamente sobre a captura real do projeto.</p>
          </div>
          <ProjectHotspots project={project} />
        </div>
      </section>

      <section className="case-section transformation-section" data-reveal>
        <div className="shell">
          <div className="section-heading">
            <div><span className="eyebrow">Antes & depois</span><h2>Da complexidade para a clareza.</h2></div>
            <p>Uma comparação direta do cenário que motivou o produto e da experiência que o sistema busca entregar.</p>
          </div>
          <div className="transformation-grid">
            <article className="before-card">
              <span>Antes</span>
              <h3>Processo fragmentado</h3>
              <ul>{project.transformation.before.map((item) => <li key={item}><i />{item}</li>)}</ul>
            </article>
            <div className="transformation-arrow"><ArrowRight size={26} /></div>
            <article className="after-card">
              <span>Depois</span>
              <h3>Produto orientado à rotina</h3>
              <ul>{project.transformation.after.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      <section className="case-section impact-section" data-reveal>
        <div className="shell">
          <div className="section-heading">
            <div><span className="eyebrow">Impacto</span><h2>O que muda na prática.</h2></div>
            <p>Impactos descritos sem números inventados: apenas efeitos reais esperados pela estrutura e pelos fluxos construídos.</p>
          </div>
          <div className="impact-grid">
            {project.impact.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProjectMetrics project={project} />

      <section className="case-section" data-reveal>
        <div className="shell case-story-grid">
          <div className="case-story-title"><span className="eyebrow">Contexto</span><h2>Do problema<br />à solução.</h2></div>
          <div className="case-story-content">
            <div className="story-block"><span>01</span><div><h3>O desafio</h3><p>{project.challenge}</p></div></div>
            <div className="story-block"><span>02</span><div><h3>A abordagem</h3><p>{project.solution}</p></div></div>
            <div className="story-block"><span>03</span><div><h3>O produto</h3><p>{project.longDescription}</p></div></div>
          </div>
        </div>
      </section>

      <section className="case-section case-features-section" data-reveal>
        <div className="shell">
          <div className="section-heading">
            <div><span className="eyebrow">Destaques</span><h2>O que o sistema prioriza</h2></div>
            <p>Funcionalidades apresentadas pelo papel que cumprem na experiência, e não apenas como uma lista técnica.</p>
          </div>
          <div className="case-features-grid">
            {project.features.map((feature, index) => (
              <article key={feature.title}>
                <span className="feature-index">0{index + 1}</span>
                <span className="feature-icon"><Check /></span>
                <h3>{feature.title}</h3><p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section device-section" data-reveal>
        <div className="shell">
          <div className="section-heading">
            <div><span className="eyebrow">Dispositivos</span><h2>Uma apresentação pensada para mais de uma tela.</h2></div>
            <p>A composição abaixo apresenta o desktop em um enquadramento mais limpo e a adaptação mobile em um bloco próprio, deixando a leitura mais elegante em qualquer tamanho de tela.</p>
          </div>
          <DeviceShowcase project={project} />
        </div>
      </section>

      <section className="case-section case-principles-section" data-reveal>
        <div className="shell case-principles-grid">
          <div><span className="eyebrow">Direção de produto</span><h2>Princípios do case</h2><p>Decisões de interface e estrutura guiadas pela rotina de quem realmente utiliza o sistema.</p></div>
          <div className="principle-list">{project.principles.map((principle, index) => <span key={principle}><b>0{index + 1}</b>{principle}</span>)}</div>
        </div>
      </section>

      <section className="case-section case-stack-section" data-reveal>
        <div className="shell">
          <span className="eyebrow">Arquitetura e entrega</span>
          <h2>O que sustenta o projeto</h2>
          <p className="case-stack-note">Somente tecnologias ou características confirmadas no projeto são apresentadas aqui.</p>
          <div className="case-stack-list">{project.technicalHighlights.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="case-next-section" data-reveal>
        <div className="shell">
          <div className="case-next-card">
            <div><span className="eyebrow">NEXORA</span><h2>Um bom sistema começa com um problema bem entendido.</h2><p>Veja o outro case ou envie um briefing para conversar sobre um novo projeto.</p></div>
            <div className="case-next-actions">
              <Link className="button button-primary" href="/contato">Solicitar orçamento <ArrowRight /></Link>
              <a className="button button-whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer"><WhatsApp /> WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <Link className="footer-brand" href="/#inicio"><NexoraLogo className="footer-logo" /><span>{brand.tagline}</span></Link>
          <span>© 2026 NEXORA. Produtos digitais feitos para funcionar.</span>
          <a className="footer-github" href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub Ferro135"><Github /></a>
        </div>
      </footer>
    </main>
  );
}
