import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Built by Michael Kupfer",
  description: "Project credits and links for DipSignal by Michael Kupfer.",
  alternates: {
    canonical: "/built-by",
    languages: {
      en: "/built-by",
      he: "/he/built-by",
    },
  },
};

export default function BuiltByPage() {
  return (
    <main className="container article">
      <p className="eyebrow">Credits</p>
      <h1>Built by Michael Kupfer</h1>
      <p>
        DipSignal was built by <strong>Michael Kupfer</strong> as a public, educational S&amp;P 500
        buy the dip indicator dashboard.
      </p>
      <h2>Links</h2>
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
      <h2>Rights</h2>
      <p>
        © {new Date().getUTCFullYear()} Michael Kupfer. All rights reserved.
      </p>
    </main>
  );
}

