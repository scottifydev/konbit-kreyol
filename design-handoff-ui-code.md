# Kòd La — front-end source (for design review)

Concatenated from `web/src`. UI only: routes (pages + client components), shared components, and the stylesheet. API routes, the engine, data, and lint are excluded. The content brief is in `DESIGN-HANDOFF.md`.

Files: 31.


---

## web/src/app/GateDoors.tsx

```tsx
"use client";
import { useState } from "react";

interface Door {
  id: string;
  cls: string;
  name: string;
  initial: string;
  role: string;
}

interface Labels {
  word: string;
  enter: string;
  noMatch: string;
}

/** The gate doors + passphrase (build-plan issue 1, per-person passphrase).
 *  Tapping a door reveals its word field; a correct word signs you onto the
 *  network. All chrome is passed in as plain strings (server-resolved through
 *  the gate) — zero Kreyòl literals here. */
export default function GateDoors({
  doors,
  labels,
}: {
  doors: Door[];
  labels: Labels;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [word, setWord] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (id: string) => {
    setBusy(true);
    setError(false);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile: id, passphrase: word }),
    });
    setBusy(false);
    if (res.ok) {
      const data = await res.json();
      window.location.href = data.href;
    } else {
      setError(true);
    }
  };

  return (
    <div className="doorgrid">
      {doors.map((d) => (
        <div key={d.id} className="panel" style={{ color: "var(--kanvas)" }}>
          <button
            type="button"
            onPointerUp={() => {
              setOpen(open === d.id ? null : d.id);
              setWord("");
              setError(false);
            }}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "block",
              width: "100%",
            }}
          >
            <span className={`liy ${d.cls}`}>{d.initial}</span>
            <div className="d3" style={{ marginTop: 10 }}>{d.name}</div>
            <div className="label" style={{ marginTop: 4 }}>{d.role}</div>
          </button>

          {open === d.id && (
            <div style={{ marginTop: 12 }}>
              <input
                type="password"
                aria-label={labels.word}
                placeholder={labels.word}
                value={word}
                autoFocus
                onChange={(e) => setWord(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && word.trim()) submit(d.id);
                }}
                style={{ width: "100%", boxSizing: "border-box" }}
              />
              <button
                className="cta sun"
                disabled={busy || !word.trim()}
                onPointerUp={() => submit(d.id)}
                style={{ marginTop: 8 }}
              >
                {labels.enter}
              </button>
              {error && (
                <div className="label" style={{ marginTop: 6, color: "var(--scarlet)" }}>
                  {labels.noMatch}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

```


---

## web/src/app/error.tsx

```tsx
"use client";

/** Route error boundary — turns an unhandled failure from a white screen into
 *  a recoverable, in-world beat (the wire dropped), never a stack trace. */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="stage">
      <div className="scrim" style={{ marginTop: 40 }}>
        <div className="kicker" style={{ color: "var(--gold-bright)" }}>
          the wire dropped
        </div>
        <p style={{ color: "#e7dcc2", marginTop: 8 }}>
          Static in the hills — the signal didn&apos;t get through. Give it another go.
        </p>
        <p style={{ marginBottom: 0 }}>
          <button className="cta sun" onClick={reset}>Try the wire again →</button>
        </p>
      </div>
    </main>
  );
}

```


---

## web/src/app/global-error.tsx

```tsx
"use client";

/** Root-level fallback (must render its own <html>/<body>) for errors that
 *  escape the route boundary. Kept minimal and self-contained. */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ background: "#0d0a07", color: "#e8d9a0", fontFamily: "Georgia, serif", padding: 40 }}>
        <p style={{ letterSpacing: ".2em", textTransform: "uppercase", fontSize: 13 }}>the wire dropped</p>
        <p>Static in the hills. Reload and pick the signal back up.</p>
        <button
          onClick={reset}
          style={{ padding: "12px 20px", background: "#d9a521", color: "#0d0a07", border: "none", cursor: "pointer", fontWeight: 700 }}
        >
          Reload →
        </button>
      </body>
    </html>
  );
}

```


---

## web/src/app/globals.css

```css
/* KÒD LA — DRAPO GINEN (05-art-direction-drapo-ginen.md).
   Warm, saturated, textured, Vodou-suffused, Black Jacobins.
   Texture comes from CODE — the one baked feTurbulence grain, gold/ember
   ramps, painted panel edges — so every surface reads rich with zero images. */

:root {
  --kanvas: #f2ecd9; --bone: #efe9d2; --cornmeal: #e8d9a0;
  --umber: #3a2a1c; --night: #120e0b; --seahold: #0a1017;
  --deepblue: #16294d; --cobalt: #1b6fb3; --seateal: #17726b; --deepsea: #0c3b47;
  --emerald: #1e7a4d; --ochre: #c88a3a; --indigo: #20304f;
  --scarlet: #c42021; --oxblood: #6e1414; --gede: #4b2361;
  --iron: #2a2622;
  --gold-shadow: #6b4a12; --gold-mid: #9a6e1c; --gold-bright: #d9a521; --gold-hi: #f4d66a;
  --gold: #d9a521; --hair: rgba(233,217,160,.16);
  --ember: #d93a16; --ember-core: #ff7a2d;
  --flag-blue: #00209f; --flag-red: #d21034;

  --f-display: "Archivo Black", system-ui, sans-serif;
  --f-body: "Literata", Georgia, serif;
  --f-cere: "Fraunces", "Literata", serif;
  --f-mono: "IBM Plex Mono", ui-monospace, monospace;
  --f-french: "Libre Caslon Display", Georgia, serif;

  --gold-ramp: linear-gradient(102deg, var(--gold-shadow), var(--gold-mid) 38%, var(--gold-bright) 72%, var(--gold-hi));
  --ember-ramp: radial-gradient(120% 100% at 50% 120%, var(--ember-core), var(--ember) 45%, transparent 72%);
  /* fer-découpé panel: warm-dark iron with a hand-hammered tooth (pure CSS) */
  --iron-tooth: repeating-linear-gradient(115deg, rgba(233,217,160,.03) 0 2px, transparent 2px 5px);
}

* { box-sizing: border-box; }
html, body {
  margin: 0; padding: 0; background: var(--night); color: var(--kanvas);
  font-family: var(--f-body); font-size: 16px; line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden; max-width: 100%;
}
/* nothing overflows the viewport; grid/flex children may shrink */
img, svg, video, table { max-width: 100%; }
.two > *, .doorgrid > * { min-width: 0; }
/* warm depth: a low ember/forge glow + darker vignette edges, all in code */
body::after {
  content: ""; position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(120% 80% at 50% 108%, rgba(217,58,22,.16), transparent 60%),
    radial-gradient(140% 120% at 50% -10%, rgba(27,111,179,.10), transparent 55%),
    radial-gradient(100% 100% at 50% 50%, transparent 55%, rgba(6,4,3,.55) 100%);
}
/* the ONE grain tile — baked feTurbulence, multiply, over everything */
body::before {
  content: ""; position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .12;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
}
main, .stage { position: relative; z-index: 2; }

/* ---------- type roles ---------- */
.d1, .d2, .d3, .kicker { font-family: var(--f-display); text-transform: uppercase; line-height: .98; margin: 0; font-weight: 400; letter-spacing: .01em; }
.d1 { font-size: clamp(40px, 7vw, 82px); }
.d2 { font-size: clamp(26px, 4vw, 42px); }
.d3 { font-size: 20px; letter-spacing: .02em; }
.kicker { font-size: 13px; letter-spacing: .22em; color: var(--gold-bright); }
.cere { font-family: var(--f-cere); font-weight: 600; }
.meta { font-family: var(--f-mono); font-size: 12px; letter-spacing: .05em; text-transform: uppercase; color: #c9bfa6; }
/* image-based display type: real Unicode text (correct spelling), gold-leaf
   TEXTURE fill — rich without the misspelling risk of generated lettering */
.gold { background: url(/art/gold-leaf.webp) center / cover, var(--gold-ramp); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 2px 2px rgba(0,0,0,.55)); }
.kreyol { font-family: var(--f-body); font-size: 21px; line-height: 1.5; }
/* Kreyòl reading surface — Literata on a scrim, never on raw texture (visual
   law, 05 §). The dark inset scrim keeps the code legible over painted panels. */
.kreyol-body { font-family: var(--f-body); font-size: 20px; line-height: 1.55; color: var(--kanvas); background: rgba(9,7,5,.5); border-left: 3px solid var(--gold-mid); padding: 12px 15px; border-radius: 2px; }
.oral { font-family: var(--f-cere); font-style: italic; font-weight: 400; font-size: 22px; color: var(--cornmeal); border-left: 3px solid var(--gold-mid); padding-left: 14px; }
.french { font-family: var(--f-french); }
.label { font-family: var(--f-mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #a99e84; }

a { color: var(--gold-bright); text-decoration: none; }

/* ---------- layout shell ---------- */
.stage { max-width: 1080px; margin: 0 auto; padding: 30px 24px 130px; }
.head {
  display: flex; align-items: flex-end; justify-content: space-between; gap: 18px; flex-wrap: wrap;
  padding-bottom: 14px; margin-bottom: 24px;
  border-bottom: 2px solid transparent; border-image: var(--gold-ramp) 1;
}
.two { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, .85fr); gap: 28px; align-items: start; }
@media (max-width: 820px) { .two { grid-template-columns: minmax(0, 1fr); } }
.hero, .panel, .goldband, .scrim { max-width: 100%; }

/* ---------- fer-découpé panel: rich even empty ---------- */
.panel {
  position: relative; min-width: 0;
  background:
    linear-gradient(180deg, rgba(24,18,13,.72), rgba(15,11,8,.88)),
    url(/art/panel-iron.webp) center / cover;
  border: 1px solid rgba(233,217,160,.12);
  box-shadow: inset 0 1px 0 rgba(233,217,160,.14), 0 10px 30px rgba(0,0,0,.55);
  padding: 20px;
}
.panel::before { /* thin lifted gold keyline inset — signwriter's pinstripe */
  content: ""; position: absolute; inset: 7px; border: 1px solid rgba(154,110,28,.30); pointer-events: none;
}
/* forged corner rivets — cheap craft, kills the generic-div feel */
.panel::after {
  content: ""; position: absolute; inset: 7px; pointer-events: none;
  background:
    radial-gradient(circle at 0 0, var(--gold-mid) 1.5px, transparent 2.5px),
    radial-gradient(circle at 100% 0, var(--gold-mid) 1.5px, transparent 2.5px),
    radial-gradient(circle at 0 100%, var(--gold-mid) 1.5px, transparent 2.5px),
    radial-gradient(circle at 100% 100%, var(--gold-mid) 1.5px, transparent 2.5px);
  background-repeat: no-repeat; opacity: .8;
}
.panel > * { position: relative; z-index: 1; }
/* Kreyòl legibility law: always on a solid/scrimmed panel, never on texture */
.scrim { background: rgba(9,7,5,.74); border-left: 3px solid var(--gold-mid); padding: 15px 18px; }
.scrim.light { background: linear-gradient(rgba(242,236,217,.84), rgba(238,230,200,.9)), url(/art/parchment.webp) center / cover; color: var(--umber); border-left-color: var(--oxblood); box-shadow: inset 0 0 0 1px rgba(110,20,20,.12); }
.scrim.light .meta { color: var(--oxblood); }

.goldband { background: linear-gradient(rgba(244,214,106,.10), rgba(107,74,18,.18)), url(/art/gold-leaf.webp) center / cover, var(--gold-ramp); color: var(--night); padding: 13px 16px; font-weight: 700; box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 4px 14px rgba(0,0,0,.45); text-shadow: 0 1px 0 rgba(255,240,200,.35); }
.hr { border: none; border-top: 1px solid rgba(233,217,160,.14); margin: 0; }
.row { display: flex; gap: 12px; align-items: baseline; padding: 12px 0; border-top: 1px solid rgba(233,217,160,.12); }
.hairline-row { border-top: 1px solid rgba(233,217,160,.14); padding: 13px 0; }
.hairline-row audio { width: 100%; margin: 8px 0; filter: sepia(.3) saturate(1.2) hue-rotate(-10deg); }

/* ---------- CTAs ---------- */
.cta { display: inline-block; border: none; cursor: pointer; font-family: var(--f-display); text-transform: uppercase; letter-spacing: .05em; font-size: 15px; padding: 13px 22px; color: var(--night); background: var(--gold-ramp); box-shadow: 0 3px 0 var(--gold-shadow), 0 7px 16px rgba(0,0,0,.45); }
.cta:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--gold-shadow); }
.cta.scar { background: var(--scarlet); color: var(--bone); box-shadow: 0 3px 0 var(--oxblood), 0 7px 16px rgba(0,0,0,.45); }
.cta.iron { background: var(--iron-tooth), linear-gradient(180deg,#332e28,#241f1b); color: var(--cornmeal); box-shadow: inset 0 1px 0 rgba(233,217,160,.2), 0 3px 8px rgba(0,0,0,.5); }
.cta.ghost { background: transparent; color: var(--cornmeal); border: 1px solid rgba(233,217,160,.28); box-shadow: none; }
/* .sun — the PRIMARY action: brighter gold + a warm sun-glow so the one thing
   to do next reads above secondary .cta buttons and toggles show a lit state. */
.cta.sun { background: linear-gradient(180deg, var(--gold-hi), var(--gold-bright) 60%, var(--gold-mid)); box-shadow: 0 3px 0 var(--gold-shadow), 0 0 18px rgba(244,214,106,.45), 0 7px 18px rgba(0,0,0,.45); }
.cta.sun:active { transform: translateY(2px); box-shadow: 0 1px 0 var(--gold-shadow), 0 0 12px rgba(244,214,106,.4); }
.cta:disabled { opacity: .5; cursor: default; filter: saturate(.6); box-shadow: none; transform: none; }

/* ---------- identity marks ---------- */
.liy { display: inline-flex; width: 36px; height: 36px; align-items: center; justify-content: center; flex: none; font-family: var(--f-display); font-size: 18px; color: var(--kanvas); box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 2px 6px rgba(0,0,0,.4); }
.liy.leo { background: var(--cobalt); } .liy.isaac { background: var(--scarlet); }
.liy.adult { background: var(--iron); } .liy.k { background: var(--gold-ramp); color: var(--night); }

/* 77-tick ruler */
.ruler { display: flex; gap: 2px; margin: 10px 0; flex-wrap: wrap; }
.ruler i { width: 4px; height: 16px; background: rgba(233,217,160,.16); flex: none; }
.ruler i.solid { background: var(--gold-ramp); }
.sundot { display: inline-block; width: 8px; height: 8px; background: var(--gold-bright); vertical-align: middle; margin-right: 6px; box-shadow: 0 0 6px rgba(217,165,33,.6); }

/* ---------- the language gate: flip + gloss + tooltip ---------- */
.flip { cursor: pointer; }
.flipnew { text-decoration: underline; text-decoration-color: var(--gold-bright); text-decoration-thickness: 2px; text-underline-offset: 3px; }
.gloss { background: var(--gold-bright); color: var(--night); padding: 0 2px; cursor: pointer; }
.tooltip { position: fixed; background: var(--iron); color: var(--cornmeal); padding: 8px 12px; font-size: 14px; box-shadow: 0 6px 18px rgba(0,0,0,.6); border: 1px solid rgba(233,217,160,.2); pointer-events: none; z-index: 60; max-width: 260px; }

/* ---------- hold-to-record (phone voice bar) ---------- */
.hold-bar { touch-action: none; user-select: none; -webkit-user-select: none; width: 100%; padding: 16px; font-family: var(--f-display); text-transform: uppercase; letter-spacing: .05em; border: 2px solid var(--iron); background: var(--iron-tooth), linear-gradient(180deg,#322c26,#221e1a); color: var(--cornmeal); cursor: pointer; text-align: center; box-shadow: inset 0 1px 0 rgba(233,217,160,.2); }
.hold-bar.recording { background: var(--scarlet); color: var(--bone); border-color: var(--oxblood); }
/* live mic level meter — proves the wire hears you (volume only, never a grade) */
.meter { display: flex; align-items: center; justify-content: center; gap: 3px; height: 22px; margin-top: 8px; }
.meter i { width: 4px; height: 3px; background: var(--cornmeal); border-radius: 1px; transform-origin: center; transition: transform .06s linear; }
/* mic-denied panel — numbered steps on the slate, never an apology (05 §9) */
.slate { background: rgba(9,7,5,.6); border: 1px solid var(--hair); padding: 14px 18px; color: var(--cornmeal); }
.slate ol { margin: 0; padding-left: 1.3em; } .slate li { padding: 3px 0; }

/* ---------- hero art wrapper (rich even before images load) ---------- */
.hero { position: relative; overflow: hidden; border: 1px solid rgba(233,217,160,.12); box-shadow: 0 12px 40px rgba(0,0,0,.55); background: radial-gradient(120% 120% at 50% 120%, rgba(217,58,22,.22), transparent 60%), linear-gradient(180deg, #17110d, var(--night)); }
.hero img { display: block; width: 100%; height: 100%; object-fit: cover; }
.hero .veil { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(9,7,5,0) 40%, rgba(9,7,5,.85)); }
.hero .cap { position: absolute; left: 0; right: 0; bottom: 0; padding: 20px; }
.hero .cap .d1, .hero .cap .d2 { font-size: clamp(28px, 8vw, 60px); }
.hero.banner { aspect-ratio: 16 / 6; }
.hero.banner-tall { aspect-ratio: 16 / 7; }
.hero.banner-wide { aspect-ratio: 16 / 5; }
.doorgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

@media (max-width: 680px) {
  .hero.banner, .hero.banner-tall { aspect-ratio: 4 / 3; }
  .hero.banner-wide { aspect-ratio: 3 / 2; }
  .hero .cap { padding: 14px; }
  .stage { padding: 20px 14px 150px; }
  .head { padding-bottom: 12px; margin-bottom: 18px; }
}
@media (max-width: 440px) { .doorgrid { grid-template-columns: 1fr; } }

.svgwrap { display: block; width: 100%; max-width: 100%; height: auto; }
table.plain { border-collapse: collapse; width: 100%; table-layout: fixed; }
table.plain td:first-child { width: 44px; }
table.plain td { padding: 9px 8px; border-top: 1px solid rgba(233,217,160,.12); font-variant-numeric: tabular-nums; }

.index { margin-top: 26px; display: flex; gap: 16px; flex-wrap: wrap; }
.credit { font-family: var(--f-mono); font-size: 10.5px; color: #8a7d5f; letter-spacing: .03em; margin-top: 10px; }

/* ── Motion & feedback layer (09 §13 felt-experience pass). Every tap answers;
   nothing sits inert. 120–200ms, dry, no confetti. The reduced-motion guard
   at the very bottom disables all of it. ── */
.cta, a, .hold-bar, .liy, input, textarea, select, button {
  transition: transform .14s ease-out, box-shadow .14s ease-out,
    background-color .14s ease-out, color .14s ease-out, opacity .14s ease-out,
    border-color .14s ease-out, filter .14s ease-out;
}
.cta:hover { filter: brightness(1.07); }
.cta.sun:hover { filter: brightness(1.1); }
.hold-bar:hover { border-color: var(--gold-mid); }
.hold-bar:active { transform: translateY(1px); }
a:hover { color: var(--gold-hi); }
/* keyboard + AT: nothing focusable is ever invisible */
:focus-visible { outline: 2px solid var(--gold-bright); outline-offset: 2px; border-radius: 1px; }
/* the whole screen settles in on each navigation — a page has a pulse */
.stage { animation: rise .3s ease-out both; }
@keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
/* a drill card advancing through the deck (VokClient keys on the card index) */
.cardin { animation: cardin .22s ease-out both; }
@keyframes cardin { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: none; } }
/* the earned-it beat: the gold ramp igniting, reused on every real success */
.ignite { animation: ignite .55s ease-out; }
@keyframes ignite { 0% { filter: brightness(1); } 35% { filter: brightness(1.55) saturate(1.25); } 100% { filter: brightness(1); } }
.checkin { display: inline-block; animation: checkin .34s cubic-bezier(.2,1.4,.4,1) both; }
@keyframes checkin { from { opacity: 0; transform: scale(.4); } to { opacity: 1; transform: none; } }
/* a miss — a soft shake, never a scary red flash (copy/non-punitive law) */
.softshake { animation: softshake .34s ease-out; }
@keyframes softshake { 0%,100% { transform: none; } 20% { transform: translateX(-5px); } 40% { transform: translateX(5px); } 60% { transform: translateX(-3px); } 80% { transform: translateX(3px); } }
/* the gold audio player — a designed object for hearing a voice, not a debug bar */
.aplayer { display: flex; align-items: center; gap: 10px; margin: 8px 0; }
.aplay { flex: none; width: 40px; height: 40px; border-radius: 50%; border: none; cursor: pointer; background: var(--gold-ramp); box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 3px 8px rgba(0,0,0,.45); display: flex; align-items: center; justify-content: center; }
.aplay .aicon.play { width: 0; height: 0; border-left: 12px solid var(--night); border-top: 7px solid transparent; border-bottom: 7px solid transparent; margin-left: 3px; }
.aplay .aicon.pause { width: 11px; height: 13px; border-left: 3.5px solid var(--night); border-right: 3.5px solid var(--night); }
.atrack { flex: 1; height: 8px; background: rgba(233,217,160,.16); border-radius: 4px; cursor: pointer; touch-action: none; overflow: hidden; }
.afill { height: 100%; background: var(--gold-ramp); }
/* the konbit peak — the two identity marks sliding together (Mon "held") */
.mark-l { animation: slideL .5s ease-out both; }
.mark-r { animation: slideR .5s ease-out both; }
@keyframes slideL { from { transform: translateX(26px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes slideR { from { transform: translateX(-26px); opacity: 0; } to { transform: none; opacity: 1; } }
/* skeleton — a card-shaped placeholder while data loads, never a bare spinner */
.skel { background: linear-gradient(100deg, rgba(233,217,160,.06) 30%, rgba(233,217,160,.15) 50%, rgba(233,217,160,.06) 70%); background-size: 220% 100%; animation: shimmer 1.2s linear infinite; border-radius: 3px; }
/* an indeterminate in-flight shimmer for pending buttons/bars */
.pending { background-image: linear-gradient(100deg, transparent 30%, rgba(255,255,255,.22) 50%, transparent 70%); background-size: 220% 100%; animation: shimmer 1.1s linear infinite; }
@keyframes shimmer { from { background-position: 220% 0; } to { background-position: -120% 0; } }

@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
@media (max-width: 640px) { .stage { padding-bottom: 150px; } }

```


