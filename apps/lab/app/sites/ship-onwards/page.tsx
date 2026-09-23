import { ShipHome, ShipSite } from "@/components/demo-ship";
import { profileFromQuery } from "@/lib/design-profile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ title: "Ship Onwards — working prototype", description: "Explore a prototype product site for solo founders, with sample UI directions and an adjustable Design Profile.", path: "/sites/ship-onwards" });

export default async function ShipOnwardsHome({ searchParams }: { searchParams: Promise<{ profile?: string | string[] }> }) {
  const profile = profileFromQuery((await searchParams).profile, "ship-onwards");
  return <ShipSite profile={profile}><ShipHome profile={profile} /></ShipSite>;
}
