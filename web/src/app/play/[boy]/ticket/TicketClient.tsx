"use client";
import { useState } from "react";
import HoldToRecord from "@/components/HoldToRecord";

interface Labels {
  aural: string;
  read: string;
  coming: string;
  describe: string;
  finish: string;
  track: string;
  words: string;
  done: string;
  hold: string;
  denied: string[];
}

/** The ticket probes (issue 4). Aural + read-aloud need Kreyòl reference
 *  content, so they honestly show "coming" until Manman's pass; the
 *  describe-the-camp production probe records now and stores for the Cipher
 *  Office to score by ear (never machine-judged). Finishing sizes a
 *  provisional track and puts the boy on the wire. All chrome passed in as
 *  plain strings — zero Kreyòl literals here. */
export default function TicketClient({
  boy,
  provisionalWords,
  art,
  labels,
}: {
  boy: string;
  provisionalWords: number;
  art: string;
  labels: Labels;
}) {
  const [recorded, setRecorded] = useState(false);
  const [busy, setBusy] = useState(false);

  const upload = async (blob: Blob) => {
    const form = new FormData();
    form.append("audio", blob, "ticket.webm");
    form.append("boy", boy);
    form.append("slot", "describe");
    await fetch("/api/ticket", { method: "POST", body: form });
    setRecorded(true);
  };

  const finish = async () => {
    setBusy(true);
    const res = await fetch("/api/ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "finish", boy }),
    });
    const data = await res.json();
    if (data.ok) window.location.href = data.href;
    else setBusy(false);
  };

  return (
    <div>
      {/* (a) aural recognition — reference audio pending */}
      <div className="panel">
        <div className="meta" style={{ color: "var(--gold-bright)" }}>
          {labels.aural}
        </div>
        <p style={{ marginBottom: 0 }}>{labels.coming}</p>
      </div>

      {/* (b) read-aloud decode — Kreyòl phrases pending the Cipher Office */}
      <div className="panel" style={{ marginTop: 16 }}>
        <div className="meta" style={{ color: "var(--gold-bright)" }}>
          {labels.read}
        </div>
        <p style={{ marginBottom: 0 }}>{labels.coming}</p>
      </div>

      {/* (c) describe the camp — production probe, runs now */}
      <div className="panel" style={{ marginTop: 16 }}>
        <div className="meta" style={{ color: "var(--gold-bright)" }}>
          {labels.describe}
        </div>
        <section className="hero banner" style={{ margin: "12px 0" }}>
          <img src={art} alt="" />
          <div className="veil" />
        </section>
        {recorded ? (
          <p className="goldband">✓</p>
        ) : (
          <HoldToRecord
            labels={{ idle: labels.hold, denied: labels.denied }}
            onRecorded={upload}
          />
        )}
      </div>

      <div className="goldband" style={{ marginTop: 20 }}>
        {labels.track} · ~{provisionalWords} {labels.words}
      </div>

      <p style={{ marginTop: 16 }}>
        <button className="cta sun" disabled={busy} onPointerUp={finish}>
          {labels.finish}
        </button>
      </p>
    </div>
  );
}
