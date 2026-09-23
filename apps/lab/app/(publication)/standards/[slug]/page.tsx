import { notFound } from "next/navigation";
import { EditorialArticle } from "../../../../components/editorial";
import { getPublishedEntries, getPublishedEntry } from "../../../../lib/content";
import { pageMetadata } from "../../../../lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedEntries().filter((entry) => entry.kind === "standard").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = getPublishedEntry("standard", slug);
  if (!entry) notFound();
  return pageMetadata({ title: entry.title, description: entry.description, path: entry.href, type: "article", publishedTime: entry.publishedAt });
}

export default async function StandardPage({ params }: Props) {
  const { slug } = await params;
  const entry = getPublishedEntry("standard", slug);
  if (!entry) notFound();
  return <EditorialArticle entry={entry} />;
}
