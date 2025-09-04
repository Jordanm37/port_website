import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { MainLayout } from "../../components/layout";
import { PageContainer } from "../../components/ui";
import {
  Heading,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  HStack,
  Select,
} from "@chakra-ui/react";
import { BlogCard } from "../../components/ui";
import { SearchIcon } from "@chakra-ui/icons";
import { useMemo, useState } from "react";
import { track } from "../../lib/analytics";

type Entry = {
  slug: string;
  title: string;
  date: string | null;
  tags: string[];
  summary?: string | null;
  readingTime?: number | null;
  route: "/writing" | "/blog";
  series?: string | null;
};

type Props = { entries: Entry[] };

const WritingIndexPage: NextPage<Props> = ({ entries }) => {
  const [q, setQ] = useState("");
  const [series, setSeries] = useState<string>("All");
  const seriesOptions = useMemo(() => {
    const set = new Set<string>();
    entries.forEach((e) => e.series && set.add(e.series));
    return ["All", ...Array.from(set).sort()];
  }, [entries]);
  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return entries.filter((e) => {
      const matchesText = !t
        ? true
        : [e.title, e.summary, ...(e.tags || [])]
            .filter(Boolean)
            .some((s) => String(s).toLowerCase().includes(t));
      const matchesSeries = series === "All" ? true : (e.series || "") === series;
      return matchesText && matchesSeries;
    });
  }, [entries, q, series]);

  return (
    <MainLayout>
      <Head>
        <title>Writing</title>
      </Head>
      <PageContainer>
        <Heading as="h1" size="2xl">
          Writing
        </Heading>
        <HStack mt={4} spacing={4} align="center" flexWrap="wrap">
          <InputGroup maxW={{ base: "100%", md: "420px" }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="muted" />
            </InputLeftElement>
            <Input
              placeholder="Search by title, summary, or tag"
              value={q}
              onChange={(e) => {
                const val = e.target.value;
                setQ(val);
                if (val.trim()) track("search", { q: val.trim() });
              }}
            />
          </InputGroup>
          <Select
            maxW={{ base: "100%", md: "240px" }}
            value={series}
            onChange={(e) => setSeries(e.target.value)}
          >
            {seriesOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        </HStack>
        {filtered.length === 0 ? (
          <Text color="muted" mt={6}>
            No results.
          </Text>
        ) : null}
        <SimpleGrid mt={6} columns={{ base: 1, md: 2 }} spacing={6}>
          {filtered.map((p) => (
            <BlogCard
              key={`${p.slug}`}
              href={`${p.route}/${p.slug}`}
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sources: Array<{ dir: string; route: "/writing" | "/blog" }> = [
    { dir: path.join(process.cwd(), "pages", "writing"), route: "/writing" },
    { dir: path.join(process.cwd(), "pages", "blog"), route: "/blog" },
  ];
  const entries: Entry[] = [];
  for (const src of sources) {
    if (!fs.existsSync(src.dir)) continue;
    const files = fs.readdirSync(src.dir).filter((f) => f.endsWith(".mdx"));
    for (const name of files) {
      const fullPath = path.join(src.dir, name);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const slug = name.replace(/\.mdx$/, "");
      const title = (data.title as string) || slug.replace(/-/g, " ");
      const date = (data.date as string | undefined) || null;
      const tags = (data.tags as string[]) || [];
      const summary =
        (data.summary as string | undefined) || (data.dek as string | undefined) || null;
      const series = (data.series as string | undefined) || null;
      const words = content.trim().split(/\s+/).length;
      const readingTime = Math.ceil(words / 200);
      entries.push({ slug, title, date, tags, summary, readingTime, route: src.route, series });
    }
  }
  entries.sort((a, b) => {
    const ad = a.date ? Date.parse(a.date) : 0;
    const bd = b.date ? Date.parse(b.date) : 0;
    return bd - ad;
  });
  return { props: { entries } };
};

export default WritingIndexPage;
