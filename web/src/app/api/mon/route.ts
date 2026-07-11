import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import {
  dealLeg,
  marronage,
  passTheWord,
  positionState,
} from "@/lib/engine/konbit";

/** The battle — HOLD/TAKE THE POSITION (09-game-mechanics.md §4). This route
 *  orchestrates one boy's leg; it never touches mastery beyond the volleys
 *  landed on the dispatch-acted path (voice-volleys). Actions:
 *
 *  - deal: muster the leg — budget = min(band, available voice-volleys). His
 *    volleys are his pending dispatches; acting on them (the dispatch outcome
 *    route) lands each one. Idempotent (won't re-deal a live or finished leg).
 *  - pass: pass the word — passTheWord requires a dealt leg AND a non-empty
 *    tip (the disabled-button backstop). Resolves the shared position when
 *    both legs are done.
 *  - marronage: fall back to the mountains — legs reset, tips persist.
 */
export async function POST(req: NextRequest) {
  const { action, boy, tip } = await req.json();
  const store = getStore();
  const state = await store.load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  const leg = state.konbit.mon.legs[boy];
  if (!leg) return NextResponse.json({ ok: false }, { status: 400 });

  if (action === "deal") {
    if (leg.budget === 0 && !leg.done) {
      const available = state.dispatches.filter(
        (d) => d.receiver === boy && d.status !== "acted",
      ).length;
      dealLeg(state.konbit, boy, p.band, available);
    }
  } else if (action === "pass") {
    if (!passTheWord(state.konbit, boy, String(tip ?? ""))) {
      return NextResponse.json(
        { ok: false, reason: "needs-dealt-leg-and-tip" },
        { status: 400 },
      );
    }
    const ps = positionState(state.konbit);
    if (ps.allLegsDone) state.konbit.mon.taken = ps.taken;
  } else if (action === "marronage") {
    marronage(state.konbit);
  } else {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await store.save(state);
  const position = positionState(state.konbit);
  return NextResponse.json({
    ok: true,
    leg: { score: leg.score, budget: leg.budget, done: leg.done },
    position, // collective only — no per-brother comparable number returned
    taken: state.konbit.mon.taken,
  });
}
