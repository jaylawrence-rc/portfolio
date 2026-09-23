import { ShipDirections, ShipSite } from "@/components/demo-ship";
import { profileFromQuery } from "@/lib/design-profile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ title: "Sample directions | Ship Onwards", description: "Browse two conceptual product UI directions in the Ship Onwards prototype.", path: "/sites/ship-onwards/directions" });

export default async function DirectionsPage({ searchParams }: { searchParams: Promise<{ profile?: string | string[] }> }) {
  const profile = profileFromQuery((await searchParams).profile, "ship-onwards");
  return <ShipSite profile={profile}><ShipDirections profile={profile} /></ShipSite>;
}
