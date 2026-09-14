import { createHash } from "node:crypto";
import { dbRequest, supabaseConfigured } from "@/lib/server/supabase";

const memory = new Map<string, number[]>();

function requestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function hashedKey(request: Request, action: string) {
  const salt = process.env.RATE_LIMIT_SALT || process.env.ADMIN_SESSION_SECRET || "aluneri";
  return createHash("sha256").update(`${salt}:${action}:${requestIp(request)}`).digest("hex");
}

function memoryCheck(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const previous = (memory.get(key) || []).filter((time) => now - time < windowMs);
  if (previous.length >= max) return false;
  previous.push(now);
  memory.set(key, previous);
  return true;
}

export async function checkRateLimit(request: Request, action: string, max: number, windowMs: number) {
  const keyHash = hashedKey(request, action);
  if (!supabaseConfigured()) {
    return { allowed: memoryCheck(`${action}:${keyHash}`, max, windowMs), keyHash };
  }

  const since = new Date(Date.now() - windowMs).toISOString();
  const rows = await dbRequest<Array<{ id: string }>>(
    `rate_events?select=id&action=eq.${encodeURIComponent(action)}&key_hash=eq.${keyHash}&created_at=gte.${encodeURIComponent(since)}&limit=${max}`,
    { cache: "no-store" },
  );
  if (rows.length >= max) return { allowed: false, keyHash };

  await dbRequest("rate_events", {
    method: "POST",
    body: { action, key_hash: keyHash },
    prefer: "return=minimal",
    cache: "no-store",
  });
  return { allowed: true, keyHash };
}
