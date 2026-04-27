"use client";

import dynamic from "next/dynamic";
import type { HistoryRow } from "@/lib/types";

const HistoryChart = dynamic(() => import("./HistoryChart").then((mod) => mod.HistoryChart), {
  ssr: false,
  loading: () => (
    <div className="card chart-wrap">
      <p className="muted">Loading chart...</p>
    </div>
  ),
});

export function HistoryChartNoSSR({ rows }: { rows: HistoryRow[] }) {
  return <HistoryChart rows={rows} />;
}

