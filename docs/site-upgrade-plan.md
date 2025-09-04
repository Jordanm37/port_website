## Site upgrade: implemented changes and open tasks

This document summarizes the completed visual/UX upgrades, with a precise breakdown by file, and a ranked backlog of open tasks with detailed acceptance criteria.

### Status overview

- **Foundation**: Typography hierarchy, measure, link/focus states, motion tokens, and OKLCH color variables: done.
- **Navigation/hero**: Real CTAs wired; header polish; hero fixes: done.
- **Reading experience**: Prose measure and spacing; code theme color‑mode aware; reading progress deconflicted: done.
- **Posts**: Canonical domain and per‑post OG images: done.
- **Cards/TOC/Chips**: Card hover refined; sticky TOC with active highlight; chips wrap: done.
- **Images/canvas**: `MdxImage` aspect ratio option; canvas density tuned on small screens: done.
- **Résumé**: Unified naming; duplicate PDF removed: done (HTML version pending).

---

## Implemented changes (by area and file)

### Global design system

- `styles/theme.ts`

  - **Typography**: Fluid heading scale via clamp, body size set to 1.15rem; line heights increased to 1.65–1.7.
  - **Link states**: Underline thickness/offset and focus ring upgraded (WCAG 2.2 compliant, 2px outline, 3px offset).
  - **Motion tokens**: Introduced `--t-fast`, `--t-med`, `--easing`; applied to Button/Link transitions.
  - **OKLCH variables**: Added `--oklch-*` (bg/surface/text/muted/accent/accent-hover/border) and mapped Chakra semantic tokens to these variables with safe fallbacks.
  - **Button focus**: Added visible focus styles across Button/IconButton.

- `components/ui/Prose.tsx`

  - **Measure and rhythm**: Paragraph line-height set to 1.7; added stronger `h2`/`h3` spacing for hierarchy; `.prose` remains capped at 72ch.

- `styles/prism.css`
  - **Code theme**: Color‑mode aware backgrounds and foregrounds for code blocks; keeps legibility in light/dark.

### Navigation and header/footer

- `components/layout/MainLayout.tsx`

  - **Sticky header**: Height stabilized to prevent layout shifts; glass chrome retained.
  - **Footer**: Divider hidden on mobile; CV link removed; “Résumé” label normalized.

- `components/ui/NavLink.tsx`
  - **Simplified feedback**: Removed wobble transform and per‑link underline bar to reduce noise; rely on header indicator and color.

### Home hero and CTAs

- `pages/index.tsx`

  - **CTAs wired**: Primary CTA → `bookingUrl`; secondary → `/projects`.

