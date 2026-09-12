import Link from "next/link";
import { revalidatePath } from "next/cache";
import { listTestimonials } from "@/lib/server/business";
import { deleteRow, insertRow, updateRow } from "@/lib/server/supabase";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { MessageSquare, Search } from "@/components/Icons";

export default async function TestimonialsAdmin({ searchParams }: { searchParams: Promise<{ q?: string; state?: string }> }) {
  const params = await searchParams;
  const items = await listTestimonials(true);
  const q = (params.q || "").trim().toLocaleLowerCase("pt-BR");
  const state = params.state || "all";
  const filtered = items.filter((item) => {
    const haystack = `${item.name} ${item.role || ""} ${item.project || ""} ${item.quote}`.toLocaleLowerCase("pt-BR");
    const stateMatch = state === "published" ? item.published : state === "draft" ? !item.published : true;
    return (!q || haystack.includes(q)) && stateMatch;
  });

  async function create(formData: FormData) {
    "use server";
    await insertRow("testimonials", {
      name: String(formData.get("name") || "").slice(0, 100),
      role: String(formData.get("role") || "").slice(0, 160) || null,
      project: String(formData.get("project") || "").slice(0, 160) || null,
      quote: String(formData.get("quote") || "").slice(0, 2000),
      published: false,
    });
    revalidatePath("/admin/depoimentos");
  }

  async function toggle(formData: FormData) {
    "use server";
    await updateRow("testimonials", String(formData.get("id")), { published: String(formData.get("published")) !== "true" });
    revalidatePath("/admin/depoimentos");
    revalidatePath("/");
    revalidatePath("/admin");
  }

  async function remove(formData: FormData) {
    "use server";
    await deleteRow("testimonials", String(formData.get("id")));
    revalidatePath("/admin/depoimentos");
    revalidatePath("/admin");
  }

  const published = items.filter((item) => item.published).length;

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div><span>CMS</span><h1>Depoimentos</h1><p>Publique apenas depoimentos reais com autorização explícita.</p></div>
        <div className="admin-heading-count"><MessageSquare size={16} /><strong>{items.length}</strong><span>{published} publicados</span></div>
      </div>

      <details className="admin-create-disclosure">
        <summary><span>+ Novo depoimento</span><small>Salvar primeiro como rascunho</small></summary>
        <section className="admin-panel admin-create-panel">
          <form className="admin-form admin-form-grid" action={create}>
            <label>Nome<input name="name" required /></label>
            <label>Cargo / empresa<input name="role" /></label>
            <label>Projeto<input name="project" /></label>
            <label className="admin-span-2">Depoimento<textarea name="quote" required rows={5} /></label>
            <button className="button button-primary admin-span-2">Salvar rascunho</button>
          </form>
        </section>
      </details>

      <form className="admin-filterbar" method="get">
        <label className="admin-search-field"><Search size={15} /><input name="q" defaultValue={params.q || ""} placeholder="Buscar nome, empresa, projeto ou trecho…" /></label>
        <select name="state" defaultValue={state}><option value="all">Todos</option><option value="published">Publicados</option><option value="draft">Rascunhos</option></select>
        <button type="submit">Filtrar</button>
        {(q || state !== "all") && <Link href="/admin/depoimentos">Limpar</Link>}
      </form>

      <div className="admin-card-list">
        {filtered.map((item) => (
          <article className="admin-list-card static admin-testimonial-card" key={item.id}>
            <div>
              <span className={`admin-status ${item.published ? "status-completed" : "status-draft"}`}>{item.published ? "Publicado" : "Rascunho"}</span>
              <strong>{item.name}</strong>
              <span>{item.role || item.project || "Sem cargo/projeto"}</span>
              <p>“{item.quote}”</p>
            </div>
            <div className="admin-inline-actions">
              <form action={toggle}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="published" value={String(item.published)} /><button>{item.published ? "Ocultar" : "Publicar"}</button></form>
              <form action={remove}><input type="hidden" name="id" value={item.id} /><ConfirmSubmitButton className="danger-link" message={`Excluir definitivamente o depoimento de ${item.name}?`}>Excluir</ConfirmSubmitButton></form>
            </div>
          </article>
        ))}
        {!filtered.length && <div className="admin-empty">Nenhum depoimento encontrado.</div>}
      </div>
    </main>
  );
}
