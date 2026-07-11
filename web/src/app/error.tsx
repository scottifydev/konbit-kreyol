"use client";

/** Route error boundary — turns an unhandled failure from a white screen into
 *  a recoverable, in-world beat (the wire dropped), never a stack trace. */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="stage">
      <div className="scrim" style={{ marginTop: 40 }}>
        <div className="kicker" style={{ color: "var(--gold-bright)" }}>
          the wire dropped
        </div>
        <p style={{ color: "#e7dcc2", marginTop: 8 }}>
          Static in the hills — the signal didn&apos;t get through. Give it another go.
        </p>
        <p style={{ marginBottom: 0 }}>
          <button className="cta sun" onClick={reset}>Try the wire again →</button>
        </p>
      </div>
    </main>
  );
}
