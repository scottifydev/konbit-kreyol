# KONBIT KREYÒL — CLOUD AGENT HANDOFF (start here)
**You are picking up a fully-specified project: an 8-unit summer program that activates the latent Haitian Kreyòl of two heritage-learner brothers — now framed as a text-based video game set in the Haitian Revolution. This document is the entry point and the complete brief. Everything you need is in this repo.**

Handoff date: 2026-07-10 · Owner: Scott (scott@scottify.io) · Players: Leo (rising 9th) and Isaac (rising 10th) · Native-language gate: their mother ("Manman") · Prior implementer plan: "Ralph" issues (superseded by §6 below).

---

## 0. Read order and precedence

Where documents conflict, higher wins:

| # | File | Governs |
|---|---|---|
| 1 | `konbit-kreyol-CLOUD-HANDOFF.md` (this doc) | The game pivot, build plan, decisions of record |
| 2 | `konbit-kreyol-v7-overhaul.md` | Copy law, string rulings, language-law amendments, design re-cut |
| 3 | `konbit-kreyol-history-brief.md` | Verified history, legend-vs-documented flags, sensitivity rulings, sources |
| 4 | `konbit-kreyol-v6-4-review.md` | Engineering traps and required fixes found in the reference implementation |
| 5 | `konbit-kreyol-HANDOFF.md` | The original amendments doc — **§3 (the language law) is load-bearing and unamended except as v7-overhaul §3 states** |
| 6 | `konbit-kreyol-master-spec-v2.2.md` | Charter, pedagogy, units U0–U8, scope, mastery model, tech spec §10, exit criteria |
| 7 | `konbit-kreyol-design-constitution-v6.md` | Visual law, as re-cut by v7-overhaul §4 |
| ref | `konbit-kreyol-app-v6-4.html` | **Archived reference implementation — do not build from its skin, DO port its engine.** `taught()`/`T()`/gate helpers, two-ledger SRS, relay/konbit state are behavior-normative (with the §5 fixes). Open it in a browser to feel the loop. |

**The pedagogy is not up for renegotiation.** The game is a motivational shell around a proven design: two-ledger SRS, native review gate, family-embedded missions, co-op-only mechanics, honest mastery. If a game idea fights one of those, the game idea loses.

---

## 1. The pivot (owner directive, 2026-07-10)

> "It's a text-based video game that puts the players in the Haitian Revolution (also with maybe flashbacks to earlier bits) and they need to learn Kreyòl and history to defeat the French (and British, and Spanish, etc.)."

Plus two earlier directives already synthesized into the docs: every word on screen must be **engaging and inviting, never scary** (→ the Copy Law, v7-overhaul §1), and the UI is re-cut as **"Daylight Broadsheet"** (v7-overhaul §4) — which the pivot strengthens: dispatches, proclamations, and war bulletins are natively broadsheet forms. « L'union fait la force » anchors the co-op layer.

## 2. Game design brief

### 2.1 Premise
Leo and Isaac play **two brothers — couriers and signal-runners in the revolutionary army, 1791–1804**. Messages, orders, songs, and proverbs move through them. The revolution runs on communication the enemy cannot read: **Kreyòl is the weapon**. Understanding it (recognition), speaking it (production), and knowing the history (strategy) are literally how battles are won. The fiction is second-person, present-tense, text-based ("A rider stops you at the ford. He speaks fast: « Kote w prale? »") with choices, checks, and battles.

### 2.2 The campaign — 8 chapters = the 8 units
Each unit's theme, vocabulary scope, grammar, and gate (spec §4) stay exactly as specced; the chapter wraps them in the milestone. All facts, spellings, and legend-flags come from `konbit-kreyol-history-brief.md` — **it is binding** (e.g., Capois' cry is « An avan! An avan! », never "the bullets are dust"; Catherine Flon is "the story goes").

| Ch/Unit | Milestone | Year | Enemy/tension | Language theme (unchanged from spec) |
|---|---|---|---|---|
| 1 | Soulèvman an (Bwa Kayiman — see opt-in below) | 1791 | The colonial order | Dekode — orthography, greetings, pronouns |
| 2 | Libète pwoklame | 1793 | Shifting alliances — Spain, then the side that ends slavery | Fanmi & Kay |
| 3 | The British sent home | 1798 | The British invasion | Manje (provisioning the army: kitchen orders!) |
| 4 | Ravin Koulèv | 1802 | Napoleon's expedition lands | Telefòn/WhatsApp → **vwadyo = voice dispatches** |
| 5 | Lakrèt-a-Pyewo | 1802 | The siege | Tan Pase — narrating what happened (war stories) |
| 6 | Drapo a — Akayè | 1803 | Unity or defeat | Santiman — the unity chapter; « L'union fait la force » |
| 7 | Vètyè | 1803 | Rochambeau's last stand | Nouvèl — reading the war news |
| 8 | 1804 — Endepandans | 1804 | Keeping the freedom | Kapstòn — the family lodyans **is** the independence celebration |

