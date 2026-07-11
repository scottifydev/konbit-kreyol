# 09 · GAME MECHANICS — the unified spec (everything, tied together)

**This is the definitive, consolidated mechanics design: the one place every element — voice dispatches, the two-ledger SRS, the co-op battle, the campaign, the economy, marronage, the GM/family layer — is specified as ONE playable game rather than a pile of features. It is the product of a research-grounded design pass (co-op design, SRS-gamification failure modes, roguelike meta-progression, voice-as-mechanic + knowledge-as-weapon, teen reward psychology, narrative-mechanics fusion → three competing blueprints → a pedagogy/fun/laws judge panel → this synthesis).**

**Precedence:** this doc governs *how the pieces fit and the battle/economy formulas*; it does not override `03-language-program.md` (pedagogy is sovereign), `04-laws.md` (laws are sovereign), or `01-world-and-story.md` (history is binding). Where `02-game-systems.md` describes a mechanic in prose and this doc gives it a formula, **this doc's formula is the build target** and §11 lists the engine deltas. Adult-facing engineering register — the copy law does not apply to this file; it applies to everything the file specifies shipping to a boy.

Corpus date: 2026-07-11 · Owner: Scott · Native gate: Manman.

---

## 1. The spine, in one sentence — and the four literal equivalences

**"I said the code into my phone and my brother DID the thing."** That is the load-bearing thrill a teenager re-opens the app for. Everything else exists to make that sentence keep meaning something.

The design coheres because four things are *literally the same object*, not a theme painted over a mechanic:

| Equivalence | The fiction | The system |
|---|---|---|
| **CIPHER** | Kreyòl is the code the enemy's army physically cannot read | the double-ledger voice dispatch — one act writes the sender's production ledger *and* the receiver's recognition ledger, and feeds the comic enemy-intel decode-fail |
| **TACTICS** | knowing the terrain and the history wins battles | history/geography ride the battle as optional **flanks** that change the volley *set*, never the accuracy bar |
| **MEDIUM** | orders move by spoken message down the wire | the voice dispatch is at once the production exercise, the comprehension test (proven by action), the co-op bond, and how the war is fought |
| **MAP** | the revolution advances 1791 → 1804 across real ground | derived mastery advancing the true-coordinate campaign IS the progression bar |

Pull the game layer off entirely (Pwo mode) and the pedagogy still runs; pull the pedagogy and a co-op voice-thriller still stands. Neither ever fights the other, because **every verb is both at once.**

---

## 2. The core loop — five retrieval acts, each dressed as a war verb

Second to second, a boy is doing exactly one of five honest retrieval acts. None is ever announced as a test; none is a quiz screen; there is no "Correct!", no confetti, no mascot. The Drapo Ginen art carries the seriousness (Strava-dry).

1. **TRANSMIT** *(production retrieval).* Press-and-hold the flat lambi (conch) glyph — pointer events, `touch-action:none`, concentric rings pulse — and speak the **shortest correct Kreyòl that carries the order**. The one-way wire *forces compression*, and compression under load IS productive retrieval. Release → the barbed march-arrow goes dashed → in transit. Audio streams to the family's private bucket; never machine-analyzed.
2. **ACT ON A DISPATCH** *(recognition retrieval, proven by consequence).* The receiver hears **only the audio** — never the sender's order text — and proves comprehension by **picking the move the dispatch dictates** from a hidden set of **≥2 tactical moves** pair-generated so they are separable *only* by parsing the Kreyòl. Correct → the block advances, the arrow snaps solid. There is **no "I got it" button** that credits anything; the consequential pick is the grade.
3. **READ THE NETWORK** *(Fil la — receptive retrieval in context).* Thumb-scroll the revolutionary group chat: camp gossip, family voice notes, and the enemy's intercepted-and-garbled memos (the thesis restated as running comedy — the empire one step behind). Tap Kreyòl to gloss; long-press chrome for English. A reaction / "Konprann ✓" is a chirp-style gift that silently writes a receptive review, **idempotent** (one per post per profile).
4. **JUDGE ON THE SLATE** *(Fokis — generation effect).* An officer chalks the day's grammar; the boy commits a grammaticality **judgment before the rule/label appears**. Correction is additive chalk — circle the answer, neutral strike — **never a red-X**.
5. **VOLLEY IN A BATTLE LEG** *(interleaved retrieval in costume).* Each volley is one retrieval drawn from **his own due queue**; same-day it can be a spoken voice-volley the other must act on.

The felt loop everywhere: *a challenge appears → he retrieves from memory (never recognizes among guessable decoys) → the world answers in-fiction → the honest ledger quietly updates.*

---

## 3. The session loop — one mission down the wire (30 min; 15-min floor)

Sequenced to exploit the forward-testing effect (due retrieval first primes new encoding) and to **culminate in production** so difficulty stays honestly calibrated. Surface names are taught vocabulary with computed `tw` values, not branding, and stay fixed (`02` §2). Dev-panel mix numbers never appear as kid copy.

