/** @type {import('next').NextConfig} */
const remarkGfm = require("remark-gfm").default || require("remark-gfm");
const remarkSlug = require("remark-slug").default || require("remark-slug");
const remarkFrontmatter = require("remark-frontmatter").default || require("remark-frontmatter");
const remarkMdxFrontmatter =
  require("remark-mdx-frontmatter").default || require("remark-mdx-frontmatter");
const remarkMath = require("remark-math").default || require("remark-math");
const rehypeKatex = require("rehype-katex").default || require("rehype-katex");
const rehypePrettyCode = require("rehype-pretty-code").default || require("rehype-pretty-code");

// Bundle analyzer configuration
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

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

module.exports = withBundleAnalyzer(
  withMDX({
    reactStrictMode: true,
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    images: {
      formats: ["image/avif", "image/webp"],
    },
    // Performance optimizations
    experimental: {
      scrollRestoration: true,
    },
    webpack: (config, { dev, isServer }) => {
      // Production optimizations
      if (!dev && !isServer) {
        // Enable webpack optimizations
        config.optimization = {
          ...config.optimization,
          splitChunks: {
            chunks: "all",
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all",
                priority: 10,
              },
              chakra: {
                test: /[\\/]node_modules[\\/]@chakra-ui[\\/]/,
                name: "chakra-ui",
                chunks: "all",
                priority: 20,
              },
              mdx: {
                test: /[\\/]node_modules[\\/](remark|rehype)[\\/]/,
                name: "mdx",
                chunks: "all",
                priority: 15,
              },
            },
          },
        };

        // Add compression and minification
        if (config.optimization.minimizer) {
          // Terser is already configured by Next.js
        }
      }

      return config;
    },
    // Optimize build output
    output: "standalone",
    // Enable build caching
    generateBuildId: async () => {
      return "build-cache-" + Date.now();
    },
  })
);
