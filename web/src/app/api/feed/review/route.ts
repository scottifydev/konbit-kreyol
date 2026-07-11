import { NextRequest } from "next/server";
import { getStore } from "@/lib/store/local";
import { HttpError } from "@/lib/store/adapter";
import { itemState, review } from "@/lib/engine/srs";
import { practiceToday } from "@/lib/engine/konbit";
import { guardBoy } from "@/lib/session";
import { txJson } from "@/lib/tx";

/** POST { boy, id } — a due-signal review from the feed (the Revi step). Writes
 *  a receptive review ONLY if the item is due today; the Leitner interval then
 *  pushes its next due date out, so a word can't be spam-reviewed within a day.
 *  A recognition retrieval in context, never a self-report of mastery. */
export async function POST(req: NextRequest) {
  const { boy, id } = await req.json().catch(() => ({}));
  const denied = await guardBoy(boy);
  if (denied) return denied;
  return txJson(getStore(), (state) => {
    const p = state.profiles[boy];
    if (!p || p.kind !== "boy" || typeof id !== "string") throw new HttpError(400);
    const counted = itemState(p, id).rec.due <= state.day;
    if (counted) {
      review(p, id, "rec", true, state.day);
      practiceToday(p, state.konbit, state.day);
    }
    return { ok: true, counted };
  });
}
