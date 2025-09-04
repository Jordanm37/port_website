import React, { useRef, useCallback, useEffect } from "react";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";

export type NavLinkProps = LinkProps & NextLinkProps & { exact?: boolean };

const NavLinkComponent = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, as, exact = false, children, ...props }, ref) => {
    const router = useRouter();
    const path = typeof href === "string" ? href : (href as any)?.pathname || "";
    const isActive = exact ? router.pathname === path : router.pathname.startsWith(path || "");
    const rafRef = useRef<number | null>(null);

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth 60fps updates
      rafRef.current = requestAnimationFrame(() => {
        const el = e.currentTarget;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = Math.max(
          -0.5,
          Math.min(0.5, (e.clientX - (rect.left + rect.width / 2)) / rect.width)
        );
        el.style.transform = `translate3d(${dx * 6}px, -1px, 0)`;
      });
    }, []);

    const onMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
      // Cancel any pending animation
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      e.currentTarget.style.transform = "";
    }, []);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
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
        transition="transform 150ms cubic-bezier(.2,.8,.2,1)"
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
  }
);

NavLinkComponent.displayName = "NavLink";
export const NavLink = NavLinkComponent;

export default NavLink;
