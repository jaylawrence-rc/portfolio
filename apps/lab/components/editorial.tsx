import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { CONTENT_KINDS, TOPICS, getPublicMarkdown, getRelatedEntries, type ContentKind, type EditorialEntry } from "../lib/content";
import { EditorialActions } from "./editorial-actions";
import { EditorialMarkdown } from "./editorial-markdown";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import styles from "./editorial.module.css";

function dateLabel(value: string): string {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00.000Z`));
}

export function EntryCards({ entries, headingLevel = 2, emptyMessage = "No approved articles are published in this collection yet." }: { entries: EditorialEntry[]; headingLevel?: 2 | 3; emptyMessage?: string }) {
  if (entries.length === 0) return <div className={styles.empty}>{emptyMessage}</div>;
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return <div className={styles.cards}>{entries.map((entry, index) => <article key={`${entry.kind}:${entry.slug}`}>
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <p className={styles.cardMeta}><span>{String(index + 1).padStart(2, "0")}</span><span>{CONTENT_KINDS[entry.kind].label}</span><time dateTime={entry.publishedAt}>{dateLabel(entry.publishedAt)}</time></p>
        <Link className={styles.cardLink} href={entry.href}>
          <CardTitle className={styles.cardTitle}><Heading>{entry.title}</Heading></CardTitle>
          <ArrowUpRight className={styles.cardArrow} size={21} aria-hidden="true" />
          <CardDescription className={styles.cardDescription}>{entry.description}</CardDescription>
        </Link>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <nav className={styles.tags} aria-label="Topics">{entry.topics.map((topic) => <Link href={`/topics/${topic}`} key={topic}>{TOPICS[topic]}</Link>)}</nav>
      </CardContent>
    </Card>
  </article>)}</div>;
}

export function EditorialArchive({ kind, entries }: { kind: ContentKind; entries: EditorialEntry[] }) {
  const label = CONTENT_KINDS[kind].label;
  const title = kind === "note" ? "Learning Notes" : kind === "skill" ? "Skill Listings" : kind === "bundle" ? "Standard Bundles" : "Standards";
  const descriptions: Record<ContentKind, string> = {
    standard: "Explicit defaults for engineering, product design, and user experience, with scope and checks.",
    bundle: "Curated sets of Standards for a defined product or build context.",
    skill: "Public descriptions of agent workflows, with fit, prerequisites, and limitations.",
    note: "Questions, evidence, worked examples, and current understanding under review.",
  };
  return <div className="lab-shell">
    <header className={styles.archiveHeader}>
      <p className="eyebrow">Jay&apos;s Lab / {label}</p>
      <h1>{title}</h1>
      <p>{descriptions[kind]}</p>
      <Link className="lab-link" href="/library">Browse the library</Link>
    </header>
    <EntryCards entries={entries} />
  </div>;
}

export function EditorialArticle({ entry, afterBody }: { entry: EditorialEntry; afterBody?: ReactNode }) {
  const markdown = getPublicMarkdown(entry);
  const bodyMarkdown = markdown.replace(/^# [^\n]+\n\n> [^\n]+\n\n/, "");
  const sourcesIndex = afterBody ? bodyMarkdown.lastIndexOf("\n## Sources\n") : -1;
  const articleBody = sourcesIndex === -1 ? bodyMarkdown : bodyMarkdown.slice(0, sourcesIndex);
  const sourcesAndCanonical = sourcesIndex === -1 ? "" : bodyMarkdown.slice(sourcesIndex);
  const related = getRelatedEntries(entry);
  return <div className="lab-shell">
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/">Lab</Link><span aria-hidden="true">/</span>
      <Link href={`/${CONTENT_KINDS[entry.kind].collection}`}>{CONTENT_KINDS[entry.kind].collection}</Link><span aria-hidden="true">/</span>
      <span aria-current="page">{entry.title}</span>
    </nav>
    <article className={styles.article}>
      <div className={styles.articleHeader}>
        <p className="eyebrow">{CONTENT_KINDS[entry.kind].label}</p>
        <h1>{entry.title}</h1>
        <p className={styles.dek}>{entry.description}</p>
        <div className={styles.details}>
          <span>Published {dateLabel(entry.publishedAt)}</span>
          <span>Revised {dateLabel(entry.revisedAt)}</span>
          <span>Version {entry.version}</span>
          {entry.reviewAt && <span>Review by {dateLabel(entry.reviewAt)}</span>}
        </div>
        <nav className={styles.tags} aria-label="Topics">{entry.topics.map((topic) => <Link href={`/topics/${topic}`} key={topic}>{TOPICS[topic]}</Link>)}</nav>
      </div>
      {(entry.kind === "standard" || entry.kind === "bundle") && <EditorialActions markdown={markdown} href={entry.href} slug={entry.slug} />}
      <EditorialMarkdown source={articleBody} />
      {afterBody && <div className={styles.articleFeature}>{afterBody}</div>}
      {sourcesAndCanonical && <EditorialMarkdown source={sourcesAndCanonical} />}
    </article>
    {related.length > 0 && <aside className={styles.related} aria-label="Related Lab entries">
      <h2>Related reading</h2>
      <EntryCards entries={related} headingLevel={3} />
    </aside>}
  </div>;
}
