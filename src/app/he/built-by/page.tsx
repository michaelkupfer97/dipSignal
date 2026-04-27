import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "נבנה על ידי Michael Kupfer",
  description: "קרדיטים וקישורים עבור DipSignal — Michael Kupfer.",
};

export default function HebrewBuiltByPage() {
  return (
    <main className="container article" dir="rtl">
      <p className="eyebrow">קרדיטים</p>
      <h1>נבנה על ידי Michael Kupfer</h1>
      <p>
        DipSignal נבנה על ידי <strong>Michael Kupfer</strong> כדשבורד ציבורי וחינוכי לאינדיקטור
        “קנייה בדיפ” עבור S&amp;P 500.
      </p>
      <h2>קישורים</h2>
      <ul>
        <li>
          <a href="https://github.com/michaelkupfer97" target="_blank" rel="noreferrer">
            GitHub: michaelkupfer97
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/michael-kupfer/" target="_blank" rel="noreferrer">
            LinkedIn: michael-kupfer
          </a>
        </li>
      </ul>
      <h2>זכויות</h2>
      <p>© {new Date().getUTCFullYear()} Michael Kupfer. כל הזכויות שמורות.</p>
    </main>
  );
}

