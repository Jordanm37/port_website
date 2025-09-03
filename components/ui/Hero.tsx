import React from "react";
import { Box, Flex, Heading, Text, chakra } from "@chakra-ui/react";
import NextImage from "next/image";

const Image = chakra(NextImage, {
  shouldForwardProp: (prop) => ["width", "height", "layout", "src", "alt"].includes(prop as string),
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
      bgGradient="linear(to-b, primary.50, white)"
      _dark={{ bgGradient: "linear(to-b, neutral.800, neutral.900)" }}
      px={{ base: 6, md: 10 }}
      py={{ base: 10, md: 16 }}
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
        </Box>
        {imageSrc ? (
          <Box
            flexShrink={0}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            ring={1}
            ringColor="border"
          >
            <Image src={imageSrc} alt={imageAlt || ""} width={156} height={170} />
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
};

export default Hero;
