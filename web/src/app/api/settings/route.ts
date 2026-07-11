import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { guardBoy } from "@/lib/session";

/** POST { boy, pwoMode } — set a boy's Pro mode (hides the point counts;
 *  09 §6: XP is decoupled from mastery, so nothing else changes — a test
 *  asserts every gate resolves identically with XP hidden). */
export async function POST(req: NextRequest) {
  const { boy, pwoMode } = await req.json().catch(() => ({}));
  const denied = await guardBoy(boy);
  if (denied) return denied;
  const store = getStore();
  const state = await store.load();
  const p = state.profiles[boy];
  if (!p) return NextResponse.json({ ok: false }, { status: 400 });
  p.pwoMode = pwoMode === true;
  await store.save(state);
  return NextResponse.json({ ok: true, pwoMode: p.pwoMode });
}
