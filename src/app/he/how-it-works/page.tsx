import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "איך האינדיקטור עובד (עברית)",
  description: "הסבר על Fear & Greed, VIX, S5FI ושלושה ימי ירידות רצופים במסגרת DipSignal.",
  alternates: {
    canonical: "/he/how-it-works",
    languages: {
      en: "/how-it-works",
      he: "/he/how-it-works",
    },
  },
};

export default function HebrewHowItWorksPage() {
  return (
    <main className="container article" dir="rtl">
      <p className="eyebrow">מתודולוגיה</p>
      <h1>אינדיקטור “קנייה בדיפ” ל‑S&amp;P 500 — איך זה עובד</h1>
      <p>
        DipSignal משתמש בארבעה כללים שקופים. כל כלל נהיה “ירוק” כאשר התנאי מתקיים. אם לפחות שני
        כללים ירוקים, מוצגת הודעה שתנאי “קנייה בדיפ” סטטיסטיים נראים חיוביים יותר מהרגיל.
      </p>
      <h2>Fear &amp; Greed (CNN)</h2>
      <p>
        מדד Fear &amp; Greed של CNN מרכז מספר מדדים לסקאלה של 0–100. DipSignal מסמן את הכלל הזה
        כפעיל רק כשהערך נמוך מ‑10 (פחד קיצוני).
      </p>
      <h2>VIX מעל 30</h2>
      <p>
        ה‑VIX משקף תנודתיות צפויה באופציות על ה‑S&amp;P 500. ערך מעל 30 נפוץ יותר בזמני לחץ בשוק.
      </p>
      <h2>S5FI מתחת ל‑20</h2>
      <p>
        S5FI הוא אחוז מניות ה‑S&amp;P 500 שנמצאות מעל ממוצע נע פשוט 50 ימים. מתחת ל‑20 המשמעות היא
        שחולשה רחבה.
      </p>
      <h2>שלושה ימי ירידות רצופים</h2>
      <p>
        הכלל בודק האם שלושת הסגירות היומיות האחרונות היו נמוכות מהסגירה שלפניהן, אחת אחרי השנייה.
      </p>
    </main>
  );
}

