const fs = require("fs");
const path = require("path");

// Since we can't require TypeScript files directly, we'll implement the needed functions here
const matter = require("gray-matter");

function getBlogDir() {
  return path.join(process.cwd(), "pages", "writing");
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
    return bd - ad; // newest first
  });
}

function getPrevNext(slug, posts) {
  const allPosts = posts || getOrderedPosts();
  const index = allPosts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? allPosts[index - 1] : null; // newer
  const next = index < allPosts.length - 1 ? allPosts[index + 1] : null; // older
  return { prev, next };
}

function getRelatedPosts(slug, tags, posts) {
  if (!tags || tags.length === 0) return [];
  const allPosts = posts || getOrderedPosts();
  return allPosts
    .filter((p) => p.slug !== slug && p.tags?.some((t) => tags.includes(t)))
    .slice(0, 3);
}

function generateBlogData() {
  try {
    // Cache posts to avoid repeated file reads
    const posts = getOrderedPosts();
    const blogData = {};

    posts.forEach((post) => {
      try {
        const navigation = getPrevNext(post.slug, posts);
        const relatedPosts = getRelatedPosts(post.slug, post.tags || [], posts);
        blogData[post.slug] = {
          navigation,
          relatedPosts,
        };
      } catch (error) {
        console.error(`Error processing post ${post.slug}:`, error);
        // Continue with other posts
      }
    });

    // Write to public directory so it can be imported
    const outputPath = path.join(process.cwd(), "public", "blog-data.json");

    // Ensure the public directory exists
    const publicDir = path.dirname(outputPath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(blogData, null, 2));
    console.log(`Generated blog data for ${posts.length} posts`);
  } catch (error) {
    console.error("Error generating blog data:", error);
    process.exit(1);
  }
}

generateBlogData();
