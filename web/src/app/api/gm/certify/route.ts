import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";

/** Certify one Kreyòl string (Manman's pass). GM LAW 1 BY CONSTRUCTION:
 *  this endpoint writes ONLY the certification overlay — it has no access
 *  path to profiles, ledgers, konbit state, or thresholds. */
export async function POST(req: NextRequest) {
  const { key, certified } = await req.json();
  if (typeof key !== "string" || !key.match(/^(ui|post|unit|kanpay):/)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const store = getStore();
  const state = await store.load();
  state.certified[key] = certified !== false;
  await store.save(state);
  return NextResponse.json({ ok: true, key, certified: state.certified[key] });
}
