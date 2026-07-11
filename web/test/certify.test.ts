import { describe, expect, it } from "vitest";
import { CERT_KEY } from "../src/lib/certifyKeys";

/** The Cipher Office certifies these namespaces. `scene` and `scope` were
 *  once missing — scene lines and the whole lexicon pass could not be
 *  certified at all (regression guard). */
describe("certifiable namespaces", () => {
  it("accepts every reviewable namespace", () => {
    for (const k of [
      "ui:logo",
      "post:p1",
      "unit:2",
      "kanpay:ch1-name",
      "scene:s1:ticket",
      "scope:kay",
    ]) {
      expect(CERT_KEY.test(k)).toBe(true);
    }
  });
  it("rejects anything else (no writing arbitrary keys into the overlay)", () => {
    for (const k of ["ledger:leo", "profile:leo", "konbit:mon", "kay", ""]) {
      expect(CERT_KEY.test(k)).toBe(false);
    }
  });
});
