import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next";

type PostEntry = {
  slug: string;
  title: string;
  date: string | null;
  tags: string[];
};

type BlogIndexProps = {
  entries: PostEntry[];
};

const BlogIndexPage: NextPage<BlogIndexProps> = ({ entries }) => {
  const tagSet = new Set<string>();
  entries.forEach((e) => e.tags.forEach((t) => tagSet.add(t)));
  const tags = Array.from(tagSet);
  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {entries.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}>
              <a>{p.title}</a>
            </Link>
            {p.date ? ` — ${p.date}` : null}
          </li>
        ))}
      </ul>
      {tags.length ? (
        <p>
          Tags{" "}
          {tags.map((t) => (
            <span key={t} style={{ marginRight: 8 }}>
              <Link href={`/blog/tags/${t}`}>
                <a>#{t}</a>
              </Link>
            </span>
          ))}
        </p>
      ) : null}
    </main>
  );
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const dir = path.join(process.cwd(), "pages", "blog");
  const entries = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((name) => {
      const fullPath = path.join(dir, name);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);
      const slug = name.replace(/\.mdx$/, "");
      const title = (data.title as string) || slug.replace(/-/g, " ");
      const date = (data.date as string | undefined) || null;
      const tags = (data.tags as string[]) || [];
      return { slug, title, date, tags };
    })
    .sort((a, b) => {
      const ad = a.date ? Date.parse(a.date) : 0;
      const bd = b.date ? Date.parse(b.date) : 0;
      return bd - ad;
    });

  return { props: { entries } };
};

export default BlogIndexPage;
