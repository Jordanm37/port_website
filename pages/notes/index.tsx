import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { MainLayout } from "../../components/layout";
import { PageContainer, Card } from "../../components/ui";
import { Heading, SimpleGrid, HStack, Tag, Text, LinkBox, LinkOverlay } from "@chakra-ui/react";

type Note = {
  slug: string;
  title: string;
  status?: "Seedling" | "Budding" | "Evergreen";
  updated?: string | null;
  tags: string[];
  summary?: string | null;
};

type Props = { notes: Note[] };

const NotesIndexPage: NextPage<Props> = ({ notes }) => {
  function colorForStatus(s?: string) {
    switch (s) {
      case "Seedling":
        return "green";
      case "Budding":
        return "yellow";
      case "Evergreen":
        return "blue";
      default:
        return "gray";
    }
  }

  return (
    <MainLayout>
      <Head>
        <title>Notes</title>
      </Head>
      <PageContainer>
        <Heading as="h1" size="2xl">
          Notes
        </Heading>
        <SimpleGrid mt={6} columns={{ base: 1, md: 2 }} spacing={6}>
          {notes.map((n) => (
            <Card as={LinkBox} key={n.slug} role="group" p={4}>
              <HStack spacing={3} align="start" justify="space-between">
                <HStack spacing={3} align="start">
                  <Tag size="sm" colorScheme={colorForStatus(n.status)}>
                    {n.status || "Note"}
                  </Tag>
                  <Text fontWeight={600}>
                    <LinkOverlay href={`/notes/${n.slug}`} _hover={{ textDecoration: "none" }}>
                      {n.title}
                    </LinkOverlay>
                  </Text>
                </HStack>
                {n.updated ? (
                  <Text fontSize="sm" color="muted">
                    {n.updated}
                  </Text>
                ) : null}
              </HStack>
              {n.summary ? (
                <Text color="muted" mt={2}>
                  {n.summary}
                </Text>
              ) : null}
            </Card>
          ))}
        </SimpleGrid>
      </PageContainer>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const dir = path.join(process.cwd(), "pages", "notes");
  const notes: Note[] = [];
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    for (const name of files) {
      const fullPath = path.join(dir, name);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(raw);
      const slug = name.replace(/\.mdx$/, "");
      notes.push({
        slug,
        title: (data.title as string) || slug.replace(/-/g, " "),
        status: data.status as any,
        updated: (data.updated as string) || null,
        tags: (data.tags as string[]) || [],
        summary: (data.summary as string | undefined) || null,
      });
    }
  }
  notes.sort((a, b) => {
    const ad = a.updated ? Date.parse(a.updated) : 0;
    const bd = b.updated ? Date.parse(b.updated) : 0;
    return bd - ad;
  });
  return { props: { notes } };
};

export default NotesIndexPage;
