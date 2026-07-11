import Link from "next/link";
import { notFound } from "next/navigation";
import Flip from "@/components/Flip";
import SettingsClient from "./SettingsClient";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";

export const dynamic = "force-dynamic";

/** Settings — Pro mode, the family export, and leaving the network. English
 *  chrome; no game numbers comparable across brothers here. */
export default async function SettingsPage({
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

  return (
    <main className="stage">
      <header className="head">
        <div>
          <h1 className="d1 gold">
            <Flip view={c("settings")} />
          </h1>
        </div>
      </header>

      <SettingsClient
        boy={boy}
        pwoMode={p.pwoMode}
        labels={{
          pwo: c("set_pwo").text,
          pwoSub: c("set_pwo_sub").text,
          on: c("set_on").text,
          off: c("set_off").text,
          exportTitle: c("set_export").text,
          exportSub: c("set_export_sub").text,
          exportBtn: c("set_export_btn").text,
          leave: c("set_leave").text,
        }}
      />

      <nav className="index label" style={{ marginTop: 26 }}>
        <Link href={`/play/${boy}`}>
          <Flip view={c("dash")} />
        </Link>
      </nav>
    </main>
  );
}
