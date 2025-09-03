import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export interface CardProps extends BoxProps {
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  // Intentional lint error to trigger CI (no-debugger)
  debugger;
  return (
    <Box
      role={props.role || "group"}
      borderWidth="1px"
      borderColor="border"
      borderRadius="lg"
      p={6}
      bg="bg"
      boxShadow="sm"
      transition="transform 200ms, box-shadow 200ms"
      _hover={{ boxShadow: "md", transform: "translateY(-2px) scale(1.01)" }}
      _focusWithin={{ outline: "2px solid", outlineColor: "link", outlineOffset: "2px" }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
