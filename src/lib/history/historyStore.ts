import type { HistoryRow, LastSignalSummary, LatestComputation } from "@/lib/types";
import { readJson, writeJson } from "@/lib/storage/jsonStore";

const HISTORY_KEY = "history";
const LATEST_KEY = "latest";

export async function getLatest() {
  return readJson<LatestComputation | null>(LATEST_KEY, null);
}

export async function setLatest(value: LatestComputation) {
  await writeJson(LATEST_KEY, value);
}

export async function getHistory() {
  return readJson<HistoryRow[]>(HISTORY_KEY, []);
}

export async function setHistory(rows: HistoryRow[]) {
  const deduped = new Map(rows.map((row) => [row.date, row]));
  const sorted = [...deduped.values()].sort((a, b) => a.date.localeCompare(b.date));
  await writeJson(HISTORY_KEY, sorted);
}

export async function appendHistory(row: HistoryRow) {
  const rows = await getHistory();
  await setHistory([...rows.filter((item) => item.date !== row.date), row]);
}

export function findLastSignal(rows: HistoryRow[]): LastSignalSummary | null {
  const signal = [...rows].reverse().find((row) => row.rulesMet >= 2);
  if (!signal) {
    return null;
  }

  return {
    date: signal.date,
    forwardReturnPct: signal.forwardReturnPct ?? null,
  };
}
