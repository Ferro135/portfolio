import Link from "next/link";
import { deleteLead, listLeads } from "@/lib/server/business";
import { adminStatusLabel, formatAdminDate, leadStatusOptions } from "@/lib/admin-ui";
import { Search, Trash, Users } from "@/components/Icons";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { requireAdmin } from "@/lib/server/admin-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; deleted?: string }>;
}) {
  const params = await searchParams;
  const leads = await listLeads();
  const q = (params.q || "").trim().toLocaleLowerCase("pt-BR");
  const status = params.status || "";

  const filtered = leads.filter((lead) => {
    const haystack = `${lead.name} ${lead.company || ""} ${lead.email || ""} ${lead.phone || ""} ${lead.project_type}`.toLocaleLowerCase("pt-BR");
    return (!q || haystack.includes(q)) && (!status || lead.status === status);
  });

  async function deleteLeadAction(formData: FormData) {
    "use server";
    await requireAdmin();

    const id = String(formData.get("id") || "");
    if (!/^[0-9a-f-]{36}$/i.test(id)) return;

    await deleteLead(id);
    revalidatePath("/admin/leads");
    revalidatePath("/admin/propostas");
    revalidatePath("/admin");
    redirect("/admin/leads?deleted=1");
  }

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

      {params.deleted === "1" && (
        <div className="admin-success-banner" role="status">
          Lead removido permanentemente do CRM.
        </div>
      )}

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
                <td>
                  <div className="admin-table-actions">
                    <Link className="admin-table-action" href={`/admin/leads/${lead.id}`}>Abrir →</Link>
                    <form action={deleteLeadAction}>
                      <input type="hidden" name="id" value={lead.id} />
                      <ConfirmSubmitButton
                        className="admin-delete-icon"
                        message={`Excluir permanentemente ${lead.name}? As notas e o acompanhamento CRM serão apagados. Propostas já geradas serão preservadas.`}
                        aria-label={`Excluir lead ${lead.name}`}
                        title="Excluir lead"
                      >
                        <Trash size={15} />
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
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
