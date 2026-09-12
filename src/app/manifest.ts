import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NEXORA — Digital Products & Systems",
    short_name: "NEXORA",
    description: "Sites, dashboards e sistemas web modernos.",
    start_url: "/",
    display: "standalone",
    background_color: "#050914",
    theme_color: "#050914",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
