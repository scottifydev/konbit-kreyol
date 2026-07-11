/** Spelling comparison for typed production (09 §13, Tape/Kloz). Case is
 *  folded and surrounding whitespace trimmed. Diacritics are folded only to
 *  detect a NEAR-miss ("close - mind the accent"), never to ACCEPT one: an
 *  exact match (diacritics and all) is correct; a diacritic-only miss is a
 *  free retry, not credit; anything else is a real miss. This keeps typed
 *  production from becoming spelling-police against the boys' literacy gap
 *  without lenient-grading a genuinely wrong form.
 *
 *  OPEN GATE (09 §13.9): the exact fold set - grave vowels, apostrophe
 *  elisions (l' vs li), etc. - is Manman's ruling; this is the sane default. */
export function foldDiacritics(s: string): string {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function compareKreyol(
  answer: string,
  expected: string,
): { exact: boolean; close: boolean } {
  const a = answer.trim().toLowerCase();
  const b = expected.trim().toLowerCase();
  if (a === b) return { exact: true, close: true };
  return { exact: false, close: foldDiacritics(a) === foldDiacritics(b) };
}
