import Link from "next/link";
import { listAppointments, listCmsProjects, listErrors, listLeads, listProposals, listTestimonials } from "@/lib/server/business";
import { supabaseConfigured } from "@/lib/server/supabase";

export default async function AdminDashboard() {
  const [leads, proposals, projects, testimonials, appointments, errors] = await Promise.all([
    listLeads(), listProposals(), listCmsProjects(true), listTestimonials(true), listAppointments(), listErrors(),
  ]);
  const cards = [
    ["Leads", leads.length, "/admin/leads"],
    ["Propostas", proposals.length, "/admin/propostas"],
    ["Projetos CMS", projects.length, "/admin/projetos"],
    ["Depoimentos", testimonials.length, "/admin/depoimentos"],
    ["Agendamentos", appointments.length, "/admin/agendamentos"],
    ["Erros recentes", errors.length, "/admin/erros"],
  ] as const;
  return (
    <main className="admin-page">
      <div className="admin-page-heading"><div><span>Operação</span><h1>Visão geral</h1></div><small>{supabaseConfigured() ? "Banco conectado" : "Modo demonstração — Supabase não configurado"}</small></div>
      {!supabaseConfigured() && <div className="admin-alert">Execute <code>supabase/schema.sql</code> e configure SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY para ativar persistência.</div>}
      <div className="admin-stat-grid">{cards.map(([label, value, href]) => <Link href={href} key={label}><span>{label}</span><strong>{value}</strong></Link>)}</div>
      <section className="admin-panel"><h2>Pipeline comercial</h2><div className="admin-pipeline">
        {['new','contacted','proposal_sent','approved','in_progress','completed'].map(status => <div key={status}><strong>{leads.filter(l=>l.status===status).length}</strong><span>{status.replaceAll('_',' ')}</span></div>)}
      </div></section>
    </main>
  );
}
