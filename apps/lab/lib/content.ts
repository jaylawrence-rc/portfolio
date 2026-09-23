import fs from "node:fs";
import path from "node:path";
import { siteUrl } from "./site";

export const LAB_URL = siteUrl;

export const CONTENT_KINDS = {
  standard: { collection: "standards", label: "Standard" },
  bundle: { collection: "bundles", label: "Standard Bundle" },
  skill: { collection: "skills", label: "Skill Listing" },
  note: { collection: "notes", label: "Learning Note" },
} as const;

export type ContentKind = keyof typeof CONTENT_KINDS;

export const TOPICS = {
  "system-design": "System design",
  backend: "Backend",
  ai: "AI",
  "ai-agents": "AI agents",
  compliance: "Compliance",
  security: "Security",
  "frontend-engineering": "Frontend engineering",
  "ui-design": "UI design",
  animation: "Animation",
  ux: "UX",
} as const;

export type TopicSlug = keyof typeof TOPICS;

export type Source = { title: string; url: string };

export type EditorialEntry = {
  kind: ContentKind;
  slug: string;
  title: string;
  description: string;
  status: "published";
  publishedAt: string;
  revisedAt: string;
  reviewAt?: string;
  version: string;
  topics: TopicSlug[];
  related: string[];
  sources: Source[];
  includedStandards: string[];
  body: string;
  href: string;
};

const REQUIRED_SECTIONS: Record<ContentKind, string[]> = {
  standard: ["Default", "Applicability", "Rationale", "Example", "Exceptions", "Verification"],
  bundle: ["Scope", "How to use"],
  skill: ["Outcome", "Intended users and agents", "Prerequisites", "Compatibility", "Limitations", "Example input and output"],
  note: ["Question", "Current understanding", "Evidence and sources", "Worked example", "Open questions"],
};

const CONTENT_ROOT = path.join(process.cwd(), "content");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/;
const FRONTMATTER_KEYS = new Set([
  "kind", "slug", "status", "title", "description", "publishedAt", "revisedAt", "reviewAt",
  "version", "topics", "related", "sources", "includedStandards",
]);

function fail(file: string, message: string): never {
  throw new Error(`Invalid Lab content in ${file}: ${message}`);
}

function requiredString(value: unknown, key: string, file: string): string {
  if (typeof value !== "string" || !value.trim() || /[\r\n]/.test(value)) fail(file, `${key} must be a nonempty single-line string`);
  return value.trim();
}

function isoDate(value: unknown, key: string, file: string): string {
  const date = requiredString(value, key, file);
  const parsed = new Date(`${date}T00:00:00.000Z`);
  if (!DATE_PATTERN.test(date) || Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== date) {
    fail(file, `${key} must be a real YYYY-MM-DD date`);
  }
  return date;
}

function stringArray(value: unknown, key: string, file: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || !item.trim())) {
    fail(file, `${key} must be an array of nonempty strings`);
  }
  return value.map((item: string) => item.trim());
}

function sourceArray(value: unknown, file: string): Source[] {
  if (!Array.isArray(value) || value.length === 0) fail(file, "sources must contain at least one source");
  return value.map((source, index) => {
    if (typeof source !== "object" || source === null || Array.isArray(source)) {
      fail(file, `sources[${index}] must contain title and url`);
    }
    const record = source as Record<string, unknown>;
    if (Object.keys(record).some((key) => key !== "title" && key !== "url")) {
      fail(file, `sources[${index}] has an unknown property`);
    }
    const title = requiredString(record.title, `sources[${index}].title`, file);
    const url = requiredString(record.url, `sources[${index}].url`, file);
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:") fail(file, `sources[${index}].url must use HTTPS`);
      return { title, url: parsed.toString() };
    } catch {
      fail(file, `sources[${index}].url must be an absolute HTTPS URL`);
    }
  });
}

function markdownLink(label: string, url: string): string {
  return `[${label.replaceAll("\\", "\\\\").replaceAll("]", "\\]")}](${url.replaceAll("(", "%28").replaceAll(")", "%29")})`;
}

