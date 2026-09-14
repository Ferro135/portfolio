"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  CONSENT_OPEN_EVENT,
  type ConsentLevel,
  readClientConsent,
  writeClientConsent,
} from "@/lib/consent";

export function CookieConsent() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const [hydrated, setHydrated] = useState(false);
  const [consent, setConsent] = useState<ConsentLevel | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const current = readClientConsent();
    setConsent(current);
    setAnalyticsEnabled(current === "analytics");
    setHydrated(true);

    const onConsent = (event: Event) => {
      const level = (event as CustomEvent<ConsentLevel>).detail;
      setConsent(level);
      setAnalyticsEnabled(level === "analytics");
    };
    const onOpen = () => setPreferencesOpen(true);

    window.addEventListener(CONSENT_EVENT, onConsent);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!preferencesOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreferencesOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [preferencesOpen]);

  const save = (level: ConsentLevel) => {
    writeClientConsent(level);
    setConsent(level);
    setAnalyticsEnabled(level === "analytics");
    setPreferencesOpen(false);
  };

  if (!hydrated) return null;
  const links = isEn
    ? { cookies: "/en/cookies", privacy: "/en/privacy" }
    : { cookies: "/cookies", privacy: "/privacidade" };

  return (
    <>
      {consent === null && (
        <section className="cookie-banner" aria-label={isEn ? "Cookie preferences" : "Preferências de cookies"} role="region">
          <div className="cookie-banner-copy">
            <span className="eyebrow">{isEn ? "Privacy" : "Privacidade"}</span>
            <strong>{isEn ? "You choose what we can measure." : "Você escolhe o que podemos medir."}</strong>
            <p>
              {isEn
                ? "ALUNERI uses one essential cookie to remember your privacy choice. Analytics and performance measurement only load after your permission."
                : "A ALUNERI usa um cookie essencial para guardar sua escolha de privacidade. Analytics e medição de desempenho só são carregados após sua autorização."}
            </p>
            <div className="cookie-policy-links">
              <Link href={links.cookies}>{isEn ? "Cookie policy" : "Política de cookies"}</Link>
              <Link href={links.privacy}>{isEn ? "Privacy policy" : "Política de privacidade"}</Link>
            </div>
          </div>
          <div className="cookie-banner-actions">
            <button type="button" className="button button-secondary" onClick={() => save("essential")}>
              {isEn ? "Essential only" : "Somente essenciais"}
            </button>
            <button type="button" className="button button-secondary" onClick={() => setPreferencesOpen(true)}>
              {isEn ? "Preferences" : "Preferências"}
            </button>
            <button type="button" className="button button-primary" onClick={() => save("analytics")}>
              {isEn ? "Allow analytics" : "Aceitar analytics"}
            </button>
          </div>
        </section>
      )}

      {consent !== null && (
        <button type="button" className="cookie-settings-button" onClick={() => setPreferencesOpen(true)} aria-label={isEn ? "Open cookie preferences" : "Abrir preferências de cookies"}>
          {isEn ? "Cookies" : "Cookies"}
        </button>
      )}

      {preferencesOpen && (
        <div className="cookie-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setPreferencesOpen(false); }}>
          <section className="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
            <div className="cookie-modal-heading">
              <div>
                <span className="eyebrow">{isEn ? "Preferences" : "Preferências"}</span>
                <h2 id="cookie-title">{isEn ? "Control your cookies" : "Controle seus cookies"}</h2>
              </div>
              <button type="button" className="cookie-close" aria-label={isEn ? "Close preferences" : "Fechar preferências"} onClick={() => setPreferencesOpen(false)}>×</button>
            </div>
            <div className="cookie-option locked">
              <div>
                <strong>{isEn ? "Essential" : "Essenciais"}</strong>
                <p>{isEn ? "Required to remember your privacy choice and keep basic site behavior working." : "Necessários para guardar sua escolha de privacidade e manter o funcionamento básico do site."}</p>
              </div>
              <span className="cookie-required">{isEn ? "Always active" : "Sempre ativos"}</span>
            </div>
            <label className="cookie-option">
              <div>
                <strong>{isEn ? "Analytics & performance" : "Analytics e desempenho"}</strong>
                <p>{isEn ? "Allows Vercel Analytics and Speed Insights to measure visits and performance. These tools do not load before your permission." : "Permitem que Vercel Analytics e Speed Insights meçam visitas e desempenho. Essas ferramentas não são carregadas antes da sua autorização."}</p>
              </div>
              <input type="checkbox" checked={analyticsEnabled} onChange={(event) => setAnalyticsEnabled(event.target.checked)} />
            </label>
            <div className="cookie-modal-actions">
              <button type="button" className="button button-secondary" onClick={() => save("essential")}>{isEn ? "Reject optional" : "Rejeitar opcionais"}</button>
              <button type="button" className="button button-primary" onClick={() => save(analyticsEnabled ? "analytics" : "essential")}>{isEn ? "Save preferences" : "Salvar preferências"}</button>
            </div>
            <p className="cookie-modal-footnote">
              {isEn ? "You can change this choice at any time. Read our " : "Você pode mudar esta escolha a qualquer momento. Consulte a "}
              <Link href={links.cookies}>{isEn ? "Cookie Policy" : "Política de Cookies"}</Link>
              {isEn ? " and " : " e a "}
              <Link href={links.privacy}>{isEn ? "Privacy Policy" : "Política de Privacidade"}</Link>.
            </p>
          </section>
        </div>
      )}
    </>
  );
}
