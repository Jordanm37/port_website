"use client";
import { useEffect, useState } from "react";
import { Box, Link as ChakraLink, List, ListItem } from "@chakra-ui/react";

type TocItem = { id: string; text: string; level: number };

export default function TOC() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const heads = Array.from(document.querySelectorAll("h1, h2, h3")) as HTMLHeadingElement[];
    const toc = heads.map((h) => ({
      id: h.id,
      text: h.innerText,
      level: Number(h.tagName.substring(1)),
    }));
    const filtered = toc.filter((t) => t.id);
    setItems(filtered);

    if (!filtered.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);

  if (!items.length) return null;
  return (
    <Box
      as="nav"
      aria-label="Table of contents"
      position="sticky"
      top={20}
      display={{ base: "none", xl: "block" }}
    >
      <Box as="div" fontSize="xs" color="muted" mb={2}>
        Outline
      </Box>
      <List spacing={1}>
        {items.map((i) => (
          <ListItem
            key={i.id}
            ml={`${(i.level - 1) * 12}px`}
            display={items.length > 14 && i.level >= 3 ? { base: "none", xl: "none" } : "block"}
          >
            <ChakraLink
              href={`#${i.id}`}
              color={activeId === i.id ? "link" : "muted"}
              _hover={{ color: "link" }}
            >
              {i.text}
            </ChakraLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
