import type { Dispatch, Profile } from "./types";
import { review } from "./srs";

/** The voice-dispatch loop — ledger side (02-game-systems.md §1).
 *
 *  VOICE LAWS (04-laws.md §5), enforced here by construction:
 *  - Transmission is the grade: ONE successful transmission writes prod
 *    evidence for the sender and rec evidence for the receiver, on the
 *    prompt's target items. Nothing else writes speech evidence.
 *  - Comprehension is proven by action: the caller passes the receiver's
 *    chosen option; this module compares it to the paired check's answer.
 *    There is no code path that credits a ledger from a self-report.
 *  - A garble writes NOTHING false — it simply isn't evidence. The retry
 *    is free; the kid-facing frame blames the wire, never a boy.
 *  - No machine judgment: this module never touches audio.
 */

export type DispatchOutcome = "acted" | "garbled" | "already_credited";

export function resolveDispatch(
  d: Dispatch,
  sender: Profile,
  receiver: Profile,
  chosenOption: number,
  day: number,
): DispatchOutcome {
  if (d.credited) return "already_credited";
  const understood = chosenOption === d.check.answer;
  if (!understood) {
    d.status = "garbled";
    return "garbled";
  }
  d.status = "acted";
  d.credited = true; // exactly once
  for (const id of d.targetItems) {
    // a dispatch IS an in-message production — it qualifies toward prod-solid
    // (09 §13.3); the receiver gets a plain recognition credit.
    review(sender, id, "prod", true, day, /*inMessage*/ true);
    review(receiver, id, "rec", true, day);
  }
  return "acted";
}

/** A repeat request resets a garbled dispatch for another listen —
 *  free, unlimited, and itself authentic conversational repair. */
export function requestRepeat(d: Dispatch): void {
  if (d.status === "garbled") d.status = "delivered";
}
