"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Calendar, Command, FileText, Folder, Grid, MessageSquare, Search, Settings, Users } from "@/components/Icons";

const commands = [
  { href: "/admin", label: "Visão geral", hint: "Dashboard e prioridades", icon: Grid },
  { href: "/admin/leads", label: "Leads", hint: "CRM e novos contatos", icon: Users },
  { href: "/admin/propostas", label: "Propostas", hint: "Comercial e links públicos", icon: FileText },
  { href: "/admin/agendamentos", label: "Agendamentos", hint: "Solicitações de reunião", icon: Calendar },
  { href: "/admin/projetos", label: "Projetos", hint: "CMS do portfólio", icon: Folder },
  { href: "/admin/depoimentos", label: "Depoimentos", hint: "Prova social autorizada", icon: MessageSquare },
  { href: "/admin/erros", label: "Erros", hint: "Observabilidade do navegador", icon: AlertTriangle },
  { href: "/admin/configuracao", label: "Configuração", hint: "Saúde das integrações", icon: Settings },
] as const;

export function AdminCommandPalette() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    window.setTimeout(() => inputRef.current?.focus(), 20);
  }, [open]);

  const filtered = useMemo(() => {
    const normalized = query.toLocaleLowerCase("pt-BR").trim();
    if (!normalized) return commands;
    return commands.filter((item) => `${item.label} ${item.hint}`.toLocaleLowerCase("pt-BR").includes(normalized));
  }, [query]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button type="button" className="admin-command-trigger" onClick={() => setOpen(true)} aria-label="Abrir comandos rápidos">
        <Search size={15} /><span>Ir para…</span><kbd>Ctrl K</kbd>
      </button>
      {open && (
        <div className="admin-command-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setOpen(false); }}>
          <section className="admin-command-modal" role="dialog" aria-modal="true" aria-label="Comandos rápidos do painel">
            <div className="admin-command-search">
              <Search size={18} />
              <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar página ou ação…" />
              <kbd>ESC</kbd>
            </div>
            <div className="admin-command-list">
              {filtered.map((item) => {
                const Icon = item.icon;
                return (
                  <button type="button" key={item.href} onClick={() => go(item.href)}>
                    <span className="admin-command-icon"><Icon size={17} /></span>
                    <span><strong>{item.label}</strong><small>{item.hint}</small></span>
                    <Command size={14} />
                  </button>
                );
              })}
              {!filtered.length && <div className="admin-command-empty">Nenhum destino encontrado.</div>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
