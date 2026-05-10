import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { heBlogUi } from "@/lib/blog/he-blog-ui";
import { getPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: heBlogUi.listMetaTitle,
  description: heBlogUi.listMetaDescription,
  alternates: {
    canonical: "/he/blog",
    languages: {
      en: "/blog",
      he: "/he/blog",
    },
  },
};

export default async function HebrewBlogPage() {
  const posts = await getPosts("he");
  const [featured, ...rest] = posts;

  return (
    <main className="container article" dir="rtl">
      <header className="blog-page-header">
        <p className="eyebrow">{heBlogUi.eyebrowArticles}</p>
        <h1>{heBlogUi.brandName}</h1>
        <p className="muted tagline">{heBlogUi.listTagline}</p>
      </header>

      {featured ? (
        <Link href={`/he/blog/${featured.slug}`} className="blog-hero">
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
              <span className="post-meta__sep" aria-hidden="true">
                &#183;
              </span>
              <span>
                {featured.readingMinutes} {heBlogUi.minutesReadSuffix}
              </span>
            </div>
            <span className="blog-hero__cta">{heBlogUi.readArticleCta}</span>
          </div>
        </Link>
      ) : null}

      <div className="blog-grid">
        {rest.map((post, index) => (
          <Link href={`/he/blog/${post.slug}`} key={post.slug} className="post-card">
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
                <span className="post-meta__sep" aria-hidden="true">
                  &#183;
                </span>
                <span>
                  {post.readingMinutes} {heBlogUi.minutesReadSuffix}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
