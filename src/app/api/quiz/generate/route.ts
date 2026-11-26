import { NextResponse } from "next/server";
import { generateQuizAI } from "@/lib/generator";
import { aiEnabled } from "@/lib/gemini";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function POST(req: Request) {
  let body: { cards?: {front:string;back:string;subject:string}[]; deckTitle?: string; subject?: string; count?: number };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }
  const cards = Array.isArray(body.cards) ? body.cards.slice(0,100) : [];
  if (cards.length < 2) return NextResponse.json({ error: "Send at least two cards from a deck saved in this browser." }, { status: 422 });
  try {
    const result = await generateQuizAI({ cards, count: Math.max(3, Math.min(20, Math.round(Number(body.count) || 10))), deckTitle: body.deckTitle ?? "My AI deck", subject: body.subject ?? cards[0]?.subject ?? "General" });
    return NextResponse.json({ deckTitle: body.deckTitle ?? "My AI deck", deckId: "local", questions: result.questions, generatedBy: result.generatedBy, warning: result.warning, aiEnabled: aiEnabled(), storage: "localStorage" });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Quiz generation failed." }, { status: 500 });
  }
}
