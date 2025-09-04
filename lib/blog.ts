import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogMeta = {
  slug: string;
  title: string;
  date: string | null;
  tags?: string[];
};

export function getBlogDir(): string {
  return path.join(process.cwd(), "pages", "blog");
}

export function getOrderedPosts(): BlogMeta[] {
  const dir = getBlogDir();
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const entries: BlogMeta[] = files.map((name) => {
    const fullPath = path.join(dir, name);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    const slug = name.replace(/\.mdx$/, "");
    const title = (data.title as string) || slug.replace(/-/g, " ");
    const date = (data.date as string | undefined) || null;
    const tags = (data.tags as string[] | undefined) || [];
    return { slug, title, date, tags };
  });
  return entries.sort((a, b) => {
    const ad = a.date ? Date.parse(a.date) : 0;
    const bd = b.date ? Date.parse(b.date) : 0;
    return bd - ad; // newest first
  });
}

export function getPrevNext(slug: string, posts?: BlogMeta[]): {
  prev: BlogMeta | null;
  next: BlogMeta | null;
} {
  const allPosts = posts || getOrderedPosts();
  const index = allPosts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? allPosts[index - 1] : null; // newer
  const next = index < allPosts.length - 1 ? allPosts[index + 1] : null; // older
  return { prev, next };
}

export function getRelatedPosts(slug: string, tags: string[], posts?: BlogMeta[]): BlogMeta[] {
  if (!tags || tags.length === 0) return [];
  const allPosts = posts || getOrderedPosts();
  return allPosts
    .filter((p) => p.slug !== slug && p.tags?.some((t) => tags.includes(t)))
    .slice(0, 3);
}
