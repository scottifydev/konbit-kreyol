# Konbit Kreyòl — Design Red-Team ×10 & Locked Constitution (v6)
**Ten full interrogation cycles of the "tap-tap daylight" direction. Each cycle attacks from a different vantage and must kill or harden something. Survivors are locked in the constitution at the end. No code was written until this document closed.**

---

## Cycle 1 — The Teen Veto
*Lens: a skeptical 15-year-old sees it over his brother's shoulder.*

**Attack.** "Kaye" (school notebook) framing, decorative stamps, manila paper — does any of it read as Dad's craft project? Teens' actual visual diet is sports UIs, game menus, streetwear drops: hard grids, huge numerals, zero whimsy. A sepia notebook with rubber stamps everywhere is one doily away from Etsy.

**Kills.** Stamps demoted from decoration to *earned marks only* (badges, mission verdicts). The word "kaye" never appears in the UI — it's an internal layout metaphor, invisible to users. Manila shifts cooler, toward crisp bone, away from sepia nostalgia.

**Hardenings.** Inject sport-poster energy where teens actually look: scores set huge, konbit stats restructured as a **standings strip** (a two-row table, like a league table), streak as a plain big numeral. The folklore never announces itself — the boys should see "a hard-edged app that happens to be in our colors," not "a heritage experience."

## Cycle 2 — The Manman Veto
*Lens: a Haitian mother reviews every cultural reference.*

**Attack.** Three landmines I planted without thinking. (1) **Borlette tickets** — beloved iconography, but it is *lottery gambling*, in an app for her sons. Unacceptable risk. (2) **Chalkboard** — school slate carries mixed associations; it must never behave punitively. (3) Earlier versions used **vèvè** line art as dividers — Vodou ritual symbols used as decoration can genuinely offend, especially if the family is Protestant (very common in the diaspora). I decorated with someone's religion.

**Kills.** Vèvè and drapo-sequin references removed entirely (family may opt in later; default is out). Borlette naming and numerology gone — the perforated chip survives as a neutral **tikè** (bus-fare ticket), no lottery semantics.

**Hardenings.** The slate board is reserved for the app's *teaching voice* and is constitutionally non-punitive: wrong answers are never marked with red X's; corrections are additive chalk (the right answer gets circled, yours gets a neutral strike). This is the visual twin of the family error-response brief: recast, don't punish. Flag colors stay — national and secular.

## Cycle 3 — Craft Mechanics of "Painted"
*Lens: a sign painter asks what actually makes it read painted, not neobrutalist.*

**Attack.** "2px border + offset shadow" is the Gumroad template — that's not paint, that's Figma. What are the real levers?

**Rulings.** (a) Shadows are **paint layers**: solid offset in a *darker mix of the same hue*, never black blur — cobalt panel throws deep-cobalt shadow. (b) The signwriter's tell is the **pinstripe**: a 1px inset keyline 4px inside every painted panel edge. This becomes the panel signature. (c) One paint can: each hue has exactly one value; no tints, no opacity ramps. (d) Lettering sits *on fields*, never floating over background. (e) Chamfered board-ends are charming but one-off — restricted to the masthead nameplate only.

**Kill risk found.** Alfa Slab One's Kreyòl diacritics (È, Ò, À) must be verified at build; if coverage or rendering fails, fallback is Archivo Black. Hard rule either way: **the display face never sets Kreyòl body content** — display is for curated headings/labels; body Kreyòl always renders in the sans, where diacritics are guaranteed.

## Cycle 4 — Information Architecture
*Lens: maybe the layout, not the skin, was the ugliness all along.*

**Attack.** I have now reskinned the same eight-competing-cards dashboard three times. Card soup has no narrative; density was the disease v4 and v5 shared under different paint.

