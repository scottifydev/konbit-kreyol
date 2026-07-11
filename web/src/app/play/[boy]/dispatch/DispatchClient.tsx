"use client";
import { useCallback, useEffect, useState } from "react";
import HoldToRecord from "@/components/HoldToRecord";

interface WireDispatch {
  id: string;
  sender: string;
  receiver: string;
  status: string;
  audioRef: string;
  check: { question: string; options: string[] };
  commendation: string | null;
}

interface Labels {
  promptEn: string;
  hold: string;
  denied: string[];
  inbox: string;
  garbled: string;
  repeat: string;
  acted: string;
  enemyFoiled: string;
}

/** The dispatch composer + inbox (phone surface). All chrome labels are
 *  resolved server-side through the gate and passed down — zero Kreyòl
 *  literals here (language law §1.4). */
export default function DispatchClient({
  boy,
  brother,
  promptId,
  labels,
}: {
  boy: string;
  brother: string;
  promptId: string;
  labels: Labels;
}) {
  const [inbox, setInbox] = useState<WireDispatch[]>([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [outcomes, setOutcomes] = useState<Record<string, string>>({});

  const refresh = useCallback(async () => {
    const res = await fetch(`/api/dispatches?for=${boy}`);
    const data = await res.json();
    setInbox(
      data.dispatches.filter((d: WireDispatch) => d.receiver === boy),
    );
  }, [boy]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const send = async (blob: Blob) => {
    const form = new FormData();
    form.append("audio", blob, "dispatch.webm");
    form.append("sender", boy);
    form.append("receiver", brother);
    form.append("promptId", promptId);
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch("/api/dispatches", { method: "POST", body: form });
      if (res.ok) setSent(true);
      else setSendError(true); // the wire dropped it — never fake a ✓
    } catch {
      setSendError(true);
    }
    setSending(false);
  };

  const act = async (id: string, option: number) => {
    const res = await fetch(`/api/dispatches/${id}/outcome`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ option }),
    });
    const data = await res.json();
    setOutcomes((o) => ({ ...o, [id]: data.outcome }));
    refresh();
  };

  const repeat = async (id: string) => {
    await fetch(`/api/dispatches/${id}/outcome`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repeat: true }),
    });
    setOutcomes((o) => ({ ...o, [id]: "" }));
    refresh();
  };

  return (
    <div>
      <section>
        <p className="kreyol-body">{labels.promptEn}</p>
        {sent ? (
          <p className="goldband ignite">→ {brother} <span className="checkin">✓</span></p>
        ) : sending ? (
          <div className="hold-bar pending" aria-live="polite">SENDING…</div>
        ) : (
          <>
            <HoldToRecord
              labels={{ idle: labels.hold, denied: labels.denied }}
              onRecorded={send}
            />
            {sendError && (
              <p className="label" style={{ color: "var(--scarlet)", marginTop: 8 }}>
                didn&apos;t reach the wire — hold to send again
              </p>
            )}
          </>
        )}
      </section>

      <section>
        <h2 className="d3">{labels.inbox}</h2>
        {inbox.map((d) => (
          <div key={d.id} className="hairline-row">
            <audio controls src={`/api/audio/${d.audioRef}`} />
            {d.status === "acted" || outcomes[d.id] === "acted" ? (
              <>
                <p className="goldband ignite">
                  {labels.acted}
                  {d.commendation ? ` · ★ ${d.commendation}` : ""}
                </p>
                {/* the thesis at the moment of triumph: they can't read it */}
                <p className="label" style={{ color: "var(--gold-bright)", fontStyle: "italic" }}>
                  {labels.enemyFoiled}
                </p>
              </>
            ) : outcomes[d.id] === "garbled" || d.status === "garbled" ? (
              <p>
                {labels.garbled}{" "}
                <button className="cta sun" onPointerUp={() => repeat(d.id)}>
                  {labels.repeat}
                </button>
              </p>
            ) : (
              <div>
                <p>{d.check.question}</p>
                {d.check.options.map((opt, i) => (
                  <p key={i}>
                    <button className="cta" onPointerUp={() => act(d.id, i)}>
                      {opt}
                    </button>
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
