import { NextResponse } from "next/server";
import { computeLatest } from "@/lib/indicators/aggregate";
import { getLatest } from "@/lib/history/historyStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** Only used when Blob has no `latest.json` yet; full compute needs headroom vs default timeout. */
export const maxDuration = 300;

const STALE_MS = 48 * 60 * 60 * 1000;

export async function GET() {
  const latest = await getLatest();
  if (latest) {
    const ageMs = Date.now() - new Date(latest.timestamp).getTime();
    const payload =
      ageMs > STALE_MS ? { ...latest, stale: true as const } : latest;
    return NextResponse.json(payload);
  }

  try {
    return NextResponse.json(await computeLatest());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to compute latest result" },
      { status: 500 },
    );
  }
}
