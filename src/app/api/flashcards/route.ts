import { NextResponse } from "next/server";
import { FLASHCARDS } from "@/lib/content";
export const dynamic = "force-dynamic";
export async function GET() { return NextResponse.json({ cards: FLASHCARDS.map((c, i) => ({ id: i + 1, subject: c.subject, front: c.front, back: c.back, state: null })), storage: "localStorage" }); }
