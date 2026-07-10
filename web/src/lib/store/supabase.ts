/** SUPABASE STORE — production target (06-engineering.md §1–2).
 *
 *  STATUS: skeleton. Blocked on an open human gate: Scott creates the
 *  Supabase project + billing (00-START-HERE.md §5). When SUPABASE_URL and
 *  SUPABASE_ANON_KEY exist, this class replaces LocalStore behind the same
 *  Store interface; the SQL schema is ready in supabase/migrations/.
 *
 *  Contracts this implementation must keep (law-level):
 *  - RLS scoped to the family; a boy session writes only his own rows.
 *  - gm_queue has NO write path into ledger tables (GM law 1).
 *  - Audio buckets are private; signed URLs only ("stays in the family",
 *    voice law 6); family export + delete supported.
 */
import type { AppState, Store } from "./adapter";

export class SupabaseStore implements Store {
  constructor() {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      throw new Error(
        "SupabaseStore requires SUPABASE_URL and SUPABASE_ANON_KEY — the project is an open gate (00-START-HERE.md §5). Dev runs on LocalStore.",
      );
    }
  }
  load(): Promise<AppState> {
    return Promise.reject(new Error("SupabaseStore: not yet implemented — see supabase/migrations/0001_init.sql for the ready schema"));
  }
  save(): Promise<void> {
    return Promise.reject(new Error("SupabaseStore: not yet implemented"));
  }
  saveAudio(): Promise<string> {
    return Promise.reject(new Error("SupabaseStore: not yet implemented"));
  }
  readAudio(): Promise<{ data: Uint8Array; mime: string } | null> {
    return Promise.reject(new Error("SupabaseStore: not yet implemented"));
  }
}
