"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/portfolio";

export function ProjectHotspots({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const image = project.gallery[0];
  const hotspot = project.hotspots[active];

  return (
    <div className="interactive-preview-grid">
      <div className="interactive-preview-frame">
        <div style={{ aspectRatio: `${image.width}/${image.height}` }} className="relative w-full">
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 760px" className="object-cover object-top" />
          <div className="interactive-image-shade" />
          {project.hotspots.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={`hotspot-button ${active === index ? "active" : ""}`}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onClick={() => setActive(index)}
              aria-label={`${item.label}: ${item.description}`}
              aria-pressed={active === index}
            >
              <span>{index + 1}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="hotspot-panel" aria-live="polite">
        <span className="eyebrow">Ponto {String(active + 1).padStart(2, "0")}</span>
        <h3>{hotspot.label}</h3>
        <p>{hotspot.description}</p>
        <div className="hotspot-tabs" role="tablist" aria-label={`Destaques de ${project.title}`}>
          {project.hotspots.map((item, index) => (
            <button
              type="button"
              key={item.label}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
              role="tab"
              aria-selected={active === index}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
