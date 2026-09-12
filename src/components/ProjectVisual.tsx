import Image from "next/image";
import type { Project } from "@/data/portfolio";

export function ProjectVisual({ project }: { project: Project }) {
  const image = project.gallery[0];

  return (
    <div className="group relative mx-2.5 mt-2.5 aspect-[2/1] overflow-hidden rounded-[13px] bg-nexora-panel shadow-[0_16px_50px_rgba(0,0,0,.22)] max-[620px]:mx-2 max-[620px]:mt-2">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 860px) 100vw, 50vw"
        className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.035] group-hover:saturate-[1.08]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(5,9,20,.7)_100%)] opacity-80 transition-opacity duration-300 group-hover:opacity-55" />
      <div className="pointer-events-none absolute inset-0 rounded-[13px] ring-1 ring-inset ring-white/5 transition group-hover:ring-blue-400/25" />
      <span className="absolute bottom-3.5 left-3.5 rounded-full border border-blue-300/20 bg-[#07101fd9] px-2.5 py-1.5 text-[10px] font-semibold text-slate-200 backdrop-blur-md max-[620px]:bottom-2.5 max-[620px]:left-2.5 max-[620px]:text-[9px]">
        Interface real
      </span>
    </div>
  );
}
