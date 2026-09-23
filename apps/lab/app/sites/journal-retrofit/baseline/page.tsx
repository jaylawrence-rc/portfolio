import { JournalIndex, JournalSite } from "@/components/demo-journal";
import { profileFromQuery } from "@/lib/design-profile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ title: "Fixed Portfolio Journal baseline", description: "A fixed controlled reconstruction of the Portfolio Journal browse view at commit abb2f05.", path: "/sites/journal-retrofit/baseline" });

export default async function JournalBaselinePage({ searchParams }: { searchParams: Promise<{ profile?: string | string[] }> }) {
  const profile = profileFromQuery((await searchParams).profile, "journal-retrofit");
  return <JournalSite variant="baseline" profile={profile}><JournalIndex variant="baseline" profile={profile} /></JournalSite>;
}
