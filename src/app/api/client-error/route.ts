import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { insertRow, supabaseConfigured } from "@/lib/server/supabase";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001F]/g, " ").trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 16384) return new Response("Payload too large", { status: 413 });
    const limited = await checkRateLimit(request, "client_error", 60, 60 * 60 * 1000);
    if (!limited.allowed) return new Response(null, { status: 204 });
    if (!supabaseConfigured()) return new Response(null, { status: 204 });

    const body = await request.json();
    const message = clean(body.message, 500);
    if (!message) return new Response(null, { status: 204 });

    await insertRow("error_events", {
      message,
      stack: clean(body.stack, 4000) || null,
      path: clean(body.path, 500) || null,
      user_agent: clean(request.headers.get("user-agent"), 500) || null,
    });
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 204 });
  }
}
