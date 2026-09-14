"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  type ConsentLevel,
  readClientConsent,
  writeClientConsent,
} from "@/lib/consent";

export function CookieConsent() {
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

    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
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

  return (
    <>
      {consent === null && (
        <section
          className="cookie-banner"
          aria-label="Preferências de cookies"
          role="region"
        >
          <div className="cookie-banner-copy">
            <span className="eyebrow">Privacidade</span>
            <strong>Você escolhe o que podemos medir.</strong>
            <p>
              A ALUNERI usa um cookie essencial para guardar sua preferência.
              Analytics e Speed Insights só são carregados se você autorizar.
            </p>
            <div className="cookie-policy-links">
              <Link href="/cookies">Política de cookies</Link>
              <Link href="/privacidade">Privacidade</Link>
            </div>
          </div>

          <div className="cookie-banner-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={() => save("essential")}
            >
              Somente essenciais
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setPreferencesOpen(true)}
            >
              Preferências
            </button>
            <button
              type="button"
              className="button button-primary"
              onClick={() => save("analytics")}
            >
              Aceitar analytics
            </button>
          </div>
        </section>
      )}

      {consent !== null && (
        <button
          type="button"
          className="cookie-settings-button"
          onClick={() => setPreferencesOpen(true)}
          aria-label="Abrir preferências de cookies"
        >
          Cookies
        </button>
      )}

      {preferencesOpen && (
        <div
          className="cookie-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setPreferencesOpen(false);
            }
          }}
        >
          <section
            className="cookie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-title"
          >
            <div className="cookie-modal-heading">
              <div>
                <span className="eyebrow">Preferências</span>
                <h2 id="cookie-title">Controle seus cookies</h2>
              </div>
              <button
                type="button"
                className="cookie-close"
                aria-label="Fechar preferências"
                onClick={() => setPreferencesOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="cookie-option locked">
              <div>
                <strong>Essenciais</strong>
                <p>
                  Necessários para guardar sua escolha de privacidade e manter o
                  funcionamento básico do site.
                </p>
              </div>
              <span className="cookie-required">Sempre ativos</span>
            </div>

            <label className="cookie-option">
              <div>
                <strong>Analytics e desempenho</strong>
                <p>
                  Permitem medir visitas e desempenho com Vercel Analytics e
                  Speed Insights. Não são carregados antes da sua autorização.
                </p>
              </div>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(event) => setAnalyticsEnabled(event.target.checked)}
              />
            </label>

            <div className="cookie-modal-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => save("essential")}
              >
                Rejeitar opcionais
              </button>
              <button
                type="button"
                className="button button-primary"
                onClick={() =>
                  save(analyticsEnabled ? "analytics" : "essential")
                }
              >
                Salvar preferências
              </button>
            </div>

            <p className="cookie-modal-footnote">
              Você pode mudar esta escolha a qualquer momento pelo botão
              “Cookies” no canto inferior esquerdo. Consulte também a{" "}
              <Link href="/cookies">Política de Cookies</Link> e a{" "}
              <Link href="/privacidade">Política de Privacidade</Link>.
            </p>
          </section>
        </div>
      )}
    </>
  );
}
