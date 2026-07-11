# 04 · THE LAWS — language, copy, anachronism, GM, voice, sensitivity, lint

**Every PR passes checklists a–f (§8). These laws are stated here in their final amended form; the archive holds their history. Where a law names a human gate, the human wins.**

---

## 1. THE LANGUAGE LAW (final semantics — this burned us three times; treat as load-bearing)

1. **taught(tw) ⇔ `tw === 8 ? unit >= 8 : unit > tw`.** A string flips to Kreyòl only when the unit teaching its words is **finished**. Unit 8 is the sole exception: capstone immersion flips *at* 8. The `>=` bug (flipping when a unit *starts*) is the exact failure Scott caught on screenshot — never reintroduce it.
2. **tw is computed, never assigned:** tw = the max taught-unit across every word in the ht string. Any string containing a never-taught word goes in the **tw 8 immersion bucket** (English until capstone).
3. **No whitelist. No "product name" exemption.** Surface names (Fil la, Fokis, Mòn, Pwodiksyon, Misyon, Anrejistrè, Konbit, Padon, Kle 77) are vocabulary with real tw values. The **only** day-1 Kreyòl is the logo — the app's proper name. *(Amended 2026-07-10: the working title is **KÒD LA** ("the rope / the code"), owner decision; it carries `needsReview:true` like every Kreyòl string and the boys' build renders the English mark "THE ROPE" until Manman passes it. "Konbit Kreyòl" remains the program's name.)*
4. **Zero Kreyòl literals in templates.** All chrome text routes through the gate helpers (`T()`, `Tt()`, `tagT()`, `unitTitle()`, `gLbl()`). Kreyòl may otherwise exist only in content data: scope items, posts, scene dialogue, quiz banks, quoted oral literature, and lesson objects of study (e.g. `la · a · an` in the determiner lesson).
5. **Unit titles are bilingual ("Manje · Food") until their unit is complete**, then solo Kreyòl.
6. **Every rendered Kreyòl string carries `data-en`; long-press reveals English.** Content glosses use tap (`data-gloss`). Visual affordances are distinct: sun **sweep** = tappable content word; sun **underline** (`.flipnew`) = chrome newly flipped this unit.
7. **Lint is mandatory and must not be rigged** (§9). *Recorded for posterity: an earlier lint pass was silently defeated by whitelisting violations (detèminan, pwonon, revi…). The whitelist is change-controlled: additions require an amendment to this document.*
8. **Pre-Unit-1 surfaces (gate, the ticket) render fully English** — falls out of rule 1 naturally, but keep it as an explicit test case.

### 1.1 Scope amendments (change-controlled; Manman reviews the batch before it enters the scope)

Earlier batch (ratified): U1 — wi, mwen, fini, semèn, kòmanse, konbit, padon · U2 — monte, konprann, fanmi, ann, pwovèb · U3 — kizin, lòd · U4 — reyaji.

Surface-name batch (pending Manman): U1 — fil, fokis, misyon, pale, ekri, koute, gade, jodi a, demen, w, m · U2 — mòn, pwodiksyon, anrejistrè, kle, **kòd** *(kept for the title "KÒD LA" = "the code"; the "Pase kòd la" / rope usage was purged 2026-07-11, so `kòd` no longer needs tw 3 for chrome — it stays for the title and as vocabulary)* · U3 — legim.

### 1.2 Expression ruling (recorded)

tw derivation matches **exact scope ids only** — no derivational credit (reyaji does not legalize reyaksyon) and no expression-membership credit (tèt chaje does not legalize tèt).

### 1.3 tw recomputations (lawful after 1.1)

Fil la→3 (contains determiner *la*, taught U3), Fokis→1, Misyon→1, Mòn→2, Pwodiksyon→2, Anrejistrè→2, Kle 77→2, Pale→1, Ekri→1, MISYON FINI→1, MWEN DI L→2, microdone→2 (was an unlawful 5), Chat/Slang tags→8 (were an unlawful 1), pwomode→8 (was an aspirational 6), step_fil→8 (*reyaksyon* unscoped), any string containing an unscoped word→8.

