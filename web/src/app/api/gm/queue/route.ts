import { NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { allUiStrings } from "@/lib/chrome";
import { POSTS } from "@/data/posts";
import { KANPAY } from "@/data/kanpay";
import scopeData from "@/data/scope.json";
import type { ScopeItem } from "@/lib/engine/types";

const SCOPE = (scopeData as { items: ScopeItem[] }).items;

interface QueueItem {
  key: string;
  kind: string;
  ht: string | null;
  en: string;
  certified: boolean;
  unit?: number;
}

/** The Cipher Office queue — every Kreyòl draft awaiting Manman's pass, plus
 *  the scope-bank lexicon pass (the family-idiolect review of the whole item
 *  bank, `08` §4 — the gate that unblocks all recognition-leg learning
 *  content). ADULT SURFACE (kid copy law does not apply). */
export async function GET() {
  const state = await getStore().load();
  const cert = (key: string) => !!state.certified[key];
  const queue: QueueItem[] = [];

  for (const [key, s] of Object.entries(allUiStrings())) {
    if (s.needsReview) {
      queue.push({
        key: `ui:${key}`,
        kind: s.ht === null ? "open ticket" : "chrome",
        ht: s.ht,
        en: s.en,
        certified: cert(`ui:${key}`),
      });
    }
  }
  for (const p of POSTS) {
    if (p.needsReview) {
      queue.push({
        key: `post:${p.id}`,
        kind: "feed",
        ht: p.ht.map((seg) => seg[0]).join(""),
        en: p.en,
        certified: cert(`post:${p.id}`),
        unit: p.u,
      });
    }
  }
  for (const ch of KANPAY) {
    if (ch.needsReview && ch.nameHt) {
      queue.push({
        key: `kanpay:ch${ch.n}-name`,
        kind: "chapter name",
        ht: ch.nameHt,
        en: ch.nameEn,
        certified: cert(`kanpay:ch${ch.n}-name`),
        unit: ch.unit,
      });
    }
    for (const sc of ch.scenes) {
      for (const line of sc.htLines) {
        const key = `scene:${sc.id}:${line.ticket}`;
        queue.push({
          key,
          kind: "scene",
          ht: line.ht,
          en: line.ticket,
          certified: cert(key),
          unit: ch.unit,
        });
      }
    }
  }
  // The lexicon pass — the whole scope bank, family-idiolect review.
  for (const it of SCOPE) {
    queue.push({
      key: `scope:${it.id}`,
      kind: "lexicon",
      ht: it.id, // the Kreyòl form is the id
      en: it.en,
      certified: cert(`scope:${it.id}`),
      unit: it.u,
    });
  }
  return NextResponse.json({ queue });
}
