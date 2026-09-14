"use client";

import { CONSENT_OPEN_EVENT } from "@/lib/consent";

export function CookiePreferencesButton({ locale = "pt" }: { locale?: "pt" | "en" }) {
  return (
    <button
      type="button"
      className="footer-legal-button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
    >
      {locale === "en" ? "Cookie preferences" : "Preferências de cookies"}
    </button>
  );
}
