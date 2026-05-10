"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const isHebrew = pathname === "/he" || pathname.startsWith("/he/");
  const year = new Date().getUTCFullYear();

  const navLinks = isHebrew
    ? [
        { href: "/he", label: "בית" },
        { href: "/he/how-it-works", label: "איך זה עובד" },
        { href: "/he/history", label: "היסטוריה" },
        { href: "/he/blog", label: "בלוג" },
        { href: "/he/about", label: "אודות" },
        { href: "/he/built-by", label: "נבנה על ידי" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/how-it-works", label: "How it works" },
        { href: "/history", label: "History" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About" },
        { href: "/built-by", label: "Built by" },
      ];

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner" dir={isHebrew ? "rtl" : "ltr"}>
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link className="site-footer__logo" href={isHebrew ? "/he" : "/"}>
              {isHebrew ? "דיפסיגנל" : "DipSignal"}
            </Link>
            <p className="site-footer__tagline">
              {isHebrew
                ? "אינדיקטור סטטיסטי לזיהוי הזדמנויות 'קנייה בירידה' ב־S&P 500."
                : "A statistical S&P 500 buy the dip indicator dashboard."}
            </p>
            <div className="site-footer__lang" aria-label="Language">
              <Link
                href="/"
                className={!isHebrew ? "is-active" : ""}
                aria-current={!isHebrew ? "page" : undefined}
              >
                English
              </Link>
              <span aria-hidden="true">·</span>
              <Link
                href="/he"
                className={isHebrew ? "is-active" : ""}
                aria-current={isHebrew ? "page" : undefined}
              >
                עברית
              </Link>
            </div>
          </div>

          <div className="site-footer__col">
            <h3 className="site-footer__heading">{isHebrew ? "ניווט" : "Navigate"}</h3>
            <ul className="site-footer__list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__col">
            <h3 className="site-footer__heading">{isHebrew ? "ערוצים" : "Connect"}</h3>
            <ul className="site-footer__list">
              <li>
                <a
                  href="https://github.com/michaelkupfer97"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/michael-kupfer/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            © {year} Michael Kupfer.{" "}
            {isHebrew ? "כל הזכויות שמורות." : "All rights reserved."}
          </p>
          <div className="site-footer__legal" role="note">
            <p className="site-footer__legal-text" lang="en" dir="ltr">
              This website provides statistical market indicators for educational purposes only.
              It is not financial advice, investment advice, or a recommendation to buy or sell
              any securities.
            </p>
            <p className="site-footer__legal-text" lang="he" dir="rtl">
              אתר זה מציג אינדיקטורים סטטיסטיים למטרות לימוד בלבד. זה אינו ייעוץ פיננסי/השקעות,
              ואינו המלצה לקנות או למכור ניירות ערך כלשהם.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
