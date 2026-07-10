# KONBIT KREYÒL — START HERE (working corpus v8)

**An 8-chapter co-op text-and-voice video game set in the Haitian Revolution (1791–1804) that activates the latent Haitian Kreyòl of two heritage-learner brothers — Leo (rising 9th) and Isaac (rising 10th). The revolution runs on communication the enemy cannot read: Kreyòl is the weapon. The brothers are signal-runners on the revolutionary network — which, in this world, is a group chat.**

Corpus date: 2026-07-10 · Owner: Scott (scott@scottify.io) · Native-language gate: the boys' mother ("Manman") · Supersedes the brainstorm-era documents now in `archive/`.

*Men anpil, chay pa lou.*

---

## 1. The premise in one page

Leo and Isaac play two brothers — couriers and signal-runners in the revolutionary army. Messages, orders, songs, and proverbs move through them. Understanding Kreyòl (recognition), speaking it (production), and knowing the history (strategy) are literally how battles are won.

Three pillars, decided by the owner and binding:

1. **Full-canon anachronism.** The revolution world simply *has* phones. The network's feed (Fil la) is its group chat; orders arrive as texts; voice notes are voice notes; each chapter has a modern Haitian anthem. Never explained, never apologized for. Only the **medium** is anachronistic — the **history** (every date, person, event, spelling, legend-flag in `01-world-and-story.md`) stays strictly factual.
2. **Voice dispatches are the spine.** Kreyòl is primarily a spoken language. The core mechanic is recording a spoken message on your phone and sending it to your brother (or an adult), who must genuinely understand it to act. Transmission success is the grade; adults reply with recast-style voice feedback; **no machine ever judges a boy's voice**.
3. **The adults are in the game.** Every human-in-the-loop function gets a diegetic identity: Manman runs the **Cipher Office** (the native review gate as her character's job, plus the voice-feedback desk); Scott is the **GM** — command-side war room *and* the enemy's intelligence channel (written overconfident and out of their depth, never menacing); Grann is the elder whose testimony unlocks the flashbacks; cousins are field agents. Adults get code names, coined by the family at kickoff. GM play is async-only.

**The pedagogy is not up for renegotiation.** The game is a motivational shell around a proven design: two-ledger SRS, native review gate, family-embedded missions, co-op-only mechanics, honest mastery. If a game idea fights one of those, the game idea loses.

Why this design coheres: the game's thesis ("the enemy can't read the network") and the program's real exit criterion (the family's own voice notes and chat running in Kreyòl) are the same skill, practiced in the same act — speaking Kreyòl into a phone and being understood.

## 2. Read order and precedence

Where documents conflict, higher wins:

| # | File | Governs |
|---|---|---|
| 1 | `00-START-HERE.md` (this doc) | Decisions of record, precedence, open gates |
| 2 | `04-laws.md` | Language law · copy law · anachronism doctrine · GM laws · voice laws · sensitivity rulings · CI lint · PR checklists |
| 3 | `01-world-and-story.md` | The fiction and the verified history (facts and spellings are **binding**) |
| 4 | `02-game-systems.md` | Mechanics: voice-dispatch loop, daily loop, battles, GM layer, co-op law |
| 5 | `03-language-program.md` | Pedagogy: units, scope, SRS, mastery, diagnostic, exit criteria |
| 6 | `05-design-constitution-v7.md` | Visual law |
| 7 | `06-engineering.md` | Architecture, schemas, engine-port notes, traps |
| 8 | `07-build-plan.md` | Issues, ACs, first-playable definition |
| 9 | `08-family-handbook.md` | Adult-facing: GM guide, Cipher Office guide, parent brief, kickoff |
| ref | `konbit-kreyol-app-v6-4.html` | **Archived reference implementation — never edit.** Its engine (gate helpers, two-ledger SRS, relay/konbit state) is behavior-normative with the fixes listed in `06-engineering.md`. Open it in a browser to feel the loop. |
| archive | `archive/*.md` | The superseded brainstorm lineage. Consult for rationale; never build from these. |

## 3. Decisions of record

Owner decisions, in force. A build must not quietly contradict any row.

| Date | Decision |
|---|---|
| 2026-07-10 | **Game pivot:** text-based video game set in the Haitian Revolution; 8 chapters = the 8 units; Kreyòl is the weapon. |
| 2026-07-10 | **Full-canon anachronism** ("the Hamilton rule") — see `04-laws.md` §Anachronism. The "dispatch wire"/"vwadyo = voice dispatches" costume renamings are retired. |
| 2026-07-10 | **Voice dispatches = main mechanic.** Grading is peer + family only; comprehension proven by action; no machine judgment. ASR is out of the design entirely; TTS survives only as a benched audio-fallback question. |
| 2026-07-10 | **Chapter anthems:** one modern Haitian track per chapter — linked never hosted, boys nominate, family vets, chorus vocabulary pre-taught via song keys. |
| 2026-07-10 | **GM layer:** Scott = command + enemy intelligence channel; Manman = Cipher Office; code names family-coined at kickoff; async-only GM agency; GM never touches mastery math; adults are never the enemy mechanically. |
| 2026-07-10 | **Stack: Vercel + Supabase.** Phone + PC hybrid: the 30-min daily loop lives on the shared PC; each boy's phone carries the voice surface. Privacy copy: "stays in the family." |
| 2026-07-10 | **Working title: KÒD LA** ("the rope / the code" — attested material, no coinage). Pending Manman like every Kreyòl string; the boys' build shows "THE ROPE" until she passes it. "Konbit Kreyòl" stays as the program/repo name. `kòd` added to the pending U2 scope batch (`04` §1.1). |
| 2026-07-10 | **Build started** — `web/` (Next.js): engine port, law lint + tests, voice-dispatch pipeline, Cipher Office queue; Supabase schema staged in `supabase/migrations/`, `LocalStore` as the dev placeholder until the Supabase gate clears. |
| 2026-07-10 | Copy law adopted (every kid-facing word inviting, never scary) and "Daylight Broadsheet" design re-cut adopted — carried into `04-laws.md` and `05-design-constitution-v7.md`. |
| 2026-07-10 | **History brief is binding** (now `01-world-and-story.md`): facts, spellings, legend-vs-documented flags, sensitivity rulings. Capois' cry is « An avan! An avan! », never "the bullets are dust"; Catherine Flon is "the story goes." |
| 2026-07-10 | **Do not "fix" Tier-A seeding** — the old HANDOFF delta row was a 0-vs-1-indexing misread; `box=2` (0-indexed) already equals the spec's box 3. See `06-engineering.md` §Traps. |
| 2026-07-10 | **Kle-77 early receptive seeding** sanctioned (flood-before-focus): Kle items are receptively seedable from U1 regardless of teaching unit, so the "all 77 solid by end of U3" target is reachable. |
| 2026-07-09 | **The language law** (strict `unit > tw`, computed tw, no whitelist beyond proper nouns) — final semantics in `04-laws.md` §Language. The `>=` bug shipped once; never again. |
| 2026-07-09 | **Units, not weeks**, everywhere including the masthead. |
| 2026-07-09 | Scope amendments (15 items + the surface-name batch) and the exact-id expression ruling — recorded in `04-laws.md` §Language, pending Manman's batch review. |

## 4. Retired this session — with reasons

Anything in `archive/` asserting the following is superseded:

| Retired | Reason |
|---|---|
| Local-first Next.js on the shared family PC; file-based JSON persistence; 7-day rolling local backups; "localStorage = cache only" | Voice dispatches between phones need hosting, auth, and audio storage. New architecture: Vercel + Supabase (`06-engineering.md`). A family export button preserves the data-ownership intent. |
| "Nothing leaves the house" settings copy | No longer true. Honest replacement: **"stays in the family"** (private buckets, family-only auth, RLS). |
| ASR "echo-only, never grading" wiring; Whisper bench for echo display | Owner ruling goes further: **no machine judgment at all**. Grading is peer + family. The TTS bench survives only as an optional audio-fallback question. |
| Relay as shared-PC pass-and-play only | Phones make the relay genuinely async; same-day voice volleys when both boys are available. Pass-and-play on the PC remains a supported mode, not the definition. |
| "Dispatch wire," "vwadyo = voice dispatches," and other de-anachronizing costume names | Full-canon anachronism makes them unnecessary: the feed is the network's chat; voice notes are voice notes. |
| The pre-game framing of the app as a course shell (masthead "Week N", diagnostic-as-test voice, etc.) | Already retired by the copy law; restated here because the archive still contains the old strings. |

## 5. Open gates — do not build past these without the human

**Manman (the native gate — nothing Kreyòl reaches the boys without her pass):**
- Every ht string in the review queue (`08-family-handbook.md` §Cipher Office carries the full escalation list).
- The scope-amendment batch and the seven surface-name glosses entering scope.
- Campaign spellings flagged in `01-world-and-story.md` (Ravin Koulèv; Sitadèl Laferyè vs Sitadèl Anri; « An avan! » usage in scene copy).
- Naming: **the title itself — "KÒD LA"** (and whether *kòd* carries the "code" reading alongside "rope"); the voice-dispatch mechanic's Kreyòl name (vwadyo is currently unlawful — see `04-laws.md` §Lint); the Cipher Office's kid-facing name; the capstone event's name.
- The chat-register message batch (U4) and anthem lyrics wherever choruses are taught.
- 45-min family-idiolect lexicon pass; 90-min audio session #1.

**Scott:**
- Bwa Kayiman chapter-name default: opt-in naming vs fallback "Soulèvman 1791" (sensitivity ruling 2 in `04-laws.md`).
- DUE-badge amendment sign-off (quiet sun dot replaces text badge) and ratification of the scope amendments.
- Family error-response one-pager sign-off before Unit 1 (the single most critical safeguard).
- Anthem shortlist vetting with the boys; code-name kickoff; Supabase project + billing setup.

**Family:**
- Code names coined at kickoff; anthem nominations; reference-audio session (90-min floor). Until recorded, every audio slot says "coming" — honestly.

## 6. Repo map

```
00-START-HERE.md              ← you are here
01-world-and-story.md         ← fiction + binding history bible
02-game-systems.md            ← voice-dispatch loop, daily loop, battles, GM layer
03-language-program.md        ← pedagogy, units, scope, SRS, exit criteria
04-laws.md                    ← all lintable laws + PR checklists + string rulings
05-design-constitution-v7.md  ← visual law + mobile addendum
06-engineering.md             ← Vercel/Supabase architecture, schemas, traps
07-build-plan.md              ← issues, ACs, first playable
08-family-handbook.md         ← adult-facing: GM + Cipher Office + parent brief
konbit-kreyol-app-v6-4.html   ← archived reference implementation (engine-normative)
archive/                      ← superseded brainstorm docs (rationale only)
web/                          ← the app (Next.js) — engine, lint, tests, screens
supabase/migrations/          ← schema + RLS, ready for the Supabase gate
.github/workflows/ci.yml     ← law lint + tests + build on every push
```
