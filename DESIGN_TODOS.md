### Design TODOs and Experiments

Scope: Convert the design prompts into actionable, testable tasks with file pointers and acceptance criteria. Keep tasks small and reviewable. Prefer feature branches for drastic variants.

Key files to touch most often:

- `styles/theme.ts` (tokens: color, typography, spacing, radii, shadows)
- `pages/_app.tsx` (MDX component mapping, fonts)
- `components/layout/MainLayout.tsx` (nav structure/underline)
- `components/ui/Prose.tsx` (article rhythm, widths)
- `components/ui/CodeBlock.tsx` (code styling, line numbers, hovers, badges)
- `components/TOC.tsx` (outline heading, collapse logic)
- `components/ui/MastheadSignature.tsx` (visual signatures)
- `components/ui/FanChart.tsx` (data‑viz tone)
- `components/ui/*Card.tsx`, `components/ui/*ListRow.tsx` (depth, borders)
- `components/PostLayout.tsx` (post structure: tags, updated date, notes)
- `pages/writing/index.tsx` (index layouts and digests)

---

### Quick picks for the first review branch (suggested)

- [ ] Accent hue/chroma nudge + darker code bg in dark mode
- [ ] Code readability: filename badges + hovered line highlight
- [ ] H2 tick marks in the margin (seeded) for a “lab notebook” feel

Rationale: low-risk, self-contained visuals with high perceived polish; all reversible.

---

### Bold typographic identity

- [ ] Swap H1–H3 to a serif/high‑contrast display (H1 only to start)

  - Files: `pages/_app.tsx`, `styles/theme.ts`
  - Steps:
    - Add a display serif via `next/font/google` (e.g., Fraunces, Spectral, Source Serif 4).
    - Set `fonts.heading` to serif only for H1 via MDX mapping (keep H2/H3 in Inter initially).
    - Ensure sentence‑case in headings.
  - Acceptance: H1 renders with chosen serif in posts and pages; fallback sane.

- [ ] Body sizing and rhythm: 1.05–1.10rem base, tighter line-height; larger H1

  - Files: `styles/theme.ts`
  - Steps: Adjust global `html, body` `fontSize` and `lineHeights.base`; keep H1 via `fontSizes.3xl`.
  - Acceptance: Overall density increases without crowding; no layout breakpoints shift adversely.

- [ ] Sentence‑case globally; increase letter‑spacing only on nav/eyebrow
  - Files: `components/layout/MainLayout.tsx`, components with eyebrow text (if any)
  - Steps: Confirm labels use sentence‑case; add `letterSpacing="wider"` to nav/eyebrow.
  - Acceptance: No caps‑lock headings; nav has subtle tracking; meets accessibility.

### Color and light

- [ ] Nudge accent hue a few degrees (blue→blue‑violet) and increase chroma slightly

  - Files: `styles/theme.ts` (`:root` and `html[data-theme="dark"]` OKLCH vars)
  - Steps: Adjust `--oklch-accent` and `--oklch-accent-hover` (e.g., H 280→286, slightly higher C).
  - Acceptance: Links/buttons feel a touch more violet; other tokens unchanged.

- [ ] Add a tinted “reading surface” background

  - Files: `styles/theme.ts` (`readingBg`), `components/ui/Prose.tsx`
  - Steps: Use `readingBg` for article body container; keep outer bg flat.
  - Acceptance: Subtle 1–2% delta from bg; borders can be removed in content areas.

- [ ] Dark mode: raise code/bg contrast and lower pure white text
  - Files: `styles/theme.ts`, `components/ui/CodeBlock.tsx`
  - Steps: Darken code block bg; reduce text luminance slightly; preserve AA contrast.
  - Acceptance: Code is legible without glare; body text less stark.

### Layout rhythm

- [ ] Title + lead paragraph as a “stack”

  - Files: `components/ui/Prose.tsx`
  - Steps: Smaller gap under `h1`; tighter `h1 + p` lead; then normal flow.
  - Acceptance: The intro grouping is visually distinct; no overlap with TOC.

- [ ] Enforce strict 8‑pt vertical grid across components

  - Files: `styles/theme.ts` (`space`), component spacing audit
  - Steps: Snap margins/padding to 8/12/16/24/32; remove off‑scale values.
  - Acceptance: Consistent vertical rhythm; no regressions in compact viewports.

