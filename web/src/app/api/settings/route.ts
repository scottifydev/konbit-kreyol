import { NextRequest } from "next/server";
import { getStore } from "@/lib/store/local";
import { HttpError } from "@/lib/store/adapter";
import { guardBoy } from "@/lib/session";
import { txJson } from "@/lib/tx";

/** POST { boy, pwoMode } — set a boy's Pro mode (hides the point counts;
 *  09 §6: XP is decoupled from mastery, so nothing else changes). */
export async function POST(req: NextRequest) {
  const { boy, pwoMode } = await req.json().catch(() => ({}));
  const denied = await guardBoy(boy);
  if (denied) return denied;
  return txJson(getStore(), (state) => {
    const p = state.profiles[boy];
    if (!p) throw new HttpError(400);
    p.pwoMode = pwoMode === true;
    return { ok: true, pwoMode: p.pwoMode };
  });
}
