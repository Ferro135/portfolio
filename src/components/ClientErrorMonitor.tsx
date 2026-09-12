"use client";

import { useEffect } from "react";

export function ClientErrorMonitor() {
  useEffect(() => {
    const report = (message: string, stack?: string) => {
      const payload = JSON.stringify({ message, stack, path: window.location.pathname });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/client-error", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/client-error", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => undefined);
      }
    };

    const onError = (event: ErrorEvent) => report(event.message || "Client error", event.error?.stack);
    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      report(reason instanceof Error ? reason.message : String(reason || "Unhandled rejection"), reason instanceof Error ? reason.stack : undefined);
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);
  return null;
}
