import { Heading, HStack, Tag, Text, LinkBox, LinkOverlay } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";
import NextLink from "next/link";
import { Reveal } from ".";

export interface BlogCardProps {
  href: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  date?: string | null;
  readingTime?: number | null;
}

function formatDate(iso?: string | null): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso || undefined;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export const BlogCard: React.FC<BlogCardProps> = ({
  href,
  title,
  excerpt,
  tags,
  date,
  readingTime,
}) => {
  return (
    <Reveal>
      <Card
        as={LinkBox}
        role="group"
        cursor="pointer"
        _hover={{ boxShadow: "md", transform: "translateY(-2px) scale(1.01)" }}
      >
        <Heading size="md" mb={2}>
          <LinkOverlay as={NextLink} href={href} _hover={{ textDecoration: "none" }}>
            {title}
          </LinkOverlay>
        </Heading>
        {excerpt ? (
          <Text color="muted" noOfLines={3} mb={4}>
            {excerpt}
          </Text>
        ) : null}
        <HStack spacing={2}>
          {tags?.slice(0, 3).map((t) => (
            <Tag key={t} size="sm">
              {t}
            </Tag>
          ))}
          {date ? (
            <Text as="time" dateTime={date ?? undefined} fontSize="sm" color="muted">
              {formatDate(date)}
            </Text>
          ) : null}
          {typeof readingTime === "number" ? (
            <Text fontSize="sm" color="muted">
              · {Math.max(1, Math.round(readingTime))} min read
            </Text>
          ) : null}
        </HStack>
      </Card>
    </Reveal>
  );
};

export default BlogCard;
