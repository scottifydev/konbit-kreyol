import { NextRequest } from "next/server";
import { getStore } from "@/lib/store/local";
import { HttpError } from "@/lib/store/adapter";
import { itemState, review } from "@/lib/engine/srs";
import { practiceToday } from "@/lib/engine/konbit";
import { guardBoy } from "@/lib/session";
import { txJson } from "@/lib/tx";

/** POST { boy, id, ok } — a recognition self-mark (Entwodiksyon / Rekonet,
 *  09 §13.2). Writes the rec ledger ONLY if the item is due (the Leitner
 *  interval is the anti-spam); a miss is the gentle 2-miss demotion. */
export async function POST(req: NextRequest) {
  const { boy, id, ok } = await req.json().catch(() => ({}));
  const denied = await guardBoy(boy);
  if (denied) return denied;
  return txJson(getStore(), (state) => {
    const p = state.profiles[boy];
    if (!p || p.kind !== "boy" || typeof id !== "string") throw new HttpError(400);
    const due = itemState(p, id).rec.due <= state.day;
    if (due) {
      review(p, id, "rec", ok === true, state.day);
      if (ok === true) practiceToday(p, state.konbit, state.day);
    }
    return { ok: true, counted: due };
  });
}
