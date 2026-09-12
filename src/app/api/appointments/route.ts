import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { insertRow, supabaseConfigured } from "@/lib/server/supabase";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 16384) return new Response("Payload too large", { status: 413 });
    const limited = await checkRateLimit(request, "appointment", 4, 60 * 60 * 1000);
    if (!limited.allowed) return NextResponse.json({ ok: false, error: "Muitas tentativas." }, { status: 429 });
    const body = await request.json();
    if (clean(body.website, 200)) return NextResponse.json({ ok: true, persisted: false });

    const name = clean(body.name, 80);
    const email = clean(body.email, 180).toLowerCase();
    const phone = clean(body.phone, 40);
    const preferredDate = clean(body.preferredDate, 20);
    const period = clean(body.preferredPeriod, 40);
    const timezone = clean(body.timezone, 80);
    const notes = clean(body.notes, 1000);

    const today = new Date().toISOString().slice(0, 10);
    if (name.length < 2 || (!email && !phone) || !/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || preferredDate < today || !period || body.privacyAccepted !== true) {
      return NextResponse.json({ ok: false, error: "Revise os dados do agendamento." }, { status: 400 });
    }

    let persisted = false;
    if (supabaseConfigured()) {
      await insertRow("appointments", {
        name,
        email: email || null,
        phone: phone || null,
        preferred_date: preferredDate,
        preferred_period: period,
        timezone: timezone || null,
        notes: notes || null,
        status: "requested",
        ip_hash: limited.keyHash,
      });
      persisted = true;
    }
    return NextResponse.json({ ok: true, persisted });
  } catch (error) {
    console.error("appointment submission", error);
    return NextResponse.json({ ok: false, error: "Não foi possível registrar o pedido de horário." }, { status: 500 });
  }
}
