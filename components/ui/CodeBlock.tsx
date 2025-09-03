import React from "react";
import { Box, HStack, Text, IconButton, Tooltip, chakra, useClipboard } from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";

type CodeChildProps = {
  className?: string;
  children?: React.ReactNode;
};

export interface CodeBlockProps {
  children?: React.ReactElement<CodeChildProps> | React.ReactElement<CodeChildProps>[];
}

function extractLanguage(className?: string): string | undefined {
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
  const className = child?.props?.className;
  const language = extractLanguage(className) || "text";
  const codeString = extractCodeString(child);
  const { hasCopied, onCopy } = useClipboard(codeString);

  return (
    <Box borderWidth="1px" borderColor="border" borderRadius="md" overflow="hidden" bg="bg">
      <HStack
        justify="space-between"
        align="center"
        px={3}
        py={2}
        borderBottomWidth="1px"
        borderColor="border"
      >
        <Text fontSize="sm" color="muted" textTransform="uppercase" letterSpacing="wider">
          {language}
        </Text>
        <Tooltip label={hasCopied ? "Copied" : "Copy"} openDelay={200}>
          <IconButton
            aria-label="Copy code"
            size="sm"
            variant="ghost"
            icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
            onClick={onCopy}
          />
        </Tooltip>
      </HStack>
      <chakra.pre className={`${className ?? ""} line-numbers`} my={0}>
        {child}
      </chakra.pre>
    </Box>
  );
};

export default CodeBlock;
