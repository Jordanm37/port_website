import React from "react";
import { Box, Container, Flex, HStack, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
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
              <NavLink href="/blog">Blog</NavLink>
              <NavLink
                href="/JORDAN_MOSHCOVITIS_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                CV
              </NavLink>
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
            <HStack spacing={4}>
              <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: "none", opacity: 0.8 }}>
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
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
