/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const RSS = require("rss");

const SITE_URL = "https://port-website-indol.vercel.app";

function getPosts() {
  const appBlogDir = path.join(process.cwd(), "app", "blog");
  if (fs.existsSync(appBlogDir)) {
    const dirs = fs
      .readdirSync(appBlogDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .filter((name) => fs.existsSync(path.join(appBlogDir, name, "page.mdx")));
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
  const files = fs.readdirSync(pagesBlogDir).filter((f) => f.endsWith(".mdx"));
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
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
  fs.writeFileSync(path.join(publicDir, "rss.xml"), xml);
  // eslint-disable-next-line no-console
  console.log("Generated public/rss.xml");
}

main();
