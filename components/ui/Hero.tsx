import React from "react";
import { Box, Flex, Heading, Text, chakra } from "@chakra-ui/react";
import NextImage from "next/image";

const Image = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    ["width", "height", "layout", "src", "alt", "sizes"].includes(prop as string),
});

export interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, imageSrc, imageAlt }) => {
  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="border"
      transition="border-color 200ms, box-shadow 200ms"
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
      bgGradient="linear(to-b, primary.50 0%, primary.50 12%, white 70%)"
      _dark={{ bgGradient: "linear(to-b, neutral.800 0%, neutral.850 20%, neutral.900 70%)" }}
      bgAttachment="fixed"
      _motionReduce={{ bgAttachment: "scroll" }}
      px={{ base: 6, md: 10 }}
      py={{ base: 10, md: 16 }}
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bgGradient: {
          base: "radial(primary.200 1px, transparent 1px)",
          _dark: "radial(neutral.700 1px, transparent 1px)",
        },
        backgroundSize: "24px 24px",
        opacity: 0.15,
        pointerEvents: "none",
      }}
    >
      <Flex direction={{ base: "column", md: "row" }} align="center" gap={{ base: 6, md: 10 }}>
        <Box flex="1" textAlign={{ base: "center", md: "left" }}>
          <Heading as="h1" size="3xl" mb={2}>
            {title}
          </Heading>
          {subtitle ? (
            <Text color="muted" fontSize="lg">
              {subtitle}
            </Text>
          ) : null}
          <Flex mt={6} justify={{ base: "center", md: "flex-start" }} gap={3} wrap="wrap">
            <chakra.button
              as="a"
              href="mailto:jordan.moshcovitis@gmail.com"
              role="button"
              className="chakra-button"
              data-variant="solid"
              style={{
                background: "var(--chakra-colors-primary-600)",
                color: "white",
                borderRadius: "var(--chakra-radii-md)",
                padding: "8px 16px",
              }}
            >
              Contact
            </chakra.button>
            <chakra.button
              as="a"
              href="/JORDAN_MOSHCOVITIS_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
              className="chakra-button"
              data-variant="outline"
              style={{
                border: "1px solid var(--chakra-colors-primary-600)",
                color: "var(--chakra-colors-primary-700)",
                borderRadius: "var(--chakra-radii-md)",
                padding: "8px 16px",
              }}
            >
              View CV
            </chakra.button>
          </Flex>
        </Box>
        {imageSrc ? (
          <Box
            flexShrink={0}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            ring={1}
            ringColor="border"
            transition="transform 400ms, box-shadow 200ms, outline-color 200ms, ring-color 200ms"
            transform="translateY(0)"
            _hover={{ transform: "translateY(-2px)" }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt || ""}
              width={156}
              height={170}
              sizes="(min-width: 768px) 170px, 140px"
            />
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
};

export default Hero;
