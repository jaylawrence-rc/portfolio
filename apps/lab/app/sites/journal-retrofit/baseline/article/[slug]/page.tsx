import { notFound } from "next/navigation";
import { JournalArticle, JournalSite } from "@/components/demo-journal";
import { selectedJournalPost, selectedJournalSlug } from "@/lib/journal-retrofit";
import { profileFromQuery } from "@/lib/design-profile";
import { pageMetadata } from "@/lib/site";

export function generateStaticParams() { return [{ slug: selectedJournalSlug }]; }
export const metadata = pageMetadata({ title: `${selectedJournalPost.title} | Fixed baseline`, description: selectedJournalPost.description, path: `/sites/journal-retrofit/baseline/article/${selectedJournalSlug}` });

export default async function JournalBaselineArticle({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ profile?: string | string[] }> }) {
  if ((await params).slug !== selectedJournalSlug) notFound();
  const profile = profileFromQuery((await searchParams).profile, "journal-retrofit");
  return <JournalSite variant="baseline" profile={profile}><JournalArticle variant="baseline" profile={profile} /></JournalSite>;
}
