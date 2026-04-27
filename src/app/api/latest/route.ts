import { NextResponse } from "next/server";
import { computeLatest } from "@/lib/indicators/aggregate";
import { getLatest } from "@/lib/history/historyStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const latest = await getLatest();
  const ageMs = latest ? Date.now() - new Date(latest.timestamp).getTime() : Number.POSITIVE_INFINITY;

  if (latest && ageMs < 15 * 60 * 1000) {
    return NextResponse.json(latest);
  }

  try {
    return NextResponse.json(await computeLatest());
  } catch (error) {
    if (latest) {
      return NextResponse.json({ ...latest, stale: true });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to compute latest result" },
      { status: 500 },
    );
  }
}
