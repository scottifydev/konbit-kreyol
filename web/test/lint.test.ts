import { describe, expect, it } from "vitest";
import {
  extractStrings,
  lintChromeString,
  lintKidCopy,
  lintUiStringCoverage,
} from "../lint/rules.mjs";

/** Seeded violations MUST fail (04-laws.md §9 / build-plan issue 2 AC). */

describe("language lint", () => {
  it("catches a diacritic-bearing Kreyòl literal in chrome", () => {
    const v = lintChromeString("Pase kòd la", "seeded.tsx");
    expect(v.length).toBeGreaterThan(0);
    expect(
      v.some(
        (x: { rule: string }) => x.rule === "language/diacritic-outside-gate",
      ),
    ).toBe(true);
  });
  it("catches an unambiguous scope token in chrome", () => {
    const v = lintChromeString("time to manje with the crew", "seeded.tsx");
    expect(v.some((x: { token: string }) => x.token === "manje")).toBe(true);
  });
  it("whitelisted proper nouns pass (people, places, artists only)", () => {
    expect(lintChromeString("Wake up your Kreyòl", "gate")).toHaveLength(0);
    expect(lintChromeString("Boukman Eksperyans", "anthem")).toHaveLength(0);
  });
  it("lodyans/vwadyo/kapstòn are NOT whitelisted (not proper nouns)", () => {
    expect(lintChromeString("the lodyans evening", "x").length).toBeGreaterThan(0);
    expect(lintChromeString("send a vwadyo", "x").length).toBeGreaterThan(0);
    expect(lintChromeString("the kapstòn event", "x").length).toBeGreaterThan(0);
  });
  it("declared ambiguous tokens do not false-positive in English", () => {
    expect(lintChromeString("a la carte men and women", "x")).toHaveLength(0);
  });
  it("lwa proper nouns pass; the bare common word still flags", () => {
    expect(lintChromeString("Papa Legba opens the way", "gate")).toHaveLength(0);
    expect(lintChromeString("Ogou walks with the army", "scene")).toHaveLength(0);
    // "papa" is also a scope item — outside "Papa Legba" it is not blessed
    expect(
      lintChromeString("call your papa manje time", "x").some(
        (x: { token: string }) => x.token === "papa",
      ),
    ).toBe(true);
  });
  it("attested quoted proverbs pass; the strip is not a rigging vector", () => {
    expect(lintChromeString("« Men anpil, chay pa lou »", "gate")).toHaveLength(0);
    expect(lintChromeString("L'union fait la force", "crest")).toHaveLength(0);
    // an un-attested Kreyòl phrase is NOT in the allowlist — still fails
    expect(
      lintChromeString("nou pral manje ansanm", "x").length,
    ).toBeGreaterThan(0);
    // a leaked scope token OUTSIDE the proverb still flags even when the
    // proverb is present in the same string
    expect(
      lintChromeString("Men anpil, chay pa lou — kounye a nou manje", "x").some(
        (x: { token: string }) => x.token === "manje",
      ),
    ).toBe(true);
  });
});

describe("copy lint — kid surfaces", () => {
  it("catches spec plumbing", () => {
    expect(lintKidCopy("per spec §7 the tip is required", "x").length).toBeGreaterThan(0);
    expect(lintKidCopy("Real build: aural flow", "x").length).toBeGreaterThan(0);
  });
  it("catches engine jargon", () => {
    expect(lintKidCopy("3 items sent to your receptive ledger", "x").length).toBeGreaterThan(0);
    expect(lintKidCopy("band Strong assigned", "x").length).toBeGreaterThan(0);
  });
  it("catches fear words", () => {
    expect(lintKidCopy("that answer was wrong", "x").length).toBeGreaterThan(0);
  });
  it("catches third-person-about-the-kid", () => {
    expect(lintKidCopy("each boy runs his leg", "x").length).toBeGreaterThan(0);
  });
  it("house reference lines pass", () => {
    expect(lintKidCopy("Your ear already knows the answer. Pick what sounds right.", "x")).toHaveLength(0);
    expect(lintKidCopy("The mountain waits for tomorrow.", "x")).toHaveLength(0);
    expect(lintKidCopy("She rates comprehension, not the food.", "x")).toHaveLength(0);
  });
});

describe("scope-coverage lint", () => {
  it("an ht word outside the scope is a build error (it would never flip)", () => {
    const v = lintUiStringCoverage("bad", {
      en: "x",
      ht: "zanmitay total",
      tw: 2,
      needsReview: true,
    });
    expect(v.length).toBeGreaterThan(0);
  });
  it("tw 8 immersion bucket and the tw 0 logo are exempt", () => {
    expect(
      lintUiStringCoverage("ok8", { en: "x", ht: "nou de kont mòn nan", tw: 8, needsReview: true }),
    ).toHaveLength(0);
    expect(
      lintUiStringCoverage("logo", { en: "THE CODE", ht: "KÒD LA", tw: 0, needsReview: true }),
    ).toHaveLength(0);
  });
});

describe("string extraction", () => {
  it("pulls literals and JSX text", () => {
    const src = `const a = "Pase kòd la"; export default () => <p>manje time</p>;`;
    const strings = extractStrings(src);
    expect(strings).toContain("Pase kòd la");
    expect(strings.some((s: string) => s.includes("manje time"))).toBe(true);
  });
});
