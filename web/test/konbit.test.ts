import { describe, expect, it } from "vitest";
import {
  dayRollover,
  marronage,
  passRope,
  practiceToday,
  summitState,
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
      threshold: 14,
      legs: {
        leo: { done: false, score: 0, tip: "" },
        isaac: { done: false, score: 0, tip: "" },
      },
      summited: false,
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

describe("the relay — mandatory tip, marronage", () => {
  it("the rope does not pass without a tip (engine backstop for the disabled button)", () => {
    const k = mkKonbit();
    expect(passRope(k, "leo", 8, "   ")).toBe(false);
    expect(passRope(k, "leo", 8, "listen for the nasal ending")).toBe(true);
    expect(passRope(k, "leo", 9, "again")).toBe(false); // leg already done
  });
  it("both summit together or the mountain waits", () => {
    const k = mkKonbit();
    passRope(k, "leo", 8, "tip");
    expect(summitState(k).summited).toBe(false); // isaac not done
    passRope(k, "isaac", 7, "tip");
    expect(summitState(k).summited).toBe(true); // 15 ≥ 14, together
  });
  it("marronage resets legs but TIPS PERSIST — the comeback edge", () => {
    const k = mkKonbit();
    passRope(k, "leo", 3, "watch the determiners");
    passRope(k, "isaac", 4, "slow down on te");
    expect(summitState(k).summited).toBe(false); // 7 < 14
    marronage(k);
    expect(k.mon.legs.leo.done).toBe(false);
    expect(k.mon.legs.leo.score).toBe(0);
    expect(k.mon.legs.leo.tip).toBe("watch the determiners");
    expect(k.mon.legs.isaac.tip).toBe("slow down on te");
  });
});
