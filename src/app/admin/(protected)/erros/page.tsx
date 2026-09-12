import Link from "next/link";
import { listErrors } from "@/lib/server/business";
import { formatAdminDate, isWithinHours } from "@/lib/admin-ui";
import { AlertTriangle, Search } from "@/components/Icons";

export default async function ErrorsAdmin({ searchParams }: { searchParams: Promise<{ q?: string; period?: string }> }) {
  const params = await searchParams;
  const items = await listErrors();
  const q = (params.q || "").trim().toLocaleLowerCase("pt-BR");
  const period = params.period || "all";
  const filtered = items.filter((item) => {
    const haystack = `${item.message} ${item.path || ""} ${item.stack || ""}`.toLocaleLowerCase("pt-BR");
    const within = period === "24h" ? isWithinHours(item.created_at, 24) : period === "7d" ? isWithinHours(item.created_at, 168) : true;
    return (!q || haystack.includes(q)) && within;
  });
  const errors24h = items.filter((item) => isWithinHours(item.created_at, 24)).length;

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div><span>Observabilidade</span><h1>Erros do navegador</h1><p>Eventos capturados no cliente para identificar páginas e fluxos que precisam de atenção.</p></div>
        <div className={`admin-heading-count ${errors24h ? "danger" : "success"}`}><AlertTriangle size={16} /><strong>{errors24h}</strong><span>nas últimas 24h</span></div>
      </div>

      <form className="admin-filterbar" method="get">
        <label className="admin-search-field"><Search size={15} /><input name="q" defaultValue={params.q || ""} placeholder="Buscar mensagem, rota ou stack…" /></label>
        <select name="period" defaultValue={period}><option value="all">Todo o histórico</option><option value="24h">Últimas 24h</option><option value="7d">Últimos 7 dias</option></select>
        <button type="submit">Filtrar</button>
        {(q || period !== "all") && <Link href="/admin/erros">Limpar</Link>}
      </form>

      <div className="admin-card-list">
        {filtered.map((item) => (
          <article className="admin-error-card" key={item.id}>
            <div className="admin-error-heading">
              <span className="admin-error-icon"><AlertTriangle size={15} /></span>
              <div><strong>{item.message}</strong><span>{item.path || "Rota desconhecida"} · {formatAdminDate(item.created_at, true)}</span></div>
            </div>
            {item.stack && <details><summary>Ver stack trace</summary><pre>{item.stack}</pre></details>}
          </article>
        ))}
        {!filtered.length && <div className="admin-empty">Nenhum erro encontrado para esse filtro.</div>}
      </div>
      <p className="admin-list-summary">{filtered.length} evento(s) exibido(s). Erros do servidor também podem ser acompanhados nos Runtime Logs da Vercel.</p>
    </main>
  );
}
