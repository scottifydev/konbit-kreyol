import uiData from "@/data/ui-strings.json";
import { resolveChrome, unitTitle, type ChromeView } from "./engine/gate";
import type { UiString } from "./engine/types";
import { certifiedUiString } from "./store/adapter";

/** Server-side chrome resolution: ui-strings.json + Cipher Office
 *  certification overlay + the flip gate. THE ONLY PATH for chrome text —
 *  zero Kreyòl literals in templates (language law §1.4). */

type UiTable = Record<string, UiString>;
const STRINGS = (uiData as { strings: UiTable }).strings;
const UNIT_TITLES = (
  uiData as {
    units: Record<string, { en: string; ht: string; needsReview: boolean }>;
  }
).units;

export function chrome(
  key: string,
  unit: number,
  certified: Record<string, boolean> = {},
): ChromeView {
  const s = STRINGS[key];
  if (!s) throw new Error(`chrome: unknown ui string "${key}"`);
  return resolveChrome(certifiedUiString(s, key, certified), unit);
}

export function chromeUnitTitle(
  u: number,
  unit: number,
  certified: Record<string, boolean> = {},
): ChromeView {
  const titles: Record<
    number,
    { en: string; ht: string; needsReview: boolean }
  > = {};
  for (const [k, v] of Object.entries(UNIT_TITLES)) {
    titles[Number(k)] = certified[`unit:${k}`]
      ? { ...v, needsReview: false }
      : v;
  }
  return unitTitle(u, unit, titles);
}

export function allUiStrings(): UiTable {
  return STRINGS;
}
