import type { ReactNode } from "react";
import Link from "next/link";
import { clearAdminSession } from "@/lib/server/admin-auth";
import { redirect } from "next/navigation";

const links = [
  ["/admin", "Visão geral"],
  ["/admin/leads", "Leads"],
  ["/admin/propostas", "Propostas"],
  ["/admin/projetos", "Projetos"],
  ["/admin/depoimentos", "Depoimentos"],
  ["/admin/agendamentos", "Agendamentos"],
  ["/admin/erros", "Erros"],
];

export function AdminShell({ children }: { children: ReactNode }) {
  async function logout() {
    "use server";
    await clearAdminSession();
    redirect("/admin/login");
  }

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/admin">NEXORA <span>Admin</span></Link>
        <nav>{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        <div className="admin-sidebar-footer">
          <a href="/api/admin/export">Exportar backup JSON</a>
          <Link href="/" target="_blank">Abrir site</Link>
          <form action={logout}><button type="submit">Sair</button></form>
        </div>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
