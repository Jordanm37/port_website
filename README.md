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
