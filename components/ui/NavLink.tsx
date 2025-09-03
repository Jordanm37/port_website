import React from "react";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";

export type NavLinkProps = LinkProps & NextLinkProps & { exact?: boolean };

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  as,
  exact = false,
  children,
  ...props
}) => {
  const router = useRouter();
  const path = typeof href === "string" ? href : (href as any)?.pathname || "";
  const isActive = exact ? router.pathname === path : router.pathname.startsWith(path || "");

  return (
    <ChakraLink
      as={NextLink}
      href={href}
      position="relative"
      color={isActive ? "link" : undefined}
      _hover={{ textDecoration: "none", opacity: 0.9 }}
      _after={{
        content: '""',
        position: "absolute",
        left: 0,
        bottom: -1,
        height: "2px",
        width: isActive ? "100%" : "0%",
        bg: "link",
        transition: "width 200ms",
      }}
      {...props}
    >
      {children}
    </ChakraLink>
  );
};

export default NavLink;
