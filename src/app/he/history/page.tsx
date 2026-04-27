import type { Metadata } from "next";
import { HistoryChartNoSSR } from "@/components/HistoryChartNoSSR";
import { getHistory } from "@/lib/history/historyStore";

export const metadata: Metadata = {
  title: "היסטוריית האינדיקטור (עברית)",
  description: "תרשים וטבלה של תאריכים שבהם לפחות 2 תנאים התקיימו במסגרת DipSignal.",
  alternates: {
    canonical: "/he/history",
    languages: {
      en: "/history",
      he: "/he/history",
    },
  },
};

export default async function HebrewHistoryPage() {
  const rows = await getHistory();
  const signals = rows.filter((row) => row.rulesMet >= 2).reverse();

  return (
    <main className="container article" dir="rtl">
      <p className="eyebrow">היסטוריה</p>
      <h1>היסטוריית אינדיקטור “קנייה בדיפ” ל‑S&amp;P 500</h1>
      <p>
        הדף מציג היסטוריה שנשמרה ומסמן תאריכים שבהם לפחות שני תנאים התקיימו. את ה‑backfill מפעילים
        פעם אחת לאחר ההתקנה כדי למלא כ‑2 שנים.
      </p>
      <HistoryChartNoSSR rows={rows} />
      <h2>תאריכי אות</h2>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>תאריך</th>
              <th>תנאים</th>
              <th>VIX</th>
              <th>S5FI</th>
              <th>3 ימי ירידה</th>
              <th>תשואה קדימה</th>
            </tr>
          </thead>
          <tbody>
            {signals.map((row) => (
              <tr key={row.date}>
                <td>{row.date}</td>
                <td>{row.rulesMet}</td>
                <td>{row.vix?.toFixed(2) ?? "-"}</td>
                <td>{row.s5fi?.toFixed(2) ?? "-"}</td>
                <td>{row.redDays == null ? "-" : row.redDays ? "כן" : "לא"}</td>
                <td>{row.forwardReturnPct == null ? "בהמתנה" : `${row.forwardReturnPct.toFixed(2)}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

