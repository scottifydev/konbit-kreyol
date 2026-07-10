# KONBIT KREYÒL — Master Specification v2.2
**The consolidated, build-ready spec.** Supersedes: research spec v1, pedagogy audit v1, red-team report v1, corpus findings v1. Mockup of record: `konbit-kreyol-mockup-v3.html` (with renames per §8).

*Men anpil, chay pa lou.*

---

## 1. Charter

**Konbit Kreyòl** is an 8-unit summer program and local-first web app that activates the latent Haitian Creole of two heritage-learner teenagers — Leo (rising 9th) and Isaac (rising 10th) — converting passive comprehension into reading fluency, daily productive use with their family, and scaffolded consumption of real Haitian media, culminating in co-hosting a family listening of a Maurice Sixto lodyans.

**What it is:** heritage-language *activation*, identity-affirming, family-embedded, media-anchored, co-operative between brothers, and honest about what 24 contact hours buys.

**What it is not:** a beginner course, a missionary phrasebook, a Duolingo clone, a substitute for the family, or a promise of fluency. It never talks down to its users; its register is dry, wry, and teen-respecting.

**Non-negotiable gates:**
1. **Native review gate.** No Kreyòl string — feed post, UI label, drill item, product name — reaches the boys without a native speaker's pass. (Standing example of why: the app almost shipped *sak pase* as the flagship greeting; current native creators call it dated. Also: the feed was nearly named "Fyèm," a fabricated word. The real word is **Fil**.)
2. **Family-idiolect rule.** The target language is *this family's* Kreyòl. When family usage and any reference (dictionary, textbook, corpus) disagree, family usage wins.
3. **Family error-response brief.** One page, signed off by Mom before Unit 1: recast, don't correct mid-sentence; never mock accent; praise attempts specifically. Ridicule from fluent relatives is the documented silencer of heritage learners; no feature survives it.

**Design principles:**
1. Activation, not instruction — assume the sound and meaning are already stored; teach the link.
2. Backward design — the capstone's demands generate the scope; nothing enters the list without a real target.
3. Intuition first — grammaticality judgment before rule statement; rules are labels for what the ear knows.
4. Flood before focus — feed input runs one unit ahead of explicit instruction.
5. Two ledgers — recognition and production tracked and displayed separately, always.
6. Retrieval hidden in the scroll — the feed is the SRS; review precedes new content daily.
7. Game layer ≠ learning layer — XP rewards effort; mastery requires evidence. Tone: Strava, not Duolingo.
8. The family is infrastructure — the app orchestrates the family; it does not replace it.
9. Nobody loses — brothers only ever climb *together against the mountain* (Dèyè mòn gen mòn); no head-to-head ranking exists.

---

## 2. Learners, diagnostic, and scope bands

**Profiles.** Leo (9th) and Isaac (10th): mother is Haitian, extended family speaks Kreyòl around them, never visited Haiti, presumed receptive bilinguals — presumption to be *tested, not trusted* ("family speaks Kreyòl" ≠ "speaks it to the boys"; overhearers retain phonology but far less vocabulary than addressees).

**Unit 0 diagnostic (days 1–2, embedded in Unit 1):**
- 120-item aural recognition sample (hear word → pick meaning), stratified across all unit domains;
- decoding probe (read 10 phrases aloud, recorded, checked against reference audio);
- 60-second picture-description production probe, Mom-scored for comprehensibility.

**Outputs, per child:**
- **Tier table** for every scope item: Tier A *Link* (comprehended aurally; task = spelling + production; enters receptive SRS at box 3), Tier B *Confirm*, Tier C *Acquire* (true learning; ≤3–5/day).
- **Scope band:** Strong (~600 items), Moderate (~450, trims Unit 7 news domain, thins Unit 4), Emerging (~300, more instruction-style technique; capstone = two Sixto scenes instead of the full lodyans). All downstream parameters (feed mix, SRS load, gates) key off the band. The two boys may land in different bands; that is expected and fine.

