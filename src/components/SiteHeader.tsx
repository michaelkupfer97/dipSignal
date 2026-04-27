"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isHebrew = pathname === "/he" || pathname.startsWith("/he/");

  return (
    <header className="site-header">
      <div className="container">
        <Link className="brand" href={isHebrew ? "/he" : "/"}>
          {isHebrew ? "דיפסיגנל" : "DipSignal"}
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          {isHebrew ? (
            <>
              <Link href="/he">בית</Link>
              <Link href="/he/how-it-works">איך זה עובד</Link>
              <Link href="/he/history">היסטוריה</Link>
              <Link href="/he/about">אודות</Link>
              <Link href="/he/built-by">נבנה על ידי</Link>
              <Link className="lang-active" href="/he">
                עברית
              </Link>
              <Link href="/">אנגלית</Link>
            </>
          ) : (
            <>
              <Link href="/">Home</Link>
              <Link href="/how-it-works">How it works</Link>
              <Link href="/history">History</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/about">About</Link>
              <Link href="/built-by">Built by</Link>
              <Link className="lang-active" href="/">
                English
              </Link>
              <Link href="/he">עברית</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
