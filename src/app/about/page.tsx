import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About DipSignal",
  description:
    "About DipSignal, an educational S&P 500 Buy the Dip Indicator dashboard for market statistics.",
  alternates: {
    canonical: "/about",
    languages: {
      en: "/about",
      he: "/he/about",
    },
  },
};

export default function AboutPage() {
  return (
    <main className="container article">
      <p className="eyebrow">About</p>
      <h1>S&amp;P 500 Buy the Dip Indicator for Education</h1>
      <p>
        DipSignal exists to make a small set of market statistics easier to track. It combines
        sentiment, volatility, market breadth, and short-term price action into one dashboard.
      </p>
      <p>
        The site is intentionally public and does not require login. The goal is transparency:
        visitors can see the rule, the value, the source, and whether the condition is currently
        met.
      </p>
      <h2>Disclaimer</h2>
      <p>
        This website provides statistical market indicators for educational purposes only. It is not
        financial advice, investment advice, or a recommendation to buy or sell any securities.
      </p>
    </main>
  );
}
