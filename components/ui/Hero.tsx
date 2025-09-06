import React from "react";
import { Box, Flex, Heading, Text, chakra, HStack, Tag, Button } from "@chakra-ui/react";
import CanvasBackground from "./CanvasBackground";
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
  chips?: string[];
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
  variant?: "default" | "compact";
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  chips,
  primaryCtaHref,
  primaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
  variant = "default",
}) => {
  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="lg"
      transition="border-color 200ms, box-shadow 200ms"
      boxShadow={variant === "compact" ? undefined : "sm"}
      _hover={variant === "compact" ? undefined : { boxShadow: "md" }}
      bg={variant === "compact" ? "bg" : undefined}
      bgGradient={
        variant === "compact" ? undefined : "linear(to-b, primary.50 0%, primary.50 12%, white 70%)"
      }
      _dark={
        variant === "compact"
          ? undefined
          : { bgGradient: "linear(to-b, neutral.800 0%, neutral.800 20%, neutral.900 70%)" }
      }
      px={{ base: variant === "compact" ? 4 : 6, md: variant === "compact" ? 5 : 10 }}
      py={{ base: variant === "compact" ? 6 : 10, md: variant === "compact" ? 10 : 16 }}
      _before={
        variant === "compact"
          ? undefined
          : {
              content: '""',
              position: "absolute",
              inset: 0,
              bgGradient: "radial(primary.200 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              opacity: 0.15,
              pointerEvents: "none",
              _dark: { display: "none" },
            }
      }
    >
      {variant === "default" ? <CanvasBackground color="rgba(0, 102, 204, 0.4)" /> : null}
      <Flex direction={{ base: "column", md: "row" }} align="center" gap={{ base: 5, md: 8 }}>
        <Box flex="1" textAlign={{ base: "center", md: "left" }}>
          <Heading as="h1" size={variant === "compact" ? "2xl" : "3xl"} mb={2}>
            {title}
          </Heading>
          {subtitle ? (
            <Text color="muted" fontSize={variant === "compact" ? "md" : "lg"}>
              {subtitle}
            </Text>
          ) : null}
          <Flex
            mt={variant === "compact" ? 4 : 6}
            justify={{ base: "center", md: "flex-start" }}
            gap={3}
            wrap="wrap"
          >
            {primaryCtaHref && primaryCtaLabel ? (
              <Button as="a" href={primaryCtaHref} variant="solid">
                {primaryCtaLabel}
              </Button>
            ) : null}
            {secondaryCtaHref && secondaryCtaLabel ? (
              <Button
                as="a"
                href={secondaryCtaHref}
                variant="outline"
                target={secondaryCtaHref.startsWith("http") ? "_blank" : undefined}
                rel={secondaryCtaHref.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {secondaryCtaLabel}
              </Button>
            ) : null}
          </Flex>
          {variant === "default" && chips && chips.length ? (
            <HStack spacing={2} mt={4} flexWrap="wrap">
              {chips.slice(0, 3).map((c) => (
                <Tag key={c} size="sm">
                  {c}
                </Tag>
              ))}
            </HStack>
          ) : null}
        </Box>
        {imageSrc ? (
          <Box
            flexShrink={0}
            borderRadius="lg"
            overflow="hidden"
            boxShadow={variant === "compact" ? undefined : "md"}
            ring={variant === "compact" ? undefined : 1}
            ringColor={variant === "compact" ? undefined : "border"}
            transition="transform 400ms, box-shadow 200ms, outline-color 200ms, ring-color 200ms"
            transform="translateY(0)"
            _hover={{ transform: "translateY(-2px)" }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt || ""}
              width={variant === "compact" ? 120 : 156}
              height={variant === "compact" ? 130 : 170}
              sizes={
                variant === "compact"
                  ? "(min-width: 768px) 130px, 110px"
                  : "(min-width: 768px) 170px, 140px"
              }
              priority
            />
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
};

export default Hero;
