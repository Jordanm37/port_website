import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { MainLayout } from "../../../components/layout";
import { PageContainer } from "../../../components/ui";
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { BlogCard } from "../../../components/ui";

type Entry = {
  slug: string;
  title: string;
  date: string | null;
  tags: string[];
  summary?: string | null;
  readingTime?: number | null;
};

type Props = { series: string; entries: Entry[] };

const SeriesPage: NextPage<Props> = ({ series, entries }) => {
  return (
    <MainLayout>
      <Head>
        <title>{series} – Writing</title>
      </Head>
      <PageContainer>
        <Heading as="h1" size="2xl">
          Series: {series}
        </Heading>
        {entries.length === 0 ? (
          <Text color="muted" mt={4}>
            No entries yet.
          </Text>
        ) : null}
        <SimpleGrid mt={6} columns={{ base: 1, md: 2 }} spacing={6}>
          {entries.map((p) => (
            <BlogCard
              key={p.slug}
              href={`/writing/${p.slug}`}
              title={p.title}
              excerpt={p?.summary as any}
              tags={p.tags}
              date={p.date}
              readingTime={p.readingTime}
            />
          ))}
        </SimpleGrid>
      </PageContainer>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), "pages", "writing");
  const seriesSet = new Set<string>();
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const name of files) {
      const raw = fs.readFileSync(path.join(dir, name), "utf8");
      const { data } = matter(raw);
      const series = (data.series as string | undefined) || null;
      if (series) seriesSet.add(series);
    }
  }
  const paths = Array.from(seriesSet).map((s) => ({ params: { series: encodeURIComponent(s) } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const seriesParam = String(params?.series || "");
  const series = decodeURIComponent(seriesParam);
  const dir = path.join(process.cwd(), "pages", "writing");
  const entries: Entry[] = [];
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const name of files) {
      const fullPath = path.join(dir, name);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      if (((data.series as string | undefined) || null) !== series) continue;
      const slug = name.replace(/\.mdx$/, "");
      const title = (data.title as string) || slug.replace(/-/g, " ");
      const date = (data.date as string | undefined) || null;
      const tags = (data.tags as string[]) || [];
      const summary =
        (data.summary as string | undefined) || (data.dek as string | undefined) || null;
      const words = content.trim().split(/\s+/).length;
      const readingTime = Math.ceil(words / 200);
      entries.push({ slug, title, date, tags, summary, readingTime });
    }
  }
  entries.sort((a, b) => {
    const ad = a.date ? Date.parse(a.date) : 0;
    const bd = b.date ? Date.parse(b.date) : 0;
    return bd - ad;
  });
  return { props: { series, entries } };
};

export default SeriesPage;
