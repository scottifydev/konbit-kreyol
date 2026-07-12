import Flip from "@/components/Flip";
import GateDoors from "./GateDoors";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";

/** The gate — Drapo Ginen. The one earned Legba vèvè — Papa Legba's DOCUMENTED
 *  structure (Wikimedia Commons, public domain, recolored; not coined —
 *  appropriation firewall, Design-Review A1) — dimmed into the painted
 *  night-earth ground. Doors carry name + role only; the konbit goldband is
 *  the one shared number. Pre-Unit-1: English chrome (language law). */
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
        {/* Papa Legba's DOCUMENTED vèvè (Wikimedia Commons, public domain,
            recolored to cornmeal) — the one earned sacred mark, gate only,
            dimmed into the ground beneath the wordmark. Replaces the prior
            *invented* crossroads: the app coins nothing (appropriation-firewall
            fix, Design-Review A1). Sacred content → pending Manman's gate. */}
        <img
          src="/art/veve-legba.svg"
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, margin: "auto", width: "min(72%, 440px)", opacity: 0.16, pointerEvents: "none" }}
        />
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
