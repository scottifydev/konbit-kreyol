"use client";
import { useState } from "react";

interface Labels {
  pwo: string;
  pwoSub: string;
  on: string;
  off: string;
  exportTitle: string;
  exportSub: string;
  exportBtn: string;
  leave: string;
}

/** Settings island: Pro mode toggle, the family export, and Leave. All chrome
 *  passed in as plain strings — zero Kreyòl literals. */
export default function SettingsClient({
  boy,
  pwoMode,
  labels,
}: {
  boy: string;
  pwoMode: boolean;
  labels: Labels;
}) {
  const [pwo, setPwo] = useState(pwoMode);
  const [busy, setBusy] = useState(false);

  const togglePwo = async () => {
    const next = !pwo;
    setPwo(next); // optimistic
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boy, pwoMode: next }),
    });
  };

  const leave = async () => {
    setBusy(true);
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <div>
      <div className="panel">
        <div className="row" style={{ alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div className="d3">{labels.pwo}</div>
            <div className="label" style={{ marginTop: 4 }}>{labels.pwoSub}</div>
          </div>
          <button
            className={pwo ? "cta sun" : "cta"}
            onPointerUp={togglePwo}
            aria-pressed={pwo}
          >
            {pwo ? labels.on : labels.off}
          </button>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <div className="d3">{labels.exportTitle}</div>
        <div className="label" style={{ marginTop: 4 }}>{labels.exportSub}</div>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          <a className="cta" href="/api/export">{labels.exportBtn}</a>
        </p>
      </div>

      <p style={{ marginTop: 24 }}>
        <button className="cta" disabled={busy} onPointerUp={leave}>
          {labels.leave}
        </button>
      </p>
    </div>
  );
}
