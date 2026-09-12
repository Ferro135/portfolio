import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ArrowLeft, ArrowRight, Check, Code, Github, Layers, Monitor, Spark } from "@/components/Icons";
import { NexoraLogo } from "@/components/NexoraLogo";
import { brand, capabilities, contact, processSteps } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a NEXORA, uma identidade de desenvolvimento focada em produtos digitais claros, funcionais e preparados para evoluir.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre a NEXORA",
    description: "Produtos digitais construídos com clareza, usabilidade e estrutura técnica preparada para evoluir.",
    url: "/sobre",
  },
};

export default function AboutPage() {
  return (
    <main id="conteudo">
      <Header />
      <section className="inner-page-hero about-page-hero">
        <div className="inner-page-orb one" />
        <div className="inner-page-orb two" />
        <div className="shell relative">
          <Link className="case-back" href="/"><ArrowLeft /> Voltar ao portfólio</Link>
          <div className="inner-page-copy">
            <span className="eyebrow">Sobre a NEXORA</span>
            <h1>Produtos digitais<br />com menos ruído.</h1>
            <p>
              A NEXORA existe para transformar necessidades reais em interfaces e sistemas que façam sentido para quem usa,
              sem separar design, usabilidade e engenharia como problemas diferentes.
            </p>
          </div>
        </div>
      </section>

      <section className="section about-story-section" data-reveal>
        <div className="shell about-story-grid">
          <div>
            <span className="eyebrow">Direção</span>
            <h2>O objetivo não é entregar mais telas. É resolver melhor.</h2>
          </div>
          <div className="about-story-copy">
            <p>Um produto digital pode ser bonito e ainda ser confuso. Pode ter muitos recursos e ainda atrapalhar a rotina. Por isso, a NEXORA começa pelo problema e pelo contexto antes de decidir tecnologia ou estética.</p>
            <p>O trabalho busca reduzir passos desnecessários, organizar informações, dar clareza às ações e construir uma base que possa continuar evoluindo depois da primeira publicação.</p>
          </div>
        </div>
      </section>

      <section className="section values-section" data-reveal>
        <div className="shell">
          <div className="section-heading"><div><span className="eyebrow">Princípios</span><h2>Como pensamos produto.</h2></div><p>Quatro ideias simples orientam decisões de interface, desenvolvimento e entrega.</p></div>
          <div className="values-grid">
            <article><span><Monitor /></span><h3>Clareza antes de complexidade</h3><p>Uma interface deve explicar a próxima ação sem depender de treinamento constante.</p></article>
            <article><span><Layers /></span><h3>Estrutura que cresce</h3><p>Organização técnica importa para que novas funcionalidades não transformem evolução em retrabalho.</p></article>
            <article><span><Code /></span><h3>Função antes de efeito</h3><p>Animações e detalhes visuais existem para reforçar a experiência, não para disputar atenção com o conteúdo.</p></article>
            <article><span><Spark /></span><h3>Produto em evolução</h3><p>Publicar é uma etapa. Aprender com o uso e melhorar faz parte da vida do produto.</p></article>
          </div>
        </div>
      </section>

      <section className="section process-section" data-reveal>
        <div className="shell">
          <div className="section-heading"><div><span className="eyebrow">Processo</span><h2>Da ideia à evolução.</h2></div><p>Um caminho simples para manter problema, solução e entrega conectados.</p></div>
          <div className="process-grid">
            {processSteps.map((step) => <article key={step.number}><span className="process-number">{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section capabilities-section" data-reveal>
        <div className="shell">
          <div className="section-heading"><div><span className="eyebrow">Escopo</span><h2>O que podemos construir.</h2></div><p>Projetos diferentes, sempre com foco em uso real, manutenção e clareza.</p></div>
          <div className="capabilities-grid">{capabilities.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
        </div>
      </section>

      <section className="section about-cta-section" data-reveal>
        <div className="shell">
          <div className="case-next-card">
            <div><span className="eyebrow">Próximo projeto</span><h2>Se existe um processo confuso, existe uma oportunidade de simplificar.</h2><p>Envie um briefing ou veja os projetos que já estão no portfólio.</p></div>
            <div className="case-next-actions"><Link className="button button-primary" href="/contato">Solicitar orçamento <ArrowRight /></Link><Link className="button button-secondary" href="/#projetos">Ver projetos</Link></div>
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
