"use client";
import { useCallback, useEffect, useState } from "react";
import HoldToRecord from "@/components/HoldToRecord";

type Kind = "entwodiksyon" | "rekonet" | "tape" | "kloz" | "bati";
interface Card {
  id: string; // the Kreyòl form (also the answer for tape — v1, see session route)
  en: string;
  kind: Kind;
}
interface Labels {
  meet: string;
  reveal: string;
  knew: string;
  missed: string;
  typePrompt: string;
  check: string;
  hint: string;
  close: string;
  next: string;
  say: string;
  sayDone: string;
  done: string;
  empty: string;
  hold: string;
  denied: string[];
}

/** The VOKABILE drill (09 §13). One card at a time. Recognition self-marks
 *  write the rec ledger; typed production (cold) writes prod; Di li records
 *  the boy saying it aloud (stored, never machine-judged). All chrome passed
 *  in as plain strings — zero Kreyòl literals; the Kreyòl shown is card data. */
export default function VokClient({ boy, labels }: { boy: string; labels: Labels }) {
  const [cards, setCards] = useState<Card[] | null>(null);
  const [i, setI] = useState(0);

  // per-card transient state
  const [revealed, setRevealed] = useState(false);
  const [typed, setTyped] = useState("");
  const [hinted, setHinted] = useState(false);
  const [result, setResult] = useState<null | "correct" | "close" | "miss">(null);
  const [said, setSaid] = useState(false);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    fetch(`/api/vok/session?for=${boy}`)
      .then((r) => r.json())
      .then((d) => setCards(d.ok ? d.cards : []));
  }, [boy]);

  const resetCard = useCallback(() => {
    setRevealed(false);
    setTyped("");
    setHinted(false);
    setResult(null);
    setSaid(false);
    setRecording(false);
  }, []);

  const next = () => {
    resetCard();
    setI((n) => n + 1);
  };

  const rec = async (ok: boolean) => {
    const card = cards![i];
    await fetch("/api/vok/rec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boy, id: card.id, ok }),
    });
    next();
  };

  const submitType = async () => {
    const card = cards![i];
    const res = await fetch("/api/vok/type", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ boy, id: card.id, answer: typed, rung: hinted ? "hint" : "cold" }),
    });
    const d = await res.json();
    setResult(d.correct ? "correct" : d.close ? "close" : "miss");
  };

  const say = async (blob: Blob) => {
    const card = cards![i];
    const form = new FormData();
    form.append("audio", blob, "say.webm");
    form.append("boy", boy);
    form.append("id", card.id);
    await fetch("/api/vok/say", { method: "POST", body: form });
    setSaid(true);
    setRecording(false);
  };

  if (cards === null) return <div className="panel"><p style={{ margin: 0 }}>…</p></div>;
  if (cards.length === 0)
    return (
      <div className="scrim">
        <p style={{ margin: 0, color: "#e7dcc2" }}>{labels.empty}</p>
      </div>
    );
  if (i >= cards.length)
    return (
      <div className="panel">
        <div className="goldband">{labels.done}</div>
      </div>
    );

  const card = cards[i];

  // The Di li verbal strand — available on every card, never required.
  const diLi = (
    <div style={{ marginTop: 14, borderTop: "1px solid var(--hair)", paddingTop: 12 }}>
      {said ? (
        <span className="goldband">{labels.sayDone} ✓</span>
      ) : recording ? (
        <HoldToRecord labels={{ idle: labels.hold, denied: labels.denied }} onRecorded={say} />
      ) : (
        <button className="cta" onPointerUp={() => setRecording(true)}>
          {labels.say}
        </button>
      )}
    </div>
  );

  return (
    <div className="panel">
      <div className="label">{i + 1} / {cards.length}</div>

      {card.kind === "entwodiksyon" && (
        <>
          <div className="label" style={{ color: "var(--gold-bright)" }}>{labels.meet}</div>
          <p className="kreyol-body" style={{ fontSize: 30, margin: "10px 0" }}>{card.id}</p>
          <p style={{ color: "#c9bfa6", marginTop: 0 }}>{card.en}</p>
          {diLi}
          <p style={{ marginTop: 16, marginBottom: 0 }}>
            <button className="cta sun" onPointerUp={() => rec(true)}>{labels.next}</button>
          </p>
        </>
      )}

      {card.kind === "rekonet" && (
        <>
          <p className="kreyol-body" style={{ fontSize: 30, margin: "10px 0" }}>{card.id}</p>
          {!revealed ? (
            <button className="cta" onPointerUp={() => setRevealed(true)}>{labels.reveal}</button>
          ) : (
            <>
              <p style={{ color: "#c9bfa6" }}>{card.en}</p>
              {diLi}
              <p style={{ marginTop: 16, marginBottom: 0, display: "flex", gap: 10 }}>
                <button className="cta sun" onPointerUp={() => rec(true)}>{labels.knew}</button>
                <button className="cta" onPointerUp={() => rec(false)}>{labels.missed}</button>
              </p>
            </>
          )}
        </>
      )}

      {card.kind === "tape" && (
        <>
          <div className="label" style={{ color: "var(--gold-bright)" }}>{labels.typePrompt}</div>
          <p style={{ fontSize: 22, margin: "8px 0" }}>{card.en}</p>
          {result === "correct" ? (
            <>
              <div className="goldband">{card.id} ✓</div>
              {diLi}
              <p style={{ marginTop: 16, marginBottom: 0 }}>
                <button className="cta sun" onPointerUp={next}>{labels.next}</button>
              </p>
            </>
          ) : result === "miss" ? (
            <>
              <p className="kreyol-body">{card.id}</p>
              {diLi}
              <p style={{ marginTop: 16, marginBottom: 0 }}>
                <button className="cta sun" onPointerUp={next}>{labels.next}</button>
              </p>
            </>
          ) : (
            <>
              <input
                value={typed}
                autoFocus
                onChange={(e) => setTyped(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && typed.trim() && submitType()}
                placeholder={hinted ? card.id[0] + "…" : undefined}
                style={{ width: "100%", boxSizing: "border-box", fontSize: 20 }}
              />
              {result === "close" && (
                <div className="label" style={{ color: "var(--scarlet)", marginTop: 6 }}>
                  {labels.close} — {card.id}
                </div>
              )}
              <p style={{ marginTop: 12, marginBottom: 0, display: "flex", gap: 10 }}>
                <button className="cta sun" disabled={!typed.trim()} onPointerUp={submitType}>
                  {labels.check}
                </button>
                {!hinted && (
                  <button className="cta" onPointerUp={() => setHinted(true)}>{labels.hint}</button>
                )}
              </p>
            </>
          )}
        </>
      )}

      {(card.kind === "kloz" || card.kind === "bati") && (
        <>
          <p className="kreyol-body" style={{ fontSize: 26, margin: "10px 0" }}>{card.id}</p>
          <p style={{ color: "#c9bfa6" }}>{card.en}</p>
          {diLi}
          <p style={{ marginTop: 16, marginBottom: 0 }}>
            <button className="cta sun" onPointerUp={() => rec(true)}>{labels.next}</button>
          </p>
        </>
      )}
    </div>
  );
}
