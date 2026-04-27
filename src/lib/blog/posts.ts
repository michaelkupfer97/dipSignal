import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDir = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export async function getPosts(): Promise<BlogPostMeta[]> {
  const files = await fs.readdir(postsDir);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, "");
        const source = await fs.readFile(path.join(postsDir, file), "utf8");
        const { data } = matter(source);
        return {
          slug,
          title: String(data.title),
          description: String(data.description),
          date: String(data.date),
        };
      }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string) {
  const source = await fs.readFile(path.join(postsDir, `${slug}.md`), "utf8");
  const { data, content } = matter(source);
  return {
    meta: {
      slug,
      title: String(data.title),
      description: String(data.description),
      date: String(data.date),
    },
    html: await marked.parse(content),
  };
}
