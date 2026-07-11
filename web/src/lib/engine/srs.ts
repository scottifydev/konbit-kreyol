import type { ItemState, LedgerEntry, Mode, Profile, ScopeItem } from "./types";

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
  inMessage = false,
): void {
  const st = itemState(p, id)[mode];
  // m is set ONLY on a productive, in-message rep (cloze / Bati Mesaj); it is
  // meaningless on rec and is never set there (09 §13.2).
  st.hist.push(mode === "prod" && inMessage ? { d: day, ok, m: true } : { d: day, ok });
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

/** rec-solid = box ≥ 3 with the last two correct. Extracted so cardFor and
 *  dueProd read the SAME rule as mastery() — no drift. */
export function recSolid(e: LedgerEntry): boolean {
  return e.box >= 3 && e.hist.length > 0 && e.hist.slice(-2).every((x) => x.ok);
}

/** prod-solid = 3 consecutive correct spanning ≥7 days AND ≥1 of those was an
 *  IN-MESSAGE rep (09 §13.3 — "solid" must mean wieldable-in-a-sentence, not
 *  isolated form-recall). The in-message clause is the load-bearing honesty
 *  rule: cold typed drills alone cannot reach solid. */
export function prodSolid(e: LedgerEntry): boolean {
  const l3 = e.hist.slice(-3);
  return (
    l3.length === 3 &&
    l3.every((x) => x.ok) &&
    l3[2].d - l3[0].d >= 7 &&
    l3.some((x) => x.m === true)
  );
}

/** Derived, never stored (03-language-program.md §6, 09 §13.3). */
export function mastery(p: Profile, id: string, mode: Mode): Mastery {
  const st = itemState(p, id)[mode];
  const solid = mode === "prod" ? prodSolid(st) : recSolid(st);
  if (solid) return "solid";
  if (st.hist.some((x) => x.ok) || st.box > 0) return "aktive";
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

/** Due PRODUCTION queue (09 §13.4) — mirrors dueItems but for the prod ledger,
 *  and only opens a word for typed production once its RECOGNITION is solid
 *  (soft sequencing: rec before prod). This is the single engine addition the
 *  vocab core needs; it reads derived mastery and stores nothing. */
export function dueProd(
  p: Profile,
  items: ScopeItem[],
  unit: number,
  day: number,
): ScopeItem[] {
  return items.filter(
    (i) =>
      (i.u <= unit || i.kle) &&
      itemState(p, i.id).prod.due <= day &&
      recSolid(itemState(p, i.id).rec),
  );
}

export type CardKind = "entwodiksyon" | "rekonet" | "tape" | "kloz" | "bati";

/** Pure selector (09 §13.2): the card kind for a due item from its ledger
 *  state alone, so a harder rung never appears until the stock exists. The
 *  verbal "Di li" strand is offered alongside, not selected here (it never
 *  writes a ledger). `hasFrame` = a certified frame exists for this item. */
export function cardFor(st: ItemState, hasFrame: boolean): CardKind {
  if (st.rec.box === 0 && st.rec.hist.length === 0) return "entwodiksyon";
  if (!recSolid(st.rec)) return "rekonet";
  // rec-solid → production ladder:
  const prodOks = st.prod.hist.filter((x) => x.ok);
  if (prodOks.length === 0) return "tape"; // first cold production
  if (!st.prod.hist.some((x) => x.m)) return "kloz"; // need an in-message rep
  return hasFrame ? "bati" : "tape"; // keep drilling toward solid
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
