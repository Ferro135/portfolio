import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { adminAuthConfigured, setAdminSession, verifyAdminPassword } from "@/lib/server/admin-auth";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string; setup?: string }> }) {
  const params = await searchParams;
  async function login(formData: FormData) {
    "use server";
    if (!adminAuthConfigured()) redirect("/admin/login?setup=1");
    const password = String(formData.get("password") || "");
    const requestHeaders = await headers();
    const rateRequest = new Request("https://nexora.local/admin-login", { headers: requestHeaders });
    const limited = await checkRateLimit(rateRequest, "admin_login", 8, 15 * 60 * 1000);
    if (!limited.allowed) redirect("/admin/login?error=rate");
    if (!verifyAdminPassword(password)) redirect("/admin/login?error=1");
    await setAdminSession();
    redirect("/admin");
  }

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" action={login}>
        <span>NEXORA</span>
        <h1>Painel administrativo</h1>
        <p>Área privada para leads, propostas, projetos, depoimentos e operação comercial.</p>
        {params.setup && <div className="admin-alert">Configure ADMIN_PASSWORD_HASH e ADMIN_SESSION_SECRET na Vercel antes de usar o painel.</div>}
        {params.error === "1" && <div className="admin-alert danger">Senha inválida.</div>}
        {params.error === "rate" && <div className="admin-alert danger">Muitas tentativas. Aguarde alguns minutos.</div>}
        <label><span>Senha</span><input type="password" name="password" autoComplete="current-password" required /></label>
        <button className="button button-primary" type="submit">Entrar</button>
        <a href="/">Voltar ao site</a>
      </form>
    </main>
  );
}
