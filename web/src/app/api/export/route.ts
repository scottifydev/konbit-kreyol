import { NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";

/** GET — the family export ("stays in the family", 06 §1 / voice law 6).
 *  Returns the full family state as a downloadable JSON. Audio lives in the
 *  private bucket and is exported separately; this is the data archive. */
export async function GET() {
  const state = await getStore().load();
  return new NextResponse(JSON.stringify(state, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="konbit-kreyol-export.json"',
    },
  });
}