The unit-domain fits are real, not forced: kitchen commands provision an army; voice notes are dispatches; past tense narrates battles; news summarizes the war; the capstone family event doubles as January 1, 1804.

### 2.3 Core loop — the existing screens ARE the game verbs
The daily 30-minute loop (spec §5) survives intact; each activity gets a diegetic frame. **Surface names (Fil la, Fokis, Pwodiksyon, Mòn, Misyon, Anrejistrè) stay** — they're taught vocabulary now (v7-overhaul §3.1); the game framing is narrative dressing around them, not renaming.

| Activity | Game frame | Mechanics (unchanged core) |
|---|---|---|
| **Fil la** (feed) | The dispatch wire — messages from camp, family, the front | SRS reviews hidden in the scroll; 60/25/15 composer; reactions/Konprann write receptive reviews; due posts marked by the quiet sun dot |
| **Fokis** (slate) | The war college — an officer chalks the day's code on the board | Judgment-first grammar; additive chalk correction (circle/strike, never red X) |
| **Pwodiksyon** (recorder) | Deliver the message — passwords at checkpoints, orders read aloud, rallying lines | Hold-to-record vs family reference audio; production ledger |
| **Mòn relay** (battles) | The chapter's engagement — each brother runs one leg of the battle; volleys = recognition/form checks from HIS due queue; combined score vs the threshold takes the position | Mandatory tip at handoff = passing the rope through the lines; XP effort-only; summit threshold keys off evidence-weighted mastery (spec §6) |
| **Misyon Fanmi** | Orders from the General's council (the family) | Manman's stars gate missions; Grann interview = "record the elder's testimony" (becomes Ch5 listening) |
| **Dashboard** | The front page of the revolution's broadsheet: campaign map strip (8 milestones, current one live), Kle 77 tick-ruler, konbit board | Front-page IA per constitution Cycle 4 + v7 grafts |

### 2.4 The co-op law inside a war game (critical)
- **The brothers NEVER oppose each other.** The enemy is the historical army; a shared enemy strengthens the co-op frame. No PvP, no versus mode, no per-brother comparison on shared surfaces (Copy Law 3). Both summit together or the campaign waits — **"L'union fait la force" is the game's thesis**, rendered on the konbit surfaces paired with « Men anpil, chay pa lou » (history brief: lead with the French form — it's the coat-of-arms phrasing every Haitian recognizes).
- **Failure = marronage, not game-over.** A lost battle retreats to the mountains and returns tomorrow with each other's tips — which is historically how the revolution actually fought (and keeps the sunset-panorama, nobody-loses semantics; « Dèyè mòn gen mòn »). No lives, no game-over screen, no lost progress, ever.
- Konbit streak survives if either brother plays; padon repairs remain finite and honest.

### 2.5 Knowledge as the weapon — check types
1. **Recognition checks** (rec ledger): read the intercepted order, match the overheard word — the game never blocks on words not yet taught or due.
2. **Production checks** (prod ledger): say the password, record the rally line — self-compare against family audio; ASR, if ever wired, is echo-only, never grading (spec §8).
3. **History checks**: milestone facts earn tactical choices ("You know Rochambeau's men hold the ravine — go around"). History checks are **bonus routes, never gates**: a boy who missed the fact still wins by language; knowing history makes it cooler, not possible.
4. **Judgment checks** (Fokis): grammar-by-ear volleys during battles.
**Game layer ≠ learning layer (spec principle 7):** narrative never gates SRS mastery and mastery displays never lie for drama. XP = effort; battle thresholds key off evidence-weighted items exactly as spec §6 defines.

### 2.6 Flashbacks ("Memwa" episodes — owner's "earlier bits")
Optional interlude scenes unlocked between chapters: Ayiti/Taíno and Anacaona (pre-1503); marronage — the mountain communities that invented the game's own retreat mechanic. **Not yet fact-checked** — run a verification pass (like `konbit-kreyol-history-brief.md`) before writing any flashback scene. Makandal and Bwa Kayiman ritual content sit behind the same family opt-in (below).

