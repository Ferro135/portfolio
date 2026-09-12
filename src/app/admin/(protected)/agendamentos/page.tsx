import Link from "next/link";
import { revalidatePath } from "next/cache";
import { listAppointments } from "@/lib/server/business";
import { updateRow } from "@/lib/server/supabase";
import { adminStatusLabel, appointmentStatusOptions, formatAdminDate } from "@/lib/admin-ui";
import { Calendar, Search } from "@/components/Icons";

export default async function AppointmentsAdmin({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const params = await searchParams;
  const items = await listAppointments();
  const q = (params.q || "").trim().toLocaleLowerCase("pt-BR");
  const status = params.status || "";
  const filtered = items.filter((item) => {
    const haystack = `${item.name} ${item.email || ""} ${item.phone || ""} ${item.notes || ""}`.toLocaleLowerCase("pt-BR");
    return (!q || haystack.includes(q)) && (!status || item.status === status);
  });

  async function update(formData: FormData) {
    "use server";
    await updateRow("appointments", String(formData.get("id")), {
      status: String(formData.get("status")),
    });
    revalidatePath("/admin/agendamentos");
    revalidatePath("/admin");
  }

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div><span>Reuniões</span><h1>Agendamentos</h1><p>Confirme solicitações, acompanhe o calendário e mantenha o histórico organizado.</p></div>
        <div className="admin-heading-count"><Calendar size={16} /><strong>{items.length}</strong><span>solicitações</span></div>
      </div>

      <section className="admin-mini-stats appointment-stats">
        {appointmentStatusOptions.map((item) => (
          <Link href={`/admin/agendamentos?status=${item}`} key={item} className={status === item ? "active" : ""}>
            <span>{adminStatusLabel(item)}</span>
            <strong>{items.filter((appointment) => appointment.status === item).length}</strong>
          </Link>
        ))}
      </section>

      <form className="admin-filterbar" method="get">
        <label className="admin-search-field"><Search size={15} /><input name="q" defaultValue={params.q || ""} placeholder="Buscar nome, email, telefone ou observação…" /></label>
        <select name="status" defaultValue={status}><option value="">Todos os status</option>{appointmentStatusOptions.map((item) => <option key={item} value={item}>{adminStatusLabel(item)}</option>)}</select>
        <button type="submit">Filtrar</button>
        {(q || status) && <Link href="/admin/agendamentos">Limpar</Link>}
      </form>

      <div className="admin-card-list">
        {filtered.map((item) => (
          <article className="admin-list-card static admin-appointment-card" key={item.id}>
            <div className="admin-appointment-main">
              <div className="admin-appointment-date"><Calendar size={16} /><strong>{item.preferred_date}</strong><span>{item.preferred_period}</span></div>
              <div>
                <span className={`admin-status status-${item.status}`}>{adminStatusLabel(item.status)}</span>
                <strong>{item.name}</strong>
                <span>{item.timezone || "Fuso não informado"} · recebido em {formatAdminDate(item.created_at)}</span>
                {item.notes && <p>{item.notes}</p>}
                <div className="admin-contact-links">
                  {item.email && <a href={`mailto:${item.email}`}>{item.email}</a>}
                  {item.phone && <a href={`tel:${item.phone}`}>{item.phone}</a>}
                  {!item.email && !item.phone && <small>Sem contato informado</small>}
                </div>
              </div>
            </div>
            <form className="admin-inline-form" action={update}>
              <input type="hidden" name="id" value={item.id} />
              <select name="status" defaultValue={item.status}>{appointmentStatusOptions.map((option) => <option value={option} key={option}>{adminStatusLabel(option)}</option>)}</select>
              <button>Salvar</button>
            </form>
          </article>
        ))}
        {!filtered.length && <div className="admin-empty">Nenhuma solicitação encontrada.</div>}
      </div>
    </main>
  );
}
