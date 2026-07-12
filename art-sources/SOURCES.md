# art-sources — provenance for the Nano Banana pipeline

Authentic **source SVGs** used as *image inputs* to the art pipeline (`06`/Drapo Ginen) so generated raster art has a **correct, documented foundation** — never invented. Resolves Design-Review finding **A1** (the old gate vèvè was a coined, generic crossroads — a firewall violation). These files are **not shipped as-is**; they seed generation and (for the vèvè) a recolored gate asset.

## Pipeline rules (how these feed Nano Banana)
- Feed the relevant SVG as an **image input** to `gemini-2.5-flash-image` alongside the textless Drapo-Ginen prompt; the model grounds structure on it. **Reproduce the documented structure exactly — add nothing, coin nothing.**
- Output stays **textless** (no baked Kreyòl — the model can't render grave accents; text is set in HTML/CSS).
- **Sacred content (vèvè) passes Manman's gate before it ships to the boys** (appropriation firewall + upright-subject). It appears only in rare earned ceremony (v1: the gate, dimmed ≤0.2 opacity) — never as chrome.

## Vèvè — Wikimedia Commons, **Public Domain** (PD-Art / PD-Mark 1.0; uploader User:Chrkl, 2007). No attribution required.
| file | lwa | source |
|---|---|---|
| `veve/legba.svg` | Papa Legba (the gate, v1) — axes + center + walking cane at right | `File:VeveLegba.svg` |
| `veve/ogou.svg` | Ogou | `File:VeveOgoun.svg` |
| `veve/danbala.svg` | Danbala | `File:VeveDamballah.svg` |
| `veve/gede-baron.svg` | Gede / Baron Samedi | `File:VeveBaronSamedi.svg` |
| `veve/gede-brigitte.svg` | Manman Brigitte (Gede) | `File:VeveBrigitte.svg` |
| `veve/ayizan.svg` | Ayizan | `File:VeveAyizan.svg` |

*Not on Commons as SVG:* Ezili/Erzulie (only a JPG — `Vevé Ezili Dantor.jpg`), Agwe, Simbi, Marassa, Gran Bwa. Trace from a documented reference + Manman's gate if/when a ceremony needs them.

## Maps — usable directly (**personal, non-monetized use** — owner ruling 2026-07-12)
These are CC-BY-SA (attribution + share-alike). Because Kòd La is a **private, personal, non-public, non-monetized family app**, they may be **used directly** — as the war-table map foundation and as Nano Banana inputs. Attribution below is kept as courtesy/provenance. (Should the project ever go public, revisit: prefer the app's own coordinate-drawn `CampaignMap.tsx` geometry, which is public-domain geographic facts, or PD sources.)

| file | source | credit (courtesy) |
|---|---|---|
| `maps/saint-domingue.svg` | `File:Map_of_Saint_Domingue_English.svg` | © Cheposo (Wikimedia), CC-BY-SA 4.0 — the historical colonial map, best war-table reference |
| `maps/haiti-blank.svg` | `File:Haiti_blank_map.svg` | © Rémi Kaupp (User:Korrigan), CC-BY-SA + GFDL |
| `maps/haiti-topo.svg` | `File:Haiti_blank_map_with_topography.svg` | CC-BY-SA — kept local only (5 MB, gitignored) |

The **war-table map source of truth** remains `web/src/components/CampaignMap.tsx` (real coordinates, correct projection); the Saint-Domingue SVG grounds the *painted* raster foundation.

## Accuracy note (Design-Review A2)
The war-table map corrects the **Citadelle** pin from Gonaïves' coordinates to **Milot (19.573 N, −72.244 W)** → projected (674.7, 178.7) in the 900×640 / PAD 30 projection.
