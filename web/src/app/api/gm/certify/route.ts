import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { CERT_KEY } from "@/lib/certifyKeys";
import { guardAdult } from "@/lib/session";

/** Certify Kreyòl (Manman's pass). GM LAW 1 BY CONSTRUCTION: this endpoint
 *  writes ONLY the certification overlay — it has no access path to profiles,
 *  ledgers, konbit state, or thresholds. */

export async function POST(req: NextRequest) {
  const denied = await guardAdult(); // only the Cipher Office may certify (native gate)
  if (denied) return denied;
  const body = await req.json();
  const certified = body.certified !== false;
  // Batch { keys: [...] } (a reviewed lexicon subset) or single { key }.
  const keys: string[] = Array.isArray(body.keys)
    ? body.keys
    : typeof body.key === "string"
      ? [body.key]
      : [];
  const valid = keys.filter((k) => typeof k === "string" && CERT_KEY.test(k));
  if (valid.length === 0) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const store = getStore();
  const state = await store.load();
  for (const k of valid) state.certified[k] = certified;
  await store.save(state);
  return NextResponse.json({ ok: true, count: valid.length, certified });
}
