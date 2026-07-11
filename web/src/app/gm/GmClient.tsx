"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

interface QueueItem {
  key: string;
  kind: string;
  ht: string | null;
  en: string;
  certified: boolean;
  unit?: number;
}

const KINDS = ["all", "lexicon", "chrome", "feed", "scene", "chapter name", "open ticket"];
const RENDER_CAP = 120;

/** The Cipher Office — Manman's review queue as an in-game surface (02 §5).
 *  ADULT SURFACE: plain speech, spec vocabulary legal. Built to make the pass
 *  FAST: filter by kind and unit, search, batch-certify a reviewed subset.
 *  Nothing Kreyòl reaches the boys until it clears here (native gate);
 *  certifying only flips it live once its unit is also taught (flip gate). */
export default function GmClient() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [kind, setKind] = useState("all");
  const [unit, setUnit] = useState<number | "all">("all");
  const [q, setQ] = useState("");
  const [showDone, setShowDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/gm/queue");
    const data = await res.json();
    setQueue(data.queue);
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);

  const certify = async (keys: string[], value: boolean) => {
    if (keys.length === 0) return;
    setBusy(true);
    await fetch("/api/gm/certify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keys, certified: value }),
    });
    await refresh();
    setBusy(false);
  };

  const units = useMemo(
    () => Array.from(new Set(queue.map((i) => i.unit).filter((u): u is number => u != null))).sort((a, b) => a - b),
    [queue],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return queue.filter((i) => {
      if (kind !== "all" && i.kind !== kind) return false;
      if (unit !== "all" && i.unit !== unit) return false;
      if (!showDone && i.certified) return false;
      if (needle && !(`${i.ht ?? ""} ${i.en}`.toLowerCase().includes(needle))) return false;
      return true;
    });
  }, [queue, kind, unit, q, showDone]);

  const total = queue.length;
  const doneCount = queue.filter((i) => i.certified).length;
  // batch-certifiable = shown, open, has a draft (null drafts need her words)
  const batchKeys = filtered.filter((i) => !i.certified && i.ht !== null).map((i) => i.key);
  const shown = filtered.slice(0, RENDER_CAP);

  return (
    <div>
      <p>
        Nothing Kreyòl renders to the boys until it passes here. Certifying a
        draft flips it live once its unit is also taught (the flip gate still
        applies). Open tickets have no draft — they need your words; the app
        ships English there until you decide.
      </p>

      <div className="goldband">
        {doneCount} / {total} cleared · {total - doneCount} waiting on you
      </div>

      <div className="row" style={{ flexWrap: "wrap", gap: 6, margin: "14px 0" }}>
        {KINDS.map((k) => (
          <button
            key={k}
            className={kind === k ? "cta sun" : "cta"}
            onPointerUp={() => setKind(k)}
            style={{ fontSize: 13 }}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="row" style={{ flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 14 }}>
        <input
          placeholder="search…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: "1 1 160px" }}
        />
        <select value={unit} onChange={(e) => setUnit(e.target.value === "all" ? "all" : Number(e.target.value))}>
          <option value="all">all units</option>
          {units.map((u) => (
            <option key={u} value={u}>unit {u}</option>
          ))}
        </select>
        <label className="label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />
          show cleared
        </label>
      </div>

      {batchKeys.length > 0 && (
        <p>
          <button className="cta sun" disabled={busy} onPointerUp={() => certify(batchKeys, true)}>
            Clear all {batchKeys.length} shown
          </button>{" "}
          <span className="label">— only what you've reviewed</span>
        </p>
      )}

      <div className="label" style={{ margin: "10px 0" }}>
        Showing {shown.length} of {filtered.length}
        {filtered.length > RENDER_CAP ? " (narrow with search / unit)" : ""}
      </div>

      {shown.map((i) => (
        <div key={i.key} className="hairline-row">
          <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="label">{i.kind}{i.unit != null ? ` · u${i.unit}` : ""}</span>
            {i.certified && <span className="label" style={{ color: "var(--gold-bright)" }}>✓ cleared</span>}
          </div>
          <div className="kreyol-body">{i.ht ?? "— no draft — needs your words —"}</div>
          <div style={{ color: "#c9bfa6" }}>{i.en}</div>
          {i.ht !== null && !i.certified && (
            <button className="cta sun" disabled={busy} onPointerUp={() => certify([i.key], true)}>
              Good — send it
            </button>
          )}
          {i.certified && (
            <button className="cta" disabled={busy} onPointerUp={() => certify([i.key], false)}>
              Pull it back
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
