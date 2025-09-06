import React from "react";
import { formatDateNatural } from "../../lib/date";
import NextLink from "next/link";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Tag,
  Text,
  Heading,
  LinkBox,
  LinkOverlay,
  AspectRatio,
  chakra,
} from "@chakra-ui/react";

export interface WritingListRowProps {
  href: string;
  title: string;
  dek?: string | null;
  date?: string | null;
  readingTime?: number | null;
  tags?: string[];
  series?: string | null;
  thumbnail?: string | null;
}

export const WritingListRow: React.FC<WritingListRowProps> = ({
  href,
  title,
  dek,
  date,
  readingTime,
  tags,
  series,
  thumbnail,
}) => {
  const natural = formatDateNatural(date);
  return (
    <Box as={LinkBox} py={5} borderBottomWidth="1px" borderColor="border">
      <Grid templateColumns={{ base: "1fr", lg: "120px 1fr 240px" }} gap={4} alignItems="start">
        <GridItem display={{ base: "block", lg: "block" }}>
          <chakra.time
            dateTime={date ?? undefined}
            color="muted"
            fontSize="sm"
            sx={{ fontVariantNumeric: "tabular-nums" }}
          >
            {natural}
          </chakra.time>
          <HStack spacing={2} mt={1} color="muted" fontSize="sm">
            {typeof readingTime === "number" ? (
              <Text>{Math.max(1, Math.round(readingTime))} min read</Text>
            ) : null}
            {series ? (
              <Tag size="sm" variant="subtle">
                {series}
              </Tag>
            ) : null}
          </HStack>
        </GridItem>
        <GridItem>
          <Heading as="h2" size="md" mb={1} fontWeight={700}>
            <LinkOverlay as={NextLink} href={href} _hover={{ textDecoration: "none" }}>
              {title}
            </LinkOverlay>
          </Heading>
          {dek ? (
            <Text color="muted" noOfLines={2} fontSize="sm">
              {dek}
            </Text>
          ) : null}
        </GridItem>
        <GridItem display={{ base: "none", lg: "block" }}>
          {thumbnail ? (
            <AspectRatio ratio={16 / 9} borderRadius="md" overflow="hidden">
              <Box bgImage={`url(${thumbnail})`} bgSize="cover" bgPos="center" />
            </AspectRatio>
          ) : null}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default WritingListRow;
