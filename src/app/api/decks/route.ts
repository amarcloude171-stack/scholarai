import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() { return NextResponse.json({ decks: [], aiEnabled: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY), storage: "localStorage", note: "Generated decks are stored in this browser in no-database mode." }); }
