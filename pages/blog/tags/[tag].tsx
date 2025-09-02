import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

type TagPageProps = {
  tag: string;
  posts: { slug: string; title: string; date?: string }[];
};

const TagPage: NextPage<TagPageProps> = ({ tag, posts }) => {
  return (
    <main>
      <h1>Tag: {tag}</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            {p.date ? ` — ${p.date}` : null}
          </li>
        ))}
      </ul>
      <p>
        <Link href="/blog">← Back to Blog</Link>
      </p>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), 'pages', 'blog');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  const tags = new Set<string>();
  files.forEach((name) => {
    const fullPath = path.join(dir, name);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(raw);
    const t = (data.tags as string[]) || [];
    t.forEach((x) => tags.add(x));
  });

  return {
    paths: Array.from(tags).map((tag) => ({ params: { tag } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TagPageProps> = async (ctx) => {
  const tag = ctx.params?.tag as string;
  const dir = path.join(process.cwd(), 'pages', 'blog');
  const posts = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((name) => {
      const fullPath = path.join(dir, name);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(raw);
      const slug = name.replace(/\.mdx$/, '');
      const title = (data.title as string) || slug.replace(/-/g, ' ');
      const date = data.date as string | undefined;
      const tags = (data.tags as string[]) || [];
      return { slug, title, date, tags };
    })
    .filter((p) => p.tags.includes(tag))
    .sort((a, b) => {
      const ad = a.date ? Date.parse(a.date) : 0;
      const bd = b.date ? Date.parse(b.date) : 0;
      return bd - ad;
    })
    .map(({ slug, title, date }) => ({ slug, title, date }));

  return { props: { tag, posts } };
};

export default TagPage;


