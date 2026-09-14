import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { CookiePreferencesButton } from "@/components/CookiePreferencesButton";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Como a ALUNERI usa cookies essenciais e ferramentas opcionais de medição.",
  alternates: { canonical: "/cookies", languages: { "pt-BR": "/cookies", en: "/en/cookies" } },
};

export default function CookiesPage() {
  return (
    <main id="conteudo">
      <Header />
      <section className="inner-page-hero legal-hero">
        <div className="shell">
          <Link className="case-back" href="/">← Voltar ao portfólio</Link>
          <div className="inner-page-copy">
            <span className="eyebrow">Cookies & preferências</span>
            <h1>Você decide o que pode ser medido.</h1>
            <p>A ALUNERI usa o mínimo necessário e mantém analytics desativado até você autorizar.</p>
            <span className="legal-updated">Última atualização: 14 de setembro de 2026</span>
          </div>
        </div>
      </section>

      <section className="section legal-section">
        <div className="shell legal-content">
          <div className="legal-summary-card">
            <span className="eyebrow">Resumo</span>
            <h2>Sem consentimento, somente o essencial.</h2>
            <p>O cookie de consentimento serve apenas para lembrar a sua escolha. Vercel Analytics e Speed Insights são carregados somente quando a categoria de analytics é autorizada.</p>
            <CookiePreferencesButton />
          </div>

          <div className="legal-table-wrap">
            <table className="legal-table">
              <thead><tr><th>Recurso</th><th>Categoria</th><th>Finalidade</th><th>Duração</th></tr></thead>
              <tbody>
                <tr><td><code>aluneri_cookie_consent</code></td><td>Essencial</td><td>Guardar a preferência de privacidade escolhida pelo visitante.</td><td>Até 180 dias</td></tr>
                <tr><td>Vercel Analytics</td><td>Analytics opcional</td><td>Entender uso agregado das páginas e ajudar a avaliar a experiência.</td><td>Carregado somente após consentimento</td></tr>
                <tr><td>Speed Insights</td><td>Desempenho opcional</td><td>Medir indicadores técnicos de carregamento e experiência.</td><td>Carregado somente após consentimento</td></tr>
              </tbody>
            </table>
          </div>

          <div className="legal-grid">
            <article><h2>Essenciais</h2><p>São necessários para lembrar sua escolha de privacidade e permitir funções básicas. Não podem ser desligados pelo painel de preferências.</p></article>
            <article><h2>Analytics e desempenho</h2><p>São opcionais. Ao rejeitá-los, o site continua utilizável e os componentes de analytics não são montados no navegador.</p></article>
            <article><h2>Alterar consentimento</h2><p>Use o botão <strong>Cookies</strong> no canto inferior ou <CookiePreferencesButton /> para revisar a decisão a qualquer momento.</p></article>
            <article><h2>Serviços externos</h2><p>Links para WhatsApp, GitHub, demos e outros serviços levam a provedores com políticas próprias. O controle desta página se aplica ao site ALUNERI.</p></article>
            <article><h2>Configuração segura</h2><p>O cookie de preferência usa <strong>SameSite=Lax</strong>, caminho global e <strong>Secure</strong> quando o acesso acontece por HTTPS.</p></article>
            <article><h2>Mais informações</h2><p>Para entender o tratamento de dados pessoais, consulte a <Link href="/privacidade">Política de Privacidade</Link> e os <Link href="/termos">Termos de Uso</Link>.</p></article>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
