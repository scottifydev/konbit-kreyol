import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Flip from "@/components/Flip";
import CampaignMap from "@/components/CampaignMap";
import { chrome, chromeUnitTitle } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";
import { KANPAY } from "@/data/kanpay";
import scopeData from "@/data/scope.json";
import { kleSolid, dueItems } from "@/lib/engine/srs";
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
          {/* today's session — the lead */}
          <div className="panel">
            <div className="meta" style={{ color: "var(--gold-bright)" }}>
              <Flip view={c("today")} />
            </div>
            <div className="row">
              <span className="sundot" />
              <div>
                <Link href={`/play/${boy}/feed`}><Flip view={c("fil")} /></Link> — {due}{" "}
                <Flip view={c("words_back")} />
              </div>
            </div>
            <div className="row"><Flip view={c("step_fokis")} /></div>
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
              <Link className="cta" href={`/play/${boy}/dispatch`}><Flip view={c("start")} /></Link>
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
        <span><Flip view={c("misyon")} /></span>
        <span><Flip view={c("ladder")} /></span>
        <span><Flip view={c("settings")} /></span>
      </nav>
    </main>
  );
}
