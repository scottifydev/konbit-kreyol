"use client";
import { useCallback, useEffect, useState } from "react";

interface QueueItem {
  key: string;
  kind: string;
  ht: string | null;
  en: string;
  certified: boolean;
}

/** The Cipher Office — Manman's queue as an in-game surface (02 §5).
 *  ADULT SURFACE: plain speech, spec vocabulary legal. Template-first:
 *  she certifies, edits (via ticket), or bounces — never composes blank. */
export default function GmClient() {
  const [queue, setQueue] = useState<QueueItem[]>([]);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/gm/queue");
    const data = await res.json();
    setQueue(data.queue);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const certify = async (key: string, value: boolean) => {
    await fetch("/api/gm/certify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, certified: value }),
    });
    refresh();
  };

  const open = queue.filter((q) => !q.certified);
  const done = queue.filter((q) => q.certified);

  return (
    <div>
      <p>
        Nothing Kreyòl renders to the boys until it passes here. Certifying a
        draft flips it live once its unit is also taught (the flip gate still
        applies). Open tickets need your words — the app ships English there
        until you decide.
      </p>
      <h2 className="d3">Waiting on you · {open.length}</h2>
      {open.map((q) => (
        <div key={q.key} className="hairline-row">
          <div className="label">{q.kind}</div>
          <div className="kreyol-body">{q.ht ?? "— no draft —"}</div>
          <div>{q.en}</div>
          {q.ht !== null && (
            <button className="cta sun" onPointerUp={() => certify(q.key, true)}>
              Good — send it
            </button>
          )}
        </div>
      ))}
      <h2 className="d3">Certified · {done.length}</h2>
      {done.map((q) => (
        <div key={q.key} className="hairline-row">
          <div className="kreyol-body">{q.ht}</div>
          <button className="cta" onPointerUp={() => certify(q.key, false)}>
            Pull it back
          </button>
        </div>
      ))}
    </div>
  );
}
