import { cookies } from "next/headers";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";

const COOKIE_NAME = "nexora_admin_session";
const SESSION_SECONDS = 60 * 60 * 8;

function sessionSecret() { return process.env.ADMIN_SESSION_SECRET || ""; }
function sign(payload: string) { return createHmac("sha256", sessionSecret()).update(payload).digest("base64url"); }

export function adminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD_HASH?.startsWith("scrypt$") && sessionSecret().length >= 32);
}

export function verifyAdminPassword(password: string) {
  const encoded = process.env.ADMIN_PASSWORD_HASH || "";
  const [, salt, expected] = encoded.split("$");
  if (!salt || !expected || !password) return false;
  try {
    const derived = scryptSync(password, salt, 32).toString("hex");
    const left = Buffer.from(derived, "hex");
    const right = Buffer.from(expected, "hex");
    return left.length === right.length && timingSafeEqual(left, right);
  } catch { return false; }
}

export function makeAdminPasswordHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `scrypt$${salt}$${scryptSync(password, salt, 32).toString("hex")}`;
}

export async function setAdminSession() {
  if (!adminAuthConfigured()) throw new Error("Admin auth not configured");
  const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = Buffer.from(JSON.stringify({ exp, role: "admin" })).toString("base64url");
  const token = `${payload}.${sign(payload)}`;
  const store = await cookies();
  store.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: SESSION_SECONDS });
}

export async function clearAdminSession() { const store = await cookies(); store.set(COOKIE_NAME, "", { path: "/", maxAge: 0 }); }
export async function isAdminAuthenticated() {
  if (!adminAuthConfigured()) return false;
  const store = await cookies(); const token = store.get(COOKIE_NAME)?.value; if (!token) return false;
  const [payload, signature] = token.split("."); if (!payload || !signature) return false;
  const expected = sign(payload); const a = Buffer.from(signature); const b = Buffer.from(expected); if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try { const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp?: number; role?: string }; return parsed.role === "admin" && typeof parsed.exp === "number" && parsed.exp > Math.floor(Date.now() / 1000); } catch { return false; }
}
export async function requireAdmin() { if (!(await isAdminAuthenticated())) redirect("/admin/login"); }
