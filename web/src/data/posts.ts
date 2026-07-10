/** Fil la launch posts — CONTENT DATA (the flip gate does not apply; the
 *  NATIVE GATE does). Ported from v6-4 with the trap fix (06 §5.10):
 *  p4 and p5 were Claude-authored register claims wrongly marked reviewed —
 *  corrected to needsReview: true. A boy-profile build filters out every
 *  post with needsReview !== false. Segments: [kreyòl text, tap-gloss?]. */

export interface Post {
  id: string;
  pfp: string; // emoji allowed inside post bodies/avatars — register is native here
  base: number;
  who: string;
  sub: string;
  tag: string;
  u: number;
  ht: [string, string?][];
  en: string;
  items: string[];
  needsReview: boolean;
  audio?: string;
  link?: string;
}

export const POSTS: Post[] = [
  {
    id: "p1",
    pfp: "👩🏾",
    base: 4,
    who: "Manman",
    sub: "chat fanmi an",
    tag: "Fanmi",
    u: 2,
    ht: [
      ["Leo, ou fè devwa w? "],
      ["Reponn mwen souple", "answer me please"],
      [" 😤 M ap tann ou, manje a "],
      ["pare", "ready"],
      ["!"],
    ],
    en: "Leo, did you do your homework? Answer me please 😤 I'm waiting, food's ready!",
    items: ["manje", "fè", "ou"],
    needsReview: true,
  },
  {
    id: "p2",
    pfp: "🦜",
    base: 21,
    who: "Pwovèb jodi a",
    sub: "oral tradition",
    tag: "Pwovèb",
    u: 2,
    ht: [
      ["Piti piti "],
      ["zwazo", "bird"],
      [" fè "],
      ["nich", "nest"],
      [" li."],
    ],
    en: "Little by little, the bird builds its nest.",
    items: ["piti piti zwazo fè nich li", "fè", "li"],
    needsReview: false, // attested oral literature, verified form
  },
  {
    id: "p3",
    pfp: "⚽",
    base: 34,
    who: "Foutbòl cho",
    sub: "gwo pale",
    tag: "Espò",
    u: 3,
    ht: [
      ["GÒÒÒL!! 🔥 Defans lan "],
      ["te dòmi", "was asleep — te = past"],
      [" men nou genyen "],
      ["kanmenm", "anyway / still"],
      ["!!"],
    ],
    en: "GOAL!! The defense was asleep but we won anyway!!",
    items: ["te", "dòmi", "men", "genyen"],
    needsReview: true,
  },
  {
    id: "p4",
    pfp: "🧢",
    base: 17,
    who: "Dekòdè slang",
    sub: "jan jèn yo pale",
    tag: "Slang",
    u: 1,
    ht: [["Tèt chaje 🤯 — lè tout bagay an dezòd. Safe — even ak Manman."]],
    en: "'Loaded head' — overwhelmed, what a mess.",
    items: ["tèt chaje", "tout", "bagay", "lè"],
    needsReview: true, // trap fix: register claim, Claude-authored — was false in v6-4
  },
  {
    id: "p5",
    pfp: "👋",
    base: 12,
    who: "Salitasyon",
    sub: "greeting check",
    tag: "Fanmi",
    u: 1,
    ht: [
      ["Jèn yo di: "],
      ["Sa k ap fèt?", "what's happening — current casual greeting"],
      [" oswa "],
      ["Sak cho?", "what's poppin"],
      [" · Ak granmoun: "],
      ["Kòman ou ye?", "how are you — neutral, elders"],
    ],
    en: "Register by person: casual with peers, neutral with elders. ('Sak pase' reads dated now.)",
    items: ["sa k ap fèt", "sak cho", "kòman ou ye", "oswa"],
    needsReview: true, // trap fix: register claim, Claude-authored — was false in v6-4
  },
  {
    id: "p6",
    pfp: "📱",
    base: 9,
    who: "Chat-Kreyòl 101",
    sub: "two costumes, one language",
    tag: "Chat",
    u: 4,
    ht: [
      ["Liv: « m ap vini kounye a » · Chat: « "],
      ["map vini kounya", "fused spelling — same sentence"],
      [" » — menm fraz la!"],
    ],
    en: "Book spelling vs chat spelling — you must read both.",
    items: ["ap", "kounye a", "vini", "menm"],
    needsReview: true,
  },
  {
    id: "p7",
    pfp: "🎺",
    base: 15,
    who: "Konpa klasik",
    sub: "Tabou Combo · 1975",
    tag: "Mizik",
    u: 3,
    ht: [
      [
        "Refren semèn nan: « New York City » — koute l 3 fwa, chante l pou frè w.",
      ],
    ],
    en: "This week's chorus — listen 3×, sing it for your brother. Opens the full-song rung.",
    items: ["frè", "lè", "semèn"],
    needsReview: true,
    link: "YouTube",
  },
  {
    id: "p8",
    pfp: "🔑",
    base: 7,
    who: "Ti mo jodi a",
    sub: "little words, big load",
    tag: "TiMo",
    u: 1,
    ht: [
      ["« "],
      ["toujou", "always / still"],
      [" » · « "],
      ["tou", "also"],
      [" » · « "],
      ["menm", "same / even"],
      [" » — twa ti mo, anpil travay."],
    ],
    en: "Three little words that carry huge functional load.",
    items: ["toujou", "tou", "menm", "anpil", "travay"],
    needsReview: true,
  },
  {
    id: "p9",
    pfp: "🍲",
    base: 28,
    who: "Kizin Grann",
    sub: "vwa fanmi",
    tag: "Manje",
    u: 3,
    ht: [
      ["« "],
      ["Mete", "put"],
      [" diri a nan dlo a, epi "],
      ["kwit", "cook"],
      [" li ak pwa. » — Grann"],
    ],
    en: "Put the rice in the water, then cook it with the beans.",
    items: ["mete", "diri", "dlo", "kwit", "pwa", "epi", "kizin"],
    needsReview: true,
    audio: "family-pending", // renders as "not recorded yet — go bug Grann"
  },
  {
    id: "p10",
    pfp: "⚖️",
    base: 19,
    who: "Konparezon",
    sub: "pi … pase",
    tag: "Espò",
    u: 2,
    ht: [
      ["Griyo "],
      ["pi bon pase", "better than — comparative"],
      [" pizza. Pa diskite. 🔥"],
    ],
    en: "Griyo is better than pizza. Don't argue.",
    items: ["pi", "pase", "bon", "griyo"],
    needsReview: true,
  },
];

/** The boys' build: unreviewed posts never render (native gate). */
export function postsForBoys(): Post[] {
  return POSTS.filter((p) => p.needsReview === false);
}
