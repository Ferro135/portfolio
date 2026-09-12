import Link from "next/link";
import { listLeads } from "@/lib/server/business";
import { adminStatusLabel, formatAdminDate, leadStatusOptions } from "@/lib/admin-ui";
import { Search, Users } from "@/components/Icons";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const leads = await listLeads();
  const q = (params.q || "").trim().toLocaleLowerCase("pt-BR");
  const status = params.status || "";

  const filtered = leads.filter((lead) => {
    const haystack = `${lead.name} ${lead.company || ""} ${lead.email || ""} ${lead.phone || ""} ${lead.project_type}`.toLocaleLowerCase("pt-BR");
    return (!q || haystack.includes(q)) && (!status || lead.status === status);
  });

  const counts = Object.fromEntries(
    leadStatusOptions.map((item) => [item, leads.filter((lead) => lead.status === item).length]),
  );

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div>
          <span>CRM</span>
          <h1>Leads</h1>
          <p>Busque contatos, acompanhe o estágio comercial e abra o briefing completo.</p>
        </div>
        <div className="admin-heading-count"><Users size={16} /><strong>{leads.length}</strong><span>registros</span></div>
      </div>

      <section className="admin-mini-stats">
        {leadStatusOptions.slice(0, 6).map((item) => (
          <Link href={`/admin/leads?status=${item}`} key={item} className={status === item ? "active" : ""}>
            <span>{adminStatusLabel(item)}</span>
            <strong>{counts[item] || 0}</strong>
          </Link>
        ))}
      </section>

      <form className="admin-filterbar" method="get">
        <label className="admin-search-field">
          <Search size={15} />
          <input name="q" defaultValue={params.q || ""} placeholder="Buscar por nome, empresa, email, telefone ou tipo…" />
        </label>
        <select name="status" defaultValue={status} aria-label="Filtrar por status">
          <option value="">Todos os status</option>
          {leadStatusOptions.map((item) => <option value={item} key={item}>{adminStatusLabel(item)}</option>)}
        </select>
        <button type="submit">Filtrar</button>
        {(q || status) && <Link href="/admin/leads">Limpar</Link>}
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Cliente</th><th>Projeto</th><th>Status</th><th>Contato</th><th>Recebido</th><th /></tr></thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id}>
                <td><strong>{lead.name}</strong><small>{lead.company || "Sem empresa"}</small></td>
                <td>{lead.project_type}</td>
                <td><span className={`admin-status status-${lead.status}`}>{adminStatusLabel(lead.status)}</span></td>
                <td>{lead.email || lead.phone || "—"}</td>
                <td>{formatAdminDate(lead.created_at)}</td>
                <td><Link className="admin-table-action" href={`/admin/leads/${lead.id}`}>Abrir →</Link></td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={6}><div className="admin-empty">Nenhum lead encontrado com esses filtros.</div></td></tr>}
          </tbody>
        </table>
      </div>
      <p className="admin-list-summary">Mostrando {filtered.length} de {leads.length} lead(s).</p>
    </main>
  );
}
