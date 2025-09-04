import Head from "next/head";
import { ReactNode } from "react";
import { MainLayout } from "./layout";
import { Box, HStack, Tag, Heading, Text, chakra } from "@chakra-ui/react";
import { Prose } from "./ui/Prose";

type NoteLayoutProps = {
  children: ReactNode;
  frontmatter?: {
    title?: string;
    status?: "Seedling" | "Budding" | "Evergreen" | string;
    updated?: string;
    tags?: string[];
    description?: string;
    summary?: string;
  };
  related?: Array<{ slug: string; title: string }>;
};

export default function NoteLayout({ children, frontmatter, related = [] }: NoteLayoutProps) {
  const title = frontmatter?.title || "Note";
  const desc = frontmatter?.description || frontmatter?.summary || "";

  return (
    <MainLayout>
      <Head>
        <title>{title}</title>
        {desc ? <meta name="description" content={desc} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        {desc ? <meta name="twitter:description" content={desc} /> : null}
      </Head>
      <Box maxW="container.lg" mx="auto" px={{ base: 4, md: 6 }}>
        <HStack spacing={3} mt={8} mb={3} align="center">
          <Heading as="h1" size="xl">
            {title}
          </Heading>
          {frontmatter?.status ? <Tag size="sm">{frontmatter.status}</Tag> : null}
        </HStack>
        <HStack spacing={3} mb={6} color="muted">
          {frontmatter?.updated ? (
            <Text fontSize="sm">Last updated: {frontmatter.updated}</Text>
          ) : null}
          {frontmatter?.tags?.map((t) => (
            <Tag key={t} size="sm">
              {t}
            </Tag>
          ))}
        </HStack>
        <Prose>{children}</Prose>
        {related.length ? (
          <Box mt={8}>
            <Heading as="h2" size="md" mb={2}>
              Related notes
            </Heading>
            <HStack spacing={3} wrap="wrap">
              {related.map((r) => (
                <chakra.a key={r.slug} href={`/notes/${r.slug}`} textDecoration="underline">
                  {r.title}
                </chakra.a>
              ))}
            </HStack>
          </Box>
        ) : null}
      </Box>
    </MainLayout>
  );
}
