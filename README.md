# Konbit Kreyòl · the game: KÒD LA

**Kòd La** ("the rope / the code" — working title, pending the native gate) — a text-and-voice video game set in the Haitian Revolution (1791–1804) that teaches two teenage heritage learners Haitian Kreyòl and history. Learning the language and the history is literally how the players win — Kreyòl is the code the enemy can't read, and the revolution runs on a group chat (yes, in 1791; nobody explains it). The core act is a spoken dispatch: record a Kreyòl voice message your brother has to genuinely understand to act on. Strictly co-op — two brothers, one rope, versus the French (and British, and Spanish) — with the adults in the game as GM and Cipher Office. « L'union fait la force. »

**Agents and contributors: start with [`00-START-HERE.md`](00-START-HERE.md)** — precedence, decisions of record, and the map of the working corpus (world/story, game systems, language program, laws, design constitution, engineering, build plan, family handbook).

Status: in build — the app lives in [`web/`](web/) (engine port, law lint + tests, voice-dispatch pipeline, Cipher Office queue; `npm run check` inside `web/`). Stack: Next.js on Vercel + Supabase (family-only; schema staged in [`supabase/migrations/`](supabase/migrations/), local dev store until the Supabase project exists). `konbit-kreyol-app-v6-4.html` is the archived course-app prototype whose engine (language gate, two-ledger SRS, co-op relay) is behavior-normative. Superseded brainstorm docs live in [`archive/`](archive/).

*Men anpil, chay pa lou.*
