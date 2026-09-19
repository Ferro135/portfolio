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
  Database,
  FileText,
  Folder,
  Grid,
  Settings,
  Sparkles,
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
  const acceptedProposals = proposals.filter((proposal) => proposal.status === "accepted");
  const acceptedValue = acceptedProposals.reduce(
    (sum, proposal) => sum + (proposal.price_cents || 0),
    0,
  );
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "requested",
  );
  const recentErrors = errors.filter((error) => isWithinHours(error.created_at, 24));
  const publishedProjects = projects.filter((project) => project.published).length;
  const publishedTestimonials = testimonials.filter(
    (testimonial) => testimonial.published,
  ).length;

  const pipeline = [
    "new",
    "contacted",
    "proposal_sent",
    "approved",
    "in_progress",
    "completed",
  ];

  const quickActions = [
    {
      label: "CRM",
      detail: `${activeLeads.length} lead(s) ativo(s)`,
      href: "/admin/leads",
      icon: Users,
      tone: "cyan",
    },
    {
      label: "Propostas",
      detail: `${openProposals.length} aberta(s)`,
      href: "/admin/propostas",
      icon: FileText,
      tone: "violet",
    },
    {
      label: "Agenda",
      detail: `${pendingAppointments.length} pendente(s)`,
      href: "/admin/agendamentos",
      icon: Calendar,
      tone: "green",
    },
    {
      label: "Conteúdo",
      detail: `${publishedProjects} projeto(s) publicado(s)`,
      href: "/admin/projetos",
      icon: Grid,
      tone: "amber",
    },
  ] as const;

  return (
    <main className="admin-page admin-v270-dashboard">
      <header className="admin-v270-hero">
        <div>
          <span>ALUNERI Control Center</span>
          <h1>Visão geral</h1>
          <p>
            Comercial, agenda, conteúdo e infraestrutura separados por contexto
            para você identificar prioridades mais rápido.
          </p>
        </div>

        <div className="admin-v270-system-card">
          <div className={`admin-v270-system-status ${database.reachable ? "online" : "offline"}`}>
            <span><Database size={17} /></span>
            <div>
              <small>Infraestrutura</small>
              <strong>{database.reachable ? "Operacional" : "Precisa de atenção"}</strong>
            </div>
            <i />
          </div>
          <p>{database.detail}</p>
          <Link href="/admin/configuracao">
            Ver diagnóstico <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {!supabaseConfigured() && (
        <div className="admin-alert">
          Configure o Supabase para ativar a persistência do painel.
        </div>
      )}

      <section className="admin-v270-quick-actions" aria-label="Acessos rápidos">
        {quickActions.map(({ label, detail, href, icon: Icon, tone }) => (
          <Link href={href} key={label} className={`tone-${tone}`}>
            <span><Icon size={17} /></span>
            <div>
              <strong>{label}</strong>
              <small>{detail}</small>
            </div>
            <ArrowRight size={14} />
          </Link>
        ))}
      </section>

      <section className="admin-v270-metrics">
        <article className="tone-cyan">
          <span>Leads ativos</span>
          <strong>{activeLeads.length}</strong>
          <small>{newLeads.length} novo(s)</small>
          <i />
        </article>

        <article className="tone-violet">
          <span>Propostas abertas</span>
          <strong>{openProposals.length}</strong>
          <small>{proposals.length} no histórico</small>
          <i />
        </article>

        <article className="tone-green">
          <span>Valor aceito</span>
          <strong className="money">{formatAdminCurrency(acceptedValue)}</strong>
          <small>{acceptedProposals.length} proposta(s)</small>
          <i />
        </article>

        <article className="tone-amber">
          <span>Conteúdo publicado</span>
          <strong>{publishedProjects + publishedTestimonials}</strong>
          <small>{publishedProjects} projetos · {publishedTestimonials} depoimentos</small>
          <i />
        </article>
      </section>

      <section className="admin-v270-main-grid">
        <article className="admin-v270-panel pipeline">
          <div className="admin-v270-panel-head">
            <div>
              <span className="tone-cyan">Comercial</span>
              <h2>Pipeline de leads</h2>
            </div>
            <Link href="/admin/leads">Abrir CRM <ArrowRight size={13} /></Link>
          </div>

          <div className="admin-v270-pipeline">
            {pipeline.map((status, index) => {
              const count = leads.filter((lead) => lead.status === status).length;
              const percentage = leads.length
                ? Math.round((count / leads.length) * 100)
                : 0;

              return (
                <div key={status}>
                  <div className="admin-v270-pipeline-label">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{adminStatusLabel(status)}</strong>
                    <b>{count}</b>
                  </div>
                  <i><b style={{ width: `${percentage}%` }} /></i>
                  <small>{percentage}% do pipeline</small>
                </div>
              );
            })}
          </div>
        </article>

        <aside className="admin-v270-panel attention">
          <div className="admin-v270-panel-head">
            <div>
              <span className="tone-amber">Prioridades</span>
              <h2>O que olhar agora</h2>
            </div>
          </div>

          <div className="admin-v270-priority-list">
            <Link href="/admin/leads?status=new" className={staleLeads.length ? "warning" : "cyan"}>
              <span><Users size={15} /></span>
              <div>
                <strong>{newLeads.length} lead(s) novo(s)</strong>
                <small>{staleLeads.length ? `${staleLeads.length} esperando há 2+ dias` : "Nenhum atrasado"}</small>
              </div>
            </Link>

            <Link href="/admin/agendamentos?status=requested" className="green">
              <span><Calendar size={15} /></span>
              <div>
                <strong>{pendingAppointments.length} reunião(ões)</strong>
                <small>Aguardando confirmação</small>
              </div>
            </Link>

            <Link href="/admin/propostas" className="violet">
              <span><FileText size={15} /></span>
              <div>
                <strong>{openProposals.length} proposta(s)</strong>
                <small>Rascunhos e enviadas</small>
              </div>
            </Link>

            <Link href="/admin/erros" className={recentErrors.length ? "danger" : "success"}>
              <span><AlertTriangle size={15} /></span>
              <div>
                <strong>{recentErrors.length} erro(s) em 24h</strong>
                <small>{recentErrors.length ? "Revisar observabilidade" : "Sem alertas recentes"}</small>
              </div>
            </Link>
          </div>
        </aside>
      </section>

      <section className="admin-v270-activity-grid">
        <article className="admin-v270-panel">
          <div className="admin-v270-panel-head">
            <div>
              <span className="tone-cyan">Atividade</span>
              <h2>Leads recentes</h2>
            </div>
            <Link href="/admin/leads">Ver todos <ArrowRight size={13} /></Link>
          </div>

          <div className="admin-v270-list">
            {leads.slice(0, 6).map((lead) => (
              <Link href={`/admin/leads/${lead.id}`} key={lead.id}>
                <span className="avatar cyan">{lead.name.slice(0, 1).toUpperCase()}</span>
                <div>
                  <strong>{lead.name}</strong>
                  <small>{lead.project_type} · {formatAdminDate(lead.created_at)}</small>
                </div>
                <span className={`admin-status status-${lead.status}`}>
                  {adminStatusLabel(lead.status)}
                </span>
              </Link>
            ))}
            {!leads.length && <div className="admin-empty compact">Nenhum lead registrado.</div>}
          </div>
        </article>

        <article className="admin-v270-panel">
          <div className="admin-v270-panel-head">
            <div>
              <span className="tone-green">Agenda</span>
              <h2>Solicitações recentes</h2>
            </div>
            <Link href="/admin/agendamentos">Ver agenda <ArrowRight size={13} /></Link>
          </div>

          <div className="admin-v270-list">
            {appointments.slice(0, 6).map((appointment) => (
              <Link href="/admin/agendamentos" key={appointment.id}>
                <span className="avatar green"><Calendar size={14} /></span>
                <div>
                  <strong>{appointment.name}</strong>
                  <small>{appointment.preferred_date} · {appointment.preferred_period}</small>
                </div>
                <span className={`admin-status status-${appointment.status}`}>
                  {adminStatusLabel(appointment.status)}
                </span>
              </Link>
            ))}
            {!appointments.length && <div className="admin-empty compact">Nenhum agendamento registrado.</div>}
          </div>
        </article>
      </section>

      <section className="admin-v270-footer-strip">
        <Link href="/admin/projetos" className="violet">
          <span><Folder size={16} /></span>
          <div>
            <small>Conteúdo</small>
            <strong>{publishedProjects} projeto(s) publicado(s)</strong>
          </div>
          <ArrowRight size={14} />
        </Link>

        <Link href="/admin/configuracao" className="blue">
          <span><Settings size={16} /></span>
          <div>
            <small>Sistema</small>
            <strong>{database.reachable ? "Banco e CRM disponíveis" : "Revisar infraestrutura"}</strong>
          </div>
          <ArrowRight size={14} />
        </Link>

        <Link href="/admin/configuracao" className="green">
          <span><Sparkles size={16} /></span>
          <div>
            <small>Assistente IA</small>
            <strong>Ver configuração e modelo</strong>
          </div>
          <ArrowRight size={14} />
        </Link>

        <Link href="/admin" className="amber">
          <span><Check size={16} /></span>
          <div>
            <small>Status</small>
            <strong>{recentErrors.length ? "Há alertas para revisar" : "Operação normal"}</strong>
          </div>
          <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  );
}
