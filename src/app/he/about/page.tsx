import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "אודות DipSignal",
  description: "אודות DipSignal — דשבורד חינוכי לאינדיקטור “קנייה בדיפ” עבור S&P 500.",
  alternates: {
    canonical: "/he/about",
    languages: {
      en: "/about",
      he: "/he/about",
    },
  },
};

export default function HebrewAboutPage() {
  return (
    <main className="container article" dir="rtl">
      <p className="eyebrow">אודות</p>
      <h1>אינדיקטור “קנייה בדיפ” ל‑S&amp;P 500 — למטרות לימוד</h1>
      <p>
        DipSignal נועד להפוך סטטיסטיקות שוק לנגישות יותר. הוא משלב סנטימנט, תנודתיות, רוחב שוק
        ופעולת מחיר בדשבורד אחד.
      </p>
      <h2>דיסקליימר</h2>
      <p>
        אתר זה מציג אינדיקטורים סטטיסטיים למטרות לימוד בלבד. זה אינו ייעוץ פיננסי/השקעות, ואינו
        המלצה לקנות או למכור ניירות ערך כלשהם.
      </p>
    </main>
  );
}

