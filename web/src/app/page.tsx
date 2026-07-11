import Link from "next/link";
import Flip from "@/components/Flip";
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
      <section className="hero" style={{ aspectRatio: "16 / 7", minHeight: 300 }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {DOORS.map((d) => {
            const p = profiles[d.id];
            if (!p) return null;
            return (
              <Link key={d.id} href={d.href} className="panel" style={{ textDecoration: "none", color: "var(--kanvas)" }}>
                <span className={`liy ${d.cls}`}>{p.name[0]}</span>
                <div className="d3" style={{ marginTop: 10 }}>{p.name}</div>
                <div className="label" style={{ marginTop: 4 }}>{p.role}</div>
              </Link>
            );
          })}
        </div>
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
