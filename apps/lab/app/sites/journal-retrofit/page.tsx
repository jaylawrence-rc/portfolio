import { JournalIndex, JournalSite } from "@/components/demo-journal";
import { profileFromQuery } from "@/lib/design-profile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ title: "Portfolio Journal retrofit — working comparison", description: "A tunable controlled reconstruction of a Portfolio Journal browse and article flow.", path: "/sites/journal-retrofit" });

export default async function JournalRetrofitPage({ searchParams }: { searchParams: Promise<{ profile?: string | string[] }> }) {
  const profile = profileFromQuery((await searchParams).profile, "journal-retrofit");
  return <JournalSite variant="refined" profile={profile}><JournalIndex variant="refined" profile={profile} /></JournalSite>;
}
