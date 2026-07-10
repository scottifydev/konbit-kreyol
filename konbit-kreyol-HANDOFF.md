# KONBIT KREYÒL — COMPLETE HANDOFF
**8-week Haitian Kreyòl heritage-activation course + local web app for Leo (9th) and Isaac (10th).**
Handoff date: 2026-07-09 · Reference implementation: `konbit-kreyol-app-v6-4.html` · Owner: Scott · Implementer: Ralph (one PR per SCO issue)

---

## 1. Document index & precedence

Where documents conflict, **later amendments beat earlier documents**; this handoff records all amendments made after the master spec was compiled.

| Precedence | File | Governs |
|---|---|---|
| 1 (this doc) | `konbit-kreyol-HANDOFF.md` | Amendments, build order, action items — the entry point |
| 2 | `konbit-kreyol-master-spec-v2.2.md` | Charter, gates, units U0–U8, mastery model, co-op mechanics, tech spec §10, exit criteria, risk register |
| 3 | `konbit-kreyol-design-constitution-v6.md` | All visual decisions: color/type/surfaces/motion/bans |
| 4 | `konbit-kreyol-v6-language-audit.md` | Language-law rationale (its rules are superseded in part by §3 below — the audit predates the strict-gate fix) |
| ref | `konbit-kreyol-corpus-findings.md` | Kle 77 derivation, register findings, fused spellings, tooling |
| ref | `konbit-kreyol-pedagogy-audit.md`, `konbit-kreyol-redteam.md` | Decision rationale (already folded into spec v2.2) |
| archive | `mockup*.html`, `app-v4/v5/v6/v6-1/v6-2/v6-3.html` | Archaeology only. **Do not build from these.** |

**`konbit-kreyol-app-v6-4.html` is the single reference implementation** — engine behavior, gate semantics, design execution, and copy all normative except where §5 marks them prototype-only.

## 2. What the app is (one paragraph)

A local-first web app on the shared family PC running an 8-unit summer course. Daily 30-min loop: **Fil la** (social-style feed of Kreyòl micro-posts; spaced-repetition reviews hidden in the scroll), **Fokis** (judgment-first grammar on a slate board), **Pwodiksyon** (hold-to-record speaking against family reference audio), **Mòn** (co-op relay: brothers vs. the mountain, never each other; mandatory tip at handoff; failed summits retry tomorrow — nobody loses), plus weekly **Misyon Fanmi** rated by Mom. Two-ledger SRS (recognition/production) drives all mastery displays. The UI itself teaches: chrome flips from English to Kreyòl only as words are taught.

## 3. THE LANGUAGE LAW (final semantics — this burned us three times; treat as load-bearing)

1. **taught(tw) ⇔ `tw === 8 ? unit >= 8 : unit > tw`.** A string flips to Kreyòl only when the unit teaching its words is **finished**. Unit 8 is the sole exception: capstone immersion flips *at* 8. The `>=` bug (flipping when a unit *starts*) is the exact failure Scott caught on screenshot — never reintroduce it.
2. **tw assignment:** tw = the max taught-unit across every word in the ht string. Any string containing a never-taught word goes in the **tw 8 immersion bucket** (English until capstone).
3. **No whitelist. No "product name" exemption.** Surface names (Fil la, Fokis, Mòn, Pwodiksyon, Misyon, Anrejistrè, Konbit, Padon, Kle 77) are vocabulary with real tw values. The **only** day-1 Kreyòl is the logo "KONBIT KREYÒL" — the app's proper name.
4. **Zero Kreyòl literals in templates.** All chrome text routes through the gate helpers (`T()`, `Tt()`, `tagT()`, `unitTitle()`, `gLbl()`). Kreyòl may otherwise exist only in content data: ITEMS, POSTS, quiz banks, quoted oral literature, and lesson objects of study (e.g. `la · a · an` in the determiner lesson).
5. **Unit titles are bilingual ("Manje · Food") until their unit is complete**, then solo Kreyòl.
6. **Every rendered Kreyòl string carries `data-en`; long-press reveals English.** Content glosses use tap (`data-gloss`). Visual affordances are distinct: sun **sweep** = tappable content word; sun **underline** (`.flipnew`) = chrome newly flipped this unit.
7. **Lint is mandatory and must not be rigged.** Runtime dev lint exists in v6.4; CI version (Ralph issue 12): tokenize all template literals; any diacritic-bearing or scope-wordlist token outside gate helpers/content data fails the build. Whitelist = proper nouns only (people, artists, VOA, IPN). *Recorded for posterity: an earlier lint pass was silently defeated by whitelisting violations (detèminan, pwonon, revi…). The whitelist is now change-controlled: additions require a spec amendment.*
8. **Pre-Unit-1 surfaces (gate, diagnostic) render fully English** — this now falls out of rule 1 naturally, but keep it as an explicit test case.

