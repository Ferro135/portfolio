import type { ReactNode } from "react";
import Link from "next/link";
import { clearAdminSession } from "@/lib/server/admin-auth";
import { redirect } from "next/navigation";
import { AdminNavigation } from "@/components/AdminNavigation";
import { AdminCommandPalette } from "@/components/AdminCommandPalette";
import { AdminSessionGuard } from "@/components/AdminSessionGuard";
import { Download, ExternalLink, LogOut } from "@/components/Icons";
import { AluneriLogo } from "@/components/AluneriLogo";
import { AdminClock } from "@/components/AdminClock";

export function AdminShell({ children }: { children: ReactNode }) {
  async function logout() {
    "use server";
    await clearAdminSession();
    redirect("/admin/login");
  }

  const environment =
    process.env.VERCEL_ENV ||
    (process.env.NODE_ENV === "production" ? "production" : "local");

  return (
    <div className="admin-app admin-v250 admin-v270">
      <AdminSessionGuard />

      <aside className="admin-sidebar admin-v250-sidebar">
        <div>
          <Link className="admin-v250-brand" href="/admin" aria-label="ALUNERI Admin">
            <AluneriLogo className="admin-brand-logo" priority />
            <span>Admin</span>
          </Link>

          <div className="admin-v250-environment">
            <i />
            <span>{environment}</span>
            <small>v2.7.0</small>
          </div>

          <AdminNavigation />
        </div>

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
        <header className="admin-topbar admin-v250-topbar">
          <div className="admin-v250-topbar-copy">
            <strong>ALUNERI Workspace</strong>
            <small>Comercial, operação, conteúdo e sistema</small>
          </div>

          <div className="admin-topbar-actions">
            <AdminClock />
            <AdminCommandPalette />
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
