# 07 · BUILD PLAN — issues, acceptance criteria, first playable

**One PR per issue. Every PR passes checklists a–f (`04-laws.md` §8). Chapter gating follows unit gates, never the calendar. Do not build past an open human gate (`00` §5).**

---

## Issues

1. **Scaffold** — Next.js on Vercel; Supabase project: schema migration (`06` §2), family-only auth, RLS policies, profile doors (boys + adults), design tokens from `05` §2 hex-for-hex, scoreboard header pattern.
   **AC:** gate + masthead render all-English at Unit 1 on PC and phone; tokens match; a boy session cannot write another profile's rows (RLS test); no public signup path.

2. **Language gate + CI lint** — port gate helpers (`06` §4); implement the full lint suite (`04` §9).
   **AC:** headless test proves zero Kreyòl chrome at U1 and exact U1-vocab flips at U2; seeded violations (Kreyòl literal in a template, `§` in kid chrome, unlawful tw, fear word, third-person-about-the-kid, unreviewed ht rendering) each fail the build; whitelist changes require a diff to `04-laws.md`.

3. **SRS engine** — two ledgers in Postgres, Leitner 1/3/7/16, tier seeding (A → 7-day box; **do not "fix" the indexing** — `06` §5.1), derived mastery, Kle-77 early receptive seeding, dispatch evidence events (sender prod / receiver rec).
   **AC:** unit tests on promote/demote/derive and on dispatch double-writes (idempotent — one transmission credits once); Kle target reachable by U3 in simulation.

4. **The ticket** — diagnostic flow (aural + read-aloud slots from family audio), band → track sizing, copy per `04` Appendix A.
   **AC:** English chrome throughout; toast says "600-word track", never a band adjective; band visible only in the boy's own Settings.

5. **Voice dispatch pipeline** (the spine — build early) — phone recorder (hold-to-record per `05` §11) → Storage upload → delivery → inbox playback → act-on-it check → double ledger write → garbled/retry state → adult voice replies + commendations.
   **AC:** a dispatch recorded on one phone is actionable on the other within a minute; failed comprehension renders the garbled state with free retry and writes no false evidence; **no self-report path credits a ledger**; audio is inaccessible without a family session (signed URLs only); adult reply audio attaches to the dispatch thread.

6. **Scene engine** — scene-graph renderer (second-person text, choices, checks), glossed-Kreyòl content class, `needsReview` filtering, enemy-intel message type, anthem-drop milestone hook, campaign map strip.
   **AC:** a seeded unreviewed string never renders in a boy-profile build; history checks route as bonus, never gate; enemy memos pass the copy lint.

