export type DashboardLocale = "en" | "he";

/** Hebrew UI strings as \\u escapes for reliable UTF-8 source on Windows. */
const he = {
  loading: "\u05de\u05e2\u05d3\u05db\u05df \u05d0\u05ea \u05d4\u05dc\u05d5\u05d7...",
  errorLoad: "\u05dc\u05d0 \u05e0\u05d9\u05ea\u05df \u05dc\u05d8\u05e2\u05d5\u05df \u05d0\u05ea \u05d4\u05d7\u05d9\u05e9\u05d5\u05d1 \u05d4\u05d0\u05d7\u05e8\u05d5\u05df",
  rulesMetLabel: "\u05ea\u05e0\u05d0\u05d9\u05dd \u05e9\u05d4\u05ea\u05e7\u05d9\u05d9\u05de\u05d5",
  lastUpdated: "\u05e2\u05d5\u05d3\u05db\u05df \u05dc\u05d0\u05d7\u05e8\u05d5\u05e0\u05d4",
  lastSignal: "\u05d0\u05d5\u05ea \u05d0\u05d7\u05e8\u05d5\u05df",
  forwardReturn: "\u05ea\u05e9\u05d5\u05d0\u05d4 \u05de\u05d0\u05d6 \u05d4\u05d0\u05d5\u05ea",
  noSignalYet: "\u05e2\u05d3\u05d9\u05d9\u05df \u05d0\u05d9\u05df \u05d0\u05d5\u05ea \u05d1\u05d4\u05d9\u05e1\u05d8\u05d5\u05e8\u05d9\u05d4",
  pending: "\u05d1\u05d4\u05de\u05ea\u05e0\u05d4",
  refreshHint:
    "\u05d4\u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05de\u05ea\u05e2\u05d3\u05db\u05e0\u05d9\u05dd \u05d1\u05d9\u05de\u05d9 \u05de\u05e1\u05d7\u05e8 \u05d1\u05d0\u05e8\u05d4\"\u05d1 \u05e1\u05d1\u05d9\u05d1 09:35 ET \u05d5\u05dc\u05e4\u05e0\u05d9 \u05d4\u05e1\u05d2\u05d9\u05e8\u05d4 (~15:30 ET), UTC 14:00 \u05d519:30.",
  dipMet: (n: number, total: number) =>
    `\u05ea\u05e0\u05d0\u05d9 \u05d3\u05d9\u05e4 \u05d4\u05ea\u05e7\u05d9\u05d9\u05de\u05d5 (${n} \u05de\u05ea\u05d5\u05da ${total}) - \u05e1\u05d8\u05d8\u05d9\u05e1\u05d8\u05d9\u05ea \u05d7\u05d9\u05d5\u05d1\u05d9`,
  dipNotMet: (n: number, total: number) =>
    `\u05d4\u05ea\u05e0\u05d0\u05d9\u05dd \u05dc\u05d0 \u05d4\u05ea\u05e7\u05d9\u05d9\u05de\u05d5 (${n} \u05de\u05ea\u05d5\u05da ${total} \u05e4\u05e2\u05d9\u05dc\u05d9\u05dd)`,
  indicator: {
    name: "\u05d0\u05d9\u05e0\u05d3\u05d9\u05e7\u05d8\u05d5\u05e8",
    status: "\u05e1\u05d8\u05d8\u05d5\u05e1",
    value: "\u05e2\u05e8\u05da",
    rule: "\u05db\u05dc\u05dc",
    vsRule: "\u05de\u05d5\u05dc \u05d4\u05db\u05dc\u05dc",
    triggered: "\u05e4\u05e2\u05d9\u05dc",
    idle: "\u05dc\u05d0 \u05e4\u05e2\u05d9\u05dc",
    error: "\u05e9\u05d2\u05d9\u05d0\u05d4",
    unavailable: "\u05dc\u05d0 \u05d6\u05de\u05d9\u05df",
    yes: "\u05db\u05df",
    no: "\u05dc\u05d0",
  },
} as const;

export const dashboardCopy = {
  en: {
    loading: "Updating dashboard...",
    errorLoad: "Unable to load latest computation",
    rulesMetLabel: "Rules met",
    lastUpdated: "Last updated",
    lastSignal: "Last signal",
    forwardReturn: "Return since signal",
    noSignalYet: "No signal logged yet",
    pending: "Pending",
    refreshHint:
      "Data refreshes on US market days around 09:35 ET and before close (~15:30 ET), UTC 14:00 and 19:30.",
    dipMet: (n: number, total: number) =>
      `Dip conditions met (${n} of ${total} rules) - statistically favorable`,
    dipNotMet: (n: number, total: number) => `Conditions not met (${n} of ${total} rules active)`,
    indicator: {
      name: "Indicator",
      status: "Status",
      value: "Value",
      rule: "Rule",
      vsRule: "vs rule",
      triggered: "Triggered",
      idle: "Idle",
      error: "Error",
      unavailable: "Unavailable",
      yes: "Yes",
      no: "No",
    },
  },
  he,
} as const;
