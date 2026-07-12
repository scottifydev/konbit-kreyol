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
        <button className="cta sun" onClick={() => setLine((n) => n + 1)}>
          Go on →
        </button>
      ) : !chose ? (
        <div>
          {choices.map((label, i) => (
            <p key={i} style={{ marginBottom: 8 }}>
              <button className="cta" onClick={() => setChose(true)}>{label}</button>
            </p>
          ))}
        </div>
      ) : history && hist === null ? (
        <div className="scrim cardin">
          <p style={{ marginTop: 0 }}>{history.question}</p>
          {history.options.map((o, i) => (
            <p key={i} style={{ marginBottom: 8 }}>
              <button className="cta" onClick={() => setHist(i === history.answer)}>{o}</button>
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
