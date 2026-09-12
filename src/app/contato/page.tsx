import type { Metadata } from "next";
import Link from "next/link";
import { ContactBriefForm } from "@/components/ContactBriefForm";
import { Header } from "@/components/Header";
import { ArrowLeft, Github, Mail, WhatsApp } from "@/components/Icons";
import { NexoraLogo } from "@/components/NexoraLogo";
import { brand, contact, faqs } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Contato & orçamento",
  description: "Envie um briefing para a NEXORA e comece uma conversa sobre seu próximo site, dashboard, sistema web ou automação.",
  alternates: { canonical: "/contato" },
  openGraph: {
    title: "Contato & orçamento — NEXORA",
    description: "Preencha um briefing rápido e envie pelo WhatsApp para começar seu próximo projeto digital.",
    url: "/contato",
  },
};

export default function ContactPage() {
  return (
    <main id="conteudo">
      <Header />
      <section className="inner-page-hero contact-page-hero">
        <div className="inner-page-orb one" />
        <div className="inner-page-orb two" />
        <div className="shell relative">
          <Link className="case-back" href="/"><ArrowLeft /> Voltar ao portfólio</Link>
          <div className="inner-page-copy">
            <span className="eyebrow">Contato & orçamento</span>
            <h1>Conte o que você quer<br />tirar do papel.</h1>
            <p>
              Um briefing curto ajuda a entender o problema, o tipo de produto e o nível de complexidade antes da primeira conversa.
              Você pode preencher abaixo ou falar direto pelo WhatsApp.
            </p>
            <div className="inner-page-actions">
              <span className="contact-status"><span className="pulse-dot" /> {brand.availability}</span>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer"><WhatsApp size={17} /> {contact.whatsappDisplay}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section brief-section" data-reveal>
        <div className="shell brief-layout">
          <div className="brief-side">
            <span className="eyebrow">Briefing</span>
            <h2>Quanto mais contexto, melhor a primeira conversa.</h2>
            <p>Não precisa ter tudo definido. O objetivo é organizar o que você já sabe e transformar isso numa mensagem clara.</p>
            <div className="brief-checklist">
              <span>01 <strong>O que quer construir</strong></span>
              <span>02 <strong>Qual problema precisa resolver</strong></span>
              <span>03 <strong>Prazo e faixa de investimento</strong></span>
              <span>04 <strong>Referências ou integrações importantes</strong></span>
            </div>
          </div>
          <ContactBriefForm />
        </div>
      </section>

      <section className="section contact-page-options" data-reveal>
        <div className="shell">
          <div className="section-heading">
            <div><span className="eyebrow">Outros canais</span><h2>Prefere conversar primeiro?</h2></div>
            <p>Sem problema. O briefing é uma opção, não uma obrigação.</p>
          </div>
          <div className="contact-option-grid">
            <a href={contact.whatsapp} target="_blank" rel="noreferrer"><WhatsApp /><div><strong>WhatsApp</strong><span>Conversa direta e rápida</span></div></a>
            {contact.email && <a href={`mailto:${contact.email}`}><Mail /><div><strong>Email</strong><span>{contact.email}</span></div></a>}
            <a href={contact.github} target="_blank" rel="noreferrer"><Github /><div><strong>GitHub</strong><span>Projetos e código público</span></div></a>
          </div>
        </div>
      </section>

      <section className="section faq-section compact-faq" data-reveal>
        <div className="shell faq-grid">
          <div className="faq-heading"><span className="eyebrow">Perguntas frequentes</span><h2>Dúvidas comuns.</h2><p>Respostas rápidas antes de enviar o briefing.</p></div>
          <div className="faq-list">
            {faqs.slice(0, 4).map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question}<i>+</i></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <Link className="footer-brand" href="/"><NexoraLogo className="footer-logo" /><span>{brand.tagline}</span></Link>
          <span>© 2026 NEXORA. Produtos digitais feitos para funcionar.</span>
          <a className="footer-github" href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub Ferro135"><Github /></a>
        </div>
      </footer>
    </main>
  );
}
