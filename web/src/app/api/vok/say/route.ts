import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { HttpError } from "@/lib/store/adapter";
import { guardBoy } from "@/lib/session";
import { txJson } from "@/lib/tx";

/** POST multipart { audio, boy, id } — Di li verbal practice (09 §13.2). The
 *  recording is stored in the family's private bucket for family feedback and
 *  by-ear self-compare. NO MACHINE JUDGES IT — writes no ledger, only the
 *  audio ref. Upload happens BEFORE the transaction so a write retry never
 *  re-uploads. */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const boy = String(form.get("boy") ?? "");
  const denied = await guardBoy(boy);
  if (denied) return denied;
  const id = String(form.get("id") ?? "x");
  const file = form.get("audio");
  if (!(file instanceof Blob)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const store = getStore();
  const buf = new Uint8Array(await file.arrayBuffer());
  const ref = await store.saveAudio(
    `vok-${boy}-${id}-${Date.now()}`,
    buf,
    file.type || "audio/webm",
  );
  return txJson(store, (state) => {
    const p = state.profiles[boy];
    if (!p || p.kind !== "boy") throw new HttpError(400);
    p.vocAudio = [...(p.vocAudio ?? []), ref];
    return { ok: true, ref };
  });
}
