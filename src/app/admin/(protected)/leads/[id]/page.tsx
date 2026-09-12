import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createProposal, getLead, markLeadProposalSent } from "@/lib/server/business";
import { updateRow } from "@/lib/server/supabase";

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();

  async function updateLead(formData: FormData) {
    "use server";
    const status = String(formData.get("status") || "new");
    const notes = String(formData.get("notes") || "").slice(0, 5000);
    await updateRow("leads", id, { status, notes, updated_at: new Date().toISOString() });
    revalidatePath(`/admin/leads/${id}`); revalidatePath('/admin/leads'); revalidatePath('/admin');
  }

  async function generateProposal(formData: FormData) {
    "use server";
    const price = Number(String(formData.get("price") || "0").replace(',', '.'));
    const deliverables = String(formData.get("deliverables") || "").split('\n').map(v=>v.trim()).filter(Boolean).slice(0,30);
    const proposal = await createProposal({
      lead_id: id,
      title: String(formData.get("title") || `Proposta — ${lead.project_type}`).slice(0,160),
      client_name: lead.name,
      company: lead.company || null,
      scope: String(formData.get("scope") || lead.details || lead.project_type).slice(0,8000),
      deliverables,
      price_cents: Number.isFinite(price) && price > 0 ? Math.round(price * 100) : null,
      currency: "BRL",
      deadline: String(formData.get("deadline") || "").slice(0,160) || null,
      valid_until: String(formData.get("valid_until") || "") || null,
      terms: String(formData.get("terms") || "").slice(0,8000) || null,
      status: "sent",
    });
    await markLeadProposalSent(id);
    redirect(`/admin/propostas/${proposal.id}`);
  }

  return <main className="admin-page"><Link className="admin-back" href="/admin/leads">← Leads</Link><div className="admin-page-heading"><div><span>Lead</span><h1>{lead.name}</h1></div><span className={`admin-status status-${lead.status}`}>{lead.status.replaceAll('_',' ')}</span></div>
    <div className="admin-two-column">
      <section className="admin-panel"><h2>Briefing</h2><dl className="admin-details"><dt>Empresa</dt><dd>{lead.company || '-'}</dd><dt>Email</dt><dd>{lead.email || '-'}</dd><dt>Telefone</dt><dd>{lead.phone || '-'}</dd><dt>Tipo</dt><dd>{lead.project_type}</dd><dt>Recursos</dt><dd>{lead.features.join(', ') || '-'}</dd><dt>Orçamento</dt><dd>{lead.budget || '-'}</dd><dt>Prazo</dt><dd>{lead.timeline || '-'}</dd><dt>Contexto</dt><dd>{lead.details || '-'}</dd></dl></section>
      <section className="admin-panel"><h2>CRM</h2><form className="admin-form" action={updateLead}><label>Status<select name="status" defaultValue={lead.status}>{['new','contacted','proposal_sent','approved','in_progress','completed','archived'].map(s=><option value={s} key={s}>{s.replaceAll('_',' ')}</option>)}</select></label><label>Notas<textarea name="notes" defaultValue={lead.notes || ''} rows={9} /></label><button className="button button-primary">Salvar CRM</button></form></section>
    </div>
    <section className="admin-panel"><h2>Gerar proposta</h2><form className="admin-form admin-form-grid" action={generateProposal}><label>Título<input name="title" defaultValue={`Proposta — ${lead.project_type}`} /></label><label>Valor (R$)<input name="price" inputMode="decimal" placeholder="5000.00" /></label><label>Prazo de entrega<input name="deadline" placeholder="Ex.: 6 a 8 semanas" /></label><label>Validade<input type="date" name="valid_until" /></label><label className="admin-span-2">Escopo<textarea name="scope" defaultValue={lead.details || ''} rows={5} /></label><label className="admin-span-2">Entregáveis (um por linha)<textarea name="deliverables" defaultValue={lead.features.join('\n')} rows={6} /></label><label className="admin-span-2">Termos<textarea name="terms" rows={5} placeholder="Pagamento, revisões, condições..." /></label><button className="button button-primary admin-span-2">Criar proposta compartilhável</button></form></section>
  </main>;
}
