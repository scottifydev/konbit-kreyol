import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { HttpError } from "@/lib/store/adapter";
import { review } from "@/lib/engine/srs";
import { practiceToday } from "@/lib/engine/konbit";
import { compareKreyol } from "@/lib/normalize";
import { guardBoy } from "@/lib/session";
import { txJson } from "@/lib/tx";

/** POST { boy, id, answer, rung } — typed production (Tape, 09 §13.2).
 *  - COLD + exact  → writes prod TRUE (the only rung that advances the box).
 *  - assist + exact → XP only, no write.
 *  - accent-only near-miss → free retry, no write.
 *  - real cold miss → prod FALSE (gentle demotion) + reveal.
 *  Typed text is NOT voice — lawful, never touches audio. */
export async function POST(req: NextRequest) {
  const { boy, id, answer, rung } = await req.json().catch(() => ({}));
  const denied = await guardBoy(boy);
  if (denied) return denied;
  if (typeof id !== "string" || typeof answer !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const cold = rung === "cold";
  const { exact, close } = compareKreyol(answer, id);

  // outcomes that write NOTHING need no transaction
  if (exact && !cold) return NextResponse.json({ ok: true, correct: true, assisted: true });
  if (!exact && close) return NextResponse.json({ ok: true, correct: false, close: true });

  // outcomes that touch the prod ledger — atomic
  return txJson(getStore(), (state) => {
    const p = state.profiles[boy];
    if (!p || p.kind !== "boy") throw new HttpError(400);
    if (exact) {
      review(p, id, "prod", true, state.day); // isolated typed production
      practiceToday(p, state.konbit, state.day);
      return { ok: true, correct: true, assisted: false };
    }
    if (cold) review(p, id, "prod", false, state.day); // real miss → gentle demote
    return { ok: true, correct: false, close: false, answer: id };
  });
}
