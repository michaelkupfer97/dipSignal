import type { IndicatorResult } from "@/lib/types";
import { getDailyCandles } from "@/lib/market/yahoo";

export async function getThreeRedDays(): Promise<IndicatorResult> {
  try {
    const candles = await getDailyCandles("^GSPC", "1mo");
    const recent = candles.slice(-4);

    if (recent.length < 4) {
      throw new Error("Need at least four S&P 500 closes");
    }

    const red =
      recent[1].close < recent[0].close &&
      recent[2].close < recent[1].close &&
      recent[3].close < recent[2].close;

    return {
      key: "redDays",
      label: "3 Red Days",
      status: red ? "met" : "not_met",
      value: red,
      threshold: "last 3 closes < prior close",
      source: "Yahoo Finance ^GSPC",
      asOf: new Date(recent.at(-1)!.timestamp * 1000).toISOString(),
    };
  } catch (error) {
    return {
      key: "redDays",
      label: "3 Red Days",
      status: "error",
      value: null,
      threshold: "last 3 closes < prior close",
      source: "Yahoo Finance ^GSPC",
      asOf: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
