import { beforeAll, describe, expect, it } from "vitest";
import {
  authConfigured,
  authEnforced,
  checkPassphrase,
  sessionCanActAs,
  sessionIsAdult,
  signSession,
  timingSafeEqual,
  verifySession,
} from "../src/lib/auth";

/** Family-only auth (issue 1). The session must be unforgeable and the
 *  passphrase compare constant-time. */

beforeAll(() => {
  process.env.AUTH_SECRET = "test-hmac-secret";
  process.env.AUTH_PASS_LEO = "leo-word-123";
});

describe("session signing", () => {
  it("a signed session round-trips to its profile + role", async () => {
    const token = await signSession("leo", "boy");
    const s = await verifySession(token);
    expect(s?.sub).toBe("leo");
    expect(s?.role).toBe("boy");
  });

  it("a tampered payload is rejected", async () => {
    const token = await signSession("leo", "boy");
    const [payload, sig] = token.split(".");
    // flip the payload to claim to be an adult — signature no longer matches
    const forged = `${payload}x.${sig}`;
    expect(await verifySession(forged)).toBeNull();
  });

  it("a forged signature is rejected", async () => {
    const token = await signSession("leo", "boy");
    const [payload] = token.split(".");
    expect(await verifySession(`${payload}.deadbeef`)).toBeNull();
  });

  it("a session for an unknown door is rejected", async () => {
    const token = await signSession("intruder", "adult");
    expect(await verifySession(token)).toBeNull();
  });

  it("no token / no secret verifies to null", async () => {
    expect(await verifySession(undefined)).toBeNull();
    expect(await verifySession("")).toBeNull();
  });
});

describe("passphrase check", () => {
  it("the right word for the right door passes; a wrong word fails", () => {
    expect(checkPassphrase("leo", "leo-word-123")?.role).toBe("boy");
    expect(checkPassphrase("leo", "guess")).toBeNull();
  });
  it("an unknown door fails, and a door with no configured passphrase fails", () => {
    expect(checkPassphrase("nobody", "x")).toBeNull();
    expect(checkPassphrase("isaac", "anything")).toBeNull(); // AUTH_PASS_ISAAC unset here
  });
});

describe("authorization predicates (the guard logic)", () => {
  const leo = { sub: "leo", role: "boy" as const, iat: 0 };
  const isaac = { sub: "isaac", role: "boy" as const, iat: 0 };
  const mom = { sub: "manman", role: "adult" as const, iat: 0 };
  it("a boy acts only as himself", () => {
    expect(sessionCanActAs(leo, "leo")).toBe(true);
    expect(sessionCanActAs(leo, "isaac")).toBe(false); // Leo cannot act as Isaac
    expect(sessionCanActAs(isaac, "isaac")).toBe(true);
  });
  it("an adult may act on any boy's behalf, and is the only one who passes guardAdult", () => {
    expect(sessionCanActAs(mom, "leo")).toBe(true);
    expect(sessionIsAdult(mom)).toBe(true);
    expect(sessionIsAdult(leo)).toBe(false); // a boy cannot drive an adult surface
  });
  it("no session is never authorized", () => {
    expect(sessionCanActAs(null, "leo")).toBe(false);
    expect(sessionIsAdult(null)).toBe(false);
  });
});

describe("primitives", () => {
  it("authConfigured tracks AUTH_SECRET", () => {
    expect(authConfigured()).toBe(true);
  });
  it("authEnforced is on when the secret is set (and fail-closed in prod)", () => {
    expect(authEnforced()).toBe(true); // AUTH_SECRET set in beforeAll
  });
  it("timingSafeEqual: equal true, unequal/length-mismatch false", () => {
    expect(timingSafeEqual("abc", "abc")).toBe(true);
    expect(timingSafeEqual("abc", "abd")).toBe(false);
    expect(timingSafeEqual("abc", "abcd")).toBe(false);
  });
});
