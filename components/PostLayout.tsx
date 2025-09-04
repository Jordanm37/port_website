import Head from "next/head";
import { ReactNode } from "react";
import {
  chakra,
  Heading,
  Text,
  Container,
  HStack,
  Box,
  Tag,
  IconButton,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import { useClipboard } from "@chakra-ui/react";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import NextLink from "next/link";
import { MainLayout } from "./layout";
import TOC from "./TOC";
import { ReadingProgress } from "./ui/ReadingProgress";
import { Reveal } from "./ui";

type BlogMeta = {
  slug: string;
  title: string;
  date: string | null;
};

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
  navigation?: {
    prev: BlogMeta | null;
    next: BlogMeta | null;
  };
  relatedPosts?: BlogMeta[];
};

export default function PostLayout({
  children,
  frontmatter,
  navigation,
  relatedPosts,
}: PostLayoutProps) {
  const title = frontmatter?.title || "Post";
  const description = frontmatter?.description || frontmatter?.summary || "";
  const url = frontmatter?.slug
    ? `https://port-website-indol.vercel.app/blog/${frontmatter.slug}`
    : undefined;
  const { hasCopied, onCopy } = useClipboard(url || "");
  const nav = navigation || { prev: null, next: null };
  const related = relatedPosts || [];

  return (
    <MainLayout>
      <ReadingProgress />
      <Container maxW="container.lg" px={{ base: 4, md: 6 }} bg="readingBg">
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
            <Reveal>
              <Heading as="h1" size="2xl" mb={2}>
                {frontmatter.title}
              </Heading>
            </Reveal>
          ) : null}
          <HStack spacing={3} mb={6} align="center">
            {frontmatter?.date ? (
              <Text as="time" color="muted" fontSize="sm">
                Last updated: {frontmatter.date}
              </Text>
            ) : null}
            {frontmatter?.tags?.map((t) => (
              <Tag key={t} size="sm">
                {t}
              </Tag>
            ))}
          </HStack>
          <Box position="relative">
            <TOC />
          </Box>
          <chakra.div my={4} />
          <Box sx={frontmatter?.title ? { "h1:first-of-type": { display: "none" } } : undefined}>
            {children}
          </Box>
          <HStack spacing={2} mt={8}>
            <Tooltip label={hasCopied ? "Copied" : "Copy link"} openDelay={200}>
              <IconButton
                aria-label="Copy link"
                onClick={onCopy}
                size="sm"
                variant="ghost"
                icon={<chakra.span>🔗</chakra.span>}
              />
            </Tooltip>
            {url ? (
              <>
                <IconButton
                  as="a"
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    url
                  )}&text=${encodeURIComponent(title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                  size="sm"
                  variant="ghost"
                  icon={<FaTwitter />}
                />
                <IconButton
                  as="a"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    url
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  size="sm"
                  variant="ghost"
                  icon={<FaLinkedin />}
                />
              </>
            ) : null}
          </HStack>
          <Flex mt={8} justify="space-between">
            {nav.prev ? (
              <NextLink href={`/blog/${nav.prev.slug}`}>← {nav.prev.title}</NextLink>
            ) : (
              <span />
            )}
            {nav.next ? (
              <NextLink href={`/blog/${nav.next.slug}`}>{nav.next.title} →</NextLink>
            ) : (
              <span />
            )}
          </Flex>
          {related.length > 0 && (
            <Box mt={8}>
              <Heading as="h2" size="lg" mb={3}>
                Related posts
              </Heading>
              <HStack spacing={4} wrap="wrap">
                {related.map((p) => (
                  <NextLink key={p.slug} href={`/blog/${p.slug}`}>
                    {p.title}
                  </NextLink>
                ))}
              </HStack>
            </Box>
          )}
        </chakra.main>
      </Container>
    </MainLayout>
  );
}
