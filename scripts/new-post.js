#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

function toSlug(str) {
  return String(str || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function main() {
  const [, , titleArg] = process.argv;
  if (!titleArg) {
    console.error('Usage: node scripts/new-post.js "Post title"');
    process.exit(1);
  }
  const slug = toSlug(titleArg);
  const blogDir = path.join(process.cwd(), "pages", "blog");
  ensureDir(blogDir);
  const file = path.join(blogDir, `${slug}.mdx`);
  if (fs.existsSync(file)) {
    console.error(`File already exists: ${file}`);
    process.exit(1);
  }

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const date = `${yyyy}-${mm}-${dd}`;

  const template = `---
title: "${titleArg}"
date: "${date}"
tags: ["notes"]
summary: "One-line summary."
slug: "${slug}"
---

import PostLayout from "../../components/PostLayout";
import { Callout, Figure, Prose } from "../../components/ui";

export default ({ children, ...props }) => (
  <PostLayout frontmatter={props.frontmatter}>{children}</PostLayout>
);

# ${titleArg}

<Prose>
Intro paragraph.

<Callout type="info" title="Note">Use callouts to highlight key points.</Callout>

<Figure src="/images/example.webp" alt="Diagram" caption="High-level flow." />

\`\`\`ts
export const x = 42;
\`\`\`

More content...
</Prose>
`;

  fs.writeFileSync(file, template, "utf8");
  console.log(`Created: ${file}`);
}

main();
