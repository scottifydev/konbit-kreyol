import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { guardFamily } from "@/lib/session";

/** Audio streaming — family-only (voice law 6). Requires an authenticated
 *  family session so a stranger can never reach the boys' recordings; the
 *  Supabase build additionally moves to signed bucket URLs. */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ ref: string }> },
) {
  const denied = await guardFamily();
  if (denied) return denied;
  const { ref } = await ctx.params;
  if (ref.includes("/") || ref.includes("..")) {
    return new NextResponse(null, { status: 400 });
  }
  const audio = await getStore().readAudio(ref);
  if (!audio) return new NextResponse(null, { status: 404 });
  return new NextResponse(Buffer.from(audio.data), {
    headers: { "Content-Type": audio.mime },
  });
}
