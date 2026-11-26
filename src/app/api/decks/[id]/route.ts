import { NextResponse } from "next/server";
export async function GET() { return NextResponse.json({ error: "Decks are browser-local in no-database mode. Open the deck from the same browser session." }, { status: 404 }); }
export async function DELETE() { return NextResponse.json({ ok: true, storage: "localStorage" }); }