### 1.4 The Manman review queue

Nothing renders as gospel until her pass; the full escalation list lives in `08-family-handbook.md` §4 and is part of this law.

## 2. THE COPY LAW (kid surfaces — lintable)

The voice contract stands: **dry, wry, teen-respecting; Strava, not Duolingo; identity-affirming; non-punitive.** These rules operationalize it for every string the boys see — including all game narration, scene text, dispatch prompts, and enemy-intel memos. "Kid surface" = anything rendered outside the dev panel, the GM console, and the printable parent brief.

1. **No spec plumbing on kid surfaces.** Any rendered string containing `§`, "Real build", "prototype:", "audit", feed-mix percentages, or engine taxonomy (*ledger, receptive, productive, tier, band, SRS, retrieval, judgment-first, synthetic, native pass, lint, diagnostic, persistence, localStorage*) fails lint. Scott's info goes behind the dev panel; Manman's goes on the adult surfaces.
2. **Never name the fear.** *Failure, wrong, error, penalty, mock, lose, test* don't render in kid chrome. Safety is demonstrated by mechanics (additive chalk, sunset retries, padon patches, garbled-in-transit), never announced as a denial. A reassurance repeated more than once per app is functioning as a threat — "Nobody loses" appears exactly once, at the battle-screen intro.
3. **No adjectives about the person; no number comparable across brothers on a shared surface.** Bands become course sizes ("600-word track"), visible only in each boy's own Settings. Profile doors carry name + role only. Shared boards show per-brother Kle 77 (an honest individual goal), the shared battle score, and one identical shared-stars bar in both rows; Streak/Pts live in each boy's own masthead. Row order is fixed to leg order, never sorted.
4. **Talk to the kid, never about him.** Second person or imperative; "the boys", "per boy", "each boy" fail lint on kid strings.
5. **Simplify, never falsify.** A rewrite may omit machinery but must preserve the observable contract: tapped words come back, misses set what gets taught first, the tip is genuinely required, XP is effort not mastery, padons are finite and counted. No "by ear" labels on tasks with no audio; no combined bars masking individual goals; empty audio slots say "coming", never pretend to exist.
6. **Requirements are enforced by buttons, not parentheses.** "(required)" and statute citations are gone; the CTA disables until the condition is met and the empty-state toast explains in one warm clause.
7. **Instructions: verb first, payoff second, ≤14 words, one imperative per line, no parentheticals. Buttons ≤4 words and name the act** ("Stamp it done", "Pass the word →"), never the admin ("Mark", "Run", "Redo") and never a policy ("15-min minimum").
8. **Deadlines invite, they never loom.** Units, not weeks, everywhere including the masthead. Targets phrase as targets, not due-dates.
9. **Honesty without surveillance framing.** The kid is told what a tap writes — as his tool, never as the system's trick. "Retrieval hidden in the scroll" never renders, even though it's the true design.
10. **Metaphor budget** *(climb purged 2026-07-11)*. The game re-centers everything on **the campaign and the network**. The pre-pivot **climbing-sport metaphor is BANNED**: rope-as-belay, "climb," "climber"/`grenpe`, "summit," "ascent," "pass the rope," "two brothers, one rope," and `Mòn` as a mechanic brand never render. The co-op battle is **holding/taking the position**; the relay handoff is **passing the word** down the line; the bond is **the wire / konbit**. **Mountains render only as real Haitian history** — marronage (falling back to the mountains = the failure mechanic), the real mountain battles/geography, `mòn` as taught vocabulary; never as a summit to conquer. Surviving period-compatible flavors: the ticket, the dispatch, the shop (FÈMEN), the ladder (media rungs). Gym vocabulary ("rep") is banned; new copy may not introduce further metaphors without recording it here.
11. **Vary the rhythm.** The "fact — warm clause" em-dash construction is the house move, not the house sentence. No two adjacent strings on a screen may share it.
12. **Locks never render.** Gated content shows the rung above you ("Sixto — next rung"), no padlock glyphs (also enforces the chrome emoji ban).
13. **Kreyòl is the home voice.** An ht string may never be colder, flatter, or less funny than its English twin; where the ht is warmer, the English gets raised. Claude coins nothing: doubtful words ship English with a Manman ticket. Every new/changed ht re-derives tw and enters her review queue — a copy fix can never bypass the flip gate or the native gate.

