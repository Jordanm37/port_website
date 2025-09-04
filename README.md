# Port Website

This project uses GitHub Actions for CI and automated remediation of common issues.

## Documentation

- See `docs/auto-fix.md` for how CI auto-fix (Codex) works, how it pushes fixes, and behavior on forks/protected branches.

## Tech stack

- Next.js: 15.5.2 (Pages Router with MDX)
- React: 18.2.0 / React DOM: 18.2.0
- TypeScript: 5.5.4
- Chakra UI: 2.10.9 (+ @chakra-ui/icons 2.2.4)
- Emotion: @emotion/react 11.14.0, @emotion/styled 11.14.1
- MDX: @next/mdx 15.5.2, @mdx-js/loader 3.1.1, @mdx-js/react 3.1.1
- MDX plugins: remark-gfm 4.0.1, remark-slug 7.0.1, remark-frontmatter 5.0.0, remark-mdx-frontmatter 5.2.0, rehype-prism-plus 2.0.1
- Content tooling: gray-matter 4.0.3, rss 1.2.2, next-sitemap 4.2.3
- Animation: framer-motion 11.18.2
- Tooling: ESLint 9.34.0, Prettier 3.3.3, Husky 9.1.7, lint-staged 15.2.10
- Node: 22.x (see `.nvmrc` and `engines.node`)

## Scripts

- `npm run dev`: starts Next.js; also generates blog data with `tsx` helper
- `npm run build`: builds the site
- `npm run postbuild`: generates sitemap and RSS, and regenerates blog data
- `npm run typecheck`: TypeScript check (no emit)
- `npm run lint`: ESLint
- `npm run new:post`: scaffold a new MDX post

## Getting Started

Prerequisites:

- Node 22.x (see `.nvmrc`)

Steps:

1. Use the pinned Node version

```bash
nvm use || nvm install
```

2. Install dependencies

```bash
npm ci
```

3. Start the dev server

```bash
npm run dev
```

Notes:

- Commits auto-format staged files via husky + lint-staged.
- Type-check and lint locally with `npm run typecheck` and `npm run lint`.

## Deployment (Vercel)

- Framework preset: Next.js
- Node: picked up from `.nvmrc` (22.x) / `engines.node`
- Build command: `npm run build` (postbuild runs `next-sitemap` and RSS generation)
- Output: Next.js default

Optional CI visibility for previews:

- Set the following GitHub Actions secrets if you want Codex to surface Vercel preview info on PRs:
  - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

Codex auto-fix (CI remediation):

- Requires `OPENAI_API_KEY` in GitHub Actions secrets.
- See `docs/auto-fix.md` for details.
