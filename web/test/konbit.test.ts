import { describe, expect, it } from "vitest";
import {
  BATTLE,
  bandBudget,
  dayRollover,
  dealLeg,
  landVolley,
  legFraction,
  marronage,
  passTheWord,
  positionState,
  practiceToday,
} from "../src/lib/engine/konbit";
import type { KonbitState, Profile } from "../src/lib/engine/types";

function mkKonbit(): KonbitState {
  return {
    streak: 5,
    lastDay: 3,
    stars: 2,
    padon: 1,
    mon: {
      unit: 1,
      legs: {
        leo: { done: false, score: 0, budget: 0, tip: "" },
        isaac: { done: false, score: 0, budget: 0, tip: "" },
      },
      taken: false,
    },
  };
}

function mkProfile(): Profile {
  return {
    id: "leo",
    name: "Leo",
    role: "",
    color: "leo",
    kind: "boy",
    band: null,
    diagDone: true,
    items: {},
    tiers: {},
    xp: 0,
    streak: 2,
    lastDay: 3,
    pwoMode: false,
    reactions: {},
    gotit: {},
  };
}

describe("konbit streak — the co-op law", () => {
  it("survives if EITHER boy practices", () => {
    const k = mkKonbit();
    practiceToday(mkProfile(), k, 4);
    expect(k.streak).toBe(6);
  });
  it("padon repairs a missed day; padons are finite and counted", () => {
    const k = mkKonbit();
    expect(dayRollover(k, 5)).toBe("padon_used"); // lastDay 3 < 4
    expect(k.padon).toBe(0);
    expect(k.streak).toBe(5); // kept
    expect(dayRollover(k, 7)).toBe("reset"); // no padon left
    expect(k.streak).toBe(0);
  });
});

describe("volley budgets — band-fixed and bounded (09 §4.2)", () => {
  it("budget rides the band; null band plays the Moderate default", () => {
    expect(bandBudget("Strong")).toBe(10);
    expect(bandBudget("Moderate")).toBe(8);
    expect(bandBudget("Emerging")).toBe(6);
    expect(bandBudget(null)).toBe(BATTLE.defaultBudget);
  });
  it("a light day deals a shorter leg (min of band and available), never a shortfall", () => {
    const k = mkKonbit();
    expect(dealLeg(k, "leo", "Moderate", 12)).toBe(8); // capped at band
    expect(dealLeg(k, "isaac", "Emerging", 4)).toBe(4); // capped at available
  });
  it("only correct volleys land, clamped to the dealt budget", () => {
    const k = mkKonbit();
    dealLeg(k, "leo", "Moderate", 8);
    landVolley(k, "leo", true);
    landVolley(k, "leo", false); // a miss writes nothing
    landVolley(k, "leo", true);
    expect(k.mon.legs.leo.score).toBe(2);
    expect(legFraction(k.mon.legs.leo)).toBeCloseTo(2 / 8);
  });
});

describe("take the position — three pillars, no solo-solve (09 §4.3)", () => {
  it("pass the word requires a dealt leg AND a tip (backstop for the disabled button)", () => {
    const k = mkKonbit();
    expect(passTheWord(k, "leo", "a tip")).toBe(false); // not dealt yet
    dealLeg(k, "leo", "Moderate", 8);
    expect(passTheWord(k, "leo", "   ")).toBe(false); // empty tip
    expect(passTheWord(k, "leo", "listen for the nasal ending")).toBe(true);
    expect(passTheWord(k, "leo", "again")).toBe(false); // leg already done
  });

  function playLeg(k: KonbitState, boy: string, band: string, landed: number) {
    const b = dealLeg(k, boy, band, 20);
    for (let i = 0; i < b; i++) landVolley(k, boy, i < landed);
    passTheWord(k, boy, "tip");
  }

  it("taken when sum ≥ 1.30 AND both legs clear the 0.40 floor", () => {
    const k = mkKonbit();
    playLeg(k, "leo", "Moderate", 5); // 5/8 = 0.625
    expect(positionState(k).taken).toBe(false); // isaac not done
    playLeg(k, "isaac", "Strong", 8); // 8/10 = 0.80
    const ps = positionState(k);
    expect(ps.sum).toBeCloseTo(1.425);
    expect(ps.taken).toBe(true);
  });

  it("no solo-solve: a maxed brother cannot carry one below his own floor", () => {
    const k = mkKonbit();
    playLeg(k, "leo", "Moderate", 3); // 3/8 = 0.375 < m
    playLeg(k, "isaac", "Strong", 10); // 10/10 = 1.0
    const ps = positionState(k);
    expect(ps.sum).toBeCloseTo(1.375); // sum clears T=1.30…
    expect(ps.minFraction).toBeCloseTo(0.375);
    expect(ps.taken).toBe(false); // …but Leo's floor fails → position holds
  });

  it("marronage resets legs+scores+budgets but TIPS PERSIST — the comeback edge", () => {
    const k = mkKonbit();
    playLeg(k, "leo", "Moderate", 2); // 2/8 = 0.25
    playLeg(k, "isaac", "Strong", 3); // 3/10 = 0.30
    expect(positionState(k).taken).toBe(false);
    marronage(k);
    expect(k.mon.legs.leo.done).toBe(false);
    expect(k.mon.legs.leo.score).toBe(0);
    expect(k.mon.legs.leo.budget).toBe(0);
    expect(k.mon.taken).toBe(false);
    expect(k.mon.legs.leo.tip).toBe("tip"); // banked for tomorrow
    expect(k.mon.legs.isaac.tip).toBe("tip");
  });
});
