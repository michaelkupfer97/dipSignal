import type { HistoryRow } from "@/lib/types";
import { getDailyCandles } from "@/lib/market/yahoo";
import { getHistory, setHistory } from "./historyStore";

/** Return from signal-day close to latest SPX close (%). */
export function returnSinceSignalPct(baseClose: number, latestClose: number) {
  return ((latestClose - baseClose) / baseClose) * 100;
}

export function resolveSignalBaseClose(
  row: HistoryRow,
  closeByDate: Map<string, number>,
): number | null {
  if (row.sp500Close != null && row.sp500Close > 0) {
    return row.sp500Close;
  }
  return closeByDate.get(row.date) ?? null;
}

/**
 * Recompute forwardReturnPct for all signal rows (rulesMet >= 2):
 * close on signal day through latest ^GSPC close.
 */
export async function updateForwardReturns() {
  const rows = await getHistory();
  if (rows.length === 0) return;

  const spx = await getDailyCandles("^GSPC", "5y");
  const latest = spx.at(-1);
  if (!latest) return;

  const latestClose = latest.close;
  const closeByDate = new Map(spx.map((candle) => [candle.date, candle.close]));

  let changed = false;
  const next = rows.map((row) => {
    if (row.rulesMet < 2) return row;

    const baseClose = resolveSignalBaseClose(row, closeByDate);
    if (baseClose == null) return row;

    const forwardReturnPct = returnSinceSignalPct(baseClose, latestClose);
    const sp500Close = row.sp500Close ?? baseClose;

    if (row.forwardReturnPct === forwardReturnPct && row.sp500Close === sp500Close) {
      return row;
    }

    changed = true;
    return { ...row, sp500Close, forwardReturnPct };
  });

  if (changed) {
    await setHistory(next);
  }
}