| # | Step | ~min | Gives |
|---|---|---|---|
| 1 | **Revi** — "check the wire": the day's due SRS as the first feed posts | 3–5 | strongest-decay items refreshed first; +XP for showing up; due-count band-capped with forward-spill (never a scary debt number) |
| 2 | **Fil la** — "read the traffic": scroll, tap-gloss, ≥3 reactions (60% current / 25% review / 15% next-unit seed) | 4–5 | receptive-ledger volume in real narrative context |
| 3 | **Fokis** — "the war college": judgment-first grammar, macro-audio first, rule as a label only after the ear commits | 8–10 | generation-effect reps; the judgments that later become battle volleys |
| 4 | **Pwodiksyon / dispatch** — "send the order": record against reference audio where it exists, then send the real dispatch the brother must act on | 8–10 | **the only block that advances the production ledger** + a message on the wire |
| 5 | **Mòn / konbit** — "hold the position": his relay battle leg (or a konbit mission); volleys from his due queue; mandatory tip at handoff | 5–7 | the chapter battle's combined score + a tip banked for his brother |
| 6 | **Micro-mission** — "spend it back": a real dispatch to someone in the house he *wants* to send (U4+: a family voice note); opt-in, diegetic, never gates the streak | 0:10 | the heritage-relatedness payoff no XP can fake |

**The 15-minute floor:** Revi + react-three + one dispatch keeps the streak and SRS whole on a bad day. The full 30 is the aspiration, **never a punishment** for the boy who had 15. Weekly, a **Misyon Fanmi** replaces one production block, rated by Manman's stars.

---

## 4. The co-op battle — HOLD / TAKE THE POSITION (the formula)

