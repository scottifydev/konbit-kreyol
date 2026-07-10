# 06 · ENGINEERING — architecture, schemas, engine port, traps

**Stack decision of record (2026-07-10): Vercel + Supabase, phone + PC hybrid. The v6-4 reference implementation's engine is behavior-normative (port it, don't reinvent it) with the fixes in §5. Never edit `konbit-kreyol-app-v6-4.html`.**

---

## 1. Architecture

- **App:** Next.js on Vercel. One web app, two ergonomic modes: the **PC surface** (shared family computer — the full daily loop, battles, dashboard, capstone) and the **phone surface** (each boy's phone — Fil la, the dispatch composer/inbox, micro-missions; responsive/PWA-installable). Adult profiles get the **GM console** (usable on phone or PC).
- **Supabase:**
  - **Auth** — family-only. Adults: email magic link. Boys: simple boy-friendly sign-in on their own devices (device-remembered session; exact mechanism decided at build — must not be a friction wall for a 14-year-old, must not be shared-password theater). No public signup path; new members by adult invite only.
  - **Postgres** — all state (schema below), Row Level Security scoped to the family; boys can read shared surfaces and write only their own ledger events/dispatches; GM tables writable by adults only; **no write path from GM tables to ledger tables** (GM law 1 enforced by construction).
  - **Storage** — private buckets: `dispatches/` (boys' voice messages + adult voice replies), `family-audio/` (reference recordings by item id, Grann interview). No public URLs; signed access only; family can export and delete everything (**"stays in the family"** is the honest copy — see voice law 6).
  - **Realtime or polling** for dispatch delivery and feed updates; delivery within a minute is the AC, not instant push.
- **Media:** external media (Sixto, anthems, creators) linked/embedded from the family's own accounts — **never hosted, never uploaded**.
- **Export:** a family export button (full JSON + audio archive) replaces the retired 7-day local backup law; Supabase's own backups cover disaster recovery.
- **Dev panel:** all "Real build:" notes, feed-mix readout, sim-day controls, DRAFT toggle, lint buttons live behind a dev flag — never on kid surfaces.

## 2. Data model (Postgres; shapes carried from the file-based spec)

| Table / bucket | Contents |
|---|---|
| `profiles` | leo, isaac + adult profiles; role, band (per-boy, private), pwo-mode flag, code name (family-coined), settings |
| `scope_items` | lemma, gloss, domain, unit, tiers-per-child, productiveCore flag |
| `ui_strings` | `{ id, en, ht, tw (computed — see lint), needsReview }` |
| `ledger_events` / derived per-item state | two ledgers per item per boy: `rec` and `prod`, each `{box, due, history}`; mastery **derived, never stored** |
| `posts` | Fil la content: `{category, unit, difficulty, items[], audio?, needsReview, author}` |
| `grammar` | judgment tasks + labels (Fokis banks) |
| `kanpay` | chapters, milestones, scene graphs, history checks, anthem slots, enemy-intel beats; **every Kreyòl string carries `needsReview`** |
| `memwa` | flashback scenes, opt-in flagged, fact-verification status |
| `dispatches` | sender, receiver, prompt id, target items[], audio ref, status (`sent / delivered / acted / garbled`), check outcome, adult voice-reply refs, commendations |
| `gm_queue` | GM moves: authored dispatches/memos (with review status), scheduled events (ambush, Memwa unlock, anthem drop), commendations. **No foreign keys into ledger tables.** |
| `konbit` | shared streak, padon count, relay/battle state, tips |
| `missions` | Misyon Fanmi definitions, star records, mission log |
| `media` | links, difficulty tags, story keys, rung unlocks, anthem vetting status |
| Storage `dispatches/`, `family-audio/` | audio blobs, referenced by row ids |

## 3. Screens

1 Profile doors (boys + adults) · 2 Dashboard (front page: lead story, campaign strip, 77-tick ruler, konbit strip, index, pending-dispatch tray) · 3 Fil la · 4 Fokis (slate stage) · 5 Pwodiksyon / dispatch composer (PC + phone modes) · 6 Dispatch inbox (phone-first) · 7 Mòn (relay, mandatory tip, summit reveal, sunset variant) · 8 Misyon Fanmi (poster, commendations) · 9 Anrejistrè (family capture → Storage) · 10 Media library / anthems · 11 Settings (track, pwo mode, export, long-press toggle) · 12 GM console (adult-only: composer, Cipher Office queue, voice-feedback desk, commendations, event scheduler) · 13 Dev panel (flagged).

## 4. Engine port (from `konbit-kreyol-app-v6-4.html` — behavior-normative)

Port as shared client logic, byte-for-byte in spirit:
- **Gate helpers:** `taught(tw)` — `tw===8 ? unit>=8 : unit>tw` (v6-4 line 536 implements this correctly; the `>=` bug is NOT present there — never reintroduce it); `T()/Tt()/tagT()/unitTitle()/gLbl()`; zero ungated Kreyòl literals in chrome templates (the gate motto and Mòn proverb are quoted oral literature with `data-en`, which the law permits).
- **Two-ledger Leitner engine:** `review`, `mastery`, `seedTiers`, derived mastery states; intervals 1/3/7/16.
- **Konbit/relay state:** streak/padon logic, mandatory-tip relay flow.
- Pre-Unit-1 English chrome; bilingual unit titles; `.gloss` vs `.flipnew` de-conflation; long-press `data-en` reveal; pointer events; the diagnostic's logged 4-option exception.
- Extend (don't rewrite) for: dispatch evidence events (voice law 1), Kle-77 early receptive seeding (decision of record), adult profiles.

## 5. TRAPS — carried verbatim from the v6-4 engineering review

1. **Do not "fix" Tier-A seeding.** The old HANDOFF delta row ("Tier-A seeds to box 2 of 4 → spec wants box 3") is an **indexing misread**. `seedTiers` (v6-4 line 517) sets `box=2` in a **0-indexed** array over `INTERVALS=[1,3,7,16]` — index 2 IS the 7-day box, i.e. the spec's 1-indexed "box 3". The code already complies. Bumping it to index 3 (16-day) would introduce the very bug the delta row imagines it's fixing. Annotate, don't change.
2. **Reaction/Got-it handlers must be idempotent.** In v6-4 (~lines 1044–1048) re-clicking a reacted post increments the daily counter and XP again; repeat "Konprann ✓" double-writes receptive reviews; one post spam-clicked 3× completes the feed. Fix in the new build.
3. **`touch-action:none`** on the hold-to-record button (v6-4 omitted it; pointercancel was handled, so it was touch-device risk — on phones it's now mandatory).
4. **Chalk `.hit`/`.miss` classes were defined but never applied** by any answer path. The non-punitive circle-and-strike is constitution-load-bearing; wire it to **every** quiz answer path.
5. **Fokis miss feedback:** never "Ear says: <right answer>" on a miss (credits the ear with the answer it just missed). Ruling: **"Close — the rule: plain consonant → la."**
6. **Pass-the-rope disabled until the tip box has text** (enforcement by button).
7. **Mission stars need a real role gate** — solved structurally now: commendations issue from an adult's logged-in door (GM console), not from a label on the boys' screen.
8. **Kle 77 reachability:** spec requires all 77 receptively solid by end of U3, but Kle items sit in U4–U6 and v6-4's `dueItems()`/SRS entry filter on `i.u <= unit`. Ruling in force: Kle items are receptively seedable/reviewable from U1 (flood-before-focus). Implement in the SRS issue.
9. **Lint inheritance:** the v6-4 runtime lint whitelist (`lodyans`, `vwadyo`, `kapstòn` — not proper nouns) and its undeclared homograph skip-list (`a, la, an, san, men, non, pa, ta, bay, band, plate`) are **not** inherited without a recorded amendment to `04-laws.md`. CI lint must cover toasts and `title=` attributes (v6-4's walked only `#app`).
10. **Content-governance holdovers:** v6-4 posts p4/p5 are Claude-authored register claims marked `needsReview:false` — must be true unless native-verified; production prompt "Louvri dlo a" is a family-idiolect question ("louvri tiyo a"?); prompt 4 uses `legim`, which enters scope only via the pending amendment.
11. Storage keys/versioning: new build uses its own versioned identifiers; nothing reads v6-4's localStorage.

## 6. House rules

Pointer events only · `touch-action:none` on hold-to-record · no 4-option select_one outside the logged diagnostic exception · no design-token drift · fixed shared-board row order stated in a code comment · every new/changed ht string ships `needsReview:true` and is filtered from boy-profile builds until certified.

## 7. CI

The lint spec lives in `04-laws.md` §9 (language lint, copy lint, scope-coverage lint, review-gate lint — each with a seeded-violation test). Plus: headless flip tests (zero Kreyòl chrome at U1; exact U1-vocab flips at U2), the no-comparable-numbers DOM assertion on shared surfaces, the GM-cannot-touch-ledgers assertion, and the unreviewed-string-never-renders test. CI runs on every PR; the whitelist file diff requirement makes rigging visible in review.
