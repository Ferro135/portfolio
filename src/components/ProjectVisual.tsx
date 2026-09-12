import Image from "next/image";
import type { Project } from "@/data/portfolio";

export function ProjectVisual({ project }: { project: Project }) {
  const image = project.cover;

  return (
    <div className="group mx-2.5 mt-2.5 rounded-[18px] border border-white/6 bg-[radial-gradient(circle_at_top_right,rgba(74,108,255,.12),transparent_38%),linear-gradient(180deg,rgba(10,18,34,.92),rgba(6,11,21,.96))] p-3 shadow-[0_24px_70px_rgba(0,0,0,.20)] max-[620px]:mx-2 max-[620px]:mt-2">
      <div className="mb-3 flex items-center justify-between gap-3 rounded-[12px] border border-white/6 bg-white/[0.03] px-3 py-2">
        <div className="flex items-center gap-1.5">
          <i className="size-2 rounded-full bg-[#ff6b7a]" />
          <i className="size-2 rounded-full bg-[#ffcf68]" />
          <i className="size-2 rounded-full bg-[#57d89d]" />
        </div>
        <span className="text-[10px] font-medium tracking-[.12em] text-slate-400 uppercase">Preview do painel</span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-[15px] border border-white/8 bg-[#060b14] ring-1 ring-inset ring-white/5">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 860px) 100vw, 46vw"
          className="object-contain object-top p-2.5 transition duration-500 ease-out group-hover:scale-[1.02] group-hover:saturate-[1.05]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(5,9,20,.18)_50%,rgba(5,9,20,.48))]" />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="rounded-full border border-blue-300/15 bg-[#07101fd9] px-2.5 py-1.5 text-[10px] font-semibold text-slate-200 backdrop-blur-md max-[620px]:text-[9px]">
          Interface real
        </span>
        <span className="text-[10px] text-slate-500">Apresentação mais compacta</span>
      </div>
    </div>
  );
}
