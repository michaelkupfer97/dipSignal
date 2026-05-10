"use client";

import {
  Brush,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { HistoryRow } from "@/lib/types";

export function HistoryChart({ rows, emptyMessage }: { rows: HistoryRow[]; emptyMessage?: string }) {
  if (rows.length === 0) {
    return (
      <div className="card chart-wrap chart-card">
        <p className="muted">
          {emptyMessage ??
            "No history has been stored yet. Run the backfill route after setup."}
        </p>
      </div>
    );
  }

  const slice = rows.slice(-520);
  const data = slice.map((row) => ({
    date: row.date,
    rulesMet: row.rulesMet,
    sp500Close: row.sp500Close ?? null,
    signal: row.rulesMet >= 2 ? row.rulesMet : null,
  }));

  const useBrush = data.length > 126;
  const startIndex = useBrush ? Math.max(0, data.length - 126) : 0;
  const endIndex = Math.max(0, data.length - 1);

  return (
    <div className="card chart-wrap chart-card">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 28, bottom: useBrush ? 40 : 20, left: 4 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" minTickGap={42} />
          <YAxis yAxisId="left" domain={[0, 4]} allowDecimals={false} width={32} />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={["auto", "auto"]}
            tickFormatter={(v) => Number(v).toFixed(0)}
            width={48}
          />
          <Tooltip />
          <Line
            yAxisId="left"
            dataKey="rulesMet"
            type="monotone"
            stroke="#38BDF8"
            dot={false}
            name="Rules met"
          />
          <Line
            yAxisId="right"
            dataKey="sp500Close"
            type="monotone"
            stroke="rgba(148, 163, 184, 0.5)"
            strokeWidth={1.5}
            dot={false}
            name="S&P 500 close"
            connectNulls
          />
          {useBrush ? (
            <Brush
              dataKey="date"
              height={22}
              stroke="#38BDF8"
              startIndex={startIndex}
              endIndex={endIndex}
              travellerWidth={10}
            />
          ) : null}
          {data
            .filter((row) => row.signal != null)
            .map((row) => (
              <ReferenceDot
                key={row.date}
                yAxisId="left"
                x={row.date}
                y={row.signal ?? 0}
                r={4}
                fill="#f59e0b"
                stroke="#f59e0b"
              />
            ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
