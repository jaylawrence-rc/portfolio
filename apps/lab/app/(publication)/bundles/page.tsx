import { notFound } from "next/navigation";
import { EditorialArchive } from "../../../components/editorial";
import { getPublishedEntries } from "../../../lib/content";
import { pageMetadata } from "../../../lib/site";

export const metadata = pageMetadata({ title: "Standard Bundles", description: "Curated sets of Jay's Standards for a defined product context.", path: "/bundles" });

export default function BundlesPage() {
  const entries = getPublishedEntries().filter((entry) => entry.kind === "bundle");
  if (entries.length === 0) notFound();
  return <EditorialArchive kind="bundle" entries={entries} />;
}
