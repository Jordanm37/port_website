import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorMode,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { track } from "../../lib/analytics";
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
  const aboutRef = useRef<HTMLAnchorElement | null>(null);
  const talksRef = useRef<HTMLAnchorElement | null>(null);
  const blogRef = useRef<HTMLAnchorElement | null>(null);
  const cvRef = useRef<HTMLAnchorElement | null>(null);
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
      { path: "/about", ref: aboutRef },
      { path: "/talks", ref: talksRef },
      { path: "/blog", ref: blogRef },
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
            <NavLink href="/" exact fontWeight={700} _hover={{ textDecoration: "none" }}>
              Jordan Moshcovitis
            </NavLink>
            <HStack spacing={4} align="center">
              <Box position="relative" ref={navWrapRef}>
                <HStack spacing={4} align="center">
                  <NavLink
                    href="/about"
                    ref={aboutRef as any}
                    onMouseEnter={() => measure(aboutRef.current)}
                    onMouseLeave={updateFromActive}
                  >
                    About
                  </NavLink>
                  <NavLink
                    href="/writing"
                    ref={talksRef as any}
                    onMouseEnter={() => measure(talksRef.current)}
                    onMouseLeave={updateFromActive}
                  >
                    Writing
                  </NavLink>
                  <NavLink
                    href="/notes"
                    ref={blogRef as any}
                    onMouseEnter={() => measure(blogRef.current)}
                    onMouseLeave={updateFromActive}
                  >
                    Notes
                  </NavLink>
                  <NavLink
                    href="/projects"
                    ref={cvRef as any}
                    onMouseEnter={() => measure(cvRef.current)}
                    onMouseLeave={updateFromActive}
                  >
                    Projects
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
              />
              <IconButton
                as={ChakraLink}
                href="https://www.linkedin.com/in/jordan-m-ab5a4010b/"
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                variant="ghost"
              />
              <IconButton
                aria-label="Toggle color mode"
                variant="ghost"
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              />
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Box as="main" id="main-content" minH="100svh">
        {children}
      </Box>

      <Box
        as="footer"
        borderTopWidth="1px"
        borderColor="border"
        py={8}
        bg="chromeBg"
        backdropFilter="saturate(180%) blur(10px)"
      >
        <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap={4}
          >
            <Text color="muted">© {new Date().getFullYear()} Jordan Moshcovitis</Text>
            <Box w="full">
              <Divider my={4} display={{ base: "none", md: "block" }} />
              <HStack spacing={4} color="muted">
                <ChakraLink
                  as={NextLink}
                  href="/"
                  _hover={{ textDecoration: "none", opacity: 0.8 }}
                >
                  Home
                </ChakraLink>
                <ChakraLink
                  as={NextLink}
                  href="/writing"
                  _hover={{ textDecoration: "none", opacity: 0.8 }}
                >
                  Writing
                </ChakraLink>
                <ChakraLink
                  as={NextLink}
                  href="/rss.xml"
                  _hover={{ textDecoration: "none", opacity: 0.8 }}
                  onClick={() => track("rss_click", { from: "footer" })}
                >
                  RSS
                </ChakraLink>
                {null}
                <ChakraLink
                  as={NextLink}
                  href="/privacy"
                  _hover={{ textDecoration: "none", opacity: 0.8 }}
                >
                  Privacy
                </ChakraLink>
                <ChakraLink
                  as={NextLink}
                  href="mailto:jordan.moshcovitis@gmail.com"
                  _hover={{ textDecoration: "none", opacity: 0.8 }}
                >
                  Contact
                </ChakraLink>
              </HStack>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
