import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { journalBaselineCommit, journalPosts, selectedJournalPost, selectedJournalSlug } from "@/lib/journal-retrofit";
import { profileStyle, profileUrl, type DesignProfile } from "@/lib/design-profile";
import "./demo-journal.css";

type Variant = "baseline" | "refined";

function journalPath(variant: Variant, profile?: DesignProfile, article = false) {
  const base = variant === "baseline" ? "/sites/journal-retrofit/baseline" : "/sites/journal-retrofit";
  const path = article ? `${base}/article/${selectedJournalSlug}` : base;
  return profile ? profileUrl(path, profile) : path;
}

export function JournalSite({ variant, profile, children }: { variant: Variant; profile?: DesignProfile; children: ReactNode }) {
  return <div className={`demo-journal demo-journal--${variant}`} style={variant === "refined" && profile ? profileStyle(profile) as CSSProperties : undefined}>
    <div className="demo-journal__demo-bar"><span>{variant === "baseline" ? "Fixed baseline reconstruction" : "Tunable retrofit reconstruction"} / commit {journalBaselineCommit.slice(0, 7)}</span><Link href={profile ? profileUrl("/showcase/journal-retrofit", profile) : "/showcase/journal-retrofit"}>Case study ↗</Link></div>
    <header className="demo-journal__header"><Link className="demo-journal__brand" href={journalPath(variant, profile)}><span>JL</span><strong>Jay Lawrence</strong></Link><nav aria-label="Journal demo"><a href="https://jaylawrence.me/work" target="_blank" rel="noopener noreferrer">Work ↗</a><a href="https://jaylawrence.me/about" target="_blank" rel="noopener noreferrer">About ↗</a><Link href={journalPath(variant, profile)} aria-current="page">Journal</Link><Link href="/">Lab ↗</Link></nav><div className="demo-journal__header-action"><Link href={variant === "baseline" ? journalPath("refined", profile) : journalPath("baseline", profile)}>{variant === "baseline" ? "See refined →" : "See baseline →"}</Link></div></header>
    <main>{children}</main>
    <footer className="demo-journal__footer"><span>Controlled reconstruction of Portfolio Journal commit {journalBaselineCommit.slice(0, 7)}</span><Link href={profile ? profileUrl("/showcase/journal-retrofit", profile) : "/showcase/journal-retrofit"}>Read changes and limits ↗</Link></footer>
  </div>;
}

export function JournalIndex({ variant, profile }: { variant: Variant; profile?: DesignProfile }) {
  return <div className="demo-journal__index"><header className="demo-journal__intro"><p className="demo-journal__eyebrow">{variant === "baseline" ? "Blog · field notes from the work" : "Portfolio Journal / Field notes from the work"}</p><h1>Engineering decisions, written down.</h1><p>Practical notes on AI-assisted development, frontend architecture, product judgment, privacy, and the systems that help teams ship responsibly.</p></header><div className="demo-journal__rows">{journalPosts.map((post, index) => {
    const isSelected = post.slug === selectedJournalSlug;
    const link = isSelected ? journalPath(variant, profile, true) : `https://jaylawrence.me/blog/${post.slug}`;
    return <article className="demo-journal__row" key={post.slug}><span className="demo-journal__row-number">{String(index + 1).padStart(2, "0")}</span><div className="demo-journal__row-copy"><p className="demo-journal__eyebrow">{post.topics[0]}</p><h2>{isSelected ? <Link href={link}>{post.title}<span aria-hidden="true">↗</span></Link> : <a href={link} target="_blank" rel="noopener noreferrer">{post.title}<span aria-hidden="true">↗</span></a>}</h2><p>{post.description}</p><dl><dt>Published</dt><dd><time dateTime={post.publishedAtISO}>{post.publishedAt}</time></dd><dt>Reading time</dt><dd>{post.readingTime}</dd></dl>{!isSelected && <small className="demo-journal__external-note">Opens the original live article ↗</small>}</div><div className={`demo-journal__row-art demo-journal__row-art--${index}`} aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span><i /><b>{post.topics[0]}</b></div></article>;
  })}</div></div>;
}

