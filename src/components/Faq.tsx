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
