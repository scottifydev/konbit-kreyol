import { describe, expect, it } from "vitest";
import { compareKreyol } from "../src/lib/normalize";

/** Typed production compare (09 §13): exact is correct; accent-only is a free
 *  retry (close), never accepted; anything else is a real miss. */
describe("compareKreyol", () => {
  it("exact match (case/space folded) is correct", () => {
    expect(compareKreyol("Kay", "kay").exact).toBe(true);
    expect(compareKreyol("  kòman ou ye  ", "kòman ou ye").exact).toBe(true);
  });
  it("a missing accent is CLOSE, not correct (mind the accent, retry)", () => {
    const r = compareKreyol("koman ou ye", "kòman ou ye");
    expect(r.exact).toBe(false);
    expect(r.close).toBe(true);
  });
  it("a genuinely wrong word is neither exact nor close", () => {
    const r = compareKreyol("bonjou", "kay");
    expect(r.exact).toBe(false);
    expect(r.close).toBe(false);
  });
});
