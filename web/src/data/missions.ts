/** Misyon Fanmi — weekly family missions (03 §5). Kid-facing copy per the
 *  second-person rulings (04 Appendix A). Manman's commendations gate
 *  missions; ledgers gate mastery. */

export interface Mission {
  u: number;
  t: string;
  d: string;
}

export const MISSIONS: Mission[] = [
  {
    u: 1,
    t: "Record 8 phrases with Manman",
    d: "Family audio bank, session one. You two plus Manman, mics on.",
  },
  {
    u: 2,
    t: "Interview Grann",
    d: "Five questions in Kreyòl, recorded. One of you asks 1–3, the other 4–5 and keeps it going. Her answers become your Unit 5 listening.",
  },
  {
    u: 3,
    t: "Cook a dish — Kreyòl only",
    d: "Follow Manman's spoken instructions. She rates comprehension, not the food.",
  },
  {
    u: 4,
    t: "Run the family chat — 3 days",
    d: "At least one voice note per day from each of you. Chat spelling allowed — same language, second costume.",
  },
  {
    u: 5,
    t: "Manman's childhood story",
    d: "Listen, then each of you retells one sentence back using te / t ap.",
  },
  {
    u: 6,
    t: "Family joke exchange",
    d: "Affectionate teasing register — flags apply. Grann judges what lands.",
  },
  {
    u: 7,
    t: "News summary",
    d: "Summarize one VOA Kreyòl item to the family, in Kreyòl.",
  },
  {
    u: 8,
    t: "Host the family listening",
    d: "You two host — play the segments, explain the Kreyòl. Manman narrates the French asides.",
  },
];
