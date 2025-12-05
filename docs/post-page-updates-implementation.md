### Post page UI updates – Developer implementation guide

This guide covers the remaining post-page polish items. It lists exact files to touch, data dependencies, step‑by‑step edits, acceptance criteria, a11y notes, and test steps. Excludes the assumptions block.

Scope items

- Reading time next to date
- Inline tags under the title (keep tags postscript at end)
- Code blocks: bottom‑left language label + “Copy” button (remove top header)
- Inline figure with caption support (optional numbering)
- “Related Posts” as cards with thumbnail/chips
- TOC title style “TABLE OF CONTENTS”

---

### 1) Reading time next to date

Files

- `components/PostLayout.tsx`
- (Content) frontmatter in `.mdx` (e.g., `pages/blog/_template.mdx`)

Data contract

- Frontmatter: `readingTime?: number` (minutes). If omitted, the label is hidden.

Steps

1. In `PostLayout.tsx`, extend frontmatter type with `readingTime?: number`.
2. In the date `HStack`, render a middle dot separator + `{readingTime} min read` when `readingTime >= 1`.
3. Apply `sx={{ fontVariantNumeric: "tabular-nums" }}` to the text.

Acceptance

- Date and reading time render on one line, with tabular numerals and a middle dot separator.

Notes

- Optional: add a tiny helper that coerces `<1` to `1` minute for readability.

---

### 2) Inline tags under the title (keep postscript at end)

Files

- `components/PostLayout.tsx`

Steps

1. Directly under the `<Heading as="h1">`, add an `HStack` that maps `frontmatter.tags` to `Tag size="sm"`.
2. Color: default/subtle; spacing `2–3`.
3. Keep the existing “postscript” tags at the end of the article (do not remove).

Acceptance

- Tags appear beneath the title on post pages; postscript tags remain unchanged.

---

### 3) Code blocks – bottom‑left language + “Copy” button

Files

- `components/ui/CodeBlock.tsx`

Current

- Header bar renders language/filename; line‑rail for >10 lines; hover line highlight.

Goal

- Remove top header bar.
- Add a language pill at bottom‑left inside the block; add a “Copy” button at bottom‑right.

Steps

1. Wrap the outer code container `Box` with `position="relative"`.
2. Delete the existing top `HStack` header.
3. Add a bottom overlay:
   - Left: a `Text`/`Box` pill showing `language` (uppercase, `fontSize="xs"`, muted background), `position="absolute"`, `left=2`, `bottom=2`.
   - Right: an `IconButton` (clipboard icon) with `aria-label="Copy code"`, `position="absolute"`, `right=2`, `bottom=2`.
4. Clipboard logic: use the already computed `codeString`; call `navigator.clipboard.writeText(codeString)` and show a `Tooltip`/`title` or brief visual state.
5. Keep line‑rail logic (>10 lines) and hover highlighting intact.

Acceptance

- Copy button copies the full raw code; language pill sits bottom‑left; header bar removed; a11y labels present; keyboard focusable.

---

### 4) Inline figure with caption (optional numbering)

Files

- `components/ui/Figure.tsx`
- (MDX usage) `pages/blog/_template.mdx`

Steps

1. Existing `Figure` already supports `caption`. Keep it for inline usage.
2. Optional: add `numbered?: boolean` and simple per‑page counter (React context or instance ref) to prefix captions with “Figure N: …”. Default off.
3. Document usage in the template (e.g., `<Figure src="/images/.." alt="…" caption="Figure 1: …" />`).

Acceptance

- Figure renders with caption beneath the image; optional numbering works when enabled.

---

### 5) Related posts as cards with thumbnail/chips

Files

- `scripts/generate-blog-data.js` (augment payload)
- `lib/useBlogData.ts` (types only)
- `components/PostLayout.tsx` (render)
- `components/ui/BlogCard.tsx` (already supports title/excerpt/date/tags/thumbnail)

Data contract

- In `public/blog-data.json`, for each slug, ensure `relatedPosts` entries provide:
  - `slug`, `title`, `date`, `tags`, `summary` (or `dek`), `readingTime`, `thumbnail` (optional)

Steps

1. Update `scripts/generate-blog-data.js` to include `summary`/`dek`, `tags`, `readingTime`, and `thumbnail` for related candidates.
2. Adjust `useBlogData.ts` typings to match the enriched shape (no runtime change).
3. In `PostLayout.tsx`, replace the simple list with a `SimpleGrid` of three `BlogCard`s.
4. Card props: pass `href`, `title`, `excerpt=summary`, `date`, `tags`, `readingTime`, `thumbnail`.

Acceptance

- Three related cards render with titles and chips; thumbnails appear when available; layout matches the site’s card grid rhythm.

---

### 6) TOC title style “TABLE OF CONTENTS”

Files

- `components/TOC.tsx`

Steps

1. Change the label from “Outline” to “TABLE OF CONTENTS”.
2. Style: uppercase, `fontSize="xs"`, `letterSpacing="wider"`, `color="muted"`, `mb={2}`.
3. Keep the existing H3 collapse rule for long lists.

Acceptance

- TOC renders with the new title styling; link list behavior unchanged.

---

### Accessibility and UX checklist

- Ensure copy buttons have `aria-label` and focus styles.
- Maintain color contrast on pills/buttons in light/dark.
- Respect reduced motion (no new animations added here).
- Keyboard: Tab to copy button; Enter/Space triggers copy.

---

### Testing plan

Manual

- Verify a post with `readingTime` shows “· N min read”; one without hides it.
- Verify tags show under the title and at postscript.
- Verify Copy in all code blocks (short/long, with/without language). Paste result and compare.
- Verify figures show captions; optional numbering when enabled.
- Verify Related cards show correct data for at least two posts.
- Verify TOC title reads “TABLE OF CONTENTS”.

Automated (lightweight suggestions)

- Add a unit test for the `CodeBlock` copy util (pure function extracting `codeString`).
- Add a type test to ensure `relatedPosts` payload includes new fields.

---

### Rollback notes

- All changes are view‑layer only, except the enrichment in `scripts/generate-blog-data.js`.
- If needed, revert the script and the `PostLayout.tsx` related section to the previous simple links.
