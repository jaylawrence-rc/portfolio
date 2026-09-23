import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { EntryCards } from "../../../components/editorial";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { NativeSelect, NativeSelectOption } from "../../../components/ui/native-select";
import styles from "../../../components/editorial.module.css";
import { CONTENT_KINDS, TOPICS, getPublishedEntries, getTopics, searchEntries, type ContentKind, type TopicSlug } from "../../../lib/content";
import { pageMetadata } from "../../../lib/site";

export const metadata = pageMetadata({ title: "Library", description: "Search Jay's published Standards, Standard Bundles, Skill Listings, and Learning Notes.", path: "/library" });

type SearchParams = { q?: string | string[]; kind?: string | string[]; topic?: string | string[] };

function first(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function LibraryPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const query = first(params.q).slice(0, 120);
  const kindValue = first(params.kind);
  const topicValue = first(params.topic);
  const kind = kindValue in CONTENT_KINDS ? kindValue as ContentKind : undefined;
  const topic = topicValue in TOPICS ? topicValue as TopicSlug : undefined;
  const entries = searchEntries(query, kind, topic);
  const published = getPublishedEntries();
  if (published.length === 0) notFound();
  const kinds = (Object.keys(CONTENT_KINDS) as ContentKind[]).filter((value) => published.some((entry) => entry.kind === value));
  const topics = getTopics();

  return <div className="lab-shell">
    <header className={styles.libraryHeader}>
      <p className="eyebrow">Jay&apos;s Lab / Library</p>
      <h1>Published guidance, in one place.</h1>
      <p>Find a Standard, a curated Bundle, a Skill Listing, or a Learning Note. Search reads only approved, published entries.</p>
    </header>
    <form className={styles.filters} action="/library" method="get" role="search">
      <div className={`${styles.filterField} ${styles.filterQuery}`}><Label className={styles.filterLabel} htmlFor="library-query">Search</Label><Input className={styles.filterControl} id="library-query" name="q" type="search" defaultValue={query} placeholder="Search published guidance" /></div>
      <div className={`${styles.filterField} ${styles.filterKind}`}><Label className={styles.filterLabel} htmlFor="library-kind">Kind</Label><NativeSelect className={styles.selectControl} id="library-kind" name="kind" defaultValue={kind ?? ""}>
        <NativeSelectOption value="">All kinds</NativeSelectOption>
        {kinds.map((value) => <NativeSelectOption key={value} value={value}>{CONTENT_KINDS[value].label}</NativeSelectOption>)}
      </NativeSelect></div>
      <div className={`${styles.filterField} ${styles.filterTopic}`}><Label className={styles.filterLabel} htmlFor="library-topic">Topic</Label><NativeSelect className={styles.selectControl} id="library-topic" name="topic" defaultValue={topic ?? ""}>
        <NativeSelectOption value="">All topics</NativeSelectOption>
        {topics.map(({ slug, label }) => <NativeSelectOption key={slug} value={slug}>{label}</NativeSelectOption>)}
      </NativeSelect></div>
      <Button className={styles.searchButton} type="submit">Search <ArrowUpRight size={16} aria-hidden="true" /></Button>
    </form>
    <p className={styles.resultCount}>{entries.length} {entries.length === 1 ? "entry" : "entries"}</p>
    <EntryCards entries={entries} emptyMessage="No entries match these filters." />
    <p><Link className="lab-link" href="/library">Clear filters</Link></p>
  </div>;
}
