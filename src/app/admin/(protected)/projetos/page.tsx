import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { listCmsProjects } from "@/lib/server/business";
import { insertRow, updateRow, deleteRow, uploadPublicAsset } from "@/lib/server/supabase";
import { ConfirmSubmitButton } from "@/components/ConfirmSubmitButton";
import { Folder, Search } from "@/components/Icons";

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 90);
}

export default async function CmsProjectsPage({ searchParams }: { searchParams: Promise<{ q?: string; state?: string }> }) {
  const params = await searchParams;
  const items = await listCmsProjects(true);
  const q = (params.q || "").trim().toLocaleLowerCase("pt-BR");
  const state = params.state || "all";
  const filtered = items.filter((item) => {
    const haystack = `${item.title} ${item.title_en || ""} ${item.slug} ${item.category || ""} ${(item.tags || []).join(" ")}`.toLocaleLowerCase("pt-BR");
    const stateMatch = state === "published" ? item.published : state === "draft" ? !item.published : true;
    return (!q || haystack.includes(q)) && stateMatch;
  });

  async function create(formData: FormData) {
    "use server";
    const title = String(formData.get("title") || "").trim().slice(0, 120);
    if (!title) return;
    const slug = slugify(String(formData.get("slug") || title));
    const imageFile = formData.get("image_file");
    const uploaded = imageFile instanceof File && imageFile.size ? await uploadPublicAsset(imageFile, `projects/${slug}`) : "";
    const row = await insertRow<any>("cms_projects", {
      title,
      title_en: String(formData.get("title_en") || "").slice(0, 120) || null,
      slug,
      eyebrow: String(formData.get("eyebrow") || "").slice(0, 120) || null,
      eyebrow_en: String(formData.get("eyebrow_en") || "").slice(0, 120) || null,
      category: String(formData.get("category") || "").slice(0, 120) || null,
      category_en: String(formData.get("category_en") || "").slice(0, 120) || null,
      description: String(formData.get("description") || "").slice(0, 1200),
      description_en: String(formData.get("description_en") || "").slice(0, 1200) || null,
      long_description: String(formData.get("long_description") || "").slice(0, 8000) || null,
      long_description_en: String(formData.get("long_description_en") || "").slice(0, 8000) || null,
      tags: String(formData.get("tags") || "").split(",").map((value) => value.trim()).filter(Boolean).slice(0, 20),
      image_url: uploaded || String(formData.get("image_url") || "").slice(0, 1000) || null,
      demo_url: String(formData.get("demo_url") || "").slice(0, 1000) || null,
      published: false,
      sort_order: 100,
    });
    redirect(`/admin/projetos/${row.id}`);
  }

  async function toggle(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    const published = String(formData.get("published")) === "true";
    await updateRow("cms_projects", id, { published: !published, updated_at: new Date().toISOString() });
    revalidatePath("/admin/projetos");
    revalidatePath("/projetos");
    revalidatePath("/admin");
  }

  async function remove(formData: FormData) {
    "use server";
    await deleteRow("cms_projects", String(formData.get("id")));
    revalidatePath("/admin/projetos");
    revalidatePath("/projetos");
    revalidatePath("/admin");
  }

  const published = items.filter((item) => item.published).length;

  return (
    <main className="admin-page">
      <div className="admin-page-heading">
        <div><span>CMS</span><h1>Projetos</h1><p>Gerencie cases extras do portfólio sem editar código.</p></div>
        <div className="admin-heading-count"><Folder size={16} /><strong>{items.length}</strong><span>{published} publicados</span></div>
      </div>

      <details className="admin-create-disclosure">
        <summary><span>+ Novo projeto</span><small>Criar rascunho no CMS</small></summary>
        <section className="admin-panel admin-create-panel">
          <form className="admin-form admin-form-grid" action={create}>
            <label>Título PT<input name="title" required maxLength={120} /></label>
            <label>Título EN<input name="title_en" maxLength={120} /></label>
            <label>Slug<input name="slug" placeholder="gerado automaticamente" /></label>
            <label>Tags<input name="tags" placeholder="SaaS, Dashboard, Gestão" /></label>
            <label>Eyebrow PT<input name="eyebrow" placeholder="SaaS • Gestão" /></label>
            <label>Eyebrow EN<input name="eyebrow_en" placeholder="SaaS • Management" /></label>
            <label>Categoria PT<input name="category" placeholder="Produto digital" /></label>
            <label>Categoria EN<input name="category_en" placeholder="Digital product" /></label>
            <label className="admin-span-2">Descrição PT<textarea name="description" required rows={3} /></label>
            <label className="admin-span-2">Descrição EN<textarea name="description_en" rows={3} /></label>
            <label className="admin-span-2">Descrição longa PT<textarea name="long_description" rows={5} /></label>
            <label className="admin-span-2">Descrição longa EN<textarea name="long_description_en" rows={5} /></label>
            <label>Upload da capa<input name="image_file" type="file" accept="image/png,image/jpeg,image/webp,image/avif" /></label>
            <label>ou Imagem HTTPS<input name="image_url" type="url" placeholder="https://..." /></label>
            <label className="admin-span-2">Demo HTTPS<input name="demo_url" type="url" placeholder="https://..." /></label>
            <button className="button button-primary admin-span-2">Criar rascunho</button>
          </form>
        </section>
      </details>

      <form className="admin-filterbar" method="get">
        <label className="admin-search-field"><Search size={15} /><input name="q" defaultValue={params.q || ""} placeholder="Buscar título, slug, categoria ou tag…" /></label>
        <select name="state" defaultValue={state}><option value="all">Todos</option><option value="published">Publicados</option><option value="draft">Rascunhos</option></select>
        <button type="submit">Filtrar</button>
        {(q || state !== "all") && <Link href="/admin/projetos">Limpar</Link>}
      </form>

      <div className="admin-card-list">
        {filtered.map((item) => (
          <article className="admin-list-card static admin-cms-card" key={item.id}>
            <div>
              <span className={`admin-status ${item.published ? "status-completed" : "status-draft"}`}>{item.published ? "Publicado" : "Rascunho"}</span>
              <strong>{item.title}</strong>
              <span>/{item.slug} · {item.category || "Sem categoria"}</span>
              {item.tags?.length ? <small>{item.tags.slice(0, 5).join(" · ")}</small> : null}
            </div>
            <div className="admin-inline-actions">
              {item.published && <a href={`/projetos/${item.slug}`} target="_blank" rel="noreferrer">Ver público</a>}
              <Link href={`/admin/projetos/${item.id}`}>Editar</Link>
              <form action={toggle}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="published" value={String(item.published)} /><button>{item.published ? "Despublicar" : "Publicar"}</button></form>
              <form action={remove}><input type="hidden" name="id" value={item.id} /><ConfirmSubmitButton className="danger-link" message={`Excluir definitivamente o projeto “${item.title}”?`}>Excluir</ConfirmSubmitButton></form>
            </div>
          </article>
        ))}
        {!filtered.length && <div className="admin-empty">Nenhum projeto encontrado.</div>}
      </div>
    </main>
  );
}
