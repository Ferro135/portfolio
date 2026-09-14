import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ALUNERI — Produtos Digitais & Sistemas",
    short_name: "ALUNERI",
    description: "Sites, dashboards e sistemas web modernos.",
    start_url: "/",
    display: "standalone",
    background_color: "#050914",
    theme_color: "#050914",
    lang: "pt-BR",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
