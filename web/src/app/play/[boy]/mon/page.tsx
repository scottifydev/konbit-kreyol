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
