/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const RSS = require("rss");
const matter = require("gray-matter");

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jordanmoshcovitis.com";

function getPosts() {
  // Prefer Pages Router /writing directory
  const writingDir = path.join(process.cwd(), "pages", "writing");
  const posts = [];
  if (fs.existsSync(writingDir)) {
    const files = fs.readdirSync(writingDir).filter((f) => f.endsWith(".mdx"));
    files.forEach((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const fullPath = path.join(writingDir, filename);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);
      const title = data.title || slug.replace(/-/g, " ");
      const date = data.date ? new Date(data.date) : new Date();
      const url = `${SITE_URL}/writing/${slug}`;
      posts.push({ title, url, date });
    });
  }
  // Fallback: legacy /pages/blog/*.mdx
  const pagesBlogDir = path.join(process.cwd(), "pages", "blog");
  if (fs.existsSync(pagesBlogDir)) {
    const files = fs.readdirSync(pagesBlogDir).filter((f) => f.endsWith(".mdx"));
    files.forEach((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const fullPath = path.join(pagesBlogDir, filename);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);
      const title = data.title || slug.replace(/-/g, " ");
      const date = data.date ? new Date(data.date) : new Date();
      const url = `${SITE_URL}/writing/${slug}`;
      posts.push({ title, url, date });
    });
  }
  return posts.sort((a, b) => b.date - a.date);
}

function main() {
  const feed = new RSS({
    title: "Jordan Moshcovitis – Writing",
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
    description: "Essays and notes from the writing lab",
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
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
  fs.writeFileSync(path.join(publicDir, "rss.xml"), xml);
  // eslint-disable-next-line no-console
  console.log("Generated public/rss.xml");
}

main();