function hasSection(body: string, section: string): boolean {
  return body.split("\n").some((line) => line.trim().toLowerCase() === `## ${section.toLowerCase()}`);
}

function scalar(value: string, file: string, line: number): string {
  const trimmed = value.trim();
  if (!trimmed) fail(file, `line ${line}: empty scalar`);
  if (trimmed.startsWith('"')) {
    try {
      const parsed: unknown = JSON.parse(trimmed);
      if (typeof parsed === "string") return parsed;
    } catch { /* Give the line-specific error below. */ }
    fail(file, `line ${line}: malformed double-quoted string`);
  }
  if (trimmed.startsWith("'")) {
    if (!trimmed.endsWith("'") || trimmed.length < 2) fail(file, `line ${line}: malformed single-quoted string`);
    return trimmed.slice(1, -1).replaceAll("''", "'");
  }
  if (trimmed.includes(" #")) fail(file, `line ${line}: quote values containing #`);
  return trimmed;
}

/** A deliberately small YAML subset keeps public Markdown self-contained without a runtime parser dependency. */
function parseFrontmatter(raw: string, file: string): { data: Record<string, unknown>; content: string } {
  const normalized = raw.replaceAll("\r\n", "\n");
  if (!normalized.startsWith("---\n")) fail(file, "a YAML frontmatter block is required");
  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) fail(file, "frontmatter must close with --- on its own line");
  const lines = normalized.slice(4, end).split("\n");
  const data: Record<string, unknown> = {};
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    const lineNumber = index + 2;
    if (!line.trim()) { index++; continue; }
    if (line.includes("\t")) fail(file, `line ${lineNumber}: tabs are not allowed in frontmatter`);
    const match = /^([A-Za-z][A-Za-z0-9]*):(?:\s*(.*))?$/.exec(line);
    if (!match) fail(file, `line ${lineNumber}: expected a top-level metadata key`);
    const [, key, rest] = match;
    if (!FRONTMATTER_KEYS.has(key)) fail(file, `line ${lineNumber}: unknown metadata key ${key}`);
    if (key in data) fail(file, `line ${lineNumber}: duplicate metadata key ${key}`);
    if (rest && rest.trim()) {
      data[key] = rest.trim() === "[]" ? [] : scalar(rest, file, lineNumber);
      index++;
      continue;
    }
    const values: unknown[] = [];
    index++;
    while (index < lines.length && lines[index].startsWith("  ")) {
      const itemLine = lines[index];
      const itemNumber = index + 2;
      const objectMatch = /^  - ([A-Za-z][A-Za-z0-9]*):\s*(.+)$/.exec(itemLine);
      const itemMatch = /^  - (.+)$/.exec(itemLine);
      if (key === "sources" && objectMatch) {
        const object: Record<string, string> = { [objectMatch[1]]: scalar(objectMatch[2], file, itemNumber) };
        index++;
        while (index < lines.length && lines[index].startsWith("    ")) {
          const property = /^    ([A-Za-z][A-Za-z0-9]*):\s*(.+)$/.exec(lines[index]);
          if (!property) fail(file, `line ${index + 2}: expected an object property`);
          if (property[1] in object) fail(file, `line ${index + 2}: duplicate object property ${property[1]}`);
          object[property[1]] = scalar(property[2], file, index + 2);
          index++;
        }
        values.push(object);
        continue;
      }
      if (!itemMatch) fail(file, `line ${itemNumber}: expected a list item`);
      values.push(scalar(itemMatch[1], file, itemNumber));
      index++;
    }
    data[key] = values;
  }
  return { data, content: normalized.slice(end + 5) };
}

