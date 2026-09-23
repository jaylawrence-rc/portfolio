import { notFound } from "next/navigation";
import Link from "next/link";
import { EntryCards } from "../../../../components/editorial";
import styles from "../../../../components/editorial.module.css";
import { getPublishedEntries, getTopics } from "../../../../lib/content";
import { pageMetadata } from "../../../../lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getTopics().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const topic = getTopics().find((item) => item.slug === slug);
  if (!topic) notFound();
  return pageMetadata({ title: topic.label, description: `Published Lab entries about ${topic.label}.`, path: `/topics/${topic.slug}` });
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopics().find((item) => item.slug === slug);
  if (!topic) notFound();
  return <div className="lab-shell">
    <header className={styles.archiveHeader}>
      <p className="eyebrow">Jay&apos;s Lab / Topic</p>
      <h1>{topic.label}</h1>
      <p>{topic.count} published {topic.count === 1 ? "entry" : "entries"} in this topic.</p>
      <Link className="lab-link" href="/library">Browse the library</Link>
    </header>
    <EntryCards entries={getPublishedEntries().filter((entry) => entry.topics.includes(topic.slug))} />
  </div>;
}
