import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ArrowLeft, ArrowRight, Check, Github, WhatsApp } from "@/components/Icons";
import { StructuredData } from "@/components/StructuredData";
import { NexoraLogo } from "@/components/NexoraLogo";
import { brand, contact } from "@/data/portfolio";
import { serviceProcess, services } from "@/data/services";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Serviços de desenvolvimento web",
  description:
    "Sites, SaaS, dashboards, sistemas administrativos, painéis internos e automações desenvolvidos pela NEXORA.",
  alternates: { canonical: "/servicos" },
  openGraph: {
    title: "Serviços — NEXORA",
    description:
      "Desenvolvimento de sites, dashboards, SaaS, sistemas web e automações.",
    url: "/servicos",
    images: ["/opengraph-image"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Serviços NEXORA",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: {
        "@type": "Organization",
        name: "NEXORA",
        url: siteUrl,
      },
      url: `${siteUrl}/servicos#${service.id}`,
    },
  })),
};

export default function ServicesPage() {
  return (
    <main id="conteudo">
      <StructuredData data={serviceSchema} />
      <Header />

      <section className="inner-page-hero services-page-hero">
        <div className="inner-page-orb one" />
        <div className="inner-page-orb two" />
        <div className="shell relative">
          <Link className="case-back" href="/"><ArrowLeft /> Voltar ao portfólio</Link>
          <div className="inner-page-copy services-hero-copy">
            <span className="eyebrow">Serviços</span>
            <h1>Construímos o produto<br />que o processo precisa.</h1>
            <p>
              Sites, SaaS, dashboards, sistemas administrativos e automações.
              O formato é escolhido pelo problema — não o contrário.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/contato">
                Solicitar orçamento <ArrowRight />
              </Link>
              <a className="button button-whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">
                <WhatsApp /> Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section service-catalog-section" data-reveal>
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">O que entregamos</span>
              <h2>Do site ao sistema completo.</h2>
            </div>
            <p>
              Cada serviço pode ser contratado como projeto novo ou como evolução
              de uma solução que já existe.
            </p>
          </div>

          <div className="service-catalog-grid">
            {services.map((service) => (
              <article className="service-catalog-card" id={service.id} key={service.id} data-reveal>
                <div className="service-catalog-top">
                  <span>{service.number}</span>
                  <strong>{service.title}</strong>
                </div>
                <p>{service.description}</p>

                <div className="service-catalog-columns">
                  <div>
                    <small>Entregáveis comuns</small>
                    <ul>
                      {service.deliverables.map((item) => (
                        <li key={item}><Check size={14} /> {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <small>Faz sentido para</small>
                    <div className="service-tags">
                      {service.idealFor.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                </div>

                <Link className="case-link" href={`/contato?tipo=${encodeURIComponent(service.title)}`}>
                  Conversar sobre este serviço <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-process-section" data-reveal>
        <div className="shell">
          <div className="section-heading">
            <div><span className="eyebrow">Como funciona</span><h2>Clareza antes de complexidade.</h2></div>
            <p>Um processo simples para evitar retrabalho e manter cada decisão ligada ao problema real.</p>
          </div>

          <div className="service-process-grid">
            {serviceProcess.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section service-cta-section" data-reveal>
        <div className="shell">
          <div className="case-next-card">
            <div>
              <span className="eyebrow">Próximo passo</span>
              <h2>Conte o problema. Nós organizamos o caminho.</h2>
              <p>O briefing em etapas ajuda a chegar na primeira conversa com contexto suficiente para discutir escopo e prioridade.</p>
            </div>
            <div className="case-next-actions">
              <Link className="button button-primary" href="/contato">Preencher briefing <ArrowRight /></Link>
              <a className="button button-whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer"><WhatsApp /> WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <Link className="footer-brand" href="/">
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
