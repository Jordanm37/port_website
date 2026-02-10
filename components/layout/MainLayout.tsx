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
  Divider,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SkipLink } from "../ui";
import { NavLink } from "../ui/NavLink";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  return (
    <Box>
      <SkipLink />

      {/* Static header — not sticky, no backdrop-blur */}
      <Box as="header" bg="bg">
        <Container maxW="680px" px={{ base: 4, md: 5 }}>
          <Flex
            pt={{ base: 6, md: 8 }}
            pb={{ base: 3, md: 4 }}
            align="baseline"
            justify="space-between"
            wrap="wrap"
            gap={2}
          >
            {/* Name as logotype */}
            <ChakraLink
              as={NextLink}
              href="/"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Text
                fontFamily="heading"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight={700}
                color="text"
                letterSpacing="tighter"
              >
                Jordan Moshcovitis
              </Text>
            </ChakraLink>

            {/* Right-aligned nav + icons */}
            <HStack spacing={{ base: 2, md: 3 }} align="center">
              <HStack spacing={{ base: 2, md: 3 }} align="center">
                <NavLink
                  href="/writing"
                  activeWhen={(p) => p.startsWith("/writing") || p.startsWith("/blog")}
                  fontSize="sm"
                >
                  Writing
                </NavLink>
                <Text color="muted" fontSize="xs" userSelect="none">
                  &middot;
                </Text>
                <NavLink href="/research" fontSize="sm">
                  Research
                </NavLink>
                <Text color="muted" fontSize="xs" userSelect="none">
                  &middot;
                </Text>
                <NavLink href="/about" fontSize="sm">
                  About
                </NavLink>
                <Text color="muted" fontSize="xs" userSelect="none">
                  &middot;
                </Text>
                <NavLink href="/contact" fontSize="sm">
                  Contact
                </NavLink>
              </HStack>

              <IconButton
                as={ChakraLink}
                href="https://github.com/Jordanm37"
                aria-label="GitHub"
                icon={<FaGithub size={14} />}
                variant="ghost"
                size="xs"
                minW="auto"
                p={1}
              />
              <IconButton
                as={ChakraLink}
                href="https://www.linkedin.com/in/jordan-moshcovitis"
                aria-label="LinkedIn"
                icon={<FaLinkedin size={14} />}
                variant="ghost"
                size="xs"
                minW="auto"
                p={1}
              />
              <IconButton
                aria-label="Toggle color mode"
                variant="ghost"
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <MoonIcon boxSize={3} /> : <SunIcon boxSize={3} />}
                size="xs"
                minW="auto"
                p={1}
              />
            </HStack>
          </Flex>

          {/* Full-width thin rule */}
          <Divider borderColor="border" />
        </Container>
      </Box>

      {/* Main content */}
      <Box as="main" id="main-content" minH="70vh">
        {children}
      </Box>

      {/* Footer */}
      <Box as="footer" mt={16} pb={8}>
        <Container maxW="680px" px={{ base: 4, md: 5 }}>
          <Divider borderColor="border" mb={6} />
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap={3}
          >
            <HStack spacing={3} fontSize="sm" color="muted">
              <ChakraLink as={NextLink} href="/writing" color="muted" textDecoration="none">
                Writing
              </ChakraLink>
              <Text>&middot;</Text>
              <ChakraLink as={NextLink} href="/research" color="muted" textDecoration="none">
                Research
              </ChakraLink>
              <Text>&middot;</Text>
              <ChakraLink as={NextLink} href="/about" color="muted" textDecoration="none">
                About
              </ChakraLink>
              <Text>&middot;</Text>
              <ChakraLink as={NextLink} href="/contact" color="muted" textDecoration="none">
                Contact
              </ChakraLink>
              <Text>&middot;</Text>
              <ChakraLink as={NextLink} href="/privacy" color="muted" textDecoration="none">
                Privacy
              </ChakraLink>
            </HStack>
            <Text fontSize="xs" color="muted">
              &copy; {new Date().getFullYear()} Jordan Moshcovitis
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
