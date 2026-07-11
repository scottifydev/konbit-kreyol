import { describe, expect, it } from "vitest";
import { rolloverDay } from "../src/lib/store/adapter";
import type { AppState } from "../src/lib/store/adapter";

/** The world must tick forward (09 §7): day advances once per new real
 *  calendar day so SRS intervals arrive and the return visit isn't day-1. */
describe("rolloverDay", () => {
  it("stamps the first load without advancing, then advances on a new real date", () => {
    const s = { day: 3, unit: 1 } as AppState;
    rolloverDay(s); // first ever — stamp today, no advance
    expect(s.day).toBe(3);
    expect(s.lastRealDate).toBeTruthy();

    rolloverDay(s); // same real day — idempotent, no advance
    expect(s.day).toBe(3);

    s.lastRealDate = "2020-01-01"; // pretend the last play was long ago
    rolloverDay(s); // a new real day → advance exactly one
    expect(s.day).toBe(4);
  });
});
