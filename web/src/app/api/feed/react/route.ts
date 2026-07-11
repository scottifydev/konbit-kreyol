import { NextRequest } from "next/server";
import { getStore } from "@/lib/store/local";
import { HttpError } from "@/lib/store/adapter";
import { gotIt } from "@/lib/engine/srs";
import { practiceToday } from "@/lib/engine/konbit";
import { guardBoy } from "@/lib/session";
import { txJson } from "@/lib/tx";

/** POST { boy, postId, items } — the boy reacts to a feed post ("Got it").
 *  Writes a receptive review on the post's items EXACTLY ONCE per post per
 *  profile (idempotent) and counts the day. A retrieval hidden in the scroll,
 *  never a self-report of mastery. */
export async function POST(req: NextRequest) {
  const { boy, postId, items } = await req.json().catch(() => ({}));
  const denied = await guardBoy(boy);
  if (denied) return denied;
  return txJson(getStore(), (state) => {
    const p = state.profiles[boy];
    if (!p || p.kind !== "boy" || typeof postId !== "string") throw new HttpError(400);
    const counted = gotIt(p, postId, Array.isArray(items) ? items : [], state.day);
    if (counted) practiceToday(p, state.konbit, state.day);
    return { ok: true, counted };
  });
}
