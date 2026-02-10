import React from "react";
import { Box, Container, Heading, Text, Link as ChakraLink, Divider } from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { MainLayout } from "../components/layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { formatDateNatural } from "../lib/date";

type PostEntry = {
  slug: string;
  title: string;
  date: string | null;
};

type HomeProps = {
  recentPosts: PostEntry[];
};

const Home: NextPage<HomeProps> = ({ recentPosts }) => {
  return (
    <MainLayout>
      <Head>
        <title>Jordan Moshcovitis</title>
        <meta
          name="description"
          content="Jordan Moshcovitis — applied AI researcher and physicist."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="680px" px={{ base: 4, md: 5 }} py={{ base: 10, md: 14 }}>
        {/* Identity */}
        <Text as="h1" fontSize="lg" fontStyle="italic" color="secondary" mb={8}>
          Applied AI researcher with a physics background.
        </Text>

        {/* Minor rule — 40% centered */}
        <Box mx="auto" w="40%" mb={8}>
          <Divider borderColor="border" />
        </Box>

        {/* Selected Work */}
        <Heading
          as="h2"
          fontSize="sm"
          fontWeight={600}
          letterSpacing="widest"
          textTransform="uppercase"
          color="muted"
          mb={4}
        >
          Selected Work
        </Heading>
        <Box as="ul" listStyleType="none" pl={0} mb={8}>
          <Box as="li" mb={2}>
            <ChakraLink as={NextLink} href="/research" color="accent" textDecoration="underline">
              Estimation of Nitrogen Concentrations in Single Crystal Diamonds
            </ChakraLink>
            <Text as="span" color="muted">
              {" "}
              — Spectroscopic characterisation and defect modelling — 2025
            </Text>
          </Box>
          <Box as="li" mb={2}>
            <ChakraLink
              href="https://chamomile.ai/rag-by-a-thousand-metrics/"
              color="accent"
              textDecoration="underline"
              isExternal
            >
              RAG by a Thousand Metrics
            </ChakraLink>
            <Text as="span" color="muted">
              {" "}
              — Retrieval-augmented generation evaluation — 2025
            </Text>
          </Box>
          <Box as="li" mb={2}>
            <ChakraLink
              href="https://chamomile.ai/challenges-dense-retrieval/"
              color="accent"
              textDecoration="underline"
              isExternal
            >
              The Dense Fog of RAG
            </ChakraLink>
            <Text as="span" color="muted">
              {" "}
              — Navigating dense retrieval blind spots — 2024
            </Text>
          </Box>
        </Box>

        {/* Recent Writing */}
        <Heading
          as="h2"
          fontSize="sm"
          fontWeight={600}
          letterSpacing="widest"
          textTransform="uppercase"
          color="muted"
          mb={4}
        >
          Recent Writing
        </Heading>
        <Box as="ul" listStyleType="none" pl={0} mb={8}>
          {recentPosts.slice(0, 3).map((post) => (
            <Box as="li" key={post.slug} mb={2}>
              <ChakraLink
                as={NextLink}
                href={`/blog/${post.slug}`}
                color="accent"
                textDecoration="underline"
              >
                {post.title}
              </ChakraLink>
              {post.date ? (
                <Text as="span" color="muted">
                  {" "}
                  — {formatDateNatural(post.date)}
                </Text>
              ) : null}
            </Box>
          ))}
          {recentPosts.length === 0 ? (
            <Box as="li">
              <Text color="muted" fontStyle="italic">
                Writing coming soon.
              </Text>
            </Box>
          ) : null}
        </Box>

        {/* Minor rule — 40% centered */}
        <Box mx="auto" w="40%" mb={8}>
          <Divider borderColor="border" />
        </Box>

        {/* Bio */}
        <Box maxW="65ch" mb={6}>
          <Text mb={3}>
            Jordan Moshcovitis is an applied AI researcher and engineer based in San Francisco and
            Melbourne. His work spans retrieval-augmented generation, agentic LLM systems, and
            robust evaluation methodology. Before moving into AI, he studied physics at the
            University of Melbourne, with research in computational materials science and diamond
            spectroscopy.
          </Text>
          <Text color="secondary" fontSize="sm">
            MSc Physics, University of Melbourne. BSc (Hons) Physics, University of Melbourne.
            Diploma in Mathematical Sciences.
          </Text>
        </Box>

        {/* Contact links */}
        <Text fontSize="sm" color="muted">
          <ChakraLink href="mailto:jordan.moshcovitis@gmail.com" color="muted">
            Email
          </ChakraLink>
          {"  "}
          <Text as="span" mx={1}>
            |
          </Text>
          {"  "}
          <ChakraLink href="https://github.com/Jordanm37" color="muted" isExternal>
            GitHub
          </ChakraLink>
          {"  "}
          <Text as="span" mx={1}>
            |
          </Text>
          {"  "}
          <ChakraLink
            href="https://www.linkedin.com/in/jordan-moshcovitis"
            color="muted"
            isExternal
          >
            LinkedIn
          </ChakraLink>
        </Text>
      </Container>
    </MainLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const dir = path.join(process.cwd(), "pages", "blog");
  let recentPosts: PostEntry[] = [];
  try {
    recentPosts = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mdx"))
      .map((name) => {
        const fullPath = path.join(dir, name);
        const raw = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(raw);
        const slug = name.replace(/\.mdx$/, "");
        const title = (data.title as string) || slug.replace(/-/g, " ");
        const date = (data.date as string | undefined) || null;
        return { slug, title, date };
      })
      .sort((a, b) => {
        const ad = a.date ? Date.parse(a.date) : 0;
        const bd = b.date ? Date.parse(b.date) : 0;
        return bd - ad;
      })
      .slice(0, 3);
  } catch {
    // blog directory may not exist yet
  }

  return { props: { recentPosts } };
};
