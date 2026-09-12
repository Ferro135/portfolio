import { clearAdminSession } from "@/lib/server/admin-auth";

export async function POST() {
  await clearAdminSession();
  return Response.json(
    { success: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
