# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build the application 
- `npm run postbuild` - Generate sitemap and RSS feed (runs automatically after build)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Overview

This is a Next.js 12 personal portfolio website for Jordan Moshcovitis built with:

- **Framework**: Next.js 12 with TypeScript
- **UI Library**: Chakra UI for components and styling
- **Content**: MDX files for blog posts located in `pages/blog/`
- **Styling**: Chakra UI theme system + custom Prism CSS for code highlighting
- **Build Process**: Generates sitemap and RSS feed during build

### Key Files & Directories

- `pages/` - Next.js pages including blog posts as `.mdx` files
- `components/SocialButton.tsx` - Reusable social media button component  
- `scripts/generate-rss.js` - RSS feed generation script
- `next.config.js` - Next.js configuration with MDX support
- `next-sitemap.config.js` - Sitemap generation configuration
- `styles/prism.css` - Code syntax highlighting styles

### Content Management

Blog posts are written as MDX files in `pages/blog/` with frontmatter:
- Supports tags for categorization
- Date-based sorting
- Tag-based filtering via `/blog/tags/[tag]` routes
- Automatic RSS feed generation from MDX files

### Deployment

Configured for GitHub Pages deployment via GitHub Actions workflow. The build process:
1. Installs dependencies 
2. Builds Next.js app
3. Generates sitemap and RSS feed
4. Exports static HTML
5. Deploys to GitHub Pages

Site URL: https://port-website-indol.vercel.app

### Node Version

Requires Node.js >= 22 < 23 (specified in package.json engines)