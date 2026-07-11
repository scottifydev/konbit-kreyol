/** Core engine types — ported from the v6-4 reference implementation
 *  (behavior-normative; see 06-engineering.md §4–5). */

export type Mode = "rec" | "prod";

export interface LedgerEntry {
  box: number; // 0-indexed over INTERVALS [1,3,7,16]
  due: number; // day number
  /** m = in-message rep (prod only): the retrieval happened inside a cloze /
   *  Bati-Mesaj frame, not isolated form-recall. prod-solid requires ≥1
   *  (09 §13.3) so "solid" provably means wieldable-in-a-sentence. */
  hist: { d: number; ok: boolean; m?: boolean }[];
}

export interface ItemState {
  rec: LedgerEntry;
  prod: LedgerEntry;
}

export type Tier = "A" | "B" | "C";

export interface ScopeItem {
  id: string; // the Kreyòl form is the id
  en: string;
  u: number; // teaching unit
  kle: boolean; // Kle 77 member
  pc: boolean; // productive-core member
  cat: "word" | "expr" | "slang" | "pwoveb";
  /** true = part of the scope-amendment batch awaiting Manman (04-laws.md §1.1) */
  pending?: boolean;
}

export interface Profile {
  id: string;
  name: string;
  role: string; // Majò role, kid-facing label
  color: "leo" | "isaac" | "adult";
  kind: "boy" | "adult";
  band: string | null; // course size; renders only in the boy's own Settings
  diagDone: boolean;
  items: Record<string, ItemState>;
  tiers: Record<string, Tier>;
  xp: number;
  streak: number;
  lastDay: number;
  pwoMode: boolean;
  reactions: Record<string, number>; // postId -> day reacted (idempotency guard)
  gotit: Record<string, number>; // postId -> day acknowledged (idempotency guard)
  /** ticket production recordings (read-aloud / describe-the-camp), kept for
   *  the Cipher Office to score by ear — never machine-judged (voice law) */
  diagAudio?: string[];
  /** Di li verbal-practice recordings (09 §13.2): the boy saying vocab words
   *  aloud, kept for family feedback — self-compared by ear, never machine-judged */
  vocAudio?: string[];
}

export interface RelayLeg {
  done: boolean;
  /** h_i — volleys LANDED this leg (correct retrievals from his own due queue) */
  score: number;
  /** b_i — volley budget dealt from his band (09 §4.2: Emerging 6 / Moderate 8
   *  / Strong 10, min(band, availableVolleys) on a light day) */
  budget: number;
  tip: string;
}

/** The chapter battle = HOLD/TAKE THE POSITION (09-game-mechanics.md §4).
 *  Take iff L_A + L_B ≥ T AND min(L_A,L_B) ≥ m AND allLegsDone, where
 *  L_i = score_i / budget_i. Constants live in konbit.ts BATTLE (tunable —
 *  09 §11.4 gate). The old raw-sum `threshold` is retired: the take-condition
 *  is fractional accuracy, so it can never inflate with an overdue backlog. */
export interface KonbitState {
  streak: number;
  lastDay: number;
  stars: number;
  padon: number;
  mon: {
    unit: number;
    legs: Record<string, RelayLeg>;
    taken: boolean;
  };
}

export type DispatchStatus = "sent" | "delivered" | "acted" | "garbled";

/** A voice dispatch. The audio lives in storage; this is the metadata row.
 *  VOICE LAWS (04-laws.md §5): transmission is the grade; comprehension is
 *  proven by action; no machine judgment; garbles write nothing. */
export interface Dispatch {
  id: string;
  sender: string;
  receiver: string;
  promptId: string;
  targetItems: string[];
  audioRef: string;
  status: DispatchStatus;
  /** ledger credit applied exactly once (idempotency guard) */
  credited: boolean;
  createdDay: number;
  /** the act-on-it check paired with the prompt — the receiver proves
   *  comprehension by choosing correctly, never by self-report */
  check: { question: string; options: string[]; answer: number };
  replies: { from: string; audioRef: string }[];
  commendation?: string;
}

export interface UiString {
  en: string;
  /** null = no draft exists yet; a Manman ticket is open (Claude coins nothing) */
  ht: string | null;
  tw: number; // computed taught-unit (04-laws.md §1); 8 = immersion bucket
  /** every Claude-authored ht ships true; only the Cipher Office flips it */
  needsReview: boolean;
}
