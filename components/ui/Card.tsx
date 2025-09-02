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
      borderRadius="lg"
      p={6}
      bg="bg"
      boxShadow="sm"
      transition="all 200ms"
      _hover={{ boxShadow: "md", transform: "translateY(-1px)" }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
