import type { ReactNode } from "react";
import Link from "next/link";
import { clearAdminSession } from "@/lib/server/admin-auth";
import { redirect } from "next/navigation";
import { AdminNavigation } from "@/components/AdminNavigation";
import { AdminCommandPalette } from "@/components/AdminCommandPalette";
import { AdminSessionGuard } from "@/components/AdminSessionGuard";
import { Download, ExternalLink, Lock, LogOut } from "@/components/Icons";
import { AluneriLogo } from "@/components/AluneriLogo";

export function AdminShell({ children }: { children: ReactNode }) {
  async function logout() {
    "use server";
    await clearAdminSession();
    redirect("/admin/login");
  }

  const environment = process.env.VERCEL_ENV || (process.env.NODE_ENV === "production" ? "production" : "local");

  return (
    <div className="admin-app">
      <AdminSessionGuard />
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/admin" aria-label="ALUNERI Admin">
          <AluneriLogo className="admin-brand-logo" />
          <span>Control</span>
        </Link>

        <div className="admin-environment-badge">
          <i />
          <span>{environment}</span>
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
          <div className="admin-topbar-title">
            <Lock size={14} />
            <span>Central privada ALUNERI</span>
            <small>Sessão bloqueia após 30 min sem atividade</small>
          </div>
          <div className="admin-topbar-actions">
            <span className="admin-global-shortcut"><kbd>Ctrl/⌘</kbd><b>+</b><kbd>Alt</kbd><b>+</b><kbd>A</kbd></span>
            <AdminCommandPalette />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
