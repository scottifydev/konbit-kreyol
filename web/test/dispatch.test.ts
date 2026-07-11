import { describe, expect, it } from "vitest";
import { resolveDispatch, requestRepeat } from "../src/lib/engine/dispatch";
import { dealLeg, landVolley } from "../src/lib/engine/konbit";
import { itemState } from "../src/lib/engine/srs";
import type { Dispatch, KonbitState, Profile } from "../src/lib/engine/types";

function mkProfile(id: string): Profile {
  return {
    id,
    name: id,
    role: "",
    color: "leo",
    kind: "boy",
    band: null,
    diagDone: true,
    items: {},
    tiers: {},
    xp: 0,
    streak: 0,
    lastDay: 0,
    pwoMode: false,
    reactions: {},
    gotit: {},
  };
}

function mkDispatch(): Dispatch {
  return {
    id: "d1",
    sender: "leo",
    receiver: "isaac",
    promptId: "ch1-d1",
    targetItems: ["kòman ou ye"],
    audioRef: "d1.webm",
    status: "delivered",
    credited: false,
    createdDay: 1,
    check: { question: "Which greeting?", options: ["Elder", "Friend"], answer: 0 },
    replies: [],
  };
}

describe("the voice laws — resolveDispatch()", () => {
  it("a correct action credits BOTH ledgers exactly once: sender prod, receiver rec", () => {
    const leo = mkProfile("leo");
    const isaac = mkProfile("isaac");
    const d = mkDispatch();
    expect(resolveDispatch(d, leo, isaac, 0, 1)).toBe("acted");
    expect(itemState(leo, "kòman ou ye").prod.hist).toHaveLength(1);
    expect(itemState(leo, "kòman ou ye").rec.hist).toHaveLength(0);
    expect(itemState(isaac, "kòman ou ye").rec.hist).toHaveLength(1);
    expect(itemState(isaac, "kòman ou ye").prod.hist).toHaveLength(0);
  });

  it("re-resolving an acted dispatch credits nothing (idempotent)", () => {
    const leo = mkProfile("leo");
    const isaac = mkProfile("isaac");
    const d = mkDispatch();
    resolveDispatch(d, leo, isaac, 0, 1);
    expect(resolveDispatch(d, leo, isaac, 0, 1)).toBe("already_credited");
    expect(itemState(leo, "kòman ou ye").prod.hist).toHaveLength(1);
  });

  it("a garble writes NOTHING false — no evidence either direction", () => {
    const leo = mkProfile("leo");
    const isaac = mkProfile("isaac");
    const d = mkDispatch();
    expect(resolveDispatch(d, leo, isaac, 1, 1)).toBe("garbled");
    expect(itemState(leo, "kòman ou ye").prod.hist).toHaveLength(0);
    expect(itemState(isaac, "kòman ou ye").rec.hist).toHaveLength(0);
    expect(d.status).toBe("garbled");
  });

  it("the repeat is free and unlimited; a later correct action still credits once", () => {
    const leo = mkProfile("leo");
    const isaac = mkProfile("isaac");
    const d = mkDispatch();
    resolveDispatch(d, leo, isaac, 1, 1); // garbled
    requestRepeat(d);
    expect(d.status).toBe("delivered");
    expect(resolveDispatch(d, leo, isaac, 0, 2)).toBe("acted");
    expect(itemState(isaac, "kòman ou ye").rec.hist).toHaveLength(1);
  });

  it("acting on a dispatch lands a listening-leg volley; a garble lands nothing (09 §4)", () => {
    // Mirrors the /api/dispatches/[id]/outcome route composition: on "acted"
    // the receiver's dealt leg gains a volley; on "garbled" it does not.
    const leo = mkProfile("leo");
    const isaac = mkProfile("isaac");
    const konbit: KonbitState = {
      streak: 0,
      lastDay: 0,
      stars: 0,
      padon: 1,
      mon: {
        unit: 1,
        legs: { isaac: { done: false, score: 0, budget: 0, tip: "" } },
        taken: false,
      },
    };
    dealLeg(konbit, "isaac", "Moderate", 3); // budget = min(8, 3) = 3

    const d1 = mkDispatch();
    if (resolveDispatch(d1, leo, isaac, 0, 1) === "acted")
      landVolley(konbit, "isaac", true);
    expect(konbit.mon.legs.isaac.score).toBe(1);

    const d2 = mkDispatch();
    if (resolveDispatch(d2, leo, isaac, 1, 1) === "acted") // garble
      landVolley(konbit, "isaac", true);
    expect(konbit.mon.legs.isaac.score).toBe(1); // unchanged
  });

  it("NO SELF-REPORT PATH: the only way to credit is the compared action", () => {
    // Structural assertion: resolveDispatch is the sole ledger-writing entry
    // point for dispatches, and it requires a chosenOption compared against
    // the server-held answer. This test documents the contract; the API test
    // surface (issue 5 AC) enforces it end-to-end.
    const leo = mkProfile("leo");
    const isaac = mkProfile("isaac");
    const d = mkDispatch();
    // an out-of-range "just mark it understood" style call is a wrong answer:
    expect(resolveDispatch(d, leo, isaac, -1, 1)).toBe("garbled");
    expect(itemState(isaac, "kòman ou ye").rec.hist).toHaveLength(0);
  });
});
