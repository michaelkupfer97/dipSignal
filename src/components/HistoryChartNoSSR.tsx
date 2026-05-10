"use client";

import dynamic from "next/dynamic";
import type { HistoryRow } from "@/lib/types";

const HistoryChart = dynamic(() => import("./HistoryChart").then((mod) => mod.HistoryChart), {
  ssr: false,
  loading: () => (
    <div className="card chart-wrap chart-card">
      <p className="muted">Loading chart...</p>
    </div>
  ),
});

export function HistoryChartNoSSR({
  rows,
  emptyMessage,
}: {
  rows: HistoryRow[];
  emptyMessage?: string;
}) {
  return <HistoryChart rows={rows} emptyMessage={emptyMessage} />;
}