---

## web/src/app/gm/GmClient.tsx

```tsx
"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";

interface QueueItem {
  key: string;
  kind: string;
  ht: string | null;
  en: string;
  certified: boolean;
  unit?: number;
}
interface Recording {
  boy: string;
  kind: string;
  ref: string;
  label: string;
}

const KINDS = ["all", "lexicon", "chrome", "feed", "scene", "chapter name", "open ticket"];
const RENDER_CAP = 120;

/** The Cipher Office — Manman's review queue as an in-game surface (02 §5).
 *  ADULT SURFACE: plain speech, spec vocabulary legal. Built to make the pass
 *  FAST: filter by kind and unit, search, batch-certify a reviewed subset.
 *  Nothing Kreyòl reaches the boys until it clears here (native gate);
 *  certifying only flips it live once its unit is also taught (flip gate). */
export default function GmClient() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<"queue" | "recordings">("queue");
  const [recordings, setRecordings] = useState<Recording[] | null>(null);
  const [kind, setKind] = useState("all");
  const [unit, setUnit] = useState<number | "all">("all");
  const [q, setQ] = useState("");
  const [showDone, setShowDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/gm/queue");
      const data = await res.json();
      setQueue(data.queue ?? []);
    } finally {
      setLoaded(true);
    }
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);

  const loadRecordings = useCallback(async () => {
    setView("recordings");
    if (recordings !== null) return;
    try {
      const res = await fetch("/api/gm/audio");
      const data = await res.json();
      setRecordings(data.recordings ?? []);
    } catch {
      setRecordings([]);
    }
  }, [recordings]);

  const [err, setErr] = useState(false);
  const certify = async (keys: string[], value: boolean) => {
    if (keys.length === 0) return;
    setBusy(true);
    setErr(false);
    try {
      const res = await fetch("/api/gm/certify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keys, certified: value }),
      });
      if (!res.ok) throw new Error();
      await refresh();
    } catch {
      setErr(true); // never let her believe an approval reached the boys when it didn't
    }
    setBusy(false);
  };

  const units = useMemo(
    () => Array.from(new Set(queue.map((i) => i.unit).filter((u): u is number => u != null))).sort((a, b) => a - b),
    [queue],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return queue.filter((i) => {
      if (kind !== "all" && i.kind !== kind) return false;
      if (unit !== "all" && i.unit !== unit) return false;
      if (!showDone && i.certified) return false;
      if (needle && !(`${i.ht ?? ""} ${i.en}`.toLowerCase().includes(needle))) return false;
      return true;
    });
  }, [queue, kind, unit, q, showDone]);

  const total = queue.length;
  const doneCount = queue.filter((i) => i.certified).length;
  // batch-certifiable = shown, open, has a draft (null drafts need her words)
  const batchKeys = filtered.filter((i) => !i.certified && i.ht !== null).map((i) => i.key);
  const shown = filtered.slice(0, RENDER_CAP);

  return (
    <div>
      <div className="row" style={{ gap: 8, borderTop: "none", paddingTop: 0 }}>
        <button className={view === "queue" ? "cta sun" : "cta"} onPointerUp={() => setView("queue")} style={{ fontSize: 13 }}>
          Review queue
        </button>
        <button className={view === "recordings" ? "cta sun" : "cta"} onPointerUp={loadRecordings} style={{ fontSize: 13 }}>
          Their voices
        </button>
      </div>

      {view === "recordings" ? (
        <div style={{ marginTop: 16 }}>
          <p className="label">
            Every recording your sons have made — hear them, then reply by voice
            (recast, never mock the accent). Nothing here scores a voice.
          </p>
          {recordings === null ? (
            <div className="goldband pending">gathering the recordings…</div>
          ) : recordings.length === 0 ? (
            <div className="scrim"><p style={{ margin: 0 }}>No recordings yet — they&apos;ll land here as the boys send dispatches and say words aloud.</p></div>
          ) : (
            recordings.map((r, n) => (
              <div key={n} className="hairline-row">
                <div className="row" style={{ justifyContent: "space-between", padding: 0 }}>
                  <span className="label">{r.boy} · {r.kind}</span>
                  <span className="label" style={{ color: "var(--cornmeal)" }}>{r.label}</span>
                </div>
                <AudioPlayer src={`/api/audio/${r.ref}`} />
              </div>
            ))
          )}
        </div>
      ) : (
      <>
      <p>
        Nothing Kreyòl renders to the boys until it passes here. Certifying a
        draft flips it live once its unit is also taught (the flip gate still
        applies). Open tickets have no draft — they need your words; the app
        ships English there until you decide.
      </p>

      {!loaded ? (
        <div className="goldband pending">reading the queue…</div>
      ) : (
        <div className="goldband">
          {doneCount} / {total} cleared · {total - doneCount} waiting on you
        </div>
      )}
      {err && (
        <p className="label" style={{ color: "var(--scarlet)" }}>
          that didn&apos;t save — check the connection and try again.
        </p>
      )}

      <div className="row" style={{ flexWrap: "wrap", gap: 6, margin: "14px 0" }}>
        {KINDS.map((k) => (
          <button
            key={k}
            className={kind === k ? "cta sun" : "cta"}
            onPointerUp={() => setKind(k)}
            style={{ fontSize: 13 }}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="row" style={{ flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 14 }}>
        <input
          placeholder="search…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: "1 1 160px" }}
        />
        <select value={unit} onChange={(e) => setUnit(e.target.value === "all" ? "all" : Number(e.target.value))}>
          <option value="all">all units</option>
          {units.map((u) => (
            <option key={u} value={u}>unit {u}</option>
          ))}
        </select>
        <label className="label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />
          show cleared
        </label>
      </div>

      {batchKeys.length > 0 && (
        <p>
          <button className="cta sun" disabled={busy} onPointerUp={() => certify(batchKeys, true)}>
            Clear all {batchKeys.length} shown
          </button>{" "}
          <span className="label">— only what you've reviewed</span>
        </p>
      )}

      <div className="label" style={{ margin: "10px 0" }}>
        Showing {shown.length} of {filtered.length}
        {filtered.length > RENDER_CAP ? " (narrow with search / unit)" : ""}
      </div>

      {shown.map((i) => (
        <div key={i.key} className="hairline-row">
          <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="label">{i.kind}{i.unit != null ? ` · u${i.unit}` : ""}</span>
            {i.certified && <span className="label" style={{ color: "var(--gold-bright)" }}>✓ cleared</span>}
          </div>
          <div className="kreyol-body">{i.ht ?? "— no draft — needs your words —"}</div>
          <div style={{ color: "#c9bfa6" }}>{i.en}</div>
          {i.ht !== null && !i.certified && (
            <button className="cta sun" disabled={busy} onPointerUp={() => certify([i.key], true)}>
              Good — send it
            </button>
          )}
          {i.certified && (
            <button className="cta" disabled={busy} onPointerUp={() => certify([i.key], false)}>
              Pull it back
            </button>
          )}
        </div>
      ))}
      </>
      )}
    </div>
  );
}

```


