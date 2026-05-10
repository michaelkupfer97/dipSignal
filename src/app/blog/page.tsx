import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Markets, geopolitics, and the technology cycle — analysis and reporting by Michael Kupfer.",
  alternates: {
    canonical: "/blog",
    languages: {
      en: "/blog",
      he: "/he/blog",
    },
  },
};

export default async function BlogPage() {
  const posts = await getPosts("en");
  const [featured, ...rest] = posts;

  return (
    <main className="container article">
      <header className="blog-page-header">
        <p className="eyebrow">Articles</p>
        <h1>DipSignal</h1>
        <p className="muted tagline">
          Markets, geopolitics, and the new technology cycle — reporting and commentary from Michael
          Kupfer.
        </p>
      </header>

      {featured ? (
        <Link href={`/blog/${featured.slug}`} className="blog-hero">
          <div className="blog-hero__image-wrap">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="blog-hero__body">
            <span className="post-card__date-pill">{featured.date}</span>
            <h2 className="blog-hero__title">{featured.title}</h2>
            <p className="blog-hero__dek">{featured.description}</p>
            <div className="post-meta">
              <span>{featured.author}</span>
              <span className="post-meta__sep" aria-hidden>
                ·
              </span>
              <span>{featured.readingMinutes} min read</span>
            </div>
            <span className="blog-hero__cta">Read article →</span>
          </div>
        </Link>
      ) : null}

      <div className="blog-grid">
        {rest.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="post-card">
            <div className="post-card__image">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, 360px"
                loading={index === 0 ? "eager" : undefined}
              />
            </div>
            <div className="post-card__body">
              <span className="post-card__date-pill">{post.date}</span>
              <h3 className="post-card__title">{post.title}</h3>
              <p className="post-card__dek">{post.description}</p>
              <div className="post-meta">
                <span>{post.author}</span>
                <span className="post-meta__sep" aria-hidden>
                  ·
                </span>
                <span>{post.readingMinutes} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