**House reference lines** (the standard all new copy is measured against): "Your ear already knows the answer. Pick what sounds right." · "Pass the word →" · "Fall back to the mountains — regroup, return tomorrow." · "3 reactions done. Come back tomorrow — the shop reopens with fresh posts." · "She rates comprehension, not the food."

## 3. THE ANACHRONISM DOCTRINE

1. **Medium, never history.** Devices, the feed, texting, and anthems exist in-world; every date, person, event, spelling, and legend-flag obeys `01-world-and-story.md`. History checks never test anachronistic content as fact.
2. **Never explained, never apologized for.** The house dry wink only; no lampshading. Recorded here as the frame that absorbs the retired "dispatch wire"/"vwadyo = voice dispatches" costume names (metaphor budget, copy law 10).
3. **No anachronism inside the sensitive frame.** Bwa Kayiman's documented-history treatment, and any family-opt-in Vodou content, is played straight — no phones in the ceremony scene.
4. **In-fiction the network is Fil la.** No real-world brand names in scenes. The family's real chat/voice-note missions stay real-life missions the fiction mirrors.
5. **Chat-Kreyòl is a content class** like feed posts: scope-constrained, glossed, `needsReview:true` until Manman's pass. Chrome gating is unchanged by the fiction.

## 4. THE GM LAWS

1. **GM moves touch the narrative, never the mastery math.** No GM lever changes SRS state, battle thresholds, or mastery displays (extends design principle 7). Enforced by construction: the GM console has no write path to any ledger (`06` §Schema; headless assertion in `07` issue 9).
2. **Adults are never the enemy mechanically.** The fiction opposes the boys; the family never does. The enemy-intel channel is GM-authored but the opponent is the historical army.
3. **The enemy is comic, never menacing.** Enemy-intel memos are kid-surface text (copy law applies in full): overconfident, out of their depth, always slightly behind — never threatening. English only (French is historical artifact).
4. **Async only.** GM moves land between sessions or at scene boundaries, never inside a running scene.
5. **Adult Kreyòl obeys the native gate.** Everything except Manman's own words passes her Cipher Office before rendering to the boys. Her words are auto-certified — she is the gate.
6. **Code names are family-coined.** Claude drafts zero names, zero Kreyòl, zero slang — for adults as for everything else.

## 5. THE VOICE LAWS

1. **Transmission is the grade.** A dispatch succeeds when the receiver acts correctly on it. Success writes prod evidence for the sender and rec evidence for the receiver; nothing else writes speech evidence.
2. **Comprehension is proven by action, never self-report.** No button that says "I understood" credits a ledger.
3. **No machine judgment, ever.** No ASR, no automated scoring, no AI feedback on a boy's voice. TTS, if it ever ships, is labeled "vwa robo" and passes Mom's ear first; it reads content *to* the boys, it never evaluates them.
4. **Failure blames the wire.** The kid-facing state for a failed transmission is "garbled in transit — send it again" (final copy via the normal copy process); a repeat request is free and unlimited; no blame surface exists on either side; two boys' garbles are never compared.
5. **Adult feedback is recast-style voice reply** — the error-response brief's rules (recast, never correct mid-sentence, never mock accent, praise attempts specifically) govern every adult reply on the network; restated adult-facing in `08` §3.
6. **Boys' recordings are private to the family.** Stored in the family's private bucket, family-only access, exportable and deletable by the family (`06` §Storage). Honest settings copy: "stays in the family."
7. **Empty reference slots never pretend.** Until family reference audio exists, slots say "coming" (copy law 5).

## 6. SENSITIVITY RULINGS (binding on all content)

