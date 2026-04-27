"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { HistoryRow } from "@/lib/types";

export function HistoryChart({ rows }: { rows: HistoryRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="card chart-wrap">
        <p className="muted">No history has been stored yet. Run the backfill route after setup.</p>
      </div>
    );
  }

  const data = rows.slice(-520).map((row) => ({
    date: row.date,
    rulesMet: row.rulesMet,
    signal: row.rulesMet >= 2 ? row.rulesMet : null,
  }));

  return (
    <div className="card chart-wrap">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" minTickGap={42} />
          <YAxis domain={[0, 4]} allowDecimals={false} />
          <Tooltip />
          <Line dataKey="rulesMet" type="monotone" stroke="#38BDF8" dot={false} name="Rules met" />
          {data
            .filter((row) => row.signal != null)
            .map((row) => (
              <ReferenceDot
                key={row.date}
                x={row.date}
                y={row.signal ?? 0}
                r={4}
                fill="#22C55E"
                stroke="#22C55E"
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
