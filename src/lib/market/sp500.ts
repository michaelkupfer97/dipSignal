import { fetchText } from "./http";

export type Sp500Constituent = {
  symbol: string;
  yahooSymbol: string;
  name: string;
};

export async function fetchSp500Constituents(): Promise<Sp500Constituent[]> {
  const html = await fetchText("https://en.wikipedia.org/wiki/List_of_S%26P_500_companies");
  const tableMatch = html.match(/<table[^>]*id="constituents"[\s\S]*?<\/table>/i);

  if (!tableMatch) {
    throw new Error("Could not find S&P 500 constituents table");
  }

  const rows = tableMatch[0].match(/<tr[\s\S]*?<\/tr>/gi) ?? [];

  return rows
    .slice(1)
    .map((row) => {
      const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) =>
        cell[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim(),
      );
      const symbol = cells[0];
      const name = cells[1];
      if (!symbol || !name) {
        return null;
      }
      return {
        symbol,
        yahooSymbol: symbol.replaceAll(".", "-"),
        name,
      };
    })
    .filter((item): item is Sp500Constituent => item !== null);
}
