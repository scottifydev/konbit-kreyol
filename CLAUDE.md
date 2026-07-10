# Konbit Kreyòl — operating rules for Claude Code

Text-based video game set in the Haitian Revolution that teaches two teenage heritage learners (Leo & Isaac) Haitian Kreyòl + history. Local-first, family-embedded, co-op only.

**Start every task by reading `konbit-kreyol-CLOUD-HANDOFF.md` — it is the entry point and defines document precedence, the game design, and the build plan.**

## Hard rules (never violate; full detail in the handoff)
1. **The language law** (`konbit-kreyol-HANDOFF.md` §3, amended by `konbit-kreyol-v7-overhaul.md` §3): chrome flips English→Kreyòl only via the gate helpers with *computed* tw values; strict `unit > tw` (never `>=` — that exact bug shipped once); zero Kreyòl literals in templates; every rendered Kreyòl string long-pressable to English.
2. **The native gate:** no Kreyòl string — chrome, scene text, feed post, coinage — reaches the boys without Manman's review. Claude coins zero words and zero slang. New/changed ht strings ship `needsReview:true` and are filtered from the boys' build.
3. **The copy law** (`konbit-kreyol-v7-overhaul.md` §1): kid surfaces are inviting, never scary — no spec citations, no engine jargon, no fear words, no per-brother comparisons, requirements enforced by buttons not parentheses, second person always.
4. **Co-op only:** the brothers never compete with each other; the enemy is the historical army. Failure = retreat to the mountains, retry tomorrow. No game-over, no ranking of brothers anywhere.
5. **Design law** (`konbit-kreyol-design-constitution-v6.md` re-cut by v7-overhaul §4): tokens hex-for-hex, no gradients/tints/rotation, non-punitive slate (circle the right answer, neutral strike, never red X), display face never sets Kreyòl body.
6. **History/sensitivity** (`konbit-kreyol-history-brief.md`): no gore or atrocity content; Vodou content family-opt-in only (Bwa Kayiman = documented history framing; Gran Bwa out by default); legend labeled as legend; the history brief's facts and spellings are binding.
7. **Do not "fix" Tier-A seeding** — see `konbit-kreyol-v6-4-review.md` (the HANDOFF delta row is an indexing misread; the code already matches spec).

## Engineering
- Port the engine (gate helpers, two-ledger Leitner SRS, relay/konbit state) from `konbit-kreyol-app-v6-4.html` with the fixes in `konbit-kreyol-v6-4-review.md`. That file is archived — never edit it.
- Stack: local-first Next.js/Node, file-based JSON persistence + 7-day backups (spec §10). Pointer events only; `touch-action:none` on hold-to-record.
- Every PR passes checklists a–e in the handoff §3 (language, copy, design, house rules, sensitivity). The CI lint (handoff §4) is not riggable: whitelist = proper nouns only, change-controlled.

## Humans in the loop
Manman reviews all Kreyòl; Scott decides the flagged open items (handoff §7). When a question needs family input, surface it in the PR — don't guess Kreyòl, don't guess register.
