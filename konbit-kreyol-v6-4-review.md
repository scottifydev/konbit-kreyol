# KONBIT KREYÒL — v6-4 Engineering Review (traps and required fixes)
**Findings from a full review of `konbit-kreyol-app-v6-4.html` against the HANDOFF, master spec v2.2, and design constitution v6 (2026-07-10). The v6-4 engine (gate semantics, SRS, co-op state) is behavior-normative for any new build — carry these findings, don't rediscover them.**

## What is correct and must be preserved byte-for-byte in spirit
- `taught(tw)` at line 536 implements the strict law correctly: `tw===8 ? unit>=8 : unit>tw`. The `>=` bug the handoff warns about is NOT present. Never reintroduce it.
- All chrome routes through `T()`/`Tt()`/`gLbl()`/`tagT()`/`unitTitle()`; no ungated Kreyòl literals in chrome templates (the gate motto and Mòn proverb are quoted oral literature with `data-en`, which rule 4 permits).
- Pre-Unit-1 surfaces (gate, ticket/diagnostic) are English-chrome; unit titles bilingual until their unit completes; `.gloss` (tap = meaning) vs `.flipnew` (newly flipped chrome) de-conflation; long-press `data-en` reveal; pointer events; diagnostic's 4-option logged exception.
- Two-ledger Leitner engine (`review`, `mastery`, `seedTiers`, derived mastery states), konbit streak/padon logic, mandatory-tip relay flow.

## THE TRAP — do not "fix" Tier-A seeding
HANDOFF §5 lists "Tier-A seeds to box 2 of 4 → spec wants box 3" as a prototype delta. **That row is an indexing misread.** The code (`seedTiers`, line 517) sets `box=2` in a 0-indexed array over `INTERVALS=[1,3,7,16]` — index 2 IS the 7-day box, i.e. the spec's 1-indexed "box 3". The code already complies with spec §6. Bumping it to index 3 (16-day) would introduce the very bug the delta row imagines it's fixing. Annotate, don't change.

## Language-law gaps (fixed on paper by the v7 overhaul §3 — implement accordingly)
1. **Surface-name words aren't in ITEMS**, so their tw values (fil/fokis/mòn/pwodiksyon/misyon/anrejistre/kle at tw 1–2) don't derive — and spec §9's own lint rule ("UI string whose words never appear in scope = build error") would fail the reference implementation. Fix = the v7 scope amendment (adds the name-words + spec-§4 U1 app verbs/time words), not a whitelist.
2. **Unlawful tw values found:** microdone tw 5 (derives to 2), pwomode tw 6 (derives to 8), Chat/Slang tags tw 1 (derive to 8), step_fil tw 4 (reyaksyon unscoped → 8; no derivational credit from reyaji), mission_done/micro_stamp tw 1 (misyon/mikwo unscoped pre-amendment).
3. **Runtime lint whitelist violates its own change-control rule:** `lodyans`, `vwadyo`, `kapstòn` are not proper nouns, and there's a second undeclared homograph skip-list hardcoded in the lint (`a, la, an, san, men, non, pa, ta, bay, band, plate`). The CI lint (issue 12) must not inherit either without a recorded amendment. Also: the runtime lint only walks `#app` — **toasts bypass it** (e.g. "Padon used…" renders the scope word `padon` in chrome during U1). CI lint must cover toast strings and `title=` attributes.
4. **Kle 77 target is unreachable as modeled:** spec requires all 77 receptively solid by end of Unit 3, but Kle items are assigned to U4–U6 (ap, dwe, te, ta…) and both `dueItems()` and SRS entry filter on `i.u <= S.unit`. Flood-before-focus is the sanctioned fix: Kle items must be receptively seedable/reviewable from U1 regardless of teaching unit. Needs a ruling before the SRS/feed issues are built.
5. **Content-governance gaps:** slang post p4 and register post p5 are Claude-authored register claims marked `needsReview:false` — should be true unless already native-verified; production prompt "Louvri dlo a" is a family-idiolect question ("louvri tiyo a"?); prompt 4 uses `legim`, absent from ITEMS.

## Behavior bugs to fix in any new build
- **Reaction/Got-it handlers are not idempotent** (lines ~1044–1048): re-clicking a reacted post increments the daily counter and XP again; repeat "Konprann ✓" double-writes receptive reviews. One post spam-clicked 3× completes the feed.
- **`touch-action:none` missing** on the hold-to-record button despite HANDOFF issue-7 naming it (pointercancel is handled, so it's touch-device risk only).
- **Chalk `.hit`/`.miss` classes are defined but never applied** by any answer path — honestly documented in the deltas table, but the non-punitive circle/strike is constitution-load-bearing; wire it.
- **Fokis miss feedback** says "Ear says: <right answer>" on a MISS — credits the ear with the answer the ear just missed; see v7 overhaul copy ruling ("Close — the rule: …").
- **Mission stars have no role gate** — the boys can tap "Manman's rating" themselves; either enforce or label honestly (v7 ruling: "Manman's stars — hand her the mouse").
- Stale header comment says "v6.1" in the v6-4 file; storage key is versioned (`konbit-kreyol-v6-4`) — new builds bump the key.

## Design-constitution drift found in v6-4 (resolved by the v7 re-cut)
- `.stamp` rotates -1.5° — violates the constitution's own decorative-rotation ban.
- `.qp` sets Kreyòl quiz prompts in the display face — violates "display never sets Kreyòl body".
- 🔒 emoji in dashboard chrome (media ladder) — violates the chrome-emoji ban.
- Opacity tints (`.opt.miss` .75, `:disabled` .4) and `filter:brightness` hover vs. the one-value-per-hue law; ~6 tokens (bone/rule/dim/slate tints) exist outside the constitution's enumerated palette — the v7 token set legalizes and enumerates them.
- Masthead band says "Week N" — program is units-not-weeks.

## Doc-level notes
- Spec v2.2 §9 still contains the superseded `currentUnit >= taughtWeek` semantics and day-1 product-name Kreyòl; the HANDOFF overrides both, but patch the spec text — this exact bug "burned us three times."
- The HANDOFF references docs not present in this repo (language audit, corpus findings, pedagogy audit, red team, archived mockups). Build from what's here; flag if one is genuinely needed.
