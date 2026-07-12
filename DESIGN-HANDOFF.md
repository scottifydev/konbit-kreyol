# Kòd La — design handoff

**For a design pass (e.g. Claude Design).** This packet gives you two things and nothing else: a summary of **what the app is about** (subject, users, and the content/cultural guardrails), and **the actual front-end code** to review. **The visual design is yours to decide** — the current look is a starting point to react to, not a spec to keep. Nothing here prescribes layout, type, color, texture, or motion.

The complete current front-end source is in the companion file **`design-handoff-ui-code.md`** (every route, component, and the stylesheet, concatenated for review), and lives in the repo under **`web/src/`**.

---

## What the app is

**Kòd La** is a text-and-voice **co-op learning game** that teaches two Haitian-American teenage brothers — **Leo (14)** and **Isaac (15)**, heritage learners of Haitian Kreyòl — the language and the history of the **Haitian Revolution (1791–1804)**. It's family-embedded and **co-op only**: the brothers never compete with each other; the enemy is the historical army.

**The core act** is a spoken **dispatch**: record a Kreyòl voice message your brother has to genuinely understand to act on. The players are two **signal-runners** on the revolutionary network — which, in this world, is a group chat.

**Ethos:** *"Strava, not Duolingo."* Dry, respectful, teen-facing. No mascot, no confetti, no infantilizing.

## The world / subject matter

- The **Haitian Revolution, 1791–1804** — the only successful slave revolution, which founded the first Black republic (**Ayiti**, Jan 1 1804). Real battles at real places and dates (Bwa Kayiman, the northern rising, Crête-à-Pierrot, Vertières, the Citadelle).
- Told through the lens of **C.L.R. James's _The Black Jacobins_**: the enslaved and their gods are the **subjects and agents** of history.
- **Vodou and the lwa** are wholeheartedly present (Bwa Kayiman, Papa Legba and the Ginen pantheon). The **terror of slavery** and the **massacre at Le Cap** are in scope, unflinching.
- **Full-canon anachronism:** the revolution simply *has* phones and a group chat; **Kreyòl is the code the enemy can't read.** Only the *medium* is anachronistic — every date, person, event, and spelling stays historically factual.
- **The enemy** (the French, British, Spanish colonial armies) is written **comic and overconfident — never menacing.** His defining trait: he can't read Kreyòl and won't admit it matters.

## The people in it

- **Leo & Isaac** — the two boys (the players).
- **Manman** (their mother) — the **Cipher Office**: she reviews every Kreyòl string before it reaches the boys and gives voice feedback on their recordings.
- **The GM** (an adult) — the war room + the comic enemy-intelligence channel.

---

## Content & cultural guardrails (fixed — these govern content and tone, not the visual design)

These are non-negotiable because they are about **cultural integrity and pedagogy**, not aesthetics. A design pass may reshape everything visual, but must not break these:

1. **Native gate.** No Kreyòl reaches the boys without Manman's review; the app **coins zero** Kreyòl words, slang, or names. In practice, a lot of content is intentionally withheld until she certifies it, so **"coming" / empty / sparse states are a first-class, permanent part of the experience** — not placeholders to design around, but states to design *well*.
2. **Appropriation firewall.** Sacred material — **vèvè, lwa, drapo (flags)** — may appear only in **rare, earned ceremony**, never as repeated decoration or chrome.
3. **Upright-subject rule.** The enslaved and their gods are **subjects of history, never victims or ornament.**
4. **Copy & tone on the kids' surfaces:** inviting, **never scary**; second person; **no fear words**; **never compare the two brothers**; failure is *"fall back to the mountains, return tomorrow,"* **never a game-over**. The enemy is comic, never menacing.
5. **No machine judges a boy's voice** — recordings are heard by family and self, never scored by a machine. (Relevant to how any voice/recording UI is framed.)

## What's fixed vs. what's yours

- **Fixed:** the subject/world above, the people, and the five content/cultural/tone guardrails.
- **Yours to decide:** the **entire visual design** — layout, hierarchy, typography, color, texture, motion, componentry, and the feel of every screen. **Review the actual code (below / `web/src/`) and make your own decisions.** Do not treat the current implementation as a target to preserve.

---

## The front-end you're reviewing

Next.js 16 (App Router, React server components + client islands), TypeScript. Family-only; one screen has both a shared-PC and a phone ergonomic. The full source is in `design-handoff-ui-code.md`; here is the map so you know the surface:

| Route / file | It is |
|---|---|
| `app/globals.css` | the entire current stylesheet (design tokens + every component class) |
| `app/layout.tsx` | root layout, web fonts, metadata/favicon/OG |
| `app/page.tsx` + `app/GateDoors.tsx` | **the gate** — sign-in: pick your door, enter your passphrase |
| `app/play/[boy]/page.tsx` | **the boy's front page** — chapter, campaign map, "today's session", progress meters, konbit |
| `app/play/[boy]/ticket/*` | **the ticket** — first-run diagnostic (record-the-camp probe; other probes "coming") |
| `app/play/[boy]/scene/*` | **the scene** — the chapter's authored narrative → choice → history bonus → enemy intercept → dispatch hand-off |
| `app/play/[boy]/vok/*` | **Vokabile** — the vocabulary drill (meet → recognize → type it back → say it aloud); the "meat" |
| `app/play/[boy]/feed/*` | **Fil la** — the network's group chat (posts + due-word review cards; tap-gloss, hold-for-English) |
| `app/play/[boy]/dispatch/*` | **the dispatch** — record a spoken Kreyòl order your brother acts on; the inbox |
| `app/play/[boy]/mon/*` | **the battle** — hold/take the position (co-op); marronage on a loss |
| `app/play/[boy]/settings/*` | Pro mode, family export, leave |
| `app/play/[boy]/grammar/*` | **Fokis** — judgment-first grammar (currently "coming"; frame is built) |
| `app/gm/*` | **the Cipher Office** — Manman's review queue + a "Their voices" audio strand |
| `app/error.tsx`, `not-found.tsx`, `global-error.tsx` | error/404 surfaces |
| `components/Flip.tsx` | renders a gated string with long-press-to-English |
| `components/HoldToRecord.tsx` | hold-to-record (mic meter + hear-it-back) |
| `components/AudioPlayer.tsx` | audio playback control |
| `components/CampaignMap.tsx` | the map of Saint-Domingue (real geography, drawn) |

---

## How to run the pass

1. **Import the codebase.** Point Claude Design at the repo (`web/`) or paste `design-handoff-ui-code.md` — it will read the actual components and current tokens rather than inventing. Feed **this file** as the content brief.
2. **Note the auth wrinkle.** The live app (`konbit-kreyol.vercel.app`) is now **family-only**, so a **web-capture tool can only reach the public gate** — every `/play/*` screen redirects to sign-in. Rely on the **code** (it has every screen) rather than live capture; if you need rendered screenshots of the authenticated screens, ask and they can be provided.
3. **Design freely**, honoring only the content/cultural/tone guardrails above.
4. **Hand back.** Package the design bundle and pass it to **Claude Code**, which builds it into `web/`. Every change must keep **`npm run check`** green in `web/` — it runs the **law lint** (enforces the native gate, the copy law, no un-gated Kreyòl) + typecheck + tests. That lint is the machine-check for the guardrails, so a lawful redesign stays lawful automatically.

> Repo context docs (optional, for deeper world/pedagogy grounding — **not** design prescriptions): `01-world-and-story.md` (the binding history), `03-language-program.md` (the pedagogy), `04-laws.md §2` (the copy law in full). Read for *content* fidelity only.
