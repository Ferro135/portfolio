import Link from "next/link";
import {
  listAppointments,
  listCmsProjects,
  listErrors,
  listLeads,
  listProposals,
  listTestimonials,
} from "@/lib/server/business";
import { checkSupabaseHealth, supabaseConfigured } from "@/lib/server/supabase";
import {
  adminStatusLabel,
  ageInDays,
  formatAdminCurrency,
  formatAdminDate,
  isWithinHours,
} from "@/lib/admin-ui";
import { AlertTriangle, ArrowRight, Calendar, Check, FileText, Folder, Users } from "@/components/Icons";

export default async function AdminDashboard() {
  const [leads, proposals, projects, testimonials, appointments, errors, database] = await Promise.all([
    listLeads(),
    listProposals(),
    listCmsProjects(true),
    listTestimonials(true),
    listAppointments(),
    listErrors(),
    checkSupabaseHealth(),
  ]);

  const newLeads = leads.filter((lead) => lead.status === "new");
  const staleLeads = newLeads.filter((lead) => ageInDays(lead.created_at) >= 2);
  const activeLeads = leads.filter((lead) => !["completed", "archived"].includes(lead.status));
  const openProposals = proposals.filter((proposal) => ["draft", "sent"].includes(proposal.status));
  const acceptedValue = proposals
    .filter((proposal) => proposal.status === "accepted")
    .reduce((sum, proposal) => sum + (proposal.price_cents || 0), 0);
  const pendingAppointments = appointments.filter((appointment) => appointment.status === "requested");
  const recentErrors = errors.filter((error) => isWithinHours(error.created_at, 24));
  const publishedProjects = projects.filter((project) => project.published).length;
  const publishedTestimonials = testimonials.filter((testimonial) => testimonial.published).length;

  const attention = [
    {
      label: "Leads novos",
      value: newLeads.length,
      detail: staleLeads.length ? `${staleLeads.length} aguardando há 2+ dias` : "Nenhum atrasado",
      href: "/admin/leads?status=new",
      icon: Users,
      tone: staleLeads.length ? "warning" : "default",
    },
    {
      label: "Reuniões pendentes",
      value: pendingAppointments.length,
      detail: "Solicitações aguardando confirmação",
      href: "/admin/agendamentos?status=requested",
      icon: Calendar,
      tone: pendingAppointments.length ? "warning" : "default",
    },
    {
      label: "Propostas abertas",
      value: openProposals.length,
      detail: "Rascunhos e propostas enviadas",
      href: "/admin/propostas",
      icon: FileText,
      tone: "default",
    },
    {
      label: "Erros em 24h",
      value: recentErrors.length,
      detail: recentErrors.length ? "Revisar observabilidade" : "Nenhum erro recente",
      href: "/admin/erros",
      icon: AlertTriangle,
      tone: recentErrors.length ? "danger" : "success",
    },
  ] as const;

  const pipeline = ["new", "contacted", "proposal_sent", "approved", "in_progress", "completed"];

  return (
    <main className="admin-page admin-dashboard-page">
      <section className="admin-v241-dashboard-hero">
        <div className="admin-page-heading admin-dashboard-heading">
          <div>
            <span>Control Center</span>
            <h1>Visão geral</h1>
            <p>Prioridades comerciais, conteúdo e saúde do sistema em uma única leitura.</p>
          </div>
          <div className={`admin-database-pill ${database.reachable ? "connected" : "offline"}`} title={database.detail}>
            <i />
            {database.reachable ? "Banco online" : supabaseConfigured() ? "Banco indisponível" : "Modo demonstração"}
          </div>
        </div>
        <div className="admin-v241-quick-actions">
          <Link href="/admin/leads"><Users size={15} /><span><small>CRM</small><strong>Ver leads</strong></span><ArrowRight size={14} /></Link>
          <Link href="/admin/propostas"><FileText size={15} /><span><small>Comercial</small><strong>Propostas</strong></span><ArrowRight size={14} /></Link>
          <Link href="/admin/agendamentos"><Calendar size={15} /><span><small>Agenda</small><strong>Reuniões</strong></span><ArrowRight size={14} /></Link>
        </div>
      </section>

      {!supabaseConfigured() && (
        <div className="admin-alert">
          Execute <code>supabase/schema.sql</code> e configure <code>SUPABASE_URL</code> + <code>SUPABASE_SERVICE_ROLE_KEY / SUPABASE_SECRET_KEY</code> para ativar persistência.
        </div>
      )}

      <section className="admin-kpi-grid" aria-label="Indicadores principais">
        <article>
          <div className="admin-v241-kpi-icon"><Users size={16} /></div>
          <span>Leads ativos</span>
          <strong>{activeLeads.length}</strong>
          <small>{newLeads.length} novos</small>
        </article>
        <article>
          <div className="admin-v241-kpi-icon"><FileText size={16} /></div>
          <span>Propostas abertas</span>
          <strong>{openProposals.length}</strong>
          <small>{proposals.length} no histórico</small>
        </article>
        <article>
          <div className="admin-v241-kpi-icon"><Check size={16} /></div>
          <span>Valor aceito</span>
          <strong className="admin-kpi-money">{formatAdminCurrency(acceptedValue)}</strong>
          <small>Somente propostas aceitas</small>
        </article>
        <article>
          <div className="admin-v241-kpi-icon"><Folder size={16} /></div>
          <span>Conteúdo publicado</span>
          <strong>{publishedProjects + publishedTestimonials}</strong>
          <small>{publishedProjects} projetos · {publishedTestimonials} depoimentos</small>
        </article>
      </section>

      <section className="admin-attention-grid" aria-label="Itens que precisam de atenção">
        {attention.map((item) => {
          const Icon = item.icon;
          return (
            <Link className={`admin-attention-card tone-${item.tone}`} href={item.href} key={item.label}>
              <span className="admin-attention-icon"><Icon size={17} /></span>
              <div><span>{item.label}</span><strong>{item.value}</strong><small>{item.detail}</small></div>
              <ArrowRight size={16} />
            </Link>
          );
        })}
      </section>

      <div className="admin-dashboard-columns">
        <section className="admin-panel admin-panel-flush">
          <div className="admin-panel-heading">
            <div><span>CRM</span><h2>Pipeline comercial</h2></div>
            <Link href="/admin/leads">Ver todos <ArrowRight size={14} /></Link>
          </div>
          <div className="admin-pipeline admin-pipeline-rich">
            {pipeline.map((status) => {
              const count = leads.filter((lead) => lead.status === status).length;
              const percentage = leads.length ? Math.round((count / leads.length) * 100) : 0;
              return (
                <div key={status}>
                  <strong>{count}</strong>
                  <span>{adminStatusLabel(status)}</span>
                  <i><b style={{ width: `${percentage}%` }} /></i>
                </div>
              );
            })}
          </div>
        </section>

        <section className="admin-panel admin-panel-flush">
          <div className="admin-panel-heading">
            <div><span>Conteúdo</span><h2>Publicação</h2></div>
            <Link href="/admin/projetos">Gerenciar <ArrowRight size={14} /></Link>
          </div>
          <div className="admin-content-health">
            <div><span className="success"><Check size={14} /></span><strong>{publishedProjects}</strong><small>Projetos publicados</small></div>
            <div><span><Folder size={14} /></span><strong>{projects.length - publishedProjects}</strong><small>Projetos em rascunho</small></div>
            <div><span className="success"><Check size={14} /></span><strong>{publishedTestimonials}</strong><small>Depoimentos publicados</small></div>
            <div><span><FileText size={14} /></span><strong>{testimonials.length - publishedTestimonials}</strong><small>Depoimentos em rascunho</small></div>
          </div>
        </section>
      </div>

      <div className="admin-dashboard-columns admin-dashboard-lists">
        <section className="admin-panel admin-panel-flush">
          <div className="admin-panel-heading">
            <div><span>Últimos contatos</span><h2>Leads recentes</h2></div>
            <Link href="/admin/leads">Abrir CRM <ArrowRight size={14} /></Link>
          </div>
          <div className="admin-compact-list">
            {leads.slice(0, 5).map((lead) => (
              <Link href={`/admin/leads/${lead.id}`} key={lead.id}>
                <span className="admin-avatar">{lead.name.slice(0, 1).toUpperCase()}</span>
                <div><strong>{lead.name}</strong><small>{lead.project_type} · {formatAdminDate(lead.created_at)}</small></div>
                <span className={`admin-status status-${lead.status}`}>{adminStatusLabel(lead.status)}</span>
              </Link>
            ))}
            {!leads.length && <div className="admin-empty compact">Nenhum lead registrado.</div>}
          </div>
        </section>

        <section className="admin-panel admin-panel-flush">
          <div className="admin-panel-heading">
            <div><span>Agenda</span><h2>Solicitações recentes</h2></div>
            <Link href="/admin/agendamentos">Abrir agenda <ArrowRight size={14} /></Link>
          </div>
          <div className="admin-compact-list">
            {appointments.slice(0, 5).map((appointment) => (
              <Link href="/admin/agendamentos" key={appointment.id}>
                <span className="admin-avatar appointment"><Calendar size={14} /></span>
                <div><strong>{appointment.name}</strong><small>{appointment.preferred_date} · {appointment.preferred_period}</small></div>
                <span className={`admin-status status-${appointment.status}`}>{adminStatusLabel(appointment.status)}</span>
              </Link>
            ))}
            {!appointments.length && <div className="admin-empty compact">Nenhum agendamento registrado.</div>}
          </div>
        </section>
      </div>
    </main>
  );
}
