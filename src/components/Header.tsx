"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Close, Menu } from "@/components/Icons";
import { AluneriLogo } from "@/components/AluneriLogo";
import { brand } from "@/data/portfolio";

const ptLinks = [
  ["/projetos", "Projetos"],
  ["/servicos", "Serviços"],
  ["/sobre", "Sobre"],
  ["/contato", "Contato"],
] as const;

const enLinks = [
  ["/en/projects", "Projects"],
  ["/en/services", "Services"],
  ["/en/about", "About"],
  ["/en/contact", "Contact"],
] as const;

function languageTarget(pathname: string, isEn: boolean) {
  const ptToEn: Record<string, string> = {
    "/": "/en",
    "/servicos": "/en/services",
    "/contato": "/en/contact",
    "/sobre": "/en/about",
    "/projetos": "/en/projects",
    "/resultados": "/en/results",
    "/agendar": "/en/schedule",
    "/privacidade": "/en/privacy",
    "/cookies": "/en/cookies",
    "/termos": "/en/terms",
    "/projetos/zentra": "/en/projects/zentra",
    "/projetos/spazio-gestao": "/en/projects/spazio-management",
  };

  const enToPt: Record<string, string> = {
    "/en": "/",
    "/en/services": "/servicos",
    "/en/contact": "/contato",
    "/en/about": "/sobre",
    "/en/projects": "/projetos",
    "/en/results": "/resultados",
    "/en/schedule": "/agendar",
    "/en/privacy": "/privacidade",
    "/en/cookies": "/cookies",
    "/en/terms": "/termos",
    "/en/projects/zentra": "/projetos/zentra",
    "/en/projects/spazio-management": "/projetos/spazio-gestao",
  };

  if (isEn) {
    if (enToPt[pathname]) return enToPt[pathname];
    if (pathname.startsWith("/en/projects/")) {
      return pathname.replace("/en/projects/", "/projetos/");
    }
    return "/";
  }

  if (ptToEn[pathname]) return ptToEn[pathname];
  if (pathname.startsWith("/projetos/")) {
    return pathname.replace("/projetos/", "/en/projects/");
  }
  return "/en";
}

function isActive(pathname: string, href: string) {
  const clean = href.split("#")[0];

  if (href.includes("#")) {
    const isHomeAnchor = href.endsWith("#inicio") || href.endsWith("#home");
    return isHomeAnchor && pathname === clean;
  }

  if (clean === "/" || clean === "/en") {
    return pathname === clean;
  }

  if (clean === "/projetos" || clean === "/en/projects") {
    return pathname === clean || pathname.startsWith(`${clean}/`);
  }

  return pathname === clean;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const links = isEn ? enLinks : ptLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="shell header-inner">
        <Link
          className="brand"
          href={isEn ? "/en#home" : "/#inicio"}
          aria-label="ALUNERI"
        >
          <AluneriLogo className="brand-logo" priority />
        </Link>

        <nav
          className="desktop-nav"
          aria-label={isEn ? "Main navigation" : "Navegação principal"}
        >
          {links.map(([href, label]) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={active ? "active" : ""}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
          <Link
            className="language-switch"
            href={languageTarget(pathname, isEn)}
            aria-label={isEn ? "Mudar para português" : "Switch to English"}
          >
            {isEn ? "PT" : "EN"}
          </Link>
        </nav>

        <Link
          className="availability-pill desktop-availability"
          href={isEn ? "/en/contact" : "/contato"}
        >
          <span className="pulse-dot" aria-hidden="true" />
          {isEn ? "Start a project" : "Iniciar projeto"}
        </Link>

        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={
            open
              ? isEn
                ? "Close menu"
                : "Fechar menu"
              : isEn
                ? "Open menu"
                : "Abrir menu"
          }
          aria-expanded={open}
          aria-controls="menu-mobile"
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu" id="menu-mobile">
          <nav
            className="shell mobile-menu-inner"
            aria-label={isEn ? "Mobile navigation" : "Navegação mobile"}
          >
            <div className="mobile-menu-heading">
              <span>{isEn ? "Navigation" : "Navegação"}</span>
              <small>{brand.tagline}</small>
            </div>

            {links.map(([href, label]) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={active ? "active" : ""}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}

            <div className="mobile-menu-footer">
              <Link href={languageTarget(pathname, isEn)}>
                {isEn ? "Português" : "English"}
              </Link>
              <Link
                href={isEn ? "/en/contact" : "/contato"}
                className="availability-pill"
              >
                <span className="pulse-dot" aria-hidden="true" />
                {isEn ? "Start a project" : "Iniciar projeto"}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
