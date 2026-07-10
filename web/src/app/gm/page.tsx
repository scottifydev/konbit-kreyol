import GmClient from "./GmClient";

/** GM console — ADULT SURFACE (kid copy law does not apply; 04 §2 preamble).
 *  v1 scaffold ships the Cipher Office queue; the dispatch composer, enemy
 *  intel templates, commendations, and the event scheduler are build-plan
 *  issue 9. GM LAW 1: nothing on this surface can write to any ledger —
 *  see /api/gm/certify.
 *  AUTH: Supabase family-only auth is the production gate (06 §1); until
 *  that project exists this surface is local-dev only. */
export default function GmPage() {
  return (
    <main className="page">
      <header className="scoreboard">
        <div>
          <div className="label">adult surface — the boys do not see this</div>
          <h1 className="d1">Cipher Office</h1>
        </div>
      </header>
      <GmClient />
    </main>
  );
}
