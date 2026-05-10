"use client";

import type { DashboardLocale } from "@/lib/i18n/dashboard";

const titles: Record<DashboardLocale, string> = {
  en: "Ad placeholder",
  he: "מיקום פרסומת",
};

function AdBody({ locale }: { locale: DashboardLocale }) {
  if (locale === "he") {
    return <p className="muted">סגרו את ההודעה כדי לראות את תוצאת האינדיקטור להיום.</p>;
  }
  return (
    <p className="muted">
      Close this message to view today&apos;s S&amp;P 500 buy the dip indicator result.
    </p>
  );
}

const buttons: Record<DashboardLocale, string> = {
  en: "Show results",
  he: "הצג תוצאות",
};

export function AdGateModal({
  locale = "en",
  onClose,
}: {
  locale?: DashboardLocale;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="ad-title">
      <div className="modal">
        <h2 id="ad-title">{titles[locale]}</h2>
        <AdBody locale={locale} />
        <div className="ad-box">
          {/* Insert Google AdSense script or ad unit markup here after approval. */}
          Future Google AdSense placement
        </div>
        <button className="button" type="button" onClick={onClose}>
          {buttons[locale]}
        </button>
      </div>
    </div>
  );
}
