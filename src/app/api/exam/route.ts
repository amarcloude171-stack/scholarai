import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() { return NextResponse.json({ exam: null, storage: "localStorage" }); }
export async function PUT(req: Request) { let body: { name?: string; date?: string }; try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); } if (!body.date || !/^\\d{4}-\\d{2}-\\d{2}$/.test(body.date)) return NextResponse.json({ error: "A valid date is required" }, { status: 400 }); return NextResponse.json({ exam: { name: (body.name || "My exam").slice(0,80), date: body.date }, storage: "localStorage", note: "Save this result in browser localStorage." }); }
