/** @type {import('next').NextConfig} */
const rehypePrismPlus = require('rehype-prism-plus').default || require('rehype-prism-plus')
const remarkGfm = require('remark-gfm').default || require('remark-gfm')
const remarkSlug = require('remark-slug').default || require('remark-slug')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkSlug],
    rehypePlugins: [rehypePrismPlus],
  }
})

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})