## 4. Amendments to master spec v2.2 (made during v6.x; spec text not yet updated)

- **Design constitution v6 adopted wholesale** (paper/paint/slate surfaces, front-page IA, zero gradients, one offset shadow per screen, slab/sans/serif casting, semantic color law, bans list). One logged pattern exception: the diagnostic keeps 4 answer options (psychometrics over house pattern).
- **Scope additions (15 items):** U1 — wi, mwen, fini, semèn, kòmanse, konbit, padon · U2 — monte, konprann, fanmi, ann, pwovèb · U3 — kizin, lòd · U4 — reyaji. Rationale: each either filled a genuine gap (wi/mwen!) or legalized a UI string honestly instead of exempting it.
- **Feed restored to social form** (pfp chips, handles, live reaction counts) inside the constitution's paper/ink language; FÈMEN closed-shop board when the daily 3 reactions are done.
- **Front page carries:** gated greeting ("Sa k ap fèt, {name}?" — English at U1), boy-color edge + chip avatar, instruments panel (large Kle 77 ring + four skill meters), konbit standings table, index, grammar-map drawer with **gated metalanguage** (Pronouns/Òtograf etc. English until capstone).
- **Badges:** needs-native-review = "DRAFT"; SRS-due = gated "DUE"/"REVI". Feed tags gated per TAGS map.
- **Fresh state boots Unit 1** (all-English chrome), sim-day 1.

## 5. Prototype vs. production deltas (v6.4 fakes these; real build must not)

| v6.4 (prototype) | Production requirement (spec ref) |
|---|---|
| localStorage + JSON export | File persistence, per-profile JSON + 7-day rolling backups (§10) |
| Written 12-item diagnostic + decode self-rating | Full aural diagnostic from family audio + recorded read-aloud; 120-item sample per child (§2) |
| Sim-day clock via dev card | Real calendar; units-not-weeks pacing; 15-min minimum session (§5) |
| Audio "ref · fanmi" placeholders | Family-recorded reference audio wired into Fil posts + Pwodiksyon listen-compare-rerecord (§8) |
| Feed = 10 static posts, due-badge only | Feed composer enforcing 60/25/15 current/review/seed mix from the SRS queue (§6) |
| One Fokis lesson (determiners), fixed Mòn banks | Full lesson/bank content per unit map (§4); Mòn banks drawn from each boy's due queue |
| Tier-A seeds to box 2 of 4 | Tier-A enters box 3 per spec §6 |
| Runtime lint button | CI lint gate (issue 12) + runtime assert in dev builds |
| No TTS/ASR | Bench locally first: jsbeaudry/haitian_creole_tts_11K, sesame-creole-tts-11k; Whisper ASR (~19% WER) **echo-only, never grading** |
| Chalk .hit/.miss classes defined | Verify wired to every quiz answer path (circle right, strike chosen, never red-X) |

## 6. Ralph build order (13 issues, one PR each — cut in Linear/Scottify on Scott's go)

