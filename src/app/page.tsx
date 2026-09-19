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

const portfolioNumbers = [
  {
    value: String(projects.length).padStart(2, "0"),
    label: "cases selecionados",
    description: "Projetos pensados para resolver contextos reais.",
  },
  {
    value: String(capabilities.length).padStart(2, "0"),
    label: "frentes de atuação",
    description: "Do site institucional ao sistema completo.",
  },
  {
    value: String(technologyGroups.reduce((sum, group) => sum + group.items.length, 0)).padStart(2, "0"),
    label: "blocos de tecnologia",
    description: "Stack e estrutura definidos conforme o produto.",
  },
] as const;

const focusAreas = [
  {
    icon: Monitor,
    title: "Portfólios e sites premium",
    text: "Identidade forte, hierarquia visual clara e presença digital mais elegante.",
  },
  {
    icon: Grid,
    title: "Dashboards e painéis",
    text: "Informação organizada para operação, análise e tomada de decisão.",
  },
  {
    icon: Database,
    title: "Sistemas e SaaS",
    text: "Fluxos, permissões, dados e automações reunidos em produtos consistentes.",
  },
  {
    icon: Code,
    title: "Estrutura técnica",
    text: "Base pronta para crescer sem transformar evolução em retrabalho.",
  },
] as const;

const studioValues = [
  {
    icon: Layers,
    title: "Clareza de produto",
    text: "Cada bloco existe para guiar leitura, destacar valor e reduzir ruído.",
  },
  {
    icon: Sparkles,
    title: "Visual memorável",
    text: "Uma linguagem premium, detalhada e moderna sem perder elegância.",
  },
  {
    icon: Check,
    title: "Uso real",
    text: "Design bonito, mas sempre conectado ao que o produto precisa fazer.",
  },
] as const;

