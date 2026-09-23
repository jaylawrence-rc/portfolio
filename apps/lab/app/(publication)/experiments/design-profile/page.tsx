import { Configurator } from "@/components/configurator";
import { defaultDesignProfile, profileFromQuery, type DesignTarget } from "@/lib/design-profile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ title: "Design Profile Configurator", description: "Tune a Showcase Site with curated semantic colors, font pairs, radius, and spacing; inspect readability and export the exact versioned Design Profile.", path: "/experiments/design-profile" });

type Query = Promise<{ site?: string | string[]; profile?: string | string[] }>;

export default async function DesignProfileExperiment({ searchParams }: { searchParams: Query }) {
  const query = await searchParams;
  const target: DesignTarget = query.site === "journal-retrofit" ? "journal-retrofit" : "ship-onwards";
  const initialProfile = query.profile ? profileFromQuery(query.profile, target) : defaultDesignProfile(target);
  return <Configurator key={JSON.stringify(initialProfile)} initialProfile={initialProfile} />;
}
