import { NextResponse } from "next/server";
import { generatePlan } from "@/lib/generator";
import { aiEnabled } from "@/lib/gemini";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(req: Request) { let body: { examName?: string; daysLeft?: number; dueToday?: number; cardsTotal?: number; reviewedToday?: number; quizAvg?: number | null; weakSubjects?: {subject:string; attempts:number; mastery:number; lapses:number; due:number}[] }; try { body = await req.json(); } catch { return NextResponse.json({error:"Invalid JSON"}, {status:400}); } const context = { daysLeft: Math.max(0, body.daysLeft ?? 45), examName: body.examName ?? "your exam", dueToday: body.dueToday ?? 0, cardsTotal: body.cardsTotal ?? 0, reviewedToday: body.reviewedToday ?? 0, streak: 0, quizAvg: body.quizAvg ?? null, weakSubjects: body.weakSubjects ?? [] }; const result = await generatePlan(context); return NextResponse.json({...context, ...result, decks: [], quizAttempts: 0, aiEnabled: aiEnabled(), storage:"localStorage"}); }
