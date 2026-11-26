import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() { const weekly = Array.from({length:7}, (_, i) => ({ label: new Date(Date.now() - (6-i)*86400000).toLocaleDateString("en-US", {weekday:"short"}), count: 0 })); return NextResponse.json({ dueCount: 0, reviewedToday: 0, totalReviews: 0, streak: 0, weekly, attempts: { total: 0, avgPercent: null, bestPercent: null, totalQuestionsAnswered: 0, totalQuestionsTotal: 0 }, recent: [], storage: "localStorage" }); }
