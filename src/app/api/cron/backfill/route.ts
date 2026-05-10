import { NextRequest, NextResponse } from "next/server";
import { authorizeCron, cronUnauthorizedJson } from "@/lib/cron/cronSecretAuth";
import { backfillTwoYears } from "@/lib/history/backfill";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

async function handle(request: NextRequest) {
  const auth = await authorizeCron(request);
  if (!auth.ok) {
    return NextResponse.json(cronUnauthorizedJson(auth.code), { status: auth.httpStatus });
  }

  try {
    const rows = await backfillTwoYears();
    return NextResponse.json({ rows: rows.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Backfill failed";
    console.error("[api/cron/backfill]", error);
    return NextResponse.json({ error: "Backfill failed", message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return handle(request);
}

export async function POST(request: NextRequest) {
  return handle(request);
}
