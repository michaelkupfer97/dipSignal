import { fetchText } from "./http";

export type S5fiQuote = {
  date: string;
  value: number;
  source: string;
};

function parseEodDate(value: string) {
  const [day, monthText, yearText] = value.trim().split(/\s+/);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].indexOf(monthText);

  if (!day || month < 0 || !yearText) {
    return value;
  }

  const fullYear = Number(yearText) < 70 ? 2000 + Number(yearText) : 1900 + Number(yearText);
  return new Date(Date.UTC(fullYear, month, Number(day))).toISOString().slice(0, 10);
}

export async function fetchS5fiFromEodData(): Promise<S5fiQuote> {
  const html = await fetchText("https://www.eoddata.com/stockquote/INDEX/S5FI.htm");
  const rowPattern =
    /<tr>\s*<td[^>]*>\s*(\d{1,2}\s+[A-Z][a-z]{2}\s+\d{2})\s*<\/td>\s*<td[^>]*>\s*([\d.]+)\s*<\/td>\s*<td[^>]*>\s*([\d.]+)\s*<\/td>\s*<td[^>]*>\s*([\d.]+)\s*<\/td>\s*<td[^>]*>\s*([\d.]+)\s*<\/td>/i;
  const match = html.match(rowPattern);

  if (!match) {
    throw new Error("Could not parse S5FI row from EODData");
  }

  return {
    date: parseEodDate(match[1]),
    value: Number(match[5]),
    source: "EODData INDEX/S5FI",
  };
}

export async function fetchPublishedS5fi(): Promise<S5fiQuote> {
  return fetchS5fiFromEodData();
}
