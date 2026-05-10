import type { Metadata } from "next";
import { Fira_Code, Fira_Sans, Heebo } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-hebrew",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "DipSignal | S&P 500 Buy the Dip Indicator",
    template: "%s | DipSignal",
  },
  description:
    "DipSignal tracks S&P 500 buy the dip conditions using Fear & Greed, VIX, S5FI market breadth, and three red days.",
  icons: {
    icon: [{ url: "/logo/logo.jpg", type: "image/jpeg" }],
    apple: "/logo/logo.jpg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${firaSans.variable} ${firaCode.variable} ${heebo.variable}`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
