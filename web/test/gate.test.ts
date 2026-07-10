import { describe, expect, it } from "vitest";
import { resolveChrome, taught, unitTitle } from "../src/lib/engine/gate";
import type { UiString } from "../src/lib/engine/types";

describe("the language law — taught()", () => {
  it("is strictly unit > tw (a string flips when its unit FINISHES)", () => {
    expect(taught(1, 1)).toBe(false); // unit 1 in progress — no flip
    expect(taught(1, 2)).toBe(true); // unit 1 finished — flips
    expect(taught(3, 3)).toBe(false); // THE `>=` BUG would make this true
    expect(taught(3, 4)).toBe(true);
  });
  it("unit 8 is the sole exception: immersion flips AT 8", () => {
    expect(taught(8, 7)).toBe(false);
    expect(taught(8, 8)).toBe(true);
  });
  it("tw 0 (the logo — the app's proper name) is day-1", () => {
    expect(taught(0, 1)).toBe(true);
  });
});

describe("the native gate — resolveChrome()", () => {
  const draft: UiString = { en: "Crew", ht: "Konbit", tw: 1, needsReview: true };
  const passed: UiString = { ...draft, needsReview: false };

  it("an unreviewed ht NEVER renders, even when taught", () => {
    expect(resolveChrome(draft, 8).text).toBe("Crew");
    expect(resolveChrome(draft, 8).kreyol).toBe(false);
  });
  it("a certified ht renders only when also taught", () => {
    expect(resolveChrome(passed, 1).text).toBe("Crew"); // not taught yet
    expect(resolveChrome(passed, 2).text).toBe("Konbit");
    expect(resolveChrome(passed, 2).kreyol).toBe(true);
    expect(resolveChrome(passed, 2).en).toBe("Crew"); // long-press twin always present
  });
  it("dev preview can show unreviewed drafts; boy builds never set it", () => {
    expect(resolveChrome(draft, 2, { previewUnreviewed: true }).text).toBe(
      "Konbit",
    );
  });
  it("ht: null (open Manman ticket) renders English forever", () => {
    const ticket: UiString = { en: "Stamp it done", ht: null, tw: 1, needsReview: true };
    expect(resolveChrome(ticket, 8).text).toBe("Stamp it done");
  });
  it("flipnew marks exactly the newly flipped unit", () => {
    expect(resolveChrome(passed, 2).isNew).toBe(true); // tw 1, unit 2 — new
    expect(resolveChrome(passed, 3).isNew).toBe(false);
  });
});

describe("unit titles", () => {
  const titles = {
    3: { en: "Food", ht: "Manje", needsReview: false },
    4: { en: "Phone & Voice", ht: "Telefòn & Vwa", needsReview: true },
  };
  it("bilingual until the unit completes, then solo Kreyòl", () => {
    expect(unitTitle(3, 3, titles).text).toBe("Manje · Food");
    expect(unitTitle(3, 4, titles).text).toBe("Manje");
  });
  it("uncertified titles render English only — even bilingual would leak", () => {
    expect(unitTitle(4, 4, titles).text).toBe("Phone & Voice");
  });
});
