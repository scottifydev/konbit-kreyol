import { notFound } from "next/navigation";
import Flip from "@/components/Flip";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";
import { KANPAY } from "@/data/kanpay";
import DispatchClient from "./DispatchClient";

export const dynamic = "force-dynamic";

/** Dispatch surface (phone-first). The chapter's prompt + the inbox. */
export default async function DispatchPage({
  params,
}: {
  params: Promise<{ boy: string }>;
}) {
  const { boy } = await params;
  const state = await getStore().load();
  const p = state.profiles[boy];
  if (!p || p.kind !== "boy") notFound();

  const { unit, certified } = state;
  const c = (key: string) => chrome(key, unit, certified);
  const brother = boy === "leo" ? "isaac" : "leo";
  const chapter = KANPAY.find((ch) => ch.unit === unit) ?? KANPAY[0];
  const prompt = chapter.scenes[0]?.dispatchPrompt;
  if (!prompt) notFound();

  return (
    <main className="page">
      <header className="scoreboard">
        <div>
          <div className="label">
            {chapter.n}. {chapter.nameEn} · {chapter.year}
          </div>
          <h1 className="d1">
            <Flip view={c("prod")} />
          </h1>
        </div>
      </header>
      <DispatchClient
        boy={boy}
        brother={brother}
        promptId={prompt.id}
        labels={{
          promptEn: prompt.promptEn,
          hold: c("hold_button").text,
          denied: [
            c("mic_step1").text,
            c("mic_step2").text,
            c("mic_step3").text,
          ],
          inbox: c("dispatch_inbox").text,
          garbled: c("dispatch_garbled").text,
          repeat: c("dispatch_repeat").text,
          acted: c("dispatch_acted").text,
        }}
      />
    </main>
  );
}
