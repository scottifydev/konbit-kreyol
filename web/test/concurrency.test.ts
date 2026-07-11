import { describe, expect, it } from "vitest";
import { LocalStore } from "../src/lib/store/local";

/** The single-row clobber fix (06 §1): concurrent transactions must serialize
 *  so no write is lost. Without the in-process mutex, N concurrent read-mutate-
 *  writes on one JSON file lose most of their increments. */
describe("store.transaction — no lost updates under concurrency", () => {
  it("15 concurrent +1 transactions all land", async () => {
    const store = new LocalStore();
    const before = (await store.load()).profiles.leo?.xp ?? 0;
    await Promise.all(
      Array.from({ length: 15 }, () =>
        store.transaction((state) => {
          state.profiles.leo.xp += 1;
        }),
      ),
    );
    const after = (await store.load()).profiles.leo.xp;
    expect(after - before).toBe(15);
  });
});
