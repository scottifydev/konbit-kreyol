# 05 · ART DIRECTION — "Drapo Ginen"

**Owner directive, 2026-07-10 (supersedes the flat "Daylight Broadsheet" visual constitution wholesale — see `05-design-constitution-v7.md`, retained for rationale only).** The game is about 18th-century Haiti: warmth, color, sound, dirt, gold, texture, geography — the architecture, the people, the uniforms, the battle. Read through the lens of **C.L.R. James, *The Black Jacobins*** — the enslaved and their gods as the conscious subjects of their own world-historical revolution, never victims to pity. Vodou and the lwa are wholeheartedly in; the terror of the slave trade and the massacre at Le Cap are in. The one retained rule from before: **no generic AI-dashboard slop, and no sterile flat minimalism** — "this isn't the New Yorker."

Grounded and judged: a web-researched element sweep (Haitian painting, Vodou visual language, the terror, revolution material culture, palette/texture/type) run through three adversarial lenses (Haitian cultural authenticity · *Black Jacobins* historical truth · buildable-and-powerful-not-slop) and synthesized. What stays from the non-visual laws: the Kreyòl flip-gate and Manman's native review of every Kreyòl **and every sacred naming**; binding history facts/dates/spellings; French as historical artifact only; the co-op two-brothers voice mechanic; no game-over.

---

## 1. Thesis

One Centre d'Art vernacular-modernist style contract governs every illustrated surface: **outlined, saturated, flattened sacred-perspective, patterned, painted on a warm canvas that is never white** — warmth and paint achieved from pure code (baked SVG-filter grain, gradient halos, gold ramps, sequin patterns), zero hosted raster, self-contained on Vercel. Two emotional keys inside the one tradition teach through register: **Obin's sober documentary frieze** for HISTORY and atrocity, **Hyppolite / Saint-Soleil's unrestrained saturation** for the SACRED.

## 2. The governing disciplines (each is law; each ships as a checklist item)

