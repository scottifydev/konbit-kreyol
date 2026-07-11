# 03 · LANGUAGE PROGRAM — pedagogy, scope, mastery

**Carried from master spec v2.2 with its post-hoc amendments applied (strict flip semantics, units-not-weeks, no day-1 product-name Kreyòl, ASR removed, voice dispatches as the production medium). The pedagogy here is not up for renegotiation: the game (`02`) is a shell around it.**

*Men anpil, chay pa lou.*

---

## 1. Charter

**Konbit Kreyòl** is an 8-unit summer program and web app that activates the latent Haitian Creole of two heritage-learner teenagers — Leo (rising 9th) and Isaac (rising 10th) — converting passive comprehension into reading fluency, daily productive use with their family, and scaffolded consumption of real Haitian media, culminating in co-hosting a family listening of a Maurice Sixto lodyans.

**What it is:** heritage-language *activation*, identity-affirming, family-embedded, media-anchored, co-operative between brothers, and honest about what 24 contact hours buys.

**What it is not:** a beginner course, a missionary phrasebook, a Duolingo clone, a substitute for the family, or a promise of fluency. It never talks down to its users; its register is dry, wry, and teen-respecting.

**Non-negotiable gates:**
1. **Native review gate.** No Kreyòl string — feed post, UI label, drill item, scene line, product name — reaches the boys without a native speaker's pass. (Standing example of why: the app almost shipped *sak pase* as the flagship greeting; current native creators call it dated. Also: the feed was nearly named "Fyèm," a fabricated word. The real word is **Fil**.)
2. **Family-idiolect rule.** The target language is *this family's* Kreyòl. When family usage and any reference (dictionary, textbook, corpus) disagree, family usage wins. Manman's word beats every document in this repo.
3. **Family error-response brief.** One page, signed off by Mom before Unit 1: recast, don't correct mid-sentence; never mock accent; praise attempts specifically. Ridicule from fluent relatives is the documented silencer of heritage learners; no feature survives it. (Now also the etiquette of voice replies to dispatches — `08` §3.)

**Design principles:**
1. Activation, not instruction — assume the sound and meaning are already stored; teach the link.
2. Backward design — the capstone's demands generate the scope; nothing enters the list without a real target.
3. Intuition first — grammaticality judgment before rule statement; rules are labels for what the ear knows.
4. Flood before focus — feed input runs one unit ahead of explicit instruction.
5. Two ledgers — recognition and production tracked and displayed separately, always.
6. Retrieval hidden in the scroll — the feed is the SRS; review precedes new content daily. (True design; never rendered as kid copy.)
7. Game layer ≠ learning layer — XP rewards effort; mastery requires evidence. Tone: Strava, not Duolingo.
8. The family is infrastructure — the app orchestrates the family; it does not replace it.
9. Nobody loses — brothers only ever stand *together against the historical army*; failure is marronage (falling back to the mountains, « Dèyè mòn gen mòn »), never defeat; no head-to-head ranking exists. *(The climb metaphor is purged — `00-START-HERE.md` / `04` §2.10.)*
10. **Speech first** — Kreyòl is primarily a spoken language; the central productive act is a spoken message another person understands (`02` §1).

## 2. Learners, diagnostic, and scope bands

**Profiles.** Leo (9th) and Isaac (10th): mother is Haitian, extended family speaks Kreyòl around them, never visited Haiti, presumed receptive bilinguals — presumption to be *tested, not trusted* ("family speaks Kreyòl" ≠ "speaks it to the boys"; overhearers retain phonology but far less vocabulary than addressees).

**Unit 0 diagnostic — "the ticket" (days 1–2, embedded in Unit 1):**
- 120-item aural recognition sample (hear word → pick meaning), stratified across all unit domains;
- decoding probe (read 10 phrases aloud, recorded, checked against reference audio);
- 60-second picture-description production probe, Mom-scored for comprehensibility.

**Outputs, per child:**
- **Tier table** for every scope item: Tier A *Link* (comprehended aurally; task = spelling + production; enters receptive SRS at the 7-day box), Tier B *Confirm*, Tier C *Acquire* (true learning; ≤3–5/day).
- **Scope band:** Strong (~600 items), Moderate (~450, trims Unit 7 news domain, thins Unit 4), Emerging (~300, more instruction-style technique; capstone = two Sixto scenes instead of the full lodyans). All downstream parameters (feed mix, SRS load, gates) key off the band. The two boys may land in different bands; that is expected and fine. Kid-facing, a band is only ever a course size ("600-word track"), visible only in each boy's own Settings.

