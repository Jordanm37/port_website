import React from "react";
import { Box, HStack, chakra, Heading, Text, Select, Tag, Stack } from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { MainLayout } from "../components/layout";
import { PageContainer, WritingListRow, Hero } from "../components/ui";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type PostEntry = {
  slug: string;
  title: string;
  date: string | null;
  tags: string[];
  dek?: string | null;
  series?: string | null;
  readingTime?: number | null;
  thumbnail?: string | null;
};

type HomeProps = {
  entries: PostEntry[];
  allTags: string[];
  allSeries: string[];
};

const Home: NextPage<HomeProps> = ({ entries, allTags, allSeries }) => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = React.useState<string>("");

  const visible = React.useMemo(() => {
    return entries.filter((e) => {
      if (selectedSeries && e.series !== selectedSeries) return false;
      return true;
    });
  }, [entries, selectedSeries]);
  return (
    <MainLayout>
      <Head>
        <title>Jordan Moshcovitis</title>
        <meta name="description" content="Personal space on the web." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <Hero
          title="Jordan Moshcovitis"
          subtitle="I build systems and write about engineering, modeling, and ideas that ship. This is a working notebook — short notes, longer writing, and projects."
          imageSrc="/images/jordan-profile-pic.jpg"
          imageAlt="Jordan Moshcovitis headshot"
          primaryCtaHref="/projects"
          primaryCtaLabel="Projects"
          secondaryCtaHref="/enquire"
          secondaryCtaLabel="Enquire"
          variant="compact"
        />

        <Box px={{ base: 4, md: 5 }}>
          <HStack spacing={3} mt={6} align="center" flexWrap="wrap">
            <Stack direction="row" align="center" spacing={2}>
              <Text color="muted" fontSize="sm">
                Tags
              </Text>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {allTags.map((t) => {
                  const isActive = selectedTags.includes(t);
                  return (
                    <Tag
                      key={t}
                      size="sm"
                      variant={isActive ? "solid" : "subtle"}
                      boxShadow={isActive ? "sm" : undefined}
                      _dark={isActive ? { boxShadow: "0 2px 8px rgba(0,0,0,0.35)" } : undefined}
                      transition="box-shadow 150ms ease-out, transform 150ms ease-out"
                      _hover={{ transform: "translateY(-1px)" }}
                      cursor="pointer"
                      onClick={() =>
                        setSelectedTags((prev) =>
                          prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
                        )
                      }
                    >
                      {t}
                    </Tag>
                  );
                })}
              </Stack>
            </Stack>

            <Stack direction="row" align="center" spacing={2}>
              <Text color="muted" fontSize="sm">
                Series
              </Text>
              <Select
                placeholder="All"
                size="sm"
                maxW="200px"
                value={selectedSeries}
                onChange={(e) => setSelectedSeries(e.target.value)}
                variant="outline"
                borderColor="border"
                bg="bg"
                borderRadius="md"
                focusBorderColor="link"
                _hover={{ borderColor: "link" }}
                iconColor="muted"
                iconSize="1rem"
              >
                {allSeries.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Stack>
          </HStack>

          <Box mt={4}>
            {visible.map((p) => {
              const matchesTags =
                selectedTags.length === 0 || selectedTags.every((t) => p.tags.includes(t));
              return (
                <Box key={p.slug} opacity={matchesTags ? 1 : 0.5} transition="opacity 150ms">
                  <WritingListRow
                    href={`/blog/${p.slug}`}
                    title={p.title}
                    dek={p.dek}
                    tags={p.tags}
                    date={p.date}
                    readingTime={p.readingTime}
                    series={p.series}
                    thumbnail={p.thumbnail}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </PageContainer>
    </MainLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const dir = path.join(process.cwd(), "pages", "blog");
  const entries = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((name) => {
      const fullPath = path.join(dir, name);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const slug = name.replace(/\.mdx$/, "");
      const title = (data.title as string) || slug.replace(/-/g, " ");
      const date = (data.date as string | undefined) || null;
      const tags = (data.tags as string[]) || [];
      const dek = (data.dek as string | undefined) || (data.summary as string | undefined) || null;
      const series = (data.series as string | undefined) || null;
      const thumbnail = (data.thumbnail as string | undefined) || null;
      const words = content.trim().split(/\s+/).length;
      const readingTime = Math.ceil(words / 200);
      return { slug, title, date, tags, dek, series, readingTime, thumbnail };
    })
    .sort((a, b) => {
      const ad = a.date ? Date.parse(a.date) : 0;
      const bd = b.date ? Date.parse(b.date) : 0;
      return bd - ad;
    });

  const tagSet = new Set<string>();
  const seriesSet = new Set<string>();
  entries.forEach((e) => {
    e.tags.forEach((t) => tagSet.add(t));
    if (e.series) seriesSet.add(e.series);
  });

  return { props: { entries, allTags: Array.from(tagSet), allSeries: Array.from(seriesSet) } };
};