---

## 3. Pedagogical methodology (with sources)

- **Heritage learner framework** (Valdés 2000/2001/2005): receptive bilinguals differ categorically from L2 beginners; identity-based motivation; leverage what's stored.
- **Production–comprehension divide** (Polinsky; Putnam & Sánchez 2013 activation model): the material is latent; frequency of *use* reactivates it — hence the production emphasis and two-ledger tracking.
- **Macro-based approach** (Polinsky & Kagan): start from whole authentic texts (song, story, conversation), work down to detail. Every unit opens with real media.
- **Comprehensible input** (Krashen) *with* the interactionist corrective: input is necessary, not sufficient; mandatory production and family-interaction tasks close the loop (VanPatten input processing motivates flood-before-focus).
- **Retrieval practice & spacing** (Roediger/Karpicke; Leitner): review-first sessions; SRS sized to the calendar.
- **Cooperation over competition for sibling dyads** (Dindar, Ren & Järvenoja 2021, BJET 52(1): equal learning outcomes, higher social relatedness in gamified cooperation): all mechanics are co-op.
- **Protégé effect:** each brother teaches what he leads (rotating Majò roles); mandatory peer tips on relay handoffs.

---

## 4. Vocabulary scope & sequence (v2.2, corpus-corrected)

**Budget:** 42 teaching days (Unit 8 adds ~0 new items) × ~14 new items/day ≈ 590 core + distributed strands ≈ **~600 items** (Strong band), per-child tier-adjusted. Daily caps: Tier A ≤ 12, B ≤ 5, C ≤ 3.

**The Kle 77.** Cross-corpus analysis (Leipzig hat corpus ∩ spam-filtered JHU Kreyòl-MT, top-130 of each) yields 77 register-independent core words — the decoding substrate of all written Kreyòl:

> nan, ak, yo, pou, a, ki, yon, la, sou, ou, se, te, an, sa, nou, pa, li, gen, pi, fè, tout, bon, ka, ap, moun, plis, oswa, soti, lè, gwo, epi, tou, jan, l, si, lòt, men, ti, kay, travay, bay, pase, jwenn, dwe, kapab, avèk, di, anpil, tan, lan, tankou, ane, byen, menm, peyi, chak, san, jou, kote, ta, vle, pran, mete, dlo, youn, non, ant, bagay, pati, ale, manje, apre, kèk, premye, fèt, nenpòt, genyen

**Rule:** all 77 receptively solid by end of Unit 3; dashboard shows a **Kle 77** progress ring per boy.

**Distributed strands (every unit, never lumped):**
- **Ti Mo** (little words, corpus-mandated): tou, menm, lòt, chak, toujou, ankò, deja, janm, anyen, okenn, kounye a… 3–4/unit from Unit 1, receptive-fast-tracked.
- **Slang slots:** 2–3/unit, register-flagged (✅ ak Manman / 🟡 ak zanmi / 🔒 rekonèt sèlman). **Native-curated only** — sourced from Mom, cousins, and family-vetted creator content. The app authors zero slang.
- **Pwovèb:** 1/unit, tied to that unit's family mission.
- **Song keys:** each unit's chorus vocabulary pre-taught; lyrics linked, never reproduced.
- **UI words:** each unit's interface vocabulary, drawn only from the scope (§9).

**Units** (calendar-flexible; advance on gates; two slack weeks exist in the summer):

