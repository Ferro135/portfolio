import Link from "next/link";
import { Github, WhatsApp } from "@/components/Icons";
import { AluneriLogo } from "@/components/AluneriLogo";
import { CookiePreferencesButton } from "@/components/CookiePreferencesButton";
import { brand, contact } from "@/data/portfolio";

export function SiteFooter({ locale = "pt" }: { locale?: "pt" | "en" }) {
  const en = locale === "en";
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-about">
          <Link className="footer-brand" href={en ? "/en" : "/"} aria-label="ALUNERI">
            <AluneriLogo className="footer-logo" />
          </Link>
          <p>{en ? "Digital products and web systems designed for clarity, performance and real operations." : "Produtos digitais e sistemas web pensados para clareza, performance e operações reais."}</p>
          <span className="footer-privacy-note">
            <i aria-hidden="true" /> {en ? "Privacy-first by design" : "Privacidade por padrão"}
          </span>
        </div>

        <div className="footer-column">
          <strong>{en ? "Explore" : "Navegação"}</strong>
          <Link href={en ? "/en/projects" : "/projetos"}>{en ? "Projects" : "Projetos"}</Link>
          <Link href={en ? "/en/services" : "/servicos"}>{en ? "Services" : "Serviços"}</Link>
          <Link href={en ? "/en/results" : "/resultados"}>{en ? "Results" : "Resultados"}</Link>
          <Link href={en ? "/en/about" : "/sobre"}>{en ? "About" : "Sobre"}</Link>
        </div>

        <div className="footer-column">
          <strong>{en ? "Legal & privacy" : "Legal & privacidade"}</strong>
          <Link href={en ? "/en/privacy" : "/privacidade"}>{en ? "Privacy policy" : "Política de privacidade"}</Link>
          <Link href={en ? "/en/cookies" : "/cookies"}>{en ? "Cookie policy" : "Política de cookies"}</Link>
          <Link href={en ? "/en/terms" : "/termos"}>{en ? "Terms of use" : "Termos de uso"}</Link>
          <CookiePreferencesButton locale={locale} />
        </div>

        <div className="footer-column footer-contact-column">
          <strong>{en ? "Contact" : "Contato"}</strong>
          <Link href={en ? "/en/contact" : "/contato"}>{en ? "Start a project" : "Solicitar orçamento"}</Link>
          <Link href={en ? "/en/schedule" : "/agendar"}>{en ? "Schedule a conversation" : "Agendar conversa"}</Link>
          {contact.whatsapp && <a href={contact.whatsapp} target="_blank" rel="noreferrer"><WhatsApp size={14} /> WhatsApp</a>}
          <a href={contact.github} target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© 2026 ALUNERI. {en ? "Digital products made to work." : "Produtos digitais feitos para funcionar."}</span>
        <div>
          <Link href={en ? "/en/privacy" : "/privacidade"}>{en ? "Privacy" : "Privacidade"}</Link>
          <Link href={en ? "/en/cookies" : "/cookies"}>Cookies</Link>
          <Link href={en ? "/en/terms" : "/termos"}>{en ? "Terms" : "Termos"}</Link>
        </div>
      </div>
    </footer>
  );
}
