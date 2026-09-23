# Public Lab content

This directory contains only approved, published writing. Keep drafts and the paid Design Skill package in private repositories. A hidden route or `status: draft` does not protect a file in this public repository.

Store one plain Markdown file per entry in `standards/`, `bundles/`, `skills/`, or `notes/`. The first release loader accepts `.md` only; MDX support can be added when a reviewed interactive article requires it. The filename and `slug` must match. Every file needs YAML frontmatter with `kind`, `status: published`, `title`, `description`, `publishedAt`, `revisedAt`, `version`, `topics`, and at least one `sources` entry with `title` and HTTPS `url`. Quote dates as `YYYY-MM-DD` strings. `related` is an optional list of `kind:slug` references. A Bundle also needs `includedStandards`, a list of Standard slugs. Learning Notes and entries on AI, compliance, or security need a `reviewAt` date.

Allowed topic slugs are defined in `lib/content.ts`. The loader checks metadata, dates, unique slugs, references, status, and required section headings during build. Only a reviewed, approved change should add a content file. The body uses level-two headings; the title comes from frontmatter.

The dependency-free frontmatter parser accepts top-level strings, two-space-indented lists, and `sources` entries with `title` and `url`. Use `[]` for an empty optional list. It does not accept YAML aliases, folded values, or inline nonempty arrays. The first security Learning Note renders its interactive Architecture Explorer from the note route after the Markdown body; the note remains readable as Markdown without the interactive layer.

Required section headings:

| Kind | Sections |
| --- | --- |
| Standard | Default, Applicability, Rationale, Example, Exceptions, Verification |
| Standard Bundle | Scope, How to use |
| Skill Listing | Outcome, Intended users and agents, Prerequisites, Compatibility, Limitations, Example input and output |
| Learning Note | Question, Current understanding, Evidence and sources, Worked example, Open questions |

The loader adds the `sources` links and canonical page URL to the rendered Markdown. For Standards and Bundles, the page, Copy button, raw URL, and download use the same generated Markdown. Bundle exports include the current canonical Markdown of each selected Standard, its version, and its source link. Do not paste the paid workflow into a Skill Listing. Supported Markdown body syntax is headings, paragraphs, links, emphasis, blockquotes, lists, horizontal rules, and fenced code blocks.
