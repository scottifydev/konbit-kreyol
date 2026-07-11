import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { seedTiers } from "@/lib/engine/srs";
import scopeData from "@/data/scope.json";
import type { ScopeItem } from "@/lib/engine/types";

const SCOPE = (scopeData as { items: ScopeItem[] }).items;

/** The ticket (build-plan issue 4). Two shapes:
 *
 *  - multipart { audio, slot }: store a production recording (read-aloud /
 *    describe-the-camp). Kept for the Cipher Office to score BY EAR — never
 *    machine-judged (voice law 3). Returns the ref.
 *  - JSON { action: "finish", boy }: close the intake. Until the reference
 *    audio exists and Manman scores the recordings, the track is provisional
 *    (Moderate ~450) and the Kle-77 core is seeded to Tier A (the register-
 *    independent words to link first). Sets diagDone; the Cipher Office
 *    refines the track later. No self-report ever sets mastery.
 */
export async function POST(req: NextRequest) {
  const store = getStore();
  const state = await store.load();
  const ctype = req.headers.get("content-type") ?? "";

  if (ctype.includes("multipart/form-data")) {
    const form = await req.formData();
    const boy = String(form.get("boy") ?? "");
    const slot = String(form.get("slot") ?? "x");
    const file = form.get("audio");
    const p = state.profiles[boy];
    if (!p || p.kind !== "boy" || !(file instanceof Blob)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const buf = new Uint8Array(await file.arrayBuffer());
    const ref = await store.saveAudio(
      `ticket-${boy}-${slot}`,
      buf,
      file.type || "audio/webm",
    );
    p.diagAudio = [...(p.diagAudio ?? []), ref];
    await store.save(state);
    return NextResponse.json({ ok: true, ref });
  }

  const { action, boy } = await req.json().catch(() => ({}));
  const p = state.profiles[boy];
  if (action !== "finish" || !p || p.kind !== "boy") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // Provisional track sizing until the Cipher Office scores the intake.
  p.band = p.band ?? "Moderate";
  for (const it of SCOPE) if (it.kle) p.tiers[it.id] = "A";
  seedTiers(p, SCOPE, state.day);
  p.diagDone = true;
  await store.save(state);
  return NextResponse.json({ ok: true, href: `/play/${boy}` });
}
