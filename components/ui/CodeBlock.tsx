import React from "react";
import { Box, HStack, Text, chakra, VStack } from "@chakra-ui/react";

type CodeChildProps = {
  className?: string;
  children?: React.ReactNode;
};

export interface CodeBlockProps {
  children?: React.ReactElement<CodeChildProps> | React.ReactElement<CodeChildProps>[];
}

function extractLanguage(className?: string, dataLanguage?: string): string | undefined {
  if (dataLanguage && typeof dataLanguage === "string") return dataLanguage;
  if (!className) return undefined;
  const match = className.match(/language-([\w-]+)/);
  return match ? match[1] : undefined;
}

function extractCodeString(child: React.ReactElement<CodeChildProps> | undefined): string {
  if (!child) return "";
  const raw = child.props?.children;
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw)) return raw.join("");
  return String(raw ?? "");
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  const child = Array.isArray(children)
    ? (children[0] as React.ReactElement<CodeChildProps>)
    : (children as React.ReactElement<CodeChildProps>);
  const className = (child as any)?.props?.className as string | undefined;
  const dataLanguage = (child as any)?.props?.["data-language"] as string | undefined;
  const dataFilename = (child as any)?.props?.["data-filename"] as string | undefined;
  const language = extractLanguage(className, dataLanguage) || "text";
  const codeString = extractCodeString(child);
  // remove copy interactions for a cleaner presentation

  // Determine line count using data-line spans when present, else fallback to codeString
  const rawChildren = (child as any)?.props?.children;
  const lineCountFromSpans = Array.isArray(rawChildren)
    ? rawChildren.filter(
        (el: any) => React.isValidElement(el) && (el.props as any)?.["data-line"] !== undefined
      ).length
    : 0;
  const lineCount = lineCountFromSpans || (codeString ? codeString.split(/\n/).length : 0);
  const showLineNumbers = lineCount > 5;

  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      borderRadius="md"
      overflow="hidden"
      bg={{ base: "bg", _dark: "neutral.800" }}
    >
      <HStack
        justify="space-between"
        align="center"
        px={3}
        py={2}
        borderBottomWidth="1px"
        borderColor="border"
      >
        <HStack spacing={3} align="center">
          <Text fontSize="sm" color="muted" textTransform="uppercase" letterSpacing="wider">
            {language}
          </Text>
          {dataFilename ? (
            <Text fontSize="xs" color="muted">
              {dataFilename}
            </Text>
          ) : null}
        </HStack>
      </HStack>
      <Box display="grid" gridTemplateColumns={showLineNumbers ? "3rem 1fr" : "1fr"}>
        {showLineNumbers ? (
          <Box bg="bg" color="muted" px={3} py={3} userSelect="none">
            <VStack align="stretch" spacing={0}>
              {Array.from({ length: lineCount }).map((_, i) => (
                <Text key={i} fontSize="xs" textAlign="right" lineHeight={1.7}>
                  {i + 1}
                </Text>
              ))}
            </VStack>
          </Box>
        ) : null}
        <Box overflowX="auto">
          <chakra.pre
            className={`${className ?? ""}`}
            my={0}
            fontSize="sm"
            px={3}
            py={3}
            lineHeight={1.7}
          >
            {child}
          </chakra.pre>
        </Box>
      </Box>
    </Box>
  );
};

export default CodeBlock;
