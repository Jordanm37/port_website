import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  HStack,
  Link as ChakraLink,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";
import type { ProjectItem } from "./ProjectCard";

export interface ProjectListRowProps {
  item: ProjectItem;
}

export const ProjectListRow: React.FC<ProjectListRowProps> = ({ item }) => {
  const primaryHref = item.artefacts && item.artefacts.length ? item.artefacts[0].href : undefined;
  return (
    <Box as={LinkBox} py={4} borderBottomWidth="1px" borderColor="border">
      <Grid templateColumns={{ base: "1fr", lg: "220px 1fr auto" }} gap={4} alignItems="start">
        <GridItem>
          {item.org ? (
            <Text color="muted" fontSize="sm" mb={1}>
              {item.org}
            </Text>
          ) : null}
          <HStack spacing={2} color="muted" fontSize="sm">
            {item.role ? <Text>{item.role}</Text> : null}
            {item.period ? (
              <Text sx={{ fontVariantNumeric: "tabular-nums" }}>· {item.period}</Text>
            ) : null}
          </HStack>
        </GridItem>
        <GridItem>
          <Heading as="h3" fontSize="1.25rem" mb={1} fontWeight={700}>
            {primaryHref ? (
              <LinkOverlay
                as={NextLink}
                href={primaryHref}
                target={primaryHref.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                _hover={{ textDecoration: "none" }}
              >
                {item.name}
              </LinkOverlay>
            ) : (
              item.name
            )}
          </Heading>
          {item.scope ? (
            <Text color="muted" noOfLines={2}>
              {item.scope}
            </Text>
          ) : null}
        </GridItem>
        <GridItem whiteSpace="nowrap">
          <HStack spacing={3} justify="flex-end">
            {item.artefacts?.map((a, idx) => (
              <ChakraLink
                as={NextLink}
                key={idx}
                href={a.href}
                target={a.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                {a.kind}
              </ChakraLink>
            ))}
          </HStack>
          {item.relatedWriting && item.relatedWriting.length ? (
            <HStack spacing={3} mt={2} justify="flex-end">
              {item.relatedWriting.slice(0, 2).map((r, idx) => (
                <ChakraLink as={NextLink} key={idx} href={r.href} color="muted">
                  {r.title}
                </ChakraLink>
              ))}
            </HStack>
          ) : null}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ProjectListRow;
