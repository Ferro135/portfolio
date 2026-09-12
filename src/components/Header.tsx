"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Close, Menu } from "@/components/Icons";
import { NexoraLogo } from "@/components/NexoraLogo";
import { brand } from "@/data/portfolio";

const links = [
  ["/#inicio", "Início"],
  ["/#projetos", "Projetos"],
  ["/#processo", "Processo"],
  ["/servicos", "Serviços"],
  ["/sobre", "Sobre"],
  ["/contato", "Contato"],
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/#inicio" aria-label="NEXORA — voltar ao início">
          <NexoraLogo className="brand-logo" />
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([href, label]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>

        <Link className="availability-pill desktop-availability" href="/contato">
          <span className="pulse-dot" aria-hidden="true" />
          {brand.availability}
        </Link>

        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu" id="menu-mobile">
          <nav className="shell mobile-menu-inner" aria-label="Navegação mobile">
            {links.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
            ))}
            <Link href="/contato" className="availability-pill" onClick={() => setOpen(false)}>
              <span className="pulse-dot" aria-hidden="true" />
              {brand.availability}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
