import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import NoteLayout from "../../components/NoteLayout";

type Props = {
  slug: string;
  frontmatter: Record<string, any>;
  content: string;
  related: Array<{ slug: string; title: string }>;
};

const MDXRemote = dynamic(() => import("next/dynamic").then(() => null as any), { ssr: false });

const NotePage: NextPage<Props> = ({ frontmatter, content, related }) => {
  // We’re in Pages Router with mdx loader active; we can’t use MDXRemote easily here.
  // Instead, rely on direct MDX pages for notes; this dynamic page is a placeholder for future.
  return (
    <NoteLayout frontmatter={frontmatter} related={related}>
      {content as any}
    </NoteLayout>
  ) as any;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), "pages", "notes");
  if (!fs.existsSync(dir)) return { paths: [], fallback: false };
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const paths = files.map((name) => ({ params: { slug: name.replace(/\.mdx$/, "") } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug || "");
  const fullPath = path.join(process.cwd(), "pages", "notes", `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(raw);

  // Load related notes from generated JSON if available
  let related: Array<{ slug: string; title: string }> = [];
  try {
    const notesJsonPath = path.join(process.cwd(), "public", "notes-data.json");
    if (fs.existsSync(notesJsonPath)) {
      const all = JSON.parse(fs.readFileSync(notesJsonPath, "utf8"));
      related = (all?.[slug]?.related || []).map((n: any) => ({ slug: n.slug, title: n.title }));
    }
  } catch {}

  return { props: { slug, frontmatter: data, content: raw, related } };
};

export default NotePage;
