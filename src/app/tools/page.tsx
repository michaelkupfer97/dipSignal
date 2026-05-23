import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools & Resources",
  description:
    "Curated tools from Micha Stocks - retirement planning, compound growth calculators, and more.",
  alternates: {
    canonical: "/tools",
    languages: {
      en: "/tools",
      he: "/he/tools",
    },
  },
};

const tools = [
  {
    eyebrow: "Retirement Planning",
    title: "Financial Freedom Calculator",
    description:
      "How much do you need to retire? Model compound growth, monthly contributions, and a custom timeline - then reverse-engineer the number to reach financial freedom.",
    href: "https://www.michastocks.app/financial-freedom",
    cta: "Open calculator",
  },
] as const;

export default function ToolsPage() {
  return (
    <main className="container article">
      <p className="eyebrow">Micha Stocks</p>
      <h1>Tools &amp; Resources</h1>
      <p>
        Hand-picked calculators and guides from the Micha Stocks ecosystem. More links will be
        added over time.
      </p>

      <div className="tools-grid">
        {tools.map((tool) => (
          <article key={tool.href} className="tool-card card">
            <p className="eyebrow tool-card__eyebrow">{tool.eyebrow}</p>
            <h2 className="tool-card__title">{tool.title}</h2>
            <p className="tool-card__description">{tool.description}</p>
            <a
              href={tool.href}
              className="button tool-card__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              {tool.cta}
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
