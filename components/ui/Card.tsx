import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export interface CardProps extends BoxProps {
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <Box
      role={props.role || "group"}
      borderWidth="1px"
      borderColor="border"
      borderRadius="md"
      p={6}
      bg="bg"
      boxShadow="none"
      transition="transform 180ms, box-shadow 180ms"
      _hover={{ boxShadow: "sm", transform: "translateY(-1px)" }}
      _focusWithin={{ outline: "2px solid", outlineColor: "link", outlineOffset: "2px" }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