The chapter battle maps one-to-one onto the science of cooperation (Johnson & Johnson's three pillars) with Portal-2's no-solo-solve encoded as a real formula. **Everything here keys off the SRS due-queue and derived mastery only** — XP, narrative flags, and GM moves touch none of it.

### 4.1 Roles (asymmetric, rotating)
Each brother runs one leg matched to his **Majò** role: **Majò lekti** (reading / recognition leg) and **Majò koute** (listening / action leg). Roles **swap every Monday**, so no fixed hierarchy calcifies and each boy alternately leads his stronger skill while being coached in his weaker (the protégé effect). The relay *variant* also varies by chapter (a written-dispatch leg one chapter; a same-day spoken voice-volley leg the next) — but variety is gated on chapter progression and **never becomes a mastery shortcut**.

### 4.2 The volley budget — band-fixed and bounded
Brother *i* is dealt a leg of **b_i** volleys from **his own due queue**, most-overdue first (individual accountability — he cannot ride his brother's pile; per-boy procedural freshness for free):

- **Emerging b = 6 · Moderate b = 8 · Strong b = 10** (from the diagnostic band, §9).
- If due count < band budget on a given day, `b_i = min(bandBudget, availableDue)`, topped up from already-seen mixed-review items so a light day is **never a shaming shortfall**.
- Because *b* is small and bounded, a single attempt is cheap (≤ a few minutes) and marronage stays light.

A volley **lands** iff the retrieval is correct: a recognition match (lekti leg), a Fokis judgment, or — on a same-day voice-volley (U4+) — the receiver picks the dictated move from the audio. Two wrong picks on a voice-volley → **"the wire garbled it"**: void volley, free re-send, **no false evidence written, no ASR**.

### 4.3 The take-condition (three pillars, no solo-solve)
Leg fraction **L_i = h_i / b_i ∈ [0,1]** (own accuracy on own due queue). **L_i is never rendered as a number comparable to the brother's on any shared surface** (the Journey rule — the vocabulary of comparison is deleted from shared surfaces).

**Take the position iff ALL THREE hold:**
1. **Positive interdependence** — `L_A + L_B ≥ T`, with **T = 1.30** (they must average ≈65% across both legs).
2. **Bounce-back floor / individual accountability** — `L_A ≥ m AND L_B ≥ m`, with **m = 0.40** (each boy lands ≥40% of *his own* volleys).
3. Both legs marked done (tip passed).

Condition 1 lets a strong day carry a tired brother across the sum; condition 2 means it can never carry him *below his own reachable floor* — no maxed-out brother solo-clears. Because *b* and the queue derive from each boy's band, **m is always reachable at his level** and never a shaming bar.

**Worked example.** Leo (Moderate, b=8) lands 5/8 → L=0.625. Isaac (Strong, b=10) lands 8/10 → L=0.80. Sum 1.425 ≥ 1.30 ✓; floors 0.625 ≥ 0.40 ✓ and 0.80 ≥ 0.40 ✓ → **position taken**, anthem drops. Counterfactual: Leo 2/8 = 0.25 < 0.40 → floor fails → marronage; the surface shows only *"the position holds till tomorrow — fall back to the mountains,"* never "Leo fell short," never a per-leg number.

### 4.4 The mandatory tip — a plain double-rep, ZERO gate effect
At handoff the **outgoing brother PRODUCES the tip phrase** (a production-ledger review) and the **incoming brother READS it** (a recognition-ledger review). He is told **at the start of his leg** that he owes the tip, so he encodes-to-teach throughout. The Pass button is disabled until the tip box has text (enforcement by button, not parenthesis); the engine refuses an empty tip as backstop.

> **Design kill (pedagogy judge, load-bearing):** a proposed "+0.10 to the sum" tip bonus is **DELETED**. A tip must never inject a *non-retrieval* input into a threshold that reads only evidence (Law 1). The tip's honest value is the two real reps and, on marronage, the pre-loaded recognition hint tomorrow — never a numeric nudge to the bar.

A **"what your brother saw"** card shows his *situation-context*, never his *answer*, so the relay runs async across a day on two phones.

### 4.5 The history/geography flank — changes the SET, not the bar
If a boy has read the chapter's milestone gloss (long-press a proper noun → a factual Drapo Ginen broadsheet aside; **writes no ledger**), an optional flank card appears he *may* play: it **reduces his leg's volley budget by 1** for that attempt (floor b ≥ 4) — "you know the terrain, you commit fewer runners." He still faces real retrievals from his own due queue and still must clear T and m over the smaller *b*, so **the accuracy bar is unchanged**; only how many volleys he runs changes. A boy who skipped the fact takes the position at full *b* on language alone.

> **Design kill (pedagogy judge):** a proposed "−0.15 to T" history bonus is **DELETED** for the same reason as the tip bonus. History is a genuine tactical choice ("how do we take this?"), and language always suffices; history is **never a gate** (Law 4).

### 4.6 Marronage carry-forward
Legs and scores reset; **`leg.tip` persists**; every SRS review already logged during the attempt **stays** (the learning grew even on the loss); tomorrow opens with *"here's the word your brother left you,"* pre-loading the incoming boy's first volley as a recognition hint (a real review, higher land-chance — a cooperative edge, never a mastery cheat). See §8.

**Shared surface rule:** only the collective position status and the shared battle diagram show; no per-brother leg number is ever comparable side-by-side. The only inter-brother expressive acts are positive (chirp reactions, the tip, Mom's stars).

---

## 5. The voice-dispatch spine — end to end

Obeys every voice law (`04` §5). **Sender and receiver checks are generated as a PAIR — this pairing is the single highest-priority QA gate in the whole game** (§11).

1. **Prompt** *(story act).* A scene / mission / battle asks the sender to record a spoken Kreyòl dispatch targeting specific scope items — a password, an order, a description, a rally line. His screen shows the tactical **situation** (the target, the move that must happen); the receiver's screen will **never** show that target.
2. **Record.** Hold the lambi (pointer events, `touch-action:none`); speak the shortest correct Kreyòl; release. Audio → the family's **private** Supabase bucket — exportable, deletable, never machine-analyzed.
3. **Transit** *(the cipher made literal).* A runner carries it; the enemy-intel channel may post a **garbled** French/English intercept — the empire literally cannot read the code. Scripted comedy, **not ASR**: no machine ever touches the boy's voice.
4. **Receiver acts** *(comprehension by consequence).* The other brother (or an adult) hears **only the audio** and executes — picks the move on his hidden ≥2-move set (separable only by parsing the Kreyòl), answers the embedded question, or runs the route. **The consequential action is the grade; no self-report path credits anything.**
5. **Double-ledger write.** One successful transmission writes a **production** event for the sender **and** a listening-**recognition** event for the receiver, on exactly the targeted items (the two-ledger model mapped one-to-one; the receptive-strong/productive-weak heritage asymmetry rendered as a mechanic). The write occurs **on successful receipt** (the correct action), not on recording.
6. **Garble / retry** *(marronage in miniature).* A wrong action (or two wrong picks, which defeats brute force) renders as *"garbled in transit — say it again, runner."* The receiver may request a repeat (authentic conversational repair — an exit-criterion behavior, not a penalty). It blames the wire / weather / the comic enemy's jamming — **never a boy, never his accent, never his voice** — costs nothing, and **writes no false evidence** (a garble simply is not evidence; it never demotes a ledger). *"The wire crackled"* is the only failure story a dispatch is ever allowed to tell.
7. **Adult reply** *(recast, human-only).* Adults reply **by voice**, recast-style — say the line back naturally, never correct mid-sentence, never mock accent (`08` §3). Manman's Cipher Office attaches commendations. **The boys' own recordings are not filtered by the native gate** — the gate protects what is shown *to* the boys; their productions get warm human feedback, not filtering.

**Async tolerance.** The loop never blocks on an absent brother: pending dispatches queue, "while you wait" content fills the gap, and adults are redundant receivers so a voice mechanic always has a listener. Same-day, dispatches become live-ish voice-volleys in the battle. **Anti-gaming:** keep the action space wide so a random pick rarely lands; adults may flag "credited generously" in the GM console to inform Manman's attention — that flag touches no ledger.

---

## 6. The economy — six walled lanes and the overjustification firewall

**Master law:** no reward is ever contingent on language performance (the overjustification firewall). **Audit rule (assert in tests):** if any XP/reward source pays for accuracy, comprehension, or mastery, it is cut on sight. **Surface rule (anti-Skinner-box):** the boys perceive at most **three** things — the campaign map, the konbit streak-as-rising-trend, and the anthem drop. Everything else lives in dev panels or, at most, Strava-dry in a boy's own Settings.

1. **XP — effort/completion only, ambient.** Fixed payouts for *acts*, never correctness: Revi +10, dispatch **sent** (not understood) +15, Fokis done +10, battle leg **played** +20, micro-mission +5. XP **gates nothing** and never feeds a battle threshold. No "perfect-session" or accuracy bonus — the exact re-coupling the audit forbids. **Pwo mode** hides XP entirely per profile with **zero loss of function** — and this is the proof-by-construction of Law 1: *a test asserts every gate resolves identically with the XP subsystem removed.* If Pwo mode ever breaks a gate, a reward has illegally coupled to mastery.
2. **Derived mastery — the real progression.** Not a currency; never stored; always computed from the two ledgers (`03` §6, `srs.ts`). Leitner intervals [1,3,7,16]; Tier-A seeds to the 7-day box (box index 2 — the annotated non-bug, `06` §5.1, **do not "fix"**). prod-solid = 3 consecutive correct spanning ≥7 days with ≥1 in mixed review; rec-solid = box ≥ 3 with last two correct; **gentle** demotion = 2 consecutive misses (never 1, never hard-reset). **The only thing battle thresholds read.** Displays never lie for drama — that honesty is what makes felt competence trustworthy. Surfaced honestly but *quietly*: the Kle-77 tick-ruler and Know/Use grid live in Settings, never a headline.
3. **Konbit streak — shared and forgiving.** Survives if **either** brother plays a qualifying (≥15-min) session (structurally never-miss-twice; no single boy can break it). Ambient, framed as a rising trend, never a fragile object, never per-brother-comparable on a shared surface. Reminders are invitational and forward ("the wire's open tonight") — a forbidden-copy lint bans every loss-anchored phrasing ("don't break your 12 days!", confirmshaming, countdown-to-loss).
4. **Padon — finite, counted, honest streak-repair tokens.** Applied **silently** on rollover as "the konbit held," discovered retroactively, never a guilt popup. Earned **back** through effort (a completed full loop or a family mission restores one), **never purchased**. Marronage is its narrative face.
5. **Mom's stars / commendations — the warm human, positive-only layer.** Weekly Misyon Fanmi rated 0–3 stars from Manman's own logged-in Cipher Office door; dispatch commendations attach to specific voice notes. Stars gate **missions and Memwa/narrative unlocks only** — never mastery, never a battle. No surface lets one boy scold or outscore the other.
6. **Anthems — the sanctioned, honest variable reward.** One real modern Haitian track (Boukman Eksperyans, RAM, BIC…) drops when a chapter's position is **taken** — unpredictable in feel but **milestone-locked** (never a daily randomized chest), chorus keys pre-taught so it's a text not just a vibe. **Authentic media access** (formerly "media rungs" — ladder framing killed with the climb metaphor) rides chapter progression: new songs/creators/segments simply **become available** as the world widens, culminating in the family listening event that IS the capstone exit criterion.

**Interlock rule for the whole economy:** only SRS **evidence** opens positions; every other lane celebrates effort or belonging and stays strictly **off** the mastery→threshold path.

---

## 7. Meta-progression — the map is the bar

The campaign map of Saint-Domingue **is** the progression bar: 8 units = 8 chapters = 8 real battles at true coordinates and dates, marching 1791 (northern rising) → 1804 (Vertières, Jan 1). One live milestone at a time; future legs render **dashed** (fog of war, not a padlock).

**A day advances the war only through evidence.** A chapter is **double-gated, language-primary:**
- **(a) Language gate** — the unit's real pedagogy exit criterion (`03` §4; e.g. Ch3: five kitchen commands recorded as dispatches, Mom-rated comprehensible), AND
- **(b) Take the position** — the chapter battle cleared by the §4 formula.

Because the battle threshold reads evidence-weighted derived mastery **exclusively** (never XP, never a hand-authored HP bar), the two keys are really one: you take the position only to the degree you actually know the material. So **"getting further" always means "the boys actually know more."** The anti-stat-meta rule: unlocks are **content / scope / narrative**, never a power multiplier.

**Difficulty rides mastery, Hades-heat honest but leech-safe.** The threshold is **fractional** (accuracy on each boy's own band-sized budget), so it can never inflate with an overdue backlog — the fix for a raw-count threshold, which would punish the boy with a leech pile. As scope grows, more items come due and each battle stays a genuine test forever, always winnable by language alone, and never stonewalls (a boy's queue only ever holds what he's been taught or seeded).

**Two decoupled tracks** run the whole campaign (the Hades split): a **volatile** in-attempt track (the battle leg) that resets on marronage, and a **durable** track (SRS reviews already logged + banked tips + narrative beats + the anthem archive + the map) that **only ever accretes.**

**Dramatic irony holds tension despite a known ending.** Haiti's 1804 victory is historically fixed, sacred, and never gamed for drama (facts/spellings binding; legend labeled as legend). All suspense lives in the **how** — does this dispatch clear the wire, which flank we take, do we hold today or fall back with a tip — never in the **what**. The comic enemy-intel channel plays the villain who does not yet know he loses. Units-not-weeks pacing (plus two slack weeks) means the campaign advances on **gates, never a calendar whip.**

**What a cleared chapter unlocks:** the chapter's real anthem drops; the map advances a coordinate; a Drapo Ginen comic strip assembles from the boys' **own artifacts** (the dispatches they recorded, the position held, the tips passed); new mechanics come online by chapter (voice-volley legs + konbit multi-dispatch missions from U4+; Grann's testimony as listening texts at Ch5; Memwa flashbacks between chapters); and the authentic media simply **widens**.

---

## 8. Failure — marronage is a deposit, never a punishment

**Marronage is the only failure state.** The maroons fell back to the mountains to fight another day — literally how the revolution was fought (« Dèyè mòn gen mòn » — behind mountains, more mountains; the refuge is endless). **Never game-over, never a lost run, never a ranking, never a red "defeat" / "failed summit" screen** (the climb metaphor is purged, `04` §2.10).

**What a lost battle does** (conditions unmet — sum < 1.30, or either boy below the 0.40 floor):
- **(a)** the column falls back — a sunset-panorama beat in palm-green regrouping framing; the battle-plan's dashed-withdrawal-arrows-into-hachures (marronage drawn as the maneuver it historically was); the GM/enemy-intel channel fires a scripted retreat beat — **narrative only, zero ledger write** (GM law);
- **(b)** *"Nobody loses"* is said **exactly once** in the entire campaign — at the very first battle intro — and never repeated (repeated reassurance reads as condescension to a teen; thereafter the fiction alone carries it);
- **(c)** the mandatory handoff **tip** surfaces as tomorrow's opener — *"here's the word your brother left you"* — pre-loading the incoming boy's first volley as a recognition hint.

**What carries forward:** all real retrieval evidence from the attempt (the ledgers grew even on the "loss"), the tips (`leg.tip` kept; legs/scores reset), the konbit streak (a battle loss is **not** a missed day), and the full narrative position — nothing is erased, ever.

**Why it never punishes:** a single attempt is cheap and bounded (b = 6/8/10, ≤ a few minutes), so loss-aversion stays near zero and "come back tomorrow" is a shrug-and-go; the epic weight lives in the anthem drop and the true-coordinate map, never in leg length. A floor-miss is framed as "the position holds till tomorrow," attributed to the position/wire, never to a boy and never a per-brother number.

**Smaller failures:** a garbled dispatch is diegetic weather ("static in the hills — say it again, runner"), a free unlimited retry that writes no false evidence. A missed day is silently padon-repaired. SRS lapses demote gently (2 consecutive misses); overdue items **spill forward** rather than piling into a visible leech-debt; leeches route to lighter, higher-context re-encounters in Fil la rather than being brute-forced. **Failure is always folded into the fiction** — the retry is weather, never a correction.

---

## 9. Onboarding — the thesis felt in five minutes, then the ticket

**The 5-minute hook — the thesis FELT, not explained** (shared PC = the campaign theater; each phone = the private dispatch recorder). Pre-Unit-1 surfaces render fully English (the flip gate falls out naturally). Dry, wry, adult-looking.

**Act-before-you-produce first touch.** The app opens on **"THE CODE"** (KÒD LA pending Manman's gate). A rider stops you at the ford and speaks fast: « Kote w prale? » You are **not** asked to produce yet — you **act**: pick where you're going from a small set separable only by understanding him. The instant you act right, the enemy-intel channel posts a garbled English intercept of your network — *they can't read you.* In sixty seconds a heritage kid has felt the whole thesis — *Kreyòl is the code the empire cannot read, and I already understand some of it* — validation, not a beginner's humiliation.

**The ticket** (diagnostic, Unit 0, days 1–2; in-fiction as the Cipher Office intake — "high command needs to know what you can already carry"). Framed as a **laissez-passer** to *join* the network; identical structure for both boys; no physical-description fields; zero test-anxiety copy ("Guessing is fine — a miss just tells the app what to teach first"; the word "failure" absent). Three probes:
- **(a)** a 120-item **aural recognition** sample — hear word → pick meaning, stratified across domains;
- **(b)** a **decoding** probe — read 10 phrases aloud, recorded, checked against reference audio **by ear** (no machine judgment);
- **(c)** a 60-second **picture-description** production probe — "describe the camp," Mom-scored for comprehensibility.

**Outputs per child:** a **tier table** for every scope item (Tier A "Link" seeds to the 7-day rec box; Tier B "Confirm"; Tier C "Acquire" ≤ 3–5/day) **and** a **scope band** — Strong ~600 / Moderate ~450 / Emerging ~300 items — that **sizes everything** downstream (feed mix, SRS load, volley budget b = 10/8/6, gates). The result **hands him something** instead of filing him: "Leo — 600-word track. The feed now fits what you already know." Bands are kid-facing **only** as a course size, visible only in a boy's own Settings; the brothers may land in different bands, expected and **never comparable** on a shared surface.

**First chapter → first dispatch (winnable first run).** Chapter 1 (Soulèvman 1791 / Bwa Kayiman naming pending Scott's gate) opens immediately; its first position-threshold is seeded **winnable from the Tier-A 7-day box** the boys already comprehend — a guaranteed low-stakes transmission that teaches record → transit → brother-acts → take-the-position **before** any real pressure. Within the first session the boy records his **first real Kreyòl dispatch**, watches it go "on the wire," and his brother **acts on it correctly** — the block advances, the arrow snaps solid — and both feel the walkie-talkie thrill. The family kickoff (code names family-coined — Claude drafts **zero** — anthem nominations, capstone-format choice) frames the why.

---

## 10. The interlock — one data-flow, one hard rule

**The SRS ledgers are the only source of truth for mastery.** Every element either **writes** a ledger (learning acts), **reads** derived mastery (game acts), or writes **neither** (narrative acts) — and the three never cross. That is the whole coherence.

- **Writers (learning layer → ledgers):** Fil la reactions / Konprann → rec reviews (idempotent, `reactToPost`/`gotIt`); Fokis judgments → rec/grammar evidence; Pwodiksyon/dispatch → prod (sender) + rec (receiver) on successful receipt; battle volleys → reviews from each boy's own due queue (**the relay IS the SRS in costume** — never announced as surveillance); the mandatory tip → prod (giver) + rec (receiver).
- **Readers (game layer, zero write path):** derived mastery sets which items are due AND sets the position-threshold (fractional, evidence-weighted, never XP); XP / streak / padon / stars / anthems / media-access read completion and narrative only and gate **nothing** in the mastery math.
- **Neither (narrative layer):** Scott's GM + enemy-intel channel and Manman's Cipher Office write **narrative events only** — async, **no FK from `gm_queue` to any ledger** (verified in-schema) — so the story colors the fiction around a boy's honest state without ever moving it. The **native gate** wraps all rendered Kreyòl (`needsReview:true` filtered from the boys' build; Claude coins nothing).

**One act, every system, every law:** a single spoken dispatch in a battle voice-volley writes the sender's prod ledger and the receiver's rec ledger (**pedagogy**), scores into L_i toward the position threshold (**game**), triggers the enemy decode-fail beat (**narrative/thesis**), earns sent-XP and keeps the shared streak (**economy**), can be commended by Manman (**family**), and moves the map one coordinate closer to 1804 (**meta**).

**Family is infrastructure, not decoration:** Manman's Cipher Office is native gate + voice-feedback desk + commendation door; adults are receiver-redundancy for the async spine; Grann's testimony becomes U5 listening; the micro-mission spends the day's learning back into the relationship that motivates it (overjustification-proof relatedness).

**The data-flow wall enforces Laws 1 & 6 at the engine:** learning acts WRITE ledgers; game acts READ derived mastery; narrative/GM acts write NEITHER — a schema invariant, not a convention.

---

## 11. Engine deltas to ship (verified against the current build) + open gates

These are real, checked claims about the shipped engine (`web/src/lib/engine/`). Each is a build target for `07-build-plan.md`; the two constant-calibration items carry an open gate.

1. ✅ **DONE (2026-07-11) — the co-op formula (`konbit.ts`).** The raw-sum `summitState` is replaced by the fractional dual-condition **`positionState`**: legs scored `L_i = score_i / budget_i` over band-fixed budgets (`BATTLE.budgets` 10/8/6, `dealLeg`/`landVolley`), take iff `L_A + L_B ≥ BATTLE.T (1.30) AND min(L_A,L_B) ≥ BATTLE.m (0.40) AND allLegsDone`. `summited`→`taken`, `summitState`→`positionState`, `passRope`→`passTheWord` (now tip-only; volleys land via `landVolley`); the raw `threshold` field is retired from `types.ts`; `marronage()` resets budget too. Tests cover the worked example, the no-solo-solve floor, and tip-persistence.
2. ✅ **DONE (2026-07-11) — gentle SRS demotion (`srs.ts`).** `review()` no longer demotes on a single miss: the box drops only on **two consecutive misses**; either way a missed item resurfaces the next day (`due = day + 1`). Ratified (the recommended guard). Tests cover the single-slip hold, the second-miss demotion, and the recover-between-misses case.
3. ✅ **DECIDED (2026-07-11) — prod-solid "mixed review" clause: RELAXED for MVP.** `mastery()` prod-solid stays 3-consecutive-correct spanning ≥7 days; the "≥1 in mixed review" qualifier is **not enforced at launch**, because the ledger has no review-context tag and adding one would ripple through every `review()` call site *and* block all production mastery until wired. Revisit only if false-solids show up in play (then tag `hist` entries with `ctx` and require ≥1 mixed of the last 3).
4. **Battle constants** `T=1.30`, `m=0.40`, and budgets `6/8/10` are chosen for ≈65% average / 40% floor. **They want playtest calibration with the two boys once real due queues exist** — especially `m` for the Emerging band on a tired day. *(Gate: Scott — tune per-chapter or hold global.)*
5. **History-flank cost.** The flank reduces a leg's budget by 1 (min b=4). **Verify it reads as a tactical choice, not "do less work"** — may instead want to be an alternate leg *composition* (same b, reordered toward higher-box items). *(Gate: design playtest before locking.)*
6. **Micro-mission** as opt-in/diegetic (never a streak gate) is the anti-cringe position but carries the deepest relatedness payoff. *(Gate: family — is a gentle non-gating nudge acceptable, or must it be fully passive to avoid forced-heritage-performance?)*
7. **THE #1 QA GATE — dispatch action-set separability.** Every dispatch prompt+check **pair** needs an automated + manual check that its ≥2 moves are separable **only by parsing the audio** (un-guessable from context). This lives as an **authoring-tool assertion + Manman review**. *A leak here silently writes FALSE positive evidence — the only defect that corrupts ledger data rather than merely under-rewarding, so it is the highest-priority correctness gate in the game.*
8. **Naming gates (Manman + Scott, `00` §5).** The dispatch mechanic ships under English chrome until Manman's pass (`vwadyo` is unlawful per `04` §Lint); the Chapter-1 label (Bwa Kayiman / Soulèvman 1791) is Scott's open sensitivity gate; the title **KÒD LA** awaits Manman. No kid-facing Kreyòl for any of these until gated.

---

## 12. Law check (every law, explicitly)

| Law | How this spec obeys it |
|---|---|
| **1 · Game ≠ learning** | XP is effort-only (audit rule cuts accuracy-paying sources); thresholds read fractional derived mastery exclusively; the +0.10 tip bonus and −0.15 history bonus are **deleted**; Pwo mode removes XP with a test asserting identical gate resolution (proof by construction). |
| **2 · Co-op only** | no PvP, no per-brother number comparable on a shared surface; failure = marronage; enemy is the historical army / comic channel, never a brother. |
| **3 · Relay/battle** | one leg each matched to Majò role (swap Mondays); volleys from own due queue; combined threshold; mandatory tip (Pass gated on tip text); same-day voice-volleys. |
| **4 · History = bonus, never gate** | the flank changes the volley set (−1 volley), never the accuracy bar; real map, true coordinates; anthems on a win; anachronistic content never tested as fact. |
| **5 · Voice laws** | transmission is the grade; comprehension by action on a ≥2-move audio-separable set; no ASR (enemy decode-fail is scripted); audio in the family's private bucket; adults recast by voice. |
| **6 · GM laws** | GM / enemy-intel / anthem moves touch narrative only; no FK from `gm_queue` to any ledger (verified in-DB); adults never the enemy; async only. |
| **7 · Native gate** | no rendered Kreyòl reaches the boys without Manman; `needsReview:true` filtered from their build; Claude coins nothing; the boys' own productions are not filtered (the gate protects what is shown *to* them). |
| **Copy law** | kid surfaces dry, wry, second person; no fear words / jargon / per-brother comparison; requirements by disabled buttons; "Nobody loses" said exactly once; enemy comic never menacing; Kle-77 ruler buried. |
| **Non-punitive** | marronage not game-over; garble blames the wire; gentle 2-miss demotion; band-capped due-count with forward-spill; silent padon; forbidden-copy lint on loss-anchored reminders. |

---

## 13. VOKABILE — the vocabulary core (the meat)

**Owner steer (2026-07-11):** *"Before any spoken-word parts, the meat of the learning must be vocabulary — the words that feed the messages they'll put together"* and *"verbally practicing the vocab words should be incorporated."* This section (from a dedicated ultracode pass: lexical approach / Willis lexical syllabus / Nation's Four Strands / the receptive-productive gap / formulaic sequences / substitution tables / Conti's MARS-EARS → 3 blueprints → pedagogy + laws judges → synthesis) specifies how a **vocabulary-first core** incorporates into the built game. It refines the daily loop (§3) and the economy (§6); it obeys every law. Both judges ranked *"the drill is the meat"* first.

### 13.1 The thesis
Vocabulary is the daily meat and gets its **own focused surface** — a due-first **VOKABILE** drill that walks every *certified* scope item along the two shipped ledgers: **introduced → recognition-solid (rec) → typed-production-solid (prod) → spoken-eligible.** A word is **never a bare flashcard** — it is introduced and drilled *inside a Manman-certified chunk/frame*, so "learned word" and "usable message" are the same act. The typed message a boy assembles is literally the script his later spoken dispatch performs *one modality up*. **Typed text is the lawful, machine-checkable, non-voice bridge** (the ASR law is about *spoken* voice); **verbal practice is a first-class strand graded by ear (self + family), never by machine.** Voice arrives last, as the low-load performance of an already-stocked, already-typed chunk — no lock, no punishment.

### 13.2 The card kinds (each with its exact ledger write)
1. **Entwodiksyon** (intro / Modelling) — a new word/chunk shown *already inside a certified frame*, long-press-to-English. **Writes nothing** (marks introduced).
2. **Rekonet** (recognition, form→meaning) — Kreyòl shown, tap-to-reveal, self-mark (the Fil-la model). **Writes `rec`.** Leaves when `mastery(rec)==='solid'`.
3. **Tape** (typed production, meaning→form) — English/image/**audio** prompt, TYPE the Kreyòl into letter-slots. Cue-fade: R1 tap-assemble → R2 first-letter → R3 **cold**. **Only R3-cold-correct writes `prod`;** assist rungs are **XP-only, never touch a box** (the load-bearing anti-faking rule, unit-tested like the Tier-A trap). Miss = the shipped gentle 2-miss demotion, framed as a garbled wire.
4. **Kloz** (typed cloze, use-in-context) — a certified one-blank frame; type the missing (already rec-solid) word. **Writes `prod` with `inMessage:true`** (a qualifying in-message rep).
5. **Bati Mesaj** (typed message-builder / graduation) — a **substitution table** whose tiles come *only from THIS boy's own stocked words* + certified distractors; he assembles a whole dispatch, scaffold-fading L1 modeled → L2 frame+bank → L3 tiles-no-frame → L4 cold free-type. **Each cold slot writes `prod` `inMessage:true`; emits a dispatch DRAFT.**
6. **Di li** (say-it / shadow — **the verbal strand, owner steer**) — reference audio (family-recorded; "coming" until the audio session) plays; the boy **records himself and self-compares by ear**; family may commend (the recast model, `08 §3`). **No machine ever scores it** — it **earns XP and builds speaking comfort but does not machine-write a ledger** (voice law). Offered once a word is rec-solid; it is the rehearsal that de-risks the eventual spoken dispatch. Verbal practice thus sits at *every* vocab rung, not only at the message capstone.

**Mapping guarantee:** no self-mark ever touches `prod`; no typed check ever fakes `rec`; assist rungs never touch a box; **verbal never machine-writes any ledger.**

### 13.3 The graduation ladder (all derived from the two ledgers)
**Learned** = rec-solid (Rekonet) → **Usable** = ≥1 cold Tape (the "I could read it but couldn't produce it" noticing event) → **Assembled into a typed message** = Kloz/Bati cold reps → **prod-solid** = `mastery(prod)==='solid'` **AND ≥1 of the qualifying reps was in-message** (so "assembled" provably precedes "solid") → **Spoken** = the existing voice dispatch, offered only once the frame + its content words are prod-solid; the boy *says the message he already typed to death*. Across all of it runs the **Di li** verbal strand (say it aloud, self/family-verified). **Chunks are the rung that turns words into messages, not grammar** — collocations/expressions/sentence-frames are first-class items (reusing `cat:'expr'`, **no new taxonomy enum**), seeded flood-before-focus like the Kle 77.

### 13.4 Soft sequencing (never a punitive lock)
The one engine addition is **`dueProd()`** — mirrors the shipped `dueItems()` but also requires `mastery(rec)==='solid'`, so a word's *production* drills don't open until its *recognition* is solid. Downstream, the **voice dispatch and battle fluency rounds query prod-solid stock** — you can only be asked to produce or say what you've stocked (i+1). Nothing is blocked or penalized: an unready rung shows a **"warming up"** state (Manman coins the label), never a lock or a fear word. The receptive→productive lag is displayed as a **feature** (a filling armory), not a backlog. **XP flows at every rung including assist + verbal reps**, so a literacy-weak boy always advances on effort while a hard word warms.

### 13.5 Surfaces (changes to the shipped app)
- **NEW `/play/[boy]/vok`** (the core daily activity) — due-first session pulling due rec (`dueItems`) + due prod (`dueProd`) through a pure **`cardFor()`** selector into the card kinds.
- **Front page** gains a **Sak Mo** armory panel (collected = rec-solid vs battle-ready = prod-solid) beside the Kle-77 ruler — the rec/prod lag reads as an armory filling, never a deficit — and a **"Stock the wire"** step anchoring the session before dispatch.
- **Fil la stays LIGHT and unchanged** — a passive ambient rec top-up, *not* overloaded into the production surface (judge kill applied).
- **Dispatch composer** pre-populates from the boy's Bati Mesaj draft / prod-solid bank, so recording *performs a built line*, never composes cold at the mic.
- **Cipher Office** extends the word-level lexicon pass with a **frame pass** (frames, slot-fillers, distractors, cloze answers — all `pending`/`needsReview`, Claude coins none).

### 13.6 How it feeds the game
Every game surface queries the **live ledgers at runtime** (never hand-scripted ahead of the learner), so the game can never outrun the vocabulary. The **battle** gains an optional typed-construction **fluency round drawn only from prod-solid items** (Nation's fluency strand uses only well-known language; thresholds still read fractional accuracy over derived mastery, never XP). **Dispatch/campaign prompts** pre-populate strictly from the sender's prod-solid inventory; a prompt is well-formed only if it is i+1 over that set. **Gap-as-payload:** a message a boy can't complete from stock isn't an error — the missing word drops back into Vokabile as a fresh intro card ("the wire dropped a word — want to stock it?").

### 13.7 Engine additions (build order — non-content-gated core first)
1. `srs.ts`: **`dueProd(p, items, unit, day)`** — like `dueItems` but `prod.due<=day AND mastery(rec)==='solid'`. Pure, reads derived mastery, stores nothing. Do NOT touch `dueItems`/`seedTiers`/the rec branch.
2. `types.ts`+`srs.ts`: add optional **`m?:boolean`** (in-message) to a prod hist entry; `review(...,inMessage=false)` sets it only on prod writes; `mastery()` prod-solid additionally requires `l3.some(x=>x.m)` (≥1 in-message rep of the qualifying three).
3. Tests (Tier-A-class invariants): assist rungs never advance/demote the prod box; prod-solid unreachable without an in-message rep even with 3 cold successes ≥7d; `dueProd` never returns a non-rec-solid item.
4. `frames.json` + a `Frame` interface (`{id, en, u, slots:[{idx, fillers[], distractors[]}], pending?}`); chunk items reuse `cat:'expr'`. All strings `pending:true` for Manman.
5. Pure **`cardFor(item, state, frames)`** selector → the card kind from ledger state.
6. API: `/api/vok/session` (GET, sanitized — never leak answers), `/api/vok/type` (POST — normalize spelling; cold-correct writes prod, `inMessage=!!frameId`; assist rungs XP-only), `/api/vok/build`, and a verbal-capture endpoint for **Di li** (stores audio to the private bucket, no grading).
7. UI `/vok` (VokClient) + Sak Mo panel + Cipher Office frame pass + dispatch pre-populate + (flagged) battle fluency round.

### 13.8 Law check
- **Game ≠ learning:** XP reads effort at every rung (incl. assist + verbal); the prod box advances only on **cold typed** retrieval; all thresholds read `mastery()`, never XP; a rec-solid word displays honestly as "stocked" with production an optional next tier.
- **No machine judges voice:** Tape/Kloz/Bati are **typed** (machine-checkable, not voice); **Di li** verbal practice and the spoken dispatch are **human/self-verified, never ASR** — the linguistic work already happened at the typed stage, so protecting the voice costs no pedagogy.
- **Native gate:** every word/chunk/frame/filler/distractor/cloze-answer is a certified item routed through variables, `pending` until Manman; the engine only recombines *certified* cells; Claude coins zero.
- **Co-op / non-punitive:** soft "warming up" not a lock; gentle 2-miss demotion; Sak Mo is per-boy (no shared comparison). **Spelling is normalized** (case + diacritics folded first pass, per Manman's ruling) so typed production is never spelling-police against a literacy gap.

### 13.9 Open gates
Spelling-normalization spec (which diacritics/elisions fold — Manman); first frame-pass batch size (Manman); the in-message bar (≥1 vs ≥2 — Scott, once prod queues exist); the "warming up" label (Manman coins); C-tier daily cap by band (Scott); ship the battle fluency round now vs flag-gate it (recommend later); Sak Mo "collected vs battle-ready" framing (validate with the boys).
