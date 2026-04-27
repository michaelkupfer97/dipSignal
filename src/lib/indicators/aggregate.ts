import type { HistoryRow, LatestComputation } from "@/lib/types";
import { getFearGreed } from "./fearGreed";
import { getS5fi } from "./s5fi";
import { getThreeRedDays } from "./redDays";
import { getVix } from "./vix";
import { appendHistory, findLastSignal, getHistory, setLatest } from "@/lib/history/historyStore";
import { getDailyCandles } from "@/lib/market/yahoo";

function numericValue(value: number | boolean | null) {
  return typeof value === "number" ? value : null;
}

async function getSp500LatestClose() {
  try {
    const candles = await getDailyCandles("^GSPC", "1mo");
    return candles.at(-1)?.close ?? null;
  } catch {
    return null;
  }
}

export async function computeLatest(): Promise<LatestComputation> {
  const indicators = await Promise.all([getFearGreed(), getVix(), getS5fi(), getThreeRedDays()]);
  const rulesMet = indicators.filter((indicator) => indicator.status === "met").length;
  const history = await getHistory();

  const latest: LatestComputation = {
    timestamp: new Date().toISOString(),
    indicators,
    rulesMet,
    totalRules: 4,
    decision: rulesMet >= 2 ? "favorable" : "not_met",
    lastSignal: findLastSignal(history),
  };

  await setLatest(latest);

  const today = latest.timestamp.slice(0, 10);
  const row: HistoryRow = {
    timestamp: latest.timestamp,
    date: today,
    fearGreed: numericValue(indicators.find((item) => item.key === "fearGreed")?.value ?? null),
    vix: numericValue(indicators.find((item) => item.key === "vix")?.value ?? null),
    s5fi: numericValue(indicators.find((item) => item.key === "s5fi")?.value ?? null),
    redDays:
      typeof indicators.find((item) => item.key === "redDays")?.value === "boolean"
        ? (indicators.find((item) => item.key === "redDays")?.value as boolean)
        : null,
    rulesMet,
    sp500Close: await getSp500LatestClose(),
  };

  await appendHistory(row);
  return latest;
}
