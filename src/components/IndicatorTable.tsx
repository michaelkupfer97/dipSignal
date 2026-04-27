import type { IndicatorResult } from "@/lib/types";

function formatValue(indicator: IndicatorResult) {
  if (indicator.value == null) {
    return "Unavailable";
  }
  if (typeof indicator.value === "boolean") {
    return indicator.value ? "Yes" : "No";
  }
  return indicator.value.toFixed(2);
}

export function IndicatorTable({ indicators }: { indicators: IndicatorResult[] }) {
  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Status</th>
            <th>Value</th>
            <th>Rule</th>
          </tr>
        </thead>
        <tbody>
          {indicators.map((indicator) => (
            <tr key={indicator.key}>
              <td>
                <strong>{indicator.label}</strong>
                <div className="muted">{indicator.source}</div>
              </td>
              <td>
                <span className={`pill ${indicator.status === "met" ? "good" : "bad"}`}>
                  {indicator.status === "met" ? "Green" : "Red"}
                </span>
              </td>
              <td>{formatValue(indicator)}</td>
              <td>{indicator.threshold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
