import { getPublishedEntries } from "@/lib/content";
import { absoluteUrl, siteDescription, siteTitle } from "@/lib/site";

function xml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}

export function GET() {
  const items = getPublishedEntries().toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt)).map(entry => `<item><title>${xml(entry.title)}</title><link>${xml(absoluteUrl(entry.href))}</link><guid isPermaLink="true">${xml(absoluteUrl(entry.href))}</guid><pubDate>${new Date(`${entry.publishedAt}T00:00:00Z`).toUTCString()}</pubDate><description>${xml(entry.description)}</description></item>`).join("");
  const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(siteTitle)}</title><link>${xml(absoluteUrl("/"))}</link><description>${xml(siteDescription)}</description><language>en</language>${items}</channel></rss>`;
  return new Response(feed, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
