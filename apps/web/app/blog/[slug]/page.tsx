import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";
import { JsonLd } from "@/components/json-ld";
import { profile } from "@/lib/profile";
import { absoluteUrl, pageMetadata, personId, websiteId } from "@/lib/site";
import { PostBody } from "./post-body";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAtISO,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const articleUrl = absoluteUrl(`/blog/${post.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        url: articleUrl,
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAtISO,
        author: { "@type": "Person", "@id": personId, name: profile.name, url: absoluteUrl("/about") },
        image: absoluteUrl(`/og/${post.slug}`),
        mainEntityOfPage: articleUrl,
        isPartOf: { "@id": websiteId },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: articleUrl },
        ],
      },
    ],
  };

  return (
    <article className="blog-article">
      <JsonLd data={structuredData} />
      <header className="blog-article-header reading-rail">
        <Link href="/blog" className="back-link"><ArrowLeft size={15} /> All posts</Link>
        <p className="eyebrow">{post.topics.join(" · ")}</p>
        <h1>{post.title}</h1>
        <p className="blog-deck">{post.description}</p>
        <div className="blog-byline"><span>By Jay Lawrence Dimaano</span><span><time dateTime={post.publishedAtISO}>{post.publishedAt}</time></span><span>{post.readingTime}</span></div>
      </header>

      <div className="article-prose reading-rail">
        <PostBody slug={post.slug} />
      </div>

      <footer className="article-end reading-rail">
        <p className="eyebrow">Continue</p>
        <h2>{post.continueReading.title}</h2>
        <Link href={post.continueReading.href}>{post.continueReading.label} <ArrowRight size={16} /></Link>
      </footer>
    </article>
  );
}
