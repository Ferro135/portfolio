import Link from "next/link";
import { listProposals } from "@/lib/server/business";
import { adminStatusLabel, formatAdminCurrency, formatAdminDate, proposalStatusOptions } from "@/lib/admin-ui";
import { FileText, Search } from "@/components/Icons";

export default async function ProposalsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const params = await searchParams;
  const items = await listProposals();
  const q = (params.q || "").trim().toLocaleLowerCase("pt-BR");
  const status = params.status || "";
  const filtered = items.filter((proposal) => {
    const haystack = `${proposal.title} ${proposal.client_name} ${proposal.company || ""}`.toLocaleLowerCase("pt-BR");
    return (!q || haystack.includes(q)) && (!status || proposal.status === status);
  });
  const sentValue = items.filter((item) => ["sent", "accepted"].includes(item.status)).reduce((sum, item) => sum + (item.price_cents || 0), 0);
  const acceptedValue = items.filter((item) => item.status === "accepted").reduce((sum, item) => sum + (item.price_cents || 0), 0);

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div><span>Comercial</span><h1>Propostas</h1><p>Acompanhe propostas enviadas, aceitas, recusadas e seus links compartilháveis.</p></div>
        <div className="admin-heading-count"><FileText size={16} /><strong>{items.length}</strong><span>propostas</span></div>
      </div>

      <section className="admin-kpi-grid compact">
        <article><span>Abertas</span><strong>{items.filter((item) => ["draft", "sent"].includes(item.status)).length}</strong><small>Rascunhos + enviadas</small></article>
        <article><span>Aceitas</span><strong>{items.filter((item) => item.status === "accepted").length}</strong><small>Propostas aprovadas</small></article>
        <article><span>Valor enviado</span><strong className="admin-kpi-money">{formatAdminCurrency(sentValue)}</strong><small>Enviadas + aceitas</small></article>
        <article><span>Valor aceito</span><strong className="admin-kpi-money">{formatAdminCurrency(acceptedValue)}</strong><small>Somente aceitas</small></article>
      </section>

      <form className="admin-filterbar" method="get">
        <label className="admin-search-field"><Search size={15} /><input name="q" defaultValue={params.q || ""} placeholder="Buscar cliente, empresa ou proposta…" /></label>
        <select name="status" defaultValue={status}><option value="">Todos os status</option>{proposalStatusOptions.map((item) => <option value={item} key={item}>{adminStatusLabel(item)}</option>)}</select>
        <button type="submit">Filtrar</button>
        {(q || status) && <Link href="/admin/propostas">Limpar</Link>}
      </form>

      <div className="admin-card-list">
        {filtered.map((proposal) => (
          <Link className="admin-list-card admin-proposal-card" href={`/admin/propostas/${proposal.id}`} key={proposal.id}>
            <div>
              <span className={`admin-status status-${proposal.status}`}>{adminStatusLabel(proposal.status)}</span>
              <strong>{proposal.title}</strong>
              <span>{proposal.client_name}{proposal.company ? ` · ${proposal.company}` : ""}</span>
              <small>Criada em {formatAdminDate(proposal.created_at)}</small>
            </div>
            <div className="admin-proposal-value"><b>{formatAdminCurrency(proposal.price_cents, proposal.currency)}</b><small>{proposal.valid_until ? `Válida até ${formatAdminDate(proposal.valid_until)}` : "Sem validade definida"}</small></div>
          </Link>
        ))}
        {!filtered.length && <div className="admin-empty">Nenhuma proposta encontrada.</div>}
      </div>
      <div className="admin-page-footnote">Novas propostas são criadas a partir de um lead. <Link href="/admin/leads">Abrir CRM →</Link></div>
    </main>
  );
}
