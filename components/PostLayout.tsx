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
import { Reveal, Prose, MastheadSignature, AssumptionInspector } from "./ui";
import { formatDateNatural } from "../lib/date";
import siteUrl from "../lib/site";

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
    image?: string; // relative or absolute
    ogImage?: string; // relative or absolute
    ogImageAlt?: string;
    ogImageWidth?: number;
    ogImageHeight?: number;
    masthead?: "perlin" | "brownian" | "ou" | "gp";
    assumptions?: {
      noise?: string;
      priors?: string;
      solver?: string;
      uncertainty?: ("aleatoric" | "epistemic")[];
    };
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
  const url = frontmatter?.slug ? `${siteUrl}/blog/${frontmatter.slug}` : undefined;
  const ogImagePath = frontmatter?.ogImage || frontmatter?.image;
  const ogFallback = frontmatter?.slug
    ? `${siteUrl}/api/og?title=${encodeURIComponent(title)}&dek=${encodeURIComponent(
        description || ""
      )}&date=${encodeURIComponent(frontmatter?.date || "")}&tags=${encodeURIComponent(
        (frontmatter?.tags || []).join(",")
      )}`
    : undefined;
  const ogImage = ogImagePath
    ? ogImagePath.startsWith("http")
      ? ogImagePath
      : `${siteUrl}${ogImagePath.startsWith("/") ? "" : "/"}${ogImagePath}`
    : ogFallback;
  const ogImageAlt = frontmatter?.ogImageAlt || title;
  const { hasCopied, onCopy } = useClipboard(url || "");
  const nav = navigation || { prev: null, next: null };
  const related = relatedPosts || [];

  return (
    <MainLayout>
      <ReadingProgress storageKey={frontmatter?.slug} />
      <Container maxW="container.xl" px={{ base: 4, md: 6 }} bg="readingBg">
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
            {ogImage ? <meta property="og:image" content={ogImage} /> : null}
            {ogImage ? <meta property="og:image:secure_url" content={ogImage} /> : null}
            {ogImageAlt ? <meta property="og:image:alt" content={ogImageAlt} /> : null}
            {typeof frontmatter?.ogImageWidth === "number" ? (
              <meta property="og:image:width" content={String(frontmatter?.ogImageWidth)} />
            ) : null}
            {typeof frontmatter?.ogImageHeight === "number" ? (
              <meta property="og:image:height" content={String(frontmatter?.ogImageHeight)} />
            ) : null}
            {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
          </Head>
          {frontmatter?.title ? (
            <Reveal>
              <Heading as="h1" size="xl" mb={1} maxW="72ch">
                {frontmatter.title}
              </Heading>
            </Reveal>
          ) : null}
          <HStack spacing={3} mb={3} align="center">
            {frontmatter?.date ? (
              <Text
                as="time"
                color="muted"
                fontSize="sm"
                sx={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatDateNatural(frontmatter.date)}
              </Text>
            ) : null}
            {frontmatter?.tags?.map((t) => (
              <Tag key={t} size="sm">
                {t}
              </Tag>
            ))}
          </HStack>
          {frontmatter?.masthead ? (
            <MastheadSignature kind={frontmatter.masthead} seed={frontmatter?.slug} />
          ) : null}
          {frontmatter?.assumptions && Object.keys(frontmatter.assumptions || {}).length ? (
            <AssumptionInspector assumptions={frontmatter.assumptions} />
          ) : null}
          <chakra.div my={4} />
          <Flex gap={8} align="flex-start" pb={{ base: 10, md: 14 }}>
            <Box flex="1">
              <Prose mt={0}>
                <Box
                  sx={frontmatter?.title ? { "h1:first-of-type": { display: "none" } } : undefined}
                >
                  {children}
                </Box>
              </Prose>
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
                <Box mt={10}>
                  <Heading as="h2" size="md" mb={2} color="muted">
                    Related
                  </Heading>
                  <HStack spacing={3} flexWrap="wrap">
                    {related.slice(0, 3).map((p) => (
                      <NextLink key={p.slug} href={`/blog/${p.slug}`}>
                        {p.title}
                      </NextLink>
                    ))}
                  </HStack>
                </Box>
              )}
            </Box>
            <Box
              display={{ base: "none", lg: "block" }}
              position="sticky"
              top={24}
              flexShrink={0}
              w="220px"
            >
              <Box borderLeftWidth="1px" borderColor="border" pl={5}>
                <TOC />
              </Box>
            </Box>
          </Flex>
        </chakra.main>
      </Container>
    </MainLayout>
  );
}
