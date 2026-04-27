import { NextResponse } from "next/server";
import { getHistory } from "@/lib/history/historyStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await getHistory();
  return NextResponse.json(rows);
}
