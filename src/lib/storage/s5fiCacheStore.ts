import "server-only";

import { readJson, writeJson } from "./jsonStore";

export type S5fiConstituentDailyCache = {
  utcDate: string;
  value: number;
  source: string;
};

const KEY = "s5fi-cache";

export async function getS5fiConstituentCache(): Promise<S5fiConstituentDailyCache | null> {
  return readJson<S5fiConstituentDailyCache | null>(KEY, null);
}

export async function setS5fiConstituentCache(entry: S5fiConstituentDailyCache) {
  await writeJson(KEY, entry);
}
