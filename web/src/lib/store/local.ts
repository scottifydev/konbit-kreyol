import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { AppState, Store } from "./adapter";
import { freshState, rolloverDay } from "./adapter";
import { SupabaseStore } from "./supabase";

/** DEV PLACEHOLDER STORE — JSON under web/.data (gitignored). Used only when
 *  Supabase env is absent (local dev without a project). Production runs on
 *  SupabaseStore (06-engineering.md §1). freshState lives in ./adapter. */

const DATA_DIR = join(process.cwd(), ".data");
const STATE_FILE = join(DATA_DIR, "state.json");
const AUDIO_DIR = join(DATA_DIR, "audio");

export { freshState };

/** Process-wide serialization: every LocalStore transaction chains off the
 *  previous, so no two load→mutate→save cycles interleave (dev has no DB CAS). */
let localChain: Promise<unknown> = Promise.resolve();

export class LocalStore implements Store {
  async transaction<T>(
    mutator: (state: AppState) => T | Promise<T>,
  ): Promise<T> {
    const run = localChain.then(async () => {
      const state = await this.load();
      const result = await mutator(state);
      await this.save(state);
      return result;
    });
    // keep the chain alive whether this run succeeded or threw
    localChain = run.then(
      () => undefined,
      () => undefined,
    );
    return run as Promise<T>;
  }

  async load(): Promise<AppState> {
    if (!existsSync(STATE_FILE)) return rolloverDay(freshState());
    try {
      return rolloverDay(JSON.parse(await readFile(STATE_FILE, "utf8")) as AppState);
    } catch {
      return rolloverDay(freshState());
    }
  }

  async save(state: AppState): Promise<void> {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(STATE_FILE, JSON.stringify(state, null, 1));
  }

  async saveAudio(id: string, data: Uint8Array, mime: string): Promise<string> {
    await mkdir(AUDIO_DIR, { recursive: true });
    const ext = mime.includes("webm") ? "webm" : mime.includes("mp4") ? "m4a" : "bin";
    const ref = `${id}.${ext}`;
    await writeFile(join(AUDIO_DIR, ref), data);
    await writeFile(join(AUDIO_DIR, `${ref}.mime`), mime);
    return ref;
  }

  async readAudio(ref: string) {
    const p = join(AUDIO_DIR, ref);
    if (!existsSync(p)) return null;
    const data = new Uint8Array(await readFile(p));
    let mime = "audio/webm";
    try {
      mime = await readFile(`${p}.mime`, "utf8");
    } catch {
      /* default stands */
    }
    return { data, mime };
  }
}

/** Store factory. SupabaseStore when the project env is present (Vercel +
 *  local .env.local); LocalStore otherwise (dev without a project). */
export function getStore(): Store {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return new SupabaseStore();
  }
  return new LocalStore();
}
