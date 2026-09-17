import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/lib/posts";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Blog",
  description: "Notes from Jay Lawrence on product engineering, frontend systems, AI-assisted development, privacy, and building trustworthy software around real problems.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="page-shell shell">
      <header className="page-intro blog-intro">
        <p className="eyebrow">Blog · field notes from the work</p>
        <h1>Engineering decisions, written down.</h1>
        <p>Practical notes on AI-assisted development, frontend architecture, product judgment, privacy, and the systems that help teams ship responsibly.</p>
      </header>

      <div className="post-index">
        {posts.map((post, index) => (
          <article className="post-row" key={post.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="eyebrow">{post.topics[0]}</p>
              <h2><Link href={`/blog/${post.slug}`}>{post.title}<ArrowUpRight aria-hidden="true" /></Link></h2>
              <p>{post.description}</p>
            </div>
            <dl><dt>Published</dt><dd><time dateTime={post.publishedAtISO}>{post.publishedAt}</time></dd><dt>Reading time</dt><dd>{post.readingTime}</dd></dl>
          </article>
        ))}
      </div>
    </section>
  );
}