- [ ] Prose width experiments: 68–70ch vs 74ch
  - Files: `styles/theme.ts` (`Container.sizes.prose`), `.prose` rule
  - Steps: Provide a quick toggle or env flag to compare widths.
  - Acceptance: Choose one after visual review; revert toggle.

### Navigation variations

- [ ] Center nav group; name left, actions right

  - Files: `components/layout/MainLayout.tsx`
  - Steps: Change `Flex` layout; nav links centered as a group; keep brand left, actions right.
  - Acceptance: Balanced header without breaking responsive behavior.

- [ ] Move motion underline above text (magazine feel)
  - Files: `components/layout/MainLayout.tsx`
  - Steps: Position motion `Box` at top edge; reduce height to 1px.
  - Acceptance: Underline animates above labels consistently.

### List‑first index experiments

- [ ] Two‑column writing index: left meta rail + titles; right compact thumbnails ≥xl

  - Files: `pages/writing/index.tsx`, `components/ui/WritingListRow.tsx`
  - Steps: CSS grid with alternating row backgrounds every 8 rows.
  - Acceptance: Clear scanability; thumbnails only at ≥xl; alt rows subtly tinted.

- [ ] “Digest” mode toggle (titles/dates only)
  - Files: `pages/writing/index.tsx`
  - Steps: Add UI toggle; render condensed list without excerpts.
  - Acceptance: Reduces cognitive load; persists per session.

### Post page structure

- [ ] Move tags to the end (postscript style)

  - Files: `components/PostLayout.tsx`
  - Steps: Reposition tag render after content.
  - Acceptance: Cleaner title area; tags visible post‑content.

- [ ] Margin notes: convert footnotes to inline popovers on hover/focus at ≥xl
  - Files: MDX mapping in `pages/_app.tsx`, helpers in `components/ui`
  - Steps: Detect footnote refs; replace with `Popover` on large screens; keep default on small.
  - Acceptance: Accessible popover (hover/focus); mobile retains inline notes.

### Motion and micro‑interactions

- [ ] Link hover: 1px underline offset shift; 120ms ease‑out

  - Files: `styles/theme.ts` (Link baseStyle)
  - Steps: Adjust `textUnderlineOffset`/transition; slightly boost luminance on hover.
  - Acceptance: Crisp, quick hover without jitter.

- [ ] “Reading mode” toggle dims chrome and TOC
  - Files: `components/layout/MainLayout.tsx`, `components/TOC.tsx`
  - Steps: Add UI toggle; apply reduced opacity to header/TOC; persist state.
  - Acceptance: Content prominence increases; still accessible.

### Visual signatures (stochastic identity)

- [ ] Use masthead types contextually (ou/perlin/gp by post type)

  - Files: `components/ui/MastheadSignature.tsx`, `components/PostLayout.tsx`, `lib/blog.ts`
  - Steps: Map frontmatter category→`kind`; pass slug as seed.
  - Acceptance: Deterministic signature per post; type varies by category.

- [ ] Add tiny seeded H2 margin tick marks (lab notebook feel)
  - Files: `components/ui/Prose.tsx` (or small helper), `components/PostLayout.tsx`
  - Steps: Insert thin marks aligned to H2s using seeded RNG by slug; visible ≥xl.
  - Acceptance: Subtle ticks align to headings; no overlap with content.

### Data‑viz tone

- [ ] Fan‑chart lines: 0.75px, softer opacity, round endcaps

  - Files: `components/ui/FanChart.tsx`
  - Steps: Reduce stroke width; `strokeLinecap="round"`; lower opacity.
  - Acceptance: “Plotter” aesthetic; retains readability.

- [ ] Inline micro‑charts near H3 on wide view
  - Files: `components/ui/Sparkline.tsx`, MDX mapping in `pages/_app.tsx`
  - Steps: Show small `Sparkline` adjacent to H3 labels at ≥xl.
  - Acceptance: Non‑intrusive indicators; hidden on narrow view.

### Code readability

- [ ] Subtle hovered line highlight; slim left rail for line numbers on >10‑line blocks

  - Files: `components/ui/CodeBlock.tsx`
  - Steps: Only show line numbers if lineCount > 10; add hover background for current line.
  - Acceptance: Highlight follows mouse/focus; no flicker; keyboard accessible.

- [ ] Filename badges with monospace caps
  - Files: `components/ui/CodeBlock.tsx`
  - Steps: Render filename badge when `data-filename` present; monospace uppercase style.
  - Acceptance: Fast scanning; no collision with language label.

