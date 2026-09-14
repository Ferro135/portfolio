"use client";

import { useEffect, useState } from "react";

export function GlobalAdminShortcut() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      const modifier = event.ctrlKey || event.metaKey;
      if (!modifier || !event.altKey || event.key.toLowerCase() !== "a") return;

      event.preventDefault();
      event.stopPropagation();
      setVisible(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => window.location.assign("/admin"), 260);
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  return (
    <div className={`admin-shortcut-toast${visible ? " is-visible" : ""}`} role="status" aria-live="polite">
      <span />
      Abrindo central administrativa…
    </div>
  );
}
