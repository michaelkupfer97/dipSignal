const faqs = [
  {
    question: "What is the S&P 500 Buy the Dip Indicator?",
    answer:
      "It is a rules-based dashboard that checks whether several historical stress conditions are present in the S&P 500 market.",
  },
  {
    question: "Does DipSignal provide financial advice?",
    answer:
      "No. DipSignal is educational only and does not recommend buying or selling securities.",
  },
  {
    question: "How often does DipSignal update?",
    answer:
      "The site is designed to refresh its cached computation every 15 minutes, with some inputs updating only at end of day.",
  },
  {
    question: "Why use two or more conditions?",
    answer:
      "Combining conditions helps avoid relying on a single noisy indicator such as volatility, sentiment, or breadth by itself.",
  },
  {
    question: "Why might S5FI update less often than VIX?",
    answer:
      "S5FI is a market breadth series based on daily moving averages, so it is typically an end-of-day value. VIX can move during the trading session.",
  },
  {
    question: "What does “3 red days” mean exactly?",
    answer:
      "DipSignal marks this rule green only when each of the last three S&P 500 daily closes is lower than the previous close.",
  },
  {
    question: "Why does DipSignal require at least 2 rules met?",
    answer:
      "It helps reduce false positives from any single indicator by requiring confirmation from multiple market dimensions (sentiment, volatility, breadth, and price action).",
  },
  {
    question: "Can the dashboard show 'Unavailable' for some indicators?",
    answer:
      "Yes. If a data source changes format, rate-limits, or fails temporarily, DipSignal will show an error/unavailable state and keep the last cached computation when possible.",
  },
  {
    question: "Does a 'favorable' banner mean the market will go up?",
    answer:
      "No. It only means the selected historical conditions are currently met. Markets can continue falling, and outcomes vary. This site is educational only.",
  },
];

export function Faq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section>
      <h2>S&P 500 Buy the Dip Indicator FAQ</h2>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="post-list">
        {faqs.map((faq) => (
          <div className="card" key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
