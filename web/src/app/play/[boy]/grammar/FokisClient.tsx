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
          <button className="cta sun" onClick={() => setJudged(true)}>{labels.right}</button>
          <button className="cta" onClick={() => setJudged(false)}>{labels.off}</button>
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
            <button className="cta sun" onClick={() => { setJudged(null); setI((n) => n + 1); }}>
              Next →
            </button>
          </p>
        </>
      )}
    </div>
  );
}
