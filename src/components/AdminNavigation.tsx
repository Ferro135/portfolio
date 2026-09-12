"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, Calendar, FileText, Folder, Grid, MessageSquare, Settings, Users } from "@/components/Icons";

const groups = [
  {
    label: "Operação",
    links: [
      { href: "/admin", label: "Visão geral", icon: Grid, exact: true },
      { href: "/admin/leads", label: "Leads", icon: Users },
      { href: "/admin/propostas", label: "Propostas", icon: FileText },
      { href: "/admin/agendamentos", label: "Agendamentos", icon: Calendar },
    ],
  },
  {
    label: "Conteúdo",
    links: [
      { href: "/admin/projetos", label: "Projetos", icon: Folder },
      { href: "/admin/depoimentos", label: "Depoimentos", icon: MessageSquare },
    ],
  },
  {
    label: "Sistema",
    links: [
      { href: "/admin/erros", label: "Erros", icon: AlertTriangle },
      { href: "/admin/configuracao", label: "Configuração", icon: Settings },
    ],
  },
] as const;

export function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label="Navegação administrativa">
      {groups.map((group) => (
        <div className="admin-nav-group" key={group.label}>
          <span className="admin-nav-group-label">{group.label}</span>
          {group.links.map((item) => {
            const Icon = item.icon;
            const exact = "exact" in item && item.exact;
            const active = exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
