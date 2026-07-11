import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";

/** POST multipart { audio, boy, id } — Di li verbal practice (09 §13.2, the
 *  owner's verbal steer). The boy says the word aloud; the recording is stored
 *  in the family's private bucket for family feedback and his own by-ear
 *  self-compare. NO MACHINE EVER JUDGES IT — this writes NO ledger, only keeps
 *  the audio (voice law). */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const boy = String(form.get("boy") ?? "");
  const id = String(form.get("id") ?? "x");
  const file = form.get("audio");
  const store = getStore();
  const state = await store.load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy" || !(file instanceof Blob)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const buf = new Uint8Array(await file.arrayBuffer());
  const ref = await store.saveAudio(
    `vok-${boy}-${id}-${state.day}`,
    buf,
    file.type || "audio/webm",
  );
  p.vocAudio = [...(p.vocAudio ?? []), ref];
  await store.save(state);
  return NextResponse.json({ ok: true, ref });
}
