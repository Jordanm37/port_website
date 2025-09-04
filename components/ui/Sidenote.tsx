import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export interface SidenoteProps {
  title?: string;
  children?: React.ReactNode;
}

export const Sidenote: React.FC<SidenoteProps> = ({ title = "Note", children }) => {
  const border = useColorModeValue("neutral.200", "neutral.700");
  const bg = useColorModeValue("neutral.50", "neutral.800");
  const color = useColorModeValue("muted", "muted");

  return (
    <>
      {/* Mobile: collapsible details */}
      <Box as="details" display={{ base: "block", md: "none" }} my={3}>
        <Box as="summary" cursor="pointer" _hover={{ opacity: 0.9 }}>
          <Text as="span" fontWeight={600}>
            {title}
          </Text>
        </Box>
        <Box mt={2} borderWidth="1px" borderColor={border} borderRadius="md" p={3} bg={bg}>
          <Text fontSize="sm" color={color}>
            {children}
          </Text>
        </Box>
      </Box>

      {/* Desktop: right-aligned aside */}
      <Box
        as="aside"
        display={{ base: "none", md: "block" }}
        float="right"
        width={{ md: "40%", lg: "38%" }}
        ml={4}
        my={2}
        borderLeftWidth="2px"
        borderColor={border}
        pl={3}
      >
        <Text fontSize="sm" color={color}>
          <Text as="span" fontWeight={600} mr={1}>
            {title}:
          </Text>
          {children}
        </Text>
      </Box>
    </>
  );
};

export default Sidenote;