- `lib/site.ts`

  - **Config**: Added `siteUrl` (for canonical/OG) and `bookingUrl` with env overrides (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BOOKING_URL`).

- `components/ui/Hero.tsx`
  - **Dark gradient token fix**: Replaced invalid `neutral.850` with valid ramp; chips now wrap correctly on small screens.

### Blog and posts

- `components/PostLayout.tsx`

  - **Canonical URL**: Switched to `siteUrl` config.
  - **Per‑post OG**: Supports `frontmatter.ogImage|image`, `ogImageAlt`, `ogImageWidth`, `ogImageHeight`.
  - **Reading measure**: Post body wrapped in `Prose` for 72ch.

- `components/ui/ReadingProgress.tsx`

  - **Layering**: Positioned below sticky header and lowered z‑index to avoid overlay conflicts.

- `components/TOC.tsx`
  - **Sticky & active**: TOC is sticky and highlights the active section based on IntersectionObserver.

### Cards, lists, chips

- `components/ui/Card.tsx`

  - **Hover refinement**: Reduced translate/scale for calmer interaction.

- `pages/blog/index.tsx`
  - **Tag cloud**: Chips wrap correctly on small screens.

### Media and visuals

- `components/ui/MdxImage.tsx`

  - **Aspect ratio**: New `aspectRatio` prop; improves stability of card grids and diagrams when explicit `width/height` aren’t provided.

- `components/ui/CanvasBackground.tsx`

  - **Perf**: Lower particle density on very small viewports for power efficiency.

- `public/`
  - **Cleanup**: Removed duplicate résumé PDF; standardized to a single file and unified naming to “Résumé”.

---

## Open tasks (ranked backlog with acceptance criteria)

### 1) Projects surface and proof links

- **Create Projects grid page (`/pages/projects.tsx`)**

  - 2–3 columns ≥1024px; 1 column <640px; max grid width 1100–1200px.
  - Each card: title, one‑line outcome, small stack list, one metric chip, links (Case study / Demo / Code).
  - Uses existing `Card` with hairline border + subtle shadow + 12–16px padding (mobile), 20–24px (desktop).
  - Acceptance: Lighthouse passes; grid wraps cleanly; tab order follows reading order; hover/focus states visible.

- **Project detail pages (e.g., `/pages/projects/<slug>.tsx`)**

  - Structure: intro (problem, baseline), method (architecture diagram optional), metrics (before/after, eval notes), links.
  - Include OG meta via `frontmatter` for share polish.
  - Acceptance: Each hero proof chip and project card links to a detail or anchored section.

- **Link hero proof chips to case study anchors**

  - Chips in `Hero` map to `#metrics`/`#method` anchors on relevant project detail pages.

- **Navigation**: Add “Projects” to top nav.

### 2) Résumé in HTML (keep PDF as secondary)

- **Build `/pages/resume.tsx`**

  - Sticky in‑page nav: Experience, Research, Skills, Education.
  - Strong scan lines: role → company → timeframe chips; bullets limited to action + result.
  - Acceptance: Fully keyboard navigable; print‑optimized styles; "+ Download PDF" button retained.

- **Print CSS**
  - Flatten colors; remove shadows; page breaks between sections; keep anchors visible as text if relevant.

### 3) Blog upgrades

- **Index to card grid**

  - 2–3 column grid with small thumbnails (16:9); tighter title→meta spacing; visible tag pills.
  - Acceptance: No layout shift on image load; cards align heights via fixed ratio.

- **Search**

  - Client‑side fuzzy search across title/summary/tags (e.g., fuse.js) with debounce and keyboard navigation.
  - Acceptance: 50ms p95 on query; no blocking main thread.

- **Related posts rail**

  - Sidebar or bottom “Related” using tags overlap (already partially supported); ensure visible card links.

- **Code rendering (Shiki)**

  - Replace Prism CSS with Shiki‑rendered HTML for both light/dark; line numbers and copy button retained.
  - Token spec: `--code-bg`, `--code-border`, radius 10px, padding 16px; `overflow:auto`, `tab-size:2`.

- **MDX callouts/admonitions**
  - Info/Warning/Success callouts with icons; consistent spacing and contrast.

### 4) Talks with receipts

- **Enrich Talks**
  - Card layout per talk: title, year chip, venue chip, small abstract; links to slides/video.
  - Acceptance: Grid is consistent in height (description clamp), assets link out.

### 5) About with proof

- **Expand content**
  - Add headshot (1:1), three‑bullet micro‑bio (focus, expertise, reputation), and links to Scholar/GitHub.
  - Acceptance: Stays within 65–72ch; typography contrast preserved; image lazy loads.

### 6) Footer utilities

- **Add RSS and sitemap**

  - Link to `/rss.xml`, `/sitemap.xml` in footer; ensure robots/SEO baseline.

- **Add social links**
  - GitHub, Google Scholar, LinkedIn, X with accessible labels and focus states.

### 7) Visual/motion polish (sitewide)

- **Cards and chips**

  - Maintain hairline borders (OKLCH border var) and subtle shadow tokens (`--elev-1` → `--elev-2` on hover).
  - Chip spec: pill radius, 8px horizontal padding, tinted background, visible focus ring.

- **Motion**
  - Buttons: translateY(-1px) on hover, press returns to 0; duration 120–180ms.
  - Cards: shadow lift and 1px border lightening on hover; duration 200–300ms.
  - Links: underline offset shift, not color alone.

### 8) Dynamic OG images

- **@vercel/og endpoint**
  - Generate OG for posts/talks (title, tag, accent bar). Ensure edge compatibility and performance.

---

## Configuration and content notes

- **Environment**

  - `NEXT_PUBLIC_SITE_URL` → canonical domain used for OG/canonical tags.
  - `NEXT_PUBLIC_BOOKING_URL` → primary CTA target (e.g., Cal.com/Calendly).

- **Frontmatter for posts/projects**

  - `title`, `description/summary`, `slug`, `tags`, `ogImage`, `ogImageAlt`, `ogImageWidth`, `ogImageHeight`.

- **Images**
  - Use `MdxImage` with `width/height` or `aspectRatio` (1:1 avatar, 16:9 cover, 4:3 diagram) to stabilize layout.

---

## Completed changes (flat list)

- Hero CTAs wired; focus states upgraded; chips wrap.
- Sticky header height stabilized; footer divider hidden on mobile; résumé label normalized.
- NavLink wobble and underline removed; rely on header underline indicator.
- Prose line height and headings spacing improved; 72ch measure enforced.
- Prism CSS made color‑mode aware for code blocks.
- PostLayout uses `siteUrl`; per‑post OG meta supported.
- ReadingProgress bar positioned below header; z‑index tuned.
- Card hover scale reduced.
- TOC made sticky with active heading highlight.
- `MdxImage` gains `aspectRatio` prop; canvas density lowered on small screens.
- Duplicate résumé PDF removed; single résumé retained; naming unified.
- OKLCH CSS variables added, mapped to Chakra semantic tokens; motion tokens standardized.

---

## Next sprint recommendation

Focus on proof surfaces and credibility:

- Projects grid and details (link hero chips → cases) and add Projects to nav.
- Resume in HTML with sticky anchors and print styles.
- Blog index cards + search + related rail; switch to Shiki.

These three areas transform the site from “voice” to “evidence” with high visible impact.
