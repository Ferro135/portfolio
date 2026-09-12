"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    let observer: IntersectionObserver | null = null;
    let frame = 0;

    frame = window.requestAnimationFrame(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      if (!elements.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
      );

      elements.forEach((element) => {
        // If an element is already in/near the viewport after a client-side route
        // transition, reveal it immediately instead of waiting for another scroll.
        const rect = element.getBoundingClientRect();
        const nearViewport = rect.top < window.innerHeight * 1.08 && rect.bottom > -80;

        if (nearViewport) {
          element.classList.add("is-visible");
        } else {
          observer?.observe(element);
        }
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
