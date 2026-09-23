import type { ReactNode } from "react";

type Block = { type: "heading" | "paragraph" | "quote" | "list" | "code" | "rule"; text?: string; level?: number; ordered?: boolean; items?: string[]; language?: string };

function isBlockStart(line: string): boolean {
  return /^(?:#{1,6}\s|>\s|[-*]\s|\d+\.\s|```|---\s*$)/.test(line);
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index++; continue; }
    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const body: string[] = [];
      index++;
      while (index < lines.length && !lines[index].startsWith("```")) body.push(lines[index++]);
      if (index < lines.length) index++;
      blocks.push({ type: "code", text: body.join("\n"), language });
      continue;
    }
    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      blocks.push({ type: "heading", level: heading[1].length, text: heading[2] });
      index++;
      continue;
    }
    if (/^---\s*$/.test(line)) {
      blocks.push({ type: "rule" });
      index++;
      continue;
    }
    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].startsWith("> ")) quote.push(lines[index++].slice(2));
      blocks.push({ type: "quote", text: quote.join(" ") });
      continue;
    }
    const ordered = /^\d+\.\s/.test(line);
    if (/^(?:[-*]\s|\d+\.\s)/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^(?:[-*]\s|\d+\.\s)/.test(lines[index])) {
        items.push(lines[index++].replace(/^(?:[-*]\s|\d+\.\s)/, ""));
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }
    const paragraph: string[] = [line];
    index++;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) paragraph.push(lines[index++]);
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }
  return blocks;
}

function safeHref(value: string): string | undefined {
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function inline(text: string, keyPrefix: string): ReactNode[] {
  const result: ReactNode[] = [];
  const token = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let from = 0;
  let match: RegExpExecArray | null;
  while ((match = token.exec(text))) {
    if (match.index > from) result.push(text.slice(from, match.index));
    const key = `${keyPrefix}-${match.index}`;
    if (match[1] !== undefined) {
      const href = safeHref(match[2]);
      result.push(href ? <a href={href} key={key} rel={href.startsWith("https:") ? "noopener noreferrer" : undefined}>{match[1]}</a> : match[1]);
    } else if (match[3] !== undefined) {
      result.push(<code key={key}>{match[3]}</code>);
    } else if (match[4] !== undefined) {
      result.push(<strong key={key}>{match[4]}</strong>);
    } else if (match[5] !== undefined) {
      result.push(<em key={key}>{match[5]}</em>);
    }
    from = token.lastIndex;
  }
  if (from < text.length) result.push(text.slice(from));
  return result;
}

export function EditorialMarkdown({ source }: { source: string }) {
  return <div className="lab-prose">{parseBlocks(source).map((block, index) => {
    const key = `${block.type}-${index}`;
    if (block.type === "heading") {
      const children = inline(block.text ?? "", key);
      if (block.level === 1) return <h1 key={key}>{children}</h1>;
      if (block.level === 2) return <h2 key={key}>{children}</h2>;
      if (block.level === 3) return <h3 key={key}>{children}</h3>;
      return <h4 key={key}>{children}</h4>;
    }
    if (block.type === "paragraph") return <p key={key}>{inline(block.text ?? "", key)}</p>;
    if (block.type === "quote") return <blockquote key={key}>{inline(block.text ?? "", key)}</blockquote>;
    if (block.type === "rule") return <hr key={key} />;
    if (block.type === "code") return <pre key={key}><code data-language={block.language}>{block.text}</code></pre>;
    const items = block.items?.map((item, itemIndex) => <li key={`${key}-${itemIndex}`}>{inline(item, `${key}-${itemIndex}`)}</li>);
    return block.ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>;
  })}</div>;
}
