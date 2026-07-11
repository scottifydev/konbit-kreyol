import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { gotIt } from "@/lib/engine/srs";
import { practiceToday } from "@/lib/engine/konbit";
import { guardBoy } from "@/lib/session";

/** POST { boy, postId, items } — the boy reacts to a feed post ("Got it").
 *  This writes a receptive review on the post's items EXACTLY ONCE per post
 *  per profile (idempotent — gotIt returns false on a repeat; the v6-4 double-
 *  write trap, 06 §5.2) and counts the day for the shared streak. A reaction
 *  is a receptive retrieval hidden in the scroll; it is never announced as a
 *  test and never a self-report of mastery. */
export async function POST(req: NextRequest) {
  const { boy, postId, items } = await req.json().catch(() => ({}));
  const denied = await guardBoy(boy);
  if (denied) return denied;
  const store = getStore();
  const state = await store.load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy" || typeof postId !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const counted = gotIt(p, postId, Array.isArray(items) ? items : [], state.day);
  if (counted) practiceToday(p, state.konbit, state.day);
  await store.save(state);
  return NextResponse.json({ ok: true, counted });
}
