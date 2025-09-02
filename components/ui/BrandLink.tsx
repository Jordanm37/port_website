import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export type BrandLinkProps = LinkProps & { href: string };

export const BrandLink: React.FC<BrandLinkProps> = ({ href, children, ...props }) => {
  return (
    <ChakraLink
      as={NextLink}
      href={href}
      color="link"
      textDecoration="underline"
      _hover={{ textDecoration: "none" }}
      _focusVisible={{ outline: "2px solid", outlineColor: "link", outlineOffset: "2px" }}
      {...props}
    >
      {children}
    </ChakraLink>
  );
};

export default BrandLink;
