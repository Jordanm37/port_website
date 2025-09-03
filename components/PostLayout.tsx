import Head from "next/head";
import { ReactNode } from "react";
import { chakra, Heading, Text, Container, HStack, Box } from "@chakra-ui/react";
import { MainLayout } from "./layout";
import TOC from "./TOC";

type PostLayoutProps = {
  children: ReactNode;
  frontmatter?: {
    title?: string;
    description?: string;
    summary?: string;
    date?: string;
    tags?: string[];
    slug?: string;
  };
};

export default function PostLayout({ children, frontmatter }: PostLayoutProps) {
  const title = frontmatter?.title || "Post";
  const description = frontmatter?.description || frontmatter?.summary || "";
  const url = frontmatter?.slug
    ? `https://port-website-indol.vercel.app/blog/${frontmatter.slug}`
    : undefined;
  return (
    <MainLayout>
      <Container maxW="container.lg" px={{ base: 4, md: 6 }}>
        <chakra.main p={0} mx="auto">
          <Head>
            <title>{title}</title>
            {description ? <meta name="description" content={description} /> : null}
            {title ? <meta property="og:title" content={title} /> : null}
            {description ? <meta property="og:description" content={description} /> : null}
            {url ? <link rel="canonical" href={url} /> : null}
            <meta name="twitter:card" content="summary_large_image" />
            {title ? <meta name="twitter:title" content={title} /> : null}
            {description ? <meta name="twitter:description" content={description} /> : null}
          </Head>
          {frontmatter?.title ? (
            <Heading as="h1" size="2xl" mb={2}>
              {frontmatter.title}
            </Heading>
          ) : null}
          {frontmatter?.date ? (
            <Text color="muted" mb={6}>
              {frontmatter.date}
            </Text>
          ) : null}
          <Box position="relative">
            <TOC />
          </Box>
          <chakra.div my={4} />
          <div>{children}</div>
        </chakra.main>
      </Container>
    </MainLayout>
  );
}
