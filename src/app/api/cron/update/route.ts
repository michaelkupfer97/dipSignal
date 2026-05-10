import { NextRequest, NextResponse } from "next/server";
import { computeLatest } from "@/lib/indicators/aggregate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/** S5FI constituent fallback needs time; Hobby default timeouts are often too low. */
export const maxDuration = 300;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  const header = request.headers.get("authorization")?.trim();
  const querySecret = request.nextUrl.searchParams.get("secret")?.trim();
  return header === `Bearer ${secret}` || querySecret === secret;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const latest = await computeLatest();
  return NextResponse.json(latest);
}
