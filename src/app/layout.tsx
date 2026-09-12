import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ScrollRevealController } from "@/components/ScrollRevealController";
import { CookieConsent } from "@/components/CookieConsent";
import { ClientTelemetry } from "@/components/ClientTelemetry";
import { PageScrollProgress } from "@/components/PageScrollProgress";
import { StructuredData } from "@/components/StructuredData";
import { contact } from "@/data/portfolio";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NEXORA — Produtos Digitais & Sistemas",
    template: "%s | NEXORA",
  },
  description:
    "Sites, dashboards e sistemas web modernos, desenvolvidos com foco em experiência, performance e soluções funcionais.",
  applicationName: "NEXORA",
  keywords: [
    "NEXORA",
    "desenvolvimento web",
    "criação de sites",
    "desenvolvimento de sistemas web",
    "desenvolvimento SaaS",
    "sistemas administrativos",
    "automações web",
    "dashboards",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "NEXORA" }],
  creator: "NEXORA",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "NEXORA",
    url: "/",
    title: "NEXORA — Produtos Digitais & Sistemas",
    description:
      "Transformamos ideias em sites, dashboards e sistemas web modernos, claros e funcionais.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "NEXORA — Produtos Digitais & Sistemas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXORA — Produtos Digitais & Sistemas",
    description:
      "Sites, dashboards e sistemas web modernos, desenvolvidos com foco em experiência e performance.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};


const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NEXORA",
  url: siteUrl,
  description:
    "Desenvolvimento de sites, dashboards, sistemas web, SaaS e automações.",
  sameAs: [contact.github],
  ...(contact.email ? { email: contact.email } : {}),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NEXORA",
  url: siteUrl,
  inLanguage: "pt-BR",
  description:
    "Produtos digitais e sistemas web com foco em clareza, performance e uso real.",
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
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <StructuredData data={[organizationSchema, websiteSchema]} />
        <PageScrollProgress />
        <ScrollRevealController />
        {children}
        <FloatingWhatsApp />
        <CookieConsent />
        <ClientTelemetry />
      </body>
    </html>
  );
}