function loadFile(kind: ContentKind, file: string): EditorialEntry {
  const fullPath = path.join(CONTENT_ROOT, CONTENT_KINDS[kind].collection, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data: meta, content } = parseFrontmatter(raw, fullPath);
  const slug = requiredString(meta.slug, "slug", fullPath);
  if (!SLUG_PATTERN.test(slug) || slug !== file.slice(0, -3)) fail(fullPath, "slug must match the lowercase kebab-case filename");
  if (meta.kind !== kind) fail(fullPath, `kind must be ${kind}`);
  if (meta.status !== "published") fail(fullPath, "only approved published content belongs in this public repository");

  const title = requiredString(meta.title, "title", fullPath);
  const description = requiredString(meta.description, "description", fullPath);
  const publishedAt = isoDate(meta.publishedAt, "publishedAt", fullPath);
  const revisedAt = isoDate(meta.revisedAt, "revisedAt", fullPath);
  if (publishedAt > new Date().toISOString().slice(0, 10)) fail(fullPath, "publishedAt cannot be in the future");
  if (revisedAt < publishedAt) fail(fullPath, "revisedAt cannot precede publishedAt");
  const reviewAt = meta.reviewAt === undefined ? undefined : isoDate(meta.reviewAt, "reviewAt", fullPath);
  const version = requiredString(meta.version, "version", fullPath);
  if (!VERSION_PATTERN.test(version)) fail(fullPath, "version must be a semantic version such as 1.0.0");
  if (reviewAt && reviewAt < revisedAt) fail(fullPath, "reviewAt cannot precede revisedAt");
  const topics = stringArray(meta.topics, "topics", fullPath);
  if (topics.length === 0 || new Set(topics).size !== topics.length) fail(fullPath, "topics must be a nonempty list without duplicates");
  for (const topic of topics) if (!(topic in TOPICS)) fail(fullPath, `unknown topic: ${topic}`);
  if ((kind === "note" || topics.some((topic) => ["ai", "ai-agents", "compliance", "security"].includes(topic))) && !reviewAt) {
    fail(fullPath, "a reviewAt date is required for Learning Notes and evolving AI, compliance, or security claims");
  }

  const related = meta.related === undefined ? [] : stringArray(meta.related, "related", fullPath);
  if (new Set(related).size !== related.length) fail(fullPath, "related references must be unique");
  const includedStandards = meta.includedStandards === undefined ? [] : stringArray(meta.includedStandards, "includedStandards", fullPath);
  if (kind === "bundle" && includedStandards.length === 0) fail(fullPath, "a Bundle must include at least one Standard");
  if (kind !== "bundle" && includedStandards.length > 0) fail(fullPath, "only Bundles may include Standards");
  if (new Set(includedStandards).size !== includedStandards.length) fail(fullPath, "includedStandards must be unique");
  const sources = sourceArray(meta.sources, fullPath);
  const body = content.trim();
  if (!body) fail(fullPath, "body must not be empty");
  if (/^#\s+/m.test(body)) fail(fullPath, "use level-two headings; the page supplies the title");
  for (const section of REQUIRED_SECTIONS[kind]) {
    if (!hasSection(body, section)) fail(fullPath, `missing required section: ## ${section}`);
  }

  return {
    kind,
    slug,
    title,
    description,
    status: "published",
    publishedAt,
    revisedAt,
    reviewAt,
    version,
    topics: topics as TopicSlug[],
    related,
    sources,
    includedStandards,
    body,
    href: `/${CONTENT_KINDS[kind].collection}/${slug}`,
  };
}

function readAll(): EditorialEntry[] {
  const entries: EditorialEntry[] = [];
  for (const kind of Object.keys(CONTENT_KINDS) as ContentKind[]) {
    const directory = path.join(CONTENT_ROOT, CONTENT_KINDS[kind].collection);
    if (!fs.existsSync(directory)) continue;
    for (const file of fs.readdirSync(directory).sort()) {
      const fullPath = path.join(directory, file);
      if (!file.endsWith(".md") || !fs.lstatSync(fullPath).isFile()) {
        fail(fullPath, "only approved plain .md content files may appear in a public collection");
      }
      entries.push(loadFile(kind, file));
    }
  }

  const bySlug = new Map<string, EditorialEntry>();
  const byRef = new Map(entries.map((entry) => [`${entry.kind}:${entry.slug}`, entry]));
  for (const entry of entries) {
    if (bySlug.has(entry.slug)) fail(entry.href, `duplicate slug also used by ${bySlug.get(entry.slug)?.href}`);
    bySlug.set(entry.slug, entry);
  }
  for (const entry of entries) {
    for (const ref of entry.related) {
      if (!byRef.has(ref)) fail(entry.href, `unknown related entry: ${ref}`);
      if (ref === `${entry.kind}:${entry.slug}`) fail(entry.href, "entry cannot relate to itself");
    }
    for (const slug of entry.includedStandards) {
      if (!byRef.has(`standard:${slug}`)) fail(entry.href, `unknown included Standard: ${slug}`);
    }
  }
  return entries.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));
}

