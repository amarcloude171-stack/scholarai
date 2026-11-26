import { NextResponse } from "next/server";
import { explainDoubt } from "@/lib/generator";
import { aiEnabled } from "@/lib/gemini";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function POST(req: Request) {
  let body: { question?: string; examName?: string; daysLeft?: number; cards?: {front:string;back:string;subject:string}[] };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }
  const question = (body.question ?? "").trim();
  if (question.length < 4) return NextResponse.json({ error: "Ask a fuller question." }, { status: 400 });
  if (question.length > 1200) return NextResponse.json({ error: "Keep the doubt under 1200 characters." }, { status: 400 });
  try {
    const result = await explainDoubt({ question, cards: Array.isArray(body.cards) ? body.cards.slice(0,40) : [], examName: body.examName ?? "your exam", daysLeft: Math.max(0, body.daysLeft ?? 45) });
    return NextResponse.json({ ...result, aiEnabled: aiEnabled(), storage: "localStorage" });
  } catch (err) {
    console.error("[explain] failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "The tutor is unavailable right now. Check your Gemini API key and try again." }, { status: 500 });
  }
}
