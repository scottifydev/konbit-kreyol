/** Fokis grammar bank — judgment-first tasks (02 §3; 06 §5.4–5.5). CONTENT
 *  DATA: every Kreyòl example is Manman-gated (Claude coins nothing), so the
 *  bank ships EMPTY and the war-college slate shows "coming" until she seeds
 *  it. The frame is ready to render the moment items clear (needsReview:false).
 *
 *  THE MECHANIC (when it has content): the boy judges a Kreyòl sentence BEFORE
 *  the rule appears (the generation effect); correction is ADDITIVE CHALK —
 *  circle the answer, a neutral note — never a red-X, never "the ear says the
 *  answer it just missed" (06 §5.5: "Close — the rule: …"). */
export interface GrammarTask {
  id: string;
  /** the Kreyòl sentence to judge (gated) */
  ht: string;
  grammatical: boolean;
  /** the rule, shown as additive chalk AFTER the judgment */
  ruleEn: string;
  needsReview: boolean;
}

export const GRAMMAR: GrammarTask[] = [];

/** The boys' build: only native-verified tasks render (native gate). */
export function grammarForBoys(): GrammarTask[] {
  return GRAMMAR.filter((g) => g.needsReview === false);
}
