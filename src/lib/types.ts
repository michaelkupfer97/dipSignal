export type Candle = {
  date: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type IndicatorStatus = "met" | "not_met" | "error";

export type IndicatorResult = {
  key: "fearGreed" | "vix" | "s5fi" | "redDays";
  label: string;
  status: IndicatorStatus;
  value: number | boolean | null;
  threshold: string;
  source: string;
  asOf: string;
  error?: string;
};

export type LatestComputation = {
  timestamp: string;
  indicators: IndicatorResult[];
  rulesMet: number;
  totalRules: 4;
  decision: "favorable" | "not_met";
  lastSignal?: LastSignalSummary | null;
};

export type HistoryRow = {
  timestamp: string;
  date: string;
  fearGreed: number | null;
  vix: number | null;
  s5fi: number | null;
  redDays: boolean | null;
  rulesMet: number;
  sp500Close?: number | null;
  forwardReturnPct?: number | null;
};

export type LastSignalSummary = {
  date: string;
  forwardReturnPct: number | null;
};