## 3. Methodology (with sources)

- **Heritage learner framework** (Valdés 2000/2001/2005): receptive bilinguals differ categorically from L2 beginners; identity-based motivation; leverage what's stored.
- **Production–comprehension divide** (Polinsky; Putnam & Sánchez 2013 activation model): the material is latent; frequency of *use* reactivates it — hence the production emphasis, the two-ledger tracking, and the dispatch mechanic's both-directions ledger write.
- **Macro-based approach** (Polinsky & Kagan): start from whole authentic texts (song, story, conversation), work down to detail. Every unit opens with real media — now including the chapter anthem.
- **Comprehensible input** (Krashen) *with* the interactionist corrective: input is necessary, not sufficient; mandatory production and family-interaction tasks close the loop (VanPatten input processing motivates flood-before-focus).
- **Retrieval practice & spacing** (Roediger/Karpicke; Leitner): review-first sessions; SRS sized to the calendar.
- **Cooperation over competition for sibling dyads** (Dindar, Ren & Järvenoja 2021, BJET 52(1)): equal learning outcomes, higher social relatedness in gamified cooperation — all mechanics are co-op.
- **Protégé effect:** each brother teaches what he leads (rotating Majò roles); mandatory peer tips on relay handoffs.
- **Task-based transmission:** the dispatch loop is an information-gap task — the receiver genuinely lacks what the sender has; success is communicative, not display.

## 4. Vocabulary scope & sequence

**Budget:** 42 teaching days (Unit 8 adds ~0 new items) × ~14 new items/day ≈ 590 core + distributed strands ≈ **~600 items** (Strong band), per-child tier-adjusted. Daily caps: Tier A ≤ 12, B ≤ 5, C ≤ 3.

**The Kle 77.** Cross-corpus analysis (Leipzig hat corpus ∩ spam-filtered JHU Kreyòl-MT, top-130 of each) yields 77 register-independent core words — the decoding substrate of all written Kreyòl:

> nan, ak, yo, pou, a, ki, yon, la, sou, ou, se, te, an, sa, nou, pa, li, gen, pi, fè, tout, bon, ka, ap, moun, plis, oswa, soti, lè, gwo, epi, tou, jan, l, si, lòt, men, ti, kay, travay, bay, pase, jwenn, dwe, kapab, avèk, di, anpil, tan, lan, tankou, ane, byen, menm, peyi, chak, san, jou, kote, ta, vle, pran, mete, dlo, youn, non, ant, bagay, pati, ale, manje, apre, kèk, premye, fèt, nenpòt, genyen

**Rule:** all 77 receptively solid by end of Unit 3. **Ruling in force:** Kle items are receptively seedable/reviewable from U1 regardless of their teaching unit (flood-before-focus sanctions it) — otherwise the target is unreachable (`06` §Traps). Dashboard shows the 77-tick ruler per boy.

**Distributed strands (every unit, never lumped):**
- **Ti Mo** (little words, corpus-mandated): tou, menm, lòt, chak, toujou, ankò, deja, janm, anyen, okenn, kounye a… 3–4/unit from Unit 1, receptive-fast-tracked.
- **Slang slots:** 2–3/unit, register-flagged (ak Manman / ak zanmi / rekonèt sèlman). **Native-curated only** — sourced from Mom, cousins, and family-vetted creator content. The app authors zero slang.
- **Pwovèb:** 1/unit, tied to that unit's family mission.
- **Song keys:** each unit's chorus vocabulary pre-taught; lyrics linked, never reproduced. **The chapter anthem is the unit's song** wherever the family's pick lands there.
- **UI words:** each unit's interface vocabulary, drawn only from the scope (§9).

**Units** (calendar-flexible; advance on gates; two slack weeks exist in the summer). Chapter framing per `01` §3.