1. **Scaffold** — local app shell, file persistence layer, profiles, design tokens from constitution §Color/§Type. AC: gate + masthead render per v6.4 at Unit 1 (all English), tokens match hex-for-hex.
2. **SRS engine** — two-ledger Leitner (1/3/7/16), derived mastery (prod solid = 3 consecutive spanning ≥7d), tier seeding (A→box 3). AC: unit tests on promotion/demotion/derivation.
3. **Language gate** — `taught()` strict semantics per §3, UI table, unitTitle/tagT/gLbl, data-en long-press, .gloss/.flipnew affordances. AC: headless test = zero Kreyòl chrome at U1; U2 flips exactly U1 vocab.
4. **Diagnostic** — aural flow, band assignment, tier setting, scope resize (Strong ~600 / Moderate ~450 / Emerging ~300). AC: English chrome throughout; family-audio slots.
5. **Fil la** — feed composer (60/25/15), post cards per v6.4, reactions/Konprann→receptive reviews, DUE/DRAFT badges, FÈMEN state. AC: every "Konprann ✓" writes ledger events.
6. **Fokis** — slate stage, judgment-first lesson player, chalk feedback (circle/strike), per-unit lesson content. AC: rule shown only after items; non-punitive marks verified.
7. **Pwodiksyon** — recorder (pointer events, touch-action none), listen-compare-rerecord against reference audio, prod-ledger writes. AC: mic-denied state per constitution edge-state rules.
8. **Mòn relay** — pass-and-play legs from due queues, mandatory tip, summit threshold, next-day leg reset preserving tips, sunset panorama on failed summit, shared badge. AC: no competitive framing anywhere; tips persist.
9. **Misyon Fanmi** — poster, star input, shared-board feed, printable family brief (recast, never mock).
10. **Media ladder** — link-don't-host, rung unlocks, Sixto opt-in gate for Ti Sentaniz, Léa Kokoyé capstone event flow.
11. **Streaks/konbit** — shared streak, padon repair patch, pwo mode, standings.
12. **Language-lint CI** — per §3.7. AC: seeded violation fails the build; whitelist change requires spec-file diff.
13. **TTS/ASR bench harness** — local eval of the two TTS models + Whisper echo; report to Scott before any integration.

**Non-negotiable review gates on every PR:** (a) design-constitution checklist, (b) language-law checklist §3, (c) anti-Ralph house rules — pointer events only, no 4-button select_one outside the logged diagnostic exception, no design-token drift.

## 7. Human action items — blocking

**Manman (the native gate — nothing ships to the boys past this):**
- Review **every** Kreyòl string flagged `needsReview:true` (feed posts p1, p3, p7, p8, p9, p10) **and every ht string in the UI table** — all are Claude-authored; the flip gate protects *sequencing*, not *correctness*. Known-dubious coinages to scrutinize: "jijman anvan", "Make misyon fini", "Nechèl medya", "Paj devan", "Endèks", "Relè", "badj pataje", femen_body, tip_why, the greeting's register with her sons' names.
- Post bio lines ("gwo pale", "vwa fanmi") — untranslated content-zone text, flagged.
- 45-min family-idiolect lexicon pass over the item bank (her words beat every reference).
- 90-min audio session #1 (Misyon U1 doubles as this).
- Slang slots: native-curated only; Claude authors zero slang (standing rule).

**Scott:**
- Print + get sign-off on the family error-response one-pager (recast, don't correct mid-sentence; never mock accent) — spec calls this the single most critical safeguard.
- Capacity contract with the boys (30 min/day, units-not-weeks, 15-min minimum days).
- Media vetting + boys nominate 2–3 diaspora creators each.
- Bench TTS/ASR models locally (issue 13 input); verify Alfa Slab One renders è/ò/à on the shared PC (fallback Archivo Black is wired).
- Retry Crúbadán frequency cross-check when the server recovers (corpus doc, open item).

## 8. Acceptance criteria for "done" (from spec, restated)

Program exit: capstone lodyans hosted by both boys (Mom narrating French asides); Kle 77 receptively solid both profiles; productive core (~250 items) per band targets; family WhatsApp running in Kreyòl (U4 habit sustained); fall maintenance plan activated (spec §Exit). App exit: all 13 issues merged with both checklists green, lint in CI, family audio wired, and one full unit run end-to-end by both boys on the shared PC.

**Version note:** keep `v6-4` untouched as the reference; superseded HTML files can be archived or deleted at Scott's discretion.
