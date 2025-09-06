/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const RSS = require("rss");
const { writeFileSync, existsSync, mkdirSync } = require("fs");

const SITE_URL = "https://port-website-indol.vercel.app";

function getPosts() {
  const appBlogDir = path.join(process.cwd(), "app", "blog");
  if (fs.existsSync(appBlogDir)) {
    const dirs = fs
      .readdirSync(appBlogDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .filter((name) => fs.existsSync(path.join(appBlogDir, name, "page.mdx")) && !name.startsWith("_"));
    return dirs.map((slug) => {
      const raw = fs.readFileSync(path.join(appBlogDir, slug, "page.mdx"), "utf8");
      const matter = require("gray-matter");
      const { data } = matter(raw);
      const title = data.title || slug.replace(/-/g, " ");
      const date = data.date ? new Date(data.date) : new Date();
      const url = `${SITE_URL}/blog/${slug}`;
      return { title, url, date };
    });
  }
  const pagesBlogDir = path.join(process.cwd(), "pages", "blog");
  if (!fs.existsSync(pagesBlogDir)) return [];
  const files = fs.readdirSync(pagesBlogDir).filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));
  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const title = slug.replace(/-/g, " ");
    const url = `${SITE_URL}/blog/${slug}`;
    const date = new Date();
    return { title, url, date };
  });
}

function main() {
  const feed = new RSS({
    title: "Jordan Moshcovitis – Blog",
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
    description: "MDX posts from the portfolio website",
    language: "en",
  });

  const posts = getPosts();
  posts.forEach((p) => {
    feed.item({
      title: p.title,
      url: p.url,
      date: p.date,
    });
  });

  const xml = feed.xml({ indent: true });
  const publicDir = path.join(process.cwd(), "public");
  if (!existsSync(publicDir)) mkdirSync(publicDir);
  writeFileSync(path.join(publicDir, "rss.xml"), xml);

  // Generate JSON Feed v1
  const jsonFeed = {
    version: "https://jsonfeed.org/version/1",
    title: "Jordan Moshcovitis – Writing",
    home_page_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.json`,
    items: posts.map((p) => ({
      id: p.url,
      url: p.url,
      title: p.title,
      date_published: p.date.toISOString(),
    })),
  };
  writeFileSync(path.join(publicDir, "feed.json"), JSON.stringify(jsonFeed, null, 2));

  // Generate Atom by reusing RSS library output (RSS package supports atom if configured)
  // Minimal Atom wrapper: reuse items
  const atom = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `<title>Jordan Moshcovitis – Writing</title>`,
    `<link href="${SITE_URL}/atom.xml" rel="self" />`,
    `<link href="${SITE_URL}" />`,
    `<updated>${new Date().toISOString()}</updated>`,
    `<id>${SITE_URL}/</id>`,
    ...posts.map(
      (p) =>
        `<entry><title>${p.title}</title><link href="${p.url}" /><id>${p.url}</id><updated>${p.date.toISOString()}</updated></entry>`
    ),
    "</feed>",
  ].join("");
  writeFileSync(path.join(publicDir, "atom.xml"), atom);

  // eslint-disable-next-line no-console
  console.log("Generated public/rss.xml, public/feed.json and public/atom.xml");
}

main();
