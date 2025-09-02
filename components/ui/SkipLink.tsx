import { chakra } from "@chakra-ui/react";
import React from "react";

export interface SkipLinkProps {
  targetId?: string;
  label?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId = "main-content",
  label = "Skip to content",
}) => {
  return (
    <chakra.a
      href={`#${targetId}`}
      position="absolute"
      top={0}
      left={0}
      px={3}
      py={2}
      m={2}
      bg="white"
      color="black"
      transform="translateY(-150%)"
      _focus={{ transform: "translateY(0)" }}
      borderRadius="sm"
      zIndex={1000}
    >
      {label}
    </chakra.a>
  );
};

export default SkipLink;
