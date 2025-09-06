/** @type {import('next').NextConfig} */
const remarkGfm = require("remark-gfm").default || require("remark-gfm");
const remarkSlug = require("remark-slug").default || require("remark-slug");
const remarkFrontmatter = require("remark-frontmatter").default || require("remark-frontmatter");
const remarkMdxFrontmatter =
  require("remark-mdx-frontmatter").default || require("remark-mdx-frontmatter");
const remarkMath = require("remark-math").default || require("remark-math");
const rehypeKatex = require("rehype-katex").default || require("rehype-katex");
const rehypePrettyCode = require("rehype-pretty-code").default || require("rehype-pretty-code");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "frontmatter" }],
      remarkGfm,
      remarkSlug,
      remarkMath,
    ],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: { dark: "github-dark", light: "github-light" },
          keepBackground: false,
        },
      ],
      rehypeKatex,
    ],
  },
});

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
});
