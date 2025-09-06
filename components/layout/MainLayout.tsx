import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorMode,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SkipLink } from "../ui";
import { NavLink } from "../ui/NavLink";
import { useScrollNav } from "../../hooks/useScrollNav";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const scrolled = useScrollNav(12);
  const router = useRouter();

  const navWrapRef = useRef<HTMLDivElement | null>(null);
  const writingRef = useRef<HTMLAnchorElement | null>(null);
  const ideasRef = useRef<HTMLAnchorElement | null>(null);
  const projectsRef = useRef<HTMLAnchorElement | null>(null);
  const hireRef = useRef<HTMLAnchorElement | null>(null);
  const [underline, setUnderline] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  function measure(el: HTMLElement | null) {
    if (!el || !navWrapRef.current) return;
    const wrapRect = navWrapRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setUnderline({ left: rect.left - wrapRect.left, width: rect.width });
  }

  const updateFromActive = useCallback(() => {
    const refs = [
      { path: "/writing", ref: writingRef },
      { path: "/projects", ref: projectsRef },
      { path: "/ideas", ref: ideasRef },
      { path: "/hire", ref: hireRef },
    ];
    const active = refs.find((r) => router.pathname.startsWith(r.path));
    measure(active?.ref.current || null);
  }, [router.pathname]);

  useEffect(() => {
    const onResize = () => updateFromActive();
    requestAnimationFrame(updateFromActive);
    window.addEventListener("resize", onResize);

    // Add null check for router.events
    if (router.events) {
      router.events.on("routeChangeComplete", updateFromActive);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (router.events) {
        router.events.off("routeChangeComplete", updateFromActive);
      }
    };
  }, [router.events, updateFromActive]);

  return (
    <Box>
      <SkipLink />
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex={100}
        bg="chromeBg"
        borderBottomWidth="1px"
        borderColor="border"
        backdropFilter="saturate(180%) blur(10px)"
        transition="all 200ms cubic-bezier(.2,.8,.2,1)"
      >
        <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
          <Flex h={16} align="center" justify="space-between">
            <Text fontWeight={700}>Jordan Moshcovitis</Text>
            <HStack spacing={3} align="center">
              <Box position="relative" ref={navWrapRef}>
                <HStack spacing={3} align="center">
                  <NavLink
                    href="/"
                    activeWhen={(p) => p === "/" || p.startsWith("/writing")}
                    ref={writingRef as any}
                    onMouseEnter={() => measure(writingRef.current)}
                    onMouseLeave={updateFromActive}
                  >
                    Writing
                  </NavLink>
                  <Text color="muted">·</Text>
                  <NavLink
                    href="/ideas"
                    ref={ideasRef as any}
                    onMouseEnter={() => measure(ideasRef.current)}
                    onMouseLeave={updateFromActive}
                  >
                    Ideas
                  </NavLink>
                  <Text color="muted">·</Text>
                  <NavLink
                    href="/projects"
                    ref={projectsRef as any}
                    onMouseEnter={() => measure(projectsRef.current)}
                    onMouseLeave={updateFromActive}
                  >
                    Projects
                  </NavLink>
                  <Text color="muted">·</Text>
                  <NavLink
                    href="/hire"
                    ref={hireRef as any}
                    onMouseEnter={() => measure(hireRef.current)}
                    onMouseLeave={updateFromActive}
                  >
                    Hire me
                  </NavLink>
                </HStack>
                <Box
                  position="absolute"
                  bottom={-1}
                  left={`${underline.left}px`}
                  width={`${underline.width}px`}
                  height="2px"
                  bg="link"
                  transition="left 200ms cubic-bezier(.2,.8,.2,1), width 200ms cubic-bezier(.2,.8,.2,1)"
                />
              </Box>
              <IconButton
                as={ChakraLink}
                href="https://github.com/Jordanm37"
                aria-label="GitHub"
                icon={<FaGithub />}
                variant="ghost"
                size="sm"
              />
              <IconButton
                as={ChakraLink}
                href="https://www.linkedin.com/in/jordan-m-ab5a4010b/"
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                variant="ghost"
                size="sm"
              />
              <IconButton
                aria-label="Toggle color mode"
                variant="ghost"
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                size="sm"
              />
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Box as="main" id="main-content" minH="100svh">
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
