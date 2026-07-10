import Link from "next/link";
import { notFound } from "next/navigation";
import Flip from "@/components/Flip";
import { chrome, chromeUnitTitle } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";
import { KANPAY } from "@/data/kanpay";
import scopeData from "@/data/scope.json";
import { kleSolid, dueItems } from "@/lib/engine/srs";
import type { ScopeItem } from "@/lib/engine/types";

const SCOPE = (scopeData as { items: ScopeItem[] }).items;

/** The front page (dashboard) — one lead story, konbit strip, campaign
 *  strip, 77-tick ruler, small index (05 §5). No number here is comparable
 *  across brothers on a shared surface; this is HIS page (masthead stats
 *  are per-boy by law). */
export default async function FrontPage({
  params,
}: {
  params: Promise<{ boy: string }>;
}) {
  const { boy } = await params;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") notFound();

  const { unit, certified, day, konbit } = state;
  const c = (key: string) => chrome(key, unit, certified);
  const kle = kleSolid(p, SCOPE);
  const due = dueItems(p, SCOPE, unit, day).length;
  const chapter = KANPAY.find((ch) => ch.unit === unit) ?? KANPAY[0];
  const pending = state.dispatches.filter(
    (d) => d.receiver === boy && d.status !== "acted",
  ).length;

  return (
    <main className="page">
      <header className="scoreboard">
        <div>
          <div className="label">
            <Flip view={c("unit_label")} /> {unit} ·{" "}
            <Flip view={chromeUnitTitle(unit, unit, certified)} />
          </div>
          <h1 className="d1">
            <Flip view={c("dash")} />
          </h1>
        </div>
        <div className="stat">
          <span className="label">
            <Flip view={c("streak")} />
          </span>{" "}
          {p.streak}
        </div>
      </header>

      {/* lead story — today's session (~60% of the visual weight) */}
      <section>
        <h2 className="d2">
          <Flip view={c("today")} />
        </h2>
        <div className="hairline-row">
          <Flip view={c("fil")} /> — {due} <Flip view={c("words_back")} />
        </div>
        <div className="hairline-row">
          <Flip view={c("step_fokis")} />
        </div>
        <div className="hairline-row">
          <Flip view={c("prod")} /> ·{" "}
          <Link href={`/play/${boy}/dispatch`}>
            <Flip view={c("dispatch_new")} />
          </Link>
          {pending > 0 && (
            <>
              {" "}
              · <Flip view={c("dispatch_inbox")} />: {pending}
            </>
          )}
        </div>
        <div className="hairline-row">
          <Flip view={c("step_mon")} />
        </div>
        <p>
          <Link className="cta" href={`/play/${boy}/dispatch`}>
            <Flip view={c("start")} />
          </Link>
        </p>
      </section>

      {/* Kle 77 — the honest individual goal */}
      <section>
        <div className="label">
          <Flip view={c("kle77")} /> · {kle} / 77
        </div>
        <div className="ruler" aria-label={`${kle} of 77`}>
          {Array.from({ length: 77 }, (_, i) => (
            <i key={i} className={i < kle ? "solid" : undefined} />
          ))}
        </div>
      </section>

      {/* konbit strip — fixed row order (leg order), never sorted; the only
          numbers are each climber's own Kle 77 and the one shared bar */}
      <section>
        <div className="goldband">
          <Flip view={c("standings")} /> · {konbit.streak}{" "}
          <Flip view={c("days")} />
        </div>
        <table className="plain">
          <tbody>
            {/* row order fixed to leg order — never sorted (copy law 3) */}
            {(["leo", "isaac"] as const).map((id) => (
              <tr key={id}>
                <td>
                  <span className={`liy ${id}`}>
                    {state.profiles[id].name[0]}
                  </span>
                </td>
                <td>{state.profiles[id].name}</td>
                <td>
                  <Flip view={c("kle77")} /> {kleSolid(state.profiles[id], SCOPE)}
                  /77
                </td>
                <td>★ {konbit.stars}/10</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* campaign strip — 8 milestones, current one live */}
      <section>
        <div className="label">{chapter.year}</div>
        <div className="d3">
          {chapter.n}. {chapter.nameEn}
        </div>
        <p>{chapter.milestoneFactEn}</p>
        <div className="ruler">
          {KANPAY.map((ch) => (
            <i
              key={ch.n}
              className={ch.n <= chapter.n ? "solid" : undefined}
              style={{ width: 12 }}
            />
          ))}
        </div>
      </section>

      <nav className="index label">
        <Link href={`/play/${boy}/dispatch`}>
          <Flip view={c("prod")} />
        </Link>{" "}
        · <Flip view={c("misyon")} /> · <Flip view={c("ladder")} /> ·{" "}
        <Flip view={c("settings")} />
      </nav>
    </main>
  );
}
