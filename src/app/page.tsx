import Link from "next/link";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Header } from "@/components/Header";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code,
  Github,
  Layers,
  Monitor,
  Spark,
  WhatsApp,
} from "@/components/Icons";
import { NexoraLogo } from "@/components/NexoraLogo";
import { brand, contact, projects, technologyGroups } from "@/data/portfolio";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero-section" id="inicio">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="shell hero-grid">
          <div className="hero-copy reveal-up">
            <span className="eyebrow">{brand.tagline}</span>
            <h1>
              Transformamos ideias em<br />
              sistemas que <span className="gradient-text">funcionam.</span>
            </h1>
            <p>
              Criamos sites, dashboards e aplicações web modernas, com foco em experiência,
              performance e simplicidade — do conceito ao deploy.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projetos">
                Ver projetos <ArrowRight />
              </a>
              {contact.whatsapp && (
                <a className="button button-whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">
                  <WhatsApp /> Falar no WhatsApp
                </a>
              )}
            </div>
            <div className="hero-proof">
              <span><Check /> Interfaces responsivas</span>
              <span><Check /> Sistemas completos</span>
              <span><Check /> Deploy e evolução</span>
            </div>
          </div>

          <div className="hero-visual reveal-up reveal-delay-1">
            <div className="visual-glow" />
            <div className="visual-window visual-window-back">
              <span /> <span /> <span />
            </div>
            <div className="visual-window visual-window-main">
              <div className="window-topbar">
                <div><i /><i /><i /></div>
                <span>nexora.system</span>
              </div>
              <div className="window-content">
                <aside>
                  <NexoraLogo compact className="mini-nexora-mark" />
                  <span className="mini-line long" />
                  <span className="mini-line" />
                  <span className="mini-line short" />
                  <span className="mini-line" />
                </aside>
                <div className="window-body">
                  <small>PRODUTO DIGITAL</small>
                  <strong>Clareza no design.<br />Força no sistema.</strong>
                  <p>Experiências pensadas para pessoas e construídas para evoluir.</p>
                  <div className="code-chip"><Code /></div>
                </div>
                <div className="window-art">
                  <span className="mountain m1" />
                  <span className="mountain m2" />
                  <span className="moon" />
                  <div className="art-grid" />
                </div>
              </div>
            </div>
            <div className="floating-chip">
              <span className="floating-icon"><Spark /></span>
              <div><small>Digital products</small><strong>pensados para crescer</strong></div>
            </div>
            <div className="process-list">
              <span>ESTRATÉGIA</span>
              <span>INTERFACE</span>
              <span>DESENVOLVIMENTO</span>
              <span>EVOLUÇÃO</span>
            </div>
          </div>
        </div>

        <div className="shell stats-panel reveal-up reveal-delay-2">
          <div className="stat-item">
            <span className="stat-icon"><Layers /></span>
            <div><strong>2</strong><b>Cases em destaque</b><small>Produtos reais, apresentados com contexto</small></div>
          </div>
          <div className="stat-item">
            <span className="stat-icon"><Monitor /></span>
            <div><strong>100%</strong><b>Responsivo</b><small>Experiência consistente em desktop e mobile</small></div>
          </div>
          <div className="stat-item">
            <span className="stat-icon"><Code /></span>
            <div><strong className="stat-text">Web & Systems</strong><b>Produto de ponta a ponta</b><small>Interface, dados, integrações e publicação</small></div>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projetos">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2>Projetos em destaque</h2>
            </div>
            <p>
              Dois produtos construídos para resolver problemas diferentes, com a mesma prioridade:
              tornar processos complexos mais claros e fáceis de usar.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-number">{project.number}</div>
                <ProjectVisual project={project} />
                <div className="project-body">
                  <div className="project-meta">{project.eyebrow}</div>
                  <div className="project-title-row">
                    <div>
                      <small>{project.category}</small>
                      <h3>{project.title}</h3>
                    </div>
                    <Link href={`/projetos/${project.slug}`} aria-label={`Explorar case ${project.title}`}>
                      <ArrowUpRight />
                    </Link>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-footer-row">
                    <div className="tag-row">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <Link className="case-link" href={`/projetos/${project.slug}`}>
                      Explorar case <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section philosophy-section" id="sobre">
        <div className="shell philosophy-grid">
          <div className="philosophy-heading">
            <span className="eyebrow">Sobre a NEXORA</span>
            <h2>Menos ruído.<br />Mais produto.</h2>
          </div>
          <div className="philosophy-copy">
            <p>
              A NEXORA é uma identidade de desenvolvimento web focada em transformar necessidades
              reais em produtos digitais claros, modernos e funcionais. O visual importa, mas sempre
              trabalha junto com usabilidade, organização e código preparado para evoluir.
            </p>
            <div className="principles-grid">
              <article>
                <span>01</span>
                <strong>Soluções reais</strong>
                <p>Cada interface começa pelo problema que precisa ser resolvido.</p>
              </article>
              <article>
                <span>02</span>
                <strong>Experiência simples</strong>
                <p>Fluxos claros, hierarquia visual e menos passos desnecessários.</p>
              </article>
              <article>
                <span>03</span>
                <strong>Base para evoluir</strong>
                <p>Estrutura organizada para facilitar manutenção, melhorias e novos recursos.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="shell">
          <div className="section-heading compact-heading">
            <div>
              <span className="eyebrow">O que construímos</span>
              <h2>Produto, não só páginas.</h2>
            </div>
          </div>
          <div className="services-grid">
            <article className="service-card">
              <span><Monitor /></span>
              <h3>Sites & interfaces</h3>
              <p>Experiências responsivas, rápidas e visualmente consistentes para apresentar marcas, serviços e produtos.</p>
            </article>
            <article className="service-card">
              <span><Layers /></span>
              <h3>Dashboards & gestão</h3>
              <p>Painéis que organizam informação, reduzem complexidade e ajudam a transformar dados em ações.</p>
            </article>
            <article className="service-card">
              <span><Code /></span>
              <h3>Sistemas web</h3>
              <p>Aplicações com regras de negócio, banco de dados, autenticação, integrações e estrutura preparada para crescer.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section technologies-section" id="tecnologias">
        <div className="shell">
          <div className="section-heading tech-heading">
            <div>
              <span className="eyebrow">Stack</span>
              <h2>Tecnologias</h2>
            </div>
            <p>Ferramentas escolhidas de acordo com o produto, priorizando desenvolvimento rápido, manutenção e performance.</p>
          </div>
          <div className="tech-groups">
            {technologyGroups.map((group) => (
              <article className="tech-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="tech-list">
                  {group.items.map((technology, index) => (
                    <span className="tech-pill" key={technology}>
                      <i className={`tech-dot tech-${index % 10}`} /> {technology}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contato">
        <div className="shell">
          <div className="contact-card">
            <div className="contact-orb" />
            <div className="contact-copy">
              <span className="eyebrow">Próximo projeto</span>
              <h2>Tem uma ideia?<br />Vamos torná-la real.</h2>
              <p>
                Se quiser conversar sobre um site, dashboard ou sistema, o canal mais direto é o WhatsApp.
                O GitHub também continua disponível para acompanhar os projetos e evolução do portfólio.
              </p>
              <span className="contact-status"><span className="pulse-dot" /> {brand.availability}</span>
            </div>
            <div className="contact-links">
              {contact.whatsapp && (
                <a className="contact-primary" href={contact.whatsapp} target="_blank" rel="noreferrer">
                  <span><WhatsApp /></span><div><small>Contato principal</small><strong>WhatsApp · +55 16 99157-6717</strong></div>
                  <ArrowUpRight className="contact-arrow" />
                </a>
              )}
              <a className="contact-secondary" href={contact.github} target="_blank" rel="noreferrer">
                <span><Github /></span><div><small>Projetos & código</small><strong>GitHub · Ferro135</strong></div>
                <ArrowUpRight className="contact-arrow" />
              </a>
              {contact.email && (
                <a href={`mailto:${contact.email}`}>
                  <span><Mail /></span><div><small>Email</small><strong>{contact.email}</strong></div>
                  <ArrowUpRight className="contact-arrow" />
                </a>
              )}
              <div className="contact-info-card">
                <span><Spark /></span>
                <div><small>Identidade</small><strong>NEXORA · Digital Products & Systems</strong></div>
              </div>
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
          <a className="footer-github" href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub Ferro135">
            <Github />
          </a>
        </div>
      </footer>
    </main>
  );
}
