import type { IndicatorResult } from "@/lib/types";
import { fetchJson, fetchText } from "@/lib/market/http";

type CnnGraphData = {
  fear_and_greed?: {
    score?: number | string;
    timestamp?: string;
  };
  fear_and_greed_historical?: {
    data?: Array<{
      x?: number | string;
      y?: number | string;
    }>;
  };
};

export async function getFearGreed(): Promise<IndicatorResult> {
  try {
    let score: number | null = null;
    let asOf = new Date().toISOString();

    try {
      const data = await fetchJson<CnnGraphData>(
        "https://production.dataviz.cnn.io/index/fearandgreed/graphdata",
      );
      const rawScore = data.fear_and_greed?.score;
      score = rawScore == null ? null : Number(rawScore);
      if (data.fear_and_greed?.timestamp) {
        asOf = new Date(data.fear_and_greed.timestamp).toISOString();
      }
    } catch {
      const html = await fetchText("https://www.cnn.com/markets/fear-and-greed");
      const match = html.match(/"score"\s*:\s*"?([\d.]+)"?/i);
      score = match ? Number(match[1]) : null;
    }

    if (score == null || Number.isNaN(score)) {
      throw new Error("Could not parse Fear & Greed score");
    }

    return {
      key: "fearGreed",
      label: "Fear & Greed",
      status: score < 10 ? "met" : "not_met",
      value: score,
      threshold: "< 10",
      source: "CNN Fear & Greed",
      asOf,
    };
  } catch (error) {
    return {
      key: "fearGreed",
      label: "Fear & Greed",
      status: "error",
      value: null,
      threshold: "< 10",
      source: "CNN Fear & Greed",
      asOf: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getFearGreedHistory() {
  try {
    const data = await fetchJson<CnnGraphData>(
      "https://production.dataviz.cnn.io/index/fearandgreed/graphdata",
    );
    const rows = data.fear_and_greed_historical?.data ?? [];
    return new Map(
      rows
        .map((row) => {
          const timestamp = Number(row.x);
          const value = Number(row.y);
          if (!Number.isFinite(timestamp) || !Number.isFinite(value)) {
            return null;
          }
          const date = new Date(timestamp).toISOString().slice(0, 10);
          return [date, value] as const;
        })
        .filter((row): row is readonly [string, number] => row !== null),
    );
  } catch {
    return new Map<string, number>();
  }
}
