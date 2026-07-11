import { NextRequest } from "next/server";
import { getStore } from "@/lib/store/local";
import { HttpError } from "@/lib/store/adapter";
import {
  dealLeg,
  marronage,
  passTheWord,
  positionState,
} from "@/lib/engine/konbit";
import { guardBoy } from "@/lib/session";
import { txJson } from "@/lib/tx";

/** The battle — HOLD/TAKE THE POSITION (09 §4). Orchestrates one boy's leg.
 *  - deal: muster the leg — budget = min(band, available voice-volleys).
 *  - pass: pass the word — needs a dealt leg AND a non-empty tip; resolves the
 *    shared position when both legs are done.
 *  - marronage: fall back — legs reset, tips persist. */
export async function POST(req: NextRequest) {
  const { action, boy, tip } = await req.json();
  const denied = await guardBoy(boy);
  if (denied) return denied;
  return txJson(getStore(), (state) => {
    const p = state.profiles[boy];
    if (!p || p.kind !== "boy") throw new HttpError(404);
    const leg = state.konbit.mon.legs[boy];
    if (!leg) throw new HttpError(400);

    if (action === "deal") {
      if (leg.budget === 0 && !leg.done) {
        const available = state.dispatches.filter(
          (d) => d.receiver === boy && d.status !== "acted",
        ).length;
        dealLeg(state.konbit, boy, p.band, available);
      }
    } else if (action === "pass") {
      if (!passTheWord(state.konbit, boy, String(tip ?? ""))) {
        throw new HttpError(400); // needs a dealt leg and a tip
      }
      const ps = positionState(state.konbit);
      if (ps.allLegsDone) state.konbit.mon.taken = ps.taken;
    } else if (action === "marronage") {
      marronage(state.konbit);
    } else {
      throw new HttpError(400);
    }

    const position = positionState(state.konbit);
    return {
      ok: true,
      leg: { score: leg.score, budget: leg.budget, done: leg.done },
      position, // collective only — no per-brother comparable number
      taken: state.konbit.mon.taken,
    };
  });
}
