import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { KANPAY, type DispatchPrompt } from "@/data/kanpay";
import type { Dispatch } from "@/lib/engine/types";
import { HttpError } from "@/lib/store/adapter";
import { guardBoy } from "@/lib/session";
import { txJson } from "@/lib/tx";

function findPrompt(promptId: string): DispatchPrompt | null {
  for (const ch of KANPAY)
    for (const sc of ch.scenes)
      if (sc.dispatchPrompt?.id === promptId) return sc.dispatchPrompt;
  return null;
}

/** POST — record + send a dispatch (multipart: audio, sender, receiver,
 *  promptId). The prompt/check pair comes from content data — the client
 *  never supplies target items or answers. */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const audio = form.get("audio");
  const sender = String(form.get("sender") ?? "");
  const receiver = String(form.get("receiver") ?? "");
  const promptId = String(form.get("promptId") ?? "");
  if (!(audio instanceof Blob) || !sender || !receiver) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const denied = await guardBoy(sender); // you send only as yourself
  if (denied) return denied;
  const prompt = findPrompt(promptId);
  if (!prompt) return NextResponse.json({ ok: false }, { status: 404 });

  const store = getStore();
  // upload BEFORE the transaction so a write retry never re-uploads
  const id = `d${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const bytes = new Uint8Array(await audio.arrayBuffer());
  const audioRef = await store.saveAudio(id, bytes, audio.type || "audio/webm");

  return txJson(store, (state) => {
    if (!state.profiles[sender] || !state.profiles[receiver]) {
      throw new HttpError(400);
    }
    const dispatch: Dispatch = {
      id,
      sender,
      receiver,
      promptId,
      targetItems: prompt.targetItems,
      audioRef,
      status: "delivered",
      credited: false,
      createdDay: state.day,
      check: prompt.check,
      replies: [],
    };
    state.dispatches.push(dispatch);
    return { ok: true, id };
  });
}

/** GET ?for=<profile> — inbox + sent, SANITIZED: the check's answer index
 *  never leaves the server (comprehension is proven by action against the
 *  server, voice law 2). */
export async function GET(req: NextRequest) {
  const who = req.nextUrl.searchParams.get("for") ?? "";
  const denied = await guardBoy(who);
  if (denied) return denied;
  const state = await getStore().load();
  const list = state.dispatches
    .filter((d) => d.receiver === who || d.sender === who)
    .map((d) => ({
      id: d.id,
      sender: d.sender,
      receiver: d.receiver,
      status: d.status,
      audioRef: d.audioRef,
      check: { question: d.check.question, options: d.check.options },
      replies: d.replies,
      commendation: d.commendation ?? null,
    }));
  return NextResponse.json({ dispatches: list });
}
