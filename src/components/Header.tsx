"use client";

import Link from "next/link";
import { useState } from "react";
import { Close, Menu } from "@/components/Icons";
import { NexoraLogo } from "@/components/NexoraLogo";
import { brand } from "@/data/portfolio";

const links = [
  ["/#inicio", "Início"],
  ["/#projetos", "Projetos"],
  ["/#sobre", "Sobre"],
  ["/#tecnologias", "Tecnologias"],
  ["/#contato", "Contato"],
];

export function Header() {
  const [open, setOpen] = useState(false);

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

        <Link className="availability-pill desktop-availability" href="/#contato">
          <span className="pulse-dot" />
          {brand.availability}
        </Link>

        <button
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <div className="shell mobile-menu-inner">
            {links.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
            ))}
            <Link href="/#contato" className="availability-pill" onClick={() => setOpen(false)}>
              <span className="pulse-dot" />
              {brand.availability}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
