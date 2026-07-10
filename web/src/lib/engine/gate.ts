import type { UiString } from "./types";

/** THE LANGUAGE LAW (04-laws.md §1) — the flip gate.
 *
 *  taught(tw) ⇔ tw === 8 ? unit >= 8 : unit > tw
 *
 *  A string flips to Kreyòl only when the unit teaching its words is
 *  FINISHED. Unit 8 (capstone immersion) is the sole exception: it flips
 *  AT 8. The `>=` bug — flipping when a unit *starts* — shipped once and
 *  was caught on screenshot. Never reintroduce it.
 */
export function taught(tw: number, unit: number): boolean {
  return tw === 8 ? unit >= 8 : unit > tw;
}

export interface ChromeView {
  /** what actually renders */
  text: string;
  /** true when the rendered text is Kreyòl (must carry data-en + long-press) */
  kreyol: boolean;
  /** English twin, always available (long-press reveal) */
  en: string;
  /** newly flipped this unit → .flipnew affordance */
  isNew: boolean;
}

export interface ResolveOpts {
  /** dev-panel preview only. A boy-profile build NEVER sets this:
   *  unreviewed Kreyòl must not reach the boys (the native gate). */
  previewUnreviewed?: boolean;
}

/** Resolve one chrome string through BOTH gates:
 *  1. the flip gate (taught — sequencing), and
 *  2. the native gate (needsReview — correctness; Manman's pass).
 *  A string renders Kreyòl only when taught AND certified (or explicitly
 *  previewed on a dev surface). ht === null means no draft exists yet. */
export function resolveChrome(
  s: UiString,
  unit: number,
  opts: ResolveOpts = {},
): ChromeView {
  const flips =
    s.ht !== null &&
    taught(s.tw, unit) &&
    (!s.needsReview || opts.previewUnreviewed === true);
  if (!flips) return { text: s.en, kreyol: false, en: s.en, isNew: false };
  const isNew = s.tw === 8 ? unit === 8 : s.tw === unit - 1;
  return { text: s.ht as string, kreyol: true, en: s.en, isNew };
}

/** Bilingual unit titles: "Manje · Food" until the unit completes, then solo
 *  Kreyòl. The native gate applies first: until Manman certifies a title,
 *  only its English renders to the boys — even in the bilingual stage. */
export function unitTitle(
  u: number,
  unit: number,
  titles: Record<number, { en: string; ht: string; needsReview: boolean }>,
  opts: ResolveOpts = {},
): ChromeView {
  const t = titles[u];
  const certified = !t.needsReview || opts.previewUnreviewed === true;
  if (!certified) return { text: t.en, kreyol: false, en: t.en, isNew: false };
  if (taught(u === 8 ? 8 : u, unit))
    return { text: t.ht, kreyol: true, en: t.en, isNew: false };
  return { text: `${t.ht} · ${t.en}`, kreyol: true, en: t.en, isNew: false };
}
