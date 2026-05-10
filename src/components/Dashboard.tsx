"use client";

import { startTransition, useEffect, useState } from "react";
import type { LatestComputation } from "@/lib/types";
import type { DashboardLocale } from "@/lib/i18n/dashboard";
import { dashboardCopy } from "@/lib/i18n/dashboard";
import { AdGateModal } from "./AdGateModal";
import { IndicatorTable } from "./IndicatorTable";

const AD_STORAGE_KEY = "dipsignal:ad-acknowledged";

export function Dashboard({
  initial,
  locale = "en",
}: {
  initial: LatestComputation | null;
  locale?: DashboardLocale;
}) {
  const [data, setData] = useState<LatestComputation | null>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const t = dashboardCopy[locale];

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage.getItem(AD_STORAGE_KEY) === "1") {
        startTransition(() => setUnlocked(true));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleCloseAd = () => {
    try {
      window.localStorage.setItem(AD_STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setUnlocked(true);
  };

  useEffect(() => {
    let mounted = true;
    const copy = dashboardCopy[locale];

    async function load() {
      try {
        setLoading(true);
        const response = await fetch("/api/latest", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(copy.errorLoad);
        }
        const latest = (await response.json()) as LatestComputation;
        if (mounted) {
          setData(latest);
          setError(null);
        }
      } catch (loadError) {
        if (mounted) {
          setError(loadError instanceof Error ? loadError.message : "Unknown dashboard error");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();
    const interval = window.setInterval(load, 5 * 60 * 1000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, [locale]);

  const showData = data ?? initial;
  const display = showData;
  const bannerGood = display?.decision === "favorable";

  return (
    <section className="dashboard" aria-live="polite">
      {!unlocked && <AdGateModal locale={locale} onClose={handleCloseAd} />}
      {loading && display && (
        <div className="banner muted-banner" role="status">
          {t.loading}
        </div>
      )}
      {!display && !error && <div className="card">{t.loading}</div>}
      {error && <div className="banner bad">{error}</div>}
      {unlocked && display && (
        <>
          <div className={`banner ${bannerGood ? "good" : "bad"}`}>
            {bannerGood ? t.dipMet(display.rulesMet, display.totalRules) : t.dipNotMet(display.rulesMet, display.totalRules)}
          </div>
          <p className="muted refresh-hint">{t.refreshHint}</p>
          <div className="grid">
            <div className="card">
              <div className="muted">{t.rulesMetLabel}</div>
              <h2>
                {display.rulesMet} / {display.totalRules}
              </h2>
            </div>
            <div className="card">
              <div className="muted">{t.lastUpdated}</div>
              <h3>{new Date(display.timestamp).toLocaleString(locale === "he" ? "he-IL" : "en-US")}</h3>
            </div>
            <div className="card">
              <div className="muted">{t.lastSignal}</div>
              <h3>{display.lastSignal?.date ?? t.noSignalYet}</h3>
            </div>
            <div className="card">
              <div className="muted">{t.forwardReturn}</div>
              <h3>
                {display.lastSignal?.forwardReturnPct == null
                  ? t.pending
                  : `${display.lastSignal.forwardReturnPct.toFixed(2)}%`}
              </h3>
            </div>
          </div>
          <IndicatorTable indicators={display.indicators} locale={locale} />
        </>
      )}
    </section>
  );
}
