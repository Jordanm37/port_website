import React from "react";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";

export type NavLinkProps = LinkProps & NextLinkProps & { exact?: boolean };

const NavLinkComponent = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, as, exact = false, children, ...props }, ref) => {
    const router = useRouter();
    const path = typeof href === "string" ? href : (href as any)?.pathname || "";
    const isActive = exact ? router.pathname === path : router.pathname.startsWith(path || "");

    function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width; // -0.5..0.5
      el.style.transform = `translateY(-1px) translateX(${dx * 6}px)`;
    }

    function onMouseLeave(e: React.MouseEvent<HTMLAnchorElement>) {
      e.currentTarget.style.transform = "";
    }

    return (
      <ChakraLink
        as={NextLink}
        href={href}
        ref={ref as any}
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
