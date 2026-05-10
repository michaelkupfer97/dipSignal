"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isHebrew = pathname === "/he" || pathname.startsWith("/he/");

  const isActive = (href: string) => {
    const homeHref = isHebrew ? "/he" : "/";
    if (href === homeHref) {
      return pathname === homeHref;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navClass = (href: string) =>
    isActive(href) ? "nav-active" : undefined;

  return (
    <header className="site-header">
      <div className="container">
        <Link className="brand" href={isHebrew ? "/he" : "/"}>
          <Image
            src="/logo/logo.jpg"
            alt=""
            width={40}
            height={40}
            className="brand__logo"
            priority
          />
          <span>{isHebrew ? "דיפסיגנל" : "DipSignal"}</span>
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          {isHebrew ? (
            <>
              <Link
                href="/he"
                className={navClass("/he")}
                aria-current={isActive("/he") ? "page" : undefined}
              >
                בית
              </Link>
              <Link
                href="/he/how-it-works"
                className={navClass("/he/how-it-works")}
                aria-current={isActive("/he/how-it-works") ? "page" : undefined}
              >
                איך זה עובד
              </Link>
              <Link
                href="/he/history"
                className={navClass("/he/history")}
                aria-current={isActive("/he/history") ? "page" : undefined}
              >
                היסטוריה
              </Link>
              <Link
                href="/he/about"
                className={navClass("/he/about")}
                aria-current={isActive("/he/about") ? "page" : undefined}
              >
                אודות
              </Link>
              <Link
                href="/he/blog"
                className={navClass("/he/blog")}
                aria-current={isActive("/he/blog") ? "page" : undefined}
              >
                בלוג
              </Link>
              <Link
                href="/he/built-by"
                className={navClass("/he/built-by")}
                aria-current={isActive("/he/built-by") ? "page" : undefined}
              >
                נבנה על ידי
              </Link>
              <Link className="lang-active" href="/he">
                עברית
              </Link>
              <Link href="/">אנגלית</Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={navClass("/")}
                aria-current={isActive("/") ? "page" : undefined}
              >
                Home
              </Link>
              <Link
                href="/how-it-works"
                className={navClass("/how-it-works")}
                aria-current={isActive("/how-it-works") ? "page" : undefined}
              >
                How it works
              </Link>
              <Link
                href="/history"
                className={navClass("/history")}
                aria-current={isActive("/history") ? "page" : undefined}
              >
                History
              </Link>
              <Link
                href="/blog"
                className={navClass("/blog")}
                aria-current={isActive("/blog") ? "page" : undefined}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className={navClass("/about")}
                aria-current={isActive("/about") ? "page" : undefined}
              >
                About
              </Link>
              <Link
                href="/built-by"
                className={navClass("/built-by")}
                aria-current={isActive("/built-by") ? "page" : undefined}
              >
                Built by
              </Link>
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
