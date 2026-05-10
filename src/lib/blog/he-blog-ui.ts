/** Hebrew UI strings as ASCII-only source: UTF-8 bytes via decodeURIComponent. */
function u(percentEncodedUtf8: string): string {
  return decodeURIComponent(percentEncodedUtf8);
}

export const heBlogUi = {
  listMetaTitle: u("%D7%9E%D7%90%D7%9E%D7%A8%D7%99%D7%9D"),
  listMetaDescription: u(
    "%D7%A9%D7%95%D7%95%D7%A7%D7%99%D7%9D%2C%20%D7%92%D7%99%D7%90%D7%95%D7%A4%D7%95%D7%9C%D7%99%D7%98%D7%99%D7%A7%D7%94%20%D7%95%D7%9E%D7%97%D7%96%D7%95%D7%A8%20%D7%94%D7%98%D7%9B%D7%A0%D7%95%D7%9C%D7%95%D7%92%D7%99%D7%94%20%D7%94%D7%97%D7%93%D7%A9%20%E2%80%94%20%D7%93%D7%99%D7%95%D7%95%D7%97%20%D7%95%D7%A0%D7%99%D7%AA%D7%95%D7%97%20%D7%9E%D7%90%D7%AA%20Michael%20Kupfer.",
  ),
  brandName: u("%D7%93%D7%99%D7%A4%D7%A1%D7%99%D7%92%D7%A0%D7%9C"),
  eyebrowArticles: u("%D7%9E%D7%90%D7%9E%D7%A8%D7%99%D7%9D"),
  listTagline: u(
    "%D7%A9%D7%95%D7%95%D7%A7%D7%99%D7%9D%2C%20%D7%92%D7%99%D7%90%D7%95%D7%A4%D7%95%D7%9C%D7%99%D7%98%D7%99%D7%A7%D7%94%20%D7%95%D7%9E%D7%97%D7%96%D7%95%D7%A8%20%D7%94%D7%98%D7%9B%D7%A0%D7%95%D7%9C%D7%95%D7%92%D7%99%D7%94%20%D7%94%D7%97%D7%93%D7%A9%20%E2%80%94%20%D7%93%D7%99%D7%95%D7%95%D7%97%20%D7%95%D7%A0%D7%99%D7%AA%D7%95%D7%97%20%D7%9E%D7%90%D7%AA%20Michael%20Kupfer.",
  ),
  minutesReadSuffix: u("%D7%93%D7%A7%D7%95%D7%AA%20%D7%A7%D7%A8%D7%99%D7%90%D7%94"),
  readArticleCta: u("%D7%A7%D7%A8%D7%99%D7%90%D7%AA%20%D7%94%D7%9E%D7%90%D7%9E%D7%A8"),
  backToAll: u("%D7%97%D7%96%D7%A8%D7%94%20%D7%9C%D7%9B%D7%9C%20%D7%94%D7%9E%D7%90%D7%9E%D7%A8%D7%99%D7%9D"),
  alsoInEnglishPrefix: u("%D7%92%D7%9D%20%D7%91%D7%90%D7%A0%D7%92%D7%9C%D7%99%D7%AA%3A"),
  adjacentNavAria: u("%D7%9E%D7%90%D7%9E%D7%A8%D7%99%D7%9D%20%D7%A1%D7%9E%D7%95%D7%9B%D7%99%D7%9D"),
  olderArticle: u("%D7%99%D7%A9%D7%9F%20%D7%99%D7%95%D7%AA%D7%A8"),
  newerArticle: u("%D7%97%D7%93%D7%A9%20%D7%99%D7%95%D7%AA%D7%A8"),
} as const;
