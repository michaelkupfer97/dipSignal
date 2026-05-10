import { fetchText } from "./http";
import { fetchStooqDailyCsv, STOOQ_S5FI_CANDIDATES } from "./stooq";

export type S5fiQuote = {
  date: string;
  value: number;
  source: string;
};

function parseEodDate(value: string) {
  const [day, monthText, yearText] = value.trim().split(/\s+/);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].indexOf(monthText ?? "");

  if (!day || month < 0 || !yearText) {
    return value;
  }

  const fullYear = Number(yearText) < 70 ? 2000 + Number(yearText) : 1900 + Number(yearText);
  return new Date(Date.UTC(fullYear, month, Number(day))).toISOString().slice(0, 10);
}

export async function fetchS5fiFromEodData(): Promise<S5fiQuote> {
  const html = await fetchText("https://www.eoddata.com/stockquote/INDEX/S5FI.htm");
  const rowPattern =
    /<tr>\s*<td[^>]*>\s*(\d{1,2}\s+[A-Z][a-z]{2}\s+\d{2})\s*<\/td>\s*<td[^>]*>\s*([\d.]+)\s*<\/td>\s*<td[^>]*>\s*([\d.]+)\s*<\/td>\s*<td[^>]*>\s*([\d.]+)\s*<\/td>\s*<td[^>]*>\s*([\d.]+)\s*<\/td>/i;
  const match = html.match(rowPattern);

  if (!match) {
    throw new Error("Could not parse S5FI row from EODData");
  }

  return {
    date: parseEodDate(match[1]!),
    value: Number(match[5]),
    source: "EODData INDEX/S5FI",
  };
}

async function fetchS5fiFromStooq(): Promise<S5fiQuote> {
  let lastError: Error | null = null;
  for (const sym of STOOQ_S5FI_CANDIDATES) {
    try {
      const rows = await fetchStooqDailyCsv(sym);
      const last = rows.at(-1);
      if (!last) continue;
      return {
        date: last.date,
        value: last.close,
        source: `Stooq ${sym}`,
      };
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e));
    }
  }
  throw lastError ?? new Error("Stooq S5FI fetch failed for all symbols");
}

/**
 * Published S5FI: Stooq first (reliable), then EODData scrape.
 */
export async function fetchPublishedS5fi(): Promise<S5fiQuote> {
  try {
    return await fetchS5fiFromStooq();
  } catch {
    return fetchS5fiFromEodData();
  }
}

/** Full daily series for backfill (same symbol priority as latest quote). */
export async function fetchPublishedS5fiHistory(): Promise<Map<string, number>> {
  const merged = new Map<string, number>();
  for (const sym of STOOQ_S5FI_CANDIDATES) {
    try {
      const rows = await fetchStooqDailyCsv(sym);
      if (rows.length === 0) continue;
      for (const row of rows) {
        merged.set(row.date, row.close);
      }
      if (merged.size > 100) {
        return merged;
      }
    } catch {
      // try next symbol
    }
  }
  return merged;
}
