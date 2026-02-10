import fs from "fs";
import path from "path";
import NextLink from "next/link";
import { Heading, Text, Box, Container, Link as ChakraLink } from "@chakra-ui/react";
import { MainLayout } from "../../components/layout";
import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { formatDateNatural } from "../../lib/date";

type PostEntry = {
  slug: string;
  title: string;
  date: string | null;
  summary?: string | null;
};

type BlogIndexProps = {
  entries: PostEntry[];
};

const BlogIndexPage: NextPage<BlogIndexProps> = ({ entries }) => {
  return (
    <MainLayout>
      <Head>
        <title>Blog — Jordan Moshcovitis</title>
        <meta name="description" content="Blog posts by Jordan Moshcovitis." />
      </Head>

      <Container maxW="680px" px={{ base: 4, md: 5 }} py={{ base: 10, md: 14 }}>
        <Heading as="h1" size="3xl" fontFamily="heading" mb={8}>
          Blog
        </Heading>

        <Box>
          {entries.map((post, i) => (
            <Box
              key={post.slug}
              py={4}
              borderBottomWidth={i < entries.length - 1 ? "1px" : "0"}
              borderColor="border"
            >
              <ChakraLink
                as={NextLink}
                href={`/blog/${post.slug}`}
                color="accent"
                fontWeight={500}
                fontSize="lg"
                textDecoration="underline"
                textUnderlineOffset="0.15em"
                textDecorationThickness="0.06em"
                _hover={{ color: "accentHover" }}
              >
                {post.title}
              </ChakraLink>
              {post.date ? (
                <Text color="muted" fontSize="sm" mt={1}>
                  {formatDateNatural(post.date)}
                </Text>
              ) : null}
              {post.summary ? (
                <Text color="secondary" fontSize="sm" mt={1} noOfLines={1}>
                  {post.summary}
                </Text>
              ) : null}
            </Box>
          ))}

          {entries.length === 0 ? (
            <Text color="muted" fontStyle="italic">
              No posts yet.
            </Text>
          ) : null}
        </Box>
      </Container>
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
      const summary = (data.summary as string | undefined) || null;
      return { slug, title, date, summary };
    })
    .sort((a, b) => {
      const ad = a.date ? Date.parse(a.date) : 0;
      const bd = b.date ? Date.parse(b.date) : 0;
      return bd - ad;
    });

  return { props: { entries } };
};

export default BlogIndexPage;