---

## web/src/app/gm/page.tsx

```tsx
import GmClient from "./GmClient";

/** GM console — ADULT SURFACE (kid copy law does not apply; 04 §2 preamble).
 *  v1 scaffold ships the Cipher Office queue; the dispatch composer, enemy
 *  intel templates, commendations, and the event scheduler are build-plan
 *  issue 9. GM LAW 1: nothing on this surface can write to any ledger —
 *  see /api/gm/certify.
 *  AUTH: Supabase family-only auth is the production gate (06 §1); until
 *  that project exists this surface is local-dev only. */
export default function GmPage() {
  return (
    <main className="stage">
      <header className="head">
        <div>
          <div className="kicker">adult surface — the boys do not see this</div>
          <h1 className="d1 gold" style={{ fontFamily: "var(--f-mono)", letterSpacing: "-.01em", textTransform: "none" }}>
            Cipher Office
          </h1>
        </div>
        <div className="meta">nothing Kreyòl reaches the boys until it passes here</div>
      </header>
      <GmClient />
    </main>
  );
}

```


---

## web/src/app/icon.svg

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="10" fill="#0d0a07"/>
  <g fill="none" stroke="#d9a521" stroke-width="3.4" stroke-linecap="round">
    <line x1="32" y1="12" x2="32" y2="52"/>
    <line x1="12" y1="32" x2="52" y2="32"/>
    <circle cx="32" cy="32" r="6.5"/>
    <circle cx="32" cy="32" r="2.4" fill="#d9a521"/>
  </g>
</svg>

```


---

## web/src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import {
  Archivo_Black,
  Literata,
  Fraunces,
  IBM_Plex_Mono,
  Libre_Caslon_Display,
} from "next/font/google";
import "./globals.css";

/** DRAPO GINEN type spine (05-art-direction-drapo-ginen.md §4), self-hosted.
 *  Archivo Black = loud poster display/English chrome (renders è/ò/à — the
 *  Kreyòl-diacritic-safe poster face); Literata = the Kreyòl reading body;
 *  Fraunces = ceremonial subhead; Plex Mono = cipher; Caslon = French artifact. */
const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--f-display", display: "swap" });
const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--f-body",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--f-cere",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--f-mono",
  display: "swap",
});
const caslon = Libre_Caslon_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--f-french",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kòd La",
  description: "Two brothers, one wire the enemy cannot read.",
  openGraph: {
    title: "Kòd La",
    description: "Two brothers, one wire the enemy cannot read.",
    type: "website",
    images: ["/art/gate-ground.webp"],
  },
};

export const viewport = { themeColor: "#0d0a07" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${literata.variable} ${fraunces.variable} ${mono.variable} ${caslon.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

```


---

## web/src/app/not-found.tsx

```tsx
import Link from "next/link";

/** In-world 404 — a missing trail, with a way back to the gate. */
export default function NotFound() {
  return (
    <main className="stage">
      <div className="scrim" style={{ marginTop: 40 }}>
        <div className="kicker" style={{ color: "var(--gold-bright)" }}>off the map</div>
        <p style={{ color: "#e7dcc2", marginTop: 8 }}>
          This trail isn&apos;t on the map yet.
        </p>
        <p style={{ marginBottom: 0 }}>
          <Link className="cta" href="/">Back to the gate →</Link>
        </p>
      </div>
    </main>
  );
}

```


---

## web/src/app/page.tsx

```tsx
import Flip from "@/components/Flip";
import GateDoors from "./GateDoors";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";

/** The gate — Drapo Ginen. The one earned Legba crossroads (hand-drawn
 *  cornmeal vèvè, NOT generated — appropriation firewall) over a painted
 *  night-earth ground. Doors carry name + role only; the konbit goldband
 *  is the one shared number. Pre-Unit-1: English chrome (language law). */
export const dynamic = "force-dynamic";

const DOORS = [
  { id: "leo", href: "/play/leo", cls: "leo", init: "L" },
  { id: "isaac", href: "/play/isaac", cls: "isaac", init: "I" },
  { id: "manman", href: "/gm", cls: "adult", init: "M", name: "Manman", role: "Cipher Office" },
  { id: "gm", href: "/gm", cls: "adult", init: "G", name: "GM", role: "War room" },
] as const;

export default async function Gate() {
  const state = await getStore().load();
  const { unit, certified, konbit, profiles } = state;
  const c = (key: string) => chrome(key, unit, certified);

  return (
    <main className="stage">
      <section className="hero banner-tall">
        <img src="/art/gate-ground.webp" alt="" />
        <div className="veil" />
        {/* Legba's crossroads — cornmeal on the dark, self-drawn ceremony vèvè */}
        <svg
          viewBox="0 0 200 200"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, margin: "auto", width: 260, height: 260, opacity: 0.5 }}
        >
          <g fill="none" stroke="#e8d9a0" strokeWidth="1.6" strokeLinecap="round">
            <line x1="100" y1="26" x2="100" y2="174" />
            <line x1="30" y1="100" x2="170" y2="100" />
            <circle cx="100" cy="100" r="17" />
            <circle cx="100" cy="100" r="9" />
            {[[100, 26], [100, 174], [30, 100], [170, 100]].map(([x, y], i) => (
              <path key={i} d={`M${x - 8},${y} L${x},${y - 8} L${x + 8},${y} L${x},${y + 8} Z`} />
            ))}
            <path d="M62,62 q-14,14 0,28 M138,62 q14,14 0,28 M62,138 q-14,-14 0,-28 M138,138 q14,-14 0,-28" />
          </g>
        </svg>
        <div className="cap" style={{ textAlign: "center", paddingBottom: 26 }}>
          <div className="kicker">two brothers · one wire the enemy cannot read</div>
          <h1 className="d1 gold" style={{ margin: "6px 0 4px" }}>
            <Flip view={c("logo")} />
          </h1>
          <div className="oral" style={{ borderLeft: "none", padding: 0, display: "inline-block" }}>
            « Men anpil, chay pa lou »
          </div>
        </div>
      </section>

      <div className="goldband" style={{ marginTop: 22 }}>
        <Flip view={c("konbit")} /> · {konbit.streak} <Flip view={c("days")} /> —{" "}
        <Flip view={c("konbit_survives")} />
      </div>

      <div className="two" style={{ marginTop: 22 }}>
        <GateDoors
          doors={DOORS.filter((d) => profiles[d.id]).map((d) => ({
            id: d.id,
            cls: d.cls,
            name: profiles[d.id].name,
            initial: profiles[d.id].name[0],
            role: profiles[d.id].role,
          }))}
          labels={{
            word: c("gate_word").text,
            enter: c("gate_enter").text,
            noMatch: c("gate_nomatch").text,
          }}
        />
        <aside className="scrim">
          <div className="meta" style={{ color: "var(--gold-bright)" }}>the network · Saint-Domingue · 1791–1804</div>
          <p style={{ margin: "8px 0 0", color: "#e7dcc2" }}>
            Papa Legba opens the way. The revolution runs on a wire the French cannot read — say the line, and you are on it.
          </p>
          <p className="credit"><Flip view={c("saving")} /></p>
        </aside>
      </div>
    </main>
  );
}

```


---

## web/src/app/play/[boy]/dispatch/DispatchClient.tsx

```tsx
"use client";
import { useCallback, useEffect, useState } from "react";
import HoldToRecord from "@/components/HoldToRecord";
import AudioPlayer from "@/components/AudioPlayer";

interface WireDispatch {
  id: string;
  sender: string;
  receiver: string;
  status: string;
  audioRef: string;
  check: { question: string; options: string[] };
  commendation: string | null;
}

interface Labels {
  promptEn: string;
  hold: string;
  denied: string[];
  inbox: string;
  garbled: string;
  repeat: string;
  acted: string;
  enemyFoiled: string;
}

/** The dispatch composer + inbox (phone surface). All chrome labels are
 *  resolved server-side through the gate and passed down — zero Kreyòl
 *  literals here (language law §1.4). */
export default function DispatchClient({
  boy,
  brother,
  promptId,
  labels,
}: {
  boy: string;
  brother: string;
  promptId: string;
  labels: Labels;
}) {
  const [inbox, setInbox] = useState<WireDispatch[]>([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [outcomes, setOutcomes] = useState<Record<string, string>>({});

  const refresh = useCallback(async () => {
    const res = await fetch(`/api/dispatches?for=${boy}`);
    const data = await res.json();
    setInbox(
      data.dispatches.filter((d: WireDispatch) => d.receiver === boy),
    );
  }, [boy]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const send = async (blob: Blob) => {
    const form = new FormData();
    form.append("audio", blob, "dispatch.webm");
    form.append("sender", boy);
    form.append("receiver", brother);
    form.append("promptId", promptId);
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch("/api/dispatches", { method: "POST", body: form });
      if (res.ok) setSent(true);
      else setSendError(true); // the wire dropped it — never fake a ✓
    } catch {
      setSendError(true);
    }
    setSending(false);
  };

  const act = async (id: string, option: number) => {
    const res = await fetch(`/api/dispatches/${id}/outcome`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ option }),
    });
    const data = await res.json();
    setOutcomes((o) => ({ ...o, [id]: data.outcome }));
    refresh();
  };

  const repeat = async (id: string) => {
    await fetch(`/api/dispatches/${id}/outcome`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repeat: true }),
    });
    setOutcomes((o) => ({ ...o, [id]: "" }));
    refresh();
  };

  return (
    <div>
      <section>
        <p className="kreyol-body">{labels.promptEn}</p>
        {sent ? (
          <p className="goldband ignite">→ {brother} <span className="checkin">✓</span></p>
        ) : sending ? (
          <div className="hold-bar pending" aria-live="polite">SENDING…</div>
        ) : (
          <>
            <HoldToRecord
              labels={{ idle: labels.hold, denied: labels.denied }}
              onRecorded={send}
              review
            />
            {sendError && (
              <p className="label" style={{ color: "var(--scarlet)", marginTop: 8 }}>
                didn&apos;t reach the wire — hold to send again
              </p>
            )}
          </>
        )}
      </section>

      <section>
        <h2 className="d3">{labels.inbox}</h2>
        {inbox.map((d) => (
          <div key={d.id} className="hairline-row">
            <AudioPlayer src={`/api/audio/${d.audioRef}`} />
            {d.status === "acted" || outcomes[d.id] === "acted" ? (
              <>
                <p className="goldband ignite">
                  {labels.acted}
                  {d.commendation ? ` · ★ ${d.commendation}` : ""}
                </p>
                {/* the thesis at the moment of triumph: they can't read it */}
                <p className="label" style={{ color: "var(--gold-bright)", fontStyle: "italic" }}>
                  {labels.enemyFoiled}
                </p>
              </>
            ) : outcomes[d.id] === "garbled" || d.status === "garbled" ? (
              <p>
                {labels.garbled}{" "}
                <button className="cta sun" onPointerUp={() => repeat(d.id)}>
                  {labels.repeat}
                </button>
              </p>
            ) : (
              <div>
                <p>{d.check.question}</p>
                {d.check.options.map((opt, i) => (
                  <p key={i}>
                    <button className="cta" onPointerUp={() => act(d.id, i)}>
                      {opt}
                    </button>
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

```


---

## web/src/app/play/[boy]/dispatch/page.tsx

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Flip from "@/components/Flip";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";
import { KANPAY } from "@/data/kanpay";
import DispatchClient from "./DispatchClient";

export const dynamic = "force-dynamic";