1. **The appropriation firewall.** Sacred, spirit-specific forms — vèvè summonings, drapo standards, named lwa, Saint-Soleil visions — appear ONLY in rare, narratively-earned, per-lwa-accurate, **Manman-reviewed** ceremony. **Fer découpé** (Georges Liautaud / Croix-des-Bouquets cut-oil-drum craft — secular, made for reproduction) carries ALL repeated and utility chrome: nav, buttons, dividers, the everyday flip-gate, map pins, spinners, militia hardware. Frequency is the disrespect: there is no per-dispatch lwa animation, no lwa-on-a-toggle, no vèvè as wallpaper. Credit the fer-découpé tradition in an about/credits surface.
2. **The upright subject.** Every human, everywhere, is drawn standing — head up, forward-facing, backlit, holding tool / machete / flag / drum / conch; monumental. **Never** chains, whipped or branded backs, the kneeling "Am I Not a Man" supplicant, a face contorted in agony for the viewer, or children as suffering-props.
3. **The RED/GREEN trauma-porn audit** (ships as a CI dark-surface lint parallel to the native gate). **RED, never render:** the Brookes slave-deck as a legible manifest, whipped/branded backs, drowning or dog-mauling as action, the supplicant, agonized faces. **GREEN, the truthful alternative:** the sea and absence, the still memorial water + the exact James count/quote, the machine and the empty manacle, the upright armed silhouette, Gede's purple. Every dark asset ships a one-line note naming its GREEN technique and its binding fact-text. Counter-guard: no sanitizing into vagueness.
4. **The comic-enemy firewall.** The comic over-formal enemy army belongs to drilled gameplay only. It never shares a frame with the noyades, Leclerc's dogs, the Middle Passage, or any memorial beat — separated by palette station, by type (inscription serif vs Anton placard), and by zero comic chrome on any memorial surface. Rochambeau drowning the bay of Le Cap is genocide, not slapstick.
5. **Kreyòl legibility is design law.** Kreyòl always renders in **Literata**, never a display/decorative/gold-clip face; always on a solid or scrimmed inset panel (never floating on vèvè, sequins, caustics, or shimmer); ≥AA contrast (umber/night ink on kanvas, bone on dark). Every rendered Kreyòl string is long-press-to-English.
6. **One-texture performance rule.** Exactly one live `feTurbulence` in the app, baked to a single data-URI tile; all gouache-edge displacement baked per-asset; cap compositing at one multiply (grain) + one screen (glint) per screen; motion is transform/opacity only, every shimmer/draw-on/pulse/caustic/ember gated behind `prefers-reduced-motion` with a fully-composed still fallback. Gold is a border/seal/edge accent ramp only — never a large fill, never Kreyòl.
7. **Claude coins and asserts nothing.** Zero invented vèvè, zero Kreyòl coinage, zero theology or lwa-color claimed as fact (Legba's colors specifically are NOT asserted — sources conflict). Every lwa naming, sacred label, death-toll, and Kreyòl string routes through Manman's gate + documented sources; new/changed strings ship `needsReview:true`, filtered from the boys' build.

## 3. Palette (one collapsed token set — the whole identity)

| token | hex | role |
|---|---|---|
| kanvas-ground | `#F2ECD9` | warm canvas base for sober/history surfaces — never pure white |
| bone-white | `#EFE9D2` | cool white: Danbala, the flag's torn-out white, inscriptions on dark, mourning cotton |
| cornmeal-veve | `#E8D9A0` | THE sacred cosmogram line — vèvè strokes, pale on dark only; never a UI stroke |
| umber-outline | `#3A2A1C` | universal contour + body ink on kanvas (~9:1) |
| night-earth | `#120E0B` | dark ceremony ground — Bwa Kayiman night, the earth vèvè are drawn on, Memwa black |
| sea-hold-black | `#0A1017` | terror ground — the hold of the crossing, the bay of Le Cap, the still memorial water |
| deep-blue | `#16294D` | primary insignia/ground blue — **both-sides-blue** uniform coat, Ezili Dantò dark blue |
| sacred-cobalt | `#1B6FB3` | saturated sacred sky (Hyppolite key); lwa-invocation grounds |
| sea-teal | `#17726B` | Agwe's ordinary sea, coasts, crossing beats |
| deep-sea | `#0C3B47` | deep-water shadow under sea fields |
| emerald | `#1E7A4D` | foliage, the lush Northern Plain, life; sacred-key base green |
| plain-ochre | `#C88A3A` | Cap-Haïtien walls, dirt, the Northern Plain; the sober-history anchor |
| sober-indigo | `#20304F` | documentary night / colonial indigo crop |
| scarlet | `#C42021` | THE unified painterly revolutionary red — battle chrome, Ogou Feray, Ezili Dantò, scar-stripes |
| oxblood | `#6E1414` | restrained sacrificial/revolutionary red — Bwa Kayiman, the cost; never a bright gore fill |
| gede-aubergine | `#4B2361` | the Memwa + mourning register; death-that-laughs, set apart from the battle palette |
| iron-charcoal | `#2A2622` | fer découpé fill + all militia hardware + Ogou's metal; the secular chrome material |
| gold ramp | `#6B4A12 → #9A6E1C → #D9A521 → #F4D66A` | seals, won-moment medallions, display-size English emphasis, flag-unlocked accent — border/edge only |
| ember ramp | `#D93A16 → #FF7A2D` | GLOW ONLY (screen blend, never a fill) — the burning plain, forge, Petwo fire |
| flag-blue | `#00209F` | ARTIFACT-LOCKED to the literal Arcahaie flag (Ch.6) only |
| flag-red | `#D21034` | ARTIFACT-LOCKED to the Arcahaie flag (Ch.6) only |

**Both-sides-blue:** refuse the false French-blue-vs-rebel-red code. Both armies wore `deep-blue`; faction is read by cockade, flag, and bearing. `flag-blue`/`flag-red` appear only inside the Ch.6 flag; all other reds are `scarlet`. **Dantò is never Freda** (Ezili Dantò = scarlet + deep-blue, revolutionary mother; Freda = rose/luxury, out of the shipping set).

## 4. Typography (five faces, all OFL/embeddable as data-URIs)

- **Anton** (display) — ultra-bold condensed poster grotesque with hand-painted-signage density (tap-tap, rara). Chapter numerals, battle-cries (« An avan! An avan! »), placard headlines, English chrome. **Never sets Kreyòl body.**
- **Literata** (body) — warm literary book-serif with full Kreyòl diacritic coverage. THE face every flip-gate Kreyòl string, scene text, and dispatch prompt renders in; always on a scrimmed panel, ≥AA.
- **Fraunces** (accent, opsz/SOFT/WONK) — warm ceremonial subhead + Obin-tableau banner captions + chapter subtitles.
- **IBM Plex Mono** (accent) — Cipher Office / dispatch codes / relay metadata. Codes only, never narration.
- **Libre Caslon Display** (accent) — French-as-historical-artifact only (a colonial decree, an enemy memo) — French is dead artifact; Kreyòl is the living weapon.

*(Archivo Black and Spectral killed as duplicates of Anton and Literata.)*

## 5. Texture system (concrete self-contained recipes)

- **The one grain tile** — a single `feTurbulence` (fractalNoise, baseFreq ~0.9, ≤2 octaves, desaturated), rasterized once to a tiling data-URI, applied `background-blend-mode:multiply` at 8–12% on one full-bleed layer behind all content. Canvas tooth at zero per-element cost.
- **Baked gouache edge** — `feTurbulence`→`feDisplacementMap` (scale ≤3) breaking a shape's vector edge, baked per-asset. Hand-painted wobble on map contours, lwa figures, drapo emblems.
- **Halo / forge glow** — layered radial+conic gradients on the ember ramp in `mix-blend-mode:screen`, never a fill; one screen layer per screen; optional slow pulse, reduced-motion-gated.
- **Gold metal ramp** — 4-stop linear gradient at ~105° + one narrow white→transparent glint band (translateX) + faint baked grain. Border/seal/edge/emphasis only.
- **Sequin-glint field** — HONOR surfaces only (Bwa Kayiman banner Ch.1, Arcahaie flag Ch.6): SVG `<pattern>` of small dome-radial circles, jittered, baked to a data-URI; animate one translating sheen band only. Never behind Kreyòl, never a reward/loading state, never a map pin.
- **Cornmeal powder line** — SACRED only: stroke-only cornmeal paths on night/earth, round caps, mirrored `<use>` symmetry, granular baked displacement + sparse stray dots, self-drawing via `stroke-dashoffset` for ceremony.
- **Sea caustics** — baked ripple tile; drift via transform/opacity, reduced-motion freezes. For the noyades: drop luminance, slow to near-still — stillness is the content.

## 6. Motif system (lwa → mechanic; grounded, Manman-gated)

| motif | from | where |
|---|---|---|
| **Legba's crossroads** | Papa Legba, opener of the way, patron of communication | The ONE app-entry threshold vèvè (cornmeal, self-drawing, no asserted color). The everyday flip-gate uses a **secular fer-découpé key**, never Legba. |
| **Ogou Feray iron** | warrior-statesman lwa (Nago), red+blue = Feray = the flag | Battle-screen frame + regiment insignia (sabre-cross, native-reviewed). Empowers the boys' side alone; the comic enemy never wears it. |
| **Ezili Dantò's scars** | fierce Petwo mother of Haiti, scarred (red/dark-blue) | Ch.1 — the ONLY channel for the whip: two scarlet stripes = her cheek-scars and the flag's red. Never a depicted lashing. Never conflated with Freda. |
| **Gede's cross** | Bawon Samedi / the Gede (purple/black/white); death that laughs | Memwa flashbacks + the roll of the fallen + the dignified container for the noyades. No "seasonal skin." |
| **The lambi conch** | the maroons' signal-horn; Le Marron Inconnu | THE signature of the voice-dispatch — Kreyòl made audible-visible; expanding arcs "the enemy can't decode." |
| **Danbala twin serpents** | Danbala + Ayida Wèdo (white, cool, eternal) | RARE continuity/closing interstitials only. Never a loading spinner. |
| **Agwe's boat & La Sirèn** | Agwe (sea/ships) + La Sirèn (constant in fer découpé) | Sea/crossing beats; the noyades as darkened near-still sea with nothing in the water. Ordinary Agwe sea kept visually distinct from the noyades. |
| **The torn flag & cockade** | Congress of Arcahaie, 18 May 1803 | Ch.6 climax: 1803 **horizontal** blue-over-red; the kid performs the tear (clip-path); the removed band is "the colony, torn away." Flon's needle labeled legend. |
| **Fer découpé** | Liautaud / Croix-des-Bouquets cut-oil-drum (secular) | ALL repeated/utility chrome — the appropriation firewall's workhorse. Single-fill charcoal silhouettes, evenodd punches, lifted top edge, baked hammer grain; no glossy bevel. |
| **The Saint-Domingue campaign map** | real geography (owner ruling), painted in the Duffaut/naïf manner | THE campaign map: the true coastline of Saint-Domingue with the 8 battles at their real coordinates, a dashed march-route through them in chronological order, fer-découpé pins, painterly terrain. NOT a vertical climb (that metaphor is purged, `04` §2.10); mountains render as real relief and marronage, never a summit to conquer. |

## 7. Register arc — four chromatic stations (dark is always a way-station toward the flag)

1. **TERROR** (Prologue / Middle Passage): sea-hold black + indigo + iron-charcoal, low light and saturation. The Passage as absence and still sea; slavery carried by the machine (mill, empty manacle, cold branding iron on a table) — the apparatus indicted, never the ravaged body. Dignity kept by the upright silhouette leaving the frame and binding fact-text on every dark surface.
2. **UPRISING** (Ch.1 climax): black pierced by ember-red and hot gold — the burning of the Northern Plain as **liberatory sublime**, figures standing and advancing, the same fire the plantation's death and the revolution's birth. The hinge; if it read as disaster the arc breaks.
3. **THE SACRED** (Bwa Kayiman, the mourning, the noyades remembrance): Gede aubergine + bone + gold in the Hyppolite/Saint-Soleil key. Vodou as the connective tissue that organized the revolt (James's thesis made structural); the dead of Le Cap held with Gede's dignity-and-defiance. Dantò's scars are the single whip channel.
4. **TRIUMPH** (Arcahaie → Vertières → Gonaïves 1804): the flag's blue and red, white torn out, gold won, saturation and warmth at their peak — reachable as the "forward" color from every dark surface. The dark palette never returns as the last word.

## 8. Per-surface & per-chapter direction

- **App-entry** — the one earned Legba crossroads (cornmeal, self-drawing, Manman-blessed, no asserted color); Anton "KÒD LA" in gold. Crossing the threshold = entering the network.
- **Campaign map** — Duffaut sacred vertical, baked dense backdrop + thinned bone-white road, fer-découpé node medallions (not drapo), Agwe sea + sailboats at the base, Citadelle crown; degrades to a readable vertical stack on phones.
- **The wire (dispatch)** — the lambi conch hero; sending blows the signal, arcs the enemy can't hear; Plex Mono metadata; a garbled dispatch is wire-interference, always the wire's fault.
- **Flip-gate** — secular fer-découpé key glyph (not Legba, not a vèvè); Kreyòl in Literata on a scrim; long-press English.
- **Battle** — Ogou key: sabre-cross insignia, scarlet+deep-blue, forge-glow; both-sides-blue; enemy comically over-formal (too-tight wool, powdered, sweating) but firewalled from every memorial beat.
- **Memwa / roll of the fallen** — Gede key: aubergine + black + bone, cool/desaturated vs the warm present; the Gede cross opens the memory; the dead named, never bodies.
- **Chapter covers** — Obin Cap-Haïtien tableau grammar: frontal frieze, common groundline, reused townhouse `<symbol>`, painted caption-ribbon with the English title + binding date. Atrocity chapters use frieze-distance and the empty stage (empty boats, a horizon of smoke). Original compositions only — never trace an extant canvas.
- **Cipher Office** — Plex Mono, iron-charcoal fer-découpé chrome, coded-transmission idiom; no sacred forms.
- **Ch.1–8** and the Middle Passage prologue follow the register arc above; the Citadelle is 1805–1820 (epilogue framing only, never standing on 1 Jan 1804).

## 9. Reconciliation with the product

The saturation serves the learning. The core loop is unchanged — Leo and Isaac record spoken Kreyòl dispatches the other must genuinely understand to act on — and the visual thesis (Kreyòl as the network the enemy can't read) now has a hero image: the lambi throwing a signal-wave across valleys the French can't decode. The flip-gate still renders Kreyòl in legible Literata on a scrim, long-press-to-English, native-reviewed; texture always sits behind text, never on it. The two-key register split is itself a teaching device — a 14- and 15-year-old feels the difference between a documented battle and a ceremony before they can name it. The lifted content gates deepen the same product: the boys learn their heritage language inside the true, dignified, world-historical story of how the enslaved won their own freedom — the enslaved and their gods as subjects. Everything ships self-contained (baked data-URI texture, CSP-safe), legible on phone and shared PC, bounded by the co-op laws (no game-over, no brother-vs-brother, failure is retreat-to-the-mountains-and-retry) and the two honesty gates: Manman's native review for every Kreyòl and sacred string, and the RED/GREEN audit for every terror beat.

## 10. Mockup of record

`mockups/kod-la-drapo-ginen-v3.html` (self-contained; five faces embedded) — six hero surfaces: the Legba gate, the Saint-Domingue campaign map, the lambi wire, the Ogou battle, the Bwa Kayiman uprising, the Gede still water. Fonts, palette, texture recipes, and motifs are executed exactly to this document.