| Unit | Theme | New items | Core domains | Grammar (method) | Gate |
|---|---|---|---|---|---|
| 0 | Dyagnostik (d1–2) | — | 120-item aural sample; decoding probe; production probe | — | Tier tables + bands set |
| 1 | Dekode | ~90 | Grapheme system; pronouns long+short; time words (jodi a, kounye a, demen, yè, jou, semèn, maten, aswè); **greeting repertoire** (sa k ap fèt, sak cho, kòman ou ye — register by addressee, family-confirmed); courtesy; app verbs (kòmanse, fini, koute, li, pale, ekri, gade, anrejistre); numbers 1–31 (recog.); question words | IPN orthography via **English-interference contrast drills** (ch, j, i, ou, e/è, o/ò, nasals + à/è/ò oral-marking); SVO; contractions in **three spellings** (m ap / map / m'ap). Feed floods ap/te unlabeled. | Read 20 contracted sentences aloud, <2 errors, conversational pace (recording vs. reference) |
| 2 | Fanmi & Kay | ~85 | Kinship; home; adjectives; verb batch 1 (ale, vini, rete, chita, dòmi, leve, wè, tande, konnen, vle, ka, fè, bay, pran); **pi + adjective** | se/ye; possessives; demonstratives; **comparative pi** — all judgment-first | Grann interview done; 10 family-description sentences incl. 2 comparatives |
| 3 | Manje | ~85 | Food; cooking imperatives; quantities; table talk; **si-clauses (present)**; **pi…pase, twò** | Bare-verb imperative; determiners la/a/an/lan/nan by **ear-judgment**, rule as label day 3 | Cook-along mission; 5 recorded kitchen commands Mom-rated comprehensible |
| 4 | Telefòn, WhatsApp, Foutbòl, Mizik | ~80 | **WhatsApp/voice-note ecology** (vwadyo as first-class task); phone/tech incl. accepted loanwords; sports (parameterized to what the boys follow); music; exclamations; **chat-Kreyòl register mini-unit** (abbreviations, dropped diacritics — same language, two costumes); typing accents mini-lesson; modals **dwe, mèt** | **ap** progressive formalized (flooded since U1) | 3-day family WhatsApp thread sustained incl. ≥1 vwadyo/day; ap correct 8/10 cued |
| 5 | Tan Pase | ~75 | Narrative connectives; storytelling verbs; routine verbs batch 2; **reported speech pattern** (li di m…, li mande m…); modals **fòk, konn** (habitual) | **te / t ap** formalized; konn as same-template marker. First Sixto excerpt (30–60 s). Grann's recorded answers = listening texts. | Narrate your day: 5+ sentences, ≥3 markers correct |
| 6 | Santiman & Plezantri | ~70 | Emotions; plans; affectionate teasing register (flagged) | **pral** formalized; *ta, va/ava recognition-only.* Léa Kokoyé segment 1 (2–3 min) with story keys. | Feelings+plans exchange with family; segment-1 check passed together |
| 7 | Nouvèl & Entènèt | ~65 (light — SRS peak) | News frame; internet culture; **diaspora creator content** (boys nominate, parents vet; VOA = one formal-register exercise) | **fèk/sot**; serial verbs as noticed chunks (kouri ale, pran vin, pote ale) | Summarize one news item to family; Sixto segment 2 decoded |
| 8 | Kapstòn | ~0–15 (story keys) | — | None new. Co-decode remaining segments; rehearse | **Family listening event**: boys host, play segments, explain the Kreyòl; Mom narrates the French asides (authentic communal lodyans). Emerging band: two scenes. |

---

## 5. Daily session (30 min; 15-min minimum viable session preserves streak + SRS)

1. **Revi (3–5 min):** due SRS items first — mostly disguised as the day's first feed posts.
2. **Fil la (4–5 min):** scroll, tap-gloss, 3 reactions. Mix: 60% current unit / 25% due review / 15% next-unit seed.
3. **Fokis (8–10 min):** the day's target, macro-first with audio; judgment tasks before rules.
4. **Pwodiksyon (8–10 min):** record / type / transcribe; listen–compare–rerecord against family audio.
5. **Mòn / Konbit (5–7 min):** relay leg or co-op mission.
6. **Daily micro-mission (10 s, self-report):** say today's phrase to a family member; Unit 4+: send one vwadyo.

Weekly **Misyon Fanmi** replaces one production block (interview Grann → cook-along → WhatsApp thread → childhood story → joke exchange → news summary → capstone hosting). Mom's role alternates weekly: judge / interviewee / co-player.

---

## 6. Mastery model

- Every item carries two ledgers: `rec` and `prod`, each `{box, due, history}`. Mastery states are **derived, never stored**.
- *Ap aktive (rec):* ≥1 correct recognition. *Ap aktive (prod):* ≥1 correct cued production. **Solid:** 3 consecutive correct **productive** retrievals spanning ≥7 days, ≥1 in mixed-review context; 2 consecutive misses demote. No decay-free states.
- **Leitner:** 4 boxes (1/3/7/16 days). Tier A enters `rec` at box 3. **Productive ledger applies only to the ~250-item productive core** (receptive-600/productive-250 asymmetry — the honest load math: ~45–55 reviews/day peak ≈ 4–5 min).
- Grammar map = 2-D grid (system × mode): pronouns, orthography, se/ye, determiners, ap, te/t ap, pral, konn, modals, comparatives, fèk/sot, serial chunks.
- **XP is fully decoupled from mastery.** XP = effort/completion. Mòn summit thresholds key off evidence-weighted items. Family scores gate *missions*; machines gate *mastery*.

---

## 7. Collaborative mechanics (no adversarial layer exists)

- **Mòn relay (weekly):** each boy climbs a leg matched to his Majò role; combined score vs. summit threshold; both summit and share the badge, or the mountain waits for tomorrow. **Mandatory peer tip at handoff** (retrieval for the writer, hint for the reader).
- **Majò roles**, swap Mondays: Majò lekti / Majò koute — each leads his *stronger* skill (credible teaching, protégé effect) and gets coached in his weaker.
- **Konbit streak:** survives if *either* boy practices; 1 padon/week; individual streaks exist quietly.
- **Shared boards only:** contribution bars (blue + red stacking toward one goal); no ranking of brothers anywhere.
- **Tone:** understated stats (PRs, quiet counters), dry copy, zero confetti, no mascot. **Pwo mode** per profile hides XP entirely (mastery grid + mountain only).
- Boys author feed posts *for each other* (reviewed via the same native gate when in Kreyòl).

---

## 8. Content architecture

**Fil la** (the feed — renamed from "Fyèm," which was fabricated): 150–250 launch posts as JSON, tagged `{category, unit, difficulty, items[], audio}`. Categories: Fanmi (family-chat voice), Pwovèb, Espò (parameterized), Slang (curated slots), Mizik (chorus keys, linked), Blag, Nouvèl-lite, chat-register exemplars.

**Sourcing ruling (corpus-verified):** no public corpus survives review — Leipzig "community" = Wikipedia; public Kreyòl-MT = MT-spam-contaminated; Tatoeba = 152 learner-tainted sentences; 2010 SMS corpus = crisis register. Launch pool ≈ **50% adapted-authentic** (family chat donations, cousin submissions, family-harvested comments from Haitian YouTube/TikTok they actually watch, pwovèb, EspasKreyòl free-license material) + **50% synthetic-reviewed** (Claude-drafted for controlled vocabulary/grammar seeding → **Mom's review pass**, ~200 posts × 20 s ≈ 70 min across two sittings). Content lint: every post's words ∈ scope ∪ glossed; every gloss becomes SRS-eligible.

**Audio strategy:**
1. **Family recordings** (primary; pedagogy + identity + quality). Floor: one 90-minute session covering Units 1–2; ongoing via Anrejistrè screen; Grann interview feeds Unit 5.
2. **Sourced media** (linked/embedded, never hosted): Sixto via the Maurice A. Sixto Foundation / Montuno Records on YouTube (Léa Kokoyé default; Ti Sentaniz opt-in with restavèk framing); Tabou Combo, Boukman Eksperyans, RAM; BIC and family-vetted modern tracks; VOA Kreyòl; HaitianCreole.net native phrase audio.
3. **TTS fallback**, clearly labeled "vwa robo": bench jsbeaudry/haitian_creole_tts_11K and sesame-creole-tts-11k locally vs. Meta MMS; ship best that passes Mom's ear.
4. **ASR (optional, never a grade):** bench the Kreyòl Whisper fine-tune (~19% WER claimed); if viable, wire as a "robot heard: …" echo only.

---

## 9. UI language progression

- `ui_strings.json`: every string = `{ en, ht, taughtWeek }`, where `taughtWeek = max(taughtWeek of its words)`. Render `ht` iff `currentUnit ≥ taughtWeek`. **No special cases.**
- Product names (Konbit Kreyòl, Fil la, Mòn, Misyon Fanmi, Fokis, Pwodiksyon, Anrejistrè, Majò lekti/koute) are Kreyòl from day 1 — taught as names at first launch, with English hints until the interface goes full Kreyòl.
- Newly flipped strings show a gold-dotted underline + hover gloss for one week, then go plain. **Long-press any Kreyòl UI string reveals English** (escape hatch).
- Dashboard card: **"Mo aplikasyon semèn sa a"** — the unit's newly unlocked UI words.
- Lint: any UI string whose words never appear in the scope is a **build error** (it would never flip).
- Optional per-family setting: allow light code-switch swaps of standalone taught nouns inside English sentences at mid-stage, or keep flips strictly whole-string (default: whole-string).

---

## 10. Technical specification

**Architecture:** local Next.js/Node app on the shared PC (matches quest-board pattern, minus cloud). **File-based JSON persistence** via API route — auto-write on session end, rolling 7-day backups to a second directory. localStorage = cache only. HTML5 audio; external media opens in browser. No auth; profile picker.

**Data files:** `scope.json` (items: lemma, gloss, domain, unit, tiers-per-child, productiveCore flag), `ui_strings.json`, `fil.json` (posts), `grammar.json` (judgment tasks + labels), `media.json` (links, difficulty tags, story keys), `missions.json`, `diagnostic.json`, `profiles/{leo,isaac}.json` (tier tables, band, ledgers, streaks, mission log), `konbit.json` (shared state), `audio/` (family recordings by item id).

**Screens:** 1 Profile select · 2 Dashboard (Kle 77 ring, skill bars, 2-D grammar grid, media ladder, konbit card, app-words card, today's session) · 3 Fil la · 4 Fokis · 5 Pwodiksyon (record / compare / rerecord) · 6 Mòn (relay, handoff with mandatory tip, summit reveal) · 7 Misyon Fanmi (task card, Mom star input, printable family brief) · 8 Anrejistrè (family capture, tagged to items) · 9 Media library · 10 Settings (band override, pwo mode, export/backup, long-press toggle).

**Relay pass-and-play:** boy A plays leg → writes tip (required) → handoff screen hides nothing (co-op) but locks A's leg → boy B plays → summit reveal updates shared state.

**Build-order for Ralph (suggested Linear issues, one PR each):**
1. Scaffold + profiles + file persistence/backup
2. `scope.json` schema + diagnostic flow + tier/band computation
3. SRS engine (two ledgers, Leitner, evidence rules, derived mastery)
4. Fil la (composer with 60/25/15 mix, tap-gloss, reactions-as-reviews)
5. `ui_strings.json` flip engine + lint + long-press reveal
6. Fokis lesson player (judgment-task type, audio-led)
7. Pwodiksyon recorder + listen-compare loop
8. Mòn relay + konbit streak + shared boards
9. Misyon Fanmi + star input + printable family brief
10. Anrejistrè + audio-bank tagging
11. Media library + story-key pre-teach flow
12. Content lint CI (scope coverage, ui-string flip check, unreviewed-string blocker)
13. TTS/ASR local bench harness (optional wire-in behind flags)

---

## 11. Parent/family prep (before Unit 1)

1. **Family capacity contract** — who takes which roles; distribute beyond Mom (Grann/uncles record, aunt reviews, cousins feed slang slots). Load-bearing minimum: error-response brief (one conversation) + weekly 5-min star rating + one 90-min recording session.
2. **Error-response brief** signed off.
3. **Lexicon localization pass** (~45 min): Mom edits scope to family usage; swaps recorded same sitting.
4. **Kickoff with the boys:** the why (understand the room, voice-note Grann, get the jokes); they nominate music/creators; they pick capstone format.
5. **Media vetting:** listen-through of nominated tracks/creators; playlist assembly; bookmark Léa Kokoyé.
6. **Content review sitting #1** (~35 min): first batch of feed posts.
7. Scott: bench TTS/ASR models; run scope vs. a Crúbadán/OSCAR-derived frequency list when the server's back (sanity check, not source).

---

## 12. Exit criteria & maintenance

**Will:** read any Kreyòl text aloud at conversational pace; comprehend family speech markedly better and self-repair ("kisa sa vle di?"); hold a 3–5 min family conversation with reliable te/ap/pral (+ konn) control; run the family WhatsApp incl. voice notes; follow Léa Kokoyé with peer + Mom support and explain it to the family; recognize register (ak Manman vs. ak zanmi).

**Will not (never implied):** spontaneous fluency; native pronunciation without family feedback; writing beyond chat register; unaided fast-radio comprehension.

**Fall maintenance ships with v1:** Fil la keeps running at 10 min/day; missions monthly; SRS continues; an activation unused regresses.

---

## 13. Risk register (residual)

| Risk | Likelihood | Impact | Mitigation | Residual truth |
|---|---|---|---|---|
| Boys are overhearers, not addressees | Unknown until U0 | Resizes program | Scope bands | Emerging band is a smaller win; set expectations now |
| Motivation collapse ~U3 | Med-high | Stall | Units-not-weeks, 15-min MVS, agency features, konbit streak | No app survives two uninterested teens; the family frame is the engine |
| Mom capacity below plan | Med | Feedback loops degrade | Capacity contract, distribution, graceful degradation | Degraded mode loses the best loop (family audio) |
| Claude Kreyòl errors surviving review | Med | Teaches wrong forms | Hard native gate; batch small; early units first | Review fatigue is real |
| Slang slots stay empty | Med | "Modern" claim weakens | Weekly family prompt; creator-comment backstop | Course works without slang; it's just less cool |
| Sixto French passages | Certain | Capstone partially opaque | Communal reframe; Mom narrates | By design — that's the feature |

## 14. Resources appendix (verified)

**Sixto:** Léa Kokoyé (capstone), Ti Sentaniz (opt-in, framed), Zabèlbòk Berachat, Gwo Moso — YouTube via Sixto Foundation / Montuno Records. **Music:** Tabou Combo; Boukman Eksperyans; RAM; Boukan Ginen; BIC ("Yon lèt pou ti jèn"); family-vetted modern additions. **Listening/reading:** VOA Kreyòl (formal register); VoicesfromHaiti (authentic diaspora prose, heritage-teen interviews); HaitianCreole.net (native phrase audio); HowToCreole; EspasKreyòl (free-license materials); Sweet Coconuts / Mandaly Louis-Charles. **Reference:** Valdman et al. *Haitian Creole–English Bilingual Dictionary* (IU Creole Institute 2007); MIT-Ayiti (DeGraff, CC-licensed); HaitiHub verb-tense sheets; CMU glossary (35,728 pairs — lookup only). **Corpus verdicts:** Leipzig hat "community" = Wikipedia register; public Kreyòl-MT = MT-contaminated; Tatoeba hat = 152 learner-tainted sentences; 2010 SMS corpus = crisis register; Crúbadán = retry (503). **Models to bench:** jsbeaudry/haitian_creole_tts_11K, jsbeaudry/sesame-creole-tts-11k, facebook/mms-tts-hat, ZeeshanGeoPk/haitian-speech-to-text.
