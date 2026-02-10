import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { MainLayout } from "../../components/layout";
import { Container, Heading, Text, Box, Link as ChakraLink } from "@chakra-ui/react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { formatDateNatural } from "../../lib/date";

type PostEntry = {
  slug: string;
  title: string;
  date: string | null;
  dek?: string | null;
};

type WritingProps = {
  entries: PostEntry[];
};

const WritingPage: NextPage<WritingProps> = ({ entries }) => {
  return (
    <MainLayout>
      <Head>
        <title>Writing — Jordan Moshcovitis</title>
        <meta name="description" content="Writing by Jordan Moshcovitis." />
      </Head>

      <Container maxW="680px" px={{ base: 4, md: 5 }} py={{ base: 10, md: 14 }}>
        <Heading as="h1" size="3xl" fontFamily="heading" mb={8}>
          Writing
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
              {post.dek ? (
                <Text color="secondary" fontSize="sm" mt={1} noOfLines={1}>
                  {post.dek}
                </Text>
              ) : null}
            </Box>
          ))}

          {entries.length === 0 ? (
            <Text color="muted" fontStyle="italic">
              Writing coming soon.
            </Text>
          ) : null}
        </Box>
      </Container>
    </MainLayout>
  );
};

export default WritingPage;

export const getStaticProps: GetStaticProps<WritingProps> = async () => {
  const dir = path.join(process.cwd(), "pages", "blog");
  let entries: PostEntry[] = [];
  try {
    entries = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mdx"))
      .map((name) => {
        const fullPath = path.join(dir, name);
        const raw = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(raw);
        const slug = name.replace(/\.mdx$/, "");
        const title = (data.title as string) || slug.replace(/-/g, " ");
        const date = (data.date as string | undefined) || null;
        const dek =
          (data.dek as string | undefined) || (data.summary as string | undefined) || null;
        return { slug, title, date, dek };
      })
      .sort((a, b) => {
        const ad = a.date ? Date.parse(a.date) : 0;
        const bd = b.date ? Date.parse(b.date) : 0;
        return bd - ad;
      });
  } catch {
    // blog directory may not exist yet
  }

  return { props: { entries } };
};
