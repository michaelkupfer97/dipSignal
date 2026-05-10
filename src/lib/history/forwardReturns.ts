import type { HistoryRow } from "@/lib/types";
import { getDailyCandles } from "@/lib/market/yahoo";
import { getHistory, setHistory } from "./historyStore";

const FORWARD_SESSIONS = 20;

/**
 * Fill forwardReturnPct (20 trading sessions) where SPX data exists and value was null.
 */
export async function updateForwardReturns() {
  const rows = await getHistory();
  if (rows.length === 0) return;

  const spx = await getDailyCandles("^GSPC", "5y");
  const indexByDate = new Map(spx.map((c, i) => [c.date, i]));

  let changed = false;
  const next = rows.map((row) => {
    if (row.forwardReturnPct != null) return row;
    const idx = indexByDate.get(row.date);
    if (idx === undefined) return row;
    const future = spx[idx + FORWARD_SESSIONS];
    if (!future) return row;
    const base = spx[idx]!.close;
    const pct = ((future.close - base) / base) * 100;
    changed = true;
    return { ...row, forwardReturnPct: pct };
  });

  if (changed) {
    await setHistory(next);
  }
}
