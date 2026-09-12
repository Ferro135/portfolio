"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";
import {
  CONSENT_EVENT,
  type ConsentLevel,
  readClientConsent,
} from "@/lib/consent";

export function ClientTelemetry() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(readClientConsent() === "analytics");

    const onConsent = (event: Event) => {
      const level = (event as CustomEvent<ConsentLevel>).detail;
      setEnabled(level === "analytics");
    };

    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Analytics mode="production" />
      <SpeedInsights />
    </>
  );
}
