import { randomUUID } from "node:crypto";

const DEFAULT_SUPABASE_URL = "https://pzwtoksbbfvgsnwunzri.supabase.co";

const TABLE_ALIASES: Record<string, [string, string?]> = {
  leads: ["aluneri_leads", "nexora_leads"],
  proposals: ["aluneri_proposals", "nexora_proposals"],
  cms_projects: ["aluneri_cms_projects", "nexora_cms_projects"],
  testimonials: ["aluneri_testimonials", "nexora_testimonials"],
  appointments: ["aluneri_appointments", "nexora_appointments"],
  error_events: ["aluneri_error_events", "nexora_error_events"],
  rate_events: ["aluneri_rate_events", "nexora_rate_events"],
};

const STORAGE_BUCKETS = ["aluneri-portfolio-media", "nexora-portfolio-media"] as const;

function scopedPaths(path: string) {
  const [head, ...rest] = path.split("?");
  const mapped = TABLE_ALIASES[head];
  const names = mapped ? mapped.filter((name): name is string => Boolean(name)) : [head];
  return names.map((name) => rest.length ? `${name}?${rest.join("?")}` : name);
}

type QueryOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  prefer?: string;
  cache?: RequestCache;
  revalidate?: number;
};

export function supabaseConfigured() {
  return Boolean((process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY));
}

function config() {
  const url = (process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL).replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  if (key.startsWith("sb_publishable_")) {
    throw new Error("Use uma Secret key do Supabase no backend, não uma Publishable key");
  }
  return { url, key };
}

function authHeaders(key: string): Record<string, string> {
  const headers: Record<string, string> = {
    apikey: key,
  };

  // Chaves JWT legadas (service_role) precisam do Bearer token.
  // As Secret keys modernas sb_secret_* são enviadas apenas como apikey.
  if (!key.startsWith("sb_secret_")) {
    headers.Authorization = `Bearer ${key}`;
  }

  return headers;
}

export async function dbRequest<T>(path: string, options: QueryOptions = {}): Promise<T> {
  const cfg = config();
  if (!cfg) throw new Error("Supabase não configurado");

  const candidates = scopedPaths(path);
  let lastError = "";

  for (const candidate of candidates) {
    const response = await fetch(`${cfg.url}/rest/v1/${candidate}`, {
      method: options.method || "GET",
      headers: {
        ...authHeaders(cfg.key),
        "Content-Type": "application/json",
        ...(options.prefer ? { Prefer: options.prefer } : {}),
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: options.cache,
      ...(options.revalidate !== undefined ? { next: { revalidate: options.revalidate } } : {}),
    });

    if (!response.ok) {
      lastError = await response.text();
      if (response.status === 404 && candidate !== candidates[candidates.length - 1]) continue;
      throw new Error(`Supabase ${response.status}: ${lastError.slice(0, 500)}`);
    }

    if (response.status === 204) return undefined as T;
    const text = await response.text();
    if (!text) return undefined as T;
    return JSON.parse(text) as T;
  }

  throw new Error(`Supabase: ${lastError || "recurso não encontrado"}`);
}

export async function listRows<T>(table: string, query = "select=*&order=created_at.desc") {
  if (!supabaseConfigured()) return [] as T[];

  try {
    return await dbRequest<T[]>(`${table}?${query}`, { cache: "no-store" });
  } catch (error) {
    console.error(`Supabase list failed: ${table}`, error);
    return [] as T[];
  }
}

export async function getRow<T>(table: string, id: string) {
  if (!supabaseConfigured()) return null;

  try {
    const rows = await dbRequest<T[]>(
      `${table}?id=eq.${encodeURIComponent(id)}&select=*&limit=1`,
      { cache: "no-store" },
    );
    return rows[0] ?? null;
  } catch (error) {
    console.error(`Supabase get failed: ${table}`, error);
    return null;
  }
}

export async function checkSupabaseHealth() {
  if (!supabaseConfigured()) {
    return { configured: false, reachable: false, detail: "Variáveis não configuradas" };
  }

  try {
    await dbRequest<Array<{ id: string }>>("leads?select=id&limit=1", {
      cache: "no-store",
    });
    return { configured: true, reachable: true, detail: "Conexão ativa" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha desconhecida";
    console.error("Supabase health check failed", error);
    return { configured: true, reachable: false, detail: message.slice(0, 140) };
  }
}

export async function insertRow<T>(table: string, body: unknown) {
  const rows = await dbRequest<T[]>(table, {
    method: "POST",
    body,
    prefer: "return=representation",
    cache: "no-store",
  });
  return rows[0];
}

export async function updateRow<T>(table: string, id: string, body: unknown) {
  const rows = await dbRequest<T[]>(`${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body,
    prefer: "return=representation",
    cache: "no-store",
  });
  return rows[0] ?? null;
}

export async function deleteRow(table: string, id: string) {
  return dbRequest<void>(`${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    cache: "no-store",
  });
}

export async function uploadPublicAsset(file: File, folder: string) {
  const cfg = config();
  if (!cfg) throw new Error("Supabase não configurado");
  if (!file || file.size <= 0) return "";
  if (file.size > 900 * 1024) throw new Error("Imagem acima de 900 KB. Comprima antes do upload");
  const allowed = new Set(["image/png", "image/jpeg", "image/webp", "image/avif"]);
  if (!allowed.has(file.type)) throw new Error("Formato de imagem não permitido");
  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : file.type === "image/avif" ? "avif" : "jpg";
  const safeFolder = folder.replace(/[^a-z0-9/_-]/gi, "-").slice(0, 120);
  const objectPath = `${safeFolder}/${Date.now()}-${randomUUID()}.${ext}`;
  let lastDetail = "";
  for (const bucket of STORAGE_BUCKETS) {
    const response = await fetch(`${cfg.url}/storage/v1/object/${bucket}/${objectPath}`, {
      method: "POST",
      headers: {
        ...authHeaders(cfg.key),
        "Content-Type": file.type,
        "x-upsert": "false",
        "Cache-Control": "3600",
      },
      body: Buffer.from(await file.arrayBuffer()),
      cache: "no-store",
    });
    if (response.ok) return `${cfg.url}/storage/v1/object/public/${bucket}/${objectPath}`;
    lastDetail = await response.text();
    if (response.status !== 404) break;
  }
  throw new Error(`Falha no upload: ${lastDetail.slice(0, 300)}`);
}
