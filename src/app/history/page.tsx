import type { Metadata } from "next";
import { HistoryChartNoSSR } from "@/components/HistoryChartNoSSR";
import { getHistory } from "@/lib/history/historyStore";

export const metadata: Metadata = {
  title: "S&P 500 Buy the Dip Indicator History",
  description:
    "Review historical DipSignal rows and dates where two or more S&P 500 buy the dip rules were met.",
};

export default async function HistoryPage() {
  const rows = await getHistory();
  const signals = rows.filter((row) => row.rulesMet >= 2).reverse();

  return (
    <main className="container article">
      <p className="eyebrow">Historical signals</p>
      <h1>S&amp;P 500 Buy the Dip Indicator History</h1>
      <p>
        This page charts stored DipSignal history and marks dates where two or more rules were met.
        Run the protected backfill route after deployment to populate approximately two years of
        rows.
      </p>
      <HistoryChartNoSSR rows={rows} />
      <h2>Signal Dates</h2>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Rules met</th>
              <th>VIX</th>
              <th>S5FI</th>
              <th>3 red days</th>
              <th>Forward return</th>
            </tr>
          </thead>
          <tbody>
            {signals.map((row) => (
              <tr key={row.date}>
                <td>{row.date}</td>
                <td>{row.rulesMet}</td>
                <td>{row.vix?.toFixed(2) ?? "-"}</td>
                <td>{row.s5fi?.toFixed(2) ?? "-"}</td>
                <td>{row.redDays == null ? "-" : row.redDays ? "Yes" : "No"}</td>
                <td>{row.forwardReturnPct == null ? "Pending" : `${row.forwardReturnPct.toFixed(2)}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
