import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { heBlogUi } from "@/lib/blog/he-blog-ui";
import { getAdjacentPosts, getPost, getPosts } from "@/lib/blog/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateStaticParams() {
  const posts = await getPosts("he");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post: Awaited<ReturnType<typeof getPost>>;
  try {
    post = await getPost(slug, "he");
  } catch {
    return {};
  }
  const { meta } = post;
  const canonical = `/he/blog/${meta.slug}`;
  const ogUrl = `${siteUrl}${canonical}`;
  const imageUrl = meta.image.startsWith("http") ? meta.image : `${siteUrl}${meta.image}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: meta.hasOtherLocale
        ? {
            en: `/blog/${meta.slug}`,
            he: canonical,
          }
        : { he: canonical },
    },
    openGraph: {
      type: "article",
      locale: "he_IL",
      url: ogUrl,
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      authors: [meta.author],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [imageUrl],
    },
  };
}

function ArticleJsonLd({
  meta,
  url,
}: {
  meta: Awaited<ReturnType<typeof getPost>>["meta"];
  url: string;
}) {
  const imageUrl = meta.image.startsWith("http") ? meta.image : `${siteUrl}${meta.image}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: { "@type": "Person", name: meta.author },
    image: [imageUrl],
    inLanguage: "he",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export default async function HebrewBlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post: Awaited<ReturnType<typeof getPost>>;

  try {
    post = await getPost(slug, "he");
  } catch {
    notFound();
  }

  const { meta, html } = post;
  const { prev, next } = await getAdjacentPosts(slug, "he");
  const pageUrl = `${siteUrl}/he/blog/${meta.slug}`;

  return (
    <main className="container article" dir="rtl">
      <ArticleJsonLd meta={meta} url={pageUrl} />
      <Link className="article-back" href="/he/blog">
        {heBlogUi.backToAll}
      </Link>

      <div className="article-hero-image">
        <Image
          src={meta.image}
          alt={meta.title}
          fill
          priority
          sizes="(max-width: 820px) 100vw, 820px"
          className="object-cover"
        />
      </div>

      <div className="article-intro">
        <h1>{meta.title}</h1>
        <p className="article-dek">{meta.description}</p>
        <div className="post-meta">
          <span>{meta.author}</span>
          <span className="post-meta__sep" aria-hidden="true">
            &#183;
          </span>
          <time dateTime={meta.date}>{meta.date}</time>
          <span className="post-meta__sep" aria-hidden="true">
            &#183;
          </span>
          <span>
            {meta.readingMinutes} {heBlogUi.minutesReadSuffix}
          </span>
        </div>

        {meta.hasOtherLocale ? (
          <p className="article-lang-switch muted">
            {heBlogUi.alsoInEnglishPrefix}{" "}
            <Link href={`/blog/${meta.slug}`}>English version</Link>
          </p>
        ) : null}
      </div>

      <div className="article-body prose-blog" dangerouslySetInnerHTML={{ __html: html }} />

      <nav className="article-nav" aria-label={heBlogUi.adjacentNavAria}>
        {prev ? (
          <Link href={`/he/blog/${prev.slug}`} className="article-nav-card">
            <div className="article-nav-card__thumb">
              <Image src={prev.image} alt={prev.title} fill sizes="80px" className="object-cover" />
            </div>
            <div>
              <div className="article-nav-card__label">{heBlogUi.olderArticle}</div>
              <div className="article-nav-card__title">{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={`/he/blog/${next.slug}`} className="article-nav-card">
            <div className="article-nav-card__thumb">
              <Image src={next.image} alt={next.title} fill sizes="80px" className="object-cover" />
            </div>
            <div>
              <div className="article-nav-card__label">{heBlogUi.newerArticle}</div>
              <div className="article-nav-card__title">{next.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </main>
  );
}
