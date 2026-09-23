import { ShipOnwardsCase } from "@/components/showcase";
import { profileFromQuery } from "@/lib/design-profile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ title: "Ship Onwards — Showcase", description: "Inspect the manually assembled Ship Onwards product site prototype, its choices, working routes, and public Design Profile.", path: "/showcase/ship-onwards" });

export default async function ShipOnwardsCasePage({ searchParams }: { searchParams: Promise<{ profile?: string | string[] }> }) {
  const profile = profileFromQuery((await searchParams).profile, "ship-onwards");
  return <ShipOnwardsCase profile={profile} />;
}
