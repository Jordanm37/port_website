import React from "react";
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
import { motion } from "framer-motion";
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

  const isWritingActive = router.pathname === "/" || router.pathname.startsWith("/writing");
  const isIdeasActive = router.pathname.startsWith("/ideas");
  const isProjectsActive = router.pathname.startsWith("/projects");
  const isHireActive = router.pathname.startsWith("/hire");
  const [hovered, setHovered] = React.useState<string | null>(null);
  const showWriting = hovered === "writing" || (!hovered && isWritingActive);
  const showIdeas = hovered === "ideas" || (!hovered && isIdeasActive);
  const showProjects = hovered === "projects" || (!hovered && isProjectsActive);
  const showHire = hovered === "hire" || (!hovered && isHireActive);

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
        <Container maxW="container.xl" px={{ base: 4, md: 5 }}>
          <Flex h={16} align="center" justify="space-between">
            <Text fontWeight={700}>Jordan Moshcovitis</Text>
            <HStack spacing={3} align="center">
              <HStack spacing={3} align="center">
                <Box
                  as="span"
                  position="relative"
                  display="inline-block"
                  onMouseEnter={() => setHovered("writing")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <NavLink href="/" activeWhen={(p) => p === "/" || p.startsWith("/writing")}>
                    Writing
                  </NavLink>
                  {showWriting ? (
                    <Box
                      as={motion.div}
                      layoutId="nav-underline"
                      position="absolute"
                      top={-1}
                      left={0}
                      right={0}
                      height="1px"
                      bg="link"
                      borderRadius="1px"
                    />
                  ) : null}
                </Box>
                <Text color="muted">·</Text>
                <Box
                  as="span"
                  position="relative"
                  display="inline-block"
                  onMouseEnter={() => setHovered("ideas")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <NavLink href="/ideas">Ideas</NavLink>
                  {showIdeas ? (
                    <Box
                      as={motion.div}
                      layoutId="nav-underline"
                      position="absolute"
                      top={-1}
                      left={0}
                      right={0}
                      height="1px"
                      bg="link"
                      borderRadius="1px"
                    />
                  ) : null}
                </Box>
                <Text color="muted">·</Text>
                <Box
                  as="span"
                  position="relative"
                  display="inline-block"
                  onMouseEnter={() => setHovered("projects")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <NavLink href="/projects">Projects</NavLink>
                  {showProjects ? (
                    <Box
                      as={motion.div}
                      layoutId="nav-underline"
                      position="absolute"
                      top={-1}
                      left={0}
                      right={0}
                      height="1px"
                      bg="link"
                      borderRadius="1px"
                    />
                  ) : null}
                </Box>
                <Text color="muted">·</Text>
                <Box
                  as="span"
                  position="relative"
                  display="inline-block"
                  onMouseEnter={() => setHovered("hire")}
                  onMouseLeave={() => setHovered(null)}
                >
                  <NavLink href="/hire">Hire me</NavLink>
                  {showHire ? (
                    <Box
                      as={motion.div}
                      layoutId="nav-underline"
                      position="absolute"
                      top={-1}
                      left={0}
                      right={0}
                      height="1px"
                      bg="link"
                      borderRadius="1px"
                    />
                  ) : null}
                </Box>
              </HStack>
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
