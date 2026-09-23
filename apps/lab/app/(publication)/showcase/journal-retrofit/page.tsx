import { JournalRetrofitCase } from "@/components/showcase";
import { profileFromQuery } from "@/lib/design-profile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ title: "Portfolio Journal retrofit — Showcase", description: "Compare a fixed Portfolio Journal baseline with a manually assembled and tunable editorial retrofit.", path: "/showcase/journal-retrofit" });

export default async function JournalRetrofitCasePage({ searchParams }: { searchParams: Promise<{ profile?: string | string[] }> }) {
  const profile = profileFromQuery((await searchParams).profile, "journal-retrofit");
  return <JournalRetrofitCase profile={profile} />;
}
