import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-omega-steel-enwtatsyqo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NEXORA — Digital Products & Systems",
    template: "%s | NEXORA",
  },
  description:
    "Sites, dashboards e sistemas web modernos, desenvolvidos com foco em experiência, performance e soluções funcionais.",
  applicationName: "NEXORA",
  keywords: [
    "NEXORA",
    "desenvolvimento web",
    "sistemas web",
    "dashboards",
    "Next.js",
    "TypeScript",
    "Supabase",
  ],
  authors: [{ name: "NEXORA" }],
  creator: "NEXORA",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "NEXORA",
    title: "NEXORA — Digital Products & Systems",
    description:
      "Transformamos ideias em sites, dashboards e sistemas web modernos, claros e funcionais.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXORA — Digital Products & Systems",
    description:
      "Sites, dashboards e sistemas web modernos, desenvolvidos com foco em experiência e performance.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050914",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
