import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { AppState, Store } from "./adapter";
import { freshState, rolloverDay } from "./adapter";

/** SUPABASE STORE — production persistence (06-engineering.md §1).
 *
 *  TRANSITIONAL SHAPE (2026-07-11): app state is one JSONB row in
 *  `public.app_state` (RLS on, no anon policy → reachable only by the
 *  server-side service-role client here). The normalized schema in
 *  supabase/migrations/0001_init.sql is the later target; this preserves
 *  the exact LocalStore contract so the app runs on the real backend and
 *  deploys to Vercel now. Audio lives in the private `dispatches` bucket
 *  ("stays in the family", voice law 6).
 *
 *  Server-only: uses SUPABASE_SERVICE_ROLE_KEY. Never import into a client
 *  component. All callers are Server Components / route handlers.
 */
const BUCKET = "dispatches";
const STATE_ID = 1;

export class SupabaseStore implements Store {
  private db: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error(
        "SupabaseStore requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      );
    }
    this.db = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  async load(): Promise<AppState> {
    const { data, error } = await this.db
      .from("app_state")
      .select("data")
      .eq("id", STATE_ID)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      const fresh = rolloverDay(freshState());
      await this.save(fresh);
      return fresh;
    }
    return rolloverDay(data.data as AppState);
  }

  /** Optimistic concurrency: read {data, updated_at}, run the mutator, then
   *  write only if updated_at is unchanged (compare-and-swap). A concurrent
   *  write bumps updated_at → 0 rows updated → retry on fresh state, so two
   *  simultaneous co-op writes serialize instead of clobbering. */
  async transaction<T>(
    mutator: (state: AppState) => T | Promise<T>,
  ): Promise<T> {
    for (let attempt = 0; attempt < 6; attempt++) {
      const { data, error } = await this.db
        .from("app_state")
        .select("data, updated_at")
        .eq("id", STATE_ID)
        .maybeSingle();
      if (error) throw error;
      const state = rolloverDay(
        data ? (data.data as AppState) : freshState(),
      );
      const result = await mutator(state); // may throw HttpError → aborts, no write
      const stamp = new Date().toISOString();
      if (!data) {
        const { error: ierr } = await this.db
          .from("app_state")
          .upsert({ id: STATE_ID, data: state, updated_at: stamp });
        if (ierr) throw ierr;
        return result;
      }
      const { data: upd, error: uerr } = await this.db
        .from("app_state")
        .update({ data: state, updated_at: stamp })
        .eq("id", STATE_ID)
        .eq("updated_at", data.updated_at as string)
        .select("id");
      if (uerr) throw uerr;
      if (upd && upd.length > 0) return result; // CAS won
      // else a concurrent write landed first — loop and re-apply on fresh state
    }
    throw new Error("app_state busy — concurrent write conflict after retries");
  }

  async save(state: AppState): Promise<void> {
    const { error } = await this.db
      .from("app_state")
      .upsert({ id: STATE_ID, data: state, updated_at: new Date().toISOString() });
    if (error) throw error;
  }

  async saveAudio(id: string, data: Uint8Array, mime: string): Promise<string> {
    const ext = mime.includes("webm") ? "webm" : mime.includes("mp4") ? "m4a" : "bin";
    const ref = `${id}.${ext}`;
    const { error } = await this.db.storage
      .from(BUCKET)
      .upload(ref, data, { contentType: mime, upsert: true });
    if (error) throw error;
    return ref;
  }

  async readAudio(ref: string) {
    const { data, error } = await this.db.storage.from(BUCKET).download(ref);
    if (error || !data) return null;
    const buf = new Uint8Array(await data.arrayBuffer());
    return { data: buf, mime: data.type || "audio/webm" };
  }
}
