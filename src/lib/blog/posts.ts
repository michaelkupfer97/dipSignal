import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import iconv from "iconv-lite";
import { marked } from "marked";

const postsDir = path.join(process.cwd(), "content", "blog");

const hebrewScript = /[\u0590-\u05FF]/;

/** Some Hebrew .he.md files on disk are cp1255 (Hebrew Windows). Reading as UTF-8 yields U+FFFD. */
function decodeBlogSource(buf: Buffer, locale: Locale): string {
  if (locale !== "he") {
    return buf.toString("utf8");
  }
  const asUtf8 = buf.toString("utf8");
  const hasReplacement = asUtf8.includes("\uFFFD");
  const hasHebrew = hebrewScript.test(asUtf8);
  if (!hasReplacement && hasHebrew) {
    return asUtf8;
  }
  return iconv.decode(buf, "windows-1255");
}

export type Locale = "en" | "he";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  readingMinutes: number;
  locale: Locale;
  hasOtherLocale: boolean;
};

const SUFFIX: Record<Locale, string> = {
  en: ".en.md",
  he: ".he.md",
};

function parseSlugFromFilename(file: string, locale: Locale): string | null {
  const suf = SUFFIX[locale];
  if (!file.endsWith(suf)) return null;
  return file.slice(0, -suf.length);
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function hasSiblingLocale(slug: string, locale: Locale): Promise<boolean> {
  const other: Locale = locale === "en" ? "he" : "en";
  return fileExists(path.join(postsDir, `${slug}${SUFFIX[other]}`));
}

function coalesceReadingMinutes(content: string, explicit: unknown, locale: Locale): number {
  if (typeof explicit === "number" && Number.isFinite(explicit) && explicit > 0) {
    return Math.max(1, Math.round(explicit));
  }
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const wpm = locale === "he" ? 200 : 225;
  return Math.max(1, Math.round(words / wpm));
}

export async function getPosts(locale: Locale): Promise<BlogPostMeta[]> {
  const files = await fs.readdir(postsDir);
  const posts: BlogPostMeta[] = [];

  for (const file of files) {
    const slug = parseSlugFromFilename(file, locale);
    if (!slug) continue;

    const buf = await fs.readFile(path.join(postsDir, file));
    const source = decodeBlogSource(buf, locale);
    const { data, content } = matter(source);
    const hasOtherLocale = await hasSiblingLocale(slug, locale);
    posts.push({
      slug,
      title: String(data.title ?? ""),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      author: String(data.author ?? "Michael Kupfer"),
      image: String(data.image ?? ""),
      readingMinutes: coalesceReadingMinutes(content, data.readingMinutes, locale),
      locale,
      hasOtherLocale,
    });
  }

  return posts.sort((a, b) => {
    const d = b.date.localeCompare(a.date);
    if (d !== 0) return d;
    return a.slug.localeCompare(b.slug);
  });
}

export async function getPost(slug: string, locale: Locale) {
  const filePath = path.join(postsDir, `${slug}${SUFFIX[locale]}`);
  const buf = await fs.readFile(filePath);
  const source = decodeBlogSource(buf, locale);
  const { data, content } = matter(source);
  const hasOtherLocale = await hasSiblingLocale(slug, locale);
  const readingMinutes = coalesceReadingMinutes(content, data.readingMinutes, locale);

  const meta: BlogPostMeta = {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? "Michael Kupfer"),
    image: String(data.image ?? ""),
    readingMinutes,
    locale,
    hasOtherLocale,
  };

  return {
    meta,
    html: await marked.parse(content),
  };
}

export async function getAdjacentPosts(
  slug: string,
  locale: Locale,
): Promise<{ prev: BlogPostMeta | null; next: BlogPostMeta | null }> {
  const posts = await getPosts(locale);
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1]! : null,
    next: idx > 0 ? posts[idx - 1]! : null,
  };
}
