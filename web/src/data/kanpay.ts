/** The campaign (kanpay) — chapters, scenes, checks, anthem slots.
 *  CONTENT DATA: scene narration is a content class (01 §10) — English by
 *  default, embedded Kreyòl glossed and needsReview:true until Manman.
 *  History facts are BINDING per 01-world-and-story.md §4. History checks
 *  are bonus routes, never gates (02 §3.3). All Kreyòl scene dialogue here
 *  is placeholder-ticketed (htDraft: null) — Claude coins nothing.
 *
 *  ANACHRONISM DOCTRINE (04 §3): the network/phones are canon; every date,
 *  person, and legend-flag below obeys the history bible; no anachronism
 *  inside the Bwa Kayiman ceremony frame (which this chapter therefore
 *  never depicts — the rising is the story, the meeting is history told). */

export interface DispatchPrompt {
  id: string;
  /** what the sender is asked to say — targets scope items */
  promptEn: string;
  targetItems: string[];
  /** the paired act-on-it check shown to the RECEIVER after listening.
   *  Comprehension proven by action: the right option is only knowable
   *  by understanding the audio (voice law 2). */
  check: { question: string; options: string[]; answer: number };
}

export interface Scene {
  id: string;
  /** second-person, present-tense English narration (comprehension
   *  scaffolding); embedded Kreyòl arrives later via Manman-passed lines */
  narrationEn: string[];
  /** open tickets for Kreyòl dialogue lines — null until Manman */
  htLines: { ticket: string; ht: string | null; needsReview: true }[];
  choices: { label: string; goto: string }[];
  dispatchPrompt?: DispatchPrompt;
  /** bonus route, never a gate */
  historyCheck?: {
    factEn: string;
    question: string;
    options: string[];
    answer: number;
    bonusRoute: string;
  };
}

export interface Chapter {
  n: number;
  unit: number;
  year: string;
  /** English name always available; the Kreyòl chapter name is subject to
   *  the open naming gates (Ch1: Scott decides Bwa Kayiman vs Soulèvman
   *  1791 — sensitivity ruling 2) */
  nameEn: string;
  nameHt: string | null;
  needsReview: boolean;
  milestoneFactEn: string;
  anthem: {
    status: "unvetted" | "vetted";
    /** candidates only — boys nominate, family vets; slots not songs (01 §6) */
    candidateNote: string;
    link: string | null;
  };
  enemyIntelBeats: string[];
  scenes: Scene[];
}

