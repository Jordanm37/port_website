import fs from "fs";
import path from "path";
import Link from "next/link";
import { Heading, SimpleGrid, Text, Box, HStack, Tag } from "@chakra-ui/react";
import { MainLayout } from "../../components/layout";
import { PageContainer, BlogCard } from "../../components/ui";
import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next";

type PostEntry = {
  slug: string;
  title: string;
  date: string | null;
  tags: string[];
  summary?: string | null;
  readingTime?: number | null;
};

type BlogIndexProps = {
  entries: PostEntry[];
};

const BlogIndexPage: NextPage<BlogIndexProps> = ({ entries }) => {
  const tagSet = new Set<string>();
  entries.forEach((e) => e.tags.forEach((t) => tagSet.add(t)));
  const tags = Array.from(tagSet);
  return (
    <MainLayout>
      <PageContainer>
        <Heading as="h1" size="2xl">
          Blog
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {entries.map((p) => (
            <BlogCard
              key={p.slug}
              href={`/blog/${p.slug}`}
              title={p.title}
              excerpt={p?.summary as any}
              tags={p.tags}
              date={p.date}
            />
          ))}
        </SimpleGrid>

        {tags.length ? (
          <Box>
            <Text color="muted" mb={2}>
              Tags
            </Text>
            <HStack wrap="wrap" spacing={2}>
              {tags.map((t) => (
                <Tag key={t} size="sm" as={Link} href={`/blog/tags/${t}`}>
                  #{t}
                </Tag>
              ))}
            </HStack>
          </Box>
        ) : null}
      </PageContainer>
    </MainLayout>
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
      const summary = (data.summary as string | undefined) || null;
      return { slug, title, date, tags, summary };
    })
    .sort((a, b) => {
      const ad = a.date ? Date.parse(a.date) : 0;
      const bd = b.date ? Date.parse(b.date) : 0;
      return bd - ad;
    });

  return { props: { entries } };
};

export default BlogIndexPage;
