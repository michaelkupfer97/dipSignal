import type { Candle, HistoryRow } from "@/lib/types";
import { getFearGreedHistory } from "@/lib/indicators/fearGreed";
import { calculateS5fiHistoryFromConstituents } from "@/lib/indicators/s5fi";
import { getDailyCandles } from "@/lib/market/yahoo";
import { setHistory } from "./historyStore";

function candleMap(candles: Candle[]) {
  return new Map(candles.map((candle) => [candle.date, candle]));
}

function threeRedDaysByDate(spx: Candle[], index: number) {
  if (index < 3) {
    return null;
  }
  return (
    spx[index - 2].close < spx[index - 3].close &&
    spx[index - 1].close < spx[index - 2].close &&
    spx[index].close < spx[index - 1].close
  );
}

function forwardReturn(spx: Candle[], index: number, sessions = 20) {
  const future = spx[index + sessions];
  if (!future) {
    return null;
  }
  return ((future.close - spx[index].close) / spx[index].close) * 100;
}

export async function backfillTwoYears() {
  const [spx, vix, s5fiHistory, fearGreedHistory] = await Promise.all([
    getDailyCandles("^GSPC", "3y"),
    getDailyCandles("^VIX", "3y"),
    calculateS5fiHistoryFromConstituents("3y"),
    getFearGreedHistory(),
  ]);

  const vixByDate = candleMap(vix);
  const cutoff = new Date();
  cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 2);

  const rows = spx.reduce<HistoryRow[]>((accumulator, candle, index) => {
      if (new Date(`${candle.date}T00:00:00.000Z`) < cutoff) {
        return accumulator;
      }

      const vixClose = vixByDate.get(candle.date)?.close ?? null;
      const s5fi = s5fiHistory.get(candle.date) ?? null;
      const fearGreed = fearGreedHistory.get(candle.date) ?? null;
      const redDays = threeRedDaysByDate(spx, index);
      const rulesMet =
        (fearGreed != null && fearGreed < 10 ? 1 : 0) +
        (vixClose != null && vixClose > 30 ? 1 : 0) +
        (s5fi != null && s5fi < 20 ? 1 : 0) +
        (redDays ? 1 : 0);

      accumulator.push({
        timestamp: `${candle.date}T21:00:00.000Z`,
        date: candle.date,
        fearGreed,
        vix: vixClose,
        s5fi,
        redDays,
        rulesMet,
        sp500Close: candle.close,
        forwardReturnPct: forwardReturn(spx, index),
      });

      return accumulator;
    }, []);

  await setHistory(rows);
  return rows;
}
