import Link from "next/link";
import { listLeads } from "@/lib/server/business";

export default async function LeadsPage() {
  const leads = await listLeads();
  return <main className="admin-page"><div className="admin-page-heading"><div><span>CRM</span><h1>Leads</h1></div><strong>{leads.length} registros</strong></div>
    <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Cliente</th><th>Projeto</th><th>Status</th><th>Contato</th><th>Recebido</th><th /></tr></thead><tbody>
      {leads.map(lead => <tr key={lead.id}><td><strong>{lead.name}</strong><small>{lead.company || 'Sem empresa'}</small></td><td>{lead.project_type}</td><td><span className={`admin-status status-${lead.status}`}>{lead.status.replaceAll('_',' ')}</span></td><td>{lead.email || lead.phone || '-'}</td><td>{new Date(lead.created_at).toLocaleDateString('pt-BR')}</td><td><Link href={`/admin/leads/${lead.id}`}>Abrir</Link></td></tr>)}
      {!leads.length && <tr><td colSpan={6}>Nenhum lead ainda.</td></tr>}
    </tbody></table></div>
  </main>;
}
