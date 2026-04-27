"use client";

import { useEffect, useState } from "react";
import type { LatestComputation } from "@/lib/types";
import { AdGateModal } from "./AdGateModal";
import { IndicatorTable } from "./IndicatorTable";

export function Dashboard({ initial }: { initial: LatestComputation | null }) {
  const [data, setData] = useState<LatestComputation | null>(initial);
  const [loading, setLoading] = useState(!initial);
  const [error, setError] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const response = await fetch("/api/latest", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Unable to load latest computation");
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
    const interval = window.setInterval(load, 15 * 60 * 1000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className="dashboard" aria-live="polite">
      {!unlocked && <AdGateModal onClose={() => setUnlocked(true)} />}
      {loading && <div className="card">Loading latest market conditions...</div>}
      {error && <div className="banner bad">{error}</div>}
      {unlocked && data && (
        <>
          <div className={`banner ${data.decision === "favorable" ? "good" : "bad"}`}>
            {data.decision === "favorable"
              ? "Statistically favorable dip conditions detected"
              : "Conditions not met"}
          </div>
          <div className="grid">
            <div className="card">
              <div className="muted">Rules met</div>
              <h2>
                {data.rulesMet} out of {data.totalRules}
              </h2>
            </div>
            <div className="card">
              <div className="muted">Last updated</div>
              <h3>{new Date(data.timestamp).toLocaleString()}</h3>
            </div>
            <div className="card">
              <div className="muted">Last signal</div>
              <h3>{data.lastSignal?.date ?? "No signal logged yet"}</h3>
            </div>
            <div className="card">
              <div className="muted">Forward return</div>
              <h3>
                {data.lastSignal?.forwardReturnPct == null
                  ? "Pending"
                  : `${data.lastSignal.forwardReturnPct.toFixed(2)}%`}
              </h3>
            </div>
          </div>
          <IndicatorTable indicators={data.indicators} />
        </>
      )}
    </section>
  );
}
