import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const sourcePath = fileURLToPath(new URL("./content.ts", import.meta.url));
const source = fs.readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;

function loadContentModule() {
  const loadedModule = { exports: {} };
  const localRequire = (id) => id === "./site" ? { siteUrl: "https://lab.jaylawrence.me" } : require(id);
  new Function("require", "module", "exports", compiled)(localRequire, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}

function standard({ slug = "design-foundations", status = "published", related = "[]", publishedAt = "2026-09-23" } = {}) {
  return `---
kind: standard
slug: ${slug}
status: ${status}
title: "Design foundations"
description: "A reviewed description."
publishedAt: "${publishedAt}"
revisedAt: "2026-09-23"
version: "1.0.0"
topics:
  - ui-design
related: ${related}
sources:
  - title: "Reference source"
    url: "https://example.com/reference"
---
## Default
Use the reviewed default.

## Applicability
Use it in the reviewed scope.

## Rationale
The rationale.

## Example
An example.

## Exceptions
The exceptions.

## Verification
The checks.
`;
}

function bundle({ slug = "frontend-product-craft", standardSlug = "design-foundations" } = {}) {
  return `---
kind: bundle
slug: ${slug}
status: published
title: "Frontend product craft"
description: "A reviewed bundle description."
publishedAt: "2026-09-23"
revisedAt: "2026-09-23"
version: "1.0.0"
topics:
  - ui-design
includedStandards:
  - ${standardSlug}
sources:
  - title: "Reference source"
    url: "https://example.com/reference"
---
## Scope
A bounded product context.

## How to use
Use the included Standards together.
`;
}

function withContent(files, check) {
  const previous = process.cwd();
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "lab-content-test-"));
  try {
    for (const [name, text] of Object.entries(files)) {
      const file = path.join(directory, "content", name);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, text);
    }
    process.chdir(directory);
    check(loadContentModule());
  } finally {
    process.chdir(previous);
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

test("published Standards and Bundles share canonical source text and search data", () => {
  withContent({
    "standards/design-foundations.md": standard(),
    "bundles/frontend-product-craft.md": bundle(),
  }, (content) => {
    assert.equal(content.getPublishedEntries().length, 2);
    assert.equal(content.searchEntries("reviewed default").length, 1);
    assert.equal(content.searchEntries("reviewed default", "bundle").length, 0);
    assert.deepEqual(content.getTopics(), [{ slug: "ui-design", label: "UI design", count: 2 }]);
    const standardEntry = content.getPublishedEntry("standard", "design-foundations");
    const bundleEntry = content.getPublishedEntry("bundle", "frontend-product-craft");
    const canonicalStandard = content.getPublicMarkdown(standardEntry).trim();
    assert.match(canonicalStandard, /## Verification/);
    assert.match(content.getPublicMarkdown(bundleEntry), /\[Design foundations \(v1\.0\.0\)\]\(https:\/\/lab\.jaylawrence\.me\/standards\/design-foundations\)/);
    assert.ok(content.getPublicMarkdown(bundleEntry).includes(canonicalStandard));
    assert.equal(content.getPublishedEntry("standard", "missing"), undefined);
  });
});

test("private draft status is rejected instead of hidden", () => {
  withContent({ "standards/design-foundations.md": standard({ status: "draft" }) }, (content) => {
    assert.throws(() => content.getPublishedEntries(), /only approved published content belongs in this public repository/);
  });
  withContent({ "standards/private-draft.mdx": "Private content must not appear here." }, (content) => {
    assert.throws(() => content.getPublishedEntries(), /only approved plain .md content files/);
  });
});

test("invalid dates and broken references fail validation", () => {
  withContent({ "standards/design-foundations.md": standard({ publishedAt: "2026-02-30" }) }, (content) => {
    assert.throws(() => content.getPublishedEntries(), /real YYYY-MM-DD date/);
  });
  withContent({ "standards/design-foundations.md": standard({ related: "\n  - standard:missing" }) }, (content) => {
    assert.throws(() => content.getPublishedEntries(), /unknown related entry/);
  });
  withContent({
    "standards/design-foundations.md": standard(),
    "bundles/frontend-product-craft.md": bundle({ standardSlug: "missing" }),
  }, (content) => {
    assert.throws(() => content.getPublishedEntries(), /unknown included Standard/);
  });
});

test("slug and required body sections are validated", () => {
  withContent({ "standards/wrong-name.md": standard() }, (content) => {
    assert.throws(() => content.getPublishedEntries(), /slug must match/);
  });
  withContent({ "standards/design-foundations.md": standard().replace("## Verification", "## Unchecked") }, (content) => {
    assert.throws(() => content.getPublishedEntries(), /missing required section: ## Verification/);
  });
});
