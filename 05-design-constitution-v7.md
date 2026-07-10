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

## 12a. THE PERIOD CUT (v7.1 — owner directive 2026-07-10)

**The game takes place in 18th-century Saint-Domingue; the design must show it.** Maps, battle plans, militia forms, geography. The re-grounding rule that makes this safe against every standing veto:

> **Period through structure, never through distress.** Cartography, battle diagrams, document forms, insignia — executed in the existing tokens with hard edges. NO aged-paper textures, NO sepia, NO script faces, NO skeuomorphic wax and quills. Target read: modern war-room graphics of an 18th-century campaign — Hamilton-poster discipline, not museum gift shop. The three faces stay locked; period comes from layout and iconography, not fonts.

The element set below survived a three-lens judged pass (teen veto · Manman veto · cohesion census; 2026-07-10 workflow, 4 web-grounded researchers + 3 judges). **Seven elements, no more** — the census rule applies to every future addition.

1. **The campaign map** — stylized hard-edged Saint-Domingue ("the franchise logo": ONE master silhouette path, family-approved, every asset derives from it) in period conventions: hachure relief strokes for the ranges (« Dèyè mòn gen mòn » made visible; parametric, machine-crisp, never hand-wobbled), ≤3 concentric coastal-shading offsets, dash-dot land border, dashed march route (no line for future legs — fog of war, not a padlock), numbered milestone discs with a **RENVOI** key (the period numbered-reference table). Compact variant embeds on the front page; the full map is a war-room screen. Place names: history-bible-verified Kreyòl forms behind the review gate; period French elsewhere (historical artifact); the map never coins. **Bwa Kayiman renders as disc + date + name only — no night, fire, or assembly imagery anywhere in chrome or map art.** A small N-mark may sit inside the full-map asset as map furniture; the compass rose is NOT a system element (cohesion kill) — its one live idea, the **fleur-de-lis, migrates to enemy-memo letterheads as the enemy faction's insignia, never on any boys'-side surface**.
2. **The battle plan** — ONE shared diagram vocabulary across map and battle screens: filled unit blocks = the brothers (liy hues, always same-side wings, never facing each other), outline blocks/wedges = the historical army (never upgraded to soldier silhouettes — the abstraction is the cool), barbed arrows (solid = done, dashed = next), the objective marked in sun. The **retreat variant**: dashed withdrawal arrows into hachures rendered with palm-green regrouping framing — marronage drawn as the maneuver it was; never red, never "defeat." Enemy uniform/faction color-coding is banned as false history (both armies wore blue in 1802–03).
3. **The document grammar** (ORDRE · pass · seal — one family): dispatch prompts, missions, and milestone cards carry the general-order header "ORDRE · Nº _n_" over a **thick-thin rule pair** (sanctioned rule form — document surfaces ONLY; a full-perimeter frame or ruled app chrome = certificate = dead), with a period date line ("Campagne de 1791 …" — fixed artifact strings, only place/date variable; "de l'indépendance" never before 1804). The **(Signé) block** replaces any urge toward script signatures — real names only on documented events; family code names family-coined. The **laissez-passer** frames the ticket/profile as an event credential, not a certificate — identical structure for both boys, no physical-description fields. The **flat seal cachet** (horizontal stacked caps inside a double circle — text-on-path counts as rotation and is banned) is Manman's certification mark on the adult surface. Period numbering ("Nº") ships with its long-press gloss from day one. Enemy memos are overstuffed colonial paperwork — the comedy lives in the bloat and attaches to invented functionaries only; **Leclerc and Rochambeau are never the comic voice**.
4. **The lambi** — flat line-drawn conch on the record/send surfaces: the revolution's own signal instrument, sanctioned via its secular Nèg Mawon reading (the state liberation monument, not an altar object). Must pass the 16px test; recording pulse = concentric hard-edged rings, no glow.
5. **The roundel** (say "roundel," never "rosette") — flat concentric bicolor circles as the role mark beside Majò roles. Role color only — never a quality tier or upgrade path. Complements the liy letter-discs, never replaces them. **The white ring drops at the Ch6 Arcahaie story beat** — the one sanctioned diegetic-history change in chrome (the masthead does not also carry it; one beat, one carrier).
6. **The vignette system** — the panorama's flat-paint language extended to chapter scene illustrations (the ford, the ravine, the fort, the flag, Vertières, the Citadelle): 2–4 unmixed hues, geometric, **≤8 shapes above the ink strip** (the anti-creep budget), no outlines, no texture, daylight only in Ch1 (keeps the Bwa Kayiman gate closed). Human figures ≤5% canvas height, featureless; Capois at Vertières: raised **empty** hand toward the empty summit, no weapon geometry. The Ch6 flag vignette is the design thesis — the boys' two hues joining; the missing white band is a clean rectangular absence, never ragged; the closed-gap flag doubles as the co-op completion glyph. The Citadelle (1805–1820) is epilogue/vision framing only — never depicted as standing on Jan 1, 1804. Architecture (arcade rows, louvered shutters, fort prows) lives INSIDE vignettes as places, never as chrome decoration ("arch-shaped dividers are how you end up looking like a Caribbean restaurant menu" — affirmed at full volume); the two semantic exceptions: FÈMEN's closed shutters, and each vignette's derived ≤24px milestone glyph (all 8 pass a 20px one-hue test in a single sitting before any ships).
7. **Heraldry, capstone-tier** — palm + liberty cap (and the fuller trophy arrangement) are post-independence iconography: restricted to campaign-complete/epilogue surfaces with the explicit frame "this is the nation your victory builds"; cannons trophy-static; no piece reused as everyday chrome. "LIBERTÉ OU LA MORT" — the real 1804 running head — appears exactly once, on Ch8 surfaces, quoted and long-pressable as artifact.

**Judged kills, recorded so they stay dead:** service chevrons (duplicate of the 77-tick ruler + the family's highest comparison risk) · cartouche frames (the rule pair + stacked caps already own titles) · torn-flag seam divider (the tear is Ch6's story and the roundel's beat, not a border) · bicolor masthead bar (duplicate carrier of the same beat) · muster-roll streak tables on boys' surfaces (the ruler keeps the streak; ledger grammar survives only on the adult Cipher queue) · uniform-livery card trim and white enemy coats (false history) · drum session mark, signal-fire beacon, star-fort glyph, crossed swords, soundings, rhumb lines, scale bars (count without meaning) · plantation/mill silhouettes (**the machinery of slavery is never picturesque scenery — final**) · long-s/swash/antique glyph affectations (ratified into the ban list) · vèvè and all lwa-referencing ornament (named ban, cited on every illustration PR).

**Amendment (scoped, ratified with this section):** Instrument Serif italic may set hydrography labels (seas, gulfs, rivers) on map surfaces — the period convention — as the sole non-quote use of the serif; along-path setting for rivers/ranges only.

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
