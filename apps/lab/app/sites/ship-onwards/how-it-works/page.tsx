import { ShipHowItWorks, ShipSite } from "@/components/demo-ship";
import { profileFromQuery } from "@/lib/design-profile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ title: "How it works | Ship Onwards", description: "The proposed Design Skill process, scope, and validation status behind the Ship Onwards prototype.", path: "/sites/ship-onwards/how-it-works" });

export default async function HowItWorksPage({ searchParams }: { searchParams: Promise<{ profile?: string | string[] }> }) {
  const profile = profileFromQuery((await searchParams).profile, "ship-onwards");
  return <ShipSite profile={profile}><ShipHowItWorks profile={profile} /></ShipSite>;
}
