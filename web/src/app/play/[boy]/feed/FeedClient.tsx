"use client";
import { useState } from "react";

interface WirePost {
  id: string;
  pfp: string;
  who: string;
  sub: string;
  tag: string;
  ht: [string, string?][];
  en: string;
  items: string[];
}

/** Fil la scroll. Kreyòl post content is native data (not chrome) rendered
 *  through variables — never literals. Tap a glossed word for its meaning;
 *  hold the "EN" pill for the full English (the long-press-to-English law, on
 *  content). "Got it" writes a receptive review once (idempotent server-side)
 *  — a retrieval hidden in the scroll, never announced as a test. */
export default function FeedClient({
  boy,
  posts,
  reactedIds,
  labels,
}: {
  boy: string;
  posts: WirePost[];
  reactedIds: string[];
  labels: { gotit: string };
}) {
  const [reacted, setReacted] = useState<Set<string>>(new Set(reactedIds));
  const [glossed, setGlossed] = useState<Set<string>>(new Set());
  const [showEn, setShowEn] = useState<string | null>(null);

  const toggleGloss = (key: string) =>
    setGlossed((g) => {
      const n = new Set(g);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });

  const react = async (post: WirePost) => {
    setReacted((r) => new Set(r).add(post.id)); // optimistic
    await fetch("/api/feed/react", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boy, postId: post.id, items: post.items }),
    });
  };

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id} className="panel" style={{ marginBottom: 16 }}>
          <div className="row" style={{ alignItems: "center", gap: 10 }}>
            <span aria-hidden style={{ fontSize: 24 }}>{post.pfp}</span>
            <div style={{ flex: 1 }}>
              <div className="d3">{post.who}</div>
              <div className="label">{post.sub} · {post.tag}</div>
            </div>
            <button
              className="label"
              style={{ background: "none", border: "1px solid var(--gold)", borderRadius: 4, padding: "2px 8px", cursor: "pointer", color: "var(--gold-bright)" }}
              onPointerDown={() => setShowEn(post.id)}
              onPointerUp={() => setShowEn(null)}
              onPointerLeave={() => setShowEn((s) => (s === post.id ? null : s))}
            >
              EN
            </button>
          </div>

          <p className="kreyol-body" style={{ marginTop: 10 }}>
            {showEn === post.id
              ? post.en
              : post.ht.map((seg, i) => {
                  const [text, gloss] = seg;
                  if (!gloss) return <span key={i}>{text}</span>;
                  const key = `${post.id}:${i}`;
                  const open = glossed.has(key);
                  return (
                    <button
                      key={i}
                      onPointerUp={() => toggleGloss(key)}
                      style={{ all: "unset", cursor: "pointer", borderBottom: "1px dotted var(--gold)" }}
                    >
                      {text}
                      {open && (
                        <em style={{ color: "var(--gold-bright)", fontStyle: "normal" }}>
                          {" "}({gloss})
                        </em>
                      )}
                    </button>
                  );
                })}
          </p>

          <p style={{ marginBottom: 0 }}>
            {reacted.has(post.id) ? (
              <span className="goldband">✓</span>
            ) : (
              <button className="cta sun" onPointerUp={() => react(post)}>
                {labels.gotit}
              </button>
            )}
          </p>
        </article>
      ))}
    </div>
  );
}
