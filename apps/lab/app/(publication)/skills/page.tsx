import { notFound } from "next/navigation";
import { EditorialArchive } from "../../../components/editorial";
import { getPublishedEntries } from "../../../lib/content";
import { pageMetadata } from "../../../lib/site";

export const metadata = pageMetadata({ title: "Skill Listings", description: "Public descriptions of Jay's agent workflows, their fit, and limitations.", path: "/skills" });

export default function SkillsPage() {
  const entries = getPublishedEntries().filter((entry) => entry.kind === "skill");
  if (entries.length === 0) notFound();
  return <EditorialArchive kind="skill" entries={entries} />;
}
