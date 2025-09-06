import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";

export interface CalloutProps {
  type?: "info" | "warn" | "success";
  title?: string;
  children?: React.ReactNode;
}

const typeToColors: Record<string, { bg: string; border: string; color?: string }> = {
  // Use surface + border tokens for consistent contrast in light/dark
  info: { bg: "readingBg", border: "border", color: "text" },
  warn: { bg: "readingBg", border: "border", color: "text" },
  success: { bg: "readingBg", border: "border", color: "text" },
};

export const Callout: React.FC<CalloutProps> = ({ type = "info", title, children }) => {
  const c = typeToColors[type] || typeToColors.info;
  return (
    <Box bg={c.bg} borderWidth="1px" borderColor={c.border} borderRadius="md" p={4} my={4}>
      {title ? (
        <HStack mb={2}>
          <Text fontWeight={600} color={c.color || "text"}>
            {title}
          </Text>
        </HStack>
      ) : null}
      <Text color={c.color || "text"}>{children}</Text>
    </Box>
  );
};

export default Callout;
