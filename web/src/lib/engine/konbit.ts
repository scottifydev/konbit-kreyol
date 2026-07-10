import type { KonbitState, Profile } from "./types";

/** Konbit streak + padon — ported from v6-4 (behavior-normative).
 *  The shared streak survives if EITHER boy practices; padon repairs are
 *  finite and counted (co-op law, 02-game-systems.md §4). */

export function practiceToday(
  p: Profile,
  konbit: KonbitState,
  day: number,
): void {
  if (p.lastDay !== day) {
    p.streak = p.lastDay === day - 1 ? p.streak + 1 : 1;
    p.lastDay = day;
  }
  if (konbit.lastDay !== day) {
    konbit.streak = konbit.lastDay >= day - 1 ? konbit.streak + 1 : 1;
    konbit.lastDay = day;
  }
}

export type RolloverResult = "kept" | "padon_used" | "reset";

/** Day rollover: if the crew missed yesterday, one padon (if any remain)
 *  repairs the streak; otherwise it resets. Never framed as blame on a
 *  kid surface — "it starts again the moment either of you shows up." */
export function dayRollover(konbit: KonbitState, day: number): RolloverResult {
  const yesterday = day - 1;
  if (konbit.lastDay >= yesterday) return "kept";
  if (konbit.padon > 0) {
    konbit.padon -= 1;
    return "padon_used";
  }
  konbit.streak = 0;
  return "reset";
}

/** Relay handoff: the tip is genuinely required — enforcement lives in the
 *  disabled Pass button (copy law 6), and the engine refuses an empty tip
 *  as the backstop. */
export function passRope(
  konbit: KonbitState,
  boy: string,
  score: number,
  tip: string,
): boolean {
  const leg = konbit.mon.legs[boy];
  if (!leg || leg.done) return false;
  if (!tip.trim()) return false;
  leg.done = true;
  leg.score = score;
  leg.tip = tip.trim();
  return true;
}

export function summitState(konbit: KonbitState): {
  total: number;
  threshold: number;
  allLegsDone: boolean;
  summited: boolean;
} {
  const legs = Object.values(konbit.mon.legs);
  const total = legs.reduce((s, l) => s + l.score, 0);
  const allLegsDone = legs.every((l) => l.done);
  const summited = allLegsDone && total >= konbit.mon.threshold;
  return { total, threshold: konbit.mon.threshold, allLegsDone, summited };
}

/** Failed summit = marronage: retreat to the mountains, return tomorrow —
 *  legs reset, TIPS PERSIST (each other's tips are the comeback edge). */
export function marronage(konbit: KonbitState): void {
  for (const leg of Object.values(konbit.mon.legs)) {
    leg.done = false;
    leg.score = 0;
    // leg.tip intentionally kept
  }
  konbit.mon.summited = false;
}
