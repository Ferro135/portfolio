import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Como a NEXORA usa cookies essenciais e ferramentas opcionais de analytics.",
};

export default function CookiesPage() {
  return (
    <main id="conteudo">
      <Header />
      <section className="inner-page-hero legal-hero">
        <div className="shell">
          <Link className="case-back" href="/">← Voltar ao portfólio</Link>
          <div className="inner-page-copy">
            <span className="eyebrow">Privacidade</span>
            <h1>Política de Cookies</h1>
            <p>
              A NEXORA usa o mínimo necessário. Analytics e medição de desempenho
              ficam desativados até você autorizar.
            </p>
          </div>
        </div>
      </section>

      <section className="section legal-section">
        <div className="shell legal-grid">
          <article>
            <h2>Cookie essencial</h2>
            <p>
              O cookie <code>nexora_cookie_consent</code> guarda sua preferência de
              privacidade por até 180 dias. Ele usa <strong>SameSite=Lax</strong>,
              caminho global e <strong>Secure</strong> quando o site está em HTTPS.
            </p>
          </article>

          <article>
            <h2>Analytics e desempenho</h2>
            <p>
              Quando você autoriza, Vercel Analytics e Speed Insights podem ser
              carregados para entender visitas e desempenho. Se você escolher
              “Somente essenciais”, esses componentes não são carregados.
            </p>
          </article>

          <article>
            <h2>Como alterar sua escolha</h2>
            <p>
              Depois de escolher, use o botão <strong>Cookies</strong> no canto
              inferior esquerdo para abrir novamente as preferências.
            </p>
          </article>

          <article>
            <h2>Serviços externos</h2>
            <p>
              Links para WhatsApp, GitHub e possíveis demos abrem serviços de
              terceiros, que possuem suas próprias políticas de privacidade e cookies.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
