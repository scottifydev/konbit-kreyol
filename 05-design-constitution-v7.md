# 05 · DESIGN CONSTITUTION v7 — "Daylight Broadsheet"

**The visual law: constitution v6 with the v7 re-cut applied inline. Target read: L'Équipe front page in our colors, not Etsy. The game strengthens the direction — dispatches, proclamations, and war bulletins are natively broadsheet forms. Build against this, nothing else.**

---

## 1. Verdict of record

v6-4's failure was execution density, not identity — re-cut, don't replace. Both competing directions (league-light white-card; transit wayfinding) passed the teen test but failed the culture gate ("could ship unchanged as a generic Spanish app"). Broadsheet keeps what makes it *this family's app* — cooled paper, flat flag paint, the slate teaching board, the panorama, serif proverbs with the gold bar — and deletes every craft-project tell.

## 2. Tokens (hex-for-hex; no drift)

paper `#f6f3ea` · well `#ece8d9` · hairline `#d8d2bf` (pre-authorized darken to `#cfc8b2` if it vanishes on the family monitor) · ink `#181d2b` · ink-2 `#5c5a4e` · cobalt `#1a3fc4` / deep `#122d8f` · red `#d02c22` / deep `#9c1f18` · sun `#f2b02c` / deep `#c78d1a` · palm `#2e7d4f` · slate `#22303a` + well `#2c3d49` · chalk = paper · chalk-dim `#93a7b4`.

No gradients, no tints, no radius, one value per hue, no black blur shadows. CTA depth = `0 4px 0 <deep hue>` press edge, `:active` translates down 3px. One `--shadow-overlay` allowed on exactly two floating surfaces: toast and long-press tooltip.

## 3. Type

- Display: **Archivo Black** — D1 48 / D2 30 / D3 22, ≤3 display instances per screen, **never Kreyòl body** (diacritics are guaranteed only in the sans).
- **Instrument Sans:** Kreyòl content 21px/1.6, body 16, UI 14, labels 12/700/.08em rationed ≤2 per section. Quiz prompts in Instrument Sans 600 (never the display face).
- **Instrument Serif italic** ≥19px for oral literature only — pwovèb, Sixto, song lines — quote blocks with a 4px gold bar left; never inline in chrome.

## 4. The kill list (each a named teen-veto tell; none may return)

Rotated stamps · perforated tikè chips · chamfered nameplate · pinstripe insets (survives on the gold mission poster only) · 5px offset shadows (Gumroad-neobrutalism) · Alfa Slab One (Archivo Black is the display face — retires the è/ò/à verification risk) · the 11px/.18em micro-label rash · borders-on-everything (**border budget:** 2px ink on slate board, inputs, hold-button, stamps only; everything else = 1px hairlines + air) · emoji avatar chips (monograms; emoji stay inside post bodies where register is native) · the red kaye margin spine · the chalk tray · display-face-on-Kreyòl anywhere.

## 5. Layout & signature moves

