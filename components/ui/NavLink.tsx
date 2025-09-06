import React, { useRef, useCallback, useEffect } from "react";
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
    const rafRef = useRef<number | null>(null);

    const onMouseMove = useCallback((_e: React.MouseEvent<HTMLAnchorElement>) => {
      // removed wobble transform for clarity and reduced motion
    }, []);

    const onMouseLeave = useCallback((_e: React.MouseEvent<HTMLAnchorElement>) => {
      // no-op after removing wobble
    }, []);

    // Cleanup on unmount
    useEffect(() => {
      const rafId = rafRef.current;
      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    }, []);

    return (
      <ChakraLink
        as={NextLink}
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        position="relative"
        color={isActive ? "link" : undefined}
        aria-current={isActive ? "page" : undefined}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        transition="color 150ms cubic-bezier(.2,.8,.2,1)"
        textDecoration="none"
        _hover={{ textDecoration: "underline" }}
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
