import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Command, Lock } from "@/components/Icons";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { adminAuthConfigured, setAdminSession, verifyAdminPassword } from "@/lib/server/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; setup?: string; idle?: string }>;
}) {
  const params = await searchParams;

  async function login(formData: FormData) {
    "use server";
    if (!adminAuthConfigured()) redirect("/admin/login?setup=1");

    const password = String(formData.get("password") || "");
    const requestHeaders = await headers();
    const rateRequest = new Request("https://aluneri.local/admin-login", { headers: requestHeaders });
    const limited = await checkRateLimit(rateRequest, "admin_login", 8, 15 * 60 * 1000);

    if (!limited.allowed) redirect("/admin/login?error=rate");
    if (!verifyAdminPassword(password)) redirect("/admin/login?error=1");

    await setAdminSession();
    redirect("/admin");
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-wrap">
        <div className="admin-login-intro">
          <span className="admin-login-lock"><Lock size={18} /></span>
          <span className="eyebrow">Acesso privado</span>
          <h1>Central administrativa<br />da ALUNERI.</h1>
          <p>CRM, propostas, conteúdo, agendamentos e observabilidade em um único ambiente.</p>
          <div className="admin-login-security-list">
            <span><i /> Cookie HttpOnly assinado</span>
            <span><i /> Limite de tentativas</span>
            <span><i /> Bloqueio automático por inatividade</span>
          </div>
        </div>

        <form className="admin-login-card" action={login}>
          <div className="admin-login-card-heading">
            <span>ALUNERI CONTROL</span>
            <h2>Entrar no painel</h2>
            <p>Use a senha administrativa configurada na Vercel.</p>
          </div>

          {params.setup && (
            <div className="admin-alert">
              Configure <code>ADMIN_PASSWORD_HASH</code> e <code>ADMIN_SESSION_SECRET</code> na Vercel antes de usar o painel.
            </div>
          )}
          {params.error === "1" && <div className="admin-alert danger">Senha inválida.</div>}
          {params.error === "rate" && <div className="admin-alert danger">Muitas tentativas. Aguarde alguns minutos.</div>}
          {params.idle && <div className="admin-alert">A sessão foi bloqueada após 30 minutos sem atividade.</div>}

          <label>
            <span>Senha administrativa</span>
            <input type="password" name="password" autoComplete="current-password" required autoFocus />
          </label>

          <button className="button button-primary" type="submit">Entrar com segurança</button>

          <div className="admin-login-shortcut">
            <Command size={14} />
            <span>Atalho global:</span>
            <kbd>Ctrl/⌘ + Alt + A</kbd>
          </div>

          <a href="/">← Voltar ao site público</a>
        </form>
      </section>
    </main>
  );
}
