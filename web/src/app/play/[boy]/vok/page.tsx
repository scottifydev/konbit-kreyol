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
