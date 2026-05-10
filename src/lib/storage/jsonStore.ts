import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

type CacheEntry = { value: unknown; expiresAt: number };
const memory = new Map<string, CacheEntry>();
const dataDir = path.join(process.cwd(), ".data");
const TTL_MS = 60_000;

function shouldUseBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN && process.env.VERCEL);
}

async function readLocal<T>(key: string, fallback: T): Promise<T> {
  const filePath = path.join(dataDir, `${key}.json`);
  try {
    const text = await fs.readFile(filePath, "utf8");
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

async function writeLocal<T>(key: string, value: T) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(path.join(dataDir, `${key}.json`), JSON.stringify(value, null, 2));
}

async function readBlob<T>(key: string, fallback: T): Promise<T> {
  const { get } = await import("@vercel/blob");
  const pathname = `${key}.json`;
  const result = await get(pathname, { access: "private", useCache: false });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return fallback;
  }

  const text = await new Response(result.stream).text();
  return JSON.parse(text) as T;
}

async function writeBlob<T>(key: string, value: T) {
  const { put } = await import("@vercel/blob");
  await put(`${key}.json`, JSON.stringify(value, null, 2), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
  });
}

function getCached<T>(key: string): T | undefined {
  const entry = memory.get(key);
  if (entry && entry.expiresAt > Date.now()) {
    return entry.value as T;
  }
  return undefined;
}

function setCached(key: string, value: unknown) {
  memory.set(key, { value, expiresAt: Date.now() + TTL_MS });
}

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  const hit = getCached<T>(key);
  if (hit !== undefined) {
    return hit;
  }

  const value = shouldUseBlobStorage() ? await readBlob(key, fallback) : await readLocal(key, fallback);
  setCached(key, value);
  return value;
}

export async function writeJson<T>(key: string, value: T) {
  setCached(key, value);
  if (shouldUseBlobStorage()) {
    await writeBlob(key, value);
    return;
  }
  await writeLocal(key, value);
}
