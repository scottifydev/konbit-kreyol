import type { ItemState, Mode, Profile, ScopeItem } from "./types";

/** Leitner intervals in days, 0-indexed boxes (06-engineering.md §4). */
export const INTERVALS = [1, 3, 7, 16] as const;

export function itemState(p: Profile, id: string): ItemState {
  if (!p.items[id]) {
    p.items[id] = {
      rec: { box: 0, due: 1, hist: [] },
      prod: { box: 0, due: 1, hist: [] },
    };
  }
  return p.items[id];
}

/** Tier seeding after the ticket.
 *
 *  THE TRAP (06-engineering.md §5.1): Tier A seeds to box index 2 of the
 *  0-indexed INTERVALS array — index 2 IS the 7-day box, i.e. the spec's
 *  1-indexed "box 3". An old handoff row misread this as a bug. It is not.
 *  DO NOT "fix" this to index 3 (16-day) — that would introduce the very
 *  bug the misread imagined. Annotate, don't change.
 */
export function seedTiers(p: Profile, items: ScopeItem[], day: number): void {
  for (const it of items) {
    const t = p.tiers[it.id] || "B";
    const st = itemState(p, it.id);
    if (t === "A" && st.rec.box === 0) {
      st.rec.box = 2;
      st.rec.due = day + INTERVALS[2];
    }
  }
}

export function review(
  p: Profile,
  id: string,
  mode: Mode,
  ok: boolean,
  day: number,
): void {
  const st = itemState(p, id)[mode];
  st.hist.push({ d: day, ok });
  if (ok) {
    st.box = Math.min(3, st.box + 1);
    st.due = day + INTERVALS[st.box];
    return;
  }
  // GENTLE DEMOTION (09 §11.2, non-punitive law): a single slip does not
  // demote — the box drops only on TWO consecutive misses. Either way a
  // missed item resurfaces tomorrow (due = day + 1) rather than waiting out
  // its old interval, so a lapse gets re-practiced soon without being punished.
  const h = st.hist;
  const twoConsecutiveMisses =
    h.length >= 2 && !h[h.length - 1].ok && !h[h.length - 2].ok;
  if (twoConsecutiveMisses) st.box = Math.max(0, st.box - 1);
  st.due = day + 1;
}

export type Mastery = "solid" | "aktive" | "pa";

/** Derived, never stored (03-language-program.md §6).
 *  prod solid = 3 consecutive correct spanning ≥7 days;
 *  rec solid = box ≥ 3 with last two correct. */
export function mastery(p: Profile, id: string, mode: Mode): Mastery {
  const st = itemState(p, id)[mode];
  const h = st.hist;
  if (mode === "prod") {
    const l3 = h.slice(-3);
    if (l3.length === 3 && l3.every((x) => x.ok) && l3[2].d - l3[0].d >= 7)
      return "solid";
  } else {
    if (st.box >= 3 && h.length && h.slice(-2).every((x) => x.ok))
      return "solid";
  }
  if (h.some((x) => x.ok) || st.box > 0) return "aktive";
  return "pa";
}

export function kleSolid(p: Profile, items: ScopeItem[]): number {
  return items.filter((i) => i.kle && mastery(p, i.id, "rec") === "solid")
    .length;
}

/** Due queue. RULING IN FORCE (00-START-HERE.md decisions; 06 §5.8):
 *  Kle 77 items are receptively due-able from Unit 1 regardless of their
 *  teaching unit (flood-before-focus) — otherwise the "all 77 solid by end
 *  of U3" target is unreachable. The v6-4 filter (`i.u <= unit` only) is
 *  the known gap this closes. */
export function dueItems(
  p: Profile,
  items: ScopeItem[],
  unit: number,
  day: number,
): ScopeItem[] {
  return items.filter(
    (i) => (i.u <= unit || i.kle) && itemState(p, i.id).rec.due <= day,
  );
}

/** Feed reaction → receptive reviews, EXACTLY ONCE per post per profile.
 *  v6-4's handlers were not idempotent (06 §5.2): re-clicks double-counted
 *  XP and double-wrote reviews. Returns false when already reacted. */
export function reactToPost(
  p: Profile,
  postId: string,
  itemIds: string[],
  day: number,
): boolean {
  if (p.reactions[postId] !== undefined) return false;
  p.reactions[postId] = day;
  for (const id of itemIds) review(p, id, "rec", true, day);
  return true;
}

/** "Konprann ✓" acknowledgement — same idempotency contract. */
export function gotIt(
  p: Profile,
  postId: string,
  itemIds: string[],
  day: number,
): boolean {
  if (p.gotit[postId] !== undefined) return false;
  p.gotit[postId] = day;
  for (const id of itemIds) review(p, id, "rec", true, day);
  return true;
}

export function skillPct(p: Profile, items: ScopeItem[], unit: number) {
  const sc = items.filter((i) => i.u <= unit);
  const rec =
    sc.filter((i) => mastery(p, i.id, "rec") !== "pa").length /
    Math.max(1, sc.length);
  const ps = sc.filter((i) => i.pc);
  const prod =
    ps.filter((i) => mastery(p, i.id, "prod") !== "pa").length /
    Math.max(1, ps.length);
  return {
    konprann: Math.min(1, 0.55 + rec * 0.4),
    li: rec,
    pale: prod,
    ekri: prod * 0.6,
  };
}