7. **Chapter 1 vertical slice** — Soulèvman 1791 (naming per Scott's open gate): feed dispatches, war college (Fokis), dispatch drills (Pwodiksyon), at least one real brother-to-brother voice dispatch, first battle (relay + tips + marronage failure state), milestone card + Ch1 anthem slot.
   **AC:** full 30-min loop playable end-to-end by both profiles — PC loop + phone voice surface; every string passes lint; both boys' state persists and survives sign-out/sign-in.

8. **Konbit layer** — shared streak, padon, motto surfaces (« L'union fait la force » + « Men anpil, chay pa lou »), konbit board per copy law 3.
   **AC:** no comparable per-brother numbers on any shared surface (headless DOM assertion); streak survives either-boy play; padons finite and counted.

9. **GM console** — template-first dispatch composer, Cipher Office queue (certify/edit/bounce), voice-feedback desk, commendations, async event scheduler.
   **AC:** a Manman-certified dispatch reaches the boys' feed; an uncertified one never renders in a boy build; her own authored Kreyòl auto-certifies; any other adult's queues; **no GM action mutates any ledger** (schema + headless assertion); events land only at session/scene boundaries.

10. **Misyon Fanmi** — poster, commendations from the adult door, printable **parent brief** (the relocated error-response rules live here), Anrejistrè family capture → Storage.
    **AC:** parent brief prints; kid poster carries only the one-line role note; captured audio tags to item ids.

11. **Chapters 2–8 scaffolding** — milestone cards + battle banks per unit map; scene stubs with history checks as bonus routes; signature-dispatch slots per `01` §3.
    **AC:** chapter gating follows unit gates (never calendar); every fact matches `01` §4; flagged spellings render only after the reviewer picks.

12. **Media ladder + anthems + capstone flow** — link-don't-host, rung unlocks (no padlock glyphs), anthem vetting queue + milestone drop flow, Sixto opt-in framing, Ch8 lodyans event flow (= independence celebration + credits beat).
    **AC:** no media file hosted; unvetted anthem never renders to a boy; Ti Sentaniz behind opt-in.

13. **Memwa flashbacks** — opt-in framework; **fact-verification pass (like `01`'s) required before any flashback scene ships**; Grann-testimony delivery.
    **AC:** opt-in flag respected per family setting; unverified scenes cannot be enabled.

14. **TTS bench (optional, last)** — local eval of jsbeaudry/haitian_creole_tts_11K, sesame-creole-tts-11k, facebook/mms-tts-hat as a labeled "vwa robo" fallback; report to Scott before wiring anything. **ASR is out of the design entirely — do not bench, do not wire.**

## Progress & critical path (2026-07-11)

**Shipped (the non-content-gated skeleton is complete — the daily loop runs end to end in English chrome, lighting up as Manman certifies content):**
- **Engine:** gate helpers, two-ledger SRS + gentle 2-miss demotion, the `09` co-op battle formula (`positionState`/`dealLeg`/`landVolley`/`passTheWord`, marronage), Kle-77 seeding, idempotent reactions. Law lint + **58 tests**; `npm run check` + `npm run build` green.
- **Family-only auth (issue 1):** the gate is the sign-in — per-person passphrase → signed httpOnly session; middleware protects every route; no signup path; Leave/logout in Settings. *Activates on prod once Scott sets `AUTH_SECRET` + `AUTH_PASS_*` and redeploys.*
- **The ticket (issue 4):** first-run Cipher Office intake → provisional track (Moderate ~450) + Kle-77 Tier-A seeding + `diagDone`; the describe-the-camp production probe records now; aural/read-aloud probes show "coming" pending Manman.
- **Daily-loop screens:** front page → **Fil la** (feed = receptive SRS in the scroll; tap-gloss, hold-for-English, "Got it" → idempotent rec review) → **dispatch** (the voice spine) → **Mòn battle** (voice-volley leg → pass the word → take-the-position/marronage) → **Settings** (Pro mode, "stays in the family" export, Leave).
- **Adult side:** the Cipher Office / GM certify (no ledger write path), the campaign map. Supabase backend provisioned; SupabaseStore active when env is set; production live at `konbit-kreyol.vercel.app`.

**Still content-gated (build the frame only after the content clears Manman):** **Fokis** (no grammar bank exists; grammar examples are Kreyòl → Manman-gated), Fil la's recognition-leg reviews on the scope bank, chapters 2–8 scenes, missions with Kreyòl.

**The critical path to first-playable is now mostly human gates, not code:**
1. **Manman's item-bank lexicon pass** (`08` §4) — THE blocker. Until the scope bank is native-reviewed, no recognition-leg review content (Fil la, Fokis, the battle's recognition leg, the full daily loop) can render Kreyòl to the boys. The voice-volley path works today because dispatch content is separately gated. *Everything downstream waits on this.*
2. **Family reference-audio session** (`08` §5, 90-min floor) — unblocks the ticket's aural probe and all listening content. Until it happens, audio slots honestly say "coming."
3. **Scott decisions:** the boy sign-in mechanism (issue 1 — must not be a friction wall, must not be shared-password theater) + a Supabase email provider, both needed before family-only auth can ship; battle-constant calibration (`09` §11.4); the Chapter-1 name; the error-response one-pager sign-off.

**Buildable now without a gate (English-chrome scaffolding that lights up when the gates clear):** the ticket flow shell (bands provisional until scored), Fil la / Fokis screen frames, family-only auth scaffolding (behind a flag until Scott's email + mechanism decision). These render gated content behind the Cipher Office, so they are safe to build ahead.

## Definition of first playable

Issues 1–7 merged with all checklists green: a fresh profile can punch the ticket, play a full Chapter-1 day including **one real voice dispatch phone-to-phone**, lose a battle to the mountains, and come back tomorrow — with zero unreviewed Kreyòl rendered, zero scary word on screen, and zero machine judgment of anyone's voice.

## Standing rules for every PR

- Checklists a–f from `04-laws.md` §8 in the PR description, each item checked or N/A'd with a reason.
- New/changed ht strings listed with their computed tw and `needsReview:true` — the Manman queue grows in the PR, never around it.
- When a question needs family input (Kreyòl, register, naming, opt-ins), surface it in the PR — don't guess.
- No PR builds past an open human gate in `00` §5.
