import { NextRequest } from "next/server";
import { getStore } from "@/lib/store/local";
import { HttpError } from "@/lib/store/adapter";
import { resolveDispatch, requestRepeat } from "@/lib/engine/dispatch";
import { landVolley, practiceToday } from "@/lib/engine/konbit";
import { sessionAllows } from "@/lib/session";
import { txJson } from "@/lib/tx";

/** POST { option } — the receiver acts on the dispatch. The server compares
 *  against the paired check and credits both ledgers exactly once on success
 *  (voice laws 1–2). A garble writes nothing and the retry is free.
 *  POST { repeat: true } — reset a garbled dispatch for another listen.
 *  Atomic: on a write conflict the mutator re-runs on fresh state, and
 *  resolveDispatch is idempotent (checks d.credited), so it credits once. */
export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const body = await req.json();
  return txJson(getStore(), async (state) => {
    const d = state.dispatches.find((x) => x.id === id);
    if (!d) throw new HttpError(404);
    if (!(await sessionAllows(d.receiver))) throw new HttpError(401); // receiver acts

    if (body.repeat === true) {
      requestRepeat(d);
      return { ok: true, status: d.status };
    }
    const option = Number(body.option);
    if (!Number.isInteger(option)) throw new HttpError(400);

    const sender = state.profiles[d.sender];
    const receiver = state.profiles[d.receiver];
    const outcome = resolveDispatch(d, sender, receiver, option, state.day);
    if (outcome === "acted") {
      practiceToday(receiver, state.konbit, state.day);
      // acting on a dispatch IS a listening-leg voice-volley (09 §4)
      landVolley(state.konbit, d.receiver, true);
    }
    return { ok: true, outcome, status: d.status };
  });
}
