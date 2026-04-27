const DEFAULT_TIMEOUT_MS = 15000;

export async function fetchText(url: string, init: RequestInit = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; DipSignal/1.0; +https://example.com)",
        accept: "text/html,application/json,text/plain,*/*",
        ...init.headers,
      },
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      throw new Error(`Request failed ${response.status} for ${url}`);
    }

    return response.text();
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchJson<T>(url: string, init: RequestInit = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const text = await fetchText(
    url,
    {
      ...init,
      headers: {
        accept: "application/json,text/plain,*/*",
        ...init.headers,
      },
    },
    timeoutMs,
  );

  return JSON.parse(text) as T;
}
