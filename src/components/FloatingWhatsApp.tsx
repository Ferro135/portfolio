"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsApp } from "@/components/Icons";
import { contact } from "@/data/portfolio";
import {
  CONSENT_EVENT,
  type ConsentLevel,
  readClientConsent,
} from "@/lib/consent";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [consentResolved, setConsentResolved] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setConsentResolved(readClientConsent() !== null);

    const onConsent = (event: Event) => {
      const level = (event as CustomEvent<ConsentLevel>).detail;
      setConsentResolved(Boolean(level));
    };

    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  const hiddenRoutes =
    pathname === "/contato" ||
    pathname === "/en/contact" ||
    pathname.startsWith("/admin");

  if (!contact.whatsapp || hiddenRoutes || !consentResolved) return null;

  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a ALUNERI no WhatsApp"
      className={`floating-whatsapp ${visible ? "is-visible" : ""}`}
    >
      <span className="floating-whatsapp-icon"><WhatsApp size={21} /></span>
      <span className="floating-whatsapp-copy">
        <small>Tem um projeto?</small>
        <strong>Falar no WhatsApp</strong>
      </span>
    </a>
  );
}
