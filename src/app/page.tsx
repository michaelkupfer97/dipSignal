import type { Metadata } from "next";
import { Dashboard } from "@/components/Dashboard";
import { Faq } from "@/components/Faq";
import { findLastSignal, getHistory, getLatest } from "@/lib/history/historyStore";

export const metadata: Metadata = {
  title: "DipSignal | S&P 500 Buy the Dip Indicator",
  description:
    "Live S&P 500 buy the dip indicator dashboard using Fear & Greed, VIX, S5FI breadth, and three red days.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      he: "/he",
    },
  },
};

export default async function HomePage() {
  const [latest, history] = await Promise.all([getLatest(), getHistory()]);
  const lastSignal = latest?.lastSignal ?? findLastSignal(history);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Live market breadth, volatility, sentiment and price action</p>
          <h1>S&amp;P 500 Buy the Dip Indicator</h1>
          <p className="muted">
            Last time these conditions appeared: {lastSignal?.date ?? "not enough history yet"} - S&amp;P
            500 returned{" "}
            {lastSignal?.forwardReturnPct == null
              ? "pending"
              : `${lastSignal.forwardReturnPct.toFixed(2)}%`}{" "}
            in the following weeks
          </p>
          <Dashboard initial={latest} />
        </div>
      </section>

      <section className="container article">
        <h2>Created after Micha Stocks video</h2>
        <p>
          This website was generated after Micha Stocks explained the idea and rules in this video:{" "}
          <a href="https://youtu.be/tB8GeyQVWvY?si=5BMVBOVduyVI6Vtb" target="_blank" rel="noreferrer">
            YouTube link
          </a>
          .
        </p>

        <h2>How DipSignal Reads S&amp;P 500 Buy the Dip Conditions</h2>
        <p>
          DipSignal is a public English dashboard for investors who want a simple, repeatable way
          to evaluate whether broad S&amp;P 500 stress conditions resemble historical buy the dip
          setups. Instead of relying on a single headline or opinion, the site combines four
          measurable rules: extreme fear in CNN&apos;s Fear &amp; Greed Index, elevated volatility
          through the VIX, weak market breadth through S5FI, and short-term selling pressure through
          three consecutive red daily closes in the S&amp;P 500.
        </p>
        <p>
          The first rule checks whether the Fear &amp; Greed Index is below 10. A reading that low
          indicates extreme market fear. The second rule checks whether the VIX is above 30, a level
          often associated with stressful or disorderly market conditions. The third rule checks
          whether S5FI, the percentage of S&amp;P 500 stocks trading above their 50-day moving
          average, is below 20. This breadth rule asks whether weakness is widespread rather than
          concentrated in a few large companies. The final rule checks whether the S&amp;P 500 has
          closed lower for three sessions in a row.
        </p>
        <p>
          A signal is shown when at least two of the four conditions are met. That threshold is
          designed to keep the model easy to understand while still requiring confirmation from more
          than one part of the market. A volatility spike alone can be noisy. A sentiment reading
          alone can stay fearful for a long time. Breadth alone can weaken before prices fall.
          Combining the rules gives a clearer statistical snapshot.
        </p>
        <p>
          The dashboard updates from cached server data every 15 minutes. Some inputs, especially
          breadth indicators such as S5FI, are end-of-day series, so they may not change every time
          the page refreshes. DipSignal stores a history of computed rows so visitors can review
          previous dates where two or more rules were active and compare those signals with later
          S&amp;P 500 returns. The result is not a trading system and does not guarantee future
          returns, but it gives a transparent framework for studying market drawdowns.
        </p>
        <Faq />
      </section>
    </main>
  );
}
