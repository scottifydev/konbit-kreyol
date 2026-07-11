import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { HttpError } from "@/lib/store/adapter";
import { seedTiers } from "@/lib/engine/srs";
import scopeData from "@/data/scope.json";
import type { ScopeItem } from "@/lib/engine/types";
import { guardBoy } from "@/lib/session";
import { txJson } from "@/lib/tx";

const SCOPE = (scopeData as { items: ScopeItem[] }).items;

/** The ticket (build-plan issue 4).
 *  - multipart { audio, slot }: store a production recording (kept for the
 *    Cipher Office to score BY EAR — never machine-judged). Upload before the
 *    transaction.
 *  - JSON { action: "finish" }: close the intake — provisional track (Moderate
 *    ~450) + Kle-77 → Tier A + diagDone. No self-report ever sets mastery. */
export async function POST(req: NextRequest) {
  const store = getStore();
  const ctype = req.headers.get("content-type") ?? "";

  if (ctype.includes("multipart/form-data")) {
    const form = await req.formData();
    const boy = String(form.get("boy") ?? "");
    const denied = await guardBoy(boy);
    if (denied) return denied;
    const slot = String(form.get("slot") ?? "x");
    const file = form.get("audio");
    if (!(file instanceof Blob)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const buf = new Uint8Array(await file.arrayBuffer());
    const ref = await store.saveAudio(
      `ticket-${boy}-${slot}-${Date.now()}`,
      buf,
      file.type || "audio/webm",
    );
    return txJson(store, (state) => {
      const p = state.profiles[boy];
      if (!p || p.kind !== "boy") throw new HttpError(400);
      p.diagAudio = [...(p.diagAudio ?? []), ref];
      return { ok: true, ref };
    });
  }

  const { action, boy } = await req.json().catch(() => ({}));
  const denied = await guardBoy(boy);
  if (denied) return denied;
  if (action !== "finish") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return txJson(store, (state) => {
    const p = state.profiles[boy];
    if (!p || p.kind !== "boy") throw new HttpError(400);
    // Provisional track sizing until the Cipher Office scores the intake.
    p.band = p.band ?? "Moderate";
    for (const it of SCOPE) if (it.kle) p.tiers[it.id] = "A";
    seedTiers(p, SCOPE, state.day);
    p.diagDone = true;
    return { ok: true, href: `/play/${boy}` };
  });
}
