import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Testimonials } from "@/components/Testimonials";
import { ProjectVisual } from "@/components/ProjectVisual";
import { StructuredData } from "@/components/StructuredData";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code,
  Database,
  Grid,
  Layers,
  Monitor,
  Spark,
  Sparkles,
  WhatsApp,
} from "@/components/Icons";
import {
  brand,
  capabilities,
  contact,
  faqs,
  processSteps,
  projects,
  technologyGroups,
} from "@/data/portfolio";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const studioPillars = [
  {
    icon: Layers,
    title: "Produto",
    text: "Fluxo, interface e escopo pensados em conjunto.",
    tone: "cyan",
  },
  {
    icon: Code,
    title: "Engenharia",
    text: "Frontend, backend, dados e integrações numa base coerente.",
    tone: "violet",
  },
  {
    icon: Sparkles,
    title: "Evolução",
    text: "Estrutura pronta para crescer sem precisar recomeçar.",
    tone: "green",
  },
] as const;

const deliveryCards = [
  {
    icon: Monitor,
    label: "Sites & experiências",
    text: "Presença digital rápida, responsiva e orientada à conversão.",
    tone: "cyan",
  },
  {
    icon: Grid,
    label: "Dashboards & painéis",
    text: "Informação organizada para operação, gestão e tomada de decisão.",
    tone: "blue",
  },
  {
    icon: Database,
    label: "Sistemas & SaaS",
    text: "Produtos com regras de negócio, dados, permissões e integrações.",
    tone: "violet",
  },
  {
    icon: Spark,
    label: "Automações",
    text: "Conexões entre APIs e serviços para reduzir tarefas repetitivas.",
    tone: "amber",
  },
] as const;

