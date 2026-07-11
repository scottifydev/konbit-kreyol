"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Labels {
  legTitle: string;
  muster: string;
  runners: string;
  inbox: string;
  quiet: string;
  tipPrompt: string;
  pass: string;
  hold: string;
  waits: string;
  fallBack: string;
  held: string;
  heldBody: string;
}

/** The battle leg (09 §4). All chrome is resolved server-side through the
 *  gate and passed as plain strings — zero Kreyòl literals here (§1.4). The
 *  boy sees only his OWN leg progress and the COLLECTIVE outcome; his
 *  brother's number is never shown (co-op law). Volleys are landed by acting
 *  on dispatches (the inbox link); this surface musters the leg, passes the
 *  word, and reveals whether the position held. */
export default function MonClient({
  boy,
  dispatchHref,
  dealt,
  legDone,
  score,
  budget,
  bothDone,
  taken,
  pending,
  labels,
}: {
  boy: string;
  dispatchHref: string;
  dealt: boolean;
  legDone: boolean;
  score: number;
  budget: number;
  brotherDone: boolean;
  bothDone: boolean;
  taken: boolean;
  pending: number;
  labels: Labels;
}) {
  const router = useRouter();
  const [tip, setTip] = useState("");
  const [busy, setBusy] = useState(false);

  const post = async (action: string, extra: Record<string, unknown> = {}) => {
    setBusy(true);
    try {
      await fetch("/api/mon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, boy, ...extra }),
      });
    } catch {
      /* the refresh below re-reads server truth; nothing is faked here */
    }
    setBusy(false);
    router.refresh();
  };

  // ── The shared outcome: the position held, or fall back to the mountains.
  if (bothDone && taken) {
    return (
      <div className="panel">
        {/* the peak — the two of you, one load. The marks slide together. */}
        <div className="hold-together" aria-hidden style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
          <span className="liy leo mark-l">L</span>
          <span className="liy isaac mark-r">I</span>
        </div>
        <div className="goldband ignite" style={{ textAlign: "center", fontSize: 22 }}>
          {labels.held} <span className="checkin">✓</span>
        </div>
        <p style={{ textAlign: "center", marginBottom: 8 }}>{labels.heldBody}</p>
        <div className="oral" style={{ borderLeft: "none", padding: 0, textAlign: "center", display: "block" }}>
          « Men anpil, chay pa lou »
        </div>
      </div>
    );
  }
  if (bothDone && !taken) {
    return (
      <div className="panel">
        <p>{labels.waits}</p>
        <button
          className="cta"
          disabled={busy}
          onPointerUp={() => post("marronage")}
        >
          {labels.fallBack}
        </button>
      </div>
    );
  }

  // ── His own leg.
  return (
    <div className="panel">
      <div className="meta" style={{ color: "var(--gold-bright)" }}>
        {labels.legTitle}
      </div>

      {!dealt && !legDone && pending > 0 && (
        <p style={{ marginBottom: 0 }}>
          <button
            className={busy ? "cta sun pending" : "cta sun"}
            disabled={busy}
            onPointerUp={() => post("deal")}
          >
            {labels.muster}
          </button>
        </p>
      )}

      {!dealt && !legDone && pending === 0 && (
        <p style={{ marginBottom: 0 }}>
          {labels.quiet} ·{" "}
          <Link className="cta" href={dispatchHref}>
            {labels.inbox}
          </Link>
        </p>
      )}

      {dealt && !legDone && (
        <>
          <div className="row">
            <span className="sundot" /> {score} / {budget} {labels.runners}
          </div>
          <p>
            <Link className="cta" href={dispatchHref}>
              {labels.inbox}
            </Link>
          </p>
          <label className="label" htmlFor="tip">
            {labels.tipPrompt}
          </label>
          <textarea
            id="tip"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            rows={2}
            style={{ width: "100%", marginTop: 6 }}
          />
          <p style={{ marginBottom: 0 }}>
            <button
              className="cta sun"
              disabled={busy || !tip.trim()}
              onPointerUp={() => post("pass", { tip })}
            >
              {labels.pass}
            </button>
          </p>
        </>
      )}

      {legDone && !bothDone && <p className="goldband">{labels.hold}</p>}
    </div>
  );
}
