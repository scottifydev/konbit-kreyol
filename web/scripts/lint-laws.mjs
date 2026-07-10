#!/usr/bin/env node
/** CI gate: language lint + copy lint + scope-coverage lint (04-laws.md §9).
 *  Exits 1 on any violation. Run: npm run lint:laws */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  extractStrings,
  lintChromeString,
  lintKidCopy,
  lintUiStringCoverage,
} from "../lint/rules.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const violations = [];

/* 1 · ui-strings.json — en fields are kid copy; ht fields must be scope-covered */
const ui = JSON.parse(
  readFileSync(join(root, "src/data/ui-strings.json"), "utf8"),
);
for (const [key, s] of Object.entries(ui.strings)) {
  violations.push(...lintKidCopy(s.en, `ui-strings.${key}.en`));
  violations.push(...lintUiStringCoverage(key, s));
}

/* 2 · chrome source files.
 *    Language lint (zero Kreyòl literals in templates, law §1.4) applies to
 *    ALL chrome dirs — including adult surfaces; the gate helpers are the
 *    only lawful path for Kreyòl.
 *    Copy lint applies to KID surfaces only: src/app minus /gm (adult) and
 *    /api (machine-facing; anything an API sends to a kid screen must come
 *    from ui-strings, which section 1 covers), plus src/components. */
const LANGUAGE_DIRS = ["src/app", "src/components", "src/lib"];
const KID_EXEMPT = [/src[\\/]app[\\/]gm([\\/]|$)/, /src[\\/]app[\\/]api([\\/]|$)/, /src[\\/]lib([\\/]|$)/];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?)$/.test(name)) {
      const src = readFileSync(p, "utf8");
      const rel = relative(root, p);
      const kidSurface = !KID_EXEMPT.some((re) => re.test(p));
      for (const s of extractStrings(src, { jsx: /\.[jt]sx$/.test(name) })) {
        violations.push(...lintChromeString(s, rel));
        if (kidSurface) violations.push(...lintKidCopy(s, rel));
      }
    }
  }
}
for (const d of LANGUAGE_DIRS) walk(join(root, d));

/* 3 · report */
if (violations.length) {
  console.error(`LAW LINT: ${violations.length} violation(s)\n`);
  for (const v of violations)
    console.error(`  [${v.rule}] ${v.where} → "${v.token}"`);
  process.exit(1);
}
console.log("LAW LINT: clean (language law + copy law + scope coverage)");
