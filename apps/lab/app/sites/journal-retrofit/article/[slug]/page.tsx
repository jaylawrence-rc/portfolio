import { notFound } from "next/navigation";
import { JournalArticle, JournalSite } from "@/components/demo-journal";
import { profileFromQuery } from "@/lib/design-profile";
import { selectedJournalPost, selectedJournalSlug } from "@/lib/journal-retrofit";
import { pageMetadata } from "@/lib/site";

export function generateStaticParams() { return [{ slug: selectedJournalSlug }]; }
export const metadata = pageMetadata({ title: `${selectedJournalPost.title} | Portfolio Journal retrofit`, description: selectedJournalPost.description, path: `/sites/journal-retrofit/article/${selectedJournalSlug}` });

export default async function JournalRetrofitArticle({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ profile?: string | string[] }> }) {
  if ((await params).slug !== selectedJournalSlug) notFound();
  const profile = profileFromQuery((await searchParams).profile, "journal-retrofit");
  return <JournalSite variant="refined" profile={profile}><JournalArticle variant="refined" profile={profile} /></JournalSite>;
}
