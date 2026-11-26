export const dynamic = "force-dynamic";
export async function GET() { return new Response("Media is not stored on a server in no-database mode. Keep it in browser storage or upload it again.", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } }); }
