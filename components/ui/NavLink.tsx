import React from "react";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";

export type NavLinkProps = LinkProps &
  NextLinkProps & { exact?: boolean; activeWhen?: (pathname: string) => boolean };

const NavLinkComponent = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, as, exact = false, activeWhen, children, ...props }, ref) => {
    const router = useRouter();
    const path = typeof href === "string" ? href : (href as any)?.pathname || "";
    const defaultActive = exact ? router.pathname === path : router.pathname.startsWith(path || "");
    const isActive = typeof activeWhen === "function" ? activeWhen(router.pathname) : defaultActive;

    return (
      <ChakraLink
        as={NextLink}
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        position="relative"
        color={isActive ? "accent" : "text"}
        aria-current={isActive ? "page" : undefined}
        textDecoration="none"
        _hover={{ textDecoration: "none", color: "accent" }}
        {...props}
      >
        {children}
      </ChakraLink>
    );
  }
);

NavLinkComponent.displayName = "NavLink";
export const NavLink = NavLinkComponent;

export default NavLink;
