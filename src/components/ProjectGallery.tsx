"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Close } from "@/components/Icons";
import type { ProjectGalleryItem } from "@/data/portfolio";

function GalleryCard({
  item,
  title,
  index,
  onOpen,
  size = "default",
}: {
  item: ProjectGalleryItem;
  title: string;
  index: number;
  onOpen: (index: number) => void;
  size?: "hero" | "default" | "mobile";
}) {
  const aspect = size === "mobile" ? "9 / 16" : `${item.width} / ${item.height}`;

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`group project-gallery-card ${size === "hero" ? "project-gallery-card-hero" : ""} ${size === "mobile" ? "project-gallery-card-mobile" : ""}`}
      aria-label={`Abrir ${item.label} de ${title} em tela cheia`}
    >
      <div style={{ aspectRatio: aspect }} className={`project-gallery-frame ${size === "mobile" ? "project-gallery-frame-mobile" : ""}`}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={size === "hero" ? "(max-width: 900px) 100vw, 860px" : size === "mobile" ? "(max-width: 900px) 88vw, 320px" : "(max-width: 900px) 100vw, 420px"}
          className={`project-gallery-image ${size === "mobile" ? "project-gallery-image-mobile" : ""}`}
        />
        <div className="project-gallery-overlay" />
      </div>
      <span className="project-gallery-label">{item.label}</span>
      <span className="project-gallery-expand">Ampliar</span>
    </button>
  );
}

export function ProjectGallery({ items, title }: { items: ProjectGalleryItem[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

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

  const hero = items[0];
  const secondary = items.slice(1, 3);
  const mobile = items[3];

  return (
    <>
      <div className="project-gallery-layout">
        <div className="project-gallery-main">
          {hero && <GalleryCard item={hero} title={title} index={0} onOpen={setActive} size="hero" />}
          {secondary.length > 0 && (
            <div className="project-gallery-secondary">
              {secondary.map((item, localIndex) => (
                <GalleryCard
                  key={item.src}
                  item={item}
                  title={title}
                  index={localIndex + 1}
                  onOpen={setActive}
                />
              ))}
            </div>
          )}
        </div>

        {mobile && (
          <aside className="project-gallery-side">
            <GalleryCard item={mobile} title={title} index={3} onOpen={setActive} size="mobile" />
            <p className="project-gallery-side-note">
              A adaptação mobile aparece separada para manter uma leitura mais limpa das capturas desktop e valorizar melhor a apresentação do produto.
            </p>
          </aside>
        )}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02050bdd] p-4 backdrop-blur-xl md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — ${items[active].label}`}
          onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
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

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-aluneri-bg shadow-2xl">
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
