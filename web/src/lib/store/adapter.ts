import type { Dispatch, KonbitState, Profile, UiString } from "../engine/types";

/** Persistence contract. Two implementations:
 *  - LocalStore: dev placeholder — JSON under web/.data (gitignored).
 *  - SupabaseStore: production target (06-engineering.md §1) — activated
 *    when SUPABASE_URL / SUPABASE_ANON_KEY are set. Until Scott creates
 *    the Supabase project (open gate, 00 §5), LocalStore carries dev.
 *
 *  GM LAW 1 lives at this seam too: certification and GM writes go through
 *  dedicated methods that CANNOT touch profile ledgers. */
export interface AppState {
  day: number;
  unit: number;
  profiles: Record<string, Profile>;
  konbit: KonbitState;
  /** Cipher Office certification overlay: uiKey -> certified (needsReview
   *  flipped false by Manman). Content certification uses the same map with
   *  namespaced keys (post:p2, kanpay:ch1-name, …). */
  certified: Record<string, boolean>;
  dispatches: Dispatch[];
}

export interface Store {
  load(): Promise<AppState>;
  save(state: AppState): Promise<void>;
  /** audio blobs: returns an opaque ref (path or bucket key) */
  saveAudio(id: string, data: Uint8Array, mime: string): Promise<string>;
  readAudio(ref: string): Promise<{ data: Uint8Array; mime: string } | null>;
}

export function certifiedUiString(
  s: UiString,
  key: string,
  certified: Record<string, boolean>,
): UiString {
  if (certified[`ui:${key}`]) return { ...s, needsReview: false };
  return s;
}
