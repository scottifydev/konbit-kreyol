/** THE LINT — language law + copy law, as importable rules (04-laws.md §9).
 *  Used by scripts/lint-laws.mjs (CI) and by the test suite (seeded
 *  violations must fail). NOT RIGGABLE: the whitelist is proper nouns only
 *  and change-controlled; the ambiguous-token list is declared openly in
 *  whitelist.json per the recorded amendment. */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const wl = JSON.parse(readFileSync(join(here, "whitelist.json"), "utf8"));
const scope = JSON.parse(
  readFileSync(join(here, "../src/data/scope.json"), "utf8"),
);

/** Proper nouns match CASE-SENSITIVELY (plus an ALL-CAPS variant for
 *  display settings like the logo) — "Kreyòl" is a name, "kreyòl" in
 *  running chrome is a leak. This also stops the title entry ("Kòd La")
 *  from blessing lowercase phrases like "pase kòd la". */
const PROPER = new Set(
  wl.properNouns.flatMap((s) => [s, s.toUpperCase()]),
);
const AMBIGUOUS = new Set(wl.ambiguousTokens.map((s) => s.toLowerCase()));
const FLAGGED = new Set(wl.flaggedTokens.map((s) => s.toLowerCase()));
/** Attested proverbs/mottos quoted verbatim — oral literature, not coined
 *  chrome (whitelist.json _quotedLiteratureRule; 04-laws.md §9 amendment
 *  2026-07-11). Stripped whole, longest-first, before token scanning so a
 *  documented proverb never trips the scope-token rule. */
const QUOTED = (wl.quotedLiterature ?? [])
  .slice()
  .sort((a, b) => b.length - a.length);
const SCOPE_TOKENS = new Set(
  scope.items.flatMap((i) => i.id.split(/\s+/)).map((s) => s.toLowerCase()),
);

/** Kreyòl orthography tell: IPN diacritics. */
const DIACRITIC = /[àèìòù]/i;

/** Copy law §2.1 — engine taxonomy that must never render on a kid surface. */
export const JARGON = [
  "ledger",
  "receptive",
  "productive",
  "tier",
  "band",
  "srs",
  "retrieval",
  "judgment-first",
  "synthetic",
  "native pass",
  "lint",
  "diagnostic",
  "persistence",
  "localstorage",
];

/** Copy law §2.2 — never name the fear. */
export const FEAR_WORDS = [
  "failure",
  "wrong",
  "error",
  "penalty",
  "mock",
  "lose",
  "test",
];

/** Copy law §2.4 — talk to the kid, never about him. */
export const THIRD_PERSON = ["the boys", "per boy", "each boy"];

/** Copy law §2.1 — spec plumbing. */
export const PLUMBING = ["§", "real build", "prototype:", "audit"];

function isWhitelisted(token, context) {
  if (PROPER.has(token)) return true;
  // multi-word proper nouns: the token counts only inside an exact-case
  // occurrence of the full noun
  for (const noun of PROPER) {
    if (noun.includes(" ") && context.includes(noun)) {
      if (noun.split(" ").includes(token)) return true;
    }
  }
  return false;
}

/** LANGUAGE LINT — scan one rendered/authored ENGLISH-chrome string for
 *  Kreyòl leaking outside the gate helpers. Returns violation list. */
