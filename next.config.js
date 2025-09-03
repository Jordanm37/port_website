/** @type {import('next').NextConfig} */
const rehypePrismPlus = require("rehype-prism-plus").default || require("rehype-prism-plus");
const remarkGfm = require("remark-gfm").default || require("remark-gfm");
const remarkSlug = require("remark-slug").default || require("remark-slug");
const remarkFrontmatter = require("remark-frontmatter").default || require("remark-frontmatter");
const remarkMdxFrontmatter =
  require("remark-mdx-frontmatter").default || require("remark-mdx-frontmatter");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "frontmatter" }],
      remarkGfm,
      remarkSlug,
    ],
    rehypePlugins: [rehypePrismPlus],
  },
});

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
});
