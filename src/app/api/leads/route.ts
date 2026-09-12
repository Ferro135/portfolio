import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { insertRow, supabaseConfigured } from "@/lib/server/supabase";
import { notifyNewLead } from "@/lib/server/email";

const allowedTypes = new Set([
  "Site institucional",
  "Dashboard",
  "Sistema web",
  "SaaS & produtos digitais",
  "Sistema administrativo",
  "Automação / integração",
  "Outro",
]);

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 32768) return new Response("Payload too large", { status: 413 });
    const limited = await checkRateLimit(request, "lead", 5, 60 * 60 * 1000);
    if (!limited.allowed) return NextResponse.json({ ok: false, error: "Muitas tentativas. Tente novamente mais tarde." }, { status: 429 });

    const body = await request.json();
    if (clean(body.website, 200)) return NextResponse.json({ ok: true, persisted: false });

    const name = clean(body.name, 80);
    const company = clean(body.company, 100);
    const email = clean(body.email, 180).toLowerCase();
    const phone = clean(body.phone, 40);
    const projectType = clean(body.projectType, 100);
    const budget = clean(body.budget, 80);
    const timeline = clean(body.timeline, 80);
    const details = clean(body.details, 3000);
    const features = Array.isArray(body.features)
      ? body.features.filter((item: unknown) => typeof item === "string").slice(0, 20).map((item: string) => item.trim().slice(0, 100))
      : [];

    if (name.length < 2 || !allowedTypes.has(projectType) || (!email && !phone) || !validEmail(email) || body.privacyAccepted !== true) {
      return NextResponse.json({ ok: false, error: "Revise os dados do briefing." }, { status: 400 });
    }

    const payload = {
      name,
      company: company || null,
      email: email || null,
      phone: phone || null,
      project_type: projectType,
      features,
      budget: budget || null,
      timeline: timeline || null,
      details: details || null,
      status: "new",
      source: clean(body.source, 120) || "website",
      ip_hash: limited.keyHash,
    };

    let persisted = false;
    if (supabaseConfigured()) {
      await insertRow("leads", payload);
      persisted = true;
      await notifyNewLead({ name, email: email || undefined, company, project_type: projectType, details });
    }

    return NextResponse.json({ ok: true, persisted });
  } catch (error) {
    console.error("lead submission", error);
    return NextResponse.json({ ok: false, error: "Não foi possível registrar o briefing agora." }, { status: 500 });
  }
}
