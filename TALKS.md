### Talks layout notes

This document captures the options and the current decision for how talks are presented on the site.

### Current approach (implemented)

- Keep “Talk” as an artefact on relevant project rows (e.g., Slides/Video links).
- Include a small Talks subsection at the bottom of the Projects page with 2–3 items:
  - Title · Event · Date
  - Links to Slides/Video
- No separate Talks page (minimizes clutter). If a talk later becomes a blog post, link it from the subsection.

### Alternatives (not implemented)

- Dedicated Talks page:
  - Pros: Clear home for talks, room for abstracts and media.
  - Cons: Extra surface to maintain; feels heavy given low talk volume.
- Tag-driven index (preferred alternative if volume grows):
  - Publish each talk as a short blog post tagged “talk”.
  - The tag page then aggregates talks automatically; link “Talks” to the tag URL.

### Content guidelines

- Talk row fields: Title, Event, Date, optional Location.
- Resources: Slides (preferred), Video (if available). Open external links in a new tab.
- Keep copy concise (1–2 lines). Avoid chips/badges.

### Adding a new talk (Projects subsection)

1. Edit `pages/projects.tsx` → Talks subsection.
2. Add a row with:
   - Title (bold), Event · Date (muted, small), and a Slides link.
3. If you publish a blog post for the talk later, link it next to Slides.

### When to reconsider a dedicated page

- If there are >5 talks or if you want full abstracts and embedded media per talk, move to either:
  - A dedicated Talks page, or
  - Talk-as-posts with a “talk” tag index.
