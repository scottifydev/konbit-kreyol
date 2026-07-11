import { NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { guardAdult } from "@/lib/session";

/** GET — every recording the boys have made, for the Cipher Office to hear
 *  and give voice feedback on (her actual job; the app tells the boys she
 *  "scores by ear"). Adult-only. Audio streams via /api/audio/[ref], which is
 *  family-gated. Nothing here judges a voice — it only lists it. */
export async function GET() {
  const denied = await guardAdult();
  if (denied) return denied;
  const state = await getStore().load();

  const recordings: { boy: string; kind: string; ref: string; label: string }[] = [];

  for (const d of state.dispatches) {
    if (d.audioRef) {
      recordings.push({
        boy: d.sender,
        kind: "dispatch",
        ref: d.audioRef,
        label: `→ ${state.profiles[d.receiver]?.name ?? d.receiver} · ${d.status}`,
      });
    }
  }
  for (const p of Object.values(state.profiles)) {
    if (p.kind !== "boy") continue;
    for (const ref of p.diagAudio ?? [])
      recordings.push({ boy: p.id, kind: "ticket", ref, label: "the camp" });
    for (const ref of p.vocAudio ?? [])
      recordings.push({ boy: p.id, kind: "di li", ref, label: "said aloud" });
  }

  return NextResponse.json({ recordings });
}
