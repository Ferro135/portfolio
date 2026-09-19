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
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  Check,
  FileText,
  Folder,
  Users,
} from "@/components/Icons";

export default async function AdminDashboard() {
  const [leads, proposals, projects, testimonials, appointments, errors, database] =
    await Promise.all([
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
  const activeLeads = leads.filter(
    (lead) => !["completed", "archived"].includes(lead.status),
  );
  const openProposals = proposals.filter((proposal) =>
    ["draft", "sent"].includes(proposal.status),
  );
  const acceptedValue = proposals
    .filter((proposal) => proposal.status === "accepted")
    .reduce((sum, proposal) => sum + (proposal.price_cents || 0), 0);
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "requested",
  );
  const recentErrors = errors.filter((error) =>
    isWithinHours(error.created_at, 24),
  );
  const publishedProjects = projects.filter((project) => project.published).length;
  const publishedTestimonials = testimonials.filter(
    (testimonial) => testimonial.published,
  ).length;

  const attention = [
    {
      label: "Leads novos",
      value: newLeads.length,
      detail: staleLeads.length
        ? `${staleLeads.length} aguardando há 2+ dias`
        : "Nenhum atrasado",
      href: "/admin/leads?status=new",
      icon: Users,
      tone: staleLeads.length ? "warning" : "default",
    },
    {
      label: "Reuniões pendentes",
      value: pendingAppointments.length,
      detail: "Aguardando confirmação",
      href: "/admin/agendamentos?status=requested",
      icon: Calendar,
      tone: pendingAppointments.length ? "warning" : "default",
    },
    {
      label: "Propostas abertas",
      value: openProposals.length,
      detail: "Rascunhos e enviadas",
      href: "/admin/propostas",
      icon: FileText,
      tone: "default",
    },
    {
      label: "Erros em 24h",
      value: recentErrors.length,
      detail: recentErrors.length ? "Revisar observabilidade" : "Tudo normal",
      href: "/admin/erros",
      icon: AlertTriangle,
      tone: recentErrors.length ? "danger" : "success",
    },
  ] as const;

  const pipeline = [
    "new",
    "contacted",
    "proposal_sent",
    "approved",
    "in_progress",
    "completed",
  ];

  return (
    <main className="admin-page admin-v250-dashboard">
      <header className="admin-v250-page-head">
        <div>
          <span>Visão geral</span>
          <h1>Control Center</h1>
          <p>
            O que precisa de atenção hoje, sem misturar operação, conteúdo e
            sistema na mesma leitura.
          </p>
        </div>

        <div className="admin-v250-head-actions">
          <div
            className={`admin-v250-db ${database.reachable ? "online" : "offline"}`}
            title={database.detail}
          >
            <i />
            <span>
              {database.reachable
                ? "Banco online"
                : supabaseConfigured()
                  ? "Banco indisponível"
                  : "Modo demonstração"}
            </span>
          </div>

          <Link href="/admin/leads">
            Abrir CRM <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {!supabaseConfigured() && (
        <div className="admin-alert">
          Configure o Supabase para ativar a persistência do painel.
        </div>
      )}

      <section className="admin-v250-kpis" aria-label="Indicadores principais">
        <Link href="/admin/leads">
          <span className="admin-v250-kpi-icon"><Users size={17} /></span>
          <div>
            <small>Leads ativos</small>
            <strong>{activeLeads.length}</strong>
            <p>{newLeads.length} novos</p>
          </div>
        </Link>

        <Link href="/admin/propostas">
          <span className="admin-v250-kpi-icon"><FileText size={17} /></span>
          <div>
            <small>Propostas abertas</small>
            <strong>{openProposals.length}</strong>
            <p>{proposals.length} no histórico</p>
          </div>
        </Link>

        <Link href="/admin/propostas?status=accepted">
          <span className="admin-v250-kpi-icon success"><Check size={17} /></span>
          <div>
            <small>Valor aceito</small>
            <strong className="money">{formatAdminCurrency(acceptedValue)}</strong>
            <p>Somente propostas aceitas</p>
          </div>
        </Link>

        <Link href="/admin/projetos">
          <span className="admin-v250-kpi-icon"><Folder size={17} /></span>
          <div>
            <small>Conteúdo publicado</small>
            <strong>{publishedProjects + publishedTestimonials}</strong>
            <p>{publishedProjects} projetos · {publishedTestimonials} depoimentos</p>
          </div>
        </Link>
      </section>

      <section className="admin-v250-primary-grid">
        <article className="admin-v250-panel admin-v250-pipeline-panel">
          <div className="admin-v250-panel-head">
            <div>
              <span>CRM</span>
              <h2>Pipeline comercial</h2>
            </div>
            <Link href="/admin/leads">
              Ver todos <ArrowRight size={13} />
            </Link>
          </div>

          <div className="admin-v250-pipeline">
            {pipeline.map((status) => {
              const count = leads.filter((lead) => lead.status === status).length;
              const percentage = leads.length
                ? Math.round((count / leads.length) * 100)
                : 0;

              return (
                <div key={status}>
                  <div>
                    <span>{adminStatusLabel(status)}</span>
                    <strong>{count}</strong>
                  </div>
                  <i><b style={{ width: `${percentage}%` }} /></i>
                </div>
              );
            })}
          </div>
        </article>

        <aside className="admin-v250-panel admin-v250-attention">
          <div className="admin-v250-panel-head">
            <div>
              <span>Agora</span>
              <h2>Precisa de atenção</h2>
            </div>
          </div>

          <div className="admin-v250-attention-list">
            {attention.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`tone-${item.tone}`}
                >
                  <span className="icon"><Icon size={15} /></span>
                  <div>
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </div>
                  <b>{item.value}</b>
                </Link>
              );
            })}
          </div>
        </aside>
      </section>

      <section className="admin-v250-secondary-grid">
        <article className="admin-v250-panel">
          <div className="admin-v250-panel-head">
            <div>
              <span>CRM</span>
              <h2>Leads recentes</h2>
            </div>
            <Link href="/admin/leads">
              Abrir CRM <ArrowRight size={13} />
            </Link>
          </div>

          <div className="admin-v250-recent-list">
            {leads.slice(0, 6).map((lead) => (
              <Link href={`/admin/leads/${lead.id}`} key={lead.id}>
                <span className="avatar">
                  {lead.name.slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <strong>{lead.name}</strong>
                  <small>
                    {lead.project_type} · {formatAdminDate(lead.created_at)}
                  </small>
                </div>
                <span className={`admin-status status-${lead.status}`}>
                  {adminStatusLabel(lead.status)}
                </span>
              </Link>
            ))}
            {!leads.length && (
              <div className="admin-empty compact">Nenhum lead registrado.</div>
            )}
          </div>
        </article>

        <article className="admin-v250-panel">
          <div className="admin-v250-panel-head">
            <div>
              <span>Agenda</span>
              <h2>Próximas solicitações</h2>
            </div>
            <Link href="/admin/agendamentos">
              Abrir agenda <ArrowRight size={13} />
            </Link>
          </div>

          <div className="admin-v250-recent-list">
            {appointments.slice(0, 6).map((appointment) => (
              <Link href="/admin/agendamentos" key={appointment.id}>
                <span className="avatar calendar"><Calendar size={14} /></span>
                <div>
                  <strong>{appointment.name}</strong>
                  <small>
                    {appointment.preferred_date} · {appointment.preferred_period}
                  </small>
                </div>
                <span className={`admin-status status-${appointment.status}`}>
                  {adminStatusLabel(appointment.status)}
                </span>
              </Link>
            ))}
            {!appointments.length && (
              <div className="admin-empty compact">
                Nenhum agendamento registrado.
              </div>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
