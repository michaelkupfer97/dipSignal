import type { Metadata } from "next";
import { Dashboard } from "@/components/Dashboard";
import { FaqHe } from "@/components/FaqHe";
import { findLastSignal, getHistory, getLatest } from "@/lib/history/historyStore";

export const metadata: Metadata = {
  title: "דיפסיגנל | אינדיקטור “קנייה בדיפ” למדד אס־אנד־פי 500",
  description:
    "דשבורד חי לאינדיקטור “קנייה בדיפ” עם מדד פחד וחמדנות, מדד תנודתיות, רוחב שוק ושלושה ימי ירידה.",
  alternates: {
    canonical: "/he",
    languages: {
      en: "/",
      he: "/he",
    },
  },
};

export default async function HebrewHomePage() {
  const [latest, history] = await Promise.all([getLatest(), getHistory()]);
  const lastSignal = latest?.lastSignal ?? findLastSignal(history);

  return (
    <main dir="rtl">
      <section className="hero">
        <div className="container">
          <p className="eyebrow">מדדי שוק בזמן אמת: רוחב שוק, תנודתיות, סנטימנט ופעולת מחיר</p>
          <h1>אינדיקטור “קנייה בדיפ” למדד אס־אנד־פי 500</h1>
          <p className="muted">
            הפעם האחרונה שהתנאים הופיעו: {lastSignal?.date ?? "אין עדיין מספיק היסטוריה"} — המדד החזיר{" "}
            {lastSignal?.forwardReturnPct == null ? "בהמתנה" : `${lastSignal.forwardReturnPct.toFixed(2)}%`}{" "}
            בשבועות שלאחר מכן
          </p>
          <Dashboard initial={latest} />
        </div>
      </section>

      <section className="container article">
        <h2>נוצר בעקבות הסרטון של Micha Stocks</h2>
        <p>
          האתר הזה נוצר בעקבות סרטון שמסביר את הרעיון והכללים. לצפייה:
          {" "}
          <a href="https://youtu.be/tB8GeyQVWvY?si=5BMVBOVduyVI6Vtb" target="_blank" rel="noreferrer">
            הסרטון ביוטיוב
          </a>
          .
        </p>

        <h2>איך דיפסיגנל בודק תנאי “קנייה בדיפ” במדד אס־אנד־פי 500</h2>
        <p>
          דיפסיגנל הוא דשבורד ציבורי (ללא התחברות) שמרכז ארבעה כללים מדידים כדי לבדוק האם תנאי
          “קנייה בדיפ” סטטיסטיים מתקיימים כרגע. במקום להסתמך על כותרת או דעה, האתר משלב ארבעה
          אינדיקטורים: פחד קיצוני במדד פחד וחמדנות, תנודתיות גבוהה, רוחב שוק חלש, ולחץ מכירות קצר
          טווח דרך שלושה ימי ירידות רצופים במדד.
        </p>
        <p>
          האות מוצג כאשר לפחות 2 מתוך 4 תנאים מתקיימים. זה לא מבטיח תוצאות עתידיות, וזה לא “המלצה
          לפעולה” — אלא דרך שקופה ללמוד ולהשוות התנהגות שוק בתקופות לחץ.
        </p>
        <FaqHe />
      </section>
    </main>
  );
}

