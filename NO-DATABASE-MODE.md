# ScholarAI — No Database Mode

- Database packages and Drizzle configuration have been removed.
- No PostgreSQL, Supabase, or external database connection is required.
- `/api/health` reports database-free mode.
- AI generation continues to use server-side Gemini API routes. Set `GEMINI_API_KEY` in Netlify environment variables.
- Browser `localStorage` is the intended persistence layer for user-specific settings, quiz results, decks, and study progress.
- `localStorage` is device/browser-specific and is not secure account storage or cross-device sync.
- Some former database-backed dashboard/deck analytics now return empty/demo values until the related UI flows are fully moved to browser storage. Do not present these as synced or durable cloud records.
