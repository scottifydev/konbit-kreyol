# KÒD LA — the app

Next.js app for the Konbit Kreyòl program. Working title **Kòd La** ("the code" — the cipher the enemy can't read; the rope reading was purged with the climb metaphor, 2026-07-11; pending Manman's pass like every Kreyòl string; the kid-facing logo falls back to **THE CODE** until certified).

Read `../00-START-HERE.md` first; the laws in `../04-laws.md` are enforced here by `npm run lint:laws` and the test suite.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # law lint + tests — every PR must pass
```

## What exists (build-plan issues 1–3 + the issue-5 pipeline core)

- **Engine** (`src/lib/engine/`): the flip gate (`taught`, strict `unit > tw`), the native gate (`resolveChrome` — unreviewed Kreyòl never renders to a boy), two-ledger Leitner SRS with the Tier-A trap annotated and tested, Kle-77 early receptive seeding, idempotent reactions, konbit streak/padon/relay with persistent tips, and the voice-dispatch resolver (double ledger write exactly once; garbles write nothing; no self-report path).
- **Data** (`src/data/`): scope (v6-4 items + the pending amendment batch), ui-strings (v7 copy rulings applied; every ht `needsReview:true`; retired coinages are `ht: null` open tickets), feed posts (p4/p5 review flags corrected), campaign chapters with binding history facts, missions.
- **Lint** (`lint/`, `scripts/lint-laws.mjs`): language lint (diacritics, scope tokens, known-unlawful tokens; case-sensitive proper-noun whitelist, change-controlled), copy lint (plumbing/jargon/fear/third-person), scope-coverage lint. Seeded violations are tested.
- **Screens**: profile doors (name + role only), the boy's front page (scoreboard header, 77-tick ruler, konbit strip, campaign strip), the dispatch composer/inbox (hold-to-record, pointer events, `touch-action:none`), the **Mòn battle** (`/play/[boy]/mon`: muster the leg → run voice-volleys → pass the word with a tip → take-the-position/marronage reveal, driven by the `09` co-op formula), and the **Cipher Office** (Manman's live review queue — certify/pull back).
- **API**: dispatch send → deliver → act-on-it check (answer never leaves the server) → double ledger credit + a listening-leg volley; repeat-free garble; the battle-resolve endpoint (`/api/mon`: deal/pass/marronage); GM certify endpoint that structurally cannot touch ledgers.

## Persistence

`LocalStore` (JSON under `web/.data/`, gitignored) is the **dev placeholder**. The production target is Supabase — schema ready in `../supabase/migrations/0001_init.sql`, adapter stub in `src/lib/store/supabase.ts`, blocked on the open gate (Scott creates the project). Swap happens behind the `Store` interface.

## What's deliberately absent

- Kreyòl anywhere the boys can see: every ht string awaits the Cipher Office; scene Kreyòl is open tickets. This is the law working, not a gap.
- ASR/any machine judgment of voice (voice law 3 — removed from the design).
- Real auth (Supabase gate), the ticket/diagnostic, Fil la / Fokis / Misyon screens, chapters 2–8 scenes (build-plan issues 1, 4, 6–13). The Mòn battle's recognition-leg volley content (scope-bank reviews) awaits Manman's lexicon pass; the voice-volley leg (dispatches) works now.