### Components depth (minimal)

- [ ] Hairline borders + 10–12px radius + small shadow on interactive blocks only

  - Files: `styles/theme.ts` (Card/Button variants), `components/ui/*Card.tsx`
  - Steps: Add subtle depth; keep content sections borderless with layered bg.
  - Acceptance: Depth only on interactive surfaces; feels coherent in light/dark.

- [ ] Replace most borders with layered backgrounds; border only at container edges
  - Files: Section wrappers and cards
  - Steps: Use `readingBg`/gradient layers instead of borders; retain outer container borders.
  - Acceptance: Cleaner visuals; fewer hard lines.

### Content cues

- [ ] Add “Outline” subheading above TOC (xs); collapse H3 by default for long lists

  - Files: `components/TOC.tsx`
  - Steps: Render heading label; collapse deeper levels if item count exceeds threshold.
  - Acceptance: TOC is scannable; avoids overwhelming long posts.

- [ ] Show “Updated on …” when a post is edited (tabular numerals)
  - Files: `components/PostLayout.tsx`, `lib/blog.ts`
  - Steps: Compare `updated` vs `date` frontmatter; render label with tabular nums.
  - Acceptance: Only appears when `updated > date`.

### Brand texture (still minimalist)

- [ ] Subtle halftone/dot‑grid behind hero in light mode only
  - Files: `components/ui/Hero.tsx`, `styles/theme.ts`
  - Steps: Add background layer at 1–2% opacity in light; disable in dark.
  - Acceptance: Adds texture without noise; respects contrast.

### Accessibility and comfort

- [ ] “High legibility” toggle: boost text size, increase line‑height, disable underline animation

  - Files: `MainLayout`, global state (context or localStorage), `styles/theme.ts`
  - Steps: Provide toggle; apply overrides class to `html` or root container.
  - Acceptance: Clear difference; persists; no layout breakage.

- [ ] Validate focus rings on all interactive elements (including icon buttons and chips)
  - Files: Theme variants; `IconButton`, `Tag`, custom chip components
  - Steps: Audit with keyboard; ensure 2px outline + 3px offset across variants.
  - Acceptance: Visible focus for all states in light/dark.

### Drastic layout alternatives (in separate branches)

- [ ] “Notebook margin” layout: TOC left, content center, margin notes right; thin vertical rules

  - Files: New experimental layout wrapper; gated by route flag or branch
  - Steps: Build responsive 3‑column; move TOC left; margin notes right at ≥xl.
  - Acceptance: Feels like a research notebook; remains readable on mobile (stacked).

- [ ] “Columnar digest” home: 3 narrow columns of titles/dates; expand on hover/focus
  - Files: `pages/index.tsx`
  - Steps: CSS grid with three columns; expand item on hover/focus for detail.
  - Acceptance: Efficient browsing; accessible expand interaction.

### Editorial typography touches

- [ ] Small caps for series labels; lighter dots (·) as separators

  - Files: Where series labels are rendered; header separators in `MainLayout`
  - Steps: Use `fontVariantCaps: small-caps`; lighten separator color under link.
  - Acceptance: Subtle editorial vibe; no clash with body text.

- [ ] Drop‑cap on first paragraph (opt‑in via MDX class) for long essays
  - Files: MDX mapping and `.prose` styles
  - Steps: Support `.drop-cap` class on first paragraph with enlarged first letter.
  - Acceptance: Only applied when author opts‑in.

### Dark‑mode nuance

- [ ] Slightly warm the text color and cool the accent in dark mode
  - Files: `styles/theme.ts` (`html[data-theme="dark"]`)
  - Steps: Adjust OKLCH L/C/H for text and accent; verify contrast.
  - Acceptance: Reduced eye strain; accent remains crisp.

### Empty and edge states

- [ ] When filters match few posts, keep height stable and show inline hint
  - Files: Index pages where filtering exists
  - Steps: Maintain container height; render hint: “Showing matches; press esc to clear.”
  - Acceptance: No layout jump; discoverable reset.

---

### Implementation notes

- Use feature branches for risky experiments; keep edits small and focused.
- Favor OKLCH tokens for color changes to maintain perceptual consistency.
- Use `mdx` component overrides for typography and notes to keep posts clean.
- Maintain accessibility: color contrast, focus states, keyboard interactions.
- Add quick toggles for visual A/B comparisons and remove after selection.
