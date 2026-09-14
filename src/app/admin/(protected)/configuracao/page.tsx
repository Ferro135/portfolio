import Link from "next/link";
import { adminAuthConfigured } from "@/lib/server/admin-auth";
import { checkSupabaseHealth, supabaseConfigured } from "@/lib/server/supabase";
import { siteUrl } from "@/lib/site";
import { Check, Database, ExternalLink, Lock, Mail, Settings } from "@/components/Icons";

function StatusRow({ label, detail, ok }: { label: string; detail: string; ok: boolean }) {
  return (
    <div className="admin-config-row">
      <span className={ok ? "ok" : "warn"}>{ok ? <Check size={15} /> : "!"}</span>
      <div><strong>{label}</strong><small>{detail}</small></div>
      <b>{ok ? "Ativo" : "Pendente"}</b>
    </div>
  );
}

export default async function AdminConfigurationPage() {
  const database = await checkSupabaseHealth();
  const emailConfigured = Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
  const notifyConfigured = Boolean(process.env.LEAD_NOTIFY_EMAIL);
  const rateLimitConfigured = Boolean(process.env.RATE_LIMIT_SALT || process.env.ADMIN_SESSION_SECRET);
  const customSiteUrl = Boolean(process.env.NEXT_PUBLIC_SITE_URL);
  const environment = process.env.VERCEL_ENV || (process.env.NODE_ENV === "production" ? "production" : "local");

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div><span>Sistema</span><h1>Configuração</h1><p>Diagnóstico seguro das integrações. Nenhum segredo é exibido nesta página.</p></div>
        <div className="admin-heading-count"><Settings size={16} /><strong>{environment}</strong><span>ambiente atual</span></div>
      </div>

      <div className="admin-two-column admin-config-columns">
        <section className="admin-panel admin-panel-flush">
          <div className="admin-panel-heading"><div><span>Segurança</span><h2>Acesso administrativo</h2></div><Lock size={18} /></div>
          <div className="admin-config-list">
            <StatusRow label="Autenticação do admin" detail="Hash scrypt + sessão HttpOnly assinada" ok={adminAuthConfigured()} />
            <StatusRow label="Rate limit" detail="Proteção de login e formulários" ok={rateLimitConfigured} />
            <StatusRow label="Bloqueio por inatividade" detail="30 minutos no painel administrativo" ok />
          </div>
        </section>

        <section className="admin-panel admin-panel-flush">
          <div className="admin-panel-heading"><div><span>Dados</span><h2>Supabase</h2></div><Database size={18} /></div>
          <div className="admin-config-list">
            <StatusRow
              label="Banco persistente"
              detail={database.reachable ? "Leads, propostas, CMS, agenda e erros" : database.detail}
              ok={database.reachable}
            />
            <StatusRow
              label="Credencial Supabase"
              detail={supabaseConfigured() ? "Variável privada encontrada no servidor" : "SUPABASE_SECRET_KEY / SERVICE_ROLE ausente"}
              ok={supabaseConfigured()}
            />
            <StatusRow
              label="Storage de mídia"
              detail={database.reachable ? "Bucket ALUNERI disponível via backend" : "Depende da conexão com o banco"}
              ok={database.reachable}
            />
          </div>
          <p className="admin-config-help">Se estiver pendente, execute <code>supabase/schema.sql</code> e <code>supabase/storage.sql</code> e configure as variáveis privadas na Vercel.</p>
        </section>

        <section className="admin-panel admin-panel-flush">
          <div className="admin-panel-heading"><div><span>Comunicação</span><h2>Email</h2></div><Mail size={18} /></div>
          <div className="admin-config-list">
            <StatusRow label="Resend" detail="Envio de emails transacionais" ok={emailConfigured} />
            <StatusRow label="Notificação de novos leads" detail="Endereço interno de destino" ok={notifyConfigured} />
          </div>
        </section>

        <section className="admin-panel admin-panel-flush">
          <div className="admin-panel-heading"><div><span>Produção</span><h2>Site e domínio</h2></div><ExternalLink size={18} /></div>
          <div className="admin-config-list">
            <StatusRow label="URL canônica manual" detail={customSiteUrl ? siteUrl : `Fallback atual: ${siteUrl}`} ok={customSiteUrl} />
          </div>
          <div className="admin-config-actions">
            <Link href="/" target="_blank">Abrir site público <ExternalLink size={13} /></Link>
            <a href="/api/admin/export">Baixar backup JSON</a>
          </div>
        </section>
      </div>

      <section className="admin-panel admin-security-notes">
        <span className="eyebrow">Boas práticas</span>
        <h2>O que nunca deve aparecer no navegador.</h2>
        <div className="admin-security-grid">
          <div><strong>SUPABASE_SERVICE_ROLE_KEY / SUPABASE_SECRET_KEY</strong><p>Somente no ambiente server-side da Vercel.</p></div>
          <div><strong>RESEND_API_KEY</strong><p>Nunca use prefixo NEXT_PUBLIC_.</p></div>
          <div><strong>ADMIN_SESSION_SECRET</strong><p>Mantenha aleatório, longo e fora do GitHub.</p></div>
          <div><strong>Senhas</strong><p>O painel armazena hash scrypt, não a senha em texto puro.</p></div>
        </div>
      </section>
    </main>
  );
}
