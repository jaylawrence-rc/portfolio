import type { MetadataRoute } from "next";
import { getEditorialRoutes, getPublishedEntries, getTopics } from "@/lib/content";
import { showcaseRoutePaths } from "@/lib/showcase-routes";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getPublishedEntries();
  const paths = new Set<string>(["/", ...showcaseRoutePaths]);
  if (entries.length) paths.add("/library");
  const archive = { standard: "/standards", bundle: "/bundles", skill: "/skills", note: "/notes" } as const;
  for (const entry of entries) paths.add(archive[entry.kind]);
  for (const topic of getTopics()) paths.add(`/topics/${topic.slug}`);
  const editorial = getEditorialRoutes();
  for (const entry of editorial) paths.add(entry.href);
  const dates = new Map(editorial.map(entry => [entry.href, entry.revisedAt]));
  return [...paths].map(path => ({ url: absoluteUrl(path), ...(dates.has(path) ? { lastModified: dates.get(path) } : {}) }));
}
