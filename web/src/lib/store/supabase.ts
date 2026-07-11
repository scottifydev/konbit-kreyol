import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { AppState, Store } from "./adapter";
import { freshState } from "./adapter";

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
      const fresh = freshState();
      await this.save(fresh);
      return fresh;
    }
    return data.data as AppState;
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
