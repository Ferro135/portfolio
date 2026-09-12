import Image from "next/image";
import type { Project } from "@/data/portfolio";

export function DeviceShowcase({ project }: { project: Project }) {
  const desktop = project.gallery[0];
  const mobile = project.mobilePresentation;

  return (
    <div className="device-showcase">
      <div className="desktop-device">
        <div className="device-browser-bar"><i /><i /><i /><span>{project.title} · Desktop</span></div>
        <div style={{ aspectRatio: `${desktop.width}/${desktop.height}` }} className="relative w-full overflow-hidden rounded-b-[18px]">
          <Image
            src={desktop.src}
            alt={`${project.title} em enquadramento desktop`}
            fill
            sizes="(max-width: 900px) 100vw, 850px"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="mobile-adaptation-card">
        <div className="mobile-adaptation-heading">
          <span>Mobile</span>
          <strong>Painel adaptado</strong>
        </div>
        <div
          className="mobile-adaptation-media"
          style={{ aspectRatio: `${mobile.width}/${mobile.height}` }}
        >
          <Image
            src={mobile.src}
            alt={mobile.alt}
            fill
            sizes="(max-width: 900px) 86vw, 330px"
            className="object-contain"
          />
        </div>
      </div>

      <p className="device-caption">
        A visualização desktop utiliza a captura real do sistema. A versão mobile é uma adaptação visual do mesmo painel, criada para apresentar como a experiência pode ser reorganizada em telas menores.
      </p>
    </div>
  );
}
