import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { resolveDispatch, requestRepeat } from "@/lib/engine/dispatch";
import { landVolley, practiceToday } from "@/lib/engine/konbit";
import { guardBoy } from "@/lib/session";

/** POST { option } — the receiver acts on the dispatch. The server compares
 *  against the paired check and credits both ledgers exactly once on
 *  success (voice laws 1–2). A garble writes nothing and the retry is free.
 *  POST { repeat: true } — reset a garbled dispatch for another listen. */
export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const body = await req.json();
  const store = getStore();
  const state = await store.load();
  const d = state.dispatches.find((x) => x.id === id);
  if (!d) return NextResponse.json({ ok: false }, { status: 404 });
  const denied = await guardBoy(d.receiver); // only the receiver acts on it
  if (denied) return denied;

  if (body.repeat === true) {
    requestRepeat(d);
    await store.save(state);
    return NextResponse.json({ ok: true, status: d.status });
  }

  const option = Number(body.option);
  if (!Number.isInteger(option)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const sender = state.profiles[d.sender];
  const receiver = state.profiles[d.receiver];
  const outcome = resolveDispatch(d, sender, receiver, option, state.day);
  if (outcome === "acted") {
    practiceToday(receiver, state.konbit, state.day);
    // Acting on a dispatch IS a listening-leg voice-volley (09 §4): if the
    // receiver has a dealt, unfinished leg, this correct act lands a volley.
    // A garble lands nothing (handled by resolveDispatch returning "garbled").
    landVolley(state.konbit, d.receiver, true);
  }
  await store.save(state);
  return NextResponse.json({ ok: true, outcome, status: d.status });
}
