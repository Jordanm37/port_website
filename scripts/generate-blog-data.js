const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function getBlogDir() {
  return path.join(process.cwd(), "pages", "blog");
}

function getOrderedPosts() {
  const dir = getBlogDir();
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const entries = files.map((name) => {
    const fullPath = path.join(dir, name);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    const slug = name.replace(/\.mdx$/, "");
    const title = data.title || slug.replace(/-/g, " ");
    const date = data.date || null;
    const tags = data.tags || [];
    return { slug, title, date, tags };
  });
  return entries.sort((a, b) => {
    const ad = a.date ? Date.parse(a.date) : 0;
    const bd = b.date ? Date.parse(b.date) : 0;
    return bd - ad;
  });
}

function getPrevNext(slug, posts) {
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? posts[index - 1] : null;
  const next = index < posts.length - 1 ? posts[index + 1] : null;
  return { prev, next };
}

function getRelatedPosts(slug, tags, posts) {
  if (!tags || tags.length === 0) return [];
  return posts
    .filter((p) => p.slug !== slug && p.tags?.some((t) => tags.includes(t)))
    .slice(0, 3);
}

function generateBlogData() {
  // Cache posts to avoid repeated file reads
  const posts = getOrderedPosts();
  const blogData = {};

  posts.forEach((post) => {
    const navigation = getPrevNext(post.slug, posts);
    const relatedPosts = getRelatedPosts(post.slug, post.tags, posts);
    blogData[post.slug] = {
      navigation,
      relatedPosts,
    };
  });

  // Write to public directory so it can be imported
  const outputPath = path.join(process.cwd(), "public", "blog-data.json");
  fs.writeFileSync(outputPath, JSON.stringify(blogData, null, 2));
  console.log(`Generated blog data for ${posts.length} posts`);
}

generateBlogData();
