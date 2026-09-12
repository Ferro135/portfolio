"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Close } from "@/components/Icons";
import type { ProjectGalleryItem } from "@/data/portfolio";

export function ProjectGallery({ items, title }: { items: ProjectGalleryItem[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = () => setActive(null);
  const previous = () => setActive((current) => current === null ? null : (current - 1 + items.length) % items.length);
  const next = () => setActive((current) => current === null ? null : (current + 1) % items.length);

  useEffect(() => {
    if (active === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item, index) => (
          <button
            type="button"
            key={item.src}
            onClick={() => setActive(index)}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-nexora-panel text-left shadow-[0_24px_70px_rgba(0,0,0,.22)] outline-none transition hover:-translate-y-0.5 hover:border-blue-400/30 focus-visible:ring-2 focus-visible:ring-blue-400 ${index === 0 ? "md:col-span-2" : ""}`}
            aria-label={`Abrir ${item.label} de ${title} em tela cheia`}
          >
            <div style={{ aspectRatio: `${item.width} / ${item.height}` }} className="relative w-full">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={index === 0 ? "(max-width: 768px) 100vw, 1180px" : "(max-width: 768px) 100vw, 580px"}
                className="object-cover object-top transition duration-500 group-hover:scale-[1.018]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050914]/80 via-transparent to-transparent opacity-65" />
            </div>
            <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-nexora-bg/80 px-3 py-1.5 text-xs font-semibold text-slate-100 backdrop-blur-md">
              {item.label}
            </span>
            <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-nexora-bg/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-slate-300 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
              Ampliar
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02050bdd] p-4 backdrop-blur-xl md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — ${items[active].label}`}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) close();
          }}
        >
          <div className="relative flex h-full w-full max-w-[1600px] flex-col">
            <div className="mb-3 flex items-center justify-between gap-4 text-sm text-slate-300">
              <div>
                <strong className="block text-white">{title}</strong>
                <span>{items[active].label} · {active + 1}/{items.length}</span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="Fechar imagem"
              >
                <Close />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-nexora-bg shadow-2xl">
              <Image
                src={items[active].src}
                alt={items[active].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {items.length > 1 && (
              <div className="mt-3 flex justify-center gap-3">
                <button type="button" onClick={previous} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-400">
                  <ArrowLeft /> Anterior
                </button>
                <button type="button" onClick={next} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-400">
                  Próxima <ArrowRight />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