function JournalDiagram({ kicker, title, caption, items }: { kicker: string; title: string; caption: string; items: string[] }) {
  return <figure className="demo-journal__diagram"><figcaption><span>{kicker}</span><strong>{title}</strong><p>{caption}</p></figcaption><ol>{items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></figure>;
}

function JournalArticleBody() {
  return <div className="demo-journal__article-body">
    <p className="demo-journal__opening">AI is most useful to me when it makes the engineering process clearer. I use it to inspect more context, compare more options, and shorten the distance between an ambiguous problem and a verified solution—not to outsource judgment.</p>
    <JournalDiagram kicker="The operating loop" title="AI accelerates the work; verification determines what survives." caption="The useful output of each task is not only code. It is also better context for the next decision." items={["Context", "Plan", "Build", "Verify", "Learn"]} />

    <section><p className="demo-journal__eyebrow">The operating principle</p><h2>AI works inside my process, not above it.</h2><p>The model does not attend the stakeholder conversation, own the production incident, or explain a tradeoff to the team. I do. That changes which work I accelerate and which decisions stay firmly human.</p><blockquote>My goal is not to generate more code. It is to reduce the distance between an unclear problem and a verified solution.</blockquote><JournalDiagram kicker="Comparison" title="Speed and accountability belong in different columns." caption="AI can widen the search space; the engineer remains responsible for narrowing it correctly." items={["AI leverage · Inspect and draft · Search, Compare, Scaffold, Refactor, Challenge", "Human responsibility · Decide and own · Understand, Choose, Review, Explain, Own outcomes"]} /></section>

    <section><p className="demo-journal__eyebrow">My workflow</p><h2>Five loops move the work from context to confidence.</h2><JournalDiagram kicker="Process flow" title="Every stage has a human gate and a concrete exit artifact." caption="Domain-heavy work—especially healthcare—stays bounded by product behavior, privacy, architecture, and evidence rather than model confidence." items={["Context · User outcome, constraints, nearby code, and existing patterns.", "Plan · Facts, assumptions, risks, scope, and acceptance criteria.", "Build · Mechanical implementation within known boundaries.", "Verify · Types, tests, build, browser journey, and diff review.", "Learn · Turn corrections into tests, tokens, docs, or rules."]} /></section>

    <section><p className="demo-journal__eyebrow">Where it helps</p><h2>The tool changes role across the development lifecycle.</h2><JournalDiagram kicker="Decision matrix" title="Leverage is useful only when its corresponding check is explicit." caption="The pattern is consistent: let AI increase breadth, then use product and engineering evidence to narrow the answer." items={["Discovery · Map code, data flow, and nearby patterns / Is the context complete and relevant?", "Product shaping · List states, edge cases, and acceptance criteria / Does this match the real user decision?", "Implementation · Draft components, tests, migrations, and docs / Does it respect system boundaries and craft?", "Debugging · Generate focused hypotheses from concrete signals / Which hypothesis survives reproduction?", "Review · Challenge accessibility, performance, and scope / What does the actual diff and product prove?"]} /></section>

    <section><p className="demo-journal__eyebrow">The boundaries</p><h2>Some work should never be delegated blindly.</h2><p>Credentials, private customer information, patient data, and confidential business material stop at an approval boundary. Generated code also does not get to establish an architectural pattern by accident.</p><blockquote>I read what ships. AI can draft quickly, but responsibility cannot be delegated.</blockquote><JournalDiagram kicker="Boundary layers" title="Three gates remain non-delegable." caption="The boundary is not anti-AI. It is what makes AI useful without turning convenience into authority." items={["Input · Approved context · Sanitize and confirm the environment before sensitive material enters a tool.", "Design · Deliberate architecture · New patterns require a reason, not merely generated precedent.", "Release · Verified ownership · A responsible engineer understands, tests, reviews, and owns what ships."]} /></section>

    <section><p className="demo-journal__eyebrow">A practical example</p><h2>A feature should leave behind evidence, not only a diff.</h2><JournalDiagram kicker="Process flow" title="Six artifacts turn an ambiguous workflow into reusable product knowledge." caption="The final correction moves out of the chat and into the codebase, so the next task begins with stronger context." items={["User statement · Describe the result in the user’s language.", "Repository map · Find adjacent behavior, primitives, state, and tests.", "Bounded plan · Expose assumptions, edge cases, and stop conditions.", "Draft diff · Delegate mechanics while shaping behavior directly.", "Verified journey · Exercise responsive, accessible, loading, empty, and error states.", "Reusable rule · Preserve the lesson as a test, token, component, or note."]} /></section>

    <section><p className="demo-journal__eyebrow">The result</p><h2>AI gives me leverage when the feedback loop stays honest.</h2><p>The value is not that AI can type faster. It is that I can inspect more context, compare more options, and verify more thoroughly—while remaining accountable for every decision. Used this way, AI does not replace the engineering workflow. It makes the workflow more deliberate.</p></section>
  </div>;
}

export function JournalArticle({ variant, profile }: { variant: Variant; profile?: DesignProfile }) {
  const post = selectedJournalPost;
  return <article className="demo-journal__article"><header className="demo-journal__article-header"><Link className="demo-journal__back" href={journalPath(variant, profile)}>← All posts</Link><p className="demo-journal__eyebrow">{post.topics.join(" · ")}</p><h1>{post.title}</h1><p className="demo-journal__deck">{post.description}</p><div className="demo-journal__byline"><span>By Jay Lawrence Dimaano</span><span><time dateTime={post.publishedAtISO}>{post.publishedAt}</time></span><span>{post.readingTime}</span></div></header><JournalArticleBody /><footer className="demo-journal__article-footer"><span>Continue</span><h2>See how that workflow appears in shipped product work.</h2><a href="https://jaylawrence.me/work" target="_blank" rel="noopener noreferrer">Explore the case studies ↗</a></footer></article>;
}