export function getPublishedEntries(): EditorialEntry[] {
  // Read on each request so editing a source file in local development does not require a server restart.
  return readAll();
}

export function getPublishedEntry(kind: ContentKind, slug: string): EditorialEntry | undefined {
  return getPublishedEntries().find((entry) => entry.kind === kind && entry.slug === slug);
}

export function getTopics(): { slug: TopicSlug; label: string; count: number }[] {
  const entries = getPublishedEntries();
  return (Object.entries(TOPICS) as [TopicSlug, string][])
    .map(([slug, label]) => ({ slug, label, count: entries.filter((entry) => entry.topics.includes(slug)).length }))
    .filter((topic) => topic.count > 0);
}

export function getEditorialRoutes(): { href: string; revisedAt: string }[] {
  return getPublishedEntries().map(({ href, revisedAt }) => ({ href, revisedAt }));
}

export function getRelatedEntries(entry: EditorialEntry): EditorialEntry[] {
  const entries = getPublishedEntries();
  return entry.related.map((ref) => entries.find((candidate) => `${candidate.kind}:${candidate.slug}` === ref)!);
}

export function getEntryMarkdown(entry: EditorialEntry): string {
  const header = [
    `# ${entry.title}`,
    "",
    `> ${CONTENT_KINDS[entry.kind].label} · Version ${entry.version} · Published ${entry.publishedAt} · Revised ${entry.revisedAt}${entry.reviewAt ? ` · Review by ${entry.reviewAt}` : ""}`,
    "",
  ];
  return [
    ...header,
    entry.body,
    "",
    "## Sources",
    "",
    ...entry.sources.map((source) => `- ${markdownLink(source.title, source.url)}`),
    "",
    "---",
    "",
    markdownLink("Canonical page", `${LAB_URL}${entry.href}`),
    "",
  ].join("\n");
}

export function getBundleMarkdown(bundle: EditorialEntry): string {
  if (bundle.kind !== "bundle") throw new Error("getBundleMarkdown requires a Standard Bundle");
  const entries = getPublishedEntries();
  const included = bundle.includedStandards.map((slug) => entries.find((entry) => entry.kind === "standard" && entry.slug === slug)!);
  const contents = included.map((standard) => getEntryMarkdown(standard).trim()).join("\n\n---\n\n");
  return `${getEntryMarkdown(bundle).trim()}\n\n## Included Standard sources\n\n${included.map((standard) => `- ${markdownLink(`${standard.title} (v${standard.version})`, `${LAB_URL}${standard.href}`)}`).join("\n")}\n\n---\n\n${contents}\n`;
}

export function getPublicMarkdown(entry: EditorialEntry): string {
  return entry.kind === "bundle" ? getBundleMarkdown(entry) : getEntryMarkdown(entry);
}

export function searchEntries(query: string, kind?: ContentKind, topic?: TopicSlug): EditorialEntry[] {
  const normalized = query.trim().toLocaleLowerCase();
  return getPublishedEntries().filter((entry) => {
    if (kind && entry.kind !== kind) return false;
    if (topic && !entry.topics.includes(topic)) return false;
    if (!normalized) return true;
    return [entry.title, entry.description, entry.body, ...entry.topics.map((slug) => TOPICS[slug])]
      .join(" ")
      .toLocaleLowerCase()
      .includes(normalized);
  });
}
