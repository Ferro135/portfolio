import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Resumo das práticas de privacidade do portfólio NEXORA.",
};

export default function PrivacyPage() {
  return (
    <main id="conteudo">
      <Header />
      <section className="inner-page-hero legal-hero">
        <div className="shell">
          <Link className="case-back" href="/">← Voltar ao portfólio</Link>
          <div className="inner-page-copy">
            <span className="eyebrow">Privacidade</span>
            <h1>Privacidade por padrão.</h1>
            <p>
              O portfólio foi estruturado para coletar o mínimo possível e evitar
              armazenar dados do briefing no servidor.
            </p>
          </div>
        </div>
      </section>

      <section className="section legal-section">
        <div className="shell legal-grid">
          <article>
            <h2>Briefing</h2>
            <p>
              O formulário de contato monta a mensagem no seu próprio navegador.
              Antes de você abrir e enviar a conversa pelo WhatsApp, a NEXORA não
              recebe nem armazena esse conteúdo em um banco de dados.
            </p>
          </article>

          <article>
            <h2>Analytics opcional</h2>
            <p>
              Vercel Analytics e Speed Insights somente são carregados após
              consentimento para analytics. A preferência pode ser alterada a qualquer
              momento.
            </p>
          </article>

          <article>
            <h2>Terceiros</h2>
            <p>
              Ao abrir WhatsApp, GitHub ou uma demo externa, você passa a interagir
              com um serviço de terceiros e suas respectivas políticas.
            </p>
          </article>

          <article>
            <h2>Segurança</h2>
            <p>
              O site aplica HTTPS, HSTS, Content Security Policy, bloqueio de frames,
              políticas de origem e outras proteções de navegador. A infraestrutura
              de produção usa as mitigações de tráfego da Vercel.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
