export const dynamic = "force-dynamic";
export async function GET() {
  return Response.json({ ok: true, storage: "browser-localStorage", database: false, aiConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) });
}
