import { DashboardPreview } from "@/components/DashboardPreview";
import { Header } from "@/components/Header";
import { ArrowRight, ArrowUpRight, Code, Layers, Mail, Monitor, Spark } from "@/components/Icons";
import { portfolio, projects, technologies } from "@/data/portfolio";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero-section" id="inicio">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="shell hero-grid">
          <div className="hero-copy reveal-up">
            <span className="eyebrow">Desenvolvimento web & sistemas</span>
            <h1>
              Desenvolvo sites e<br />
              sistemas <span className="gradient-text">modernos.</span>
            </h1>
            <p>
              Focado em interfaces profissionais, experiências intuitivas e soluções web funcionais que ajudam ideias a se tornarem produtos reais.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projetos">
                Ver projetos <ArrowRight />
              </a>
              <a className="button button-secondary" href="#contato">
                <Mail /> Entrar em contato
              </a>
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
                <span>portfolio.dev</span>
              </div>
              <div className="window-content">
                <aside>
                  <div className="mini-brand" />
                  <span className="mini-line long" />
                  <span className="mini-line" />
                  <span className="mini-line short" />
                  <span className="mini-line" />
                </aside>
                <div className="window-body">
                  <small>DO PLANEJAMENTO AO PRODUTO</small>
                  <strong>Boas ideias se tornam<br />grandes projetos.</strong>
                  <p>Código hoje. Soluções para amanhã.</p>
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
              <div><small>Soluções web</small><strong>que geram valor</strong></div>
            </div>
            <div className="process-list">
              <span>IDEIA</span>
              <span>PLANEJAMENTO</span>
              <span>DESENVOLVIMENTO</span>
              <span>RESULTADOS</span>
            </div>
          </div>
        </div>

        <div className="shell stats-panel reveal-up reveal-delay-2">
          <div className="stat-item">
            <span className="stat-icon"><Layers /></span>
            <div><strong>2</strong><b>Projetos em destaque</b><small>Soluções reais e funcionais</small></div>
          </div>
          <div className="stat-item">
            <span className="stat-icon"><Monitor /></span>
            <div><strong>100%</strong><b>Responsivo</b><small>Ótima experiência em todos os dispositivos</small></div>
          </div>
          <div className="stat-item">
            <span className="stat-icon"><Code /></span>
            <div><strong className="stat-text">Sites & Sistemas Web</strong><b>Foco em performance</b><small>Interfaces claras, rápidas e escaláveis</small></div>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projetos">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Trabalhos reais</span>
              <h2>Projetos em destaque</h2>
            </div>
            <p>Dois sistemas pensados para resolver problemas reais com clareza, organização e uma experiência profissional.</p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-number">{project.number}</div>
                <DashboardPreview variant={project.id as "zentra" | "spazio"} />
                <div className="project-body">
                  <div className="project-meta">{project.category}</div>
                  <div className="project-title-row">
                    <h3>{project.title}</h3>
                    <a href="#contato" aria-label={`Conversar sobre o projeto ${project.title}`}>
                      <ArrowUpRight />
                    </a>
                  </div>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section" id="sobre">
        <div className="shell about-grid">
          <div>
            <span className="eyebrow">Um pouco sobre mim</span>
            <h2>Sobre mim</h2>
          </div>
          <div className="about-copy">
            <p>
              Crio sites, dashboards e sistemas modernos com foco em performance, boa experiência de uso e soluções que realmente funcionam. Meu objetivo é transformar ideias em produtos digitais úteis, claros e profissionais.
            </p>
            <div className="about-points">
              <span><i><Spark /></i> Foco em soluções reais</span>
              <span><i><Monitor /></i> Interface e experiência</span>
              <span><i><Code /></i> Código organizado e escalável</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section technologies-section" id="tecnologias">
        <div className="shell">
          <span className="eyebrow">Ferramentas do meu dia a dia</span>
          <h2>Tecnologias</h2>
          <div className="tech-list">
            {technologies.map((technology, index) => (
              <span className="tech-pill" key={technology}>
                <i className={`tech-dot tech-${index}`} /> {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contato">
        <div className="shell">
          <div className="contact-card">
            <div className="contact-orb" />
            <div className="contact-copy">
              <span className="eyebrow">Vamos conversar?</span>
              <h2>Vamos criar algo juntos?</h2>
              <p>Estou aberto a novos projetos e oportunidades. Entre em contato pelo canal que preferir.</p>
            </div>
            <div className="contact-links">
              <a href={`mailto:${portfolio.email}`}>
                <span><Mail /></span><div><small>Email</small><strong>{portfolio.email}</strong></div>
              </a>
              <a href={portfolio.github} target="_blank" rel="noreferrer">
                <span><Code /></span><div><small>GitHub</small><strong>Ver perfil</strong></div>
              </a>
              <a href={portfolio.linkedin} target="_blank" rel="noreferrer">
                <span>in</span><div><small>LinkedIn</small><strong>Conectar</strong></div>
              </a>
              <a href={portfolio.whatsapp} target="_blank" rel="noreferrer">
                <span>W</span><div><small>WhatsApp</small><strong>Conversar agora</strong></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <a className="brand" href="#inicio">
            <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
            <span>Portfólio</span>
          </a>
          <span>Construindo soluções digitais que funcionam.</span>
          <span className="footer-code">&lt;/&gt;</span>
        </div>
      </footer>
    </main>
  );
}
