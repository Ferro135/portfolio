import type { ReactNode } from "react";
import Link from "next/link";
import { clearAdminSession } from "@/lib/server/admin-auth";
import { redirect } from "next/navigation";
import { AdminNavigation } from "@/components/AdminNavigation";
import { AdminCommandPalette } from "@/components/AdminCommandPalette";
import { AdminSessionGuard } from "@/components/AdminSessionGuard";
import { Download, ExternalLink, Lock, LogOut } from "@/components/Icons";
import { AluneriLogo } from "@/components/AluneriLogo";
import { AdminClock } from "@/components/AdminClock";

export function AdminShell({ children }: { children: ReactNode }) {
  async function logout() {
    "use server";
    await clearAdminSession();
    redirect("/admin/login");
  }

  const environment = process.env.VERCEL_ENV || (process.env.NODE_ENV === "production" ? "production" : "local");

  return (
    <div className="admin-app admin-v241">
      <AdminSessionGuard />
      <aside className="admin-sidebar">
        <Link className="admin-brand admin-v241-brand" href="/admin" aria-label="ALUNERI Admin">
          <AluneriLogo className="admin-brand-logo" priority />
          <div className="admin-v241-brand-copy"><span>Control Center</span><small>Workspace privado</small></div>
        </Link>

        <div className="admin-environment-badge">
          <i />
          <span>{environment}</span>
          <small>v2.4.1</small>
        </div>

        <AdminNavigation />

        <div className="admin-sidebar-footer">
          <a href="/api/admin/export">
            <Download size={15} />
            <span>Exportar backup</span>
          </a>
          <Link href="/" target="_blank">
            <ExternalLink size={15} />
            <span>Abrir site</span>
          </Link>
          <form action={logout}>
            <button type="submit">
              <LogOut size={15} />
              <span>Sair</span>
            </button>
          </form>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-title admin-v241-topbar-title">
            <span className="admin-v241-lock"><Lock size={13} /></span>
            <div><span>Central privada ALUNERI</span><small>Operação, comercial e conteúdo</small></div>
          </div>
          <div className="admin-topbar-actions">
            <AdminClock />
            <span className="admin-global-shortcut"><kbd>Ctrl/⌘</kbd><b>+</b><kbd>Alt</kbd><b>+</b><kbd>A</kbd></span>
            <AdminCommandPalette />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