/** Dispatch surface (phone-first). The chapter's prompt + the inbox. */
export default async function DispatchPage({
  params,
}: {
  params: Promise<{ boy: string }>;
}) {
  const { boy } = await params;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") notFound();

  const { unit, certified } = state;
  const c = (key: string) => chrome(key, unit, certified);
  const brother = boy === "leo" ? "isaac" : "leo";
  const chapter = KANPAY.find((ch) => ch.unit === unit) ?? KANPAY[0];
  const prompt = chapter.scenes[0]?.dispatchPrompt;
  // Chapters whose orders aren't written yet degrade to an honest "coming"
  // state with a way onward — never a 404 on the game's main mechanic.
  if (!prompt) {
    return (
      <main className="stage">
        <header className="head">
          <div>
            <div className="kicker">{chapter.n}. {chapter.nameEn} · {chapter.year}</div>
            <h1 className="d1 gold"><Flip view={c("prod")} /></h1>
          </div>
        </header>
        <div className="scrim" style={{ marginTop: 20 }}>
          <p style={{ marginTop: 0, color: "#e7dcc2" }}>
            High command is still writing this chapter&apos;s orders. Stock your words while you wait — you&apos;ll need them on the wire.
          </p>
          <p style={{ marginBottom: 0 }}>
            <Link className="cta" href={`/play/${boy}/vok`}><Flip view={c("vok_step")} /></Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="stage">
      <header className="head">
        <div>
          <div className="kicker">
            {chapter.n}. {chapter.nameEn} · {chapter.year}
          </div>
          <h1 className="d1 gold">
            <Flip view={c("prod")} />
          </h1>
        </div>
        <div className="meta">blow the signal · say the line</div>
      </header>
      <section className="hero banner-wide" style={{ marginBottom: 22 }}>
        <img src="/art/lambi-conch.webp" alt="" style={{ objectPosition: "center 42%" }} />
        <div className="veil" />
        <div className="cap">
          <div className="oral" style={{ borderLeft: "none", padding: 0 }}>
            the wire the enemy cannot read
          </div>
        </div>
      </section>
      <DispatchClient
        boy={boy}
        brother={brother}
        promptId={prompt.id}
        labels={{
          promptEn: prompt.promptEn,
          hold: c("hold_button").text,
          denied: [
            c("mic_step1").text,
            c("mic_step2").text,
            c("mic_step3").text,
          ],
          inbox: c("dispatch_inbox").text,
          garbled: c("dispatch_garbled").text,
          repeat: c("dispatch_repeat").text,
          acted: c("dispatch_acted").text,
          enemyFoiled: c("enemy_foiled").text,
        }}
      />
    </main>
  );
}

```


---

## web/src/app/play/[boy]/feed/FeedClient.tsx

```tsx
"use client";
import { useState } from "react";

interface WirePost {
  id: string;
  pfp: string;
  who: string;
  sub: string;
  tag: string;
  ht: [string, string?][];
  en: string;
  items: string[];
}

/** Fil la scroll. Kreyòl post content is native data (not chrome) rendered
 *  through variables — never literals. Tap a glossed word for its meaning;
 *  hold the "EN" pill for the full English (the long-press-to-English law, on
 *  content). "Got it" writes a receptive review once (idempotent server-side)
 *  — a retrieval hidden in the scroll, never announced as a test. */
export default function FeedClient({
  boy,
  posts,
  reactedIds,
  reviews = [],
  reviLabel = "",
  labels,
}: {
  boy: string;
  posts: WirePost[];
  reactedIds: string[];
  reviews?: { id: string; en: string }[];
  reviLabel?: string;
  labels: { gotit: string };
}) {
  const [reacted, setReacted] = useState<Set<string>>(new Set(reactedIds));
  const [glossed, setGlossed] = useState<Set<string>>(new Set());
  const [showEn, setShowEn] = useState<string | null>(null);
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());
  const [openGloss, setOpenGloss] = useState<Set<string>>(new Set());

  const doReview = async (id: string) => {
    setReviewed((r) => new Set(r).add(id)); // optimistic
    try {
      const res = await fetch("/api/feed/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boy, id }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // roll back — never show a ✓ that didn't land
      setReviewed((r) => {
        const n = new Set(r);
        n.delete(id);
        return n;
      });
    }
  };

  const toggleGloss = (key: string) =>
    setGlossed((g) => {
      const n = new Set(g);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });

  const react = async (post: WirePost) => {
    setReacted((r) => new Set(r).add(post.id)); // optimistic
    try {
      const res = await fetch("/api/feed/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boy, postId: post.id, items: post.items }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setReacted((r) => {
        const n = new Set(r);
        n.delete(post.id);
        return n;
      });
    }
  };

  return (
    <div>
      {reviews.length > 0 && (
        <section className="panel" style={{ marginBottom: 16 }}>
          <div className="meta" style={{ color: "var(--gold-bright)" }}>{reviLabel}</div>
          <div className="row" style={{ flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {reviews.map((r) =>
              reviewed.has(r.id) ? (
                <span key={r.id} className="goldband" style={{ padding: "6px 10px" }}>✓</span>
              ) : (
                <button
                  key={r.id}
                  className="cta"
                  onPointerUp={() => {
                    if (openGloss.has(r.id)) doReview(r.id);
                    else setOpenGloss((g) => new Set(g).add(r.id));
                  }}
                  title={openGloss.has(r.id) ? labels.gotit : undefined}
                >
                  {openGloss.has(r.id) ? `${r.en} ✓` : r.id}
                </button>
              ),
            )}
          </div>
        </section>
      )}

      {posts.map((post) => (
        <article key={post.id} className="panel" style={{ marginBottom: 16 }}>
          <div className="row" style={{ alignItems: "center", gap: 10 }}>
            <span aria-hidden style={{ fontSize: 24 }}>{post.pfp}</span>
            <div style={{ flex: 1 }}>
              <div className="d3">{post.who}</div>
              <div className="label">{post.sub} · {post.tag}</div>
            </div>
            <button
              className="label"
              style={{ background: "none", border: "1px solid var(--gold)", borderRadius: 4, padding: "2px 8px", cursor: "pointer", color: "var(--gold-bright)" }}
              onPointerDown={() => setShowEn(post.id)}
              onPointerUp={() => setShowEn(null)}
              onPointerLeave={() => setShowEn((s) => (s === post.id ? null : s))}
            >
              EN
            </button>
          </div>

          <p className="kreyol-body" style={{ marginTop: 10 }}>
            {showEn === post.id
              ? post.en
              : post.ht.map((seg, i) => {
                  const [text, gloss] = seg;
                  if (!gloss) return <span key={i}>{text}</span>;
                  const key = `${post.id}:${i}`;
                  const open = glossed.has(key);
                  return (
                    <button
                      key={i}
                      onPointerUp={() => toggleGloss(key)}
                      style={{ all: "unset", cursor: "pointer", borderBottom: "1px dotted var(--gold)" }}
                    >
                      {text}
                      {open && (
                        <em style={{ color: "var(--gold-bright)", fontStyle: "normal" }}>
                          {" "}({gloss})
                        </em>
                      )}
                    </button>
                  );
                })}
          </p>

          <p style={{ marginBottom: 0 }}>
            {reacted.has(post.id) ? (
              <span className="goldband">✓</span>
            ) : (
              <button className="cta sun" onPointerUp={() => react(post)}>
                {labels.gotit}
              </button>
            )}
          </p>
        </article>
      ))}
    </div>
  );
}

```


---

## web/src/app/play/[boy]/feed/page.tsx

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Flip from "@/components/Flip";
import FeedClient from "./FeedClient";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";
import { POSTS } from "@/data/posts";
import { dueItems } from "@/lib/engine/srs";
import scopeData from "@/data/scope.json";
import type { ScopeItem } from "@/lib/engine/types";

const SCOPE = (scopeData as { items: ScopeItem[] }).items;

export const dynamic = "force-dynamic";

/** Fil la — the network's group chat, i.e. the receptive SRS hidden in a
 *  social scroll (02 §3, 09 §3). A post reaches a boy only if the native gate
 *  cleared it: needsReview === false (attested), or the Cipher Office
 *  certified it (post:<id>). Everything else is filtered out — that is the
 *  law working, so the feed grows as Manman certifies. */
export default async function FeedPage({
  params,
}: {
  params: Promise<{ boy: string }>;
}) {
  const { boy } = await params;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") notFound();

  const { unit, certified, day } = state;
  const c = (key: string) => chrome(key, unit, certified);
  // Revi: due scope words that have cleared the lexicon pass render as review
  // cards. Certifying a word in the Cipher Office makes it reviewable here.
  const reviews = dueItems(p, SCOPE, unit, day)
    .filter((i) => certified[`scope:${i.id}`] === true)
    .slice(0, 12)
    .map((i) => ({ id: i.id, en: i.en }));
  const visible = POSTS.filter(
    (post) =>
      (post.needsReview === false || certified[`post:${post.id}`] === true) &&
      post.u <= unit + 1,
  );
  const reacted: Record<string, number> = { ...p.reactions, ...p.gotit };

  return (
    <main className="stage">
      <header className="head">
        <div>
          <div className="kicker">the network · read the traffic</div>
          <h1 className="d1 gold">
            <Flip view={c("fil")} />
          </h1>
        </div>
        <div className="meta" style={{ textAlign: "right", maxWidth: 220 }}>
          <Flip view={c("tap_hint")} />
        </div>
      </header>

      {visible.length === 0 && reviews.length === 0 ? (
        <div className="scrim">
          <p style={{ marginTop: 0, color: "#e7dcc2" }}>
            <Flip view={c("feed_warming")} />
          </p>
          <p style={{ marginBottom: 0 }}>
            <Link className="cta" href={`/play/${boy}/vok`}>
              <Flip view={c("vok_step")} />
            </Link>
          </p>
        </div>
      ) : (
        <FeedClient
          boy={boy}
          reviews={reviews}
          reviLabel={c("revi_title").text}
          posts={visible.map((post) => ({
            id: post.id,
            pfp: post.pfp,
            who: post.who,
            sub: post.sub,
            tag: post.tag,
            ht: post.ht,
            en: post.en,
            items: post.items,
          }))}
          reactedIds={visible
            .filter((post) => reacted[post.id] !== undefined)
            .map((post) => post.id)}
          labels={{ gotit: c("gotit").text }}
        />
      )}

      <nav className="index label" style={{ marginTop: 26 }}>
        <Link href={`/play/${boy}`}>
          <Flip view={c("dash")} />
        </Link>
        <Link href={`/play/${boy}/dispatch`}>
          <Flip view={c("prod")} />
        </Link>
      </nav>
    </main>
  );
}

```


---

## web/src/app/play/[boy]/grammar/FokisClient.tsx

```tsx
"use client";
import { useState } from "react";

interface Task {
  id: string;
  ht: string;
  grammatical: boolean;
  ruleEn: string;
}

/** Judgment-first grammar (02 §3; 06 §5.4–5.5): the boy judges the sentence
 *  BEFORE the rule appears (generation effect). Correction is ADDITIVE CHALK —
 *  a circled answer and the rule, never a red-X, never "the ear says the answer
 *  it just missed": a miss reads "Close — the rule: …" (06 §5.5). Chrome passed
 *  as plain strings; the Kreyòl sentence is native content rendered via props. */
export default function FokisClient({
  tasks,
  labels,
}: {
  tasks: Task[];
  labels: { right: string; off: string };
}) {
  const [i, setI] = useState(0);
  const [judged, setJudged] = useState<null | boolean>(null);

  if (i >= tasks.length) {
    return <div className="panel"><div className="goldband">✓</div></div>;
  }
  const t = tasks[i];
  const correct = judged !== null && judged === t.grammatical;

  return (
    <div className="panel cardin" key={i}>
      <div className="label">{i + 1} / {tasks.length}</div>
      <p className="kreyol-body" style={{ fontSize: 22, margin: "12px 0" }}>{t.ht}</p>

      {judged === null ? (
        <p style={{ marginBottom: 0, display: "flex", gap: 10 }}>
          <button className="cta sun" onPointerUp={() => setJudged(true)}>{labels.right}</button>
          <button className="cta" onPointerUp={() => setJudged(false)}>{labels.off}</button>
        </p>
      ) : (
        <>
          {/* additive chalk: circle the answer + the rule; a miss is "Close — …" */}
          <div className={correct ? "scrim ignite" : "scrim"} style={{ display: "block" }}>
            {correct ? (
              <span><span className="checkin">✓</span> {t.ruleEn}</span>
            ) : (
              <span style={{ color: "var(--cornmeal)" }}>Close — the rule: {t.ruleEn}</span>
            )}
          </div>
          <p style={{ marginTop: 16, marginBottom: 0 }}>
            <button className="cta sun" onPointerUp={() => { setJudged(null); setI((n) => n + 1); }}>
              Next →
            </button>
          </p>
        </>
      )}
    </div>
  );
}

```


---

## web/src/app/play/[boy]/grammar/page.tsx

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Flip from "@/components/Flip";
import FokisClient from "./FokisClient";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";
import { grammarForBoys } from "@/data/grammar";

export const dynamic = "force-dynamic";

/** Fokis — the war college (judgment-first grammar, 02 §3). The grammar bank
 *  is Manman-gated content, so it renders "coming" until she seeds it; the
 *  drill is ready the moment native-verified tasks exist. */
export default async function FokisPage({
  params,
}: {
  params: Promise<{ boy: string }>;
}) {
  const { boy } = await params;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") notFound();

  const { unit, certified } = state;
  const c = (key: string) => chrome(key, unit, certified);
  const tasks = grammarForBoys();

  return (
    <main className="stage">
      <header className="head">
        <div>
          <div className="kicker">judge by ear · the rule comes after</div>
          <h1 className="d1 gold"><Flip view={c("fokis_title")} /></h1>
        </div>
      </header>

      {tasks.length === 0 ? (
        <div className="scrim">
          <p style={{ marginTop: 0, color: "#e7dcc2" }}>
            <Flip view={c("fokis_coming")} />
          </p>
          <p style={{ marginBottom: 0 }}>
            <Link className="cta" href={`/play/${boy}/vok`}><Flip view={c("vok_step")} /></Link>
          </p>
        </div>
      ) : (
        <FokisClient
          tasks={tasks.map((t) => ({ id: t.id, ht: t.ht, grammatical: t.grammatical, ruleEn: t.ruleEn }))}
          labels={{ right: c("fokis_right").text, off: c("fokis_off").text }}
        />
      )}

      <nav className="index label" style={{ marginTop: 26 }}>
        <Link href={`/play/${boy}`}><Flip view={c("dash")} /></Link>
      </nav>
    </main>
  );
}

```


---

## web/src/app/play/[boy]/mon/MonClient.tsx

```tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Labels {
  legTitle: string;
  muster: string;
  runners: string;
  inbox: string;
  quiet: string;
  tipPrompt: string;
  pass: string;
  hold: string;
  waits: string;
  fallBack: string;
  held: string;
  heldBody: string;
}

/** The battle leg (09 §4). All chrome is resolved server-side through the
 *  gate and passed as plain strings — zero Kreyòl literals here (§1.4). The
 *  boy sees only his OWN leg progress and the COLLECTIVE outcome; his
 *  brother's number is never shown (co-op law). Volleys are landed by acting
 *  on dispatches (the inbox link); this surface musters the leg, passes the
 *  word, and reveals whether the position held. */
export default function MonClient({
  boy,
  dispatchHref,
  dealt,
  legDone,
  score,
  budget,
  bothDone,
  taken,
  pending,
  labels,
}: {
  boy: string;
  dispatchHref: string;
  dealt: boolean;
  legDone: boolean;
  score: number;
  budget: number;
  brotherDone: boolean;
  bothDone: boolean;
  taken: boolean;
  pending: number;
  labels: Labels;
}) {
  const router = useRouter();
  const [tip, setTip] = useState("");
  const [busy, setBusy] = useState(false);

  const post = async (action: string, extra: Record<string, unknown> = {}) => {
    setBusy(true);
    try {
      await fetch("/api/mon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, boy, ...extra }),
      });
    } catch {
      /* the refresh below re-reads server truth; nothing is faked here */
    }
    setBusy(false);
    router.refresh();
  };

  // ── The shared outcome: the position held, or fall back to the mountains.
  if (bothDone && taken) {
    return (
      <div className="panel">
        {/* the peak — the two of you, one load. The marks slide together. */}
        <div className="hold-together" aria-hidden style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
          <span className="liy leo mark-l">L</span>
          <span className="liy isaac mark-r">I</span>
        </div>
        <div className="goldband ignite" style={{ textAlign: "center", fontSize: 22 }}>
          {labels.held} <span className="checkin">✓</span>
        </div>
        <p style={{ textAlign: "center", marginBottom: 8 }}>{labels.heldBody}</p>
        <div className="oral" style={{ borderLeft: "none", padding: 0, textAlign: "center", display: "block" }}>
          « Men anpil, chay pa lou »
        </div>
      </div>
    );
  }
  if (bothDone && !taken) {
    return (
      <div className="panel">
        <p>{labels.waits}</p>
        <button
          className="cta"
          disabled={busy}
          onPointerUp={() => post("marronage")}
        >
          {labels.fallBack}
        </button>
      </div>
    );
  }

  // ── His own leg.
  return (
    <div className="panel">
      <div className="meta" style={{ color: "var(--gold-bright)" }}>
        {labels.legTitle}
      </div>

      {!dealt && !legDone && pending > 0 && (
        <p style={{ marginBottom: 0 }}>
          <button
            className={busy ? "cta sun pending" : "cta sun"}
            disabled={busy}
            onPointerUp={() => post("deal")}
          >
            {labels.muster}
          </button>
        </p>
      )}

      {!dealt && !legDone && pending === 0 && (
        <p style={{ marginBottom: 0 }}>
          {labels.quiet} ·{" "}
          <Link className="cta" href={dispatchHref}>
            {labels.inbox}
          </Link>
        </p>
      )}

      {dealt && !legDone && (
        <>
          <div className="row">
            <span className="sundot" /> {score} / {budget} {labels.runners}
          </div>
          <p>
            <Link className="cta" href={dispatchHref}>
              {labels.inbox}
            </Link>
          </p>
          <label className="label" htmlFor="tip">
            {labels.tipPrompt}
          </label>
          <textarea
            id="tip"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            rows={2}
            style={{ width: "100%", marginTop: 6 }}
          />
          <p style={{ marginBottom: 0 }}>
            <button
              className="cta sun"
              disabled={busy || !tip.trim()}
              onPointerUp={() => post("pass", { tip })}
            >
              {labels.pass}
            </button>
          </p>
        </>
      )}

      {legDone && !bothDone && <p className="goldband">{labels.hold}</p>}
    </div>
  );
}

```


---

## web/src/app/play/[boy]/mon/page.tsx

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Flip from "@/components/Flip";
import MonClient from "./MonClient";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";
import { KANPAY } from "@/data/kanpay";
import { positionState } from "@/lib/engine/konbit";

export const dynamic = "force-dynamic";

/** Chapter → its painted battle moment (mirrors the front page). */
const CH_ART: Record<number, string> = {
  1: "/art/ch1-burning-plain.webp",
  4: "/art/ch4-ravine.webp",
  5: "/art/ch5-crete.webp",
  6: "/art/ch6-arcahaie-flag.webp",
  7: "/art/ch7-vertieres.webp",
  8: "/art/ch8-citadelle.webp",
};

/** The battle — HOLD/TAKE THE POSITION (09-game-mechanics.md §4). One leg
 *  each, combined by positionState; the collective status only — no
 *  per-brother number is comparable on this shared surface (co-op law). */
export default async function MonPage({
  params,
}: {
  params: Promise<{ boy: string }>;
}) {
  const { boy } = await params;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") notFound();

  const { unit, certified, konbit } = state;
  const c = (key: string) => chrome(key, unit, certified);
  const leg = konbit.mon.legs[boy];
  if (!leg) notFound();
  const brotherId = boy === "leo" ? "isaac" : "leo";
  const brotherLeg = konbit.mon.legs[brotherId];
  const ps = positionState(konbit);
  const chapter = KANPAY.find((ch) => ch.unit === unit) ?? KANPAY[0];
  const pending = state.dispatches.filter(
    (d) => d.receiver === boy && d.status !== "acted",
  ).length;

  return (
    <main className="stage">
      <header className="head">
        <div>
          <div className="kicker">
            {chapter.n}. {chapter.nameEn} · {chapter.year}
          </div>
          <h1 className="d1 gold">
            <Flip view={c("mon")} />
          </h1>
        </div>
        <div className="meta" style={{ textAlign: "right", maxWidth: 220 }}>
          <Flip view={c("vs_mountain")} />
        </div>
      </header>

      <section className="hero banner" style={{ marginBottom: 22 }}>
        <img src={CH_ART[unit] ?? "/art/map-haiti.webp"} alt="" />
        <div className="veil" />
        <div className="cap">
          <div className="meta" style={{ color: "var(--gold-bright)" }}>
            {chapter.year} · chapit {chapter.n}
          </div>
          <h2 className="d2">{chapter.nameEn}</h2>
        </div>
      </section>

      <div className="scrim" style={{ marginBottom: 18 }}>
        <p style={{ margin: 0, color: "#e7dcc2" }}>
          <Flip view={c("nobodyloses")} />
        </p>
      </div>

      <MonClient
        boy={boy}
        dispatchHref={`/play/${boy}/dispatch`}
        dealt={leg.budget > 0}
        legDone={leg.done}
        score={leg.score}
        budget={leg.budget}
        brotherDone={brotherLeg?.done ?? false}
        bothDone={ps.allLegsDone}
        taken={konbit.mon.taken}
        pending={pending}
        labels={{
          legTitle: c("step_mon").text,
          muster: c("muster").text,
          runners: c("runners_through").text,
          inbox: c("dispatch_inbox").text,
          quiet: c("wire_quiet").text,
          tipPrompt: c("tip_prompt").text,
          pass: c("pass_rope").text,
          hold: c("holding").text,
          waits: c("waits").text,
          fallBack: c("fall_back").text,
          held: c("summit_stamp").text,
          heldBody: c("summit_body").text,
        }}
      />

      <nav className="index label" style={{ marginTop: 26 }}>
        <Link href={`/play/${boy}`}>
          <Flip view={c("dash")} />
        </Link>
        <Link href={`/play/${boy}/dispatch`}>
          <Flip view={c("prod")} />
        </Link>
      </nav>
    </main>
  );
}

```


---

## web/src/app/play/[boy]/page.tsx

```tsx
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Flip from "@/components/Flip";
import CampaignMap from "@/components/CampaignMap";
import { chrome, chromeUnitTitle } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";
import { KANPAY } from "@/data/kanpay";
import scopeData from "@/data/scope.json";
import { kleSolid, dueItems, mastery } from "@/lib/engine/srs";
import type { ScopeItem } from "@/lib/engine/types";

const SCOPE = (scopeData as { items: ScopeItem[] }).items;

/** Chapter → its painted moment (Nano Banana). Units without a scene fall
 *  back to the painted land of Haiti. */
const CH_ART: Record<number, string> = {
  1: "/art/ch1-burning-plain.webp",
  2: "/art/map-haiti.webp",
  3: "/art/map-haiti.webp",
  4: "/art/ch4-ravine.webp",
  5: "/art/ch5-crete.webp",
  6: "/art/ch6-arcahaie-flag.webp",
  7: "/art/ch7-vertieres.webp",
  8: "/art/ch8-citadelle.webp",
};

export const dynamic = "force-dynamic";

/** The front page — Drapo Ginen. The chapter's painted moment leads; the
 *  real geography of Saint-Domingue below; today's session in fer-découpé
 *  panels. No number is comparable across brothers on a shared surface. */
export default async function FrontPage({
  params,
}: {
  params: Promise<{ boy: string }>;
}) {
  const { boy } = await params;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") notFound();
  // First run: punch the ticket before the front page (onboarding, 09 §9).
  if (!p.diagDone) redirect(`/play/${boy}/ticket`);

  const { unit, certified, day, konbit } = state;
  const c = (key: string) => chrome(key, unit, certified);
  const kle = kleSolid(p, SCOPE);
  const due = dueItems(p, SCOPE, unit, day).length;
  // Sak mo — the armory: words collected (recognition-solid) vs battle-ready
  // (production-solid). The rec/prod lag reads as a kit filling, not a deficit.
  const inScope = SCOPE.filter((i) => i.u <= unit || i.kle);
  const collected = inScope.filter((i) => mastery(p, i.id, "rec") === "solid").length;
  const ready = inScope.filter((i) => mastery(p, i.id, "prod") === "solid").length;
  const chapter = KANPAY.find((ch) => ch.unit === unit) ?? KANPAY[0];
  const pending = state.dispatches.filter(
    (d) => d.receiver === boy && d.status !== "acted",
  ).length;

  return (
    <main className="stage">
      <header className="head">
        <div>
          <div className="kicker">
            <Flip view={c("unit_label")} /> {unit} ·{" "}
            <Flip view={chromeUnitTitle(unit, unit, certified)} />
          </div>
          <h1 className="d1 gold">
            <Flip view={c("dash")} />
          </h1>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="label">
            <Flip view={c("streak")} />
          </div>
          <div className="d2">{p.streak}</div>
        </div>
      </header>

      {/* the chapter's painted moment */}
      <section className="hero banner" style={{ marginBottom: 26 }}>
        <img src={CH_ART[unit] ?? "/art/map-haiti.webp"} alt="" />
        <div className="veil" />
        <div className="cap">
          <div className="meta" style={{ color: "var(--gold-bright)" }}>
            {chapter.year} · chapit {chapter.n}
          </div>
          <h2 className="d2">{chapter.nameEn}</h2>
        </div>
      </section>

      <div className="two">
        <div>
          {/* chapter cleared — the milestone + anthem slot (09 §7) */}
          {konbit.mon.taken && (
            <div className="goldband ignite" style={{ marginBottom: 20 }}>
              <div className="d3" style={{ color: "var(--night)" }}>
                <Flip view={c("cleared_stamp")} />
              </div>
              <p style={{ margin: "6px 0 0", color: "var(--night)", fontWeight: 400 }}>{chapter.milestoneFactEn}</p>
              <p style={{ margin: "8px 0 0", color: "var(--night)", fontStyle: "italic", fontWeight: 400 }}>
                <Flip view={c("anthem_coming")} />
              </p>
            </div>
          )}

          {/* today's session — the lead */}
          <div className="panel">
            <div className="meta" style={{ color: "var(--gold-bright)" }}>
              <Flip view={c("today")} />
            </div>
            <div className="row">
              <span className="sundot" />
              <Link href={`/play/${boy}/scene`}><Flip view={c("scene_step")} /></Link>
            </div>
            <div className="row">
              <span className="sundot" />
              <Link href={`/play/${boy}/vok`}><Flip view={c("vok_step")} /></Link>
            </div>
            <div className="row">
              <span className="sundot" />
              <div>
                <Link href={`/play/${boy}/feed`}><Flip view={c("fil")} /></Link> — {due}{" "}
                <Flip view={c("words_back")} />
              </div>
            </div>
            <div className="row">
              <span className="sundot" />
              <Link href={`/play/${boy}/grammar`}><Flip view={c("step_fokis")} /></Link>
            </div>
            <div className="row">
              <Flip view={c("prod")} /> ·{" "}
              <Link href={`/play/${boy}/dispatch`}><Flip view={c("dispatch_new")} /></Link>
              {pending > 0 && (
                <>
                  {" "}· <span className="label" style={{ color: "var(--scarlet)" }}>
                    <Flip view={c("dispatch_inbox")} /> {pending}
                  </span>
                </>
              )}
            </div>
            <div className="row">
              <Link href={`/play/${boy}/mon`}><Flip view={c("step_mon")} /></Link>
            </div>
            <p style={{ marginBottom: 0 }}>
              <Link className="cta" href={`/play/${boy}/vok`}><Flip view={c("start")} /></Link>
            </p>
          </div>

          {/* the real geography */}
          <div style={{ marginTop: 26 }}>
            <div className="label" style={{ marginBottom: 8 }}>
              Saint-Domingue · where the battles happened
            </div>
            <div className="panel" style={{ padding: 8 }}>
              <CampaignMap currentUnit={unit} />
            </div>
          </div>
        </div>

        <aside>
          {/* Kle 77 — the honest individual goal */}
          <div className="panel">
            <div className="label"><Flip view={c("kle77")} /> · {kle} / 77</div>
            <div className="ruler" aria-label={`${kle} of 77`}>
              {Array.from({ length: 77 }, (_, i) => (
                <i key={i} className={i < kle ? "solid" : undefined} />
              ))}
            </div>
          </div>

          {/* Sak mo — the armory: collected vs battle-ready */}
          <div className="panel" style={{ marginTop: 18 }}>
            <div className="label"><Flip view={c("sak_mo")} /></div>
            <div className="row" style={{ justifyContent: "space-between", marginTop: 6 }}>
              <span><span className="d3">{collected}</span> <span className="meta"><Flip view={c("sak_collected")} /></span></span>
              <span><span className="d3" style={{ color: "var(--gold-bright)" }}>{ready}</span> <span className="meta"><Flip view={c("sak_ready")} /></span></span>
            </div>
          </div>

          {/* konbit — the two of you, one load (« Men anpil, chay pa lou ») */}
          <div className="goldband" style={{ marginTop: 18 }}>
            <Flip view={c("standings")} /> · {konbit.streak} <Flip view={c("days")} />
          </div>
          <div className="panel" style={{ marginTop: 0 }}>
            <table className="plain">
              <tbody>
                {(["leo", "isaac"] as const).map((id) => (
                  <tr key={id}>
                    <td><span className={`liy ${id}`}>{state.profiles[id].name[0]}</span></td>
                    <td>{state.profiles[id].name}</td>
                    <td className="meta">{kleSolid(state.profiles[id], SCOPE)}/77</td>
                    <td className="meta">★ {konbit.stars}/10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="scrim" style={{ marginTop: 18 }}>
            <p style={{ margin: 0, color: "#e7dcc2" }}>{chapter.milestoneFactEn}</p>
          </div>
        </aside>
      </div>

      <nav className="index label">
        <Link href={`/play/${boy}/dispatch`}><Flip view={c("prod")} /></Link>
        <span style={{ opacity: 0.38 }} title="coming soon"><Flip view={c("misyon")} /> · soon</span>
        <span style={{ opacity: 0.38 }} title="coming soon"><Flip view={c("ladder")} /> · soon</span>
        <Link href={`/play/${boy}/settings`}><Flip view={c("settings")} /></Link>
      </nav>
    </main>
  );
}

```


---

## web/src/app/play/[boy]/scene/SceneClient.tsx

```tsx
"use client";
import { useState } from "react";
import Link from "next/link";

interface History {
  factEn: string;
  question: string;
  options: string[];
  answer: number;
  bonusRoute: string;
}

/** The scene player: narration reveals a beat at a time, then a choice, then
 *  the history-as-bonus route (a wrong answer is never punished — history is a
 *  flank, not a gate), then the comic enemy intercept, then the hand-off into
 *  the dispatch. History writes NO ledger — it colors the story only. */
export default function SceneClient({
  narration,
  choices,
  history,
  enemyBeat,
  dispatchHref,
}: {
  narration: string[];
  choices: string[];
  history: History | null;
  enemyBeat: string | null;
  dispatchHref: string;
}) {
  const [line, setLine] = useState(0);
  const [chose, setChose] = useState(choices.length === 0);
  const [hist, setHist] = useState<null | boolean>(history ? null : true);

  const shown = narration.slice(0, line + 1);
  const narrationDone = line >= narration.length - 1;

  return (
    <div className="panel">
      {shown.map((l, i) => (
        <p key={i} className="cardin" style={{ fontSize: 18, lineHeight: 1.6 }}>{l}</p>
      ))}

      {!narrationDone ? (
        <button className="cta sun" onPointerUp={() => setLine((n) => n + 1)}>
          Go on →
        </button>
      ) : !chose ? (
        <div>
          {choices.map((label, i) => (
            <p key={i} style={{ marginBottom: 8 }}>
              <button className="cta" onPointerUp={() => setChose(true)}>{label}</button>
            </p>
          ))}
        </div>
      ) : history && hist === null ? (
        <div className="scrim cardin">
          <p style={{ marginTop: 0 }}>{history.question}</p>
          {history.options.map((o, i) => (
            <p key={i} style={{ marginBottom: 8 }}>
              <button className="cta" onPointerUp={() => setHist(i === history.answer)}>{o}</button>
            </p>
          ))}
        </div>
      ) : (
        <div className="cardin">
          {history && hist !== null && (
            <p className="scrim" style={{ display: "block" }}>
              {hist ? history.bonusRoute : "He shrugs — no matter. The word still moves; you take the long way round."}
            </p>
          )}
          {enemyBeat && (
            <p className="label" style={{ color: "var(--gold-bright)", fontStyle: "italic", marginTop: 12 }}>
              {enemyBeat}
            </p>
          )}
          <p style={{ marginTop: 16, marginBottom: 0 }}>
            <Link className="cta sun" href={dispatchHref}>Send the dispatch →</Link>
          </p>
        </div>
      )}
    </div>
  );
}

```


---

## web/src/app/play/[boy]/scene/page.tsx

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Flip from "@/components/Flip";
import SceneClient from "./SceneClient";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";
import { KANPAY } from "@/data/kanpay";

export const dynamic = "force-dynamic";

const CH_ART: Record<number, string> = {
  1: "/art/ch1-burning-plain.webp",
  4: "/art/ch4-ravine.webp",
  5: "/art/ch5-crete.webp",
  6: "/art/ch6-arcahaie-flag.webp",
  7: "/art/ch7-vertieres.webp",
  8: "/art/ch8-citadelle.webp",
};

/** The scene surface (build-plan issue 7) — the chapter's authored narrative,
 *  the "enemy can't read the code" thesis, the history-as-bonus route, and the
 *  hand-off into the dispatch. English narration is comprehension scaffolding;
 *  embedded Kreyòl scene lines stay gated until Manman (htLines are null). */
export default async function ScenePage({
  params,
}: {
  params: Promise<{ boy: string }>;
}) {
  const { boy } = await params;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") notFound();

  const { unit, certified } = state;
  const c = (key: string) => chrome(key, unit, certified);
  const chapter = KANPAY.find((ch) => ch.unit === unit) ?? KANPAY[0];
  const scene = chapter.scenes[0];

  return (
    <main className="stage">
      <header className="head">
        <div>
          <div className="kicker">{chapter.n}. {chapter.nameEn} · {chapter.year}</div>
          <h1 className="d1 gold">{chapter.nameEn}</h1>
        </div>
      </header>

      <section className="hero banner" style={{ marginBottom: 22 }}>
        <img src={CH_ART[unit] ?? "/art/map-haiti.webp"} alt="" />
        <div className="veil" />
        <div className="cap">
          <div className="oral" style={{ borderLeft: "none", padding: 0 }}>
            the wire the enemy cannot read
          </div>
        </div>
      </section>

      {scene ? (
        <SceneClient
          narration={scene.narrationEn}
          choices={scene.choices.map((ch) => ch.label)}
          history={scene.historyCheck ?? null}
          enemyBeat={chapter.enemyIntelBeats[0] ?? null}
          dispatchHref={`/play/${boy}/dispatch`}
        />
      ) : (
        <div className="scrim">
          <p style={{ marginTop: 0, color: "#e7dcc2" }}>{chapter.milestoneFactEn}</p>
          <p style={{ marginBottom: 0 }}>
            High command is still writing this chapter&apos;s scene. Stock your words while you wait.{" "}
            <Link className="cta" href={`/play/${boy}/vok`}><Flip view={c("vok_step")} /></Link>
          </p>
        </div>
      )}

      <nav className="index label" style={{ marginTop: 26 }}>
        <Link href={`/play/${boy}`}><Flip view={c("dash")} /></Link>
      </nav>
    </main>
  );
}

```


---

## web/src/app/play/[boy]/settings/SettingsClient.tsx

```tsx
"use client";
import { useState } from "react";

interface Labels {
  pwo: string;
  pwoSub: string;
  on: string;
  off: string;
  exportTitle: string;
  exportSub: string;
  exportBtn: string;
  leave: string;
}

/** Settings island: Pro mode toggle, the family export, and Leave. All chrome
 *  passed in as plain strings — zero Kreyòl literals. */
export default function SettingsClient({
  boy,
  pwoMode,
  labels,
}: {
  boy: string;
  pwoMode: boolean;
  labels: Labels;
}) {
  const [pwo, setPwo] = useState(pwoMode);
  const [busy, setBusy] = useState(false);

  const togglePwo = async () => {
    const next = !pwo;
    setPwo(next); // optimistic
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boy, pwoMode: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setPwo(!next); // roll back — the toggle never lies about the saved value
    }
  };

  const leave = async () => {
    setBusy(true);
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <div>
      <div className="panel">
        <div className="row" style={{ alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div className="d3">{labels.pwo}</div>
            <div className="label" style={{ marginTop: 4 }}>{labels.pwoSub}</div>
          </div>
          <button
            className={pwo ? "cta sun" : "cta"}
            onPointerUp={togglePwo}
            aria-pressed={pwo}
          >
            {pwo ? labels.on : labels.off}
          </button>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <div className="d3">{labels.exportTitle}</div>
        <div className="label" style={{ marginTop: 4 }}>{labels.exportSub}</div>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          <a className="cta" href="/api/export">{labels.exportBtn}</a>
        </p>
      </div>

      <p style={{ marginTop: 24 }}>
        <button className="cta" disabled={busy} onPointerUp={leave}>
          {labels.leave}
        </button>
      </p>
    </div>
  );
}

```


---

## web/src/app/play/[boy]/settings/page.tsx

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Flip from "@/components/Flip";
import SettingsClient from "./SettingsClient";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";

export const dynamic = "force-dynamic";

/** Settings — Pro mode, the family export, and leaving the network. English
 *  chrome; no game numbers comparable across brothers here. */
export default async function SettingsPage({
  params,
}: {
  params: Promise<{ boy: string }>;
}) {
  const { boy } = await params;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") notFound();

  const { unit, certified } = state;
  const c = (key: string) => chrome(key, unit, certified);

  return (
    <main className="stage">
      <header className="head">
        <div>
          <h1 className="d1 gold">
            <Flip view={c("settings")} />
          </h1>
        </div>
      </header>

      <SettingsClient
        boy={boy}
        pwoMode={p.pwoMode}
        labels={{
          pwo: c("set_pwo").text,
          pwoSub: c("set_pwo_sub").text,
          on: c("set_on").text,
          off: c("set_off").text,
          exportTitle: c("set_export").text,
          exportSub: c("set_export_sub").text,
          exportBtn: c("set_export_btn").text,
          leave: c("set_leave").text,
        }}
      />

      <nav className="index label" style={{ marginTop: 26 }}>
        <Link href={`/play/${boy}`}>
          <Flip view={c("dash")} />
        </Link>
      </nav>
    </main>
  );
}

```


---

## web/src/app/play/[boy]/ticket/TicketClient.tsx

```tsx
"use client";
import { useState } from "react";
import HoldToRecord from "@/components/HoldToRecord";

interface Labels {
  aural: string;
  read: string;
  coming: string;
  describe: string;
  finish: string;
  track: string;
  words: string;
  done: string;
  hold: string;
  denied: string[];
}

/** The ticket probes (issue 4). Aural + read-aloud need Kreyòl reference
 *  content, so they honestly show "coming" until Manman's pass; the
 *  describe-the-camp production probe records now and stores for the Cipher
 *  Office to score by ear (never machine-judged). Finishing sizes a
 *  provisional track and puts the boy on the wire. All chrome passed in as
 *  plain strings — zero Kreyòl literals here. */
export default function TicketClient({
  boy,
  provisionalWords,
  art,
  labels,
}: {
  boy: string;
  provisionalWords: number;
  art: string;
  labels: Labels;
}) {
  const [recorded, setRecorded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);

  const upload = async (blob: Blob) => {
    const form = new FormData();
    form.append("audio", blob, "ticket.webm");
    form.append("boy", boy);
    form.append("slot", "describe");
    await fetch("/api/ticket", { method: "POST", body: form });
    setRecorded(true);
  };

  const finish = async () => {
    setBusy(true);
    setErr(false);
    try {
      const res = await fetch("/api/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "finish", boy }),
      });
      const data = res.ok ? await res.json() : { ok: false };
      if (data.ok) {
        window.location.href = data.href;
        return;
      }
      throw new Error();
    } catch {
      setErr(true); // never leave the on-ramp a dead button with no signal
      setBusy(false);
    }
  };

  return (
    <div>
      {/* (a) aural recognition — reference audio pending */}
      <div className="panel">
        <div className="meta" style={{ color: "var(--gold-bright)" }}>
          {labels.aural}
        </div>
        <p style={{ marginBottom: 0 }}>{labels.coming}</p>
      </div>

      {/* (b) read-aloud decode — Kreyòl phrases pending the Cipher Office */}
      <div className="panel" style={{ marginTop: 16 }}>
        <div className="meta" style={{ color: "var(--gold-bright)" }}>
          {labels.read}
        </div>
        <p style={{ marginBottom: 0 }}>{labels.coming}</p>
      </div>

      {/* (c) describe the camp — production probe, runs now */}
      <div className="panel" style={{ marginTop: 16 }}>
        <div className="meta" style={{ color: "var(--gold-bright)" }}>
          {labels.describe}
        </div>
        <section className="hero banner" style={{ margin: "12px 0" }}>
          <img src={art} alt="" />
          <div className="veil" />
        </section>
        {recorded ? (
          <p className="goldband">✓</p>
        ) : (
          <HoldToRecord
            labels={{ idle: labels.hold, denied: labels.denied }}
            onRecorded={upload}
          />
        )}
      </div>

      <div className="goldband" style={{ marginTop: 20 }}>
        {labels.track} · ~{provisionalWords} {labels.words}
      </div>

      <p style={{ marginTop: 16 }}>
        <button className={busy ? "cta sun pending" : "cta sun"} disabled={busy} onPointerUp={finish}>
          {labels.finish}
        </button>
      </p>
      {err && (
        <p className="label" style={{ color: "var(--scarlet)" }}>
          almost — that didn&apos;t go through. Tap it again in a sec.
        </p>
      )}
    </div>
  );
}

```


---

## web/src/app/play/[boy]/ticket/page.tsx

```tsx
import { notFound, redirect } from "next/navigation";
import Flip from "@/components/Flip";
import TicketClient from "./TicketClient";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";

export const dynamic = "force-dynamic";

/** Provisional track size until the Cipher Office scores the intake. Kept in
 *  sync with /api/ticket (Moderate default). Shown as a word count, never an
 *  adjective (issue 4 AC / copy law — no "band"). */
const PROVISIONAL_WORDS = 450;

/** The ticket — the Cipher Office intake (build-plan issue 4; onboarding
 *  09 §9). English chrome throughout. The aural + read-aloud probes render
 *  Kreyòl, so they honestly show "coming" until Manman's content; the
 *  describe-the-camp production probe runs now (recorded, never machine-
 *  judged). */
export default async function TicketPage({
  params,
}: {
  params: Promise<{ boy: string }>;
}) {
  const { boy } = await params;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") notFound();
  if (p.diagDone) redirect(`/play/${boy}`);

  const { unit, certified } = state;
  const c = (key: string) => chrome(key, unit, certified);

  return (
    <main className="stage">
      <header className="head">
        <div>
          <div className="kicker">a laissez-passer · to join the network</div>
          <h1 className="d1 gold">
            <Flip view={c("tk_title")} />
          </h1>
        </div>
        <div className="meta" style={{ textAlign: "right", maxWidth: 220 }}>
          Saint-Domingue · 1791
        </div>
      </header>

      <div className="scrim" style={{ marginBottom: 20 }}>
        <p style={{ margin: 0, color: "#e7dcc2" }}>
          <Flip view={c("tk_intro")} />
        </p>
      </div>

      <TicketClient
        boy={boy}
        provisionalWords={PROVISIONAL_WORDS}
        art="/art/prologue-passage.webp"
        labels={{
          aural: c("tk_aural").text,
          read: c("tk_read").text,
          coming: c("tk_coming").text,
          describe: c("tk_describe").text,
          finish: c("tk_finish").text,
          track: c("tk_track").text,
          words: c("tk_words").text,
          done: c("tk_done").text,
          hold: c("hold_button").text,
          denied: [
            c("mic_step1").text,
            c("mic_step2").text,
            c("mic_step3").text,
          ],
        }}
      />
    </main>
  );
}

```


---

## web/src/app/play/[boy]/vok/VokClient.tsx

```tsx
"use client";
import { useCallback, useEffect, useState } from "react";
import HoldToRecord from "@/components/HoldToRecord";

type Kind = "entwodiksyon" | "rekonet" | "tape" | "kloz" | "bati";
interface Card {
  id: string; // the Kreyòl form (also the answer for tape — v1, see session route)
  en: string;
  kind: Kind;
}
interface Labels {
  meet: string;
  reveal: string;
  knew: string;
  missed: string;
  typePrompt: string;
  check: string;
  hint: string;
  close: string;
  next: string;
  say: string;
  sayDone: string;
  done: string;
  empty: string;
  hold: string;
  denied: string[];
}

/** The VOKABILE drill (09 §13). One card at a time. Recognition self-marks
 *  write the rec ledger; typed production (cold) writes prod; Di li records
 *  the boy saying it aloud (stored, never machine-judged). All chrome passed
 *  in as plain strings — zero Kreyòl literals; the Kreyòl shown is card data. */
export default function VokClient({ boy, labels }: { boy: string; labels: Labels }) {
  const [cards, setCards] = useState<Card[] | null>(null);
  const [i, setI] = useState(0);

  // per-card transient state
  const [revealed, setRevealed] = useState(false);
  const [typed, setTyped] = useState("");
  const [hinted, setHinted] = useState(false);
  const [result, setResult] = useState<null | "correct" | "close" | "miss">(null);
  const [said, setSaid] = useState(false);
  const [recording, setRecording] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const buzz = (ms: number) => {
    try {
      navigator.vibrate?.(ms);
    } catch {
      /* not supported — no-op */
    }
  };

  useEffect(() => {
    fetch(`/api/vok/session?for=${boy}`)
      .then((r) => r.json())
      .then((d) => setCards(d.ok ? d.cards : []));
  }, [boy]);

  const resetCard = useCallback(() => {
    setRevealed(false);
    setTyped("");
    setHinted(false);
    setResult(null);
    setSaid(false);
    setRecording(false);
  }, []);

  const next = () => {
    resetCard();
    setI((n) => n + 1);
  };

  const rec = async (ok: boolean) => {
    const card = cards![i];
    if (ok) buzz(16);
    fetch("/api/vok/rec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boy, id: card.id, ok }),
    }).catch(() => {});
    next();
  };

  const submitType = async () => {
    const card = cards![i];
    let d: { correct?: boolean; close?: boolean } = {};
    try {
      const res = await fetch("/api/vok/type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boy, id: card.id, answer: typed, rung: hinted ? "hint" : "cold" }),
      });
      if (res.ok) d = await res.json();
    } catch {
      /* dropped — treat as a retryable near-miss, never a false credit */
      d = { close: true };
    }
    if (d.correct) buzz(22);
    else setShakeKey((k) => k + 1);
    setResult(d.correct ? "correct" : d.close ? "close" : "miss");
  };

  const say = async (blob: Blob) => {
    const card = cards![i];
    const form = new FormData();
    form.append("audio", blob, "say.webm");
    form.append("boy", boy);
    form.append("id", card.id);
    await fetch("/api/vok/say", { method: "POST", body: form });
    setSaid(true);
    setRecording(false);
  };

  if (cards === null)
    return (
      <div className="panel" aria-busy="true">
        <div className="skel" style={{ height: 12, width: "28%", marginBottom: 18 }} />
        <div className="skel" style={{ height: 34, width: "62%", marginBottom: 14 }} />
        <div className="skel" style={{ height: 18, width: "84%" }} />
      </div>
    );
  if (cards.length === 0)
    return (
      <div className="scrim">
        <p style={{ marginTop: 0, color: "#e7dcc2" }}>{labels.empty}</p>
        <p style={{ marginBottom: 0 }}>
          <a className="cta" href={`/play/${boy}/feed`}>Read the wire →</a>
        </p>
      </div>
    );
  if (i >= cards.length)
    return (
      <div className="panel">
        <div className="goldband">{labels.done}</div>
      </div>
    );

  const card = cards[i];

  // The Di li verbal strand — available on every card, never required.
  const diLi = (
    <div style={{ marginTop: 14, borderTop: "1px solid var(--hair)", paddingTop: 12 }}>
      {said ? (
        <span className="goldband">{labels.sayDone} ✓</span>
      ) : recording ? (
        <HoldToRecord labels={{ idle: labels.hold, denied: labels.denied }} onRecorded={say} review />
      ) : (
        <button className="cta" onPointerUp={() => setRecording(true)}>
          {labels.say}
        </button>
      )}
    </div>
  );

  return (
    <div className="panel cardin" key={i}>
      <div className="label">{i + 1} / {cards.length}</div>

      {card.kind === "entwodiksyon" && (
        <>
          <div className="label" style={{ color: "var(--gold-bright)" }}>{labels.meet}</div>
          <p className="kreyol-body" style={{ fontSize: 30, margin: "10px 0" }}>{card.id}</p>
          <p style={{ color: "#c9bfa6", marginTop: 0 }}>{card.en}</p>
          {diLi}
          <p style={{ marginTop: 16, marginBottom: 0 }}>
            <button className="cta sun" onPointerUp={() => rec(true)}>{labels.next}</button>
          </p>
        </>
      )}

      {card.kind === "rekonet" && (
        <>
          <p className="kreyol-body" style={{ fontSize: 30, margin: "10px 0" }}>{card.id}</p>
          {!revealed ? (
            <button className="cta" onPointerUp={() => setRevealed(true)}>{labels.reveal}</button>
          ) : (
            <>
              <p style={{ color: "#c9bfa6" }}>{card.en}</p>
              {diLi}
              <p style={{ marginTop: 16, marginBottom: 0, display: "flex", gap: 10 }}>
                <button className="cta sun" onPointerUp={() => rec(true)}>{labels.knew}</button>
                <button className="cta" onPointerUp={() => rec(false)}>{labels.missed}</button>
              </p>
            </>
          )}
        </>
      )}

      {card.kind === "tape" && (
        <>
          <div className="label" style={{ color: "var(--gold-bright)" }}>{labels.typePrompt}</div>
          <p style={{ fontSize: 22, margin: "8px 0" }}>{card.en}</p>
          {result === "correct" ? (
            <>
              <div className="goldband ignite">{card.id} <span className="checkin">✓</span></div>
              {diLi}
              <p style={{ marginTop: 16, marginBottom: 0 }}>
                <button className="cta sun" onPointerUp={next}>{labels.next}</button>
              </p>
            </>
          ) : result === "miss" ? (
            <>
              <p className="kreyol-body">{card.id}</p>
              {diLi}
              <p style={{ marginTop: 16, marginBottom: 0 }}>
                <button className="cta sun" onPointerUp={next}>{labels.next}</button>
              </p>
            </>
          ) : (
            <>
              <div key={shakeKey} className={result === "close" ? "softshake" : undefined}>
                <input
                  value={typed}
                  autoFocus
                  onChange={(e) => setTyped(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && typed.trim() && submitType()}
                  placeholder={hinted ? card.id[0] + "…" : undefined}
                  style={{ width: "100%", boxSizing: "border-box", fontSize: 20 }}
                />
              </div>
              {result === "close" && (
                <div className="label" style={{ color: "var(--scarlet)", marginTop: 6 }}>
                  {labels.close} — {card.id}
                </div>
              )}
              <p style={{ marginTop: 12, marginBottom: 0, display: "flex", gap: 10 }}>
                <button className="cta sun" disabled={!typed.trim()} onPointerUp={submitType}>
                  {labels.check}
                </button>
                {!hinted && (
                  <button className="cta" onPointerUp={() => setHinted(true)}>{labels.hint}</button>
                )}
              </p>
            </>
          )}
        </>
      )}

      {(card.kind === "kloz" || card.kind === "bati") && (
        <>
          <p className="kreyol-body" style={{ fontSize: 26, margin: "10px 0" }}>{card.id}</p>
          <p style={{ color: "#c9bfa6" }}>{card.en}</p>
          {diLi}
          <p style={{ marginTop: 16, marginBottom: 0 }}>
            <button className="cta sun" onPointerUp={() => rec(true)}>{labels.next}</button>
          </p>
        </>
      )}
    </div>
  );
}

```


---

## web/src/app/play/[boy]/vok/page.tsx

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import Flip from "@/components/Flip";
import VokClient from "./VokClient";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";

export const dynamic = "force-dynamic";

/** VOKABILE — the vocabulary drill, the daily meat (09 §13). Word-level cards
 *  (meet → recognize → type it back → say it aloud) over words that cleared
 *  the Cipher Office; message-building rungs arrive with certified frames. */
export default async function VokPage({
  params,
}: {
  params: Promise<{ boy: string }>;
}) {
  const { boy } = await params;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") notFound();
  const { unit, certified } = state;
  const c = (key: string) => chrome(key, unit, certified);

  return (
    <main className="stage">
      <header className="head">
        <div>
          <div className="kicker">the meat · stock your words</div>
          <h1 className="d1 gold">
            <Flip view={c("vok_title")} />
          </h1>
        </div>
      </header>

      <VokClient
        boy={boy}
        labels={{
          meet: c("vok_meet").text,
          reveal: c("vok_reveal").text,
          knew: c("vok_knew").text,
          missed: c("vok_missed").text,
          typePrompt: c("vok_type_prompt").text,
          check: c("vok_check").text,
          hint: c("vok_hint").text,
          close: c("vok_close").text,
          next: c("vok_next").text,
          say: c("vok_say").text,
          sayDone: c("vok_saydone").text,
          done: c("vok_done").text,
          empty: c("vok_empty").text,
          hold: c("hold_button").text,
          denied: [
            c("mic_step1").text,
            c("mic_step2").text,
            c("mic_step3").text,
          ],
        }}
      />

      <nav className="index label" style={{ marginTop: 26 }}>
        <Link href={`/play/${boy}`}>
          <Flip view={c("dash")} />
        </Link>
        <Link href={`/play/${boy}/feed`}>
          <Flip view={c("fil")} />
        </Link>
      </nav>
    </main>
  );
}

```


---

## web/src/components/AudioPlayer.tsx

```tsx
"use client";
import { useRef, useState } from "react";

/** A designed gold audio player — hearing your brother's voice (or the boys'
 *  recordings, in the Cipher Office) should feel like a tactile object, not a
 *  debug control. Wraps a hidden <audio>; play/pause is CSS-drawn (no emoji);
 *  the track fills gold and is scrubbable. Pointer events; touch-action:none
 *  on the track. */
export default function AudioPlayer({ src }: { src: string }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  const scrub = (e: React.PointerEvent<HTMLDivElement>) => {
    const a = audio.current;
    if (!a || !a.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * a.duration;
  };

  return (
    <div className="aplayer">
      <audio
        ref={audio}
        src={src}
        preload="none"
        onTimeUpdate={(e) => {
          const a = e.currentTarget;
          setProgress(a.duration ? a.currentTime / a.duration : 0);
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
      />
      <button className="aplay" onPointerUp={toggle} aria-label={playing ? "pause" : "play"}>
        <span className={playing ? "aicon pause" : "aicon play"} aria-hidden />
      </button>
      <div className="atrack" onPointerUp={scrub}>
        <div className="afill" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}

```


---

## web/src/components/CampaignMap.tsx

```tsx
"use client";
import { useEffect, useRef } from "react";

/** The real geography of Saint-Domingue — accurate coastline + the 8
 *  battles at their true coordinates, painted in the Drapo Ginen palette.
 *  (Owner: show the geography, not a generic mountain.) Ported from the
 *  mockup; colors are the Drapo tokens, hard-coded for render stability. */

const C = {
  kanvas: "#f2ecd9", bone: "#efe9d2", cornmeal: "#e8d9a0", umber: "#3a2a1c",
  night: "#120e0b", deepblue: "#16294d", seateal: "#17726b", deepsea: "#0c3b47",
  emerald: "#1e7a4d", ochre: "#c88a3a", oxblood: "#6e1414", iron: "#2a2622",
};
const SEA = [[19.6,-71.74],[19.67,-71.83],[19.7,-72.02],[19.77,-72.19],[19.85,-72.53],[19.95,-72.83],[19.9,-73.1],[19.83,-73.42],[19.68,-73.32],[19.65,-73.21],[19.63,-73.04],[19.45,-72.69],[19.25,-72.8],[19.1,-72.7],[18.95,-72.7],[18.77,-72.51],[18.73,-72.42],[18.57,-72.34],[18.51,-72.63],[18.43,-72.77],[18.45,-73.09],[18.53,-73.51],[18.48,-73.64],[18.57,-73.88],[18.65,-74.12],[18.4,-74.45],[18.06,-73.92],[18.19,-73.74],[18.15,-73.1],[18.18,-72.75],[18.22,-72.53],[18.23,-72.06],[18.03,-71.75]];
const BORDER = [[18.03,-71.75],[18.3,-71.76],[18.6,-71.72],[19,-71.78],[19.3,-71.7],[19.6,-71.74]];
const GONAVE = [[18.9,-73.28],[18.85,-72.93],[18.78,-72.99],[18.79,-73.2],[18.85,-73.38]];
const TORTUE = [[20.07,-72.98],[20.05,-72.65],[20,-72.68],[20.02,-72.95]];
const MSITES = [{n:1,lat:19.66,lng:-72.28},{n:2,lat:19.77,lng:-72.19},{n:3,lat:19.83,lng:-73.4},{n:4,lat:19.52,lng:-72.56},{n:5,lat:19.13,lng:-72.48},{n:6,lat:18.77,lng:-72.51},{n:7,lat:19.74,lng:-72.23},{n:8,lat:19.45,lng:-72.69}];
const MRANGES = [[19.55,-72.95,19.4,-71.95,9],[19.28,-72.52,19.08,-72.05,5],[18.92,-72.78,18.62,-72.3,6],[18.34,-72.55,18.29,-71.98,6],[18.4,-74.25,18.33,-73.68,5]];
const NPLAIN = [[19.72,-72.42],[19.8,-72.1],[19.62,-71.98],[19.5,-72.2],[19.55,-72.42]];

export default function CampaignMap({ currentUnit = 4 }: { currentUnit?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const s = ref.current;
    if (!s) return;
    const NS = "http://www.w3.org/2000/svg";
    while (s.firstChild) s.removeChild(s.firstChild);
    const W = 900, H = 640, PAD = 30, LNG0 = -74.7, LNG1 = -71.5, LAT0 = 20.15, LAT1 = 17.9;
    const X = (lo: number) => PAD + ((lo - LNG0) / (LNG1 - LNG0)) * (W - 2 * PAD);
    const Y = (la: number) => PAD + ((LAT0 - la) / (LAT0 - LAT1)) * (H - 2 * PAD);
    const P = (a: number[][]) => a.map(([la, lo]) => X(lo).toFixed(1) + "," + Y(la).toFixed(1)).join(" ");
    const E = (t: string, at: Record<string, string | number>, parent: Node = s) => {
      const e = document.createElementNS(NS, t);
      for (const k in at) e.setAttribute(k, String(at[k]));
      parent.appendChild(e);
      return e;
    };
    const d = E("defs", {});
    const gold = E("linearGradient", { id: "mgold", x1: 0, y1: 0, x2: 1, y2: 1 }, d);
    (["0 #6b4a12", "0.5 #d9a521", "1 #f4d66a"] as const).forEach((st) => {
      const [o, c] = st.split(" ");
      E("stop", { offset: o, "stop-color": c }, gold);
    });
    // sea
    const sea = E("linearGradient", { id: "msea", x1: 0, y1: 0, x2: 0, y2: 1 }, d);
    E("stop", { offset: 0, "stop-color": "#155a68" }, sea);
    E("stop", { offset: 1, "stop-color": C.seateal }, sea);
    E("rect", { x: 0, y: 0, width: W, height: H, fill: "url(#msea)" }, s);
    for (let i = 0; i < 7; i++) {
      const yy = 90 + i * 80;
      E("path", { d: `M0,${yy} q120,${8 - (i % 2) * 16} 240,0 t240,0 t240,0 t240,0`, fill: "none", stroke: C.deepsea, "stroke-width": 2, opacity: 0.35 }, s);
    }
    const land = SEA.concat(BORDER.slice(1, -1));
    E("polygon", { points: P(land), fill: "none", stroke: C.bone, "stroke-width": 7, opacity: 0.14, "stroke-linejoin": "round" }, s);
    const cp = E("clipPath", { id: "mland" }, d);
    E("polygon", { points: P(land) }, cp);
    E("polygon", { points: P(land), fill: C.emerald, stroke: C.umber, "stroke-width": 2, "stroke-linejoin": "round" }, s);
    const g = E("g", { "clip-path": "url(#mland)" }, s);
    E("rect", { x: 0, y: Y(19), width: W, height: H, fill: C.deepsea, opacity: 0.08 }, g);
    E("polygon", { points: P(NPLAIN), fill: C.ochre, opacity: 0.92 }, g);
    const mtn = (x: number, y: number, r: number) => {
      E("path", { d: `M${x - r},${y} Q${x - r * 0.5},${y - r * 1.5} ${x},${y - r * 1.7} Q${x + r * 0.5},${y - r * 1.5} ${x + r},${y} Z`, fill: C.deepsea, stroke: C.umber, "stroke-width": 1.2 }, g);
      E("path", { d: `M${x - r},${y} Q${x - r * 0.5},${y - r * 1.5} ${x},${y - r * 1.7} L${x},${y} Z`, fill: C.emerald, opacity: 0.55 }, g);
      E("path", { d: `M${x - r * 0.35},${y - r * 1.15} l${r * 0.35},${-r * 0.4} l${r * 0.35},${r * 0.4}`, fill: "none", stroke: C.bone, "stroke-width": 1.4, opacity: 0.7 }, g);
    };
    for (const rg of MRANGES) {
      const ax = X(rg[1]), ay = Y(rg[0]), bx = X(rg[3]), by = Y(rg[2]), cnt = rg[4];
      for (let i = 0; i <= cnt; i++) {
        const t = i / cnt, x = ax + (bx - ax) * t, y = ay + (by - ay) * t, r = 8 + ((i * 7) % 4);
        mtn(x, y + (i % 2 ? 3 : 0), r);
      }
    }
    [GONAVE, TORTUE].forEach((is) => E("polygon", { points: P(is), fill: C.emerald, stroke: C.umber, "stroke-width": 1.6 }, s));
    [[19.35, -72.95], [18.62, -72.9], [19.55, -73.6]].forEach(([la, lo]) => {
      const x = X(lo), y = Y(la);
      E("path", { d: `M${x - 9},${y} L${x + 9},${y} L${x + 5},${y + 6} L${x - 5},${y + 6} Z`, fill: C.bone }, s);
      E("path", { d: `M${x},${y} L${x},${y - 15} L${x + 9},${y} Z`, fill: C.kanvas }, s);
    });
    let rd = "M" + X(MSITES[0].lng) + "," + Y(MSITES[0].lat);
    for (let i = 1; i < MSITES.length; i++) rd += " L" + X(MSITES[i].lng) + "," + Y(MSITES[i].lat);
    E("path", { d: rd, fill: "none", stroke: C.night, "stroke-width": 4, opacity: 0.35, "stroke-linejoin": "round" }, s);
    E("path", { d: rd, fill: "none", stroke: "url(#mgold)", "stroke-width": 2.4, "stroke-dasharray": "7 6", "stroke-linejoin": "round" }, s);
    MSITES.forEach((m) => {
      const x = X(m.lng), y = Y(m.lat), cur = m.n === currentUnit, past = m.n < currentUnit;
      if (cur) E("circle", { cx: x, cy: y, r: 16, fill: "none", stroke: "url(#mgold)", "stroke-width": 2, opacity: 0.8 }, s);
      E("circle", { cx: x, cy: y, r: cur ? 12 : 9, fill: C.iron, stroke: cur ? "url(#mgold)" : C.umber, "stroke-width": cur ? 2.5 : 1.5 }, s);
      const t = E("text", { x, y: y + 4, "text-anchor": "middle", "font-family": "Archivo Black, sans-serif", "font-size": cur ? 14 : 11, fill: past ? "#8a7a5a" : C.cornmeal }, s);
      t.textContent = String(m.n);
    });
    const lbl = (la: number, lo: number, txt: string, dx: number, dy: number) => {
      const x = X(lo) + dx, y = Y(la) + dy, w = txt.length * 7 + 10;
      E("rect", { x: x - 4, y: y - 11, width: w, height: 16, fill: "rgba(9,7,5,.66)" }, s);
      const t = E("text", { x: x + 2, y: y + 1, "font-family": "IBM Plex Mono, monospace", "font-size": 11, fill: C.cornmeal, "letter-spacing": ".04em" }, s);
      t.textContent = txt;
    };
    lbl(19.77, -72.19, "LE CAP", 14, -6);
    lbl(19.83, -73.4, "MÔLE", -52, -4);
    lbl(19.45, -72.69, "GONAÏVES", -80, 4);
    lbl(18.57, -72.34, "PORT-AU-PRINCE", -4, 22);
    const cx = W - 58, cy = 64;
    E("line", { x1: cx, y1: cy - 18, x2: cx, y2: cy + 18, stroke: C.cornmeal, "stroke-width": 1 }, s);
    E("line", { x1: cx - 18, y1: cy, x2: cx + 18, y2: cy, stroke: C.cornmeal, "stroke-width": 1 }, s);
    E("polygon", { points: `${cx},${cy - 22} ${cx + 4},${cy} ${cx},${cy + 5} ${cx - 4},${cy}`, fill: "url(#mgold)" }, s);
    const nt = E("text", { x: cx, y: cy - 26, "text-anchor": "middle", "font-family": "Archivo Black, sans-serif", "font-size": 12, fill: C.cornmeal }, s);
    nt.textContent = "N";
  }, [currentUnit]);

  return <svg ref={ref} className="svgwrap" viewBox="0 0 900 640" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", aspectRatio: "900 / 640", display: "block" }} aria-label="Saint-Domingue — the campaign" />;
}

```


---

## web/src/components/Flip.tsx

```tsx
"use client";
import { useRef, useState } from "react";
import type { ChromeView } from "@/lib/engine/gate";

/** Renders one resolved chrome string. When the text is Kreyòl it carries
 *  data-en and the long-press escape hatch (language law §1.6). Pointer
 *  events only (house rules). */
export default function Flip({ view }: { view: ChromeView }) {
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!view.kreyol) return <>{view.text}</>;

  const start = (e: React.PointerEvent) => {
    const { clientX, clientY } = e;
    timer.current = setTimeout(
      () => setTip({ x: clientX, y: clientY + 20 }),
      450,
    );
  };
  const end = () => {
    if (timer.current) clearTimeout(timer.current);
    setTip(null);
  };

  return (
    <>
      <span
        className={view.isNew ? "flip flipnew" : "flip"}
        data-en={view.en}
        onPointerDown={start}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
      >
        {view.text}
      </span>
      {tip && (
        <span className="tooltip" style={{ left: tip.x, top: tip.y }}>
          {view.en}
        </span>
      )}
    </>
  );
}

```


---

## web/src/components/HoldToRecord.tsx

```tsx
"use client";
import { useRef, useState } from "react";
import AudioPlayer from "./AudioPlayer";

/** Hold-to-record — pointer events only, touch-action:none (house rules;
 *  05 §11 phone ergonomics). Recording state = solid red field + a live level
 *  meter. Slide off or pointercancel = cancel.
 *  NO MACHINE JUDGMENT: this component records and uploads; nothing here or
 *  downstream evaluates the audio (voice law 3).
 *  `review` = hear-it-back before sending: on release, the boy plays his take
 *  and chooses Send or Record again — the app's most vulnerable moment. */
export default function HoldToRecord({
  labels,
  onRecorded,
  review = false,
}: {
  labels: { idle: string; denied: string[] };
  onRecorded: (blob: Blob) => void;
  review?: boolean;
}) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [denied, setDenied] = useState(false);
  const [pending, setPending] = useState<{ blob: Blob; url: string } | null>(null);
  const rec = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const cancelled = useRef(false);
  // live level meter — proves the mic hears you (volume only, never a grade)
  const meter = useRef<HTMLDivElement | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const raf = useRef<number | null>(null);

  const BARS = 15;

  const teardownMeter = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    audioCtx.current?.close().catch(() => {});
    audioCtx.current = null;
  };

  const startMeter = (stream: MediaStream) => {
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctx();
      audioCtx.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      src.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const draw = () => {
        analyser.getByteFrequencyData(data);
        const bars = meter.current?.children;
        if (bars) {
          for (let b = 0; b < bars.length; b++) {
            const v = data[b + 1] / 255; // skip DC bin
            (bars[b] as HTMLElement).style.transform = `scaleY(${1 + v * 6})`;
          }
        }
        raf.current = requestAnimationFrame(draw);
      };
      draw();
    } catch {
      /* no Web Audio — the timer still shows it's recording */
    }
  };

  const start = async () => {
    cancelled.current = false;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      rec.current = mr;
      chunks.current = [];
      mr.ondataavailable = (e) => chunks.current.push(e.data);
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        teardownMeter();
        if (!cancelled.current && chunks.current.length) {
          const blob = new Blob(chunks.current, { type: mr.mimeType });
          if (review) setPending({ blob, url: URL.createObjectURL(blob) });
          else onRecorded(blob);
        }
      };
      mr.start();
      setSeconds(0);
      setRecording(true);
      startMeter(stream);
      tick.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      setDenied(true);
    }
  };

  const stop = (cancel: boolean) => {
    cancelled.current = cancel;
    if (tick.current) clearInterval(tick.current);
    setRecording(false);
    if (rec.current && rec.current.state !== "inactive") rec.current.stop();
    else teardownMeter();
  };

  if (pending) {
    // hear-it-back: play your take, then Send or Record again
    return (
      <div>
        <AudioPlayer src={pending.url} />
        <p style={{ display: "flex", gap: 10, marginBottom: 0 }}>
          <button
            className="cta sun"
            onPointerUp={() => {
              onRecorded(pending.blob);
              URL.revokeObjectURL(pending.url);
              setPending(null);
            }}
          >
            Send it →
          </button>
          <button
            className="cta"
            onPointerUp={() => {
              URL.revokeObjectURL(pending.url);
              setPending(null);
            }}
          >
            Record again
          </button>
        </p>
      </div>
    );
  }

  if (denied) {
    // mic-denied = numbered steps on the slate, never an apology (05 §9)
    return (
      <div className="slate">
        <ol>
          {labels.denied.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <button
      className={recording ? "hold-bar recording" : "hold-bar"}
      onPointerDown={start}
      onPointerUp={() => stop(false)}
      onPointerLeave={() => recording && stop(true)}
      onPointerCancel={() => stop(true)}
    >
      {recording ? (
        <>
          ● {seconds}s
          <div className="meter" ref={meter} aria-hidden>
            {Array.from({ length: BARS }, (_, k) => (
              <i key={k} />
            ))}
          </div>
        </>
      ) : (
        labels.idle
      )}
    </button>
  );
}

```
