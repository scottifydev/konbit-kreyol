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
