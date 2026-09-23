import { notFound } from "next/navigation";
import { EditorialArchive } from "../../../components/editorial";
import { getPublishedEntries } from "../../../lib/content";
import { pageMetadata } from "../../../lib/site";

export const metadata = pageMetadata({ title: "Learning Notes", description: "Jay's current understanding, evidence, worked examples, and open questions.", path: "/notes" });

export default function NotesPage() {
  const entries = getPublishedEntries().filter((entry) => entry.kind === "note");
  if (entries.length === 0) notFound();
  return <EditorialArchive kind="note" entries={entries} />;
}
