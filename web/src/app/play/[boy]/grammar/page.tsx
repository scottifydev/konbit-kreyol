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
