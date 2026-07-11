import { NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { guardAdult } from "@/lib/session";

/** GET — the family export ("stays in the family", 06 §1 / voice law 6).
 *  Returns the full family state as a downloadable JSON. Audio lives in the
 *  private bucket and is exported separately; this is the data archive. */
export async function GET() {
  const denied = await guardAdult(); // the full family archive — adult only
  if (denied) return denied;
  const state = await getStore().load();
  return new NextResponse(JSON.stringify(state, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="konbit-kreyol-export.json"',
    },
  });
}
