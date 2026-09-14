import { dbRequest, deleteRow, insertRow, listRows, supabaseConfigured, updateRow } from "@/lib/server/supabase";

export type Lead = {
  id: string;
  name: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  project_type: string;
  features: string[];
  budget?: string | null;
  timeline?: string | null;
  details?: string | null;
  status: string;
  notes?: string | null;
  source: string;
  created_at: string;
  updated_at: string;
};

export type Proposal = {
  id: string;
  lead_id?: string | null;
  token: string;
  title: string;
  client_name: string;
  company?: string | null;
  scope: string;
  deliverables: string[];
  price_cents?: number | null;
  currency: string;
  deadline?: string | null;
  valid_until?: string | null;
  terms?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type CmsProject = {
  id: string;
  slug: string;
  title: string;
  title_en?: string | null;
  eyebrow?: string | null;
  eyebrow_en?: string | null;
  category?: string | null;
  category_en?: string | null;
  description: string;
  description_en?: string | null;
  long_description?: string | null;
  long_description_en?: string | null;
  tags: string[];
  image_url?: string | null;
  mobile_image_url?: string | null;
  demo_url?: string | null;
  metrics: Array<{ value: string; label: string; description?: string }>;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type CmsTestimonial = {
  id: string;
  name: string;
  role?: string | null;
  project?: string | null;
  quote: string;
  published: boolean;
  created_at: string;
};

export type Appointment = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  preferred_date: string;
  preferred_period: string;
  timezone?: string | null;
  notes?: string | null;
  status: string;
  created_at: string;
};

export type ErrorEvent = {
  id: string;
  message: string;
  stack?: string | null;
  path?: string | null;
  user_agent?: string | null;
  created_at: string;
};

export async function listLeads() {
  return listRows<Lead>("leads", "select=*&order=created_at.desc&limit=250");
}

export async function listProposals() {
  return listRows<Proposal>("proposals", "select=*&order=created_at.desc&limit=250");
}

export async function listCmsProjects(includeDrafts = false) {
  const filter = includeDrafts ? "" : "&published=eq.true";
  return listRows<CmsProject>("cms_projects", `select=*&order=sort_order.asc,created_at.desc${filter}&limit=250`);
}

export async function listTestimonials(includeDrafts = false) {
  const filter = includeDrafts ? "" : "&published=eq.true";
  return listRows<CmsTestimonial>("testimonials", `select=*&order=created_at.desc${filter}&limit=100`);
}

export async function listAppointments() {
  return listRows<Appointment>("appointments", "select=*&order=created_at.desc&limit=250");
}

export async function listErrors() {
  return listRows<ErrorEvent>("error_events", "select=*&order=created_at.desc&limit=250");
}

export async function getLead(id: string) {
  const rows = await listRows<Lead>("leads", `select=*&id=eq.${encodeURIComponent(id)}&limit=1`);
  return rows[0] ?? null;
}

export async function getProposalByToken(token: string) {
  if (!supabaseConfigured()) return null;
  const rows = await dbRequest<Proposal[]>(`proposals?select=*&token=eq.${encodeURIComponent(token)}&limit=1`, { cache: "no-store" });
  return rows[0] ?? null;
}

export async function getCmsProjectBySlug(slug: string) {
  try {
    const rows = await listRows<CmsProject>("cms_projects", `select=*&slug=eq.${encodeURIComponent(slug)}&published=eq.true&limit=1`);
    return rows[0] ?? null;
  } catch (error) {
    console.error("public cms project", error);
    return null;
  }
}

export async function createProposal(body: Omit<Proposal, "id" | "token" | "created_at" | "updated_at">) {
  return insertRow<Proposal>("proposals", body);
}

export async function markLeadProposalSent(leadId: string) {
  return updateRow<Lead>("leads", leadId, { status: "proposal_sent", updated_at: new Date().toISOString() });
}

export async function listPublicCmsProjects() {
  try { return await listCmsProjects(false); } catch (error) { console.error("public cms projects", error); return [] as CmsProject[]; }
}

export async function listPublicTestimonials() {
  try { return await listTestimonials(false); } catch (error) { console.error("public testimonials", error); return [] as CmsTestimonial[]; }
}

export async function deleteLead(id: string) {
  return deleteRow("leads", id);
}
