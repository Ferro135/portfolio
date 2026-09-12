import Image from "next/image";
import type { Project } from "@/data/portfolio";

export function DeviceShowcase({ project }: { project: Project }) {
  const image = project.gallery[0];

  return (
    <div className="device-showcase">
      <div className="desktop-device">
        <div className="device-browser-bar"><i /><i /><i /><span>{project.title}</span></div>
        <div style={{ aspectRatio: `${image.width}/${image.height}` }} className="relative w-full overflow-hidden rounded-b-[18px]">
          <Image src={image.src} alt={`${project.title} em enquadramento desktop`} fill sizes="(max-width: 900px) 100vw, 850px" className="object-cover object-top" />
        </div>
      </div>
      <div className="phone-device" aria-label={`Recorte da interface de ${project.title} em formato mobile`}>
        <div className="phone-notch" />
        <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[#07101f]">
          <Image
            src={image.src}
            alt={`Recorte da interface real de ${project.title} apresentado em moldura mobile`}
            fill
            sizes="260px"
            className="object-cover object-top"
            style={{ objectPosition: project.id === "zentra" ? "22% top" : "12% top" }}
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
      </div>
      <p className="device-caption">A moldura mobile usa um recorte da captura real para demonstrar adaptação visual; não substitui uma captura nativa do aplicativo em celular.</p>
    </div>
  );
}