1. **Gran Bwa** is primarily a Vodou lwa (forest spirit, petro; healing/initiation). It reads as religious Vodou content to a Protestant Haitian family. **Not used as a theme or challenge name unless the family opts in** — the design constitution's religious-motifs rule (default out, family opt-in) applies to all new material.
2. **Bwa Kayiman controversy is real and documented:** since the 1990s some evangelical/Protestant currents recast the ceremony as a "pact with the devil" (Vision Haiti's 1998 march; Pat Robertson's 2010 remarks). Many diaspora Protestant families view it negatively. **Ruling:** the game presents it strictly as documented history — the secret planning meeting that sparked the revolution — with ritual specifics left out; Manman gets an explicit opt-in/opt-out on naming the site, with **"Soulèvman 1791"** as the fallback chapter name. (Scott decides the default — open gate.)
3. **Out of a celebration frame entirely:** the 1804 massacre of remaining French colonists (documented, ~3,000–7,000, on Dessalines' orders); the vengeance rhetoric of the independence declaration; all gore. Dessalines is presented through leadership and heroism; the harder history is a family conversation, not an app card.
4. **French in the game** appears only as historical artifact (the motto, place names); the capstone's French asides belong to Manman.
5. **Legend labeled as legend:** "the story goes…" for Flon's needle and Rochambeau's salute — and any future traditional material.

## 7. HOUSE RULES (engineering-adjacent, PR-checklist items)

- Pointer events only; `touch-action:none` on hold-to-record.
- No 4-option select_one outside the logged diagnostic exception (assessment psychometrics beat the UI pattern — noted deliberately).
- No design-token drift (tokens hex-for-hex per `05`).
- Fixed shared-board row order stated in a code comment.

## 8. PR CHECKLISTS (every PR, all green)

a) **Language law** — §1: strict gate, computed tw, exact-id derivation, zero literals in templates, long-press reveal, Manman queue integrity.
b) **Copy law** — §2 (and the string rulings in Appendix A where the surface carries over). All game narration, dispatch prompts, and enemy memos count as kid-surface text.
c) **Design** — `05-design-constitution-v7.md`: tokens, type, border budget, scoreboard header rhythm, per-screen paint-or-fail checklist, non-punitive slate.
d) **House rules** — §7.
e) **History/sensitivity** — §6 + `01` facts, spellings, legend flags.
f) **GM/voice laws** — §4–§5: no GM write path to ledgers; no machine judgment; no self-report crediting; garbled framing; privacy copy honest.

## 9. CI LINT (not riggable)

