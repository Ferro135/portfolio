"use client";

import { useEffect, useState } from "react";

export function PageScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const next = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, next)));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="page-progress" aria-hidden="true">
      <span style={{ width: `${progress}%` }} />
    </div>
  );
}
