import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How the S&P 500 Buy the Dip Indicator Works",
  description:
    "Learn how DipSignal combines Fear & Greed, VIX, S5FI breadth, and three red S&P 500 closes.",
  alternates: {
    canonical: "/how-it-works",
    languages: {
      en: "/how-it-works",
      he: "/he/how-it-works",
    },
  },
};

export default function HowItWorksPage() {
  return (
    <main className="container article">
      <p className="eyebrow">Methodology</p>
      <h1>S&amp;P 500 Buy the Dip Indicator: How It Works</h1>
      <p>
        DipSignal uses four transparent rules. Each rule becomes green when the statistical
        condition is met. If at least two are green, the dashboard says statistically favorable dip
        conditions are detected.
      </p>
      <h2>Fear &amp; Greed Index</h2>
      <p>
        CNN&apos;s Fear &amp; Greed Index blends several market sentiment measures into a 0 to 100
        score. DipSignal marks this rule green only when the index is below 10, which represents
        extreme fear.
      </p>
      <h2>VIX Above 30</h2>
      <p>
        The VIX measures expected S&amp;P 500 volatility. A reading above 30 usually appears when
        markets are under pressure, liquidity is thinner, or traders are paying up for downside
        protection.
      </p>
      <h2>S5FI Below 20</h2>
      <p>
        S5FI is the percentage of S&amp;P 500 stocks trading above their own 50-day simple moving
        average. A value below 20 means fewer than one in five index members is above that trend
        line, so weakness is broad.
      </p>
      <h2>Three Red Days</h2>
      <p>
        The three red days rule checks whether the last three daily S&amp;P 500 closes each finished
        below the previous close. It is a simple price action filter for short-term downside
        momentum.
      </p>
      <h2>Historical Examples</h2>
      <p>
        The history page stores dates where the rules were checked and highlights rows where at
        least two conditions were active. Those examples help visitors study how similar setups
        behaved in later weeks without implying that the future will match the past.
      </p>
    </main>
  );
}