### 2.7 Content red lines (binding — from the history brief's sensitivity rulings)
- **No gore, no atrocity content.** The 1804 massacre and vengeance rhetoric stay out; heroic-stand framing throughout; enemies are defeated, retreated, sent home — never slaughtered on screen.
- **Vodou is family-opt-in, never default** (constitution Cycle 2 extended): Gran Bwa (a lwa) is out unless the family opts in; **Bwa Kayiman renders as documented history** (the secret meeting that sparked the uprising), ritual specifics omitted; Manman gets the explicit toggle; fallback chapter name "Soulèvman 1791".
- **Legend labeled as legend** in-game: "the story goes…" for Flon's needle and Rochambeau's salute.
- **French appears only as historical artifact** (the motto, names); the game teaches Kreyòl; capstone French asides belong to Manman.
- **Register:** dry, wry, heroic-facts. The game must survive the "skeptical 15-year-old over his brother's shoulder" test AND the Manman veto.

### 2.8 Scene-text language rules (how narrative obeys the language law)
Scene narration is a **content class**, governed like feed posts (HANDOFF §3.4), NOT chrome:
- Narration is English by default (comprehension scaffolding), with embedded Kreyòl dialogue/quotes as glossed content: every Kreyòl word ∈ scope ∪ glossed (`data-gloss` tap affordance), long-press reveals English.
- Chrome around scenes (buttons, headers, HUD) routes through the gate helpers with lawful tw values — zero Kreyòl literals in templates (HANDOFF §3.4).
- **Every Claude-drafted Kreyòl string ships `needsReview:true` and is filtered from the boys' build until Manman passes it** (spec gate 1). Claude coins zero words and zero slang; doubtful vocabulary ships English with a Manman ticket (v7-overhaul §3.4).
- Kreyòl density in scenes rises with the units (flood-before-focus): by Ch7–8, dialogue is mostly Kreyòl with English long-press as the escape hatch.

## 3. The laws (checklists on every PR)
a) **Language law** — HANDOFF §3 + v7-overhaul §3 (strict `unit > tw` gate; tw computed, never assigned; exact-id derivation; scope amendment §3.1; Manman queue; lint not riggable).
b) **Copy law** — v7-overhaul §1 (and §2's string rulings where the surface carries over). All game narration counts as kid-surface text.
c) **Design** — constitution v6 as re-cut by v7-overhaul §4 (tokens, type, border budget, scoreboard header rhythm, per-screen paint-or-fail checklist, non-punitive slate).
d) **House rules** — pointer events only; no 4-option select_one outside the logged diagnostic exception; no token drift; `touch-action:none` on hold-to-record.
e) **History/sensitivity** — history brief rulings (§2.7 above).

## 4. Engineering ground rules
- **Stack (spec §10):** local-first Next.js/Node on the shared family PC; file-based JSON persistence with 7-day rolling backups; localStorage = cache only; no auth, profile picker; HTML5 audio; external media linked, never hosted.
- **Port, don't reinvent:** `taught()/T()/Tt()/tagT()/unitTitle()/gLbl()`, the Leitner two-ledger engine, mastery derivation, konbit/relay state — lift from `konbit-kreyol-app-v6-4.html` with the fixes in `konbit-kreyol-v6-4-review.md`. **Do not "fix" Tier-A seeding** (the HANDOFF §5 delta row is a 0-vs-1-indexing misread; `box=2` already equals the spec's box 3).
- **Data files (spec §10) extended for the game:** add `kanpay.json` (chapters, milestones, scene graphs, history checks) and `memwa.json` (flashbacks, opt-in flagged). Scene schema must carry `needsReview` per Kreyòl string.
- **Kle 77 ruling needed before the SRS issue:** spec demands all 77 receptively solid by end of U3, but v6-4 gates SRS entry on `item.u <= unit` while Kle items sit in U4–U6. Implement early receptive seeding for Kle items (flood-before-focus sanctions it) — confirm with Scott in the PR description.
- **CI lint (highest-leverage issue):** tokenize template literals; diacritic-bearing or scope-listed tokens outside gate helpers/content data fail the build; whitelist = proper nouns only, change-controlled (Revolution people/places incoming; `lodyans/vwadyo/kapstòn` currently unlawful — resolve by scope-add or rename); plus the copy lint (`§`, "Real build", banned jargon, third-person-about-the-kid) covering toasts and title attributes.

## 5. What "inviting, not scary" means here (the owner's core demand)
Read v7-overhaul §1–§2 in full before writing a single string. The shorthand: the app never files, grades, ranks, cites statutes at, or pre-warns the kid; requirements live in disabled buttons, not parentheses; misses are described by what happens next; individual numbers stay on individual surfaces; "Nobody loses" is said once and demonstrated everywhere. The game amplifies the stakes-without-fear trick: the *revolution* has stakes; the *boys* only ever have tomorrow.

