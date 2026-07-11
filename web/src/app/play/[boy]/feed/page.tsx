import Link from "next/link";
import { notFound } from "next/navigation";
import Flip from "@/components/Flip";
import FeedClient from "./FeedClient";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";
import { POSTS } from "@/data/posts";

export const dynamic = "force-dynamic";

/** Fil la — the network's group chat, i.e. the receptive SRS hidden in a
 *  social scroll (02 §3, 09 §3). A post reaches a boy only if the native gate
 *  cleared it: needsReview === false (attested), or the Cipher Office
 *  certified it (post:<id>). Everything else is filtered out — that is the
 *  law working, so the feed grows as Manman certifies. */
export default async function FeedPage({
  params,
}: {
  params: Promise<{ boy: string }>;
}) {
  const { boy } = await params;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") notFound();

  const { unit, certified } = state;
  const c = (key: string) => chrome(key, unit, certified);
  const visible = POSTS.filter(
    (post) =>
      (post.needsReview === false || certified[`post:${post.id}`] === true) &&
      post.u <= unit + 1,
  );
  const reacted: Record<string, number> = { ...p.reactions, ...p.gotit };

  return (
    <main className="stage">
      <header className="head">
        <div>
          <div className="kicker">the network · read the traffic</div>
          <h1 className="d1 gold">
            <Flip view={c("fil")} />
          </h1>
        </div>
        <div className="meta" style={{ textAlign: "right", maxWidth: 220 }}>
          <Flip view={c("tap_hint")} />
        </div>
      </header>

      {visible.length === 0 ? (
        <div className="scrim">
          <p style={{ margin: 0, color: "#e7dcc2" }}>
            <Flip view={c("feed_warming")} />
          </p>
        </div>
      ) : (
        <FeedClient
          boy={boy}
          posts={visible.map((post) => ({
            id: post.id,
            pfp: post.pfp,
            who: post.who,
            sub: post.sub,
            tag: post.tag,
            ht: post.ht,
            en: post.en,
            items: post.items,
          }))}
          reactedIds={visible
            .filter((post) => reacted[post.id] !== undefined)
            .map((post) => post.id)}
          labels={{ gotit: c("gotit").text }}
        />
      )}

      <nav className="index label" style={{ marginTop: 26 }}>
        <Link href={`/play/${boy}`}>
          <Flip view={c("dash")} />
        </Link>
        <Link href={`/play/${boy}/dispatch`}>
          <Flip view={c("prod")} />
        </Link>
      </nav>
    </main>
  );
}
