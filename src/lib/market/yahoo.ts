import type { Candle } from "@/lib/types";
import { fetchJson } from "./http";

type YahooChartResponse = {
  chart: {
    result?: Array<{
      timestamp?: number[];
      indicators?: {
        quote?: Array<{
          open?: Array<number | null>;
          high?: Array<number | null>;
          low?: Array<number | null>;
          close?: Array<number | null>;
          volume?: Array<number | null>;
        }>;
      };
    }>;
    error?: { description?: string };
  };
};

export async function getDailyCandles(symbol: string, range = "3mo"): Promise<Candle[]> {
  const encoded = encodeURIComponent(symbol);
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encoded}?range=${range}&interval=1d&includePrePost=false&events=history`;
  const data = await fetchJson<YahooChartResponse>(url);
  const result = data.chart.result?.[0];

  if (!result?.timestamp?.length || !result.indicators?.quote?.[0]) {
    throw new Error(data.chart.error?.description ?? `No Yahoo candles for ${symbol}`);
  }

  const quote = result.indicators.quote[0];
  const candles: Candle[] = [];

  result.timestamp.forEach((timestamp, index) => {
    const open = quote.open?.[index];
    const high = quote.high?.[index];
    const low = quote.low?.[index];
    const close = quote.close?.[index];
    const volume = quote.volume?.[index] ?? 0;

    if (open == null || high == null || low == null || close == null) {
      return;
    }

    candles.push({
      date: new Date(timestamp * 1000).toISOString().slice(0, 10),
      timestamp,
      open,
      high,
      low,
      close,
      volume,
    });
  });

  return candles;
}

export function latestClose(candles: Candle[]) {
  const candle = candles.at(-1);
  if (!candle) {
    throw new Error("No candles available");
  }
  return candle.close;
}