## 6. Build plan (one PR per issue; checklists a–e on every PR)
1. **Scaffold** — Next.js local app, file persistence + backups, profile picker, design tokens from v7-overhaul §4.2 hex-for-hex. AC: gate + masthead render all-English at Unit 1; tokens match; scoreboard header pattern in place.
2. **Language gate + CI lint** — port gate helpers; implement §4 lint (language + copy). AC: headless test proves zero Kreyòl chrome at U1, exact U1-vocab flips at U2; seeded violations (Kreyòl literal, `§` in chrome, unlawful tw) each fail the build.
3. **SRS engine** — two ledgers, Leitner 1/3/7/16, tier seeding (A→7-day box), derived mastery, Kle-77 early receptive seeding per §4 ruling. AC: unit tests on promote/demote/derive; Kle target reachable by U3 in simulation.
4. **The ticket** — diagnostic flow per spec §2 (aural + read-aloud slots), band → track sizing, copy per v7-overhaul §2. AC: English chrome throughout; toast says "600-word track", never a band adjective.
5. **Scene engine** — scene-graph renderer (second-person text, choices, checks), glossed-Kreyòl content class per §2.8, `needsReview` filtering, campaign map strip. AC: a seeded unreviewed string never renders in the boys' profile build.
6. **Chapter 1 vertical slice** — Soulèvman 1791: dispatches (Fil la), war college (Fokis), deliver-the-message (Pwodiksyon), first battle (relay + tips + marronage failure state), milestone card. AC: full 30-min loop playable end-to-end by both profiles; every string passes lint; both boys' state persists to files.
7. **Konbit layer** — shared streak, padon, motto surfaces (« L'union fait la force » + « Men anpil, chay pa lou »), konbit board per Copy Law 3. AC: no comparable per-brother numbers on any shared surface (headless DOM assertion).
8. **Misyon Fanmi** — poster, Manman's stars, printable **parent brief** (the relocated error-response rules live here), Anrejistrè family capture. AC: parent brief prints; kid poster carries only the one-line role note.
9. **Chapters 2–8 scaffolding** — milestone cards + battle banks per unit map; scene stubs with history checks as bonus routes. AC: chapter gating follows unit gates (spec §4), never calendar.
10. **Media ladder + capstone flow** — link-don't-host, rung unlocks, Sixto opt-in framing, Ch8 = lodyans event flow (= independence celebration).
11. **Memwa flashbacks** — opt-in framework + verification pass on flashback-era facts before any scene ships.
12. **TTS/ASR bench** — unchanged from original issue 13: bench locally (jsbeaudry/haitian_creole_tts_11K, sesame-creole-tts-11k, facebook/mms-tts-hat; Whisper fine-tune echo-only), report to Scott before wiring anything.

**Definition of done for the first playable:** issues 1–6 merged with all checklists green; a fresh profile can punch the ticket, play a full Chapter-1 day, lose a battle to the mountains, and come back tomorrow — with zero unreviewed Kreyòl rendered and zero scary word on screen.

## 7. Human gates (do not build past these without them)
- **Manman** reviews: every ht string (v7-overhaul §3.4 queue), the scope-amendment batch, campaign spellings (history-brief flags), all scene Kreyòl. Nothing Kreyòl reaches the boys unreviewed. Her word beats every reference, including these docs (family-idiolect rule, spec gate 2).
- **Scott** decides: Bwa Kayiman naming default (opt-in vs "Soulèvman 1791"), DUE-badge amendment sign-off, scope-amendment ratification into HANDOFF §3, error-response one-pager sign-off before Unit 1 (spec calls it the single most critical safeguard).
- Family records the reference audio (90-min session floor); the game's Pwodiksyon slots say "coming" until then — honestly.

## 8. Repo map
```
konbit-kreyol-CLOUD-HANDOFF.md        ← you are here (precedence 1)
konbit-kreyol-v7-overhaul.md          ← copy law · design re-cut · language amendments (2)
konbit-kreyol-history-brief.md        ← verified history + sensitivity rulings (3)
konbit-kreyol-v6-4-review.md          ← engineering traps in the reference impl (4)
konbit-kreyol-HANDOFF.md              ← original amendments; §3 = the language law (5)
konbit-kreyol-master-spec-v2.2.md     ← charter, pedagogy, scope, tech spec (6)
konbit-kreyol-design-constitution-v6.md ← visual law, as re-cut (7)
konbit-kreyol-app-v6-4.html           ← archived reference implementation (engine-normative)
CLAUDE.md                             ← operating rules auto-loaded into your context
```
