import Link from "next/link";

/** In-world 404 — a missing trail, with a way back to the gate. */
export default function NotFound() {
  return (
    <main className="stage">
      <div className="scrim" style={{ marginTop: 40 }}>
        <div className="kicker" style={{ color: "var(--gold-bright)" }}>off the map</div>
        <p style={{ color: "#e7dcc2", marginTop: 8 }}>
          This trail isn&apos;t on the map yet.
        </p>
        <p style={{ marginBottom: 0 }}>
          <Link className="cta" href="/">Back to the gate →</Link>
        </p>
      </div>
    </main>
  );
}