export function lintChromeString(str, where = "") {
  const violations = [];
  let scan = str;
  for (const phrase of QUOTED) {
    if (scan.toLowerCase().includes(phrase.toLowerCase())) {
      scan = scan.replace(
        new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"),
        " ",
      );
    }
  }
  const tokens = scan.split(/[^\p{L}\p{N}ÀàÈèÌìÒòÙù'’-]+/u).filter(Boolean);
  for (const tok of tokens) {
    const lower = tok.toLowerCase();
    if (FLAGGED.has(lower)) {
      violations.push({
        rule: "language/known-unlawful-token",
        where,
        token: tok,
      });
      continue;
    }
    if (DIACRITIC.test(tok)) {
      if (!isWhitelisted(tok, str))
        violations.push({
          rule: "language/diacritic-outside-gate",
          where,
          token: tok,
        });
      continue;
    }
    if (SCOPE_TOKENS.has(lower) && !AMBIGUOUS.has(lower)) {
      if (!isWhitelisted(tok, str))
        violations.push({
          rule: "language/scope-token-outside-gate",
          where,
          token: tok,
        });
    }
  }
  return violations;
}

/** COPY LINT — kid-surface English string (ui-strings en, kid component
 *  literals, toasts, title= attributes). */
export function lintKidCopy(str, where = "") {
  const violations = [];
  const lower = str.toLowerCase();
  for (const p of PLUMBING) {
    if (lower.includes(p))
      violations.push({ rule: "copy/spec-plumbing", where, token: p });
  }
  for (const j of JARGON) {
    if (new RegExp(`\\b${j.replace(/[-\s]/g, "[-\\s]")}\\b`, "i").test(str))
      violations.push({ rule: "copy/jargon", where, token: j });
  }
  for (const f of FEAR_WORDS) {
    if (new RegExp(`\\b${f}\\b`, "i").test(str))
      violations.push({ rule: "copy/fear-word", where, token: f });
  }
  for (const t of THIRD_PERSON) {
    if (lower.includes(t))
      violations.push({ rule: "copy/third-person-about-the-kid", where, token: t });
  }
  return violations;
}

/** SCOPE-COVERAGE LINT — a ui string whose ht words never appear in scope
 *  would never flip: build error (03-language-program.md §8). tw 8 strings
 *  are the sanctioned immersion bucket; tw 0 is the logo proper name. */
export function lintUiStringCoverage(key, s) {
  const violations = [];
  if (s.ht === null) return violations;
  if (s.tw === 8 || s.tw === 0) return violations;
  const words = s.ht
    .split(/[^\p{L}\p{N}ÀàÈèÌìÒòÙù'’]+/u)
    .filter((w) => w && !/^\d+$/.test(w));
  for (const w of words) {
    const lower = w.toLowerCase();
    const inScope =
      SCOPE_TOKENS.has(lower) ||
      PROPER.has(lower) ||
      scope.items.some((i) => i.id.toLowerCase() === lower);
    if (!inScope)
      violations.push({
        rule: "language/ht-word-not-in-scope",
        where: `ui-strings.${key}`,
        token: w,
      });
  }
  return violations;
}

/** Extract renderable text from a TS/TSX source file.
 *
 *  LINT POLICY (recorded; hardening to full AST analysis is part of the CI
 *  issue): comments and `${…}` interpolations are stripped; JSX TEXT NODES
 *  are linted at full strictness (they are definitionally rendered);
 *  QUOTED LITERALS with no whitespace and no diacritics are exempt — they
 *  are lookup keys and enums (`c("konbit")`, "padon_used"), which are the
 *  lawful chrome path itself, not rendered text. Any rendered Kreyòl worth
 *  the name carries whitespace or diacritics, and single-word chrome comes
 *  from ui-strings.json, which section 1 of the lint covers in full. */
export function extractStrings(src, opts = { jsx: true }) {
  // strip comments (line + block), then blank template interpolations
  const noComments = src
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
  const out = [];
  const re = /"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`/gs;
  let m;
  while ((m = re.exec(noComments))) {
    let s = m[1] ?? m[2] ?? m[3];
    if (!s) continue;
    s = s.replace(/\$\{[^}]*\}/g, " ");
    if (!/\p{L}/u.test(s)) continue;
    const isKeyLike = !/\s/.test(s.trim()) && !DIACRITIC.test(s);
    if (isKeyLike) continue;
    out.push(s);
  }
  // JSX text nodes: >text< — always rendered, always linted. Only .tsx
  // files (in .ts the same pattern matches between type generics).
  if (opts.jsx) {
    const jsx = />([^<>{}]+)</g;
    while ((m = jsx.exec(noComments))) {
      const s = m[1].trim();
      if (s && /\p{L}/u.test(s)) out.push(s);
    }
  }
  return out;
}