export default function Home() {
  const featured = projects[0];
  const spotlight = projects.slice(1, 3);
  const selected = projects.slice(0, 3);

  return (
    <main id="conteudo" className="v300-home">
      <StructuredData data={faqSchema} />
      <Header />

      <section className="v300-hero" id="inicio">
        <div className="v300-noise" />
        <div className="v300-glow glow-a" />
        <div className="v300-glow glow-b" />
        <div className="v300-glow glow-c" />

        <div className="shell v300-hero-grid">
          <div className="v300-hero-copy">
            <span className="v300-pill">{brand.availability}</span>
            <span className="v300-overline">ALUNERI • portfólio digital</span>

            <h1>
              Um portfólio com
              <span>cara de estúdio premium.</span>
            </h1>

            <p>
              A ALUNERI transforma ideias em experiências digitais mais bonitas,
              organizadas e memoráveis — sites, sistemas, dashboards e produtos
              web com identidade forte e estrutura clara.
            </p>

            <div className="v300-hero-actions">
              <Link href="/contato" className="v300-btn primary">
                Solicitar orçamento <ArrowRight size={16} />
              </Link>
              <Link href="/projetos" className="v300-btn secondary">
                Ver projetos <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="v300-proof-list">
              <span><Check size={14} /> Visual refinado e profissional</span>
              <span><Check size={14} /> Estrutura pensada para conversão</span>
              <span><Check size={14} /> Mobile, conteúdo e sistema em sintonia</span>
            </div>

            <div className="v300-numbers">
              {portfolioNumbers.map((item) => (
                <article key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="v300-hero-stage">
            <div className="v300-stage-panel main">
              <div className="v300-stage-topbar">
                <div>
                  <i />
                  <i />
                  <i />
                </div>
                <span>featured case</span>
              </div>

              <Link href={`/projetos/${featured.slug}`} className="v300-stage-card">
                <div className="v300-stage-media">
                  <ProjectVisual project={featured} />
                  <span>{featured.category}</span>
                </div>

                <div className="v300-stage-body">
                  <small>Projeto em destaque</small>
                  <h2>{featured.title}</h2>
                  <p>{featured.description}</p>

                  <div className="v300-tag-row">
                    {featured.tags.slice(0, 3).map((tag) => (
                      <b key={tag}>{tag}</b>
                    ))}
                  </div>
                </div>
              </Link>
            </div>

            <div className="v300-stage-stack">
              {spotlight.map((project, index) => (
                <Link href={`/projetos/${project.slug}`} key={project.id} className="v300-mini-case">
                  <span>0{index + 2}</span>
                  <div>
                    <strong>{project.title}</strong>
                    <small>{project.category}</small>
                  </div>
                  <ArrowUpRight size={14} />
                </Link>
              ))}

              <article className="v300-note-card">
                <span>Direção criativa</span>
                <p>
                  Mais profundidade visual, organização por blocos e uma linguagem
                  que faz o portfólio parecer uma marca sólida — não um template.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="v300-strip">
        <div className="shell v300-strip-grid">
          {focusAreas.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <span><Icon size={18} /></span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="v300-section v300-showcase">
        <div className="shell">
          <div className="v300-heading">
            <div>
              <span className="v300-kicker">Seleção de projetos</span>
              <h2>Um layout mais autoral para valorizar cada case.</h2>
            </div>
            <p>
              Os projetos agora aparecem com mais respiro, hierarquia melhor e
              blocos que comunicam desafio, solução e identidade visual.
            </p>
          </div>

          <div className="v300-showcase-grid">
            <article className="v300-feature-work">
              <Link href={`/projetos/${featured.slug}`} className="v300-feature-media">
                <ProjectVisual project={featured} />
              </Link>
              <div className="v300-feature-content">
                <span>{featured.eyebrow}</span>
                <h3>{featured.title}</h3>
                <p>{featured.longDescription || featured.description}</p>

                <div className="v300-feature-columns">
                  <div>
                    <small>Desafio</small>
                    <strong>{featured.challenge}</strong>
                  </div>
                  <div>
                    <small>Solução</small>
                    <strong>{featured.solution}</strong>
                  </div>
                </div>

                <Link href={`/projetos/${featured.slug}`} className="v300-inline-link">
                  Explorar case completo <ArrowRight size={14} />
                </Link>
              </div>
            </article>

            <div className="v300-work-list">
              {selected.map((project, index) => (
                <article key={project.id}>
                  <Link href={`/projetos/${project.slug}`} className="v300-work-item">
                    <div className="v300-work-thumb">
                      <ProjectVisual project={project} />
                    </div>
                    <div className="v300-work-info">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                      <div className="v300-tag-row compact">
                        {project.tags.slice(0, 3).map((tag) => (
                          <b key={tag}>{tag}</b>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight size={15} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="v300-section v300-studio">
        <div className="shell v300-studio-grid">
          <div className="v300-studio-copy">
            <span className="v300-kicker">Como o estúdio pensa</span>
            <h2>Bonito, organizado e com intenção.</h2>
            <p>
              O novo layout do portfólio foi pensado para transmitir mais valor,
              mais acabamento e mais clareza. Em vez de muitos blocos parecidos,
              cada seção tem um papel visual e narrativo específico.
            </p>
            <div className="v300-values-grid">
              {studioValues.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <span><Icon size={18} /></span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="v300-services-list">
            {capabilities.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
                <ArrowUpRight size={14} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v300-section v300-process">
        <div className="shell">
          <div className="v300-heading align-center">
            <div>
              <span className="v300-kicker">Processo</span>
              <h2>Uma narrativa visual que também explica o fluxo.</h2>
            </div>
            <p>
              O portfólio precisa encantar, mas também orientar. Por isso o
              processo continua claro e simples de acompanhar.
            </p>
          </div>

          <div className="v300-process-grid">
            {processSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="v300-section v300-faq">
        <div className="shell v300-faq-grid">
          <div>
            <span className="v300-kicker">Perguntas frequentes</span>
            <h2>Dúvidas rápidas antes de começar.</h2>
            <p>
              O layout está mais premium, mas a experiência continua simples:
              entender o projeto, mostrar valor e facilitar o primeiro contato.
            </p>
          </div>

          <div className="v300-faq-list">
            {faqs.slice(0, 4).map((item, index) => (
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

      <section className="v300-cta">
        <div className="shell">
          <div className="v300-cta-card">
            <div>
              <span className="v300-kicker">Próximo passo</span>
              <h2>Vamos transformar o seu site num portfólio realmente memorável.</h2>
              <p>
                Se quiser, o próximo passo é aplicar esta mesma qualidade visual
                às páginas internas, CMS, projetos e fluxo comercial.
              </p>
            </div>

            <div className="v300-cta-actions">
              <Link href="/contato" className="v300-btn primary">
                Começar briefing <ArrowRight size={15} />
              </Link>
              {contact.whatsapp && (
                <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="v300-btn whatsapp">
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
