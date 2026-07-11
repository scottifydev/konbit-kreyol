import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { cardFor, dueItems, dueProd, itemState } from "@/lib/engine/srs";
import scopeData from "@/data/scope.json";
import { guardBoy } from "@/lib/session";
import type { ScopeItem } from "@/lib/engine/types";

const SCOPE = (scopeData as { items: ScopeItem[] }).items;
const SESSION_CAP = 10;

/** GET ?for=<boy> — today's VOKABILE session (09 §13.5). Interleaves due
 *  RECOGNITION items (dueItems) and due PRODUCTION items (dueProd, which only
 *  opens once rec-solid), restricted to words that cleared the Cipher Office
 *  lexicon pass, and picks each one's card kind with the pure cardFor()
 *  selector. Message-building rungs (kloz/bati) need certified frames, which
 *  do not exist yet, so hasFrame is false and cardFor yields only word-level
 *  kinds (entwodiksyon / rekonet / tape) for now.
 *
 *  NOTE (v1): the Kreyòl form (id) is sent for tape cards too; the boys are
 *  learners of their own ledgers, not adversaries — devtools "cheating" only
 *  shortchanges their own practice. A token indirection can harden this later. */
export async function GET(req: NextRequest) {
  const boy = req.nextUrl.searchParams.get("for") ?? "";
  const denied = await guardBoy(boy);
  if (denied) return denied;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const { unit, certified, day } = state;
  const isCertified = (id: string) => certified[`scope:${id}`] === true;

  const rec = dueItems(p, SCOPE, unit, day).filter((i) => isCertified(i.id));
  const prod = dueProd(p, SCOPE, unit, day).filter((i) => isCertified(i.id));

  const seen = new Set<string>();
  const items: ScopeItem[] = [];
  for (const i of [...prod, ...rec]) {
    if (!seen.has(i.id)) {
      seen.add(i.id);
      items.push(i);
    }
  }

  const cards = items.slice(0, SESSION_CAP).map((i) => ({
    id: i.id,
    en: i.en,
    kind: cardFor(itemState(p, i.id), /*hasFrame*/ false),
  }));

  return NextResponse.json({ ok: true, cards });
}
