import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { review } from "@/lib/engine/srs";
import { practiceToday } from "@/lib/engine/konbit";
import { compareKreyol } from "@/lib/normalize";
import { guardBoy } from "@/lib/session";

/** POST { boy, id, answer, rung } — typed production (Tape, 09 §13.2). The
 *  server holds the answer; the boy types the Kreyòl.
 *  - COLD rung + exact  → writes prod TRUE (the only rung that advances the
 *    production ledger; isolated Tape is not in-message, so no m flag).
 *  - assisted rung (hint) + exact → XP only, writes NOTHING (assist rungs
 *    never touch a box — the anti-faking rule, 09 §13.2).
 *  - diacritic-only near-miss → free retry, writes nothing, reveals nothing.
 *  - real miss → prod FALSE on a cold attempt (gentle 2-miss demotion) and
 *    reveals the answer so he learns.
 *  Typed text is NOT voice — this is lawful and never touches audio. */
export async function POST(req: NextRequest) {
  const { boy, id, answer, rung } = await req.json().catch(() => ({}));
  const denied = await guardBoy(boy);
  if (denied) return denied;
  const store = getStore();
  const state = await store.load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy" || typeof id !== "string" || typeof answer !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const cold = rung === "cold";
  const { exact, close } = compareKreyol(answer, id);

  if (exact) {
    if (cold) {
      review(p, id, "prod", true, state.day); // isolated typed production
      practiceToday(p, state.konbit, state.day);
    }
    await store.save(state);
    return NextResponse.json({ ok: true, correct: true, assisted: !cold });
  }
  if (close) {
    // near-miss (accent only): a free retry, never credited, never demoted
    return NextResponse.json({ ok: true, correct: false, close: true });
  }
  if (cold) review(p, id, "prod", false, state.day); // real miss → gentle demote
  await store.save(state);
  return NextResponse.json({ ok: true, correct: false, close: false, answer: id });
}
