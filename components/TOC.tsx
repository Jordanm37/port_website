"use client";
import { useEffect, useState } from "react";
import { Box, Link as ChakraLink, List, ListItem } from "@chakra-ui/react";

type TocItem = { id: string; text: string; level: number };

export default function TOC() {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const heads = Array.from(document.querySelectorAll("h1, h2, h3")) as HTMLHeadingElement[];
    const toc = heads.map((h) => ({
      id: h.id,
      text: h.innerText,
      level: Number(h.tagName.substring(1)),
    }));
    setItems(toc.filter((t) => t.id));
  }, []);

  if (!items.length) return null;
  return (
    <Box as="nav" aria-label="Table of contents">
      <List spacing={1}>
        {items.map((i) => (
          <ListItem key={i.id} ml={`${(i.level - 1) * 12}px`}>
            <ChakraLink href={`#${i.id}`} color="muted" _hover={{ color: "link" }}>
              {i.text}
            </ChakraLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