export default function Home() {
  const featured = projects[0];

  return (
    <main id="conteudo" className="v270-home">
      <StructuredData data={faqSchema} />
      <Header />

      <section className="v270-hero" id="inicio">
        <div className="v270-orb v270-orb-a" />
        <div className="v270-orb v270-orb-b" />
        <div className="v270-orb v270-orb-c" />

        <div className="shell v270-hero-grid">
          <div className="v270-hero-copy">
            <div className="v270-status">
              <i />
              <span>{brand.availability}</span>
            </div>

            <span className="v270-overline">{brand.tagline}</span>

            <h1>
              Produtos digitais
              <span>com mais clareza, presença e personalidade.</span>
            </h1>

            <p>
              A ALUNERI cria sites, SaaS, dashboards e sistemas web completos,
              unindo interface, engenharia e operação numa experiência mais
              bonita e fácil de usar.
            </p>

            <div className="v270-actions">
              <Link href="/contato" className="v270-button primary">
                Iniciar projeto <ArrowRight size={16} />
              </Link>
              <Link href="/projetos" className="v270-button ghost">
                Explorar projetos <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="v270-hero-points">
              <span><Check size={14} /> Design + desenvolvimento</span>
              <span><Check size={14} /> Mobile desde o início</span>
              <span><Check size={14} /> Publicação e evolução</span>
            </div>

            <div className="v270-color-legend" aria-label="Áreas ALUNERI">
              <span className="cyan">Produto</span>
              <span className="blue">Dados</span>
              <span className="violet">Sistemas</span>
              <span className="green">Automação</span>
              <span className="amber">Estratégia</span>
            </div>
          </div>

          <div className="v270-hero-showcase">
            <div className="v270-showcase-toolbar">
              <div>
                <span className="dot cyan" />
                <span className="dot violet" />
                <span className="dot amber" />
              </div>
              <strong>ALUNERI / CASE</strong>
              <small>01</small>
            </div>

            <Link href={`/projetos/${featured.slug}`} className="v270-showcase-card">
              <div className="v270-showcase-image">
                <ProjectVisual project={featured} />
                <span className="v270-showcase-badge">{featured.category}</span>
              </div>

              <div className="v270-showcase-info">
                <div>
                  <span>Projeto em destaque</span>
                  <h2>{featured.title}</h2>
                  <p>{featured.description}</p>
                </div>

                <div className="v270-showcase-meta">
                  {featured.tags.slice(0, 3).map((tag, index) => (
                    <span key={tag} className={`tone-${index + 1}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>

            <div className="v270-mini-panels">
              <article className="cyan">
                <span>01</span>
                <strong>Interface</strong>
                <small>Fluxos mais claros</small>
              </article>
              <article className="violet">
                <span>02</span>
                <strong>Backend</strong>
                <small>Dados e automações</small>
              </article>
              <article className="green">
                <span>03</span>
                <strong>Operação</strong>
                <small>Uso real no dia a dia</small>
              </article>
            </div>
          </div>
        </div>

        <div className="shell v270-hero-band">
          {deliveryCards.map(({ icon: Icon, label, text, tone }) => (
            <article key={label} className={`tone-${tone}`}>
              <span><Icon size={17} /></span>
              <div>
                <strong>{label}</strong>
                <small>{text}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="v270-section v270-projects">
        <div className="shell">
          <div className="v270-section-head">
            <div>
              <span className="v270-kicker violet">01 · Projetos</span>
              <h2>Cases com mais contexto, mais personalidade e menos cara de template.</h2>
            </div>
            <p>
              Cada projeto mostra a lógica por trás da interface, o problema
              que precisava ser resolvido e o impacto na operação.
            </p>
          </div>

          <div className="v270-project-stack">
            {projects.map((project, index) => (
              <article className={`v270-project-card tone-${index % 2 ? "violet" : "cyan"}`} key={project.id}>
                <Link href={`/projetos/${project.slug}`} className="v270-project-media">
                  <ProjectVisual project={project} />
                  <span className="v270-project-number">{String(index + 1).padStart(2, "0")}</span>
                </Link>

                <div className="v270-project-content">
                  <div className="v270-project-title">
                    <span>{project.eyebrow}</span>
                    <h3>{project.title}</h3>
                  </div>

                  <p>{project.description}</p>

                  <div className="v270-project-columns">
                    <div>
                      <small>Desafio</small>
                      <strong>{project.challenge}</strong>
                    </div>
                    <div>
                      <small>Solução</small>
                      <strong>{project.solution}</strong>
                    </div>
                  </div>

                  <div className="v270-project-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>

                  <Link href={`/projetos/${project.slug}`} className="v270-inline-link">
                    Ver case completo <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v270-section v270-studio">
        <div className="shell">
          <div className="v270-section-head compact">
            <div>
              <span className="v270-kicker cyan">02 · Como trabalhamos</span>
              <h2>Mais do que “fazer uma tela bonita”.</h2>
            </div>
          </div>

          <div className="v270-pillar-grid">
            {studioPillars.map(({ icon: Icon, title, text, tone }) => (
              <article key={title} className={`tone-${tone}`}>
                <span><Icon size={20} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <div className="v270-service-layout">
            <div className="v270-service-intro">
              <span className="v270-kicker blue">Serviços</span>
              <h3>Uma base visual forte sem perder funcionalidade.</h3>
              <p>
                Cada serviço segue a mesma lógica: reduzir ruído, deixar
                prioridades claras e construir uma base que continue boa
                quando o produto crescer.
              </p>
              <Link href="/servicos" className="v270-inline-link">
                Ver serviços <ArrowRight size={14} />
              </Link>
            </div>

            <div className="v270-service-list">
              {capabilities.map((capability, index) => (
                <article key={capability.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h4>{capability.title}</h4>
                    <p>{capability.description}</p>
                  </div>
                  <ArrowUpRight size={15} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="v270-section v270-process" id="processo">
        <div className="shell">
          <div className="v270-section-head">
            <div>
              <span className="v270-kicker green">03 · Processo</span>
              <h2>Organizado o suficiente para dar segurança. Simples o suficiente para não travar.</h2>
            </div>
            <p>
              Você acompanha uma sequência clara de decisões, validações e
              entregas sem transformar o projeto numa burocracia.
            </p>
          </div>

          <div className="v270-process-grid">
            {processSteps.map((step, index) => (
              <article key={step.number} className={`tone-${["cyan","blue","violet","green"][index]}`}>
                <div>
                  <span>{step.number}</span>
                  <i />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v270-section v270-tech">
        <div className="shell v270-tech-layout">
          <div>
            <span className="v270-kicker amber">04 · Stack</span>
            <h2>Tecnologia que combina velocidade com manutenção.</h2>
            <p>
              A stack é escolhida de acordo com o produto. O objetivo não é
              acumular tecnologia, e sim manter a solução clara, segura e
              simples de evoluir.
            </p>
          </div>

          <div className="v270-tech-groups">
            {technologyGroups.map((group, index) => (
              <article key={group.title} className={`tone-${["cyan","violet","green"][index]}`}>
                <span>{group.title}</span>
                <div>
                  {group.items.map((item) => <i key={item}>{item}</i>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="v270-section v270-faq">
        <div className="shell v270-faq-layout">
          <div>
            <span className="v270-kicker violet">05 · FAQ</span>
            <h2>Dúvidas comuns antes de começar.</h2>
            <p>
              O básico que normalmente precisa ficar claro antes de transformar
              uma ideia em escopo.
            </p>
          </div>

          <div className="v270-faq-list">
            {faqs.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.question}</strong>
                  <i>+</i>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="v270-cta">
        <div className="shell">
          <div className="v270-cta-panel">
            <div className="v270-cta-colorbar">
              <i className="cyan" />
              <i className="blue" />
              <i className="violet" />
              <i className="green" />
              <i className="amber" />
            </div>

            <div className="v270-cta-copy">
              <span>Próximo projeto</span>
              <h2>Vamos transformar a ideia em algo que dê vontade de usar.</h2>
              <p>
                Comece com um briefing ou fale direto no WhatsApp. A conversa
                pode começar simples — o escopo vem depois.
              </p>
            </div>

            <div className="v270-cta-actions">
              <Link href="/contato" className="v270-button primary">
                Preencher briefing <ArrowRight size={15} />
              </Link>
              {contact.whatsapp && (
                <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="v270-button whatsapp">
                  <WhatsApp size={16} /> WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
