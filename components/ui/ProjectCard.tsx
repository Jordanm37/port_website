import React from "react";
import { Box, HStack, Heading, Text, Tag, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

export interface ProjectItem {
  org?: string;
  name: string;
  role?: string;
  period?: string;
  scope?: string;
  techniques?: string[];
  artefacts?: { kind: "Code" | "Paper" | "Talk" | "Demo"; href: string }[];
  relatedWriting?: { title: string; href: string }[];
}

export const ProjectCard: React.FC<{ item: ProjectItem }> = ({ item }) => {
  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      borderRadius="md"
      p={4}
      bg="bg"
      transition="transform var(--t-fast, 140ms), box-shadow var(--t-fast, 140ms)"
      _hover={{ transform: "translateY(-2px)", boxShadow: "sm" }}
    >
      <HStack justify="space-between" align="start">
        <Heading as="h3" size="md">
          {item.name}
        </Heading>
        {item.org ? (
          <Text color="muted" fontSize="sm">
            {item.org}
          </Text>
        ) : null}
      </HStack>
      <HStack spacing={3} mt={1} color="muted" fontSize="sm">
        {item.role ? <Text>{item.role}</Text> : null}
        {item.period ? <Text>· {item.period}</Text> : null}
      </HStack>
      {item.scope ? <Text mt={2}>{item.scope}</Text> : null}
      {item.techniques && item.techniques.length ? (
        <HStack spacing={2} mt={3} flexWrap="wrap">
          {item.techniques.map((t) => (
            <Tag key={t} size="sm" variant="subtle">
              {t}
            </Tag>
          ))}
        </HStack>
      ) : null}
      {item.artefacts && item.artefacts.length ? (
        <HStack spacing={3} mt={3}>
          {item.artefacts.map((a, idx) => (
            <ChakraLink
              as={NextLink}
              key={idx}
              href={a.href}
              target={a.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              [{a.kind}]
            </ChakraLink>
          ))}
        </HStack>
      ) : null}
      {item.relatedWriting && item.relatedWriting.length ? (
        <HStack spacing={3} mt={3}>
          {item.relatedWriting.map((r, idx) => (
            <ChakraLink as={NextLink} key={idx} href={r.href}>
              {r.title}
            </ChakraLink>
          ))}
        </HStack>
      ) : null}
    </Box>
  );
};

export default ProjectCard;
