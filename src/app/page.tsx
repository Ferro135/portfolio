import Link from "next/link";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Testimonials } from "@/components/Testimonials";
import { StructuredData } from "@/components/StructuredData";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Github,
  Mail,
  Monitor,
  Spark,
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

const processOutputs = [
  "Problema + prioridades",
  "Fluxos + direção visual",
  "Produto funcional",
  "Deploy + base de evolução",
];

export default function Home() {
  const featured = projects[0];
  const technologyCount = technologyGroups.reduce((total, group) => total + group.items.length, 0);

  return (
    <main id="conteudo" className="v250-home">
      <StructuredData data={faqSchema} />
      <Header />

      <section className="v250-hero" id="inicio">
        <div className="shell v250-hero-grid">
          <div className="v250-hero-copy">
            <div className="v250-status">
              <i />
              <span>{brand.availability}</span>
            </div>

            <span className="v250-overline">{brand.tagline}</span>

            <h1>
              Produtos digitais
              <span>claros, rápidos e feitos para funcionar.</span>
            </h1>

            <p>
              Sites, SaaS, dashboards e sistemas web desenvolvidos do conceito
              ao deploy — com foco em experiência, operação real e evolução.
            </p>

            <div className="v250-hero-actions">
              <Link className="v250-primary-button" href="/contato">
                Falar sobre um projeto <ArrowRight size={16} />
              </Link>
              <Link className="v250-text-link" href="/projetos">
                Ver projetos <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="v250-proof-row">
              <span><Check size={14} /> Responsivo</span>
              <span><Check size={14} /> Do design ao backend</span>
              <span><Check size={14} /> Deploy e evolução</span>
            </div>

            <div className="v260-hero-meta" aria-label="Resumo do portfólio">
              <div><strong>{projects.length}</strong><span>cases em destaque</span></div>
              <div><strong>{capabilities.length}</strong><span>áreas de atuação</span></div>
              <div><strong>{technologyCount}</strong><span>tecnologias listadas</span></div>
            </div>
          </div>

          <Link
            href={`/projetos/${featured.slug}`}
            className="v250-featured-project"
            aria-label={`Ver case ${featured.title}`}
          >
            <div className="v250-featured-head">
              <div>
                <span className="v260-featured-label"><i /> Case real · Projeto em destaque</span>
                <strong>{featured.title}</strong>
              </div>
              <span className="v260-featured-open">Abrir case <ArrowUpRight size={16} /></span>
            </div>

            <div className="v250-featured-visual">
              <ProjectVisual project={featured} />
            </div>

            <div className="v250-featured-foot">
              <div className="v260-featured-spec">
                <span>Tipo</span>
                <strong>{featured.category}</strong>
              </div>
              <div className="v260-featured-spec">
                <span>Stack / operação</span>
                <strong>{featured.technicalHighlights.slice(0, 2).join(" · ")}</strong>
              </div>
              <div className="v260-featured-tags">
                {featured.tags.slice(0, 3).map((tag) => (
                  <i key={tag}>{tag}</i>
                ))}
              </div>
            </div>
          </Link>
        </div>

        <div className="shell v250-capability-bar" aria-label="Especialidades">
          <span>Sites</span>
          <span>SaaS</span>
          <span>Dashboards</span>
          <span>Sistemas administrativos</span>
          <span>Automações</span>
        </div>
      </section>

      <section className="v250-section v250-projects" id="projetos">
        <div className="shell">
          <div className="v250-section-head">
            <div>
              <span>01 · Projetos</span>
              <h2>Trabalho real, apresentado sem excesso.</h2>
            </div>
            <p>
              Cada case mostra o problema, a solução e as decisões que fizeram
              o produto ficar mais simples de usar e manter.
            </p>
          </div>

          <div className="v250-project-list">
            {projects.map((project, index) => (
              <article className="v250-project-row" key={project.id}>
                <Link
                  className="v250-project-media"
                  href={`/projetos/${project.slug}`}
                  aria-label={`Abrir projeto ${project.title}`}
                >
                  <ProjectVisual project={project} />
                  <span className="v250-project-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>

                <div className="v250-project-copy">
                  <span className="v250-project-eyebrow">{project.eyebrow}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="v260-project-insight">
                    <div>
                      <span>Desafio</span>
                      <p>{project.challenge}</p>
                    </div>
                    <div>
                      <span>Solução</span>
                      <p>{project.solution}</p>
                    </div>
                  </div>

                  <div className="v250-project-facts">
                    <div>
                      <span>Categoria</span>
                      <strong>{project.category}</strong>
                    </div>
                    <div>
                      <span>Foco</span>
                      <strong>{project.principles.slice(0, 2).join(" · ")}</strong>
                    </div>
                  </div>

                  <div className="v250-project-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>

                  <Link className="v250-text-link" href={`/projetos/${project.slug}`}>
                    Ver case completo <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="v250-section-action">
            <Link className="v250-secondary-button" href="/projetos">
              Ver todos os projetos <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="v250-section v250-services">
        <div className="shell v250-services-layout">
          <div className="v250-sticky-copy">
            <span>02 · Serviços</span>
            <h2>Construído em torno do problema, não de uma lista de efeitos.</h2>
            <p>
              A solução pode ser um site, um SaaS ou uma ferramenta interna.
              O ponto de partida é sempre entender o que precisa funcionar melhor.
            </p>
            <Link className="v250-text-link" href="/servicos">
              Explorar serviços <ArrowRight size={15} />
            </Link>
          </div>

          <div className="v250-service-list">
            {capabilities.map((capability, index) => (
              <article key={capability.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </div>
                <ArrowUpRight size={17} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v250-section v250-process" id="processo">
        <div className="shell">
          <div className="v250-section-head compact">
            <div>
              <span>03 · Processo</span>
              <h2>Do problema à publicação.</h2>
            </div>
            <p>
              Um processo enxuto, com decisões visíveis e menos etapas
              desnecessárias.
            </p>
          </div>

          <div className="v250-process-list">
            {processSteps.map((step, index) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <div className="v250-process-line"><i /></div>
                <div>
                  <small>Etapa {index + 1}</small>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <span className="v260-process-output">Entrega · {processOutputs[index]}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v250-section v250-about" id="sobre">
        <div className="shell v250-about-grid">
          <div>
            <span>04 · ALUNERI</span>
            <h2>Menos ruído.<br />Mais produto.</h2>
          </div>

          <div className="v250-about-copy">
            <p>
              A ALUNERI combina interface e desenvolvimento para transformar
              processos complexos em produtos mais claros, modernos e fáceis
              de operar.
            </p>

            <div className="v250-principles">
              <div><strong>Simplicidade</strong><span>Menos passos e decisões mais claras.</span></div>
              <div><strong>Estrutura</strong><span>Base organizada para evoluir sem refazer tudo.</span></div>
              <div><strong>Uso real</strong><span>Prioridade para o que as pessoas realmente precisam fazer.</span></div>
            </div>

            <div className="v260-studio-details">
              <span><i /> Design + desenvolvimento no mesmo fluxo</span>
              <span><i /> Projetos preparados para desktop e mobile</span>
              <span><i /> Entrega com deploy e continuidade</span>
            </div>

            <Link className="v250-text-link" href="/sobre">
              Conhecer a ALUNERI <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="v250-section v250-tech" id="tecnologias">
        <div className="shell">
          <div className="v250-section-head compact">
            <div>
              <span>05 · Tecnologia</span>
              <h2>Ferramentas escolhidas para manter o produto simples de evoluir.</h2>
            </div>
          </div>

          <div className="v250-tech-grid">
            {technologyGroups.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <div>
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="v250-section v250-faq" id="faq">
        <div className="shell v250-faq-grid">
          <div className="v250-sticky-copy">
            <span>06 · Dúvidas</span>
            <h2>Antes da primeira conversa.</h2>
            <p>
              Respostas diretas para as dúvidas que normalmente aparecem antes
              de começar um projeto.
            </p>
          </div>

          <div className="v250-faq-list">
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

      <section className="v250-contact" id="contato">
        <div className="shell">
          <div className="v250-contact-panel">
            <div>
              <span>Próximo projeto</span>
              <h2>Tem uma ideia? Vamos organizar o próximo passo.</h2>
              <p>
                Comece com um briefing, marque uma conversa ou fale direto
                pelo WhatsApp.
              </p>
            </div>

            <div className="v260-contact-side">
              <div className="v260-contact-note">
                <span>Como começar</span>
                <strong>Briefing → conversa → proposta</strong>
                <small>Sem compromisso automático ao enviar sua ideia.</small>
              </div>
              <div className="v250-contact-actions">
              <Link href="/contato">
                <span><Spark size={17} /></span>
                <div><small>Projeto</small><strong>Preencher briefing</strong></div>
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/agendar">
                <span><Monitor size={17} /></span>
                <div><small>Reunião</small><strong>Agendar conversa</strong></div>
                <ArrowUpRight size={16} />
              </Link>
              {contact.whatsapp && (
                <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                  <span><WhatsApp size={17} /></span>
                  <div><small>WhatsApp</small><strong>{contact.whatsappDisplay}</strong></div>
                  <ArrowUpRight size={16} />
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`}>
                  <span><Mail size={17} /></span>
                  <div><small>Email</small><strong>{contact.email}</strong></div>
                  <ArrowUpRight size={16} />
                </a>
              )}
              <a href={contact.github} target="_blank" rel="noreferrer">
                <span><Github size={17} /></span>
                <div><small>GitHub</small><strong>Ferro135</strong></div>
                <ArrowUpRight size={16} />
              </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
