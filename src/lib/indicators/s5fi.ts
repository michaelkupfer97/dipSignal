import type { Candle, IndicatorResult } from "@/lib/types";
import { fetchPublishedS5fi } from "@/lib/market/s5fiProviders";
import { fetchSp500Constituents } from "@/lib/market/sp500";
import { getDailyCandles } from "@/lib/market/yahoo";

function sma(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

async function runWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<R | null>,
) {
  const results: R[] = [];
  let index = 0;

  async function run() {
    while (index < items.length) {
      const current = items[index++];
      const result = await worker(current);
      if (result !== null) {
        results.push(result);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, run));
  return results;
}

function isAboveSma50(candles: Candle[]) {
  const closes = candles.map((candle) => candle.close).filter(Number.isFinite);
  if (closes.length < 50) {
    return null;
  }
  const latest = closes.at(-1)!;
  const average = sma(closes.slice(-50));
  return latest > average;
}

export async function calculateS5fiFromConstituents() {
  const constituents = await fetchSp500Constituents();
  const checks = await runWithConcurrency(constituents, 6, async (company) => {
    try {
      const candles = await getDailyCandles(company.yahooSymbol, "3mo");
      return isAboveSma50(candles);
    } catch {
      return null;
    }
  });

  if (checks.length < 400) {
    throw new Error(`Only ${checks.length} S&P 500 tickers returned usable SMA50 data`);
  }

  const above = checks.filter(Boolean).length;
  return (above / checks.length) * 100;
}

export async function calculateS5fiHistoryFromConstituents(range = "3y") {
  const constituents = await fetchSp500Constituents();
  const dateCounts = new Map<string, { above: number; total: number }>();

  await runWithConcurrency(constituents, 4, async (company) => {
    try {
      const candles = await getDailyCandles(company.yahooSymbol, range);
      for (let index = 49; index < candles.length; index += 1) {
        const window = candles.slice(index - 49, index + 1);
        const average = sma(window.map((candle) => candle.close));
        const date = candles[index].date;
        const current = dateCounts.get(date) ?? { above: 0, total: 0 };
        current.total += 1;
        if (candles[index].close > average) {
          current.above += 1;
        }
        dateCounts.set(date, current);
      }
      return true;
    } catch {
      return null;
    }
  });

  return new Map(
    [...dateCounts.entries()]
      .filter(([, value]) => value.total >= 400)
      .map(([date, value]) => [date, (value.above / value.total) * 100]),
  );
}

export async function getS5fi(): Promise<IndicatorResult> {
  try {
    let value: number;
    let asOf = new Date().toISOString();
    let source = "EODData INDEX/S5FI";

    try {
      const quote = await fetchPublishedS5fi();
      value = quote.value;
      asOf = new Date(`${quote.date}T21:00:00.000Z`).toISOString();
      source = quote.source;
    } catch {
      value = await calculateS5fiFromConstituents();
      source = "Calculated from S&P 500 constituents";
    }

    return {
      key: "s5fi",
      label: "S5FI",
      status: value < 20 ? "met" : "not_met",
      value,
      threshold: "< 20",
      source,
      asOf,
    };
  } catch (error) {
    return {
      key: "s5fi",
      label: "S5FI",
      status: "error",
      value: null,
      threshold: "< 20",
      source: "EODData INDEX/S5FI",
      asOf: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
