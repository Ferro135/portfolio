import Image from "next/image";
import type { Project } from "@/data/portfolio";

export function DeviceShowcase({ project }: { project: Project }) {
  const desktop = project.gallery[0];
  const mobile = project.mobilePresentation;

  return (
    <div className="device-showcase">
      <div className="desktop-device">
        <div className="device-browser-bar"><i /><i /><i /><span>{project.title} · Desktop</span></div>
        <div className="bg-[linear-gradient(180deg,rgba(10,16,30,.96),rgba(7,12,23,.96))] p-3 sm:p-4">
          <div style={{ aspectRatio: `${desktop.width}/${desktop.height}` }} className="relative mx-auto w-full max-w-[900px] overflow-hidden rounded-[16px] border border-white/8 bg-[#040811] shadow-[0_20px_50px_rgba(0,0,0,.22)]">
            <Image
              src={desktop.src}
              alt={`${project.title} em enquadramento desktop`}
              fill
              sizes="(max-width: 900px) 100vw, 820px"
              className="object-contain object-top p-2 sm:p-3"
            />
          </div>
        </div>
      </div>

      <div className="mobile-adaptation-card">
        <div className="mobile-adaptation-heading">
          <span>Mobile</span>
          <strong>Painel adaptado</strong>
        </div>
        <div className="mx-auto w-full max-w-[250px] rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.02))] p-2.5 shadow-[0_20px_45px_rgba(0,0,0,.22)]">
          <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-white/10" />
          <div
            className="mobile-adaptation-media"
            style={{ aspectRatio: `${mobile.width}/${mobile.height}` }}
          >
            <Image
              src={mobile.src}
              alt={mobile.alt}
              fill
              sizes="(max-width: 900px) 82vw, 260px"
              className="object-contain p-1.5"
            />
          </div>
        </div>
      </div>

      <p className="device-caption">
        A visualização desktop utiliza a captura real do sistema em um enquadramento mais leve. A versão mobile é uma adaptação visual do mesmo painel, criada para apresentar como a experiência pode ser reorganizada em telas menores.
      </p>
    </div>
  );
}
