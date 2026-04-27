import Link from "next/link";
import type { Metadata } from "next";
import { getPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "DipSignal Blog",
  description:
    "Educational articles about the S&P 500 Buy the Dip Indicator, Fear & Greed, VIX, breadth, and red days.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="container article">
      <p className="eyebrow">Research notes</p>
      <h1>S&amp;P 500 Buy the Dip Indicator Blog</h1>
      <div className="post-list">
        {posts.map((post) => (
          <article className="card" key={post.slug}>
            <p className="muted">{post.date}</p>
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
