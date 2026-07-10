import Link from "next/link";
import Flip from "@/components/Flip";
import { chrome } from "@/lib/chrome";
import { getStore } from "@/lib/store/local";

/** The gate — profile doors. Pre-Unit-1 surface: renders fully English at
 *  a fresh state (language law §1.8). Doors carry NAME + ROLE ONLY (copy
 *  law 3); the konbit goldband is the one shared number. */
export const dynamic = "force-dynamic";

export default async function Gate() {
  const state = await getStore().load();
  const { unit, certified, konbit, profiles } = state;
  const c = (key: string) => chrome(key, unit, certified);

  return (
    <main className="page">
      <header className="scoreboard">
        <div>
          <div className="label">two brothers, one rope</div>
          <h1 className="d1">
            <Flip view={c("logo")} />
          </h1>
        </div>
      </header>

      <div className="goldband">
        <Flip view={c("konbit")} /> · {konbit.streak}{" "}
        <Flip view={c("days")} /> — <Flip view={c("konbit_survives")} />
      </div>

      <div className="doors">
        {(["leo", "isaac"] as const).map((id) => (
          <Link key={id} href={`/play/${id}`} className="door">
            <span className={`liy ${profiles[id].color}`}>
              {profiles[id].name[0]}
            </span>
            <div className="d3">{profiles[id].name}</div>
            <div className="label">{profiles[id].role}</div>
          </Link>
        ))}
        <Link href="/gm" className="door">
          <span className="liy adult">M</span>
          <div className="d3">Manman</div>
          <div className="label">Cipher Office</div>
        </Link>
        <Link href="/gm" className="door">
          <span className="liy adult">G</span>
          <div className="d3">GM</div>
          <div className="label">War room</div>
        </Link>
      </div>

      <p className="label">
        <Flip view={c("saving")} />
      </p>
    </main>
  );
}
