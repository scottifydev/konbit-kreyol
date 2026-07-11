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
