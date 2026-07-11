import { NextResponse } from "next/server";
import { HttpError, type AppState, type Store } from "./store/adapter";

/** Run a mutating route inside store.transaction() and JSON-respond. A
 *  validation failure inside the mutator throws HttpError(status) → that
 *  status, no save, no retry. Audio uploads must happen BEFORE this (the
 *  mutator may re-run on a write conflict). */
export async function txJson(
  store: Store,
  mutator: (state: AppState) => unknown | Promise<unknown>,
): Promise<NextResponse> {
  try {
    const body = await store.transaction(mutator);
    return NextResponse.json(body as Record<string, unknown>);
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json({ ok: false }, { status: e.status });
    }
    throw e;
  }
}
