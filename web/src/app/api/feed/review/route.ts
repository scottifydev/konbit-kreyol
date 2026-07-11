import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { itemState, review } from "@/lib/engine/srs";
import { practiceToday } from "@/lib/engine/konbit";
import { guardBoy } from "@/lib/session";

/** POST { boy, id } — a due-signal review from the feed (the Revi step). Writes
 *  a receptive review on the scope item ONLY if it is genuinely due today; the
 *  Leitner interval then pushes its next due date out, so a word can't be
 *  spam-reviewed for extra credit within a day (the SRS is the anti-cheat).
 *  A recognition retrieval in context, never a self-report of mastery. */
export async function POST(req: NextRequest) {
  const { boy, id } = await req.json().catch(() => ({}));
  const denied = await guardBoy(boy);
  if (denied) return denied;
  const store = getStore();
  const state = await store.load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy" || typeof id !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const counted = itemState(p, id).rec.due <= state.day;
  if (counted) {
    review(p, id, "rec", true, state.day);
    practiceToday(p, state.konbit, state.day);
  }
  await store.save(state);
  return NextResponse.json({ ok: true, counted });
}
