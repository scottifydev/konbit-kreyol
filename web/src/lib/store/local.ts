import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { AppState, Store } from "./adapter";
import type { KonbitState, Profile } from "../engine/types";

/** DEV PLACEHOLDER STORE — JSON under web/.data (gitignored).
 *  Not the production stack: Supabase is (06 §1). This exists so the app
 *  runs end-to-end before Scott creates the Supabase project (open gate). */

const DATA_DIR = join(process.cwd(), ".data");
const STATE_FILE = join(DATA_DIR, "state.json");
const AUDIO_DIR = join(DATA_DIR, "audio");

function mkProfile(
  id: string,
  name: string,
  role: string,
  color: Profile["color"],
  kind: Profile["kind"],
): Profile {
  return {
    id,
    name,
    role,
    color,
    kind,
    band: null,
    diagDone: false,
    items: {},
    tiers: {},
    xp: 0,
    streak: 0,
    lastDay: 0,
    pwoMode: false,
    reactions: {},
    gotit: {},
  };
}

export function freshState(): AppState {
  const konbit: KonbitState = {
    streak: 0,
    lastDay: 0,
    stars: 0,
    padon: 1,
    mon: {
      unit: 1,
      threshold: 14,
      legs: {
        leo: { done: false, score: 0, tip: "" },
        isaac: { done: false, score: 0, tip: "" },
      },
      summited: false,
    },
  };
  return {
    day: 1,
    unit: 1, // fresh state boots Unit 1: all-English chrome (language law §1.8)
    profiles: {
      leo: mkProfile("leo", "Leo", "Reading lead", "leo", "boy"),
      isaac: mkProfile("isaac", "Isaac", "Listening lead", "isaac", "boy"),
      manman: mkProfile("manman", "Manman", "Cipher Office", "adult", "adult"),
      gm: mkProfile("gm", "GM", "War room", "adult", "adult"),
    },
    konbit,
    certified: {},
    dispatches: [],
  };
}

export class LocalStore implements Store {
  async load(): Promise<AppState> {
    if (!existsSync(STATE_FILE)) return freshState();
    try {
      return JSON.parse(await readFile(STATE_FILE, "utf8")) as AppState;
    } catch {
      return freshState();
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

/** Store factory. SupabaseStore lands behind the same interface when the
 *  project exists — see src/lib/store/supabase.ts. */
export function getStore(): Store {
  return new LocalStore();
}
