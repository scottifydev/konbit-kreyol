"use client";

/** Root-level fallback (must render its own <html>/<body>) for errors that
 *  escape the route boundary. Kept minimal and self-contained. */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ background: "#0d0a07", color: "#e8d9a0", fontFamily: "Georgia, serif", padding: 40 }}>
        <p style={{ letterSpacing: ".2em", textTransform: "uppercase", fontSize: 13 }}>the wire dropped</p>
        <p>Static in the hills. Reload and pick the signal back up.</p>
        <button
          onClick={reset}
          style={{ padding: "12px 20px", background: "#d9a521", color: "#0d0a07", border: "none", cursor: "pointer", fontWeight: 700 }}
        >
          Reload →
        </button>
      </body>
    </html>
  );
}
