# Konbit Kreyòl — operating rules for Claude Code

Text-and-voice video game set in the Haitian Revolution that teaches two teenage heritage learners (Leo & Isaac) Haitian Kreyòl + history. Full-canon anachronism (the revolution has phones; the history stays factual). Voice dispatches between the brothers are the main mechanic. Family-embedded, co-op only. Stack: Next.js on Vercel + Supabase, family-only.

**Start every task by reading `00-START-HERE.md` — it is the entry point and defines document precedence, decisions of record, and open human gates. The full laws live in `04-laws.md`.**

## Hard rules (never violate; full detail in the corpus)
1. **The language law** (`04-laws.md` §1): chrome flips English→Kreyòl only via the gate helpers with *computed* tw values; strict `unit > tw` (never `>=` — that exact bug shipped once); zero Kreyòl literals in templates; every rendered Kreyòl string long-pressable to English.
2. **The native gate:** no Kreyòl string — chrome, scene text, feed post, dispatch template, coinage — reaches the boys without Manman's review. Claude coins zero words, zero slang, zero names. New/changed ht strings ship `needsReview:true` and are filtered from the boys' build.
3. **The copy law** (`04-laws.md` §2): kid surfaces are inviting, never scary — no spec citations, no engine jargon, no fear words, no per-brother comparisons, requirements enforced by buttons not parentheses, second person always. All game narration, dispatch prompts, and enemy memos are kid surfaces; the enemy is comic, never menacing.
4. **Co-op only:** the brothers never compete with each other; the enemy is the historical army. Failure = retreat to the mountains, retry tomorrow; a garbled dispatch blames the wire, never a boy. No game-over, no ranking of brothers anywhere.
5. **Voice laws** (`04-laws.md` §5): transmission is the grade; comprehension proven by action, never self-report; **no machine ever judges a boy's voice** (no ASR, period); boys' audio stays in the family's private bucket.
6. **GM laws** (`04-laws.md` §4): GM moves touch the narrative, never the mastery math (no write path to ledgers); adults are never the enemy mechanically; async only.
7. **Visual law — "Drapo Ginen"** (`05-art-direction-drapo-ginen.md`, owner pivot 2026-07-10 — the flat "Daylight Broadsheet" is SUPERSEDED): warm, saturated, textured, gold, Haitian-painting-grounded, Vodou-suffused, unflinching (Black Jacobins lens). One collapsed palette; five embeddable faces (Anton/Literata/Fraunces/Plex Mono/Libre Caslon); one baked grain tile; gold/ember as ramps only. Kreyòl always renders in Literata on a scrim (never on texture), display face never sets Kreyòl body. The one retained rule: no generic AI slop, no sterile minimalism.
8. **History/sensitivity** (`01-world-and-story.md` + `05-art-direction-drapo-ginen.md` §2): facts and spellings binding; legend labeled as legend. Content gates LIFTED by the owner — Vodou/lwa wholeheartedly in, the terror and the Le Cap massacre in — governed by four guardrails: the **appropriation firewall** (fer découpé carries all repeated chrome; sacred vèvè/lwa/drapo only in rare Manman-reviewed ceremony), the **upright-subject** rule, the **RED/GREEN trauma-porn audit**, and the **comic-enemy firewall**. Claude coins/asserts nothing (no invented vèvè, no lwa-color-as-fact); Manman's gate covers Kreyòl AND every sacred naming.
9. **Do not "fix" Tier-A seeding** — `06-engineering.md` §5.1 (the old delta row is an indexing misread; the code already matches spec).

## Engineering
- The app lives in `web/` (working title KÒD LA — flagged for Manman like all Kreyòl). Run `npm run check` in `web/` before any commit: the law lint + test suite must pass.
- The engine (gate helpers, two-ledger Leitner SRS, relay/konbit state) is ported in `web/src/lib/engine/` from `konbit-kreyol-app-v6-4.html` with the traps in `06-engineering.md` §5 annotated and tested. The reference HTML is archived — never edit it.
- Stack: Next.js on Vercel; Supabase auth (family-only) + Postgres (RLS) + private Storage for audio; media linked, never hosted. Pointer events only; `touch-action:none` on hold-to-record.
- Every PR passes checklists a–f (`04-laws.md` §8). The CI lint (`04-laws.md` §9) is not riggable: whitelist = proper nouns only, change-controlled.

## Humans in the loop
Manman reviews all Kreyòl (her queue: `08-family-handbook.md` §4); Scott decides the flagged open items (`00-START-HERE.md` §5). When a question needs family input, surface it in the PR — don't guess Kreyòl, don't guess register, don't build past an open gate.
