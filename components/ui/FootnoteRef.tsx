"use client";
import React from "react";
import {
  chakra,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Box,
} from "@chakra-ui/react";

export interface FootnoteRefProps {
  children?: React.ReactNode;
}

function extractHrefFromChildren(children: React.ReactNode): string | null {
  const childArray = React.Children.toArray(children);
  for (const c of childArray) {
    if (React.isValidElement(c)) {
      const href = (c.props as any)?.href as string | undefined;
      if (typeof href === "string" && href.startsWith("#")) return href;
      const nested = extractHrefFromChildren((c as any).props?.children);
      if (nested) return nested;
    }
  }
  return null;
}

function getFootnoteHTML(targetId: string): string {
  if (typeof document === "undefined") return "";
  const el = document.getElementById(targetId);
  if (!el) return "";
  // Clone to avoid mutating the DOM, and strip backlink markers like "↩︎"
  const clone = el.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('a[href^="#fnref"]').forEach((a) => a.remove());
  // Prefer innerHTML to preserve KaTeX-rendered markup
  return clone.innerHTML || "";
}

export const FootnoteRef: React.FC<FootnoteRefProps> = ({ children }) => {
  const href = extractHrefFromChildren(children);
  const targetId = React.useMemo(() => (href ? href.replace(/^#/, "") : null), [href]);
  const [html, setHtml] = React.useState<string>("");

  React.useEffect(() => {
    if (!targetId) return;
    setHtml(getFootnoteHTML(targetId));
  }, [targetId]);

  return (
    <Popover trigger="hover" openDelay={80} closeDelay={80} placement="right-start">
      <PopoverTrigger>
        <chakra.sup
          tabIndex={0}
          sx={{ cursor: "help" }}
          _focus={{ outline: "2px solid", outlineColor: "link", outlineOffset: "2px" }}
        >
          {children}
        </chakra.sup>
      </PopoverTrigger>
      <PopoverContent
        display={{ base: "none", xl: "block" }}
        maxW="360px"
        borderColor="border"
        bg="bg"
        _dark={{ bg: "neutral.800" }}
        boxShadow="md"
      >
        <PopoverArrow />
        <PopoverBody>
          <Box fontSize="sm" lineHeight={1.6} dangerouslySetInnerHTML={{ __html: html }} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FootnoteRef;
