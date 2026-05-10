import { fetchText } from "./http";

/** Daily OHLC from Stooq CSV: Date,Open,High,Low,Close,Volume */
export type StooqDailyRow = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

function parseCsvLine(line: string): string[] {
  const trimmed = line.trim();
  if (!trimmed) return [];
  return trimmed.split(",").map((cell) => cell.trim());
}

/**
 * Fetch daily candles from Stooq.
 * @see https://stooq.com/q/d/l/?s=<symbol>&i=d
 */
export async function fetchStooqDailyCsv(symbol: string): Promise<StooqDailyRow[]> {
  const encoded = encodeURIComponent(symbol);
  const url = `https://stooq.com/q/d/l/?s=${encoded}&i=d`;
  const text = await fetchText(url);
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) {
    return [];
  }

  const header = parseCsvLine(lines[0] ?? "").map((h) => h.toLowerCase());
  const dateIdx = header.indexOf("date");
  const openIdx = header.indexOf("open");
  const highIdx = header.indexOf("high");
  const lowIdx = header.indexOf("low");
  const closeIdx = header.indexOf("close");
  const volIdx = header.indexOf("volume");

  if (dateIdx < 0 || closeIdx < 0) {
    return [];
  }

  const rows: StooqDailyRow[] = [];
  for (let i = 1; i < lines.length; i += 1) {
    const cells = parseCsvLine(lines[i] ?? "");
    if (cells.length < Math.max(dateIdx, closeIdx) + 1) continue;

    const dateStr = cells[dateIdx];
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) continue;

    const close = Number(cells[closeIdx]);
    if (!Number.isFinite(close)) continue;

    rows.push({
      date: dateStr,
      open: openIdx >= 0 ? Number(cells[openIdx]) || close : close,
      high: highIdx >= 0 ? Number(cells[highIdx]) || close : close,
      low: lowIdx >= 0 ? Number(cells[lowIdx]) || close : close,
      close,
      volume: volIdx >= 0 ? Number(cells[volIdx]) || 0 : 0,
    });
  }

  return rows.sort((a, b) => a.date.localeCompare(b.date));
}

/** Stooq symbols that may represent S&P 500 % above 50-DMA (try in order). */
export const STOOQ_S5FI_CANDIDATES = ["^spxa50r", "xspxa50r", "^s5fi"] as const;

export async function fetchStooqSymbolOrThrow(symbol: string): Promise<StooqDailyRow[]> {
  const rows = await fetchStooqDailyCsv(symbol);
  if (rows.length === 0) {
    throw new Error(`No Stooq daily rows for ${symbol}`);
  }
  return rows;
}
