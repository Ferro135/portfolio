import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getRow, updateRow } from "@/lib/server/supabase";
import type { Proposal } from "@/lib/server/business";
import { siteUrl } from "@/lib/site";
import { adminStatusLabel, formatAdminCurrency, formatAdminDate, proposalStatusOptions } from "@/lib/admin-ui";
import { CopyTextButton } from "@/components/CopyTextButton";
import { ExternalLink } from "@/components/Icons";

export default async function ProposalDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const proposal = await getRow<Proposal>("proposals", id);
  if (!proposal) notFound();

  async function update(formData: FormData) {
    "use server";
    await updateRow("proposals", id, {
      status: String(formData.get("status") || "draft"),
      terms: String(formData.get("terms") || "").slice(0, 8000),
      updated_at: new Date().toISOString(),
    });
    revalidatePath(`/admin/propostas/${id}`);
    revalidatePath("/admin/propostas");
    revalidatePath("/admin");
  }

  const publicUrl = `${siteUrl}/proposta/${proposal.token}`;

  return (
    <main className="admin-page">
      <Link className="admin-back" href="/admin/propostas">← Propostas</Link>
      <div className="admin-page-heading">
        <div><span>Proposta</span><h1>{proposal.title}</h1><p>{proposal.client_name}{proposal.company ? ` · ${proposal.company}` : ""}</p></div>
        <span className={`admin-status status-${proposal.status}`}>{adminStatusLabel(proposal.status)}</span>
      </div>

      <section className="admin-proposal-sharebar">
        <div><span>Link compartilhável</span><strong>{publicUrl}</strong></div>
        <div><CopyTextButton value={publicUrl} label="Copiar link" /><a href={publicUrl} target="_blank" rel="noreferrer">Abrir <ExternalLink size={14} /></a></div>
      </section>

      <div className="admin-two-column">
        <section className="admin-panel admin-panel-flush">
          <div className="admin-panel-heading"><div><span>Comercial</span><h2>Resumo</h2></div></div>
          <dl className="admin-details">
            <dt>Cliente</dt><dd>{proposal.client_name}</dd>
            <dt>Empresa</dt><dd>{proposal.company || "—"}</dd>
            <dt>Valor</dt><dd><strong>{formatAdminCurrency(proposal.price_cents, proposal.currency)}</strong></dd>
            <dt>Prazo</dt><dd>{proposal.deadline || "—"}</dd>
            <dt>Validade</dt><dd>{proposal.valid_until ? formatAdminDate(proposal.valid_until) : "—"}</dd>
            <dt>Criada</dt><dd>{formatAdminDate(proposal.created_at, true)}</dd>
            <dt>Atualizada</dt><dd>{formatAdminDate(proposal.updated_at, true)}</dd>
          </dl>
        </section>

        <section className="admin-panel admin-panel-flush">
          <div className="admin-panel-heading"><div><span>Controle</span><h2>Status e termos</h2></div></div>
          <form className="admin-form" action={update}>
            <label>Status<select name="status" defaultValue={proposal.status}>{proposalStatusOptions.map((status) => <option value={status} key={status}>{adminStatusLabel(status)}</option>)}</select></label>
            <label>Termos<textarea name="terms" defaultValue={proposal.terms || ""} rows={10} /></label>
            <button className="button button-primary">Salvar alterações</button>
          </form>
        </section>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading"><div><span>Escopo</span><h2>O que está sendo proposto</h2></div></div>
        <p className="admin-pre">{proposal.scope}</p>
        <h3>Entregáveis</h3>
        <ul className="admin-deliverable-list">{proposal.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
    </main>
  );
}
