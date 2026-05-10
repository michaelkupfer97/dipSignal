import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

/** Why the request was rejected (safe to show in JSON; never includes the secret). */
export type CronAuthFailureCode =
  | "CRON_SECRET_NOT_CONFIGURED"
  | "NO_CREDENTIAL"
  | "INVALID_CREDENTIAL";

function safeEqualStrings(a: string, b: string) {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

/**
 * Bearer token (full value after `Bearer `), query `?secret=`, or POST JSON `{ "secret": "..." }`.
 */
export async function readProvidedCronSecret(request: NextRequest): Promise<string | undefined> {
  const auth = request.headers.get("authorization")?.trim();
  if (auth?.toLowerCase().startsWith("bearer ")) {
    const token = auth.slice(7).trim();
    if (token) return token;
  }

  const query = request.nextUrl.searchParams.get("secret")?.trim();
  if (query) return query;

  if (request.method === "POST") {
    const ct = request.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) {
      try {
        const body = (await request.json()) as { secret?: unknown };
        if (typeof body.secret === "string" && body.secret.trim()) {
          return body.secret.trim();
        }
      } catch {
        return undefined;
      }
    }
  }

  return undefined;
}

export function getCronEnvSecret(): string | undefined {
  const v = process.env.CRON_SECRET;
  return v?.trim() || undefined;
}

export async function authorizeCron(request: NextRequest): Promise<
  | { ok: true }
  | { ok: false; code: CronAuthFailureCode; httpStatus: number }
> {
  const expected = getCronEnvSecret();

  if (process.env.NODE_ENV === "production" && !expected) {
    return { ok: false, code: "CRON_SECRET_NOT_CONFIGURED", httpStatus: 500 };
  }

  const provided = await readProvidedCronSecret(request);

  if (!expected) {
    return { ok: true };
  }

  if (!provided) {
    return { ok: false, code: "NO_CREDENTIAL", httpStatus: 401 };
  }

  if (!safeEqualStrings(provided, expected)) {
    return { ok: false, code: "INVALID_CREDENTIAL", httpStatus: 401 };
  }

  return { ok: true };
}

export function cronUnauthorizedJson(code: CronAuthFailureCode) {
  const hints = [
    'Send the same value as CRON_SECRET using one of: header Authorization: Bearer <secret>, POST JSON {"secret":"<secret>"}, or GET ?secret= (URL-encoded if it contains +, /, or =).',
  ];
  const body: Record<string, unknown> = { error: "Unauthorized", code };
  if (code === "CRON_SECRET_NOT_CONFIGURED") {
    body.message = "CRON_SECRET is missing in this deployment's environment.";
    hints.push("Vercel: Project ? Settings ? Environment Variables ? add CRON_SECRET for Production ? Redeploy.");
  }
  if (code === "NO_CREDENTIAL") {
    body.message = "No secret supplied.";
  }
  if (code === "INVALID_CREDENTIAL") {
    body.message = "Secret does not match CRON_SECRET for this deployment.";
    hints.push("If the secret contains + or spaces, prefer Bearer header or POST JSON instead of raw ?secret=in-browser.");
  }
  body.hints = hints;
  return body;
}
