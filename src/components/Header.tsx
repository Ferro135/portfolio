"use client";

import { useState } from "react";
import { Close, Menu } from "@/components/Icons";

const links = [
  ["#inicio", "Início"],
  ["#projetos", "Projetos"],
  ["#sobre", "Sobre"],
  ["#tecnologias", "Tecnologias"],
  ["#contato", "Contato"],
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#inicio" aria-label="Ir para o início">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>Portfólio</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a className="availability-pill desktop-availability" href="#contato">
          <span className="pulse-dot" />
          Disponível para projetos
        </a>

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
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a href="#contato" className="availability-pill" onClick={() => setOpen(false)}>
              <span className="pulse-dot" />
              Disponível para projetos
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