- **Scoreboard header rhythm on every screen:** one kicker · D1 title · right-aligned live tabular stat · closed by the screen's single 3px ink rule.
- **Front-page dashboard:** one lead story (today's session) at ~60% visual weight; konbit strip; everything else a small index. Campaign map strip (8 milestones, current one live). Pending-dispatch tray.
- **77-tick ruler** replaces the dashboard ring: one 4px tick per Kle word, sun = solid, hairline = remaining; hero fraction beside it. Masthead keeps the small arc gauge.
- **Liy bullets** — solid letter discs (cobalt L, red I, sun K) as the boy/team identity mark on doors, shared boards, and panorama climbers. Feed avatars are tag-family monograms; the bullet stays a team mark, not a system.
- **Counter tick** — stat numerals change via a 120ms vertical slide.
- Fil = reading column · Fokis/Mòn = stage (slate board centered, page otherwise empty) · Misyon = one gold poster · grammar map = drawer.
- **Per-screen failable checklist:** a screen ships with ≥1 painted moment and ≥1 display-scale element, or it has failed; border budget and label ration are pass/fail items; fixed shared-board row order stated in a code comment.

## 6. Semantic color law

cobalt = Leo + display fields · red = Isaac + alerts, never body text · sun = the shared/konbit/tappable world · palm = success (it's in every Haitian painting) · slate = instruction (the app's teaching voice) · paper = daily life. Small cobalt text is banned (contrast); gold fields always carry ink text.

## 7. The slate is non-punitive (constitution-load-bearing)

Wrong answers are never marked with red X's; corrections are additive chalk — the right answer gets circled, yours gets a neutral strike. This is the visual twin of the family error-response brief: recast, don't punish. Wire `.hit`/`.miss` to **every** answer path (v6-4 defined but never applied them — see `06` §Traps).

## 8. Motion (print-shop verbs only)

stamp 120ms (scale-settle — badges, verdicts) · deal 160ms (translate+fade — cards/screens entering) · wipe 250ms (scaleX sweep — the gloss highlight) · chalk draws/circles for feedback · receipt toasts from the bottom edge · recording state = solid red field + counting timer numerals (no pulsing) · reduced-motion: everything instant.

## 9. Edge states as schedule, not scolding

FÈMEN = flat painted shop sign (come back tomorrow) · mic-denied = numbered steps on the slate · failed battle = sunset panorama + plain text, no well box (a day cycle, not a defeat screen) · missed day = padon as a repair patch, never a guilt banner · long-press English tooltip = chalk-on-slate. These states are built first, not last.

## 10. Kept, unamended

Zero gradients · one value per hue · gloss sweep (tap = content meaning) vs flipnew underline (newly flipped chrome) de-conflation · front-page IA · panorama SVG (+ sunset variant) · pointer events · the entire language-law engine · no mascot, no confetti, no emoji in chrome, no slang in chrome, folklore never self-announces.

## 11. Mobile addendum (the phone voice surface — new)

The boys' phones carry Fil la and the dispatch composer/inbox. Same tokens, same type families, phone scale:
- Type floors: Kreyòl content ≥19px, UI ≥14px; display D2/D3 only (no D1 on phone).
- **Hold-to-record ergonomics:** the hold button is a full-width bottom-anchored bar in the boy's own hue (thumb-reachable one-handed); `touch-action:none`; pointer events; recording = solid red field + timer numerals; release ends, slide-off cancels.
- Dispatch inbox = reading column; a pending dispatch card shows sender bullet + play control; the act-on-it check renders on the same card after playback.
- Mic-denied slate steps get per-platform variants (iOS Safari / Android Chrome wording differ) — numbered, honest, no "hit Allow when asked" (denied mics don't re-ask).
- No horizontal scroll anywhere; wide content scrolls inside its own container.
- The panorama and battle stage remain PC-first; phones show the campaign strip, not the full panorama.

## 12. Why (the ten red-team cycles, compressed)

1. **Teen veto** — killed decorative stamps/sepia; injected sport-poster energy (big numerals, league-table konbit strip). The boys should see "a hard-edged app that happens to be in our colors," not "a heritage experience."
2. **Manman veto** — killed borlette/lottery semantics, vèvè-as-decoration (religious motifs: default out, family opt-in); made the slate constitutionally non-punitive.
3. **Craft mechanics** — same-hue paint shadows, one paint can per hue; display face never sets Kreyòl body.
4. **Information architecture** — density was the disease: front-page model, one layout idea per screen.
5. **Typography stress test** — three faces, strictly cast; serif is quote-blocks only.
6. **Color/accessibility** — paper ≈70% / ink ≈20% / paint ≤10%; zero gradients is the line between v6 and v5.
7. **Motion** — paper doesn't animate; apps must respond: three print-shop verbs.
8. **Edge states first** — ugliness lives at the edges; design FÈMEN, mic-denied, failed summit, missed day before the happy path.
9. **Cohesion census** — whatever appears once gets cut or merged; the gloss sweep is signature #1 (touched hundreds of times).
10. **Regression** — every prior critic ("ugly", "AI-default dark dashboard", "generic neobrutalism", "for babies", "fellow kids") signs off or the screen fails.
