import { notFound } from "next/navigation";
import { EditorialArchive } from "../../../components/editorial";
import { getPublishedEntries } from "../../../lib/content";
import { pageMetadata } from "../../../lib/site";

export const metadata = pageMetadata({ title: "Standards", description: "Jay's explicit defaults for engineering, product design, and user experience.", path: "/standards" });

export default function StandardsPage() {
  const entries = getPublishedEntries().filter((entry) => entry.kind === "standard");
  if (entries.length === 0) notFound();
  return <EditorialArchive kind="standard" entries={entries} />;
}
