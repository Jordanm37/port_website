import React from "react";
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
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SkipLink } from "../ui";
import { NavLink } from "../ui/NavLink";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <SkipLink />
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex={100}
        bg="bg"
        borderBottomWidth="1px"
        borderColor="border"
        backdropFilter="saturate(180%) blur(6px)"
      >
        <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
          <Flex h={16} align="center" justify="space-between">
            <NavLink href="/" exact fontWeight={700} _hover={{ textDecoration: "none" }}>
              Jordan Moshcovitis
            </NavLink>
            <HStack spacing={4} align="center">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/talks">Talks</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink
                href="/JORDAN_MOSHCOVITIS_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                CV
              </NavLink>
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

      <Box as="footer" borderTopWidth="1px" borderColor="border" py={8} bg="bg">
        <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap={4}
          >
            <Text color="muted">© {new Date().getFullYear()} Jordan Moshcovitis</Text>
            <Box w="full">
              <Divider my={4} />
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
                  href="/blog"
                  _hover={{ textDecoration: "none", opacity: 0.8 }}
                >
                  Blog
                </ChakraLink>
                <ChakraLink
                  as={NextLink}
                  href="/JORDAN_MOSHCOVITIS_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  _hover={{ textDecoration: "none", opacity: 0.8 }}
                >
                  CV
                </ChakraLink>
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
