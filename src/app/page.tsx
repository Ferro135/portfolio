import Link from "next/link";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Header } from "@/components/Header";
import { Testimonials } from "@/components/Testimonials";
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
import { brand, capabilities, contact, faqs, processSteps, projects, technologyGroups } from "@/data/portfolio";

export default function Home() {
  return (
    <main id="conteudo">
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
              <Link className="button button-secondary" href="/contato">
                Solicitar orçamento <ArrowUpRight size={16} />
              </Link>
              {contact.whatsapp && (
                <a className="button button-whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">
                  <WhatsApp /> WhatsApp direto
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
            <div className="visual-window visual-window-back"><span /><span /><span /></div>
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
              <div><small>Produtos digitais</small><strong>pensados para crescer</strong></div>
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
            <div><strong>2</strong><b>Projetos em destaque</b><small>Produtos reais, apresentados com contexto</small></div>
          </div>
          <div className="stat-item">
            <span className="stat-icon"><Monitor /></span>
            <div><strong>100%</strong><b>Responsivo</b><small>Experiência consistente em desktop e mobile</small></div>
          </div>
          <div className="stat-item">
            <span className="stat-icon"><Code /></span>
            <div><strong className="stat-text">Web & Sistemas</strong><b>Produto de ponta a ponta</b><small>Interface, dados, integrações e publicação</small></div>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projetos" data-reveal>
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Projetos selecionados</span>
              <h2>Projetos em destaque</h2>
            </div>
            <p>
              Produtos construídos para resolver problemas diferentes, com a mesma prioridade:
              tornar processos complexos mais claros e fáceis de usar.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id} data-reveal>
                <div className="project-number">{project.number}</div>
                <ProjectVisual project={project} />
                <div className="project-body">
                  <div className="project-meta">{project.eyebrow}</div>
                  <div className="project-title-row">
                    <div>
                      <small>{project.category}</small>
                      <h3>{project.title}</h3>
                    </div>
                    <Link href={`/projetos/${project.slug}`} aria-label={`Explorar case ${project.title}`}><ArrowUpRight /></Link>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-impact-mini">
                    <strong>Impacto</strong>
                    <span>{project.impact[0].description}</span>
                  </div>
                  <div className="project-footer-row">
                    <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <Link className="case-link" href={`/projetos/${project.slug}`}>Explorar case <ArrowRight size={15} /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section" id="processo" data-reveal>
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Da ideia ao produto</span>
              <h2>Um processo simples para construir melhor.</h2>
            </div>
            <p>Menos etapas burocráticas, mais clareza sobre o que estamos resolvendo e por que cada decisão existe.</p>
          </div>
          <div className="process-grid">
            {processSteps.map((step) => (
              <article key={step.number} data-reveal>
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section philosophy-section" id="sobre" data-reveal>
        <div className="shell philosophy-grid">
          <div className="philosophy-heading">
            <span className="eyebrow">Sobre a NEXORA</span>
            <h2>Menos ruído.<br />Mais produto.</h2>
            <Link className="case-link about-link" href="/sobre">Conhecer a NEXORA <ArrowRight size={15} /></Link>
          </div>
          <div className="philosophy-copy">
            <p>
              A NEXORA cria produtos digitais focados em transformar processos complexos em experiências
              simples, modernas e funcionais. Design, usabilidade e estrutura técnica trabalham juntos
              para que cada produto seja fácil de usar hoje e preparado para evoluir amanhã.
            </p>
            <div className="principles-grid">
              <article><span>01</span><strong>Soluções reais</strong><p>Cada interface começa pelo problema que precisa ser resolvido.</p></article>
              <article><span>02</span><strong>Experiência simples</strong><p>Fluxos claros, hierarquia visual e menos passos desnecessários.</p></article>
              <article><span>03</span><strong>Base para evoluir</strong><p>Estrutura organizada para facilitar manutenção, melhorias e novos recursos.</p></article>
            </div>
          </div>
        </div>
      </section>

      <section className="section capabilities-section" data-reveal>
        <div className="shell">
          <div className="section-heading compact-heading">
            <div>
              <span className="eyebrow">O que podemos construir</span>
              <h2>Produto, não só páginas.</h2>
            </div>
            <p>O formato muda conforme o problema. A prioridade continua sendo clareza, uso real e uma base técnica preparada para crescer.</p>
          </div>
          <div className="capabilities-grid">
            {capabilities.map((capability, index) => (
              <article key={capability.title} data-reveal>
                <span>0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section technologies-section" id="tecnologias" data-reveal>
        <div className="shell">
          <div className="section-heading tech-heading">
            <div><span className="eyebrow">Tecnologias</span><h2>Tecnologias</h2></div>
            <p>Ferramentas escolhidas de acordo com o produto, priorizando desenvolvimento rápido, manutenção e performance.</p>
          </div>
          <div className="tech-groups">
            {technologyGroups.map((group) => (
              <article className="tech-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="tech-list">
                  {group.items.map((technology, index) => (
                    <span className="tech-pill" key={technology}><i className={`tech-dot tech-${index % 10}`} /> {technology}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section faq-section" id="faq" data-reveal>
        <div className="shell faq-grid">
          <div className="faq-heading">
            <span className="eyebrow">Perguntas frequentes</span>
            <h2>Antes de começar.</h2>
            <p>Algumas respostas rápidas para reduzir dúvidas antes da primeira conversa.</p>
            <Link className="button button-secondary" href="/contato">Preencher briefing <ArrowRight /></Link>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}<i>+</i></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contato" data-reveal>
        <div className="shell">
          <div className="contact-card">
            <div className="contact-orb" />
            <div className="contact-copy">
              <span className="eyebrow">Próximo projeto</span>
              <h2>Tem uma ideia?<br />Vamos torná-la real.</h2>
              <p>Você pode começar com um briefing rápido ou falar direto pelo WhatsApp. Quanto mais contexto, melhor a primeira conversa.</p>
              <span className="contact-status"><span className="pulse-dot" /> {brand.availability}</span>
            </div>
            <div className="contact-links">
              <Link className="contact-primary" href="/contato">
                <span><Spark /></span><div><small>Orçamento</small><strong>Preencher briefing do projeto</strong></div><ArrowUpRight className="contact-arrow" />
              </Link>
              {contact.whatsapp && (
                <a className="contact-secondary" href={contact.whatsapp} target="_blank" rel="noreferrer">
                  <span><WhatsApp /></span><div><small>WhatsApp</small><strong>{contact.whatsappDisplay}</strong></div><ArrowUpRight className="contact-arrow" />
                </a>
              )}
              <a className="contact-secondary" href={contact.github} target="_blank" rel="noreferrer">
                <span><Github /></span><div><small>GitHub</small><strong>github.com/Ferro135</strong></div><ArrowUpRight className="contact-arrow" />
              </a>
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
