import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { itemState, review } from "@/lib/engine/srs";
import { practiceToday } from "@/lib/engine/konbit";
import { guardBoy } from "@/lib/session";

/** POST { boy, id, ok } — a recognition self-mark (Entwodiksyon / Rekonet,
 *  09 §13.2). Lawful for reception (the Fil-la model): the boy judges whether
 *  he recalled the meaning. Writes the rec ledger ONLY if the item is due (the
 *  Leitner interval is the anti-spam); a miss is the shipped gentle 2-miss
 *  demotion, not a penalty. */
export async function POST(req: NextRequest) {
  const { boy, id, ok } = await req.json().catch(() => ({}));
  const denied = await guardBoy(boy);
  if (denied) return denied;
  const store = getStore();
  const state = await store.load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy" || typeof id !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const due = itemState(p, id).rec.due <= state.day;
  if (due) {
    review(p, id, "rec", ok === true, state.day);
    if (ok === true) practiceToday(p, state.konbit, state.day);
  }
  await store.save(state);
  return NextResponse.json({ ok: true, counted: due });
}
