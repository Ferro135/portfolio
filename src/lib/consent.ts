export const CONSENT_COOKIE = "aluneri_cookie_consent";
export const CONSENT_EVENT = "aluneri:consent-changed";
export const CONSENT_VERSION = "v1";

export type ConsentLevel = "essential" | "analytics";

export function parseConsentCookie(raw: string | undefined | null): ConsentLevel | null {
  if (!raw) return null;
  const value = raw.trim();
  if (value === `${CONSENT_VERSION}:analytics`) return "analytics";
  if (value === `${CONSENT_VERSION}:essential`) return "essential";
  return null;
}

export function readClientConsent(): ConsentLevel | null {
  if (typeof document === "undefined") return null;
  const entry = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));

  return parseConsentCookie(entry?.split("=").slice(1).join("="));
}

export function writeClientConsent(level: ConsentLevel) {
  if (typeof document === "undefined") return;

  const maxAge = 60 * 60 * 24 * 180; // 180 dias
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${CONSENT_VERSION}:${level}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;

  window.dispatchEvent(
    new CustomEvent<ConsentLevel>(CONSENT_EVENT, { detail: level }),
  );
}
