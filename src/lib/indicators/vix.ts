import type { IndicatorResult } from "@/lib/types";
import { getDailyCandles, latestClose } from "@/lib/market/yahoo";

export async function getVix(): Promise<IndicatorResult> {
  try {
    const candles = await getDailyCandles("^VIX", "1mo");
    const value = latestClose(candles);

    return {
      key: "vix",
      label: "VIX",
      status: value > 30 ? "met" : "not_met",
      value,
      threshold: "> 30",
      source: "Yahoo Finance ^VIX",
      asOf: new Date(candles.at(-1)!.timestamp * 1000).toISOString(),
    };
  } catch (error) {
    return {
      key: "vix",
      label: "VIX",
      status: "error",
      value: null,
      threshold: "> 30",
      source: "Yahoo Finance ^VIX",
      asOf: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
