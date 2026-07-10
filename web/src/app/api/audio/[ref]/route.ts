import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";

/** Audio streaming. Local dev only; the Supabase build replaces this with
 *  signed bucket URLs — private, family-only (voice law 6). */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ ref: string }> },
) {
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