- **Language lint:** tokenize all template literals; any diacritic-bearing or scope-listed token outside gate helpers/content data fails the build. Whitelist = proper nouns only (Revolution people and places, artists, VOA, IPN), **change-controlled: additions require a diff to this file.** `lodyans`, `vwadyo`, `kapstòn` are not proper nouns and remain unlawful — resolve by scope-add or rename (Manman gate).
- **Recorded lint amendments (2026-07-10, implemented in `web/lint/`):**
  1. **Ambiguous-token policy** — scope ids that are also common English words (declared openly in `web/lint/whitelist.json`, unlike v6-4's hidden skip-list) are exempt from per-token flagging in English chrome; they still flag when diacritic-bearing or inside a Kreyòl phrase. This is the sanctioned replacement for the undeclared v6-4 homograph list.
  2. **Known-unlawful tokens** — `lodyans`/`vwadyo`/`kapstòn` carry no diacritic and sit outside scope, so wordlist rules cannot catch them; they are explicitly flagged (`flaggedTokens`) until resolved, and removing one requires recording the resolution here.
  3. **Proper nouns match case-sensitively** (plus an ALL-CAPS display variant) — "Kreyòl" is a name; lowercase "kreyòl" in running chrome is a leak; the title entry cannot bless lowercase "kòd la" phrases.
  4. **Renderable-text policy** — comments and `${…}` interpolations stripped; JSX text linted at full strictness; whitespace-free ASCII string literals (lookup keys/enums — the lawful chrome path itself) exempt. Hardening to full AST analysis is part of the CI issue.
- **Recorded lint amendments (2026-07-11, Drapo Ginen build):**
  1. **Lwa proper nouns** — the Ginen pantheon named in the art direction and scene frames (`Ginen`, `Legba`, `Papa Legba`, `Ogou`, `Ezili`, `Danbala`, `Gede`, `Agwe`) join the case-sensitive proper-noun whitelist. These are documented sacred names, not coinages; scene *lines* about them remain Manman-gated like all Kreyòl. This blesses "Papa Legba opens the way" on the gate; it does not bless lowercase common-word collisions (`papa` alone still flags).
  2. **`l` is an ambiguous token** — the Kreyòl 3rd-person clitic `l'`/`l` is also a bare Latin letter (SVG path commands `M…L…l`, roman numerals). Like `m` and `w` already listed, it is exempt from per-token flagging in English chrome and still flags when diacritic-bearing or inside a Kreyòl phrase.
  3. **Quoted-literature allowlist** (`quotedLiterature` in `whitelist.json`) — attested proverbs/mottos quoted verbatim on a kid surface are oral literature, not coined chrome (the exception `06-engineering.md §4` already grants the gate motto and `04` grants Bwa Kayiman). Seeded entries: « Men anpil, chay pa lou » and « L'union fait la force » — both documented, both rendered in guillemets with a long-press gloss. The lint strips these exact phrases before scanning. Entries must be attested (national motto / documented proverb), never a coinage or a register claim; those stay Manman-gated.
- **Copy lint:** flags `§`, "Real build", banned jargon (§2.1), fear words (§2.2), third-person-about-the-kid (§2.4) on kid surfaces — **covering toasts and `title=` attributes** (the v6-4 runtime lint walked only `#app`; toasts bypassed it).
- **Scope-coverage lint:** any UI string whose words never appear in the scope is a build error (it would never flip).
- **Review-gate lint:** a seeded `needsReview:true` string rendering in a boy-profile build is a test failure (`07` issue 6).
- Seeded violations of each class must demonstrably fail the build (`07` issue 2 AC).

---

## Appendix A · String-by-string rulings (v6-4 → v7, carried verbatim)

These rulings carry into the build wherever the equivalent surface exists. *(M)* = queued for Manman.

> ⚠️ **Superseded in part by the climb purge (2026-07-11, `00-START-HERE.md`).** Every rope/climb/summit ruling below is a *historical* v6-4→v7 record and no longer reflects shipping copy: "one rope, two climbers", "Pass the rope →", "8 more and you're both on the summit", "The mountain waits for tomorrow", "gets the rope next", "first leg is open — the rope's ready", "Before we climb" are all retired. The current strings live in `web/src/data/ui-strings.json` (reframed to hold-the-position / pass-the-word / fall-back-to-the-mountains, Kreyòl drafts dropped to `null` pending Manman). Kept: marronage as the failure mechanic and « Dèyè mòn gen mòn ».

### Gate / profile select (pre-Unit-1, English chrome)
| v6-4 | Ruling | Why |
|---|---|---|
| Kreyòl activation · two brothers, one rope | **Wake up your Kreyòl · two brothers, one rope** | "Activation" is the methodology's word; same claim, warmer verb. |
| Diagnostic not done yet | **Punch your ticket first** | "Diagnostic" is clinical; the ticket-booth frame already exists. One name for the check, everywhere: *the ticket*. |
| Door stats (STREAK/PTS/KLE 77 side by side) | **Removed.** Doors carry name + role. | Adjacent numbers ARE a ranking; on day 1 it's a scoreboard of zeros. Shared konbit goldband stays — that number is genuinely collective. |
| Band on door meta ("Band Strong") | **Removed from gate and masthead.** | Two evaluative adjectives on adjacent doors is a head-to-head verdict re-read daily. |
| "nobody has climbed this unit yet" | **first leg is open — the rope's ready** | Same fact as invitation, not empty attendance sheet. |
| goldband | **Konbit · N days — it survives if either of you shows up** + « L'union fait la force » pairing | The co-op layer's voice. |

### The ticket (diagnostic)
| v6-4 | Ruling | Why |
|---|---|---|
| Guessing is fine — a miss just means "Acquire tier," not failure. | **Guessing is fine — a miss just tells the app what to teach first.** | Tier machinery + the word "failure" both gone. |
| Real build: aural test… (§2) | **→ dev panel** | |
| toast: "band Strong (~600) · tiers set from your answers" | **"Leo — 600-word track. The feed now fits what you already know."** | Course size, not a grade; the moment hands him something instead of filing him. |
| Ticket header, read-aloud step, self-rating options | **Kept verbatim** | "Before we climb · ticket 3/12", "Read it aloud. Honestly — how did it go?", "Couldn't read it / Slow but got it / Read it smoothly" — house standard. |

### Chrome / masthead
| v6-4 | Ruling |
|---|---|
| Week ${unit} | **Unit ${unit}** (program is units-not-weeks precisely so slow weeks don't read as falling behind) |
| ${role} · Band ${band} | **${role}** only |
| perforated tikè chips | **stat pairs** (label over tabular numeral) — design law |

### Front page (dashboard)
| v6-4 | Ruling | Why |
|---|---|---|
| TODAY · N reviews waiting in Feed | **TODAY · N words back in the Feed** | "Reviews waiting" is homework-inbox voice; "back" is the honest SRS fact. |
| Fokis — determiners, judgment-first | **Fokis — determiners by ear** | Jargon out; contents stay. |
| 15-min minimum (button) | **15-min version** | A policy floor wired as a button. |
| Micro-mission: say one taught phrase to a family member today | **Tiny mission: say one of your new phrases to someone in the house today** | Lesson-plan words out; "Ti misyon" ht offered to Manman *(M)*. |
| Done — said it out loud | **Said it out loud** (button) · stamp **SAID IT / MWEN DI L** | First person, taught words, lawful tw 2. |
| The 77 core words. All receptively solid by end of Unit 3. | **The 77 words in almost every sentence. Solid by Unit 3.** | Dry, honest, shorter than the original. |
| Rec / Prod (grammar drawer) | **Know / Use** · footnote: **Two marks per pattern: knowing it when you hear it, and saying it yourself. Sun = waking up · palm = solid.** | |
| Grammar map — recognition \| production | **Grammar map — what you know \| what you use** | |
| "Konbit standings — one team, two climbers" | **Konbit — one rope, two climbers** + motto kicker | "Standings" means ranking; table restructured per copy law 3. |
| One team. Roles swap Mondays — each brother teaches what he leads. | **One rope. Roles swap Mondays — you each teach what you lead.** | Third-person roster voice killed. |
| Sixto 🔒 · Léa Kokoyé 🔒 | **Sixto — next rung · Léa Kokoyé — top rung** | Padlocks are paywall vocabulary + emoji-ban violation; "top rung", never "the summit" (that word belongs to the battles). |
| mix: 60% unit / 25% review / 15% seed | **→ dev panel** | Algorithm internals. |

### Fil la (feed)
| v6-4 | Ruling | Why |
|---|---|---|
| Tap the highlighted words · react to 3 posts | **Tap the gold words for meaning · react to 3 posts** | Keep the goal, take only the "gold" upgrade. |
| DUE / REVI badge | **Quiet sun dot on due posts, no text badge** | Homework vocabulary out. *Amends an earlier ruling — Scott sign-off requested (open gate).* |
| DRAFT badge + "Synthetic draft — blocked until native pass (§1)" | **Dev-panel-only** (production filters unreviewed posts out of the boys' feed entirely) | |
| "Got it ✓" writes real receptive reviews — retrieval hidden in the scroll (§6). | **Deleted; the toast carries the disclosure.** | Announcing covert testing is surveillance framing. |
| toast: "3 items → receptive ledger" | **"3 words logged — they'll be back."** | |
| Vwa Grann · awaiting family recording | **Vwa Grann · not recorded yet — go bug Grann.** | Pipeline status becomes the actual family mission. |
| FÈMEN body | **Kept**; ht stays the faithful twin *(M)* | |

### Fokis (slate)
| v6-4 | Ruling | Why |
|---|---|---|
| Intro paragraph | **Kept** ("Your ear already knows the answer. Pick what sounds right — the rule comes after.") | Model copy. |
| Miss feedback "Ear says: la — …" | **"Close — the rule: plain consonant → la"** | Crediting "the ear" with the answer the kid's ear just missed undercuts the premise at its most fragile moment. |
| "Which sounds right?", "The rule your ear already knew" | **Kept verbatim** | |

### Mòn / battles (relay)
| v6-4 | Ruling | Why |
|---|---|---|
| Leg labels "listening / match", "(listening-style)", "pick the written form (reading)" | **Leg 1 · match the word to its meaning / Leg 2 · pick the right form** | Honest — neither leg had audio in v6-4. (Voice volleys, which DO have audio, may say so.) |
| Leave a tip for your brother (required) | **Leave a tip for your brother** — Pass button disabled until text | Enforcement by button, not parenthesis. |
| Explaining it is retrieval for you, a hint for him (§7). | **Explaining it locks it in for you — and gives him a head start.** | |
| toast: The tip is required (§7) | **The rope goes with a tip — one line is enough.** | |
| "Your leg needs 8+ to summit together." | **"8 more and you're both on the summit."** | The rope needs the points; no single back carries them. |
| "Nobody loses" ×3 | **×1**, at the intro only | Copy law 2. |
| "(Advance the day in Prototype to retry.)" | **→ dev panel** | Dev instruction inside the app's most emotionally loaded state. |
| waiting… | **gets the rope next** | Points the relay forward. |

### Pwodiksyon (recorder / dispatches)
| v6-4 | Ruling | Why |
|---|---|---|
| Real build: listen–compare–rerecord… (§8) | **→ dev panel.** On-screen: **Manman's recordings land here soon. Until then: record, listen, trust your ear.** | |
| Hold the button · release to stop | **Hold the button, say the line.** | Old line described the mechanism twice and the task never. |
| Play it back · compare · rerecord | **Play it back — rerecord if you can beat it.** | Strava voice: self-competition against your own take. |
| Mic unavailable — grant permission on the shared PC. | **Slate instruction panel, numbered:** 1. Click the lock by the address bar · 2. Allow the microphone · 3. Hold the button again | Denied mics don't re-ask; the numbered path is the honest one. Phone-platform variants per `05` mobile addendum. |
| Mark set complete (+ MISSION DONE stamp reuse) | **Said all 5 · +20** · new stamp **SET DONE / FINI** | Button names the act; the mission stamp stays unique to the mission. |
| Ref · family | **Family audio — coming** | An empty slot must not claim the audio exists. |

### Misyon
| v6-4 | Ruling | Why |
|---|---|---|
| Mark mission complete / "Make misyon fini" | **Stamp it done** / ht *(M — Manman coins it; "Make misyon fini" retired)* | The worst coinage in the table dies. |
| Family brief footer (recast / never mock accent / roles) | **→ printable parent brief.** Kid screen keeps: **Manman's role this week: co-player.** | Coaching instructions TO adults ABOUT the boy were rendering on the boy's screen; "never mock accent" pre-plants the fear it guards against. |
| Manman's rating | **Manman's stars — issued from her own door** (GM console supersedes "hand her the mouse") | The honest mechanic, now actually enforced by adult login. |
| MISSIONS descriptions | **Second-person rewrites** ("you two plus Manman, mics on", "each of you", "You two host — play the segments, explain the Kreyòl") | Copy law 4. |

### Settings & toasts
| v6-4 | Ruling |
|---|---|
| Band (diagnostic result) | **Your track · ~600 words this summer** |
| Redo diagnostic / Run | **Redo the ticket / Retake** |
| reveals English (§9) | **shows the English** |
| Current-unit preview hint · Persistence row | **→ dev panel.** New row: **Saving — your progress stays in the family.** *(Amended from "lives on this PC / nothing leaves the house" — retired with the local-first stack; see `00` §4.)* |
| Konbit streak reset. | **Streak reset — it starts again the moment either of you shows up.** |
| Padon used — konbit streak repaired | **Padon used — streak repaired.** (keep "used"; padons are finite and counted) |

### Manman review queue escalations
Carried in full in `08-family-handbook.md` §4 (part of the language law's review gate).
