import { NextRequest, NextResponse } from "next/server";
import { authorizeCron, cronUnauthorizedJson } from "@/lib/cron/cronSecretAuth";
import { computeLatest } from "@/lib/indicators/aggregate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** S5FI constituent fallback needs time; Hobby default timeouts are often too low. */
export const maxDuration = 300;

async function handle(request: NextRequest) {
  const auth = await authorizeCron(request);
  if (!auth.ok) {
    return NextResponse.json(cronUnauthorizedJson(auth.code), { status: auth.httpStatus });
  }

  const latest = await computeLatest();
  return NextResponse.json(latest);
}

export async function GET(request: NextRequest) {
  return handle(request);
}

export async function POST(request: NextRequest) {
  return handle(request);
}
