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
        // Find the most visible heading (closest to top of viewport)
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) =>
            prev.intersectionRatio > current.intersectionRatio ? prev : current
          );
          setActiveId(mostVisible.target.id);
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0.1, 0.5, 1.0] }
    );

    // Observe only filtered headings
    filtered.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) io.observe(element);
    });

    return () => {
      io.disconnect();
    };
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
      <Box
        as="div"
        fontSize="xs"
        color="muted"
        mb={2}
        textTransform="uppercase"
        letterSpacing="wider"
      >
        TABLE OF CONTENTS
      </Box>
      <List spacing={1}>
        {items.map((i) => {
          // More intelligent collapsing: only hide H3s if there are many AND they make up a large portion
          const h3Count = items.filter((item) => item.level >= 3).length;
          const shouldCollapseH3s = items.length > 14 && h3Count > 8 && i.level >= 3;

          return (
            <ListItem
              key={i.id}
              ml={`${(i.level - 1) * 12}px`}
              display={shouldCollapseH3s ? { base: "none", xl: "none" } : "block"}
            >
              <ChakraLink
                href={`#${i.id}`}
                color={activeId === i.id ? "link" : "muted"}
                _hover={{ color: "link" }}
              >
                {i.text}
              </ChakraLink>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
