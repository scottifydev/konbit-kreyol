import { describe, expect, it } from "vitest";
import {
  INTERVALS,
  cardFor,
  dueItems,
  dueProd,
  itemState,
  mastery,
  reactToPost,
  review,
  seedTiers,
} from "../src/lib/engine/srs";
import type { ItemState, Profile, ScopeItem } from "../src/lib/engine/types";

function mkProfile(): Profile {
  return {
    id: "leo",
    name: "Leo",
    role: "Reading lead",
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

const ITEMS: ScopeItem[] = [
  { id: "kay", en: "house", u: 2, kle: true, pc: true, cat: "word" },
  { id: "ap", en: "progressive marker", u: 4, kle: true, pc: true, cat: "word" },
  { id: "diri", en: "rice", u: 3, kle: false, pc: true, cat: "word" },
];

describe("tier seeding — THE TRAP (do not 'fix')", () => {
  it("Tier A seeds rec to box INDEX 2 — the 7-day box, the spec's 1-indexed box 3", () => {
    const p = mkProfile();
    p.tiers["kay"] = "A";
    seedTiers(p, ITEMS, 1);
    expect(itemState(p, "kay").rec.box).toBe(2);
    expect(INTERVALS[2]).toBe(7); // if someone "fixes" the index this fails loudly
    expect(itemState(p, "kay").rec.due).toBe(1 + 7);
  });
  it("Tier B/C untouched by seeding", () => {
    const p = mkProfile();
    seedTiers(p, ITEMS, 1);
    expect(itemState(p, "diri").rec.box).toBe(0);
  });
});

describe("Leitner review", () => {
  it("promotes to max box 3, redates due by the new box interval", () => {
    const p = mkProfile();
    review(p, "kay", "rec", true, 1);
    expect(itemState(p, "kay").rec.box).toBe(1);
    expect(itemState(p, "kay").rec.due).toBe(1 + 3);
  });
  it("GENTLE demotion: a single slip does not demote; the box drops only on two consecutive misses", () => {
    const p = mkProfile();
    review(p, "kay", "rec", true, 1); // box 0 → 1
    expect(itemState(p, "kay").rec.box).toBe(1);
    review(p, "kay", "rec", false, 4); // single miss — box HELD, resurfaces tomorrow
    expect(itemState(p, "kay").rec.box).toBe(1);
    expect(itemState(p, "kay").rec.due).toBe(4 + 1);
    review(p, "kay", "rec", false, 6); // second consecutive miss — now demote
    expect(itemState(p, "kay").rec.box).toBe(0);
    expect(itemState(p, "kay").rec.due).toBe(6 + 1);
  });
  it("a correct review between misses breaks the streak — no demotion", () => {
    const p = mkProfile();
    review(p, "kay", "rec", true, 1); // box 1
    review(p, "kay", "rec", true, 4); // box 2
    review(p, "kay", "rec", false, 11); // miss
    review(p, "kay", "rec", true, 12); // recover → box 3
    review(p, "kay", "rec", false, 28); // lone miss again — box held
    expect(itemState(p, "kay").rec.box).toBe(3);
  });
});

describe("derived mastery — never stored", () => {
  it("prod solid = 3 consecutive correct spanning ≥7 days WITH an in-message rep", () => {
    const p = mkProfile();
    review(p, "kay", "prod", true, 1);
    review(p, "kay", "prod", true, 4);
    expect(mastery(p, "kay", "prod")).toBe("aktive"); // only 2 retrievals
    review(p, "kay", "prod", true, 9, /*inMessage*/ true);
    expect(mastery(p, "kay", "prod")).toBe("solid"); // 3 correct, span 1→9, ≥1 in-message
  });
  it("THREE cold typed successes alone never reach solid — an in-message rep is required (09 §13.3)", () => {
    const p = mkProfile();
    review(p, "kay", "prod", true, 1);
    review(p, "kay", "prod", true, 4);
    review(p, "kay", "prod", true, 9); // all cold, span 8 ≥ 7, but none in-message
    expect(mastery(p, "kay", "prod")).toBe("aktive");
    review(p, "kay", "prod", true, 16, true); // an in-message rep among the last three
    expect(mastery(p, "kay", "prod")).toBe("solid");
  });
  it("a miss inside the window blocks solid", () => {
    const p = mkProfile();
    review(p, "kay", "prod", true, 1);
    review(p, "kay", "prod", false, 4);
    review(p, "kay", "prod", true, 9, true);
    expect(mastery(p, "kay", "prod")).toBe("aktive");
  });
});

describe("the vocab core — dueProd + cardFor (09 §13)", () => {
  function recToSolid(p: Profile, id: string) {
    review(p, id, "rec", true, 1); // box 1
    review(p, id, "rec", true, 4); // box 2
    review(p, id, "rec", true, 11); // box 3 — rec-solid (last two correct)
  }

  it("dueProd never opens a word for production until its recognition is solid", () => {
    const p = mkProfile();
    itemState(p, "kay").prod.due = 1;
    expect(dueProd(p, ITEMS, 3, 1).map((i) => i.id)).not.toContain("kay"); // rec not solid
    recToSolid(p, "kay");
    itemState(p, "kay").prod.due = 20;
    expect(dueProd(p, ITEMS, 3, 20).map((i) => i.id)).toContain("kay");
  });

  it("cardFor walks the ledger: intro → recognition → typed → in-message → build", () => {
    const st = (): ItemState => ({
      rec: { box: 0, due: 1, hist: [] },
      prod: { box: 0, due: 1, hist: [] },
    });
    // never touched → introduce it (inside a frame)
    expect(cardFor(st(), false)).toBe("entwodiksyon");
    // seeded/seen but rec not solid → recognition
    const s1 = st();
    s1.rec = { box: 1, due: 5, hist: [{ d: 1, ok: true }] };
    expect(cardFor(s1, true)).toBe("rekonet");
    // rec solid, no cold production yet → typed production
    const s2 = st();
    s2.rec = { box: 3, due: 20, hist: [{ d: 4, ok: true }, { d: 11, ok: true }] };
    expect(cardFor(s2, true)).toBe("tape");
    // has cold prod but no in-message rep → cloze (needs an in-message rep)
    const s3 = st();
    s3.rec = s2.rec;
    s3.prod = { box: 1, due: 30, hist: [{ d: 20, ok: true }] };
    expect(cardFor(s3, true)).toBe("kloz");
    // has an in-message rep + a frame → build a message
    const s4 = st();
    s4.rec = s2.rec;
    s4.prod = { box: 2, due: 40, hist: [{ d: 20, ok: true }, { d: 30, ok: true, m: true }] };
    expect(cardFor(s4, true)).toBe("bati");
    expect(cardFor(s4, false)).toBe("tape"); // no frame → keep drilling
  });
});

describe("Kle-77 early receptive seeding (ruling in force)", () => {
  it("a Kle item teaching in U4 is due-able at U1 — flood before focus", () => {
    const p = mkProfile();
    itemState(p, "ap").rec.due = 1;
    itemState(p, "diri").rec.due = 1;
    const due = dueItems(p, ITEMS, 1, 1);
    expect(due.map((i) => i.id)).toContain("ap"); // kle: included despite u=4
    expect(due.map((i) => i.id)).not.toContain("diri"); // not kle, u=3 > unit
  });
});

describe("idempotent reactions (v6-4 trap fix)", () => {
  it("re-reacting the same post writes nothing twice", () => {
    const p = mkProfile();
    expect(reactToPost(p, "p2", ["kay"], 1)).toBe(true);
    const histLen = itemState(p, "kay").rec.hist.length;
    expect(reactToPost(p, "p2", ["kay"], 1)).toBe(false);
    expect(reactToPost(p, "p2", ["kay"], 2)).toBe(false);
    expect(itemState(p, "kay").rec.hist.length).toBe(histLen);
  });
});
