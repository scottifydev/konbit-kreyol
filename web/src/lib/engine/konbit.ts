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

/** BATTLE constants — the take-the-position formula (09-game-mechanics.md §4).
 *  TUNABLE (09 §11.4 open gate: Scott calibrates T/m/budgets with the boys
 *  once real due queues exist). These are the ratified launch defaults:
 *  a ~65% combined average with a 40% per-leg floor. */
export const BATTLE = {
  /** T — positive-interdependence sum floor: L_A + L_B ≥ T */
  T: 1.3,
  /** m — bounce-back / no-solo-solve floor: each L_i ≥ m */
  m: 0.4,
  /** b — volley budget by diagnostic band (09 §4.2) */
  budgets: { Strong: 10, Moderate: 8, Emerging: 6 } as Record<string, number>,
  /** pre-diagnostic default (a boy with no band yet plays the Moderate leg) */
  defaultBudget: 8,
};

/** Volley budget for a band — the Moderate default covers null/unknown bands
 *  (a boy who hasn't punched the ticket). */
export function bandBudget(band: string | null): number {
  return (band && BATTLE.budgets[band]) || BATTLE.defaultBudget;
}

/** Deal a boy's leg for today's battle. His budget is his band's, capped by
 *  the volleys actually available (due + mixed-review top-up the caller has
 *  gathered) so a light day is a shorter leg, never a shaming shortfall
 *  (09 §4.2). Returns the dealt budget. */
export function dealLeg(
  konbit: KonbitState,
  boy: string,
  band: string | null,
  availableVolleys: number,
): number {
  const leg = konbit.mon.legs[boy];
  if (!leg) return 0;
  leg.budget = Math.min(bandBudget(band), Math.max(0, availableVolleys));
  leg.score = 0;
  leg.done = false;
  return leg.budget;
}

/** A volley lands iff the retrieval was correct (a rec match, a Fokis
 *  judgment, or a voice-volley the receiver acted on). Only correct volleys
 *  count; a garble writes nothing (voice law — no false evidence). Clamped to
 *  the dealt budget. Returns the running landed count. */
export function landVolley(
  konbit: KonbitState,
  boy: string,
  ok: boolean,
): number {
  const leg = konbit.mon.legs[boy];
  if (!leg || leg.done) return leg?.score ?? 0;
  if (ok && leg.score < leg.budget) leg.score += 1;
  return leg.score;
}

/** L_i = landed / budget ∈ [0,1] — his own accuracy on his own due queue.
 *  NEVER rendered as a number comparable to his brother's on a shared
 *  surface (Journey rule, 09 §4.3). */
export function legFraction(leg: { score: number; budget: number }): number {
  return leg.budget > 0 ? leg.score / leg.budget : 0;
}

/** Relay handoff — pass the word down the line (09 §4.4; was passRope). The
 *  tip is genuinely required: enforcement lives in the disabled Pass button
 *  (copy law 6), and the engine refuses an empty tip as the backstop. Volleys
 *  are already landed via landVolley; this finalizes the leg and banks the
 *  tip. The tip is a plain double-rep and has ZERO effect on the threshold. */
export function passTheWord(
  konbit: KonbitState,
  boy: string,
  tip: string,
): boolean {
  const leg = konbit.mon.legs[boy];
  if (!leg || leg.done) return false;
  if (leg.budget <= 0) return false; // leg must be dealt first
  if (!tip.trim()) return false;
  leg.done = true;
  leg.tip = tip.trim();
  return true;
}

/** TAKE THE POSITION iff all three hold (09 §4.3):
 *  (1) L_A + L_B ≥ T        — positive interdependence
 *  (2) min(L_A, L_B) ≥ m    — bounce-back floor / no solo-solve
 *  (3) every leg done       — tips passed
 *  Pure (does not mutate); the caller persists mon.taken when it resolves. */
export function positionState(konbit: KonbitState): {
  sum: number;
  minFraction: number;
  allLegsDone: boolean;
  taken: boolean;
} {
  const legs = Object.values(konbit.mon.legs);
  const fractions = legs.map(legFraction);
  const sum = fractions.reduce((s, f) => s + f, 0);
  const minFraction = fractions.length ? Math.min(...fractions) : 0;
  const allLegsDone = legs.length > 0 && legs.every((l) => l.done);
  const taken = allLegsDone && sum >= BATTLE.T && minFraction >= BATTLE.m;
  return { sum, minFraction, allLegsDone, taken };
}

/** Lost battle = marronage: fall back to the mountains, return tomorrow —
 *  legs and scores reset, TIPS PERSIST (each other's tips are the comeback
 *  edge, 09 §4.6). The budget resets to 0 so the leg is re-dealt next attempt
 *  (band can change on the Monday role swap). Every SRS review logged during
 *  the attempt stays — the learning grew even on the loss. */
export function marronage(konbit: KonbitState): void {
  for (const leg of Object.values(konbit.mon.legs)) {
    leg.done = false;
    leg.score = 0;
    leg.budget = 0;
    // leg.tip intentionally kept
  }
  konbit.mon.taken = false;
}
