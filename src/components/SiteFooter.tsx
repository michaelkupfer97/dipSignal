import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div>
          <strong>DipSignal</strong>
          <div className="muted">© {new Date().getUTCFullYear()} Michael Kupfer. All rights reserved.</div>
          <div className="nav" style={{ marginTop: 10 }}>
            <Link href="/built-by">Built by</Link>
            <a href="https://github.com/michaelkupfer97" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/michael-kupfer/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <p style={{ maxWidth: 640, margin: 0 }}>
          This website provides statistical market indicators for educational purposes only. It is
          not financial advice, investment advice, or a recommendation to buy or sell any
          securities.
        </p>
        <p style={{ maxWidth: 640, margin: "12px 0 0" }}>
          אתר זה מציג אינדיקטורים סטטיסטיים למטרות לימוד בלבד. זה אינו ייעוץ פיננסי/השקעות, ואינו
          המלצה לקנות או למכור ניירות ערך כלשהם.
        </p>
      </div>
    </footer>
  );
}
