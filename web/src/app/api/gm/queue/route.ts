import { NextResponse } from "next/server";
import { getStore } from "@/lib/store/local";
import { allUiStrings } from "@/lib/chrome";
import { POSTS } from "@/data/posts";
import { KANPAY } from "@/data/kanpay";

/** The Cipher Office queue — every Kreyòl draft awaiting Manman's pass.
 *  ADULT SURFACE (kid copy law does not apply). Auth is the Supabase gate
 *  in production; local dev is family-machine-only. */
export async function GET() {
  const state = await getStore().load();
  const queue: {
    key: string;
    kind: string;
    ht: string | null;
    en: string;
    certified: boolean;
  }[] = [];

  for (const [key, s] of Object.entries(allUiStrings())) {
    if (s.needsReview) {
      queue.push({
        key: `ui:${key}`,
        kind: s.ht === null ? "open ticket — no draft (Manman coins)" : "chrome draft",
        ht: s.ht,
        en: s.en,
        certified: !!state.certified[`ui:${key}`],
      });
    }
  }
  for (const p of POSTS) {
    if (p.needsReview) {
      queue.push({
        key: `post:${p.id}`,
        kind: "feed post",
        ht: p.ht.map((seg) => seg[0]).join(""),
        en: p.en,
        certified: !!state.certified[`post:${p.id}`],
      });
    }
  }
  for (const ch of KANPAY) {
    if (ch.needsReview && ch.nameHt) {
      queue.push({
        key: `kanpay:ch${ch.n}-name`,
        kind: "chapter name (see spelling flags in 01-world-and-story.md)",
        ht: ch.nameHt,
        en: ch.nameEn,
        certified: !!state.certified[`kanpay:ch${ch.n}-name`],
      });
    }
    for (const sc of ch.scenes) {
      for (const line of sc.htLines) {
        queue.push({
          key: `scene:${sc.id}:${line.ticket}`,
          kind: "open ticket — scene Kreyòl (Manman authors or approves)",
          ht: line.ht,
          en: line.ticket,
          certified: false,
        });
      }
    }
  }
  return NextResponse.json({ queue });
}
