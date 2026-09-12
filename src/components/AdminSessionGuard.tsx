"use client";

import { useEffect } from "react";

const IDLE_LIMIT = 30 * 60 * 1000;

export function AdminSessionGuard() {
  useEffect(() => {
    let lastActivity = Date.now();
    let loggingOut = false;
    const markActivity = () => { lastActivity = Date.now(); };
    const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "scroll", "touchstart"];
    for (const event of events) window.addEventListener(event, markActivity, { passive: true });

    const interval = window.setInterval(async () => {
      if (loggingOut || Date.now() - lastActivity < IDLE_LIMIT) return;
      loggingOut = true;
      try { await fetch("/api/admin/logout", { method: "POST", cache: "no-store" }); }
      finally { window.location.assign("/admin/login?idle=1"); }
    }, 60_000);

    return () => {
      window.clearInterval(interval);
      for (const event of events) window.removeEventListener(event, markActivity);
    };
  }, []);
  return null;
}
