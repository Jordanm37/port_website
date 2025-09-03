import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";

export interface CalloutProps {
  type?: "info" | "warn" | "success";
  title?: string;
  children?: React.ReactNode;
}

const typeToColors: Record<string, { bg: string; border: string }> = {
  info: { bg: "primary.50", border: "primary.200" },
  warn: { bg: "yellow.50", border: "yellow.200" },
  success: { bg: "green.50", border: "green.200" },
};

export const Callout: React.FC<CalloutProps> = ({ type = "info", title, children }) => {
  const c = typeToColors[type] || typeToColors.info;
  return (
    <Box bg={c.bg} borderWidth="1px" borderColor={c.border} borderRadius="md" p={4} my={4}>
      {title ? (
        <HStack mb={2}>
          <Text fontWeight={600}>{title}</Text>
        </HStack>
      ) : null}
      <Text>{children}</Text>
    </Box>
  );
};

export default Callout;
