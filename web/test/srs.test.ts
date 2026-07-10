import { describe, expect, it } from "vitest";
import {
  INTERVALS,
  dueItems,
  itemState,
  mastery,
  reactToPost,
  review,
  seedTiers,
} from "../src/lib/engine/srs";
import type { Profile, ScopeItem } from "../src/lib/engine/types";

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
  it("promotes to max box 3, demotes to min 0, redates due", () => {
    const p = mkProfile();
    review(p, "kay", "rec", true, 1);
    expect(itemState(p, "kay").rec.box).toBe(1);
    expect(itemState(p, "kay").rec.due).toBe(1 + 3);
    review(p, "kay", "rec", false, 4);
    expect(itemState(p, "kay").rec.box).toBe(0);
    expect(itemState(p, "kay").rec.due).toBe(4 + 1);
  });
});

describe("derived mastery — never stored", () => {
  it("prod solid = 3 consecutive correct spanning ≥7 days", () => {
    const p = mkProfile();
    review(p, "kay", "prod", true, 1);
    review(p, "kay", "prod", true, 4);
    expect(mastery(p, "kay", "prod")).toBe("aktive"); // only 2 retrievals
    review(p, "kay", "prod", true, 9);
    expect(mastery(p, "kay", "prod")).toBe("solid"); // 3 correct, span 1→9 ≥ 7
  });
  it("a miss inside the window blocks solid", () => {
    const p = mkProfile();
    review(p, "kay", "prod", true, 1);
    review(p, "kay", "prod", false, 4);
    review(p, "kay", "prod", true, 9);
    expect(mastery(p, "kay", "prod")).toBe("aktive");
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
