import { Heading, HStack, Tag, Text } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";
import NextLink from "next/link";

export interface BlogCardProps {
  href: string;
  title: string;
  excerpt?: string;
  tag?: string;
  readingTime?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ href, title, excerpt, tag, readingTime }) => {
  return (
    <Card as="article" role="article">
      <Heading size="md" mb={2}>
        <NextLink href={href}>{title}</NextLink>
      </Heading>
      {excerpt ? (
        <Text color="muted" noOfLines={2} mb={4}>
          {excerpt}
        </Text>
      ) : null}
      <HStack spacing={3}>
        {tag ? <Tag size="sm">{tag}</Tag> : null}
        {readingTime ? (
          <Text fontSize="sm" color="muted">
            {readingTime}
          </Text>
        ) : null}
      </HStack>
    </Card>
  );
};

export default BlogCard;