| Unit | Theme | New items | Core domains | Grammar (method) | Gate |
|---|---|---|---|---|---|
| 0 | Dyagnostik (d1–2) | — | 120-item aural sample; decoding probe; production probe | — | Tier tables + bands set |
| 1 | Dekode | ~90 | Grapheme system; pronouns long+short; time words (jodi a, kounye a, demen, yè, jou, semèn, maten, aswè); **greeting repertoire** (sa k ap fèt, sak cho, kòman ou ye — register by addressee, family-confirmed); courtesy; app verbs (kòmanse, fini, koute, li, pale, ekri, gade, anrejistre); numbers 1–31 (recog.); question words | IPN orthography via **English-interference contrast drills** (ch, j, i, ou, e/è, o/ò, nasals + à/è/ò oral-marking); SVO; contractions in **three spellings** (m ap / map / m'ap). Feed floods ap/te unlabeled. | Read 20 contracted sentences aloud, <2 errors, conversational pace (recording vs. reference) |
| 2 | Fanmi & Kay | ~85 | Kinship; home; adjectives; verb batch 1 (ale, vini, rete, chita, dòmi, leve, wè, tande, konnen, vle, ka, fè, bay, pran); **pi + adjective** | se/ye; possessives; demonstratives; **comparative pi** — all judgment-first | Grann interview done; 10 family-description sentences incl. 2 comparatives |
| 3 | Manje | ~85 | Food; cooking imperatives; quantities; table talk; **si-clauses (present)**; **pi…pase, twò** | Bare-verb imperative; determiners la/a/an/lan/nan by **ear-judgment**, rule as label day 3 | Cook-along mission; 5 kitchen commands recorded **as dispatches**, Mom-rated comprehensible |
| 4 | Telefòn & vwa | ~80 | Voice-note ecology (spoken dispatches as first-class task); phone/tech incl. accepted loanwords; sports (parameterized to what the boys follow); music; exclamations; **chat-Kreyòl register mini-unit** (abbreviations, dropped diacritics — same language, two costumes); typing accents mini-lesson; modals **dwe, mèt** | **ap** progressive formalized (flooded since U1) | 3-day family thread sustained incl. ≥1 voice note/day; ap correct 8/10 cued |
| 5 | Tan Pase | ~75 | Narrative connectives; storytelling verbs; routine verbs batch 2; **reported speech pattern** (li di m…, li mande m…); modals **fòk, konn** (habitual) | **te / t ap** formalized; konn as same-template marker. First Sixto excerpt (30–60 s). Grann's recorded answers = listening texts. | Narrate your day: 5+ sentences, ≥3 markers correct |
| 6 | Santiman & Plezantri | ~70 | Emotions; plans; affectionate teasing register (flagged) | **pral** formalized; *ta, va/ava recognition-only.* Léa Kokoyé segment 1 (2–3 min) with story keys. | Feelings+plans exchange with family; segment-1 check passed together |
| 7 | Nouvèl & Entènèt | ~65 (light — SRS peak) | News frame; internet culture; **diaspora creator content** (boys nominate, parents vet; VOA = one formal-register exercise) | **fèk/sot**; serial verbs as noticed chunks (kouri ale, pran vin, pote ale) | Summarize one news item to family; Sixto segment 2 decoded |
| 8 | Kapstòn | ~0–15 (story keys) | — | None new. Co-decode remaining segments; rehearse | **Family listening event**: boys host, play segments, explain the Kreyòl; Mom narrates the French asides (authentic communal lodyans). Emerging band: two scenes. |

## 5. Daily session (30 min; 15-min minimum viable session preserves streak + SRS)

1. **Revi (3–5 min):** due SRS items first — mostly disguised as the day's first feed posts.
2. **Fil la (4–5 min):** scroll, tap-gloss, 3 reactions. Mix: 60% current unit / 25% due review / 15% next-unit seed (dev-panel information, never kid copy).
3. **Fokis (8–10 min):** the day's target, macro-first with audio; judgment tasks before rules.
4. **Pwodiksyon / dispatches (8–10 min):** record / type / transcribe; send the day's dispatch; listen-compare-rerecord against family audio where reference exists.
5. **Mòn / Konbit (5–7 min):** relay leg or co-op mission.
6. **Daily micro-mission (10 s, self-report):** say today's phrase to a family member; Unit 4+: send one voice note.

Weekly **Misyon Fanmi** replaces one production block (interview Grann → cook-along → family thread → childhood story → joke exchange → news summary → capstone hosting). Mom's role alternates weekly: judge / interviewee / co-player.

## 6. Mastery model

- Every item carries two ledgers: `rec` and `prod`, each `{box, due, history}`. Mastery states are **derived, never stored**.
- *Ap aktive (rec):* ≥1 correct recognition. *Ap aktive (prod):* ≥1 correct cued production. **Solid:** 3 consecutive correct **productive** retrievals spanning ≥7 days, ≥1 in mixed-review context; 2 consecutive misses demote. No decay-free states.
- **Leitner:** 4 boxes (1/3/7/16 days). Tier A enters `rec` at the 7-day box. **Productive ledger applies only to the ~250-item productive core** (receptive-600/productive-250 asymmetry — the honest load math: ~45–55 reviews/day peak ≈ 4–5 min).
- **Dispatch evidence:** a successful transmission writes a prod event for the sender and a rec event for the receiver on the prompt's target items; a "garbled" outcome writes nothing false — it simply isn't evidence. Family star-ratings gate *missions*; ledgers gate *mastery*; **no machine judges audio**.
- Grammar map = 2-D grid (system × mode): pronouns, orthography, se/ye, determiners, ap, te/t ap, pral, konn, modals, comparatives, fèk/sot, serial chunks. Kid-facing labels: Know / Use.
- **XP is fully decoupled from mastery.** XP = effort/completion. The relay's position thresholds key off evidence-weighted items.

## 7. Content architecture

**Fil la** (the feed): 150–250 launch posts, tagged `{category, unit, difficulty, items[], audio}`. Categories: Fanmi (family-chat voice), Pwovèb, Espò (parameterized), Slang (curated slots), Mizik (chorus keys, linked), Blag, Nouvèl-lite, chat-register exemplars, and (game) camp/front dispatches + enemy-intel memos per `01` §7.

**Sourcing ruling (corpus-verified):** no public corpus survives review — Leipzig "community" = Wikipedia; public Kreyòl-MT = MT-spam-contaminated; Tatoeba = 152 learner-tainted sentences; 2010 SMS corpus = crisis register. Launch pool ≈ **50% adapted-authentic** (family chat donations, cousin submissions, family-harvested comments from Haitian YouTube/TikTok they actually watch, pwovèb, EspasKreyòl free-license material) + **50% synthetic-reviewed** (Claude-drafted for controlled vocabulary/grammar seeding → **Mom's review pass**, ~200 posts × 20 s ≈ 70 min across two sittings). Content lint: every post's words ∈ scope ∪ glossed; every gloss becomes SRS-eligible.

**Audio strategy:**
1. **Family recordings** (primary; pedagogy + identity + quality). Floor: one 90-minute session covering Units 1–2; ongoing via Anrejistrè; Grann interview feeds Unit 5. Stored in the family's private bucket (`06`).
2. **Sourced media** (linked/embedded, never hosted): Sixto via the Maurice A. Sixto Foundation / Montuno Records on YouTube (Léa Kokoyé default; Ti Sentaniz opt-in with restavèk framing); Tabou Combo, Boukman Eksperyans, RAM, Boukan Ginen; BIC and family-vetted modern tracks (the anthem pool); VOA Kreyòl; HaitianCreole.net native phrase audio.
3. **TTS fallback** (open question, benched before any wire-in), clearly labeled "vwa robo": jsbeaudry/haitian_creole_tts_11K, sesame-creole-tts-11k, facebook/mms-tts-hat — ship only what passes Mom's ear.
4. **ASR: none.** Removed from the design by owner ruling — no machine transcribes, echoes, or judges the boys' speech. Grading is transmission + family feedback only.

## 8. UI language progression

- Every UI string = `{ en, ht, tw }`, where **tw is computed** as the max taught-unit across the ht string's words (exact scope ids only). Render ht iff **`unit > tw`** (tw 8: `unit >= 8`). **No special cases, no name exemption** — surface names are vocabulary with real tw values; the only day-1 Kreyòl is the logo "KONBIT KREYÒL" (the app's proper name). Full semantics: `04` §Language.
- Unit titles are bilingual ("Manje · Food") until their unit is complete, then solo Kreyòl.
- Newly flipped strings show the flipnew affordance for one week, then go plain. **Long-press any Kreyòl UI string reveals English** (escape hatch). Content glosses use tap.
- Dashboard card: the unit's newly unlocked UI words (ht name via Manman).
- Lint: any UI string whose words never appear in the scope is a **build error** (it would never flip).
- Optional per-family setting: allow light code-switch swaps of standalone taught nouns inside English sentences at mid-stage, or keep flips strictly whole-string (default: whole-string).

## 9. Family prep (before Unit 1)

1. **Family capacity contract** — who takes which roles; distribute beyond Mom (Grann/uncles record, aunt reviews, cousins feed slang slots). Load-bearing minimum: error-response brief (one conversation) + weekly 5-min commendations + one 90-min recording session.
2. **Error-response brief** signed off.
3. **Lexicon localization pass** (~45 min): Mom edits scope to family usage; swaps recorded same sitting.
4. **Kickoff with the boys:** the why (understand the room, voice-note Grann, get the jokes); they nominate music/creators and anthem candidates; they pick capstone format; the family coins code names.
5. **Media vetting:** listen-through of nominated tracks/creators; playlist assembly; bookmark Léa Kokoyé.
6. **Content review sitting #1** (~35 min): first batch of feed posts.
7. Scott: TTS bench (optional); run scope vs. a Crúbadán/OSCAR-derived frequency list when the server's back (sanity check, not source).

## 10. Exit criteria & maintenance

**Will:** read any Kreyòl text aloud at conversational pace; comprehend family speech markedly better and self-repair ("kisa sa vle di?"); hold a 3–5 min family conversation with reliable te/ap/pral (+ konn) control; run the family chat incl. voice notes; follow Léa Kokoyé with peer + Mom support and explain it to the family; recognize register (ak Manman vs. ak zanmi).

**Will not (never implied):** spontaneous fluency; native pronunciation without family feedback; writing beyond chat register; unaided fast-radio comprehension.

**Fall maintenance ships with v1:** Fil la keeps running at 10 min/day; missions monthly; SRS continues; an activation unused regresses.

## 11. Risk register (residual)

| Risk | Likelihood | Impact | Mitigation | Residual truth |
|---|---|---|---|---|
| Boys are overhearers, not addressees | Unknown until U0 | Resizes program | Scope bands | Emerging band is a smaller win; set expectations now |
| Motivation collapse ~U3 | Med-high | Stall | Units-not-weeks, 15-min MVS, agency features, konbit streak, the campaign | No app survives two uninterested teens; the family frame is the engine |
| Mom capacity below plan | Med | Feedback loops degrade | Capacity contract, distribution, template-first Cipher Office, graceful degradation | Degraded mode loses the best loop (family voice feedback) |
| Claude Kreyòl errors surviving review | Med | Teaches wrong forms | Hard native gate; batch small; early units first | Review fatigue is real |
| Slang slots stay empty | Med | "Modern" claim weakens | Weekly family prompt; creator-comment backstop | Course works without slang; it's just less cool |
| Sixto French passages | Certain | Capstone partially opaque | Communal reframe; Mom narrates | By design — that's the feature |
| Dispatch loop stalls on an absent brother | Med | Spine mechanic idles | Async queue + "while you wait" content; adults as alternate receivers | A voice mechanic needs a listener; the family is the redundancy |

## 12. Resources appendix (verified)

**Sixto:** Léa Kokoyé (capstone), Ti Sentaniz (opt-in, framed), Zabèlbòk Berachat, Gwo Moso — YouTube via Sixto Foundation / Montuno Records. **Music:** Tabou Combo; Boukman Eksperyans; RAM; Boukan Ginen; BIC ("Yon lèt pou ti jèn"); family-vetted modern additions (anthem pool). **Listening/reading:** VOA Kreyòl (formal register); VoicesfromHaiti (authentic diaspora prose, heritage-teen interviews); HaitianCreole.net (native phrase audio); HowToCreole; EspasKreyòl (free-license materials); Sweet Coconuts / Mandaly Louis-Charles. **Reference:** Valdman et al. *Haitian Creole–English Bilingual Dictionary* (IU Creole Institute 2007); MIT-Ayiti (DeGraff, CC-licensed); HaitiHub verb-tense sheets; CMU glossary (35,728 pairs — lookup only). **Corpus verdicts:** Leipzig hat "community" = Wikipedia register; public Kreyòl-MT = MT-contaminated; Tatoeba hat = 152 learner-tainted sentences; 2010 SMS corpus = crisis register; Crúbadán = retry (503). **TTS to bench (optional):** jsbeaudry/haitian_creole_tts_11K, jsbeaudry/sesame-creole-tts-11k, facebook/mms-tts-hat.
