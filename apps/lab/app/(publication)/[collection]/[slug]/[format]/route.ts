import { notFound } from "next/navigation";
import { CONTENT_KINDS, getPublishedEntries, getPublishedEntry, getPublicMarkdown, type ContentKind } from "../../../../../lib/content";

type Props = { params: Promise<{ collection: string; slug: string; format: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedEntries()
    .filter((entry) => entry.kind === "standard" || entry.kind === "bundle")
    .flatMap((entry) => ["raw.md", "download.md"].map((format) => ({ collection: CONTENT_KINDS[entry.kind].collection, slug: entry.slug, format })));
}

export async function GET(_request: Request, { params }: Props) {
  const { collection, slug, format } = await params;
  if (format !== "raw.md" && format !== "download.md") notFound();
  const kind: ContentKind | undefined = collection === "standards" ? "standard" : collection === "bundles" ? "bundle" : undefined;
  if (!kind) notFound();
  const entry = getPublishedEntry(kind, slug);
  if (!entry) notFound();
  const disposition = format === "download.md" ? `attachment; filename="${entry.slug}.md"` : "inline";
  return new Response(getPublicMarkdown(entry), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": disposition,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