export const KANPAY: Chapter[] = [
  {
    n: 1,
    unit: 1,
    year: "1791",
    nameEn: "The Rising",
    nameHt: "Soulèvman 1791", // fallback name per sensitivity ruling 2; Scott decides the default
    needsReview: true,
    milestoneFactEn:
      "August 1791: after a secret night meeting led by Boukman, plantations across the northern plain rose together within days — remembered as the spark of the revolution.",
    anthem: {
      status: "unvetted",
      candidateNote:
        "Boukman Eksperyans is the natural candidate (named for Boukman) — family vets the specific track; some catalog carries Vodou content, so track choice is the real vetting question.",
      link: null,
    },
    enemyIntelBeats: [
      // GM-voiced, comic-overconfident, never menacing (GM law 3). Working copy.
      "INTERCEPTED — Colonial office memo: “The plantations report unusual singing. We are assured it is merely singing. No further action required.”",
      "INTERCEPTED — Colonial office memo: “The messages we seized cannot be read by any of our clerks. Conclusion: they contain nothing.”",
    ],
    scenes: [
      {
        id: "ch1-s1",
        narrationEn: [
          "A rider stops you at the ford. Your phone buzzes — the network wants to know he is one of ours.",
          "He watches you. The right greeting opens the road; a badly chosen one closes his face like a door.",
        ],
        htLines: [
          {
            ticket: "ch1-s1-rider-greeting — rider's line, register: stranger→teen courier",
            ht: null,
            needsReview: true,
          },
        ],
        choices: [
          { label: "Greet him — he is older; choose the respectful form", goto: "ch1-s2" },
          { label: "Say nothing and show the phone", goto: "ch1-s2b" },
        ],
        dispatchPrompt: {
          id: "ch1-d1",
          promptEn:
            "Record the password exchange for your brother: greet him the way you would greet an elder.",
          targetItems: ["kòman ou ye", "mèsi anpil"],
          check: {
            question: "Your brother's dispatch — which greeting did he use?",
            options: [
              "The one for elders",
              "The one for close friends",
              "No greeting — just the password",
            ],
            answer: 0,
          },
        },
        historyCheck: {
          factEn:
            "The rising was coordinated: plantations across the northern plain moved within days of each other.",
          question:
            "The rider asks how far the word has traveled. What do you know?",
          options: [
            "One plantation at a time, slowly",
            "Across the whole northern plain, within days",
            "Only the port towns",
          ],
          answer: 1,
          bonusRoute:
            "He nods — you know the shape of the thing. He shows you the shortcut past the checkpoint.",
        },
      },
    ],
  },
  {
    n: 2,
    unit: 2,
    year: "1793",
    nameEn: "Freedom Proclaimed",
    nameHt: "Libète pwoklame",
    needsReview: true,
    milestoneFactEn:
      "Aug 29, 1793: Sonthonax proclaimed the enslaved people of the north free — conceding on paper what the fighters had already taken. Toussaint Louverture rose as the revolution's general, joining the side that ended slavery.",
    anthem: { status: "unvetted", candidateNote: "Family vets; boys nominate.", link: null },
    enemyIntelBeats: [],
    scenes: [],
  },
  {
    n: 3,
    unit: 3,
    year: "1798",
    nameEn: "The British Sent Home",
    nameHt: null,
    needsReview: true,
    milestoneFactEn:
      "1798: Toussaint out-generaled a full British invasion and sent them home without their colony.",
    anthem: { status: "unvetted", candidateNote: "Family vets; boys nominate.", link: null },
    enemyIntelBeats: [],
    scenes: [],
  },
  {
    n: 4,
    unit: 4,
    year: "1802",
    nameEn: "The Ravine",
    nameHt: "Ravin Koulèv", // LOWER-CONFIDENCE SPELLING — native reviewer flag (01 §11)
    needsReview: true,
    milestoneFactEn:
      "Feb 23, 1802: Toussaint's outnumbered soldiers made a fierce stand in a narrow wooded gorge against Napoleon's veteran invasion force — a tactical French win remembered as a heroic stand.",
    anthem: { status: "unvetted", candidateNote: "Family vets; boys nominate.", link: null },
    enemyIntelBeats: [],
    scenes: [],
  },
  {
    n: 5,
    unit: 5,
    year: "1802",
    nameEn: "The Fort",
    nameHt: "Lakrèt-a-Pyewo",
    needsReview: true,
    milestoneFactEn:
      "March 1802: Dessalines and a small force held a mountain fort about twenty days against a much larger French army, then cut their way out through the siege lines at night to fight on.",
    anthem: { status: "unvetted", candidateNote: "Family vets; boys nominate.", link: null },
    enemyIntelBeats: [],
    scenes: [],
  },
  {
    n: 6,
    unit: 6,
    year: "1803",
    nameEn: "The Flag",
    nameHt: "Drapo a — Akayè",
    needsReview: true,
    milestoneFactEn:
      "May 18, 1803: rival leaders united at Arcahaie and created the blue-and-red flag by tearing the white from the French tricolor. The story goes that Catherine Flon sewed it — cherished tradition, told as tradition.",
    anthem: { status: "unvetted", candidateNote: "Family vets; boys nominate.", link: null },
    enemyIntelBeats: [],
    scenes: [],
  },
  {
    n: 7,
    unit: 7,
    year: "1803",
    nameEn: "The Last Battle",
    nameHt: "Batay Vètyè",
    needsReview: true,
    milestoneFactEn:
      "Nov 18, 1803: the last great battle. Capois' horse was shot from under him — he got up and kept charging, shouting « An avan! An avan! ». The story goes Rochambeau briefly halted fire to salute his bravery.",
    anthem: { status: "unvetted", candidateNote: "Family vets; boys nominate.", link: null },
    enemyIntelBeats: [],
    scenes: [],
  },
  {
    n: 8,
    unit: 8,
    year: "1804",
    nameEn: "Independence",
    nameHt: "Endepandans",
    needsReview: true,
    milestoneFactEn:
      "Jan 1, 1804: at Gonaïves, Dessalines proclaimed the first nation born of a successful slave revolution, reclaiming the Indigenous name Ayiti.",
    anthem: { status: "unvetted", candidateNote: "Family vets; boys nominate.", link: null },
    enemyIntelBeats: [],
    scenes: [],
  },
];
