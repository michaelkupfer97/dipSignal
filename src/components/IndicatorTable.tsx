"use client";

import type { IndicatorResult } from "@/lib/types";
import type { DashboardLocale } from "@/lib/i18n/dashboard";
import { dashboardCopy } from "@/lib/i18n/dashboard";

function formatValue(indicator: IndicatorResult, locale: DashboardLocale) {
  const t = dashboardCopy[locale].indicator;
  if (indicator.value == null) {
    return t.unavailable;
  }
  if (typeof indicator.value === "boolean") {
    return indicator.value ? t.yes : t.no;
  }
  return indicator.value.toFixed(2);
}

function formatVsRule(indicator: IndicatorResult) {
  const v = indicator.value;
  if (v == null || typeof v === "boolean") {
    return indicator.threshold;
  }
  const num = v.toFixed(2);
  switch (indicator.key) {
    case "fearGreed":
      return `${num} (${indicator.threshold})`;
    case "vix":
      return `${num} (${indicator.threshold})`;
    case "s5fi":
      return `${num} (${indicator.threshold})`;
    case "redDays":
      return indicator.threshold;
    default:
      return indicator.threshold;
  }
}

function statusPillClass(status: IndicatorResult["status"]) {
  if (status === "met") return "pill triggered";
  if (status === "error") return "pill err";
  return "pill idle";
}

function statusLabel(status: IndicatorResult["status"], locale: DashboardLocale) {
  const t = dashboardCopy[locale].indicator;
  if (status === "met") return t.triggered;
  if (status === "error") return t.error;
  return t.idle;
}

export function IndicatorTable({
  indicators,
  locale = "en",
}: {
  indicators: IndicatorResult[];
  locale?: DashboardLocale;
}) {
  const t = dashboardCopy[locale].indicator;

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>{t.name}</th>
            <th>{t.status}</th>
            <th>{t.value}</th>
            <th>{t.rule}</th>
          </tr>
        </thead>
        <tbody>
          {indicators.map((indicator) => (
            <tr key={indicator.key}>
              <td>
                <strong>{indicator.label}</strong>
                <div className="muted">{indicator.source}</div>
                <div className="muted table-asof">
                  {new Date(indicator.asOf).toLocaleString(locale === "he" ? "he-IL" : "en-US")}
                </div>
                {indicator.error ? (
                  <div className="muted table-err" role="note">
                    {indicator.error}
                  </div>
                ) : null}
              </td>
              <td>
                <span className={statusPillClass(indicator.status)}>{statusLabel(indicator.status, locale)}</span>
              </td>
              <td>{formatValue(indicator, locale)}</td>
              <td>
                <span className="vs-rule">{formatVsRule(indicator)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
