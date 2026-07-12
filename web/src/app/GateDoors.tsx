"use client";
import { useState } from "react";

interface Door {
  id: string;
  cls: string;
  name: string;
  initial: string;
  role: string;
}

interface Labels {
  word: string;
  enter: string;
  noMatch: string;
}

/** The gate doors + passphrase (build-plan issue 1, per-person passphrase).
 *  Tapping a door reveals its word field; a correct word signs you onto the
 *  network. All chrome is passed in as plain strings (server-resolved through
 *  the gate) — zero Kreyòl literals here. */
export default function GateDoors({
  doors,
  labels,
}: {
  doors: Door[];
  labels: Labels;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [word, setWord] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (id: string) => {
    setBusy(true);
    setError(false);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile: id, passphrase: word }),
    });
    setBusy(false);
    if (res.ok) {
      const data = await res.json();
      window.location.href = data.href;
    } else {
      setError(true);
    }
  };

  return (
    <div className="doorgrid">
      {doors.map((d) => (
        <div key={d.id} className="panel" style={{ color: "var(--kanvas)" }}>
          <button
            type="button"
            onClick={() => {
              setOpen(open === d.id ? null : d.id);
              setWord("");
              setError(false);
            }}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "block",
              width: "100%",
            }}
          >
            <span className={`liy ${d.cls}`}>{d.initial}</span>
            <div className="d3" style={{ marginTop: 10 }}>{d.name}</div>
            <div className="label" style={{ marginTop: 4 }}>{d.role}</div>
          </button>

          {open === d.id && (
            <div style={{ marginTop: 12 }}>
              <input
                type="password"
                aria-label={labels.word}
                placeholder={labels.word}
                value={word}
                autoFocus
                onChange={(e) => setWord(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && word.trim()) submit(d.id);
                }}
                style={{ width: "100%", boxSizing: "border-box" }}
              />
              <button
                className="cta sun"
                disabled={busy || !word.trim()}
                onClick={() => submit(d.id)}
                style={{ marginTop: 8 }}
              >
                {labels.enter}
              </button>
              {error && (
                <div className="label" style={{ marginTop: 6, color: "var(--scarlet)" }}>
                  {labels.noMatch}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