**Rulings — the front-page model.** Each screen gets ONE layout idea instead of a grid of equals:
- **Dashboard = front page.** One lead story (today's session) at ~60% of visual weight; a thin standings strip for konbit; everything else demoted to a small index (links, not cards).
- **Fil = reading column.** Single column, generous measure, nothing competing.
- **Fokis / Mòn = stage.** The slate board centered, page otherwise empty.
- **Misyon = poster.** One gold sheet.
- **Kle 77 gauge moves into the masthead** — a small persistent gold arc, like a fuel gauge on the bus, visible everywhere instead of owning a card.
- **Grammar map becomes a drawer**, opened on demand.

This cycle is the actual fix for "ugly": competition and density, not color, were the root cause.

## Cycle 5 — Typography Stress Test
*Lens: put all faces on one screen and see if it's a circus.*

**Rulings.** Three roles, strictly cast. **Slab display**: masthead, screen title, hero numerals only — three sizes (44 / 28 / 20), nothing else. **Instrument Sans**: all UI and all Kreyòl content (feed Kreyòl at 19px — readability beats flavor); tabular 700 for stats tables (slab numerals only for hero scores). **Instrument Serif italic**: *exclusively* inside quote blocks for oral literature — pwovèb, Sixto, song lines — with a gold paint-bar at left; never inline in chrome; minimum 17px because it goes spindly on a low-DPI shared-PC monitor. Type ramp locked: 44/28/20 display · 19 content · 15/13.5/12 UI. Line-height 1.55 body, 1.15 display.

## Cycle 6 — Color Quantities & Accessibility
*Lens: contrast math and a 60/30/10 audit per screen.*

**Rulings.** Paper ≈ 70%, ink ≈ 20%, paint ≤ 10% of any screen. Cobalt on paper passes only at display sizes → **small cobalt text is banned**; cobalt is a field-and-display color. Red is semantically reserved (Isaac + alerts) — never body text. Gold fields always carry ink text (gold+white fails contrast). Success color is **palm green** (it's in every Haitian painting), not UI-green. Slate board `#22303a` with bone chalk text passes comfortably; gold chalk for board emphasis.

**The hard kill of the cycle: zero gradients, anywhere.** Boy-color "washes" die; a boy's color appears as a solid masthead band and his tikè chip, nothing else. This single rule is what separates v6 from v5 at a glance.

## Cycle 7 — Motion & Feedback Model
*Lens: paper doesn't animate, but apps must respond.*

**Rulings — print-shop verbs only.** Things **stamp** (scale-settle, 120ms — badges, verdicts), **deal** (8px translate+fade, 200ms — cards/screens entering), and **wipe** (scaleX sweep, 250ms — the gloss highlight). Correct answers: chalk underline *draws*. Wrong answers: your pick gets a neutral chalk strike, the right answer gets *circled* — additive correction, per Cycle 2. Toasts become a **stamped receipt** sliding from the bottom edge. The v5 pulsing record button dies: recording state = solid red field + counting timer numerals, which is more honest anyway. Reduced-motion: everything instant.

## Cycle 8 — The Screens Nobody Designs
*Lens: ugliness lives at the edges, so design the edges first.*

**Rulings.** First-run diagnostic gets a **ticket-booth** frame ("Anvan nou monte" — before we board). Finished feed shows a painted **FÈMEN** closed-shop board — come back tomorrow. Mic permission denied: an instruction panel, not an apologetic error line. A missed day renders the padon as a **repair patch** on the streak, not a guilt banner. The failed-summit mountain gets a **sunset variant** of the panorama (same shapes, low sun) — a day cycle, not a defeat screen. Long-press English tooltip restyles as chalk-on-slate. These states are built first in v6, not last.

## Cycle 9 — Cohesion & Inventory Lock (the Chanel pass)
*Lens: census every component; whatever appears once gets cut or merged.*

**Final surface inventory (7):** paper page · ink rule (incl. red kaye margin-rule as the page spine) · painted panel with pinstripe · slate board · gold family panel · tikè chip (nav/identity only) · stamp (earned marks only). **Signature ranking:** 1) the **sun-gold gloss sweep** behind every tappable Kreyòl word — the element touched hundreds of times; 2) the tri-stripe (cobalt/gold/red) divider; 3) the slate lesson board. Sun disc allowed twice (panorama, mission poster). Chamfer once (masthead). Dev drawer restyles as a paper index card. Everything not in this paragraph does not exist.

## Cycle 10 — Regression Test
*Lens: would every previous critic sign off?*

- **"Ugly" (v4):** density — fixed structurally by the front-page model, not cosmetically.
- **"AI-default dark dashboard" (v5):** zero dark surfaces remain except the semantically-motivated slate board; zero gradients; zero glows.
- **"Generic neobrutalism":** same-hue paint shadows, pinstripes, shadow rationing (one offset shadow per screen, on the primary CTA), no rotation, no grain.
- **"For babies":** no mascot, no emoji in chrome (emoji live only inside feed content where the register is native), sports-table numerals, dry copy.
- **"Fellow kids":** no slang in chrome, no faux-graffiti, folklore never self-announces.
- **House rules:** pointer events throughout; one conscious exception logged — the diagnostic keeps 4 answer options (assessment psychometrics beat the UI-pattern preference; noted deliberately, not accidentally).

---

# The Locked Constitution (build against this, nothing else)

**Color** — paper `#f0e9d8` · ink `#1b2030` · cobalt `#1a3fc4` (+shadow `#122d8f`) · red `#d02c22` (+shadow `#9c1f18`) · sun `#f2b02c` (+shadow `#c78d1a`) · palm `#2e7d4f` · slate `#22303a` · chalk = paper value. One value per hue. No gradients, no opacity tints, no black shadows.

**Type** — Display: Alfa Slab One (verify è/ò/à at build; fallback Archivo Black), sizes 44/28/20, never for Kreyòl body. UI/content: Instrument Sans — 19px Kreyòl content, 15/13.5/12 chrome, tabular 700 for stats. Oral literature: Instrument Serif italic ≥17px, quote blocks only, gold paint-bar left.

**Surfaces (7)** — paper page · ink rule + red margin spine · painted panel w/ 1px pinstripe inset 4px · slate board (teaching voice, non-punitive) · gold family panel · tikè chip · stamp.

**Layout** — front-page dashboard (one lead, standings strip, index) · reading-column feed · stage screens for Fokis/Mòn · poster for Misyon · Kle 77 as masthead arc gauge · grammar map in a drawer.

**Motion (3 verbs)** — stamp 120ms · deal 200ms · wipe 250ms; chalk draws/circles for feedback; receipt toasts; reduced-motion = instant.

**Signatures** — gloss gold sweep on every tappable Kreyòl word > tri-stripe divider > slate board.

**Bans** — gradients · glows · black blur shadows · dark chrome · emoji outside feed content · handwriting fonts · vèvè/religious motifs · lottery references · red-X error marks · decorative rotation · CSS grain · more than one offset shadow per screen.

**Semantic color law** — cobalt = Leo + display fields · red = Isaac + alerts · sun = the shared/konbit/tappable world · palm = success · slate = instruction · paper = daily life.
