import fs from "fs";
import path from "path";
import { getOrderedPosts, getPrevNext, getRelatedPosts, BlogMeta } from "../lib/blog";

type BlogDataEntry = {
  navigation: {
    prev: BlogMeta | null;
    next: BlogMeta | null;
  };
  relatedPosts: BlogMeta[];
};

type AllBlogData = {
  [slug: string]: BlogDataEntry;
};

function generateBlogData(): void {
  try {
    // Cache posts to avoid repeated file reads
    const posts = getOrderedPosts();
    const blogData: AllBlogData = {};

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